//API List

/*
1. GeoJSON
2. GeoNames
3. RESTCountries
4. WeatherStack
5. WorldBank
6. News API
7. Dictionary API
8. Exchange Rates https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=db3282d82a-f27cfc1282-qq44i7


*/


//CATEGORIES
/*
- ECONOMY +
- HEALTH
- ENVIRONMENT
- EDUCATION
- CLIMATE
- CRIME
- TRAVEL
- NEWS

*/

//MAP SETUP

var map = L.map('map').fitWorld();
var dropdown = document.getElementById("countriesDropdown");
var selectedCountry;
var col2 = document.querySelector('.col-sm-3');



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

	col2.style.display = "none";
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

						//console.log(result);

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

					//console.log(selectedCountry.capital.name);
					

					if (result.status.name == "ok") {
						
						//Set Data to Country Object

						//Capital
						//Weather
						selectedCountry.capital.weather.temperature = result['data']['current']['temperature'];
						
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
						selectedCountry.capital.location = [result['data']['location']['lat'],result['data']['location']['lon']] ;

					}
				
				},
				error: function(jqXHR, textStatus, errorThrown) {

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

					//console.log(result);

					if (result.status.name == "ok") {
						selectedCountry.description = result['data'][0]['meanings'][0]['definitions'][0]['definition']
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {

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

					//console.log(result);

					if (result.status.name == "ok") {
						var code = "GBP_" + selectedCountry.currencycode;
						selectedCountry.exchangerate = result['data'][code];
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {

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

					//console.log(result);

					if (result.status.name == "ok") {
						selectedCountry.news = result['data']['articles']
						
				}
			},
				error: function(jqXHR, textStatus, errorThrown) {

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

				//console.log(result);

				if (result.status.name == "ok") {
					selectedCountry.gdp = {
						"value": result['data'][1][0]['value'],
						"description": result['data'][1][0]['indicator']['value']
					};
					
					
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

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
			showModal(selectedCountry);
		}

		function showModal(mycountry) {

			$(".modal-title").html(selectedCountry.name);
			$(".continent-title").html(selectedCountry.continent);
			$("#description-text").html(selectedCountry.description);
			$("#climate-title").html("<b>Today (" + selectedCountry.capital.name + ")</b>");
			$('#climate-icon').html('<img src="' + selectedCountry.capital.weather.icon + '" alt="Weathericon">');
			$('#climate-description').html(selectedCountry.capital.weather.description);
			$('#climate-temperature').html(selectedCountry.capital.weather.temperature + "&deg");
			$('#climate-feelslike').html("Feels like " + selectedCountry.capital.weather.feelslike + "&deg");
			$('#currency').html(selectedCountry.currency);

			try {
				document.querySelector('.col-sm-12').classList.add('col-sm-9');
				document.querySelector('.col-sm-12.col-sm-9').classList.remove('col-sm-12');
				col2.style.display = "block";
			} catch (error) {
				console.log("Country has been chosen")
			}
			document.querySelector('.col-sm-3').style.maxHeight = "calc(100vh - 9rem)";
			document.querySelector('.col-sm-3').style.height = "calc(100vh - 9rem)";
			document.querySelector('.col-sm-3').style.overflowY = "scroll";
			

		}
		




