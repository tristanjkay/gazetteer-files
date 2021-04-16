//API List

/*

1. GeoJSON
2. GeoNames
3. RESTCountries
4. Weather http://api.weatherapi.com/v1/current.json?key=86e31af8f3084b5b9ed104335211903&q=london
5. WorldBank
6. News API
7. Dictionary API
8. Exchange Rates https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=db3282d82a-f27cfc1282-qq44i7
9. POIs https://www.triposo.com/api/20210317/poi.json?location_id=Sydney&count=10&fields=id,name,score,intro,tag_labels,best_for&order_by=-score&account=5H84J8Q3&token=kkuxteg67z108qmihlu82c7vks8mhfw3
9b. POIs by TAG https://www.triposo.com/api/20210317/poi.json?location_id=Sydney&tag_labels=district-city_centre|district-the_rocks&tag_labels=cuisine-Italian&count=10&fields=id,name,score,intro,tag_labels,best_for&order_by=-score&account=5H84J8Q3&token=kkuxteg67z108qmihlu82c7vks8mhfw3
10. Images https://www.triposo.com/api/20210317/location.json?id=London&account=5H84J8Q3&token=kkuxteg67z108qmihlu82c7vks8mhfw3
11. Flights https://opensky-network.org/api/flights/departure?airport=EGLL&begin=1616315812&end=1616761412
12. ICAO Airports - http://airlabs.co/api/v6/airports?api_key=a6e92fe4-2d6b-4456-b2b6-ec9c12e96a66
13. COVID STATS - https://api.covid19api.com/country/south-africa/status/confirmed'

*/

//CATEGORIES
/*
- ECONOMY +
- HEALTH
- ENVIRONMENT
- EDUCATION	
- CLIMATE
- CRIME
- TRAVEL & Flights 
- NEWS

*/



//------------------------------------------------------------------------------------------------------------------------------------------------------------------VARIABLES-//

var map = L.map('map').fitWorld();
var dropdown = document.getElementById("countriesDropdown");
var climateDiv = document.getElementById("climate");
var economyDiv = document.getElementById("economy");
var cultureDiv = document.getElementById("culture");
var newsDiv = document.getElementById("news");
var healthDiv = document.getElementById("health");
var environmentDiv = document.getElementById("environment");
var educationDiv = document.getElementById("education");
var crimeDiv = document.getElementById("crime");
var tourismDiv = document.getElementById("tourism");
var selectedCountry;
var col1;
var col2 = document.querySelector('.col-sm-3');
var epochTime = Date.now();
var divPrevContent;
var countries = [];
var debugActive;
var debugLog; 

//------------------------------------------------------------------------------------------------------------------------------------------------------------------MAP SETUP-//

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(map);

