var scroll;
var scrollbar;
var scrolldiv;
var content;
var text;
var btnUp;
var btnDown;
var btnUpInterval;
var btnDownInterval;

var oldY;
var curY;
var deltaY;

var mouseMarginTop;
var totalMarginTop;
var wheelOffset;

var shown;

var coeff;

$(function () {

    mouseMarginTop = 0;
    wheelOffset = 0;
    scroll = document.getElementById('scroll');
    scrollbar = document.getElementById('scrollbar');
    content = document.getElementById('content');
    text = document.getElementById('text');
    btnUp = document.getElementById('scrollBtnUp');
    btnDown = document.getElementById('scrollBtnDown');

    coeff = content.offsetHeight / text.offsetHeight;

    scroll.style.height = scrollbar.offsetHeight * coeff + 'px';

    shown = false;
    $('#scrolldiv').hide();

    content.onmouseover = function () {
        if (!shown) {
            $('#scrolldiv').fadeIn(600);
            shown = true;
        }
    }

    scroll.onmousedown = function (e) {
        var self = this;
        curY = oldY = e.clientY;

        deltaY = curY - oldY;
        mouseMarginTop += deltaY;

        document.onmousemove = function (e) {
            oldY = curY;
            curY = e.clientY;
            deltaY = curY - oldY;
            if (wheelOffset + deltaY <= scrollbar.offsetHeight) {
                if (!(0 <= wheelOffset + deltaY))
                    deltaY -= wheelOffset + deltaY;
                wheelOffset += deltaY;
                moveDrag(deltaY);
            }
        }

        this.onmouseup = document.onmouseup = function () {
            document.onmousemove = self.onmousemove = null;
        }
    };

    scroll.ondragstart = function () {
        return false;
    };

    text.onmouseover = function () {
        text.onmousewheel = onWheel;
    };

    text.onmouseout = function () {
        text.onmousewheel = null;
    };

    btnUp.onmousedown = function () {
        btnUpInterval = setInterval(function () {
            deltaY = -20;
            if (wheelOffset + deltaY <= scrollbar.offsetHeight) {
                if (!(0 <= wheelOffset + deltaY))
                    deltaY -= wheelOffset + deltaY;
                wheelOffset += deltaY;
                moveWheel(deltaY);
            }
        }, 200);
    };

    btnUp.onmouseup = function () {
        clearInterval(btnUpInterval);
    };

    btnDown.onmousedown = function () {
        btnDownInterval = setInterval(function () {
            deltaY = 20;
            if (wheelOffset + deltaY <= scrollbar.offsetHeight) {
                if (!(0 <= wheelOffset + deltaY))
                    deltaY -= wheelOffset + deltaY;
                wheelOffset += deltaY;
                moveWheel(deltaY);
            }
        }, 200);
    };

    btnDown.onmouseup = function () {
        clearInterval(btnDownInterval);
    };

});

function moveDrag(deltaY) {
    mouseMarginTop += deltaY;
    if (mouseMarginTop < 0)
        totalMarginTop = 0;
    else if (mouseMarginTop < (scrollbar.offsetHeight - scroll.offsetHeight))
        totalMarginTop = mouseMarginTop;
    else
        totalMarginTop = (scrollbar.offsetHeight - scroll.offsetHeight);
    scroll.style.marginTop = totalMarginTop + 'px';
    
    text.style.marginTop =
        (content.offsetHeight / scrollbar.offsetHeight) *
        (-totalMarginTop / coeff) + 'px';
}

function moveWheel(deltaY) {
    mouseMarginTop += deltaY;
    if (mouseMarginTop < 0)
        totalMarginTop = 0;
    else if (mouseMarginTop < (scrollbar.offsetHeight - scroll.offsetHeight))
        totalMarginTop = mouseMarginTop;
    else
        totalMarginTop = (scrollbar.offsetHeight - scroll.offsetHeight);
    $('#scroll').animate({ marginTop: totalMarginTop + 'px' }, 200);
    $('#text').animate({
        marginTop: (content.offsetHeight / scrollbar.offsetHeight)
            * (-totalMarginTop / coeff) + 'px'
    }, 200);
}


function onWheel(e) {
    e = e || window.event;
    // wheelDelta не дает возможность узнать количество пикселей
    var delta = e.deltaY || (e.detail * 6) || (-e.wheelDelta / 6);
    if (wheelOffset + delta <= scrollbar.offsetHeight) {
        if (!(0 <= wheelOffset + delta))
            delta -= wheelOffset + delta;
        wheelOffset += delta;
        moveWheel(delta);
    }
}
