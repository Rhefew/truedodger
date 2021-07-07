
function spawnEnemy()
    local probability = 3
    local rIsFlying = math.random(0,probability)

    local height = 50
    local width = 25
    local offsetMultiplier = 1
    if rIsFlying == probability then
        height = 25
        width = 50
        offsetMultiplier = 0
    end
    local e = { x = 270, y = 340 + offsetMultiplier * 75, offset = 1500 , w = width, h = height}

    enemy = world:newRectangleCollider(e.offset , e.y, e.w, e.h, { collision_class = 'Danger' })
    enemy:setType('static')
    
    
    enemy.speed = 240
    enemy.animation = animations.enemyGround
    enemy.sprite = sprites.enemyGround
    enemy.offsetx = 20
    enemy.offsety = 28

    if rIsFlying == probability then
        enemy.animation = animations.enemyFly
        enemy.sprite = sprites.enemyFly
        enemy.speed = 300
        enemy.offsetx = 20
        enemy.offsety = 28
    end

    return enemy
end

function updateEnemy(dt)
    enemy.animation:update(dt)
end
function drawEnemies(enemies)
    for i, e in ipairs(enemies) do
        local ex, ey = e:getPosition()
        e.animation:draw(e.sprite, ex - e.offsetx, ey - e.offsety, nil, 2.2)
        -- player.animation:draw(sprites.playerSheet, px, py, nil, 0.7, nill, 59, 59)
    end
end