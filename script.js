var geoCodingURL="http://api.openweathermap.org/geo/1.0/";
var weatherReportAPIKey="9ad4c63b363b3077fb52384a9c5eb16c";
var weatherForecastEndPoint="http://api.openweathermap.org/data/2.5/forecast?lat=";
var displayCitiesArray=[];

// searchedCity=[];
// displaySearchedCity=[];

async function generateWeatherForecast(latCoords, lonCoords)
{
    var weatherParametersArray=[];
    weatherConditions=weatherForecastEndPoint+latCoords+"&lon="+lonCoords+"&appid="+weatherReportAPIKey;
    var response=await fetch(weatherConditions);
    var weatherConditionsResponse= await response.json();
    console.log('weatherConditionsResponse ::', weatherConditionsResponse);
    
}
        

async function getGeoLocation()
{
    // event.PreventDefault();
    var readCityName=$('#readCity').val();
    console.log(readCityName);
    var cityDetails=[];
    cityDetails=readCityName.split(",");
    console.log(cityDetails);
    console.log(typeof cityDetails);
    var cityName=cityDetails[0];
    console.log("CityName:",cityName);
    previouslyStoredCity=localStorage.getItem("previouslySearchedCity");
    console.log("local storage data:",previouslyStoredCity);
    if(!previouslyStoredCity)
    {
        localStorage.setItem("previouslySearchedCity",cityName);
    }
    else
    {
        localStorage.setItem("previouslySearchedCity",previouslyStoredCity+","+cityName);
        
        
    }

    
    
    var cityLocation='';

    if (cityDetails && cityDetails.length > 1) 
    {
        cityLocation = ','+cityDetails[1].trim().toUpperCase();
        console.log("city location",cityLocation);
        if (cityLocation.length!==3)
        {
            alert("Enter the city location in abbreviations");
        }
    } 
    
    var geoCodingEndpoint=geoCodingURL+"direct?q="+cityName+cityLocation+"&limit=1&appid="+weatherReportAPIKey;    
    
    var response= await fetch(geoCodingEndpoint);
    var geoCodingResponse= await response.json();
    console.log('geoCodingResponse :: ', geoCodingResponse);


        var latCoords=geoCodingResponse[0].lat;
        console.log("latitude:",latCoords);
        var lonCoords=geoCodingResponse[0].lon;
        console.log("longitude:",lonCoords);

        if(geoCodingResponse && geoCodingResponse.length > 0)
        {
            generateWeatherForecast(latCoords,lonCoords);
        } 
        else 
        {
            alert('No Matching location found');
            return;
        }
                
}
// function displayCurrentWeatherCondition()
// {

// }
 function displayPreviouslySearchedCities()
{
    let displaySearchedCity=localStorage.getItem("previouslySearchedCity");
    if(displaySearchedCity && !(displaySearchedCity.includes(',')))
    { 
        let searchedCity=$("<p>").addClass("btn btn-secondary btn-sm mb-3 mx-3 text-dark font-weight-bold").text(displaySearchedCity).attr("style","width:300px");
        $("#searchedCities").append((searchedCity),'<br/>');
        // var searchedCityText=$("#searchedCities").children().innerHTML;
        // console.log("Name of the city:", searchedCityText);
        // searchedCity.on("click",displayCurrentWeatherCondition());

       
    }
    else
    {
        if(displaySearchedCity)
        {
            var storedCities=localStorage.getItem("previouslySearchedCity");
            citiesArray=storedCities.split(',');
            console.log(citiesArray);
            for(let j=0;j<citiesArray.length;j++)
            {
                let searchedCity=$("<p>").addClass("btn btn-secondary btn-sm mb-3 mx-3 text-dark font-weight-bold").text(citiesArray[j]).attr("style","width:300px");
                $("#searchedCities").append((searchedCity),'<br/>');
                // var searchedCityText=$("#searchedCities").children().innerHTML;
                // console.log("Name of the city:", searchedCityText);
                // searchedCity.on("click",displayCurrentWeatherCondition());
            }
        }
        
    }
    // let citiesArray= displayCitiesArray.push(displaySearchedCity);
    // for(let i=0;i<citiesArray.length;i++)
    // {
    //     $("#searchedCities").append($("<p>").addClass("btn btn-secondary btn-sm mb-3").text(displaySearchedCity).attr("style","width:300px"));
    // }
    
}
function init()
{
    var citiesArray=[];
    displayPreviouslySearchedCities();
    var btnSubmitCity=$('#submitCity');
    btnSubmitCity.on('click', getGeoLocation);
    
}
init();
