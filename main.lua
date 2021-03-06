
music = love.audio.newSource("music/background.wav", 'stream')
mainMenu = true

function love.load()
    gameOver = false
    paused = false
    enableMusic = false
    nightMode = false

    enemiesAvoided = 0


    --[libraries]
    anim8 = require 'libraries/anim8/anim8'
    sti = require 'libraries/sti/sti'
    --[end]

    require 'libraries/show'
    require 'enemies'
    require 'messages'

    sprites = {}
    sprites.playerSheet = love.graphics.newImage('sprites/truedodger.png')
    sprites.ground1 = love.graphics.newImage('sprites/ground1.png')
    sprites.ground2 = love.graphics.newImage('sprites/ground2.png')
    sprites.ground3 = love.graphics.newImage('sprites/ground3.png')
    sprites.fly1 =    love.graphics.newImage('sprites/fly1.png')
    sprites.fly2 =    love.graphics.newImage('sprites/fly2.png')
    
    buildUI()
    startMusic()

    animations = {}

    --Player animations
    local playerGrid      = anim8.newGrid(118, 118, sprites.playerSheet:getWidth(), sprites.playerSheet:getHeight())

    animations.idle = anim8.newAnimation(playerGrid('1-1', 1), 0.1)
    animations.run = anim8.newAnimation(playerGrid('2-5', 1), 0.1)
    animations.jump = anim8.newAnimation(playerGrid('9-9', 1), 0.1)
    animations.dash = anim8.newAnimation(playerGrid('6-7', 1), 0.1)


    --Ground enemies animations
    local ground1 = anim8.newGrid(118, 118, sprites.ground1:getWidth(), sprites.ground1:getHeight())
    local ground2 = anim8.newGrid(118, 118, sprites.ground2:getWidth(), sprites.ground2:getHeight())
    local ground3 = anim8.newGrid(118, 118, sprites.ground3:getWidth(), sprites.ground3:getHeight())
    local fly1    = anim8.newGrid(118, 118, sprites.fly1:getWidth(), sprites.fly1:getHeight())
    local fly2    = anim8.newGrid(118, 118, sprites.fly2:getWidth(), sprites.fly2:getHeight())

    animations.ground1 = anim8.newAnimation(ground1('1-2', 1), 1)
    animations.ground2 = anim8.newAnimation(ground2('1-2', 1), 0.5)
    animations.ground3 = anim8.newAnimation(ground3('1-1', 1), 0.2)

    animations.fly1 = anim8.newAnimation(fly1('1-2', 1), 1)
    animations.fly2 = anim8.newAnimation(fly2('1-2', 1), 0.09)

    wf = require 'libraries/windfield/windfield'
    world = wf.newWorld(0, 1000, false)
    world:setQueryDebugDrawing(true)

    world:addCollisionClass('Player')
    world:addCollisionClass('Platform')
    world:addCollisionClass('Danger')

    danger = world:newRectangleCollider(-60, 0, 2, love.graphics.getHeight(), {collision_class = 'Danger'})
    danger:setType('static')


    player = world:newRectangleCollider(64, 100, 42, 64, {collision_class = 'Player'})
    player:setFixedRotation(true)
    player.score = 1
    player.distance = 0
    player.grounded = false
    player.isDashing = false
    -- player.speed = 160

    globalSpeed = 0
    spawnMultiplier = -0.2
    spawntimer = 0
    lspawntimer = 0 

    platforms = {}

    saveData = {}
    saveData.highScore = 0

    if love.filesystem.getInfo("data.lua") then
        local data = love.filesystem.load("data.lua")
        data()
    end

    loadMap()
end


function love.update(dt)

    if gameOver == true then return end

    if paused == true then return end

    world:update(dt)
    if mainMenu == false then 
        spawntimer = spawntimer + dt
        -- local randomInverval = math.random(2,4)
        if spawntimer > 2 then
            spawnEnemy()
            spawntimer = 0 + globalSpeed * spawnMultiplier
            if spawntimer > 1.3 then
                spawntimer = 1.3
            end
            lspawntimer = spawntimer
        end

        gameMap:update(dt)
        updateEnemy(dt)
        
        player.score = player.score + math.ceil(dt / 0.01)
        player.distance = math.ceil(player.score * 0.001)
    end


    local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
    if #colliders > 0 then
        player.grounded = true
        if player.isDashing == true then
            player.animation = animations.dash
        else
            player.animation = animations.run
        end
    else 
        player.grounded = false
        player.animation = animations.jump
        player.isDashing = false
    end
    
    local dangerColliders = {}
    --GAME OVER
    if player.isDashing == true then
        dangerColliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 30, 60, 10, {'Danger'})
        player:setActive(false)
    else
        player:setActive(true)
        dangerColliders = world:queryRectangleArea(player:getX() - 30, player:getY() - 20, 60, 60, {'Danger'})
    end
    if #dangerColliders > 0 then
        
        local count = #enemies
        for i=0, count do enemies[i]=nil end

        local newScore = math.ceil(player.score * globalSpeed * -1 / 10)
        if newScore > saveData.highScore then
            saveData.highScore = newScore
            love.filesystem.write("data.lua", table.show(saveData, "saveData"))
        end
        gameOver = true
    end

    
    --Iterating enemies
    for item, e in pairs(enemies) do
        e:setPosition(e:getX() - e.speed * dt + globalSpeed, e:getY())
        local eCollider = world:queryRectangleArea(e:getX() - 30, e:getY() + 28, 20, 10, {'Danger'})
        if #eCollider>0 then
            destroyEnemies()
        end
    end
    

    if love.keyboard.isDown('down') then
        player.isDashing = true
        
    else
        player.isDashing = false
    end

    globalSpeed = globalSpeed - 0.0005
    player.animation:update(dt)
