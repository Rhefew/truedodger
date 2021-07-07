function love.load()

    anim8 = require 'libraries/anim8/anim8'
    sti = require 'libraries/sti/sti'

    sprites = {}
    sprites.playerSheet = love.graphics.newImage('sprites/truedodger.png')
    
    buildUI()

    local grid = anim8.newGrid(118, 118, sprites.playerSheet:getWidth(), sprites.playerSheet:getHeight())

    animations = {}
    animations.run = anim8.newAnimation(grid('1-5', 1), 0.1)



    wf = require 'libraries/windfield/windfield'
    world = wf.newWorld(0, 1000)
    world:setQueryDebugDrawing(true)

    world:addCollisionClass('Player')
    world:addCollisionClass('Platform')
    world:addCollisionClass('Danger')

    player = world:newRectangleCollider(64, 100, 42, 64, {collision_class = 'Player'})
    player.score = 1
    player.distance = 0
    -- player.speed = 160
    player.animation = animations.run

    globalSpeed = 0

    enemies = createEnemies(200)
    enemiesColliders = {}
    for item, e in pairs(enemies) do
        local enemy = world:newRectangleCollider(e.offset , e.y, e.w, e.h, { collision_class = 'Danger' })
        enemy.speed = 240
        enemy:setType('static')
        table.insert(enemiesColliders, enemy)
    end

    platforms = {}

    loadMap()
end

function love.update(dt)
    gameMap:update(dt)
    world:update(dt)

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
end

function love.draw()
    world:draw()
    gameMap:drawLayer(gameMap.layers["map"])
    
    love.graphics.print( "SCORE:" .. player.score, font, 250, 150, nil, 1, 1)
    love.graphics.print( "DISTANCE:" .. player.distance .. "km", font, 420, 150, nil, 1, 1)

    local px, py = player:getPosition()
    love.graphics.draw(images.logo, 200, 42, nil, 0.25, 0.25, 1, 1)
    player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)
end

function love.keypressed(key)
    if key == 'up' then
        local colliders = world:queryRectangleArea(player:getX() - 30, player:getY() + 28, 60, 10, {'Platform'})
        if #colliders > 0 then
            player:applyLinearImpulse(0, -2500)
        end
    elseif key == 'down' then
        player:applyLinearImpulse(0, 2500)
    end
end



function createEnemies(size) 
    local enemies = {}

    for i = size, 1, -1 do
        local enemy = getRandomEnemy(i)
        table.insert(enemies, enemy)
    end
    return enemies
end

function getRandomEnemy(i)
    local rIsFlying = love.math.random(0, 1)

    local height = 25
    local width = 50
    if rIsFlying == 1 then
        height = 50
        width = 25
    end
    local randOffset = love.math.random(200, 600)
    return { x = 270, y = 340 + rIsFlying * 75, offset = 500 * i + randOffset, w = width, h = height}
end

function buildUI() 
    images = {}
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