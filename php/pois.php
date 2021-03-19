<?php

	$executionStartTime = microtime(true) / 1000;
	$url ='http://api.mapbox.com/geocoding/v5/mapbox.places/' . $_REQUEST['country'] . '.json?access_token=pk.eyJ1IjoidHJpc3RhbmprYXkiLCJhIjoiY2ttZXU2N2N1MDE4cDJ3a2JmNTh2bjFubCJ9.7S834EYCLeCMakiK1IiVUg'

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_URL,$url);

	$result=curl_exec($ch);

	curl_close($ch);

	$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data'] = $decode;
	
	header('Content-Type: application/json; charset=UTF-8');

	echo json_encode($output);

?> 