end

function love.draw()

    if paused == true then
        love.graphics.setColor(1, 1, 1, 0.2)
    end

    if  mainMenu ==true then
        love.graphics.setColor(1, 1, 1, 0.4)
    end

    if gameOver == true then
        love.graphics.setColor(0.5, 0.1, 0.1)
    end
    if nightMode == true then 
        love.graphics.draw(images.night, 0, 0, nil, 1, 0.9, 1, 1)
    else
        love.graphics.draw(images.day, 0, 0, nil, 1, 0.9, 1, 1)
    end

    --SET NIGHT MODE AFTER 7KM
    if 2 + player.distance > 6 then
        setNight()
    end

    --UI AND WORLD DRAWING
    gameMap:drawLayer(gameMap.layers["map"])
    -- world:draw()
    drawText()

    love.graphics.draw(images.logo, 230, 42, nil, 0.5, 0.5, 1, 1)
    
    if gameOver == false then
        local px, py = player:getPosition()
        player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)

        drawEnemies()
    end

    --DEBUG
        -- love.graphics.print( "global speed:" ..  globalSpeed , font, 250, 250, nil, 1, 1)
        -- love.graphics.print( "number of enemies:" ..  #enemies , font, 250, 300, nil, 1, 1)
    --DEBUG
end

function setNight()
    
    nightMode = true
    if gameOver == false then
        love.graphics.setColor(0.1, 0.52941176471, 1)
        images.logo = images.logonight
    end
end

function setDay()
    nightMode = false
    love.graphics.setColor(1,1,1)
end

function love.keypressed(key)
    
    mainMenu = false
    paused = false

    --MUSIC SETTINGS
    if key == 'escape' then
        mainMenu = true
        destroyEnemies()
        globalSpeed = 0
        spawnMultiplier = 0
        player.score = 0
        player.distance = 0
    end

    if key == 'm' then
        if enableMusic == true then
            enableMusic = false
            music:pause()
        else
            enableMusic = true
            music:play()
        end
    end

    --PAUSE MODE
    if key == 'p' then
        paused = true
        music:pause()

    end
    
    if gameOver == true then
        love.load()
    end

    if gameOver == true then return end


    --JUMPING AND FALLING
    if key == 'up' then
        local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
        if #colliders > 0 then
            player:applyLinearImpulse(0, -2400)
        end
    elseif key == 'down' then
        player:applyLinearImpulse(0, 2400)
    end
end

function buildUI() 
    -- love.graphics.setBackgroundColor( 1, 1, 1, 0.9 )

    images = {}
    images.day = love.graphics.newImage('sprites/bg.png')
    images.night = love.graphics.newImage('sprites/bg_night.png')
    images.logoday = love.graphics.newImage('sprites/logo.png')
    images.logonight = love.graphics.newImage('sprites/logo_night.png')
    
    images.logo = images.logoday

    font = love.graphics.newFont('fonts/ps2p.ttf')
end

function changeBackground()

end

function startMusic()
    music:setVolume(0.2)
    music:setLooping(true)
    if enableMusic == true then
        music:play()
    end
end

function drawText()
    --DURING GAME
    if nightMode == true then 
        love.graphics.setColor(1, 1, 1, 1)
    else
        love.graphics.setColor(0.2, 0.52941176471, 0.8)
    end

    if mainMenu == false and gameOver == false then
        love.graphics.print( messages.SCORE .. math.ceil(player.score * globalSpeed * -1 / 10), font, 250, 120, nil, 1, 1)
        love.graphics.print( messages.SPEED .. 1 + player.distance .. "km/h", font, 420, 120, nil, 1, 1)
    end
    love.graphics.setColor(1, 1,1)

    love.graphics.print( messages.HIGH_SCORE .. saveData.highScore, font, 50, 550, nil, 1, 1)

    --MAIN MENU

    --GAME PAUSED
    if mainMenu == true then
        love.graphics.print( messages.START, font, 240, 340, nil, 1.2, 1.2)
    end
    if paused == true then
        love.graphics.print( messages.GAME_PAUSED, font, 260, 200, nil, 2, 2)
        love.graphics.print( messages.START, font, 240, 340, nil, 1.2, 1.2)
    end

    
    --GAME OVER
    if gameOver == true then
        love.graphics.print( messages.GAME_OVER, font, 285, 200, nil, 2, 2)
        love.graphics.print( messages.SCORE  .. math.ceil(player.score * globalSpeed * -1 / 10), font, 285, 250, nil, 2, 2)
        love.graphics.print( messages.START, font, 260, 340, nil, 1.2, 1.2)
    end
end

function spawnPlatform(x, y, w, h)
    platform = world:newRectangleCollider(x, y, w, h, {collision_class = 'Platform'})
    platform:setType('static')
    table.insert(platforms, platform)
end

function loadMap()
    gameMap = sti('maps/map.lua')
    for i, obj in pairs(gameMap.layers["Platform"].objects) do
        spawnPlatform(obj.x, obj.y, obj.width, obj.height)
    end
end