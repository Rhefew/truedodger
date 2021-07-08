
function love.load()
    gameOver = false
    --[libraries]
    anim8 = require 'libraries/anim8/anim8'
    sti = require 'libraries/sti/sti'
    require 'libraries/show'
    --[end]

    require 'enemies'

    sprites = {}
    sprites.playerSheet = love.graphics.newImage('sprites/truedodger.png')
    sprites.ground1 = love.graphics.newImage('sprites/ground1.png')
    sprites.ground2 = love.graphics.newImage('sprites/ground2.png')
    sprites.fly1 =    love.graphics.newImage('sprites/fly1.png')
    sprites.fly2 =    love.graphics.newImage('sprites/fly2.png')
    
    buildUI()

    playerAnimations = {}

    --Player playerAnimations
    local playerGrid      = anim8.newGrid(118, 118, sprites.playerSheet:getWidth(), sprites.playerSheet:getHeight())

    playerAnimations.idle = anim8.newAnimation(playerGrid('1-1', 1), 0.1)
    playerAnimations.run = anim8.newAnimation(playerGrid('2-5', 1), 0.1)
    playerAnimations.jump = anim8.newAnimation(playerGrid('7-7', 1), 0.1)
    playerAnimations.dash = anim8.newAnimation(playerGrid('6-6', 1), 0.1)


    --Ground enemies playerAnimations
    local ground1 = anim8.newGrid(118, 118, sprites.ground1:getWidth(), sprites.ground1:getHeight())
    local ground2 = anim8.newGrid(118, 118, sprites.ground2:getWidth(), sprites.ground1:getHeight())
    local fly1    = anim8.newGrid(118, 118, sprites.fly1:getWidth(), sprites.fly1:getHeight())
    local fly2    = anim8.newGrid(118, 118, sprites.fly2:getWidth(), sprites.fly1:getHeight())

    playerAnimations.ground1 = anim8.newAnimation(ground1('1-2', 1), 1)
    playerAnimations.ground2 = anim8.newAnimation(ground2('1-2', 1), 1)

    playerAnimations.fly1 = anim8.newAnimation(fly1('1-2', 1), 1)
    playerAnimations.fly2 = anim8.newAnimation(fly2('1-2', 1), 1)

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

    loadMap()
end


function love.update(dt)

    if gameOver == true then return end

    spawntimer = spawntimer + dt
    local randomInverval = love.math.random(1.6,3)
    if spawntimer > randomInverval then
        spawnEnemy()
        spawntimer = 0 + globalSpeed * spawnMultiplier
        if spawntimer > 1.3 then
            spawntimer = 1.3
        end
        lspawntimer = spawntimer
    end

    gameMap:update(dt)
    world:update(dt)
    updateEnemy(dt)

    local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
    if #colliders > 0 then
        player.grounded = true
        if player.isDashing == true then
            player.animation = playerAnimations.dash
        else
            player.animation = playerAnimations.run
        end
    else 
        player.grounded = false
        player.animation = playerAnimations.jump
        player.isDashing = false
    end
    
    local dangerColliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Danger'})
    if #dangerColliders > 0 then
        player:destroy()
        gameOver = true
    end

    player.score = player.score + math.ceil(dt / 0.01)
    player.distance = math.ceil(player.score * 0.001)
    
    --Iterating enemies
    for item, e in pairs(enemies) do
        e:setPosition(e:getX() - e.speed * dt + globalSpeed, e:getY())
        local eCollider = world:queryRectangleArea(e:getX() - 30, e:getY() + 28, 20, 10, {'Danger'})
        if #eCollider>0 then
            table.remove(enemies, 1)
            e:destroy()
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
    world:draw()
    -- love.graphics.draw(images.background, 0, 0, nil, 1, 0.9, 1, 1)
    gameMap:drawLayer(gameMap.layers["map"])
    love.graphics.setColor(0.1, 0.5, 0.5)
    love.graphics.print( "SCORE:" .. math.ceil(player.score * globalSpeed * -1 / 10), font, 250, 150, nil, 1, 1)
    love.graphics.print( "SPEED:" .. 2 + player.distance .. "km/h", font, 420, 150, nil, 1, 1)
    love.graphics.setColor(1,1,1)
    -- love.graphics.print( "SPEED:" .. player.distance * 60 .. "km/h", font, 420, 150, nil, 1, 1)

    if gameOver == false then
        local px, py = player:getPosition()
        love.graphics.draw(images.logo, 200, 42, nil, 0.6, 0.6, 1, 1)
        player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)

        drawEnemies()
    end
    --DEBUG
        -- love.graphics.print( "global speed:" ..  globalSpeed , font, 250, 250, nil, 1, 1)
        -- love.graphics.print( "number of enemies:" ..  #enemies , font, 250, 300, nil, 1, 1)
    --DEBUG
end

function love.keypressed(key)
    if key == 'return' then
        love.load()
    end
    if gameOver == true then return end

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
    images.background = love.graphics.newImage('sprites/bg.png')
    images.logo = love.graphics.newImage('sprites/logo.png')

    font = love.graphics.newFont('fonts/ps2p.ttf')
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