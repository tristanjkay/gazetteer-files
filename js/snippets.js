//VARIABLES--------------------------------------------------------------------------------------------------------------------------------

//-----API KEYWORDS
var restcountries;
var weatherstack;
var geojson;

//-----LOCAL DATA
var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar, {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"]

//-----STYLING

var LeafIcon = L.Icon.extend({
	options: {
		iconSize:     [30, 30],
		shadowSize:   [50, 64],
		iconAnchor:   [22, 94],
		shadowAnchor: [4, 62],
		popupAnchor:  [-3, -76]
	}
  });


//-----FUNCTIONAL VARIABLES

var mymap = L.map('mapid').fitWorld();

var popup = L.popup();


//DO FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------
//-----SEARCH BAR

//-----SEARCH BAR CREATION
for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var ul = document.getElementById("myUL");
    var li = document.createElement('li');
    
    //ADDED EVENT LISTENER
    li.addEventListener("click", function(){
        document.getElementById("myUL").style.display = "none"
        fetchUpdateData(this.innerText);
        
    });


    var a = document.createElement('a');
    a.appendChild(document.createTextNode(country));
    li.appendChild(a);
    ul.appendChild(li);
}

//-----SEARCH BAR SEARCH FUNCTION
function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput"); 
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {  
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1 && document.getElementById("myInput").value.length >= 3){
          document.getElementById("myUL").style.display = "block"
            li[i].style.display = "block";
          
        } else {
            li[i].style.display = "none";
            
        }
    }
    
}

function popupContent(popup, rest, weather) {
  popup.setContent('<div id = "cname"><h5><b>' + rest[0].name + '</h5></b></div>' + '<div id = "ccapital">\n Capital: ' + rest[0].capital + '</div>' + '<div id = "cpopulation">\n Population: ' + rest[0].population + '</div>' + '<div id = "clanguage">\n Language: ' + rest[0].languages[0].name + '<br><br></div>' + '<svg>' +       
  '<image xlink:href="' + rest[0].flag + '" src="unknownflag.png" width="100%" height="100%"/></svg><div id = "photos"></div>' + '<br><br><br><div><h4>Click for further information:</h4></div>' + '<div class="row"><div id = "cclimate" onclick="cclimateFunction(popup, rest, weather)")><h5>Climate</h5><h5>' + weather['current']['temperature'] + '</h5></div>' + '<br><div id = "cdemographic" onclick="cdemographicFunction(popup, rest, weather)")><h5>Demographic</h5></div></div>' + '<br><div class="row"><div id = "ceconomic" onclick="ceconomicFunction(popup, rest, weather)")><h5>Economic</h5><p>' + rest[0].currencies[0].symbol + rest[0].currencies[0].name + '</p></div>' + '<br><div id = "cother" onclick="cotherFunction(popup, rest, weather)")><h5>Other</h5></div></div>');
 };

function cclimateFunction(popup, rest, weather) {
 console.log("Climate");
 popup.setContent('<button onclick = "console.log("You went back")">Back</button><h1>Climate</h1>' + rest[0].name);

};

function cdemographicFunction() {
  console.log("Demographic");
};

function ceconomicFunction() {
  console.log("Economic");
};

function cotherFunction() {
  console.log("Other");
};



//ASYNC FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------
//-----FETCH DATA

function fetchUpdateData(innerText){

//-----REST COUNTRIES API
fetch('https://restcountries.eu/rest/v2/name/' + encodeURIComponent(innerText))
	.then(function (response) {
		// Get a JSON object from the response
		// This is a weird quirk of Fetch
		return response.json();
	}).then(function (data) {

 		// Cache the data to a variable
     restcountries = data;
     
     // Log the result to the console
     console.log("%cRestCountries API returned:", "color: black; font-weight:bold;");
     console.log(restcountries[0].name);


 		// Make another API call and pass it into the stream
 		return fetch('http://api.weatherstack.com/current?access_key=914ab290b5a067d72efa4d6c510059ef&query=' + encodeURIComponent(innerText));

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    weatherstack = data;
    
    // Log the result to the console
    console.log("%cWeatherStack API returned:", "color: black; font-weight:bold;");
    console.log(weatherstack['request']['query']);

		// Make another API call and pass it into the stream
		return fetch('https://raw.githubusercontent.com/tristanjkay/gazetteer/main/js/countryBorders.geo.json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    geojson = data;

    //Find the selected country in JSON
    geojson["features"].forEach(element => {
      if (element.properties.name == innerText){
        // Log the result to the console
        console.log("%cGeoJSON returned:", "color: black; font-weight:bold;");
        console.log(element.properties.name);
        //Add counry boundary to map
        var selectedCountryBoundaryData = [element];
        var selectedCountryBoundary = L.geoJSON().addTo(mymap);
        selectedCountryBoundary.addData(selectedCountryBoundaryData);
          }});
    
  
    // Now that you have both APIs back, you can do something with the data
    
    // HERE

    mymap.setView([restcountries[0].latlng[0], restcountries[0].latlng[1]], 6);
    var marker = L.marker([restcountries[0].latlng[0], restcountries[0].latlng[1]]).addTo(mymap);
    marker.icon

    
    popup.setLatLng([restcountries[0].latlng[0], restcountries[0].latlng[1]])
    popup.openOn(mymap)
    marker.bindPopup(popup).openPopup();
    popupContent(popup, restcountries, weatherstack);

	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	}); 


};


//ONLOAD AND LEAFLET FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------

//-----SETUP MAP

	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
  subdomains: 'abcd',
  maxZoom: 8,
  minZoom: 3
}).addTo(mymap);

function onLocationFound(e) {
		var radius = e.accuracy / 2;
	}

function onLocationError(e) {
		alert(e.message);
	}

mymap.on('locationfound', onLocationFound);
mymap.on('locationerror', onLocationError);

mymap.setMaxBounds([[-90,-180],[90,180]]);


//-----MOVE MAP TO CURRENT LOCATION

navigator.geolocation.getCurrentPosition(function(location) {
	fetch('http://api.geonames.org/countryCodeJSON?lat=' + location.coords.latitude.toString() + '&lng=' + location.coords.longitude.toString() + '&username=tristanjkay')
	.then(response =>{
	  return response.json();
	})
  
	.then(geonames =>{
    var countryNameEncoded = encodeURIComponent(geonames.countryName.toLowerCase().trim());
    console.log("Current Location: " + geonames.countryName);
	  
	  fetch('http://api.geonames.org/searchJSON?name=' + countryNameEncoded + '&username=tristanjkay')
	  .then(response =>{
	  return response.json();
	})
	.then(geonamesByName =>{
	  mymap.setView([geonamesByName.geonames[0].lat, geonamesByName.geonames[0].lng], 5);
  })
  })
  })



