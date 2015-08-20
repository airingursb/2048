/**
 * Created by airing on 15/8/19.
 */

function Box(i, j, num) {
    this.x = margin_left + margin * (i + 1) + box_width * i;
    this.y = margin_top + margin * (j + 1) + box_width * j;
    this.width = box_width;
    this.num = num;
    this.speed = 10;

    //向上移动
    this.moveUp = function () {
        this.y -= this.speed;
    };

    //向右移动
    this.moveRight = function () {
        this.x += this.speed;
    };

    //向左移动
    this.moveLeft = function () {
        this.x -= this.speed;
    };

    //向下移动
    this.moveDown = function () {
        this.y += this.speed;
    };

    this.show = function () {
        this.width = 0;
        while (this.width < box_width) {
            this.width += this.speed;
        }
        this.width = box_width;
    }
}

function updateBox(cxt, i, j, num,w) {
    cxt.save();
    cxt.beginPath();
    drawBox(cxt, i, j, num,w);
    cxt.restore();
}

function showBoxWithAnimation(cxt, i, j, num) {
    var w = 0;
    while(w < box_width){
        w += 5;
        updateBox(cxt, i, j, num,w);
    }
}