function onLocationFound(e) {
	var radius = e.accuracy / 2;

	L.marker(e.latlng).addTo(map)

	L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
	alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

//------------------------------------------------------------------------------------------------------------------------------------------------------------WHEN PAGE LOADS-//
window.onload=function(){

	col2.style.display = "none";
	//Retrieve iso2 code of selected Country
	dropdown.addEventListener('change', function(event) {
		selectedCountry = $('#countriesDropdown').val();
		countrySelected(selectedCountry);
	})

	//-------------------------------------------------------------------------------------------------------------------------------------------------Click Event Listeners-//

	//----------------------------------------------------------------------------------------------------------------------------------------WEATHER

	climateDiv.addEventListener('click', function(event) {
		console.log("climate");

		//Capture previous content in var
		divPrevContent = $(".col-sm-3").html();
		
		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<div class='row'> <div class='col'> <h1 id = 'countryname_ph'>Brazil</h1> <h3 id = 'todaycapital_ph'>Today(Brasilia)</h3> </div> <h3 id = 'temperature_ph'>18&deg;C</h3> <h3 id = 'weathericon_ph'>&#9728;</h3> </div> <div class='row bg-light'> <div class='col'> <h1 id = 'humidity_ph'>83</h1> <h4>HUMIDITY</h4> </div> <div class='col'> <h1 id = 'precipitation_ph'>0</h1> <h4>PRECIPITATION</h4> </div> <div class='col'> <h1 id = 'winddirection_ph'>N</h1> <h4>WIND DIRECTION</h4> </div> <div class='col'> <h1 id = 'windspeed_ph'>3.8</h1> <h4>WIND SPEED</h4> </div> <div class='col'> <h1 id = 'uvindex_ph'>3</h1> <h4>UV INDEX</h4> </div> </div> <br> <br> <h2>This Week</h2><div id='forecast'></div>");
		
		//Add Data from APIs
		
		//Current Weather

		$("#countryname_ph").html(selectedCountry.name);
		$("#todaycapital_ph").html("Today(" + selectedCountry.capital.name + ")");
		$("#temperature_ph").html(selectedCountry.capital.weather.temperature);
		$("#weathericon_ph").html("<img src ='" + selectedCountry.capital.weather.icon + "'></img>");
		$("#humidity_ph").html(selectedCountry.capital.humidity);
		$("#precipitation_ph").html(selectedCountry.capital.weather.precipitation);
		$("#winddirection_ph").html(selectedCountry.capital.weather.windDirection);
		$("#windspeed_ph").html(selectedCountry.capital.weather.windSpeed);
		$("#uvindex_ph").html(selectedCountry.capital.weather.uvIndex);

		
		//Loop for Each Forecast Day

		selectedCountry.capital.weather.forecast.forEach(day => {
				
			//Day Layout
			
			$( "#forecast" ).append("<h3 id = '"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_date_ph'>Monday 12</h3><div class='row bg-light'> <div class='col'> <h1 id = '"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_temperature_ph'>83</h1> <h4>TEMPERATURE</h4> </div> <div class='col'> <h1 id = '"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_humidity_ph'>0</h1> <h4>Humidity</h4> </div> <div class='col'> <h1 id = '"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_windspeed_ph'>N</h1> <h4>Wind Speed (Km)</h4> </div> <div class='col'> <h1 id = '"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_precipitation_ph'>3.8</h1> <h4>Precipitation</h4> </div> </div> <br> <br> <div class='row' id='covidChart'> <div class='col' id='charttext'> <div id='bar1'></div> <h4>28c</h4> <h4>10%</h4> <h4>&darr;</h4> <h4>5mph</h4> </div> <div class='col' id='charttext'> <div id='bar2'></div> <h4>28c</h4> <h4>10%</h4> <h4>&darr;</h4> <h4>5mph</h4> </div> <div class='col' id='charttext'> <div id='bar3'></div> <h4>28c</h4> <h4>10%</h4> <h4>&darr;</h4> <h4>5mph</h4> </div> <div class='col' id='charttext'> <div id='bar4'></div> <h4>28c</h4> <h4>10%</h4> <h4>&darr;</h4> <h4>5mph</h4> </div> <div class='col' id='charttext'> <div id='bar5'></div> <h4>28c</h4> <h4>10%</h4> <h4>&darr;</h4> <h4>5mph</h4> </div> </div>");

			//Day Average Stats
			
			$("#"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_temperature_ph").text(selectedCountry.capital.weather.forecast[selectedCountry.capital.weather.forecast.indexOf(day)].day.avgtemp_c);
			$("#"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_humidity_ph").text(selectedCountry.capital.weather.forecast[selectedCountry.capital.weather.forecast.indexOf(day)].day.avghumidity);
			$("#"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_windspeed_ph").text(selectedCountry.capital.weather.forecast[selectedCountry.capital.weather.forecast.indexOf(day)].day.maxwind_kph);
			$("#"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_precipitation_ph").text(selectedCountry.capital.weather.forecast[selectedCountry.capital.weather.forecast.indexOf(day)].day.daily_chance_of_rain);
			$("#"+ selectedCountry.capital.weather.forecast.indexOf(day)+ "_date_ph").text(selectedCountry.capital.weather.forecast[selectedCountry.capital.weather.forecast.indexOf(day)].date);

	
			
			//Day Temperature Graph
			//TODO

		});

		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);



	})
	economyDiv.addEventListener('click', function(event) {
		console.log("economy");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-3'> <div class='jumbotron'> <div class='row'> <div class='col-md-4'> <p>1</p> <p>GBP</p> </div> <div class='col-md-4'>=</div> <div class='col-md-4'> <p>1</p> <p>GBP</p> </div> </div> </div> <div class='jumbotron'> <h2>Other Currencies</h2><div id ='othercurrencies'> <div class='row'> <p>10 AUS DOLLAR</p> </div></div> </div> </div> <div class='col-md-9'> <div class='row'> <div class='col-md-4'> <div class='jumbotron'> <h2 id = 'gdp_ph'>10</h2> <h3>GDP</h3> </div> </div> <div class='col-md-4'> <div class='jumbotron'> <h2 id = 'inflationrate_ph'>10</h2> <h3>Inflation Rate</h3> </div> </div> <div class='col-md-4'> <div class='jumbotron'> <h2 id = 'annualbudget_ph'>10</h2> <h3>Annual Budget</h3> </div> </div> </div> <div class='row'> <div class='col-md-6'> <div class='jumbotron'> <h2>Top Exports</h2> <div id = 'exports'></div> <div class='row'> <p>1</p> <p>Fish</p> <p>10%</p> </div> </div> </div> <div class='col-md-6'> <div class='jumbotron'> <h2>Top Imports</h2> <div id = 'imports'> <div class='row'> <p>1</p> <p>Fish</p> <p>10%</p> </div> </div> </div> </div> </div> </div> </div>");

		

		//Add Data from APIs
		$("#countryname_ph").html(selectedCountry.name);
		
		$("#gdp_ph").html("");
		$("#inflationrate_ph").html("");
		$("#annualbudget_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 

		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#othercurrencies" ).append();
		});

		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#exports" ).append();
		});

		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#imports" ).append();
		});
		*/

		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	cultureDiv.addEventListener('click', function(event) {
		console.log("culture");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout 
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-5'> <div class='jumbotron'> <h2 id = 'culture_1title_ph'> Top Site Title </h2> <p id = 'culture_1description_ph'> This is where the description of the top site will go. </p><div id ='culture_1img_ph'></div> </div> </div> <div class='col-md-7'> <div class='row'> <div class='col-md-4'> <h2 id = 'culture_2title_ph'> Heading </h2> <p id = 'culture_2description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-8'> <h2 id = 'culture_3title_ph'> Heading </h2> <p id = 'culture_3description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> <div class='row'> <div class='col-md-8'> <h2 id = 'culture_4title_ph'> Heading </h2> <p id = 'culture_4description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-4'> <h2 id = 'culture_5title_ph'> Heading </h2> <p id = 'culture_5description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> <div class='row'> <div class='col-md-4'> <h2 id = 'culture_6title_ph'> Heading </h2> <p id = 'culture_6description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-8'> <h2 id = 'culture_7title_ph'> Heading </h2> <p id = 'culture_7description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> </div> </div>");

		//Add Data from APIs

		$("#countryname_ph").html(selectedCountry.name);
		
		$("#culture_1title_ph").html(selectedCountry.sites);
		$("#culture_1description_ph").html(selectedCountry.sites);
		$("#culture_1img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_2title_ph").html(selectedCountry.sites);
		$("#culture_2description_ph").html(selectedCountry.sites);
		$("#culture_2img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_2title_ph").html(selectedCountry.sites);
		$("#culture_2description_ph").html(selectedCountry.sites);
		$("#culture_2img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_3title_ph").html(selectedCountry.sites);
		$("#culture_3description_ph").html(selectedCountry.sites);
		$("#culture_3img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_4title_ph").html(selectedCountry.sites);
		$("#culture_4description_ph").html(selectedCountry.sites);
		$("#culture_4img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_5title_ph").html(selectedCountry.sites);
		$("#culture_5description_ph").html(selectedCountry.sites);
		$("#culture_5img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_6title_ph").html(selectedCountry.sites);
		$("#culture_6description_ph").html(selectedCountry.sites);
		$("#culture_6img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_7title_ph").html(selectedCountry.sites);
		$("#culture_7description_ph").html(selectedCountry.sites);
		$("#culture_7img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_8title_ph").html(selectedCountry.sites);
		$("#culture_8description_ph").html(selectedCountry.sites);
		$("#culture_8img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_9title_ph").html(selectedCountry.sites);
		$("#culture_9description_ph").html(selectedCountry.sites);
		$("#culture_9img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#culture_10title_ph").html(selectedCountry.sites);
		$("#culture_10description_ph").html(selectedCountry.sites);
		$("#culture_10img_ph").html("<img src = '"+ "x" + "'></img>");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	newsDiv.addEventListener('click', function(event) {
		console.log("news");
		
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-5'> <div class='jumbotron'> <h2 id = 'news_1title_ph'> Top Site Title </h2> <p id = 'news_1description_ph'> This is where the description of the top site will go. </p> <div id ='news_1img_ph'></div> </div> </div> <div class='col-md-7'> <div class='row'> <div class='col-md-4'> <h2 id = 'news_2title_ph'> Heading </h2> <p id = 'news_2description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-8'> <h2 id = 'news_3title_ph'> Heading </h2> <p id = 'news_3description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> <div class='row'> <div class='col-md-8'> <h2 id = 'news_4title_ph'> Heading </h2> <p id = 'news_4description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-4'> <h2 id = 'news_5title_ph'> Heading </h2> <p id = 'news_5description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> <div class='row'> <div class='col-md-4'> <h2 id = 'news_6title_ph'> Heading </h2> <p id = 'news_6description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> <div class='col-md-8'> <h2 id = 'news_7title_ph'> Heading </h2> <p id = 'news_7description_ph'> Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p> <p> <a class='btn' href='#'>Read</a> </p> </div> </div> </div> </div>");

		//Add Data from APIs

		$("#countryname_ph").html(selectedCountry.name);
		
		$("#news_1title_ph").html(selectedCountry.news[0].title);
		$("#news_1description_ph").html(selectedCountry.news[0].description);
		$("#news_1img_ph").html("<img src = '"+ selectedCountry.news[0].urlToImage + "'></img>");

		$("#news_2title_ph").html(selectedCountry.news[1].title);
		$("#news_2description_ph").html(selectedCountry.news[1].description);
		//$("#news_2img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_3title_ph").html(selectedCountry.news[2].title);
		$("#news_3description_ph").html(selectedCountry.news[2].description);
		//$("#news_2img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_4title_ph").html(selectedCountry.news[3].title);
		$("#news_4description_ph").html(selectedCountry.news[3].description);
		//$("#news_3img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_5title_ph").html(selectedCountry.news[4].title);
		$("#news_5description_ph").html(selectedCountry.news[4].description);
		//$("#news_4img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_6title_ph").html(selectedCountry.news[5].title);
		$("#news_6description_ph").html(selectedCountry.news[5].description);
		//$("#news_5img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_7title_ph").html(selectedCountry.news[6].title);
		$("#news_7description_ph").html(selectedCountry.news[6].description);
		//$("#news_6img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_7title_ph").html(selectedCountry.sites);
		$("#news_7description_ph").html(selectedCountry.sites);
		//$("#news_7img_ph").html("<img src = '"+ "x" + "'></img>");

/* 		$("#news_8title_ph").html(selectedCountry.sites);
		$("#news_8description_ph").html(selectedCountry.sites);
		$("#news_8img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_9title_ph").html(selectedCountry.sites);
		$("#news_9description_ph").html(selectedCountry.sites);
		//$("#news_9img_ph").html("<img src = '"+ "x" + "'></img>");

		$("#news_10title_ph").html(selectedCountry.sites);
		$("#news_10description_ph").html(selectedCountry.sites);
		//$("#news _10img_ph").html("<img src = '"+ "x" + "'></img>"); */

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	healthDiv.addEventListener('click', function(event) {
		console.log("health");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-6'> <p id = 'page_description_ph'> Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small> </p> <div class='row' id='covidChart'> <div class='col' id='charttext'> <div id='bar1'></div> January </div> <div class='col' id='charttext'> <div id='bar2'></div> February </div> <div class='col' id='charttext'> <div id='bar3'></div> March </div> <div class='col' id='charttext'> <div id='bar4'></div> April </div> <div class='col' id='charttext'> <div id='bar5'></div> May </div> <div class='col' id='charttext'> <div id='bar6'></div> June </div> </div> <div class='row'> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Access to a Doctor</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Average Life Expectancy</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Infant Mortality</h3> </div> </div> </div> </div> <div class='col-md-6'> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> </div> </div>");

		//Add Data from APIs
		//Current
		$("#countryname_ph").html(selectedCountry.name);
		$("#page_description_ph").html(selectedCountry.capital.name);
		$("#temperature_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	}) 
	environmentDiv.addEventListener('click', function(event) {
		console.log("environment");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-6'> <p id = 'page_description_ph'> Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small> </p> <div class='row' id='covidChart'> <div class='col' id='charttext'> <div id='bar1'></div> January </div> <div class='col' id='charttext'> <div id='bar2'></div> February </div> <div class='col' id='charttext'> <div id='bar3'></div> March </div> <div class='col' id='charttext'> <div id='bar4'></div> April </div> <div class='col' id='charttext'> <div id='bar5'></div> May </div> <div class='col' id='charttext'> <div id='bar6'></div> June </div> </div> <div class='row'> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Access to a Doctor</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Average Life Expectancy</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Infant Mortality</h3> </div> </div> </div> </div> <div class='col-md-6'> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> </div> </div>");

		//Add Data from APIs
		//Current
		$("#countryname_ph").html(selectedCountry.name);
		$("#todaycapital_ph").html(selectedCountry.capital.name);
		$("#temperature_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	educationDiv.addEventListener('click', function(event) {
		console.log("education");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-6'> <p id = 'page_description_ph'> Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small> </p> <div class='row' id='covidChart'> <div class='col' id='charttext'> <div id='bar1'></div> January </div> <div class='col' id='charttext'> <div id='bar2'></div> February </div> <div class='col' id='charttext'> <div id='bar3'></div> March </div> <div class='col' id='charttext'> <div id='bar4'></div> April </div> <div class='col' id='charttext'> <div id='bar5'></div> May </div> <div class='col' id='charttext'> <div id='bar6'></div> June </div> </div> <div class='row'> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Access to a Doctor</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Average Life Expectancy</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Infant Mortality</h3> </div> </div> </div> </div> <div class='col-md-6'> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> </div> </div>");

		//Add Data from APIs
		//Current
		$("#countryname_ph").html(selectedCountry.name);
		$("#todaycapital_ph").html(selectedCountry.capital.name);
		$("#temperature_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	crimeDiv.addEventListener('click', function(event) {
		console.log("crime");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1 id = 'countryname_ph'> Brazil </h1> <div class='row'> <div class='col-md-6'> <p id = 'page_description_ph'> Lorem ipsum dolor sit amet, <strong>consectetur adipiscing elit</strong>. Aliquam eget sapien sapien. Curabitur in metus urna. In hac habitasse platea dictumst. Phasellus eu sem sapien, sed vestibulum velit. Nam purus nibh, lacinia non faucibus et, pharetra in dolor. Sed iaculis posuere diam ut cursus. <em>Morbi commodo sodales nisi id sodales. Proin consectetur, nisi id commodo imperdiet, metus nunc consequat lectus, id bibendum diam velit et dui.</em> Proin massa magna, vulputate nec bibendum nec, posuere nec lacus. <small>Aliquam mi erat, aliquam vel luctus eu, pharetra quis elit. Nulla euismod ultrices massa, et feugiat ipsum consequat eu.</small> </p> <div class='row' id='covidChart'> <div class='col' id='charttext'> <div id='bar1'></div> January </div> <div class='col' id='charttext'> <div id='bar2'></div> February </div> <div class='col' id='charttext'> <div id='bar3'></div> March </div> <div class='col' id='charttext'> <div id='bar4'></div> April </div> <div class='col' id='charttext'> <div id='bar5'></div> May </div> <div class='col' id='charttext'> <div id='bar6'></div> June </div> </div> <div class='row'> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Access to a Doctor</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Average Life Expectancy</h3> </div> </div> <div class='col-md-4'> <div class = 'col'> <h2>10%</h2> <h3>Infant Mortality</h3> </div> </div> </div> </div> <div class='col-md-6'> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> <div class='row'> <div class='col-md-8'> </div> <div class='col-md-4'> </div> </div> <div class='row'> <div class='col-md-4'> </div> <div class='col-md-8'> </div> </div> </div> </div>");

		//Add Data from APIs
		//Current
		$("#countryname_ph").html(selectedCountry.name);
		$("#todaycapital_ph").html(selectedCountry.capital.name);
		$("#temperature_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
	tourismDiv.addEventListener('click', function(event) {
		console.log("tourism");
		divPrevContent = $(".col-sm-3").html();

		//Resize Columns
		col2.classList.add('col-sm-9');
		col1.classList.add('col-sm-3');
		col2.classList.remove('col-sm-3');
		col1.classList.remove('col-sm-9');

		//Add Layout
		$(".col-sm-9").html("");
		$(".col-sm-9").html("<h1> Brazil </h1> <div class='row'> <div class='col-md-4'> <div class='jumbotron'> <div class='col' id='gdp'> <p class='lead' id='climate-title'><b>Next Flight</b></p> <div class='row'> <p class='lead' id='climate-title'><b>London</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>New York</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>GWK</b></p> <p class='lead' id='climate-title'><b> ---&gt; </b></p> <p class='lead' id='climate-title'><b>JFK</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>13:00</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>15:00</b></p> </div> <br> <div class='row'> <p class='lead' id='climate-title'><b>14th September 2020</b></p> <p class='lead' id='climate-title'><b>10 hr 50m</b></p> </div> </div> </div> <div class='jumbotron'> <h2>Other Flights</h2> <div class='jumbotron'> <div class='col' id='gdp'> <p class='lead' id='climate-title'><b>Next Flight</b></p> <div class='row'> <p class='lead' id='climate-title'><b>London</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>New York</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>GWK</b></p> <p class='lead' id='climate-title'><b> ---&gt; </b></p> <p class='lead' id='climate-title'><b>JFK</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>13:00</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>15:00</b></p> </div> <br> <div class='row'> <p class='lead' id='climate-title'><b>14th September 2020</b></p> <p class='lead' id='climate-title'><b>10 hr 50m</b></p> </div> </div> </div> <div class='jumbotron'> <div class='col' id='gdp'> <p class='lead' id='climate-title'><b>Next Flight</b></p> <div class='row'> <p class='lead' id='climate-title'><b>London</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>New York</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>GWK</b></p> <p class='lead' id='climate-title'><b> ---&gt; </b></p> <p class='lead' id='climate-title'><b>JFK</b></p> </div> <div class='row'> <p class='lead' id='climate-title'><b>13:00</b></p> <p class='lead' id='climate-title'><b> </b></p> <p class='lead' id='climate-title'><b>15:00</b></p> </div> <br> <div class='row'> <p class='lead' id='climate-title'><b>14th September 2020</b></p> <p class='lead' id='climate-title'><b>10 hr 50m</b></p> </div> </div> </div> </div> </div> <div class='col-md-4'> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> <div class='jumbotron'> <h2> Top ___________ </h2> <div id = 'top'> This is where the top list will go </div> </div> </div> <div class='col-md-4'> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> <div class='jumbotron'> <div class = 'col'> <h2>10</h2> <h3>Stat</h3> </div> </div> </div> </div>");

		//Add Data from APIs
		//Current
		$("#countryname_ph").html(selectedCountry.name);
		$("#todaycapital_ph").html(selectedCountry.capital.name);
		$("#temperature_ph").html("");
		$("#weathericon_ph").html("");
		$("#humidity_ph").html("");
		$("#precipitation_ph").html("");
		$("#winddirection_ph").html("");
		$("#windspeed_ph").html("");
		$("#uvindex_ph").html("");

		//Loop for Each 
		/*selectedCountry.capital.weather.forecast.forEach(day => {

			$( "#forecast" ).append();
		});
		*/


		//Centre Map
		map.setView([selectedCountry.capital.location[0], selectedCountry.capital.location[1]], 2);
	})
		
	
	//Populate Countries in Dropdown
	//file_get_contents()

			//GeoJSON
			$.ajax({
				url: "php/geojson-fileget.php",
				type: 'POST',  
				dataType: 'json',
				data: {

				},
				success: function(result) {
					console.log("GeoJSON Success")
					
	
					if (result.status.name == "ok") {
						result['data'].forEach(element => {

							let country = {
								"name": element['properties']['name'],
								"iso2": element['properties']['iso_a2'],
								"iso3": element['properties']['iso_a3'],
								"geometry": element['geometry'],
								"capital": {
									"weather":{
										"forecast":{

										}

									}
								},
								"pois": {

								},
								"news":{

								}
							   }	

						countries.push(country)
						
						
						var option = document.createElement("option");

        				option.text = country.name;
						option.value = country.iso2;
        				dropdown.add(option);

 
						});
	
						
	
					}
				
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("GeoJSON Fail")
				}
				
			})
		};

		//Do something when a country is selected
		function countrySelected(mycountry) {
			

			//Remove previous geometry
			$('.leaflet-interactive').remove();

			//Get Country Object from Countries Array
			var indexOfCountry = countries.findIndex(x => x.iso2 === mycountry);
			selectedCountry = countries[indexOfCountry];
			$(".modal-title").html(selectedCountry.name);


			//Add more Data to Country Object from APIs

			//Geonames
				$.ajax({
					url: "php/geonames.php",
					type: 'POST',
					dataType: 'json',
					data: {
						country: mycountry,
					},
					success: function(result) {

						console.log("GeoNames Success")


						if (result.status.name == "ok") {

							selectedCountry.continent = result['data'][0]['continentName'];
							selectedCountry.area = result['data'][0]['areaInSqKm'];
							
							$(".continent-title").html(selectedCountry.continent);
							

						}
					
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log("GeoNames Fail")

					}
					
				});

			//RESTCountries
				$.ajax({
					url: "php/restcountries.php",
					type: 'POST',
					dataType: 'json',
					data: {
						country: mycountry,
					},
					success: function(result) {

						console.log("RESTCountries Success");

						if (result.status.name == "ok") {

							//Set Data to Country Object
							selectedCountry.capital.name = result['data']['capital'];
							selectedCountry.region = result['data']['region'];
							//selectedCountry.continent = result['data']['subregion'];
							selectedCountry.population = result['data']['population'];
							selectedCountry.currency = result['data']['currencies'][0]['name'];
							selectedCountry.currencycode = result['data']['currencies'][0]['code'];
							selectedCountry.currencysymbol = result['data']['currencies'][0]['symbol'];
							selectedCountry.currencies = result['data']['currencies'];
							selectedCountry.language = result['data']['languages'][0]['name'];
							selectedCountry.flag = result['data']['flag'];
							//selectedCountry.area = result['data']['area'];
							selectedCountry.timezones = result['data']['timezones'];
							
			

							
							

						}
					
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log("RESTCountries Fail")

					}
					
				});

			//Weather
			$.ajax({
				url: "php/weather/weather_current.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.name,
				},
				success: function(result) {

					console.log("Weather Current Success");
					

					if (result.status.name == "ok") {
						
						//Set Data to Country Object

						//Capital
						//Current Weather
						selectedCountry.capital.weather.temperature = result['data']['current']['temp_c'];
						selectedCountry.capital.weather.description = result['data']['current']['condition']['text'];
						selectedCountry.capital.weather.windSpeed = result['data']['current']['wind_mph'];
						selectedCountry.capital.weather.windDirection = result['data']['current']['wind_dir'];
						selectedCountry.capital.weather.precipitation = result['data']['current']['precip_mm'];

						selectedCountry.capital.weather.humidity = result['data']['current']['humidity'];
						selectedCountry.capital.weather.cloudcover = result['data']['current']['cloud'];
						selectedCountry.capital.weather.feelslike = result['data']['current']['feelslike_c'];
						selectedCountry.capital.weather.uvIndex = result['data']['current']['uv'];
						selectedCountry.capital.weather.visibility = result['data']['current']['vis_km'];
						selectedCountry.capital.weather.isDay = result['data']['current']['is_day'];
						selectedCountry.capital.weather.barPressure = result['data']['current']['pressure_mb'];

						//Forecast for the Week
						selectedCountry.capital.weather.forecast = result['data']['forecast']['forecastday'];

						
						
						//Weather icon
						switch(selectedCountry.capital.weather.description) {
							case "Partly cloudy":
							  // code block
							  selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/fair_day.svg"
							  break;
							case "Sunny":
							  // code block
							  selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/clearsky_day.svg"
							  break;
							case "Overcast":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/partlycloudy_day.svg"
							  break;
							case "Light Rain":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/lightrain.svg"
							  break;
							case "Clear":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/clearsky_day.svg"
							  break;
							case "Torrential rain shower":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/heavyrain.svg"
							  break;
							case "Light Rain Shower":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/lightrain.svg"
							  break;
							case "Cloudy":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/cloudy.svg"
							  break;
							case "Patchy rain possible":
								// code block
								selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/cloudy.svg"
							  break;
							default:
							  // code block
							  selectedCountry.capital.weather.icon = "https://api.met.no/images/weathericons/svg/clearsky_day.svg"

						  }

						//Location
						selectedCountry.capital.location = [result['data']['location']['lat'],result['data']['location']['lon']];

						//Update UI
						
						$('#climate-icon').html('<img src="' + selectedCountry.capital.weather.icon + '" alt="Weathericon">');
						$('#climate-description').html(selectedCountry.capital.weather.description);
						$('#climate-temperature').html(selectedCountry.capital.weather.temperature + "&deg");
						$('#climate-feelslike').html("Feels like " + selectedCountry.capital.weather.feelslike + "&deg");

					}
				
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Weather Current Fail")
				}
				
			});

			$.ajax({
				url: "php/weather/weather_forecast.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.name,
				},
				success: function(result) {

					console.log("Weather Forecast Success");
					

					
				
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Weather Forecast Fail")
				}
				
			});


			//DictionaryAPI
			$.ajax({
				url: "php/dictionary.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.name,
				},
				success: function(result) {

					console.log("Dictionary Success");

					if (result.status.name == "ok") {
						selectedCountry.description = result['data'][0]['meanings'][0]['definitions'][0]['definition']
						$("#description-text").html(selectedCountry.description);
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Dictionary Fail")
				}
				
			});

			//ExchangeRateAPI
			$.ajax({
				url: "php/exchangerate.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.currencycode,
				},
				success: function(result) {

					console.log("Exchange Rate Success");

					if (result.status.name == "ok") {
						console.log(selectedCountry.currencycode);
						selectedCountry.exchangerate = result['data']['rates'][selectedCountry.currencycode];
						console.log(selectedCountry.exchangerate);

						$('#currency').html(selectedCountry.currency);
						//TODO Make this work
						$('#exchangeratevalue').html(selectedCountry.exchangerate);
						
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("Exchange Rate Fail")

				}
				
			});

			//NewsAPI
			$.ajax({
				url: "php/news.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.name,
				},
				success: function(result) {

					

					if (result.status.name == "ok") {
						console.log("News Success");
						document.getElementById('newsarticles').innerHTML = "";
						selectedCountry.news = result['data']['articles'];
						selectedCountry.news.forEach(article => {
							if(selectedCountry.news.indexOf(article) <=2){
								var articlediv = document.createElement('div');
								articlediv.id = 'article' + selectedCountry.news.indexOf(article);
								//articlediv.className = 'null';
							document.getElementById('newsarticles').appendChild(articlediv);
							//Title
							var articletitle = document.createElement('p');
							articletitle.id = 'articleheadline';
							articletitle.innerHTML = '<b>' + article['title'] + '</b>';
							document.getElementById('article' + selectedCountry.news.indexOf(article)).appendChild(articletitle);
							//Article Body
							var articlebody = document.createElement('p');
							articlebody.id = 'articlebody';
							articlebody.innerHTML = article['description'];
							document.getElementById('article' + selectedCountry.news.indexOf(article)).appendChild(articlebody);

							}
							

						}
						)}
			},
				error: function(jqXHR, textStatus, errorThrown) {

					console.log("News Fail")

				}
				
			});

			//POIs
			$.ajax({
				url: "php/pointsofinterest.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: selectedCountry.name,
				},
				beforeSend: function(xhr){xhr.setRequestHeader('x-api-key', 'WeEOSzCLt3vmpbsXBjEc9ZRmh57ToW126jJau9Mf');},
				success: function(result) {

					console.log("POI Success")

					if (result.status.name == "ok") {
						selectedCountry.pois = result['data'];
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log("POI Fail")

				}
				
			});

			//WorldBank
		//GDP
		$.ajax({
			url: "php/worldbank/worldbankgdp.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				console.log("WorldBank Success")

				if (result.status.name == "ok") {
					selectedCountry.gdp = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
						
					};
					
					
					$("#climate-title").html("<b>Today (" + selectedCountry.capital.name + ")</b>");
					$("#gdp_value").html(selectedCountry.gdp['value']);

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

				console.log("WorldBank Fail")

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankalcohol.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.alcConsompution = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankeducation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.education = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankelectricity.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.electricity = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankgovedexpense.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.edExpense = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankinfantmortality.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.infantMortality = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankliteracy.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.literacy = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbanklow10dist.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.worldbanklow10dist = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbanksanitation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.sanitation = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankslums.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.percentInSlums = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbanktop10dist.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.worldbanktop10dist = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankunemployment.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) {

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.unemployment = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbank/worldbankwater.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: mycountry,
			},
			success: function(result) { 

				//console.log(result);

				if (result.status.name == "ok") {

					selectedCountry.water = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});



			

			//Add new country geometry
			var selectedCountryBoundaryData = selectedCountry.geometry;
            var selectedCountryBoundary = L.geoJSON().addTo(map);
            selectedCountryBoundary.addData(selectedCountryBoundaryData);
			map.fitBounds(selectedCountryBoundary.getBounds());
			showModal(selectedCountryBoundary);
		}

		function showModal(mycountry) {

			
			
			

			try {
				document.querySelector('.col-sm-12').classList.add('col-sm-9');
				document.querySelector('.col-sm-12.col-sm-9').classList.remove('col-sm-12');
				col1 = document.querySelector('.col-sm-9')
				col2.style.display = "block";
			} catch (error) {
				console.log("Country has been chosen")
			}
			document.querySelector('.col-sm-3').style.maxHeight = "calc(100vh - 9rem)";
			document.querySelector('.col-sm-3').style.height = "calc(100vh - 9rem)";
			document.querySelector('.col-sm-3').style.overflowY = "scroll";
			

		}
		




