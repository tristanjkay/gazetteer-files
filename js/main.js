//Variables

var countries = [['AF','Afghanistan'],['AX','Aland Islands'],['AL','Albania'],['DZ','Algeria'],['AS','American Samoa'],['AD','Andorra'],['AO','Angola'],['AI','Anguilla'],['AQ','Antarctica'],['AG','Antigua And Barbuda'],['AR','Argentina'],['AM','Armenia'],['AW','Aruba'],['AU','Australia'],['AT','Austria'],['AZ','Azerbaijan'],['BS','Bahamas'],['BH','Bahrain'],['BD','Bangladesh'],['BB','Barbados'],['BY','Belarus'],['BE','Belgium'],['BZ','Belize'],['BJ','Benin'],['BM','Bermuda'],['BT','Bhutan'],['BO','Bolivia'],['BA','Bosnia And Herzegovina'],['BW','Botswana'],['BV','Bouvet Island'],['BR','Brazil'],['IO','British Indian Ocean Territory'],['BN','Brunei Darussalam'],['BG','Bulgaria'],['BF','Burkina Faso'],['BI','Burundi'],['KH','Cambodia'],['CM','Cameroon'],['CA','Canada'],['CV','Cape Verde'],['KY','Cayman Islands'],['CF','Central African Republic'],['TD','Chad'],['CL','Chile'],['CN','China'],['CX','Christmas Island'],['CC','Cocos (Keeling) Islands'],['CO','Colombia'],['KM','Comoros'],['CG','Congo'],['CD','Congo], Democratic Republic'],['CK','Cook Islands'],['CR','Costa Rica'],['CI','Cote D\'Ivoire'],['HR','Croatia'],['CU','Cuba'],['CY','Cyprus'],['CZ','Czech Republic'],['DK','Denmark'],['DJ','Djibouti'],['DM','Dominica'],['DO','Dominican Republic'],['EC','Ecuador'],['EG','Egypt'],['SV','El Salvador'],['GQ','Equatorial Guinea'],['ER','Eritrea'],['EE','Estonia'],['ET','Ethiopia'],['FK','Falkland Islands (Malvinas)'],['FO','Faroe Islands'],['FJ','Fiji'],['FI','Finland'],['FR','France'],['GF','French Guiana'],['PF','French Polynesia'],['TF','French Southern Territories'],['GA','Gabon'],['GM','Gambia'],['GE','Georgia'],['DE','Germany'],['GH','Ghana'],['GI','Gibraltar'],['GR','Greece'],['GL','Greenland'],['GD','Grenada'],['GP','Guadeloupe'],['GU','Guam'],['GT','Guatemala'],['GG','Guernsey'],['GN','Guinea'],['GW','Guinea-Bissau'],['GY','Guyana'],['HT','Haiti'],['HM','Heard Island & Mcdonald Islands'],['VA','Holy See (Vatican City State)'],['HN','Honduras'],['HK','Hong Kong'],['HU','Hungary'],['IS','Iceland'],['IN','India'],['ID','Indonesia'],['IR','Iran], Islamic Republic Of'],['IQ','Iraq'],['IE','Ireland'],['IM','Isle Of Man'],['IL','Israel'],['IT','Italy'],['JM','Jamaica'],['JP','Japan'],['JE','Jersey'],['JO','Jordan'],['KZ','Kazakhstan'],['KE','Kenya'],['KI','Kiribati'],['KR','Korea'],['KW','Kuwait'],['KG','Kyrgyzstan'],['LA','Lao People\'s Democratic Republic'],['LV','Latvia'],['LB','Lebanon'],['LS','Lesotho'],['LR','Liberia'],['LY','Libyan Arab Jamahiriya'],['LI','Liechtenstein'],['LT','Lithuania'],['LU','Luxembourg'],['MO','Macao'],['MK','Macedonia'],['MG','Madagascar'],['MW','Malawi'],['MY','Malaysia'],['MV','Maldives'],['ML','Mali'],['MT','Malta'],['MH','Marshall Islands'],['MQ','Martinique'],['MR','Mauritania'],['MU','Mauritius'],['YT','Mayotte'],['MX','Mexico'],['FM','Micronesia], Federated States Of'],['MD','Moldova'],['MC','Monaco'],['MN','Mongolia'],['ME','Montenegro'],['MS','Montserrat'],['MA','Morocco'],['MZ','Mozambique'],['MM','Myanmar'],['NA','Namibia'],['NR','Nauru'],['NP','Nepal'],['NL','Netherlands'],['AN','Netherlands Antilles'],['NC','New Caledonia'],['NZ','New Zealand'],['NI','Nicaragua'],['NE','Niger'],['NG','Nigeria'],['NU','Niue'],['NF','Norfolk Island'],['MP','Northern Mariana Islands'],['NO','Norway'],['OM','Oman'],['PK','Pakistan'],['PW','Palau'],['PS','Palestinian Territory], Occupied'],['PA','Panama'],['PG','Papua New Guinea'],['PY','Paraguay'],['PE','Peru'],['PH','Philippines'],['PN','Pitcairn'],['PL','Poland'],['PT','Portugal'],['PR','Puerto Rico'],['QA','Qatar'],['RE','Reunion'],['RO','Romania'],['RU','Russian Federation'],['RW','Rwanda'],['BL','Saint Barthelemy'],['SH','Saint Helena'],['KN','Saint Kitts And Nevis'],['LC','Saint Lucia'],['MF','Saint Martin'],['PM','Saint Pierre And Miquelon'],['VC','Saint Vincent And Grenadines'],['WS','Samoa'],['SM','San Marino'],['ST','Sao Tome And Principe'],['SA','Saudi Arabia'],['SN','Senegal'],['RS','Serbia'],['SC','Seychelles'],['SL','Sierra Leone'],['SG','Singapore'],['SK','Slovakia'],['SI','Slovenia'],['SB','Solomon Islands'],['SO','Somalia'],['ZA','South Africa'],['GS','South Georgia And Sandwich Isl.'],['ES','Spain'],['LK','Sri Lanka'],['SD','Sudan'],['SR','Suriname'],['SJ','Svalbard And Jan Mayen'],['SZ','Swaziland'],['SE','Sweden'],['CH','Switzerland'],['SY','Syrian Arab Republic'],['TW','Taiwan'],['TJ','Tajikistan'],['TZ','Tanzania'],['TH','Thailand'],['TL','Timor-Leste'],['TG','Togo'],['TK','Tokelau'],['TO','Tonga'],['TT','Trinidad And Tobago'],['TN','Tunisia'],['TR','Turkey'],['TM','Turkmenistan'],['TC','Turks And Caicos Islands'],['TV','Tuvalu'],['UG','Uganda'],['UA','Ukraine'],['AE','United Arab Emirates'],['GB','United Kingdom'],['US','United States'],['UM','United States Outlying Islands'],['UY','Uruguay'],['UZ','Uzbekistan'],['VU','Vanuatu'],['VE','Venezuela'],['VN','Viet Nam'],['VG','Virgin Islands], British'],['VI','Virgin Islands], U.S.'],['WF','Wallis And Futuna'],['EH','Western Sahara'],['YE','Yemen'],['ZM','Zambia'],['ZW','Zimbabwe']]

