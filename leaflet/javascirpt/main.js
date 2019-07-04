



var townArray = new Array();
var la;
var ln;
var zoom;
var mymap;

function initMap() { 

    if(la== null && ln==null){
      la = -36.848461;
      ln = 174.763336;
      zoom = 5;
    }  
    else{
      zoom = 11;
    }
      
    mymap = L.map('mapid').setView([la, ln], zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiemhld2FuZyIsImEiOiJjanZjNnQ1MGswbm5lNDRvajY0eDR0YzJ2In0.9XU-cLRdgBZwUqz51NBxKQ'
        }).addTo(mymap);

    
}
    


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------
function geocode_town(place) {    
	if(place == "submit")        
		var place = document.getElementById('townTextBox').value + " nz";
	else
        document.getElementById('townTextBox').value = place;

          fetch("http://www.mapquestapi.com/geocoding/v1/address?key=skv7DFPHWyUcn4ISaXH9psJsXodOM4fN&location="+place)
          .then((resp) => resp.json()) // Transform the data into json
          .then(function(data) {
            var x = JSON.stringify(data);
            obj = JSON.parse(x);
            la = obj.results[0].locations[0].latLng.lat;
            ln = obj.results[0].locations[0].latLng.lng;

            if(!isInArray(place.toUpperCase(), townArray)){           //check if the user has entered a same town
                var listViewedTown = document.getElementById('listViewedTown');
                listViewedTown.appendChild(new button(place, geocode_town).getDomElement());
                townArray.push(place.toUpperCase());          //add new town to the viewed town list
            }
            });
          

          mymap.remove();
          initMap();


          fetch("PHP/sunrise.php?lat="+la+"&lng="+ln)
          .then((resp) => resp.json()) // Transform the data into json
          .then(function(data) {
            var y = JSON.stringify(data);
            sun = JSON.parse(y);
            var sunrise = sun.results.sunrise;
            var sunset = sun.results.sunset;
            document.getElementById('sunrise').innerHTML = place + " currently: Sun rises at " + sunrise + " and sets at " + sunset; 

          });

        //ajaxRequest("PHP/curl.php","POST","lat="+la+"&lon"+ln,function(data){
        //  if(data == null) alert("no data output");
        //  var xmlDoc = data.responseXML;
          //var x = xmlDoc.getElementsByTagName('temperature')[0];
          //var y = x.childNodes[0];
          //document.getElementById("weather").innerHTML = y.nodeValue;
          //var z = JSON.stringify(data); 
          //console.log(data);
          //document.getElementById('weather').innerHTML = z;
        //});


        $.ajax({
            type: 'GET',
            url: 'PHP/curl.php?',
            data: 'lat='+la+'&lon='+ln,
            async: true,
            dataType: 'xml',
            success: function (data) {
              $(data).find('current').each(function() {

              var tem = $(this).find('temperature');
              var tem_min = tem.attr('min');
              var tem_max = tem.attr('max');
              var outlook = $(this).find('clouds').attr('name');
              var wea = $(this).find('weather').attr('value');

              document.getElementById("cloud").innerHTML ="Current weather is " + wea + ", the outlook is " + outlook + " Min temperature is " + tem_min + " and Max temperature is " + tem_max;
              });
            }
          });
          
    }


//------------------------------------------------------------------------------------------
function isInArray(value, array) {   //chekc if viewed town list
    return array.indexOf(value) > -1;
  }
//---------------------------------------------------------------------------------------------
var button = function(value, onclick_action){   //button function
	var _dom_element = document.createElement("input");   
	_dom_element.type = "button";
	_dom_element.value = value;
	_dom_element.onclick = function(){
    	onclick_action.call(null, value);
	};
	this.getDomElement = function() {
		return _dom_element;
	}
}


     // using ajax to get la and ln
        //$.ajax({
         //   type: 'GET',
          //  url: 'http://www.mapquestapi.com/geocoding/v1/address?',
           // data: 'key=skv7DFPHWyUcn4ISaXH9psJsXodOM4fN&location='+place,
           // async: false,
           // beforeSend: function (xhr) {
           //   if (xhr && xhr.overrideMimeType) {
            //    xhr.overrideMimeType('application/json;charset=utf-8');
            //  }
            //},
            //dataType: 'json',
            //success: function (data) {
              //Do stuff with the JSON data
             //   var x = JSON.stringify(data);
                //localStorage.setItem("location", x);
                //text = localStorage.getIgetDomElementtem("location");
               // obj = JSON.parse(x);
                //la = obj.results[0].locations[0].latLng.lat;
                //ln = obj.results[0].locations[0].latLng.lng;
                //if(!isInArray(place.toUpperCase(), townArray)){           //check if the user has entered a same town
                //    var listViewedTown = document.getElementById('listViewedTown');
                 //   listViewedTown.appendChild(new button(place, geocode_town).getDomElement());
                 //   townArray.push(place.toUpperCase());          //add new town to the viewed town list
                //}
            //}
          //});



