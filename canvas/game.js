/**
 * Created by airing on 15/8/19.
 */


function startGame(cxt) {
    score = 0;
    init(cxt);
    newBox(cxt);
    newBox(cxt);
}


function moveKeyDown() {
    event.preventDefault();
    switch (event.keyCode) {
        case 37: //left
            if (moveLeft()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 38: //up
            if (moveUp()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 39: //right
            if (moveRight()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
            break;
        case 40: //down
            if (moveDown()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
            break;
        default: //default
            break;
    }
}

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;
    if (Math.abs(deltax) < 0.3 * documentWidth && Math.abs(deltay) < 0.3 * documentWidth)
        return;

    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            //move right
            if (moveRight()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
        }
        else {
            //move left
            if (moveLeft()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
        }
    }
    else {
        if (deltay > 0) {
            //move down
            if (moveDown()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
        }
        else {
            //move up
            if (moveUp()) {
                setTimeout(newBox(context), 210);
                setTimeout(isGameOver(), 300);
            }
        }
    }
});

function newBox(cxt) {
    if (nospace(nums))
        return false;

    //随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    var times = 0;
    while (times < 50) {
        if (nums[randx][randy] == 0)
            break;

        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    if (times == 50) {
        for (var i = 0; i < 4; i++)
            for (var j = 0; j < 4; j++) {
                if (nums[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    nums[randx][randy] = randNumber;
    drawBox(cxt, randx, randy, randNumber);

    return true;
}

function isGameOver() {
    if (nospace(nums) && nomove(nums)) {
        alert("游戏结束，您的得分为：" + score);
    }
}

function moveLeft() {

    if (!canMoveLeft(nums))
        return false;

    //moveUp
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (nums[i][j] != 0) {
                for (var k = 0; k < i; k++) {

                    if (nums[k][j] == 0 && noBlockVertical(j, k, i, nums)) {
                        //move

                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockVertical(j, k, i, nums)) {
                        //move

                        //add
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        //add score
                        score += nums[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView(context), 200);
    return true;
}


function moveUp() {
    if (!canMoveUp(nums))
        return false;

    //moveup
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (nums[i][j] != 0) {

                for (var k = 0; k < j; k++) {
                    if (nums[i][k] == 0 && noBlockHorizontal(i, k, j, nums)) {
                        //move
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    }
                    else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, k, j, nums)) {
                        //move

                        //add
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        //add score
                        score += nums[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }
    setTimeout(updateBoardView(context), 200);
    return true;
}

function moveRight() {
    if (!canMoveRight(nums))
        return false;

    //moveRight

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > i; k--) {

                    if (nums[k][j] == 0 && noBlockVertical(j, i, k, nums)) {
                        //move
                        nums[k][j] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    }
                    else if (nums[k][j] == nums[i][j] && noBlockVertical(j, i, k, nums)) {
                        //move
                        //add
                        nums[k][j] += nums[i][j];
                        nums[i][j] = 0;
                        //add score
                        score += nums[k][j];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView(context), 200);
    return true;

}

function moveDown() {
    if (!canMoveDown(nums))
        return false;

    //moveDown
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (nums[i][j] != 0) {
                for (var k = 3; k > j; k--) {

                    if (nums[i][k] == 0 && noBlockHorizontal(i, j, k, nums)) {
                        //move
                        nums[i][k] = nums[i][j];
                        nums[i][j] = 0;
                        continue;
                    }
                    else if (nums[i][k] == nums[i][j] && noBlockHorizontal(i, j, k, nums)) {
                        //move

                        //add
                        nums[i][k] += nums[i][j];
                        nums[i][j] = 0;
                        //add score
                        score += nums[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    setTimeout(updateBoardView(context), 200);
    return true;
}

function canMoveLeft(nums) {


    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++)
            if (nums[i][j] != 0)
                if (nums[i - 1][j] == 0 || nums[i - 1][j] == nums[i][j])
                    return true;

    return false;
}

function canMoveRight(nums) {

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--)
            if (nums[i][j] != 0)
                if (nums[i + 1][j] == 0 || nums[i + 1][j] == nums[i][j])
                    return true;

    return false;
}

function canMoveUp(nums) {

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            if (nums[i][j] != 0)
                if (nums[i][j - 1] == 0 || nums[i][j - 1] == nums[i][j])
                    return true;

    return false;
}

function canMoveDown(nums) {

    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--)
            if (nums[i][j] != 0)
                if (nums[i][j + 1] == 0 || nums[i][j + 1] == nums[i][j])
                    return true;

    return false;
}

function nospace(nums) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (nums[i][j] == 0)
                return false;

    return true;
}

function nomove(nums) {
    if (canMoveLeft(nums) ||
        canMoveRight(nums) ||
        canMoveUp(nums) ||
        canMoveDown(nums))
        return false;

    return true;
}

function noBlockHorizontal(row, col1, col2, nums) {
    for (var i = col1 + 1; i < col2; i++)
        if (nums[row][i] != 0)
            return false;
    return true;
}


function noBlockVertical(col, row1, row2, nums) {
    for (var i = row1 + 1; i < row2; i++)
        if (nums[i][col] != 0)
            return false;
    return true;
}

function updateScore(score) {
    $('#score').text(score);
}