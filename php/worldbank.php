<?php
$executionStartTime = microtime(true) / 1000;
console.log($_REQUEST['country']);
// build the individual requests, but do not execute them
$ch_1 = curl_init('http://api.worldbank.org/v2/country/' . $_REQUEST['country'] . '/indicator/SH.ALC.PCAP.LI?date=2019&format=json');
$ch_2 = curl_init('http://api.worldbank.org/v2/country/' . $_REQUEST['country'] . '/indicator/BAR.NOED.15UP.ZS?date=2019&format=json');
curl_setopt($ch_1, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch_2, CURLOPT_RETURNTRANSFER, true);
 
// build the multi-curl handle, adding both $ch
$mh = curl_multi_init();
curl_multi_add_handle($mh, $ch_1);
curl_multi_add_handle($mh, $ch_2);
 
// execute all queries simultaneously, and continue when all are complete
  $running = null;
  do {
    curl_multi_exec($mh, $running);
  } while ($running);

//close the handles
curl_multi_remove_handle($mh, $ch1);
curl_multi_remove_handle($mh, $ch2);
curl_multi_close($mh);
 
// all of our requests are done, we can now access the results
$response_1 = curl_multi_getcontent($ch_1);
$response_2 = curl_multi_getcontent($ch_2);

$decode1 = json_decode($response_1,true)
$output['data'] = $decode1;


echo json_encode($output); 


?>