var docField
var field;
var dialog;

var step;

var dialogShown;
var hintErased = false;

var interval;

$(function () {
    dialog = $("#dialog");
    docField = $('#text_field');
    field = $('#dialog_text');
    field.click(function () {
        if (!hintErased) {
            field.val('');
            hintErased = true;
        }
    })
    dialog.hide();
    dialogShown = false;
    $('#btnShowDialog').click(showDialog);
})

function showDialog() {

    if (!dialogShown) {

        dialogShown = true;
        interval = 1;
        step = 3;
        dialog.show();

        var centerX = window.innerWidth / 2 - 200;
        var left = window.innerWidth;
        var top = window.innerHeight / 2 - 100;
        dialog.css('left', left);
        dialog.css('top', top);

        var iteration = setInterval(move, interval);

        function move() {
            if (left > centerX) {
                left -= step;
                dialog.css('left', left);
            }
            else {
                clearInterval(iteration);
            }
        }

        document.getElementById('btnOk').onclick = function () {
            docField.html(field.val());
            dialog.fadeOut();
            dialogShown = false;
            hintErased = false;
            field.val('Введите текст...');
        };

        document.getElementById('btnCancel').onclick = function () {
            dialog.fadeOut();
            dialogShown = false;
            hintErased = false;
            field.val('Введите текст...');
        };
    }
}