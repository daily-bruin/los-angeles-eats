$(document).ready(function() { 
    //checks difference between number of rows and ids. If none, guide is complete and code can be removed.
    //if a result is used in more that one question reduce the value or results by the number of reuses
    var rows = $('#qTable tr').length - 1; 
    var liids = $('#qTable li').length;

<<<<<<< HEAD
    var near;
    var query;
    var price;
    var url;

    var count = 0;

    $('#qTable li').addClass("circle");

    $('#qTable li').on('click',function() 
    {
        //style the selected answer
        $(this).addClass('selectedAnswer').siblings().removeClass('selectedAnswer');    
=======
    $('#qTable li').addClass("circle");

    $('#qTable li').on('click',function() {
    //style the selected answer
    $(this).addClass('selectedAnswer').siblings().removeClass('selectedAnswer');    
>>>>>>> 9e4f5d109a9df9c8b5712ecd05eef2a3c28640d9

        //hide all rows after the currently displayed row and remove selectedAnswer style
        var rowCurrent = $(this).closest("tr").prevAll("tr").length + 2; 
        var rowsAfter = ' tr:nth-child(n+' + rowCurrent + ')';

        $('#qTable' + rowsAfter).hide().find('li').removeClass('selectedAnswer');

        //show the next row that matches the question id
        var italNum =  $(this).find('i').text();

        //we only have three questions to take care of
        if (italNum < 4){
            var qNext = ' tr:nth-child(' + italNum + ')';

            $('#qTable' + qNext).fadeIn(800);

<<<<<<< HEAD
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


        
        var parent = $(this).parent().attr('id');

        // console.log($(this).attr('id'));            //test

        if(parent == "near"){
            near = $(this).attr('id')
            console.log(near);
        }
        else if(parent == "query"){
            query = $(this).attr('id')
            if (query == "random"){
                query = "";
            }
            console.log(query);
        }
        else if(parent == "price"){
            price = $(this).attr('id')
            console.log(price);
        }

        url = "https://api.foursquare.com/v2/venues/explore?near=";
        url += near;
        url += ',CA';
        url += '&query=';
        url += query;
        url += '&price=';
        url += price;
        url += '&client_id=0TXOVPQF1LY0HFQW020UVGABPXVGPYQUC3QAEUSM3SMFAQCU&client_secret=VF5P4EWFZKIZZ4UOUX2PGXV5LOH21UL4JT5IVOLZ4IHVMJDK&v=20150421';

        

        count += 1;

        if (count == 3){
            console.log(url);

            $.getJSON(url, function(data) {
                $.each(data.response.groups, function(key,value){
                    // console.log(value.items);
                    $.each(value.items, function(key2,value2){
                        console.log(value2.venue);
                        
                    });
               });
            });
        }
    })

    
    
=======
    if(difHigh > 0) {
        window.scrollTo(0, difHigh)
        }
    })

        $.getJSON('https://api.foursquare.com/v2/venues/explore?near=westwood&query=italian+food&oauth_token=MEIANHQZROVVGEY4MBKNJMUYHKEPUXR2QL5HLNJP335ZDIJB&v=20150421',
        
           function(data) {
            $.each(data.response.groups, function(key,value){
                $.each(value.items, function(key2,value2){
                    console.log(value2.venue);
                    var content = '<p>' + value2.venue.name + '</p>';
                    $(content).appendTo("#qTable");
                }); 
            });
        });



>>>>>>> 9e4f5d109a9df9c8b5712ecd05eef2a3c28640d9
})