var map = L.map('map');

var dropdown = document.getElementById("countriesDropdown");
var homeContent;

// API Variables
var geonames = "empty";
var restcountries = "empty";
var weather;

//Functions

function openNav() {
  document.getElementById("mySidenav").style.width = "30rem";
  //document.getElementById("main").style.marginRight = "20rem";
  document.getElementById("mySidenav").style.zIndex = "3000";
  document.querySelectorAll("#mySidenav > a").style.display = "block";
  
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.querySelectorAll("#mySidenav > a").style.display = "none";
}

function clickHome() {
    document.getElementById("sidebarwrapper").innerHTML = homeContent;
    document.getElementById("climate").addEventListener('click', function(event) {clickClimate();});
    document.getElementById("demographic").addEventListener('click', function(event) {clickDemographic();})
    document.getElementById("economic").addEventListener('click', function(event) {clickEconomic();})
    document.getElementById("other").addEventListener('click', function(event) {clickOther();})
}



function clickClimate() {
    console.log(weather);
    homeContent = document.getElementById("sidebarwrapper").innerHTML
    document.getElementById("sidebarwrapper").innerHTML = '<button style= "float:left; height: 2rem; font-size: 1.6em; padding: 0; margin: 0; margin-right: 1rem; font-style: normal;font-weight: bolder;background:transparent; border:0px;" onclick = "clickHome()">' + '&#12296   </button><h1>Climate</h1>' + '</button>' + '<div id = "maininfo" style = "height: 80%; background: white; border-radius: 10px; padding:1rem; -webkit-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);-moz-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1); box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);border:2px solid rgba(0,0,0,0.2)">'+ '<p><b>Temperature:</b> ' + weather['current']['temperature'] + '</p><p><b>Feels Like:</b> ' + weather['current']['feelslike'] + '</p><p><b>Humidity:</b> ' + weather['current']['humidity'] + '</p><p><b>Description:</b> ' + weather['current']['weather_descriptions'][0] + '</p><br><p><b>UV Index:</b> ' + weather['current']['uv_index'] + '</p><p><b>Wind Speed:</b> ' + weather['current']['wind_speed'] + '</p></div>';
}

