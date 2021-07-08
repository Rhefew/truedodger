enemies = {}

function spawnEnemy()
    local probability = 2
    local rIsFlying = math.random(0,probability)

    local params = {}
    params.height = 50
    params.width = 25
    params.xpos = 270
    params.ypos = 420
    if rIsFlying == probability then
        params.height = 25
        params.width = 40
        params.xpos = 300
        params.ypos = 390
    end
    local e = { x = params.xpos, y = params.ypos, offset = 1000 , w = params.width, h = params.height}

    local enemy = world:newRectangleCollider(e.offset , e.y, e.w, e.h, { collision_class = 'Danger' })
    enemy:setType('static')
    
    enemy.offsetx = e.w + 10
    enemy.offsety = e.y/8
    
    local randomSprite = math.random(1,3)
    enemy.speed = 240
    if randomSprite == 1 then
        enemy.animation = animations.ground1
        enemy.sprite = sprites.ground1
    elseif randomSprite == 2 then
        enemy.animation = animations.ground2
        enemy.sprite = sprites.ground2
    else
        enemy.animation = animations.ground3
        enemy.sprite = sprites.ground3
    end
    enemy.scale = 0.7

    if rIsFlying == probability then
        enemy.offsetx = e.w - 12
        enemy.offsety = enemy.offsety - 10
        if randomSprite == 1 then
            enemy.animation = animations.fly1
            enemy.sprite = sprites.fly1
        else
            enemy.animation = animations.fly2
            enemy.sprite = sprites.fly2
        end
        enemy.speed = 400
        enemy.scale = 0.5
    end

    table.insert(enemies, enemy)
end

function updateEnemy(dt)
    for i, e in ipairs(enemies) do
        e.animation:update(dt)
    end
end

function drawEnemies()
    if gameOver == true then return end 
    
    for i, e in pairs(enemies) do
        if e ~= nil then
            local ex, ey = e:getPosition()
            e.animation:draw(e.sprite, ex - e.offsetx, ey - e.offsety, nil, e.scale)
            -- player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)
        end
    end
end