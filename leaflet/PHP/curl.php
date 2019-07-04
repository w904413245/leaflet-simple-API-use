<?php
 //header("Access-Control-Allow-Origin: *");
 header('Content-Type: text/xml');

	$la = $_GET["lat"];
	$ln = $_GET["lon"];                     
	$request = 'http://api.openweathermap.org/data/2.5/weather?';
	$api_key = 'c97de9846de1a938e2179b96da6523c4';
	//generate the url
	$yql_query_url = $request."lat=".$la."&lon=".$ln."&appid=".$api_key."&mode=xml";
	
    //initialise the connection for the given URL
    $connection = curl_init($yql_query_url);    //sent the url
    //configure the connection
	curl_setopt($connection, CURLOPT_HEADER, false);
    //provide the response as a string rather than 
    //outputting it directly back to the browser
	curl_setopt($connection, CURLOPT_RETURNTRANSFER, true);
	//make the request and get the response
	$response = curl_exec($connection);

	//$data = json_decode($response);
	//$min_temp = $data->main->temp_min;
	//$max_temp = $data->main->temp_max;
	//$desc = $data->weather[0]->description;
	//$maind = $data->weather[0]->main;
	curl_close($connection);

	//echo "Current weather is ".$maind.", outlook: ".$desc.", max tem: " 
	//.$max_temp." and min tem is " .$min_temp;
	echo $response;

?>
