var tabs;
var id;

$(function () {
    tabs = $('.active, .nonactive');
    tabs.css('width', (100 / tabs.length) + '%');
    $('.content').hide();
    $('#tab1.content').show();
    tabs.click(function () {
        id = $(this).attr('id');
        //$('.content').scrollTop(0);
        $('.content').hide();
        $(tabs).attr('class', 'nonactive');
        $(this).attr('class', 'active');
        $('#' + id + '.content').show();
    });
});