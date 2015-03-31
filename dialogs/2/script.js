var docField
var dialog;

var btnShowDialog;
var step;

var dialogShown;

var interval;

$(function () {
    dialog = $("#dialog");
    docField = $('#text_field');
    btnShowDialog = $('#btnShowDialog');
    dialog.hide();
    dialogShown = false;
    btnShowDialog.click(showDialog);
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
        };

        $('#btnOk').click (function () {
            docField.html
                ('Пользователь действительно хочет закрыть сессию<br />(Код 1)');
            dialog.fadeOut();
            dialogShown = false;
        });

        $('#btnCancel').click(function () {
            docField.html('Пользователь хочет чего-то другого<br />(Код 2)');
            dialog.fadeOut();
            dialogShown = false;
        });
    }
}