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


    /*
        super big function
        ends with a map function
     */
    $('#qTable li').on('click',function() {
    
        //style the selected answer
        $(this).addClass('selectedAnswer').siblings().removeClass('selectedAnswer');    

        //hide all rows after the currently displayed row and remove selectedAnswer style
        var rowCurrent = $(this).closest("tr").prevAll("tr").length + 2; 
        var rowsAfter = ' tr:nth-child(n+' + rowCurrent + ')';

        $('#qTable' + rowsAfter).hide().find('li').removeClass('selectedAnswer');

        //show the next row that matches the question id
        var italNum =  $(this).find('i').text();

        if(italNum < 4) {
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

        }   //end of if italiNum

        var parent =  $(this).parent().attr('id');

        if( parent == "near"){
            near = $(this).attr('id');
            console.log(near);
            var label = $(this).text();
            label = label.slice(0, -1);
            $('<div>'+label+'</div>').attr('class','circle').appendTo('#sidebar');
        }   //end of if near

        if( parent == "query"){
            query = $(this).attr('id');
            console.log(query);
            var label = $(this).text();
            label = label.slice(0, -1);
            $('<div>'+label+'</div>').attr('class','circle').appendTo('#sidebar');
        }   //end of if query

        if( parent == "price"){
            price = $(this).attr('id');

            console.log(price);
            var label = $(this).text();
            label = label.slice(0, -1);
            $('<div>'+label+'</div>').attr('class','circle').appendTo('#sidebar');

            $.getJSON('https://api.foursquare.com/v2/venues/explore?ll='+near+'&query='+query+'&price='+price+'&oauth_token=MEIANHQZROVVGEY4MBKNJMUYHKEPUXR2QL5HLNJP335ZDIJB&v=20150421',
        
                function(data) {
                    var cap;
                    var random;
                    var venueObj;

                $.each(data.response.groups, function(key,value){
                    cap = Object.keys(value.items).length;

                    if (cap == 0){
                         $('#qTable').remove();
                        $("<div>Too demanding. Nonexistent.</div>").attr('id','ew').appendTo('body'); 
                    }

                    else {
                    random = Math.floor(Math.random() *cap);
                    console.log(random);
                    venueObj = value.items[random].venue;
                   
                   

                    $('#qTable').remove();
                    $("<div></div>").attr('id','address').appendTo('body'); 
                    $("<div>Start over</div>").attr('id','ew').appendTo('body'); 
                    $("<div>Next choice</div>").attr('id','ugh').appendTo('body'); 
                    again(venueObj);

                    function again(venueObj){
                        console.log(venueObj);
                        var content;
                        if (venueObj.hasOwnProperty("name")){
                            content = '<p>' + venueObj.name + '</p>';
                        }
                        if (venueObj.location.hasOwnProperty("address")){
                            content += '<p>' + venueObj.location.address + '</p>';
                        }
                        if (venueObj.location.hasOwnProperty("city")){
                            content += '<p>' + venueObj.location.city;
                        }
                        if (venueObj.location.hasOwnProperty("state")){
                            content += ', ' + venueObj.location.state;

                            if (venueObj.location.hasOwnProperty("postalCode")){
                                content += ' ' + venueObj.location.postalCode + '</p>';
                            }
                            else{
                                content += '</p>'
                            }
                        }
                        if (venueObj.hasOwnProperty("delivery")){
                            content += "<p><a href=" + venueObj.delivery.url + " target='_blank'>OMG DELIVERY</a></p>";
                        }
                        if (venueObj.hasOwnProperty("hours")){
                            if(venueObj.hours.isOpen == "true"){
                            content += "<p>" + venueObj.hours.status + "</p>";
                            }
                        }
                        if (venueObj.hasOwnProperty("url")){
                            content += '<p><a href=' + venueObj.url + ' target="_blank">Website</a></p>';
                        }
                        
                        
                        $(content).appendTo("#address");
                        console.log(venueObj.location.lat);
                        console.log(venueObj.location.lng);


                        google.maps.event.addDomListener(window, 'load', showMap(venueObj.location.lat, venueObj.location.lng, venueObj.name));
                    }


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
                        }   //end of showMap

                        $('#ugh').click( function() {
                            random = Math.floor(Math.random() *cap);
                            console.log(random);
                            venueObj = value.items[random].venue;
                            $('#address').empty();
                            again(venueObj);
                        }); //ugh function
                    } //else

                    })  //end of for each loop for response.groups

                    $('#ew').click( function() {
                        window.location.reload(true);
                    });

                }); //end of json function
                    
            } //end of if price

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
        }   //end of showMap function

    }); // end of super long function


});