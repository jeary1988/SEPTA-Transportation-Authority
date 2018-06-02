// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});


$$(document).on('deviceready', function() {
    console.log("Device is ready!");
        
 $$('#mywebsite').on('touchend', function(){
    var optionsArray =[ 
                // For all OS's
				'location=no',
				
				// For Android, iOS & Windows Phone only
				'hidden=yes',
				
				// Android and iOS only
				'clearcache=yes',
				'clearsessioncache=yes',
				
				// iOS only
				// Transition style options are fliphorizontal, crossdissolve or coververtical (Default)
				'transitionstyle=fliphorizontal',
				'toolbar=yes',
				'closebuttoncaption=Exit',
				// Tool bar position options are top or bottom (Default)
				'toolbarposition=top',
				'disallowoverscroll=yes',
				'enableViewportScale=yes',
				'mediaPlaybackRequiresUserAction=yes',
				'allowInlineMediaPlayback=yes',
				'keyboardDisplayRequiresUserAction=no',
				'suppressesIncrementalRendering=yes',
				// Presentation style options are pagesheet, formsheet or fullscreen (Default)
				'presentationstyle=formsheet',

				// Android only
				'zoom=no',
				'hardwareback=no',
				
				// Windows only
				// If location is set to no there be no control presented to user to close IAB window.
				'fullscreen=yes' ];    
    
    var options = optionsArray.join();     
   var jbroswer = window.open('https://www.nasserjeary.com/', '_blank', options);  jbroswer.show();  
    });
       
    philaTrains();
});     
/*----------------------------------------------------*/


 function philaTrains()
        {
       
            /*----------create station drop down-------------------*/
            for(var i=0; i < stations.length; i++)
            {
                $$('#stations').append("<option value='" + stations[i].stationNum + "'>" + stations[i].stationName + "</option>");
            }
        }
            /*-----------------------------------------------------*/



/*--------------fetching the json-Object------------------*/
               $$('#fetchTrainDetails').on('touchend', function(){
               var stationNumber = $$('#stations').val();
                $$.ajax({
                    type: 'GET',
                    dataType: "jsonp",
                    url:"http://www3.septa.org/hackathon/Arrivals/" + stationNumber + "/10/",
                    success: function(result){
                    parseJSON(result);
                        }
                });

                $$("#schedule").html("");
  
                }); 
/*-----------------------------------------------------*/      


/*--------------------parseJSON------------------------*/
        function parseJSON(result)
        {
            console.log(result);
        
                var output = "<center><h3>Northbound</h3></center>";
                output += "<table class='philaTable'>";
                output += "<tr><th>Train #</th><th>Time</th><th>Destination</th><th>Service</th><th>Status</th></tr>";
            
                /*----- JSON.parse ----*/
                var data = JSON.parse(result);
                var arr = data[Object.keys(data)];
            
            
            
                var northbound = arr[0].Northbound;
                for(var i=0; i < northbound.length; i++)
                {
                        output +=  ` 
                    <tr>
                    <td> ${northbound[i].train_id} </td>
                    <td> ${northbound[i].depart_time} </td>
                    <td> ${northbound[i].destination} </td>
                    <td> ${northbound[i].service_type} </td>
                    <td> ${northbound[i].status} </td>
                    </tr>
                   `;
                }
                output += "</table>";
                $$('#schedule').append(output); /*--- instead of innerHTML += ---*/                   
                
            
            
            
                var southbound = arr[1].Southbound;
                var output2 = "<center><h3>Southbound</h3></center>";
                output2 += "<table class='philaTable'>";
                output2 += "<tr><th>Train #</th><th>Time</th><th>Destination</th><th>Service</th><th>Status</th></tr>";
                for(var i=0; i < southbound.length; i++)
                {
                    output2 += ` 
                    <tr>
                    <td> ${southbound[i].train_id} </td>
                    <td> ${southbound[i].depart_time} </td>
                    <td> ${southbound[i].destination} </td>
                    <td> ${southbound[i].service_type} </td>
                    <td> ${southbound[i].status} </td>
                    </tr>
                   `;
                }
            output2 += "</table>";
                 $$('#schedule').append(output2);   
        }