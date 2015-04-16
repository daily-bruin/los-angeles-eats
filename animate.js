//function for start button
// function mouseOver()
// {
// 	$("#start").hide();
// 	$("#westwood").show();
// 	$("#sawtelle").addClass("left");
// 	$("#santamonica").addClass("right");
// }

$(document).ready(function() { 
    //checks difference between number of rows and ids. If none, guide is complete and code can be removed.
    //if a result is used in more that one question reduce the value or results by the number of reuses
    var rows = $('#qTable tr').length - 1; 
    var liids = $('#qTable li').length;



    $('#qTable li').addClass("circle");

    $('#qTable li').on('click',function() 
    {
    //style the selected answer
    $(this).addClass('selectedAnswer').siblings().removeClass('selectedAnswer');    

    //hide all rows after the currently displayed row and remove selectedAnswer style
    var rowCurrent = $(this).closest("tr").prevAll("tr").length + 2; 
    var rowsAfter = ' tr:nth-child(n+' + rowCurrent + ')';

    $('#qTable' + rowsAfter).hide().find('li').removeClass('selectedAnswer');

    //show the next row that matches the question id
    var italNum =  $(this).find('i').text();
    var qNext = ' tr:nth-child(' + italNum + ')';

    $('#qTable' + qNext).fadeIn(800);

    //scroll code to bring next question into view
    var qNextPos = $('#qTable' + qNext).offset();
    var qNextTop = qNextPos.top;
    var qNextHigh = $('#qTable' + qNext).height();
    var qNextBot = qNextHigh + qNextTop + 20; 
    var scrHigh = $(window).innerHeight();
    var difHigh = qNextBot - scrHigh;

    if(difHigh > 0) {
        window.scrollTo(0, difHigh)
    }
    })
})

