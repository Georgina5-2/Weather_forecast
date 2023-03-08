// var geoCodingEndPoint="http://api.openweathermap.org/geo/1.0/";
// var weatherReportAPIKey="9ad4c63b363b3077fb52384a9c5eb16c";
// var cityName, stateCode, countryCode;
// var weatherForecastEndPoint="http://api.openweathermap.org/data/2.5/forecast/lat=";


var btnSubimtCity=$('#submitCity');
// var weatherReport=$('#weatherReportTxt');
 function getGeoLocation()
{
    
    var readCityName=$('#readCity').val();
    console.log(readCityName);
    var cityDetails=[];
    cityDetails=readCityName.split(",");
    console.log(cityDetails);
    var storeCityDetails=localStorage.setItem("cityDetails")
    var geoCodingParams= "http://geoCodingEndPoint+'direct?q='+readCityName+'&limit=5&appid=9ad4c63b363b3077fb52384a9c5eb16c'";
    var generateGeoPoints=fetch(geoCodingParams);
    var geoPointsResponse= Response.json();
    var coordsArray=[];
    // for(i=0;i<5;i++)
    // {
    //     var coordinates=geoResponse[i].lat[i].
    // }
}
console.log('btnSubimtCity', btnSubimtCity);
btnSubimtCity.on('click', getGeoLocation);