function clickDemographic() {
    console.log(weather);
    homeContent = document.getElementById("sidebarwrapper").innerHTML
    document.getElementById("sidebarwrapper").innerHTML = '<button style= "float:left; height: 2rem; font-size: 1.6em; padding: 0; margin: 0; margin-right: 1rem; font-style: normal;font-weight: bolder;background:transparent; border:0px;" onclick = "clickHome()">' + '&#12296   </button><h1>Demographics</h1>' + '</button>' + '<div id = "maininfo" style = "height: 80%; background: white; border-radius: 10px; padding:1rem; -webkit-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);-moz-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1); box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);border:2px solid rgba(0,0,0,0.2)">'+ '<p><b>Temperature:</b> ' + weather['current']['temperature'] + '</p><p><b>Feels Like:</b> ' + weather['current']['feelslike'] + '</p><p><b>Humidity:</b> ' + weather['current']['humidity'] + '</p><p><b>Description:</b> ' + weather['current']['weather_descriptions'][0] + '</p><br><p><b>UV Index:</b> ' + weather['current']['uv_index'] + '</p><p><b>Wind Speed:</b> ' + weather['current']['wind_speed'] + '</p></div>';
}

function clickEconomic() {
    console.log(weather);
    homeContent = document.getElementById("sidebarwrapper").innerHTML
    document.getElementById("sidebarwrapper").innerHTML = '<button style= "float:left; height: 2rem; font-size: 1.6em; padding: 0; margin: 0; margin-right: 1rem; font-style: normal;font-weight: bolder;background:transparent; border:0px;" onclick = "clickHome()">' + '&#12296   </button><h1>Economic</h1>' + '</button>' + '<div id = "maininfo" style = "height: 80%; background: white; border-radius: 10px; padding:1rem; -webkit-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);-moz-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1); box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);border:2px solid rgba(0,0,0,0.2)">'+ '<p><b>Temperature:</b> ' + weather['current']['temperature'] + '</p><p><b>Feels Like:</b> ' + weather['current']['feelslike'] + '</p><p><b>Humidity:</b> ' + weather['current']['humidity'] + '</p><p><b>Description:</b> ' + weather['current']['weather_descriptions'][0] + '</p><br><p><b>UV Index:</b> ' + weather['current']['uv_index'] + '</p><p><b>Wind Speed:</b> ' + weather['current']['wind_speed'] + '</p></div>';
}

function clickOther() {
    console.log(weather);
    homeContent = document.getElementById("sidebarwrapper").innerHTML
    document.getElementById("sidebarwrapper").innerHTML = '<button style= "float:left; height: 2rem; font-size: 1.6em; padding: 0; margin: 0; margin-right: 1rem; font-style: normal;font-weight: bolder;background:transparent; border:0px;" onclick = "clickHome()">' + '&#12296   </button><h1>Other</h1>' + '</button>' + '<div id = "maininfo" style = "height: 80%; background: white; border-radius: 10px; padding:1rem; -webkit-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);-moz-box-shadow: 0px 0px 5px 2px rgba(230,230,230,1); box-shadow: 0px 0px 5px 2px rgba(230,230,230,1);border:2px solid rgba(0,0,0,0.2)">'+ '<p><b>Temperature:</b> ' + weather['current']['temperature'] + '</p><p><b>Feels Like:</b> ' + weather['current']['feelslike'] + '</p><p><b>Humidity:</b> ' + weather['current']['humidity'] + '</p><p><b>Description:</b> ' + weather['current']['weather_descriptions'][0] + '</p><br><p><b>UV Index:</b> ' + weather['current']['uv_index'] + '</p><p><b>Wind Speed:</b> ' + weather['current']['wind_speed'] + '</p></div>';
}

//Event Listeners

document.getElementById("map").addEventListener('click', function(event) {
    console.log(event.target.toString());
if(document.getElementById("mySidenav").style.width == "30rem"){
    if(event.target.toString() == "[object SVGPathElement]"){
   openNav(); 
}else{

    closeNav();

}
}


});

document.getElementById("climate").addEventListener('click', function(event) {
    clickClimate();
})

document.getElementById("demographic").addEventListener('click', function(event) {
    clickDemographic();
})

document.getElementById("economic").addEventListener('click', function(event) {
    clickEconomic();
})

document.getElementById("other").addEventListener('click', function(event) {
    clickOther();
})

