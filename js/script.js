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
								"geometry": element['geometry']
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

					console.log("RestCountries[name] = " + result['data']['name']);
					
					//Set Data
					/* document.getElementById('name').innerHTML = result['data']['name'];
					
				    document.getElementById('flag').innerHTML = '<svg><image xlink:href="' + result['data']['flag'] + '" src="unknownflag.png" width="100%" height="100%"/></svg>';
					document.getElementById('capital').innerHTML = "<b>Capital: </b>" + result['data']['capital'];
					document.getElementById('population').innerHTML = "<b>Population: </b>" + result['data']['population'];
					document.getElementById('populationfact').innerHTML = "Population: " + result['data']['population'];
					document.getElementById('currencyfact').innerHTML = "Currency: " + result['data']['currencies'][0]['name'];
					document.getElementById('language').innerHTML = "<b>Main Language: </b>" + result['data']['languages'][0]['name'];
                    document.querySelector("#flag > svg").style.height = "13em";
                    document.querySelector("#flag > svg").style.width = "26em"; */

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




