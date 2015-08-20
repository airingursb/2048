/**
 * Created by airing on 15/8/19.
 */
var documentWidth = window.screen.availWidth;
var margin = 0.04 * documentWidth;
var gamebox_width = 0.92 * documentWidth;
var box_width = 0.18 * documentWidth;
var numSize = 0.5 * box_width;
var margin_top = 0;
var margin_left = 0;
var color_bg = "#BBADA0";
var color_0 = "#CDC1B3";
var color_2 = "#EEE4DA";
var color_4 = "#EEE0C6";
var color_8 = "#F3B174";
var color_16 = "#F8955C";
var color_32 = "#F87C5A";
var color_64 = "#F65E3B";
var color_128 = "#ECCF85";
var color_256 = "#EDCD62";
var color_512 = "#EEC944";
var color_1024 = "#EEC944";
var color_2048 = "#EEC944";
var color_4096 = "#EEC944";
var color_8192 = "#EEC944";
var color_text1 = "#776F64";
var color_text2 = "#F7F6F2";
var score = 0;
var nums = new Array();
var boxs = new Array();
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;



function prepareForMobile() {
    if (documentWidth > 500) {
        canvas.width = 500;
        canvas.height = 500;
        margin = 16;
        gamebox_width = 500;
        box_width = 105;
    }
}

function init(cxt) {
    drawRoundRect(cxt, margin_left, margin_top, gamebox_width, gamebox_width, 5);
    cxt.fillStyle = color_bg;
    cxt.fill();

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawBox(cxt, i, j, 0, box_width);
        }
    }

    for (i = 0; i < 4; i++) {
        nums[i] = new Array();
        boxs[i] = new Array();
        for (j = 0; j < 4; j++) {
            nums[i][j] = 0;
            boxs[i][j] = new Box(i, j, nums[i][j]);
        }
    }
}


function drawRoundRect(cxt, x, y, width, height, radius) {
    context.beginPath();
    context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    context.lineTo(width - radius + x, y);
    context.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    context.lineTo(width + x, height + y - radius);
    context.arc(width - radius + x, height - radius + y, radius, 0, Math.PI / 2);
    context.lineTo(radius + x, height + y);
    context.arc(radius + x, height - radius + y, radius, Math.PI / 2, Math.PI);
    context.closePath();

}

function drawBox(cxt, i, j, num) {
    var x = margin_left + margin * (i + 1) + box_width * i;
    var y = margin_top + margin * (j + 1) + box_width * j;
    drawRoundRect(cxt, x, y, box_width, box_width, 5);
    cxt.font = numSize + "px Arial";
    cxt.textAlign = "center";
    cxt.textBaseline = "middle";
    switch (num) {
        case 0:
            cxt.fillStyle = color_0;
            break;
        case 2:
            cxt.fillStyle = color_2;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 4:
            cxt.fillStyle = color_4;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text1;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 8:
            cxt.fillStyle = color_8;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 16:
            cxt.fillStyle = color_16;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 32:
            cxt.fillStyle = color_32;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 64:
            cxt.fillStyle = color_64;
            cxt.fill();
            cxt.beginPath();
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 128:
            cxt.fillStyle = color_128;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 256:
            cxt.fillStyle = color_256;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 512:
            cxt.fillStyle = color_512;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.95 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 1024:
            cxt.fillStyle = color_1024;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 2048:
            cxt.fillStyle = color_2048;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 4096:
            cxt.fillStyle = color_4096;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
        case 8192:
            cxt.fillStyle = color_8192;
            cxt.fill();
            cxt.beginPath();
            cxt.font = (0.9 * numSize) + "px Arial";
            cxt.fillStyle = color_text2;
            cxt.fillText(num, x + box_width / 2, y + box_width / 2);
            break;
    }
    cxt.fill();
}


function updateBoardView(cxt) {

    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (nums[i][j] == 0) {
                drawBox(cxt, i, j, 0);
                boxs[i][j] = new Box(i, j, 0);
            }
            else {
                drawBox(cxt, i, j, nums[i][j]);
                boxs[i][j] = new Box(i, j, nums[i][j]);
            }
        }

}
