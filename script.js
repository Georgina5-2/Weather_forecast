var geoCodingEndPoint="http://api.openweathermap.org/geo/1.0/";
var weatherReportAPIKey="9ad4c63b363b3077fb52384a9c5eb16c";
// var cityName, stateCode, countryCode;
// var weatherForecastEndPoint="http://api.openweathermap.org/data/2.5/forecast/lat=";
function geoCoding(latCoords,lonCoords)
{

}


// var weatherReport=$('#weatherReportTxt');
async function getGeoLocation()
{
    
    var readCityName=$('#readCity').val();
    console.log(readCityName);
    var cityDetails=[];
    cityDetails=readCityName.split(",");
    console.log(cityDetails);
    console.log(typeof cityDetails);
    var cityName=cityDetails[0];
    var cityLocation=cityDetails[1].trim();
    if(!cityLocation.length===2)
    {
        alert("Enter the city location in abbreviations");
    }
    else
    {
        if(cityLocation="")
        {
            var geoCodingParams=geoCodingEndPoint+"direct?q="+cityName+"&limit=5&appid="+weatherReportAPIKey;
        }
        else
        {
            var geoCodingParams=geoCodingEndPoint+"direct?q="+cityName+","+cityLocation+"&limit=5&appid="+weatherReportAPIKey;
        }
    }
    
    // // var storeCityDetails=localStorage.setItem("cityDetails")
    // var geoCodingParams= "http://geoCodingEndPoint+'direct?q="+readCityName+"&limit=5&appid=9ad4c63b363b3077fb52384a9c5eb16c";
    var response= await fetch(geoCodingParams);
    var geoCodingResponse= await response.json();
    var coordsArray=[];
    for(i=0;i<5;i++)
    {
        var latCoords=geoCodingResponse[i].lat;
        var lonCoords=geoCodingResponse[i].lon;
        var country=geoCodingResponse[i].country;
        var state=geoCodingResponse[i].state;
        if(cityLocation="")
        {
            geoCoding(latCoords,lonCoords);
        }
        else
        {
            if(Lowercase(state)==lowercase(cityLocation)||lowercase(country)==lowercase(cityLocation))
            {
                preferredLatCoords=latCoords;
                preferredLonCoords=lonCoords;
                geoCoding(preferredLatCoords,preferredLonCoords);
            }
            else
            {
                var coordsCollection={"latitude":latCoords,"longitude":lonCoords,"country":country,"state":state};
                coordsArray.push(coordsCollection);
            }
            
        }
    }
    console.log("list of coords:",coordsArray);
    
}

var btnSubmitCity=$('#submitCity');
btnSubmitCity.on('click', getGeoLocation);