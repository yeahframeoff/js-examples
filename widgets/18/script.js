var pointer;

var x, y;
var oldAlpha;
var curAlpha;
var deltaAlpha;

var minAngle;
var maxAngle;

var mouseAngle;
var screenAngle;

var orthX, orthY;
var value;
var valueField;

$(function ()
{
    minAngle = -Math.PI / 6;
    maxAngle = Math.PI + Math.PI / 6;

    mouseAngle = screenAngle = minAngle;
    orthX = -100;
    orthY = 0;

    pointer = document.getElementById('pointer');
    valueField = document.getElementById('value');

    value = 0;
    valueField.innerHTML = value;
    
    $('#pointer').css('transform', 'rotate(' + screenAngle + 'rad)');
    $('#pointer').css('-webkit-transform', 'rotate(' + screenAngle + 'rad)');

    x = pointer.offsetLeft + 107;
    y = pointer.offsetTop + 107;


    pointer.onmousedown = function (e) {
        var self = this;
        oldAlpha = curAlpha = getAngle(orthX, orthY, abs(orthX, 0, orthY, 0),
            e.clientX - x, e.clientY - y, abs(e.clientX, x, e.clientY, y));
        deltaAlpha = curAlpha - oldAlpha;
        mouseAngle += deltaAlpha;

        document.onmousemove = function (e) {

            oldAlpha = curAlpha;
            
            curAlpha = getAngle(orthX, orthY, abs(orthX, 0, orthY, 0),
                e.clientX - x, e.clientY - y, abs(e.clientX, x, e.clientY, y));
            deltaAlpha = curAlpha - oldAlpha;
            rotate(deltaAlpha);
        };

        this.onmouseup = document.onmouseup = function () {
            document.onmousemove = self.onmousemove = null;
        };
    };

    pointer.ondragstart = function () {
        return false;
    };
})

function abs(x1, x2, y1, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

function getAngle(x1, y1, l1, x2, y2, l2) {
    var scalar = x1 * x2 + y1 * y2;
    var vector = x1 * y2 - x2 * y1;
    var cos = scalar / (l1 * l2);
    var sin = vector / (l1 * l2);

    if (sin > 0)
        angle = Math.acos(cos);
    else
        angle = 2 * Math.PI - Math.acos(cos);

    return angle;
}

function rotate(delta) {
    
    mouseAngle += delta;
    while (!(-Math.PI / 2 < mouseAngle && mouseAngle < 3 * Math.PI / 2)) {
        if (!(-Math.PI / 2 < mouseAngle))
            mouseAngle += 2 * Math.PI;
        else
            mouseAngle -= 2 * Math.PI;
    }

    if (mouseAngle < minAngle)
        screenAngle = minAngle;
    else if (mouseAngle <= maxAngle)
        screenAngle = mouseAngle;
    else
        screenAngle = maxAngle;
    
    value = Math.round((screenAngle - minAngle) * 16 / (maxAngle - minAngle));
    valueField.innerHTML = value;

    $('#pointer').css('transform', 'rotate(' + screenAngle + 'rad)');
    $('#pointer').css('-webkit-transform', 'rotate(' + screenAngle + 'rad)');
}