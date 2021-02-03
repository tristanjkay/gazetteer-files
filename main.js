//VARIABLES--------------------------------------------------------------------------------------------------------------------------------

//-----API KEYWORDS
var restcountries;
var weatherstack;
var geojson;
var worldbankGDP;
var worldbankUnemployment;
var worldbankDistLow10;
var worldbankDistTop10;
var worldbankAlcoholConsumption;
var worldbankEducation;
var worldbankEducationExpense;
var worldbankInfantMortality;
var worldbankLiteracy;
var worldbankPercentElectricity;
var worldbankPercentSanitation;
var worldbankPercentSlums;
var worldbankPercentWater;
var worldbankArray;

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



var mymap = L.map('map').fitWorld();

var popup = L.popup();


//DO FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------
//-----SEARCH BAR

//-----SEARCH BAR CREATION


//-----SEARCH BAR SEARCH FUNCTION


function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              console.log("%cYou selected:", "color: black; font-weight:bold;");
              console.log(inp.value);
              fetchUpdateData(inp.value);
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    } 
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}

function popupContent(rest, weather, worldbank) {
  
//' + popup+ ',' + rest + ',' + weather +'

/* document.getElementById("sidebarHeader").innerHTML = '<h4>' + rest[0].name + '</h4>';
 document.getElementById("sidebarContainer").innerHTML = '<div id = "flag"><svg>' +       
 '<image xlink:href="' + rest[0].flag + '" src="unknownflag.png" width="100%" height="100%"/></svg></div>' + '<div id = "ccapital">\n <b style = "padding-right: 2rem">Capital</b> ' + rest[0].capital + '</div>' + '<div id = "cpopulation">\n <b style = "padding-right: 2rem">Population</b> ' + rest[0].population + '</div>' + '<div id = "clanguage">\n <b style = "padding-right: 2rem">Language </b> ' + rest[0].languages[0].name + '<br><br></div>' + '<div id = "photos"></div>' + '<br><br><br><div><p>Click for further information:</p></div>' + '<div class="row"><div id = "cclimate" onclick="cclimateFunction(popup, restcountries, weatherstack, worldbankArray)"><h5>Climate</h5>' + '<svg>' +       
  '<image xlink:href="' + weatherstack['current']['weather_icons'][0] + '" src="unknownflag.png" width="48%" height="48%"/></svg>' + '</div>' + '<br><div id = "cdemographic" onclick="cdemographicFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Demographic</h5></div></div>' + '<br><div class="row"><div id = "ceconomic" onclick="ceconomicFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Economic</h5><p>' + rest[0].currencies[0].symbol + rest[0].currencies[0].name + '</p></div>' + '<br><div id = "cother" onclick="cotherFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Other</h5></div></div>';
 }; */

document.getElementById("sidebarHeader").innerHTML = '<h4>' + rest[0].name + '</h4>';
 document.getElementById("sidebarContainer").innerHTML = '<div id = "flag"><svg>' +       
 '<image xlink:href="' + rest[0].flag + '" src="unknownflag.png" width="100%" height="100%"/></svg></div>' + '<div id = "ccapital">\n <b style = "padding-right: 2rem">Capital</b> ' + rest[0].capital + '</div>' + '<div id = "cpopulation">\n <b style = "padding-right: 2rem">Population</b> ' + rest[0].population + '</div>' + '<div id = "clanguage">\n <b style = "padding-right: 2rem">Language </b> ' + rest[0].languages[0].name + '<br><br></div>' + '<div id = "photos"></div>' + '<br><br><br><div><p>Click for further information:</p></div>' + '<div class="row"><div id = "cclimate" onclick="cclimateFunction(popup, restcountries, weatherstack, worldbankArray)"><h5>Climate</h5><p><b>Temperature Today:  </b>' +  weatherstack['current']['temperature'] + '&degC </div>' + '<br><div id = "cdemographic" onclick="cdemographicFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Demographic</h5><p><b>Population: </b>' + rest[0].population + '</div>' + '<br><div class="row"><div id = "ceconomic" onclick="ceconomicFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Economic</h5><p><b>Currency: </b>' +  rest[0].currencies[0].name + " (" + rest[0].currencies[0].symbol + ")"  + '</p></div>' + '<br><div id = "cother" onclick="cotherFunction(popup, restcountries, weatherstack, worldbankArray)")><h5>Other</h5></div></div>';
 };

