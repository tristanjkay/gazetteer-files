//VARIABLES --------------------------------------------------------------------------------------------------------------------------------------

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar, {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"]

var LeafIcon = L.Icon.extend({
  options: {
      iconSize:     [30, 30],
      shadowSize:   [50, 64],
      iconAnchor:   [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor:  [-3, -76]
  }
});

var mario2 = new LeafIcon({iconUrl: 'js/mario.png'});


const buttons = document.getElementById("myUL").getElementsByTagName("li");

var ul = document.getElementById("myUL");

var countryLocationCoords;
var selectedCountry;
var selectedCountryPop;
var selectedCountryCapital;
var firstPass = true;

//------------------------------------------------------------------------------------------------------------------------------------------------


//SEARCH BAR CREATION ----------------------------------------------------------------------------------------------------------------------------
for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var li = document.createElement('li');
    
    //ADDED EVENT LISTENER
    li.addEventListener("click", function(){
        document.getElementById("myUL").style.display = "none"
        goToCountry(this.innerText);
        return selectedCountry = this.innerText;
        
    });


    var a = document.createElement('a');
    a.appendChild(document.createTextNode(country));
    li.appendChild(a);
    ul.appendChild(li);
}

//SEARCH BAR FUNCTION ----------------------------------------------------------------------------------------------------------------------------
function myFunction() {
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
            console.log(document.getElementById("myInput").value.length);
          
        } else {
            li[i].style.display = "none";
            
        }
    }
    
}
//------------------------------------------------------------------------------------------------------------------------------------------------




//FUNCTION - START AT CURRENT LOCATION ----------------------------------------------------------------------------------------------------------------------------
navigator.geolocation.getCurrentPosition(function(location, countryLocationCoords) {
  fetch('http://api.geonames.org/countryCodeJSON?lat=' + location.coords.latitude.toString() + '&lng=' + location.coords.longitude.toString() + '&username=tristanjkay')
  
  .then(response =>{
    return response.json();
  })

  .then(countrydata =>{
    var countryNameEncoded = encodeURIComponent(countrydata.countryName.toLowerCase().trim());
    console.log(countryNameEncoded);

    fetch('http://api.geonames.org/searchJSON?name=' + countryNameEncoded + '&username=tristanjkay')

    .then(response =>{
    return response.json();
  })
  .then(countrylocation =>{
    console.log(countrylocation);
    console.log(countrylocation.geonames[0].lat);
    countryLocationCoords = [countrylocation.geonames[0].lat, countrylocation.geonames[0].lng];
    mymap.setView([countryLocationCoords[0], countryLocationCoords[1]], 5);
    return countryLocationCoords;
    
})
})
})


//FUNCTION - MOVE TO SELECTED LOCATION ----------------------------------------------------------------------------------------------------------------------------

function goToCountry(innerText){
    console.log("You selected: " + innerText);

    //GET SELECTED COUNTRY
    
    var url = "https://restcountries.eu/rest/v2/name/" + encodeURIComponent(innerText);
    var url2 = "http://api.weatherstack.com/current?access_key=914ab290b5a067d72efa4d6c510059ef&query=";
    var selectedCapital = "Boston";
    try{fetch(url)
  
  .then(response =>{
    return response.json();
  })

  .then(countrydata =>{
    console.log("Fetch returned: " + countrydata[0].name)
    //console.log(countrydata[0].latlng)
    mymap.setView([countrydata[0].latlng[0], countrydata[0].latlng[1]], 6);
    var marker = L.marker([countrydata[0].latlng[0], countrydata[0].latlng[1]], {icon: mario2}).addTo(mymap);
    marker.icon

    var initialContent = '<div id = "cname"><h5><b>' + countrydata[0].name + '</h5></b></div>' + '<div id = "ccapital">\n Capital: ' + countrydata[0].capital + '</div>' + '<div id = "cpopulation">\n Population: ' + countrydata[0].population + '</div>' + '<div id = "clanguage">\n Language: ' + countrydata[0].languages[0].name + '<br><br></div>' + '<svg>' +       
    '<image xlink:href="' + countrydata[0].flag + '" src="unknownflag.png" width="100%" height="100%"/></svg><div id = "photos"></div>' + '<br><br><br><div><h4>Click for further information:</h4></div>' + '<div class="row"><div id = "cclimate" onclick="console.log(this)")><h5>Climate</h5></div>' + '<br><div id = "cdemographic" onclick="console.log(this)")><h5>Demographic</h5></div></div>' + '<br><div class="row"><div id = "ceconomic" onclick="console.log(this)")><h5>Economic</h5><p>' + countrydata[0].currencies[0].symbol + countrydata[0].currencies[0].name + '</p></div>' + '<br><div id = "cother" onclick="console.log(this)")><h5>Other</h5></div></div>';
    
    var popup = L.popup()
    .setLatLng([countrydata[0].latlng[0], countrydata[0].latlng[1]])
    .setContent( )
    .openOn(mymap)
    marker.bindPopup(popup).openPopup();
    popup.setContent(initialContent);
    //return selectedCapital = countrydata[0].capital;
  });
}
catch (err) {
    console.log("Error: " + err)
}



//DRAW BOUNDARY

fetch('https://raw.githubusercontent.com/tristanjkay/gazetteer/main/js/countryBorders.geo.json')
  .then(response => response.json())
  //.then(data => console.log(data["features"][0]));
  .then(data => data["features"].forEach(element => {
    if (element.properties.name == innerText){  
      console.log("JSON returned: " + element.properties.name);
      var selectedCountryBoundaryData = [element];
      console.log(selectedCountryBoundaryData);
      var selectedCountryBoundary = L.geoJSON().addTo(mymap);
      selectedCountryBoundary.addData(selectedCountryBoundaryData);
      //TODO: Remove layer if another country is selected after  
      //mymap.removeLayer(selectedCountryBoundary);

        }}
        )
      )
      };




      

//MAP FUNCTIONS ----------------------------------------------------------------------------------------------------------------------------
                                                       

	var mymap = L.map('mapid').fitWorld();

	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
  subdomains: 'abcd',
  maxZoom: 10,
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
mymap.locate({setView: true, maxZoom: 6});
  

//MAP DRAW BOUNDARY ----------------------------------------------------------------------------------------------------------------------------
