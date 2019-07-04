<?php
$jsonfile = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=London,UK&units=metric&appid=c97de9846de1a938e2179b96da6523c4");


$jsondata = json_decode($jsonfile);
$temp = $jsondata->main->temp;
$pressure = $jsondata->main->pressure;
$mintemp = $jsondata->main->temp_min;
$maxtemp = $jsondata->main->temp_max;
$wind = $jsondata->wind->speed;
$humidity = $jsondata->main->humidity;
$desc = $jsondata->weather[0]->description;
$maind = $jsondata->weather[0]->main;

echo $maind;
?>