function cclimateFunction(popup, rest, weather, worldbank) {
 console.log("Climate");
 document.getElementById("sidebarContainer").innerHTML = '<button onclick = "popupContent(restcountries, weatherstack, worldbankArray)">' + '&#12296   Back</button><h1>Climate</h1>' + '</button>' + '<svg>' +       
 '<image xlink:href="' + weatherstack['current']['weather_icons'][0] + '" src="unknownflag.png" width="100%" height="100%"/></svg>'+ '<p>Temperature: ' + weatherstack['current']['temperature'] + '</p><p>Feels Like: ' + weatherstack['current']['feelslike'] + '</p><p>Humidity: ' + weatherstack['current']['humidity'] + '</p><p>Description: ' + weatherstack['current']['weather_descriptions'][0] + '</p><br><p>UV Index: ' + weatherstack['current']['uv_index'] + '</p><p>Wind Speed: ' + weatherstack['current']['wind_speed'] + '</p>';
};

function cdemographicFunction(popup, rest, weather, worldbank) {
  console.log("Demographic");
  document.getElementById("sidebarContainer").innerHTML ='<button onclick = "popupContent(restcountries, weatherstack, worldbankArray)">' + '&#12296   Back</button><h1>Demographic</h1>' + '<p>Population: ' + rest[0].population + '</p><p>Educated Population: ' + worldbankArray[5].toString() + '</p><p>Gov. Education Expense: ' + worldbankArray[6].toString() + '</p><p>Literacy: ' + worldbankArray[8].toString() + '</p><br><p>Access to Clean Water: ' + worldbankArray[12].toString() + '</p><p>Access to Basic Sanitation: ' + worldbankArray[10].toString() + '</p><p>Access to Electricity: ' + worldbankArray[9].toString() + '</p><p>Living in Slums: ' + worldbankArray[11].toString() + '</p><p>Infant Mortality Rate: ' + worldbankArray[7].toString() + '</p><p>Alcohol Consumption: ' + worldbankArray[4].toString() + '</p>';
};

function ceconomicFunction(popup, rest, weather, worldbank) {
  console.log("Economic");
  document.getElementById("sidebarContainer").innerHTML ='<button onclick = "popupContent(restcountries, weatherstack, worldbankArray)">' + '&#12296   Back</button><h1>Economic</h1>' + '<p>GDP: '+ worldbankArray[0].toString()+ '<p>Unemployment: '+ worldbankArray[1].toString() + '<p>Icome Share Top 10%: '+ worldbankArray[2].toString()+ '<p>Income Share Lowest 10%: '+ worldbankArray[3].toString();
};

function cotherFunction(popup, rest, weather, worldbank) {
  console.log("Other");
  document.getElementById("sidebarContainer").innerHTML ='<button onclick = "popupContent(restcountries, weatherstack, worldbankArray)">' + '&#12296   Back</button><h1>Other</h1>' + '<p>Population: ' + rest[0].population + '</p><p>Educated Population: ' + worldbankArray[5].toString() + '</p><p>Gov. Education Expense: ' + worldbankArray[6].toString() + '</p><p>Literacy: ' + worldbankArray[8].toString() + '</p><br><p>Access to Clean Water: ' + worldbankArray[12].toString() + '</p><p>Access to Basic Sanitation: ' + worldbankArray[10].toString() + '</p><p>Access to Electricity: ' + worldbankArray[9].toString() + '</p><p>Living in Slums: ' + worldbankArray[11].toString() + '</p><p>Infant Mortality Rate: ' + worldbankArray[7].toString() + '</p><p>Alcohol Consumption: ' + worldbankArray[4].toString() + '</p>';
};



