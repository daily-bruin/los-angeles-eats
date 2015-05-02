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

       

        $.getJSON('https://api.foursquare.com/v2/venues/explore?near='+near+',CA&query='+query+'+food&price='+price+'&oauth_token=MEIANHQZROVVGEY4MBKNJMUYHKEPUXR2QL5HLNJP335ZDIJB&v=20150421',
    
            function(data) {
                var cap;
                var random;
                var venueObj;

            $.each(data.response.groups, function(key,value){
                
                cap = Object.keys(value.items).length;
                random = Math.floor(Math.random() *cap);
                console.log(random);
                venueObj = value.items[random].venue;
               
    
                $('#qTable').remove();
                $("<div></div>").attr('id','address').appendTo('body'); 
                $("<div>Ew i wanna start over</div>").attr('id','ew').appendTo('body'); 
                $("<div>Ugh give me another one</div>").attr('id','ugh').appendTo('body'); 
                again(venueObj);

                function again(venueObj){
                var content = '<p>' + venueObj.name + '</p><p>' + venueObj.location.address + '</p><p>' + venueObj.location.city + ', ' + venueObj.location.state + ' ' + venueObj.location.postalCode + '</p>';
                
                
                $(content).appendTo("#address");
                console.log(venueObj.location.lat);
                console.log(venueObj.location.lng);


                google.maps.event.addDomListener(window, 'load', showMap(venueObj.location.lat, venueObj.location.lng, venueObj.name));
                }

                $('#ew').click( function() {
                    window.location.reload(true);
                });



        function showMap(latitude,longitude) {
            var myLatlng = new google.maps.LatLng(latitude,longitude);
            var mapOptions = {
                zoom: 15,
                center: myLatlng
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: 'Marker'
            });
        }
    })

                $('#ugh').click( function() {
                    random = Math.floor(Math.random() *cap);
                    console.log(random);
                    venueObj = value.items[random].venue;
                    $('#address').empty();
                    again(venueObj);
                });
            
            });
        });
    }
            

            var map;
           
            function showMap(latitude, longitude, name) {
                var myLatlng = new google.maps.LatLng(latitude,longitude);
                var mapOptions = {
                    zoom: 12,
                    center: myLatlng
                 };
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

                  var marker = new google.maps.Marker({
                          position: myLatlng,
                          map: map,
                          title: name,
                      });
                } 

                
    

    })


})
