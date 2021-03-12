//API List

/*
1. GeoJSON
2. GeoNames
3. RESTCountries
4. WeatherStack
5. WorldBank


*/

//MAP SETUP

var map = L.map('map').fitWorld();
var dropdown = document.getElementById("countriesDropdown");
var selectedCountry;

var countries = [];

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

window.onload=function(){

	//Retrieve iso2 code of selected Country
	dropdown.addEventListener('change', function(event) {
		selectedCountry = $('#countriesDropdown').val();
		countrySelected(selectedCountry);
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
	
					
	
					if (result.status.name == "ok") {
						result['data'].forEach(element => {

							let country = {
								"name": element['properties']['name'],
								"iso2": element['properties']['iso_a2'],
								"iso3": element['properties']['iso_a3'],
								"geometry": element['geometry'],
								"capital": {
									"weather":{

									}
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


						if (result.status.name == "ok") {

							selectedCountry.continent = result['data'][0]['continentName'];
							selectedCountry.area = result['data'][0]['areaInSqKm'];
							

						}
					
					},
					error: function(jqXHR, textStatus, errorThrown) {

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

						console.log(result);

						if (result.status.name == "ok") {

							//Set Data to Country Object
							selectedCountry.capital.name = result['data']['capital'];
							selectedCountry.region = result['data']['region'];
							//selectedCountry.continent = result['data']['subregion'];
							selectedCountry.population = result['data']['population'];
							selectedCountry.currency = result['data']['currencies'][0]['name'];
							selectedCountry.currencies = result['data']['currencies'];
							selectedCountry.language = result['data']['languages'][0]['name'];
							selectedCountry.flag = result['data']['flag'];
							//selectedCountry.area = result['data']['area'];
							selectedCountry.timezones = result['data']['timezones'];

							
							

						}
					
					},
					error: function(jqXHR, textStatus, errorThrown) {

					}
					
				});

			//WeatherStack
			$.ajax({
				url: "php/weatherstack.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: encodeURIComponent((selectedCountry.name).trim()),
				},
				success: function(result) {

					console.log(encodeURIComponent((selectedCountry.capital.name).trim()));
					

					if (result.status.name == "ok") {
						
						//Set Data to Country Object

						//Capital
						//Weather
						selectedCountry.capital.weather.temperature = result['data']['current']['temperature'];
						selectedCountry.capital.weather.icon = result['data']['current']['weather_icons'][0];
						selectedCountry.capital.weather.description = result['data']['current']['weather_descriptions'][0];
						selectedCountry.capital.weather.windSpeed = result['data']['current']['wind_speed'];
						selectedCountry.capital.weather.windDirection = result['data']['current']['wind_dir'];
						selectedCountry.capital.weather.precipitation = result['data']['current']['precip'];
						selectedCountry.capital.weather.humidity = result['data']['current']['humidity'];
						selectedCountry.capital.weather.cloudcover = result['data']['current']['cloudcover'];
						selectedCountry.capital.weather.feelslike = result['data']['current']['feelslike'];
						selectedCountry.capital.weather.uvIndex = result['data']['current']['uv_index'];
						selectedCountry.capital.weather.visibility = result['data']['current']['visibility'];
						selectedCountry.capital.weather.isDay = result['data']['current']['is_day'];
						selectedCountry.capital.weather.barPressure = result['data']['current']['pressure'];


						//Location
						selectedCountry.capital.location = [result['data']['location']['lat'],result['data']['location']['lon']] ;

					}
				
				},
				error: function(jqXHR, textStatus, errorThrown) {

				}
				
			});

			//WorldBank
			$.ajax({
				url: "php/worldbank.php",
				type: 'POST',
				dataType: 'json',
				data: {
					country: mycountry,
				},
				success: function(result) {

					console.log(result);
					

					if (result.status.name == "ok") {
						
						//Set Data to Country Object

						


						

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
			showModal(selectedCountry);
		}

		function showModal(mycountry) {
			document.querySelector('.modal').style.display = "inherit";
			document.querySelector('.modal-title').innerHTML = mycountry.name;
			//getElementsByClassName('.modal').item(0).style.display = "inherit";
		}