//ASYNC FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------
//SOURCE URLS
//COUNTRY --> http://api.worldbank.org/v2/country/br/
//GDP --> http://api.worldbank.org/v2/country/br/indicator/NY.GDP.MKTP.CD?date=2020
//POP --> http://api.worldbank.org/v2/country/gb/indicator/SP.POP.TOTL?format=json&date=2020
//UNEMPLOYMENT --> http://api.worldbank.org/v2/country/gb/indicator/UNEMPSA_?format=json&date=2020

//Income
//Distribution Top 10% --> http://api.worldbank.org/v2/country/gb/indicator/SI.DST.10TH.10?format=json&date=2016
//Distribution Lowest 10% --> http://api.worldbank.org/v2/country/gb/indicator/SI.DST.FRST.10?format=json&date=2016

// POP IN SLUMS --> EN.POP.SLUM.UR.ZS
// CLEAN DRINKING WATER --> SH.H2O.BASW.ZS
// BASIC SANITATION --> SH.STA.BASS.ZS
// ACCESS TO ELECTRICITY --> EG.ELC.ACCS.ZS

// INFANT MORTALITY --> SH.DTH.IMRT
// ALCOHOL CONSUMPTION --> SH.ALC.PCAP.LI

// UNEDUCATED ADULTS --> BAR.NOED.15UP.ZS
// LITERACY --> SE.ADT.LITR.ZS
// GOV EXPENSE ON EDUCATION --> SE.XPD.TOTL.GD.ZS




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
		return fetch('https://raw.githubusercontent.com/tristanjkay/gazetteer/main/countryBorders.geo.json');

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
        try{
          mymap.fitBounds(selectedCountryBoundary.getBounds());
        }
        catch(err){console.log(err.message)}
        selectedCountryBoundary.addEventListener("click", function() {
          //console.log("Also Click");
          document.getElementById("clickme").click();
        });
          } });

    console.log("%c\n" +restcountries[0].name + " (" + restcountries[0].alpha2Code + ")", "color: black; font-weight:bold;")
       // Make another API call and pass it into the stream
		return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/NY.GDP.MKTP.CD?date=2019&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankGDP = data[1][0]['value'];
    if(worldbankGDP == null){
      worldbankGDP = "Unknown"
    };
    console.log("%cGDP:", "color: black; font-weight:bold;");
    console.log(worldbankGDP);

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/UNEMPSA_?date=2019&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankUnemployment = data[1][0]['value'];
    if(worldbankUnemployment == null){
      worldbankUnemployment = "Unknown"
    };
    console.log("%cUnemployment:", "color: black; font-weight:bold;");
    console.log(worldbankUnemployment + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SI.DST.10TH.10?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankDistTop10 = data[1][0]['value'];
    if(worldbankDistTop10 == null){
      worldbankDistTop10 = "Unknown"
    };
    console.log("%cWealth Distribution Top 10%:", "color: black; font-weight:bold;");
    console.log(worldbankDistTop10 + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SI.DST.FRST.10?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankDistLow10 = data[1][0]['value'];
    if(worldbankDistLow10 == null){
      worldbankDistLow10 = "Unknown"
    };
    console.log("%cWealth Distribution Bottom 10%:", "color: black; font-weight:bold;");
    console.log(worldbankDistLow10 + "%");


    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/EN.POP.SLUM.UR.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankPercentSlums = data[1][0]['value'];
    if(worldbankPercentSlums == null){
      worldbankPercentSlums = "Unknown"
    };
    console.log("%cLiving in Slums:", "color: black; font-weight:bold;");
    console.log(worldbankPercentSlums + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SH.H2O.BASW.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankPercentWater = data[1][0]['value'];
    if(worldbankPercentWater == null){
      worldbankPercentWater = "Unknown"
    };
    console.log("%cAccess to Clean Drinking Water:", "color: black; font-weight:bold;");
    console.log(worldbankPercentWater + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SH.STA.BASS.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankPercentSanitation = data[1][0]['value'];
    if(worldbankPercentSanitation == null){
      worldbankPercentSanitation = "Unknown"
    };
    console.log("%cBasic Sanitation:", "color: black; font-weight:bold;");
    console.log(worldbankPercentSanitation + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/EG.ELC.ACCS.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankPercentElectricity = data[1][0]['value'];
    if(worldbankPercentElectricity == null){
      worldbankPercentElectricity = "Unknown"
    };
    console.log("%cAccess to Electricity:", "color: black; font-weight:bold;");
    console.log(worldbankPercentElectricity + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SH.DTH.IMRT?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankInfantMortality = data[1][0]['value'];
    if(worldbankInfantMortality == null){
      worldbankInfantMortality = "Unknown"
    };
    console.log("%cInfant Mortalities:", "color: black; font-weight:bold;");
    console.log(worldbankInfantMortality);

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SE.ADT.LITR.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankLiteracy = data[1][0]['value'];
    if(worldbankLiteracy == null){
      worldbankLiteracy = "Unknown"
    };
    console.log("%cLiteracy:", "color: black; font-weight:bold;");
    console.log(worldbankLiteracy + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SH.ALC.PCAP.LI?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankAlcoholConsumption = data[1][0]['value'];
    if(worldbankAlcoholConsumption == null){
      worldbankAlcoholConsumption = "Unknown"
    };
    console.log("%cAlcohol Consumption:", "color: black; font-weight:bold;");
    console.log(worldbankAlcoholConsumption + "litres per year");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/BAR.NOED.15UP.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankEducation = data[1][0]['value'];
    if(worldbankEducation == null){
      worldbankEducation = "Unknown"
    };
    console.log("%cEducation:", "color: black; font-weight:bold;");
    console.log(worldbankEducation + "%");

    return fetch('http://api.worldbank.org/v2/country/'+ restcountries[0].alpha2Code + '/indicator/SE.XPD.TOTL.GD.ZS?date=2010&format=json');

	}).then(function (response) {
		// Get a JSON object from the response
		return response.json();
	}).then(function (data) {

		// Cache the data to a variable
    worldbankEducationExpense = data[1][0]['value'];
    if(worldbankEducationExpense == null){
      worldbankEducationExpense = "Unknown"
    } else{
    console.log("%cGovernment Education Expense:", "color: black; font-weight:bold;");
    console.log(worldbankEducationExpense);
    }

    worldbankArray = [worldbankGDP, worldbankUnemployment, worldbankDistLow10, worldbankDistTop10, worldbankAlcoholConsumption, worldbankEducation, worldbankEducationExpense,  worldbankInfantMortality, worldbankLiteracy, worldbankPercentElectricity, worldbankPercentSanitation, worldbankPercentSlums, worldbankPercentWater];


  
    // Now that you have both APIs back, you can do something with the data
    
    // HERE

    mymap.setView([restcountries[0].latlng[0], restcountries[0].latlng[1]]);
    var marker = L.marker([restcountries[0].latlng[0], restcountries[0].latlng[1]]).addTo(mymap);
    marker.icon;
    marker.addEventListener("click", function() {
      //console.log("Click")
      document.getElementById("clickme").click();
    });

    
    /* popup.setLatLng([restcountries[0].latlng[0], restcountries[0].latlng[1]])
    popup.openOn(mymap)
    marker.bindPopup(popup).openPopup(); */
    popupContent(restcountries, weatherstack, worldbankArray);
    document.getElementById("clickme").style.display = "inline-block";
    document.getElementById("clickme").click();

	}).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	}); 


};


//ONLOAD AND LEAFLET FUNCTIONS--------------------------------------------------------------------------------------------------------------------------------

//-----SETUP MAP

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19
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



