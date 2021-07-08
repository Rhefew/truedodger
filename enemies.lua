enemies = {}

function spawnEnemy()
    local probability = 2
    local rIsFlying = math.random(0,probability)

    local height = 50
    local width = 25
    local offsetMultiplier = 1
    if rIsFlying == probability then
        height = 25
        width = 40
        offsetMultiplier = 0
    end
    local e = { x = 270, y = 340 + offsetMultiplier * 60, offset = 1000 , w = width, h = height}

    local enemy = world:newRectangleCollider(e.offset , e.y, e.w, e.h, { collision_class = 'Danger' })
    enemy:setType('static')
    
    
    local randomSprite = math.random(1,2)
    enemy.speed = 240
    if randomSprite == 1 then
        enemy.animation = playerAnimations.ground1
        enemy.sprite = sprites.ground1
    else
        enemy.animation = playerAnimations.ground2
        enemy.sprite = sprites.ground2
    end
    enemy.offsetx = 20
    enemy.offsety = 36
    enemy.scale = 0.7

    if rIsFlying == probability then
        if randomSprite == 1 then
            enemy.animation = playerAnimations.fly1
            enemy.sprite = sprites.fly1
        else
            enemy.animation = playerAnimations.fly2
            enemy.sprite = sprites.fly2
        end
        enemy.speed = 400
        enemy.offsetx = 24
        enemy.offsety = 24
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
    for i, e in ipairs(enemies) do
        if e ~= nil then
            local ex, ey = e:getPosition()
            e.animation:draw(e.sprite, ex - e.offsetx, ey - e.offsety, nil, e.scale)
            -- player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)
        end
    end
end