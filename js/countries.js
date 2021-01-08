//VARIABLES --------------------------------------------------------------------------------------------------------------------------------------

var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua & Deps","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Rep","Chad","Chile","China","Colombia","Comoros","Congo","Congo {Democratic Rep}","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland {Republic}","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea North","Korea South","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar, {Burma}","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russian Federation","Rwanda","St Kitts & Nevis","St Lucia","Saint Vincent & the Grenadines","Samoa","San Marino","Sao Tome & Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

var ul = document.getElementById("myUL");

var countryLocationCoords;
var selectedCountry;

//------------------------------------------------------------------------------------------------------------------------------------------------


//SEARCH BAR CREATION ----------------------------------------------------------------------------------------------------------------------------
for (var i = 0; i < countries.length; i++) {
    var country = countries[i];
    var li = document.createElement('li');
    
    //ADDED EVENT LISTENER
    li.addEventListener("click", function(){
        goToCountry();
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




//FUNCTION - START AT CURRENT LOCATION
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
    return countryLocationCoords;
    
})
})
})

//FUNCTION - MOVE TO SELECTED LOCATION

function goToCountry(){
    console.log("You selected " + selectedCountry);
    mymap.setView([41, 20], 8);
    fetch('https://restcountries.eu/rest/v2/name/albania')
  
  .then(response =>{
    return response.json();
  })

  .then(countrydata =>{
    console.log(countrydata.name)
  });
};

//FUNCTION - 
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
    return countryLocationCoords;
    
})
})
})

//MAP FUNCTIONS
                                                       
  console.log(countryLocationCoords);
	var mymap = L.map('mapid').fitWorld();

	L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19,
  minZoom: 3
}).addTo(mymap);

function onLocationFound(e) {
		var radius = e.accuracy / 2;

    //L.marker(e.latlng).addTo(mymap)
    mymap.setView([countryLocationCoords[0], countryLocationCoords[1]], 6);
    
			

		//L.circle(e.latlng, radius).addTo(mymap);
	}

	function onLocationError(e) {
		alert(e.message);
	}

	mymap.on('locationfound', onLocationFound);
	mymap.on('locationerror', onLocationError);

  mymap.locate({setView: true, maxZoom: 6});
  

mymap.setMaxBounds([[-90,-180],[90,180]]);
