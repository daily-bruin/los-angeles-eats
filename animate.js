//function for start button
// function mouseOver()
// {
//  $("#start").hide();
//  $("#westwood").show();
//  $("#sawtelle").addClass("left");
//  $("#santamonica").addClass("right");
// }

var near;
var query;
var price;

$(document).ready(function() { 
    //checks difference between number of rows and ids. If none, guide is complete and code can be removed.
    //if a result is used in more that one question reduce the value or results by the number of reuses
    var rows = $('#qTable tr').length - 1; 
    var liids = $('#qTable li').length;

    $('#qTable li').addClass("circle");

    $('#qTable li').on('click',function() {
    //style the selected answer
    $(this).addClass('selectedAnswer').siblings().removeClass('selectedAnswer');    

    //hide all rows after the currently displayed row and remove selectedAnswer style
    var rowCurrent = $(this).closest("tr").prevAll("tr").length + 2; 
    var rowsAfter = ' tr:nth-child(n+' + rowCurrent + ')';

    $('#qTable' + rowsAfter).hide().find('li').removeClass('selectedAnswer');

    //show the next row that matches the question id
    var italNum =  $(this).find('i').text();
    if(italNum < 4){
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
    }

    var parent =  $(this).parent().attr('id');

    if( parent == "near"){
        near = $(this).attr('id');
        console.log(near);
    }

    if( parent == "query"){

        
        query = $(this).attr('id');
    
        if(  $(this).attr('id') == "random")
        {
            query = "";
        }
        console.log(query);
    
    }

    if( parent == "price"){
        price = $(this).attr('id');

        console.log(price);


        $.getJSON('https://api.foursquare.com/v2/venues/explore?near='+near+'&query='+query+'&price='+price+'&oauth_token=MEIANHQZROVVGEY4MBKNJMUYHKEPUXR2QL5HLNJP335ZDIJB&v=20150421',
    
            function(data) {
            $.each(data.response.groups, function(key,value){
                $.each(value.items, function(key2,value2){
                    console.log(value2.venue);
                    var content = '<p>' + value2.venue.name + '</p>';
                    $(content).appendTo("#qTable");
                }); 
            });
        });
    }



    

    })

})
