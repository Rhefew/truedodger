function love.load()

    --[libraries]
    anim8 = require 'libraries/anim8/anim8'
    sti = require 'libraries/sti/sti'
    require 'libraries/show'
    --[end]

    require 'enemies'

    sprites = {}
    sprites.playerSheet = love.graphics.newImage('sprites/truedodger.png')
    sprites.enemyGround = love.graphics.newImage('sprites/enemyGround.png')
    sprites.enemyFly =    love.graphics.newImage('sprites/enemyFly.png')
    
    buildUI()

    local playerGrid      = anim8.newGrid(118, 118, sprites.playerSheet:getWidth(), sprites.playerSheet:getHeight())
    local enemyGroundGrid = anim8.newGrid(16, 25, sprites.enemyGround:getWidth(), sprites.enemyGround:getHeight())
    local enemyFlyGrid    = anim8.newGrid(20, 24, sprites.enemyFly:getWidth(), sprites.enemyFly:getHeight())

    animations = {}
    animations.idle = anim8.newAnimation(playerGrid('1-1', 1), 0.1)
    animations.run = anim8.newAnimation(playerGrid('2-5', 1), 0.1)
    animations.jump = anim8.newAnimation(playerGrid('7-7', 1), 0.1)
    animations.enemyGround = anim8.newAnimation(enemyGroundGrid('1-2', 1), 0.2)
    animations.enemyFly = anim8.newAnimation(enemyFlyGrid('1-4', 1), 0.1)

    wf = require 'libraries/windfield/windfield'
    world = wf.newWorld(0, 1000, false)
    world:setQueryDebugDrawing(true)

    world:addCollisionClass('Player')
    world:addCollisionClass('Platform')
    world:addCollisionClass('Danger')

    player = world:newRectangleCollider(64, 100, 42, 64, {collision_class = 'Player'})
    player:setFixedRotation(true)
    player.score = 1
    player.distance = 0
    -- player.speed = 160
    player.animation = animations.idle

    globalSpeed = 0
    spawntimer = 0

    enemiesColliders = {}
    table.insert(enemiesColliders, spawnEnemy())
    

    platforms = {}

    loadMap()
end


function love.update(dt)
    spawntimer = spawntimer + dt
    if spawntimer > 2 then
        table.insert(enemiesColliders, spawnEnemy())
      spawntimer = 0 + globalSpeed * -0.01
    end

    gameMap:update(dt)
    world:update(dt)

    local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
    if #colliders > 0 then
        player.animation = animations.run
    else 
        player.animation = animations.jump
    end


    player.score = player.score + math.ceil(dt / 0.01)
    player.distance = math.ceil(player.score * 0.001)
    for item, e in pairs(enemiesColliders) do
        e:setPosition(e:getX() - e.speed * dt + globalSpeed, e:getY())
    end
    

    -- if love.keyboard.isDown('left') then
    --     player:setX(player:getX() - 100 * dt)
    -- elseif love.keyboard.isDown('right') then
    --     player:setX(player:getX() + 100 * dt)
    -- end

    globalSpeed = globalSpeed - 0.0005
    player.animation:update(dt)
    updateEnemy(dt)
end

function love.draw()
    -- world:draw()
    -- love.graphics.draw(images.background, 0, 0, nil, 1, 1, 1, 1)
    gameMap:drawLayer(gameMap.layers["map"])
    drawEnemies(enemiesColliders)
    love.graphics.print( "SCORE:" .. math.ceil(player.score * globalSpeed * -1 / 10), font, 250, 150, nil, 1, 1)
    love.graphics.print( "SPEED:" .. 2 + player.distance .. "km/h", font, 420, 150, nil, 1, 1)
    -- love.graphics.print( "SPEED:" .. player.distance * 60 .. "km/h", font, 420, 150, nil, 1, 1)

    local px, py = player:getPosition()
    love.graphics.draw(images.logo, 200, 42, nil, 0.6, 0.6, 1, 1)
    player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)



    --DEBUG
        love.graphics.print( "global speed:" ..  globalSpeed , font, 250, 250, nil, 1, 1)
        love.graphics.print( "spawn time to add:" ..  globalSpeed * -0.01 , font, 250, 300, nil, 1, 1)
    --DEBUG
end

function love.keypressed(key)
    if key == 'up' then
        local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
        if #colliders > 0 then
            player:applyLinearImpulse(0, -2000)
        end
    elseif key == 'down' then
        player:applyLinearImpulse(0, 2000)
    end
end

function buildUI() 
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