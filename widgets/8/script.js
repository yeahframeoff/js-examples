var chosen;
var list;
var chooseBtn;

var iteration;
var interval;

var currentLeft;
var step;

$(function () {
    var shown = false;
    interval = 1;
    step = 3;

    chosen = $('#chosenType');
    list = $('#list');
    chooseBtn = $('#chooseBtn');
    list.css('top', (chosen.offset().top + chosen.outerHeight() + 4) + 'px');
    list.hide();

chooseBtn.click(function () {
    if (!shown) {
        chooseBtn.attr('disabled', 'disabled');
        chooseBtn.attr('clickable', 'false');
        list.show();
        list.css({
            left: chooseBtn.offset().left + chooseBtn.outerWidth(),
            opacity: 0.0
        });
        list.animate({
            left: chosen.offset().left,
            opacity: 1.0
        },
        1200, function () { shown = true });
    }
});

    $('.li').click(function () {
        
        if (shown) {
            var text = $(this).html();
            chosen.html(text);
            chooseBtn.removeAttr('disabled');
            chooseBtn.attr('clickable', 'true');
            list.hide();
            shown = false;
        }
    });

    $('.li').dragstart(function () { return false; });

});