//Map Setup

	L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 19,
    minZoom: 5
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

    
//Dropdown Setup   

countries.forEach(item => {
        var option = document.createElement("option");
        option.text = item[1];
		option.value = item[0];
        dropdown.add(option);
                            });


//Listen for Dropdown Changes

window.onload=function(){

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
	
					console.log(result);
					
	
					if (result.status.name == "ok") {
						result['data'].forEach(element => {

						
						});
	
						
	
					}
				
				},
				error: function(jqXHR, textStatus, errorThrown) {
	
				}
				
			});



	//Start listening for changes in dropdown
	dropdown.addEventListener('change', function(event) {
		console.log("You selected: "  + $('#countriesDropdown').val() + ", " + $('#countriesDropdown option:selected').text());
		console.log(" ");

        //Geonames
		$.ajax({
			url: "php/geonames.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("Geonames[CountryName] = " + result['data'][0]['countryName']);
					console.log(" ");
                    

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
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("RestCountries[name] = " + result['data']['name']);
					console.log(result['data']['flag']);
					
					//Set Data
					document.getElementById('name').innerHTML = result['data']['name'];
					
				    document.getElementById('flag').innerHTML = '<svg><image xlink:href="' + result['data']['flag'] + '" src="unknownflag.png" width="100%" height="100%"/></svg>';
					document.getElementById('capital').innerHTML = "<b>Capital: </b>" + result['data']['capital'];
					document.getElementById('population').innerHTML = "<b>Population: </b>" + result['data']['population'];
					document.getElementById('populationfact').innerHTML = "Population: " + result['data']['population'];
					document.getElementById('currencyfact').innerHTML = "Currency: " + result['data']['currencies'][0]['name'];
					document.getElementById('language').innerHTML = "<b>Main Language: </b>" + result['data']['languages'][0]['name'];
                    document.querySelector("#flag > svg").style.height = "13em";
                    document.querySelector("#flag > svg").style.width = "26em";

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
				country: $('#countriesDropdown option:selected').text(),
			},
			success: function(result) {

				console.log(result);
				

				if (result.status.name == "ok") {
					console.log("WeatherStack[location.country] = " + result['data']['location']['country']);
					console.log(" ");
					
					document.getElementById('climatefact').innerHTML = "Current Temperature: " + result['data']['current']['temperature'];
					
					weather = result['data'];
					
                    

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		
		//GeoJSON
		$.ajax({
			url: "php/geojson.php",
			type: 'POST',
			dataType: 'json',
			data: {
			    country: $('#countriesDropdown option:selected').text(),
			},
			success: function(result) {

				console.log(result);
				

				if (result.status.name == "ok") {
				    result['data'].forEach(element => {
                        if (element.properties.name == $('#countriesDropdown option:selected').text()){
        
                        // Log the result to the console
                        console.log("%cGeoJSON returned:", "color: black; font-weight:bold;");
                        console.log(element.properties.name);
        
                        //Add counry boundary to map
                        var selectedCountryBoundaryData = [element];
                        var selectedCountryBoundary = L.geoJSON().addTo(map);
                        selectedCountryBoundary.addData(selectedCountryBoundaryData);
                        try{
                        map.fitBounds(selectedCountryBoundary.getBounds());
                        openNav();
                        }
                        catch(err){console.log(err.message)}
                        selectedCountryBoundary.addEventListener("click", function() {
                        
                        //Open Sidebar;
                        openNav();
        });
          } });

                    

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		
		//WorldBank
		//GDP
		$.ajax({
			url: "php/worldbankgdp.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[GDP] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankalcohol.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[ALC] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankeducation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[EDU] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankelectricity.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[ELEC] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankgovedexpense.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[GOV EXP] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankinfantmortality.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[INF] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankliteracy.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[LIT] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbanklow10dist.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[LOW10] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbanksanitation.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[SAN] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankslums.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[SLUMS] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbanktop10dist.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[LOW10] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankunemployment.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[UNEM] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		$.ajax({
			url: "php/worldbankwater.php",
			type: 'POST',
			dataType: 'json',
			data: {
				country: $('#countriesDropdown').val(),
			},
			success: function(result) {

				console.log(result);

				if (result.status.name == "ok") {

					console.log("WorldBank[WATER] = ");
					console.log(result['data'][1][0]['indicator']['id']);
					
					//Set Data
					//document.getElementById('name').innerHTML = result['data'][1][0]['value'];
					

				}
			
			},
			error: function(jqXHR, textStatus, errorThrown) {

			}
			
		});
		
		
		

		
		
	

	});
	
	
    
	

}


    