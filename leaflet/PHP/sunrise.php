<?php

    $la = $_GET["lat"];
    $ln = $_GET["lng"];                  
	$request = 'https://api.sunrise-sunset.org/json?';
	//generate the url
	$query_url = $request."&lat=".$la."&lng=".$ln."&date=today";
	
    //initialise the connection for the given URL
    $connection = curl_init($query_url);    //sent the url
    //configure the connection
	curl_setopt($connection, CURLOPT_HEADER, false);
    //provide the response as a string rather than 
    //outputting it directly back to the browser
	curl_setopt($connection, CURLOPT_RETURNTRANSFER, true);
	//make the request and get the response
    $response = curl_exec($connection);
    curl_close($connection);

    echo $response;

?>