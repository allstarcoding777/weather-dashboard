//Displays Current Day
$(".currentDay").text(moment().format('LLLL'));

const newName=document.getElementById("cityInput");
const cityName=document.getElementById("cityName");

function getInfo(){
    cityName.innerHTML ="--"+newName.value+"--";
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=12e404ad3fb6723e05bd884ac853d668")
    .then(response => response.json())
    .then(data =>{
        for(i=0;i<5;i++){
            document.getElementById("day" +(i+1)+"Min").innerHTML ="Min:" + Number(data.list[i].main.temp.min -256.95).toFixed(1)+"°";
        }
        for(i=0;i<5;i++){
            document.getElementById("day" +(i+1)+"Max").innerHTML ="Max:" + Number(data.list[i].main.temp.max -256.95).toFixed(1)+"°";   
        }
        for(i=0;i<5;i++){
            document.getElementById("img" +(i+1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weathrt[0].icon+".png";
        }
    })
    
    .catch(err => alert("Something Went Wrong"))
}

function DefaultScreen(){
    newName.defaultValue="Minneapolis";
    getInfo();
}

const d=new Date();
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CheckDay(day){
    if(day +d.getDay() >6 ){
        return day +d.getDay()-7;
    }
    else{
        return day +d.getDay();
    }
}

for(i=0; i<5; i++){
document.getElementById("day"+(i+1)).innerHTML = weekday[CheckDay(i)];
}


document.getElementById("day1Min").innerHTML = Math.round(data.list[0].main.temp_min - 273.15, -2);
document.getElementById("day2Min").innerHTML = Math.round(data.list[1].main.temp_min - 273.15, -2);
document.getElementById("day3Min").innerHTML = Math.round(data.list[2].main.temp_min - 273.15, -2);
document.getElementById("day4Min").innerHTML = Math.round(data.list[3].main.temp_min - 273.15, -2);
document.getElementById("day5Min").innerHTML = Math.round(data.list[4].main.temp_min - 273.15, -2);

document.getElementById("day1Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day2Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day3Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day4Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);
document.getElementById("day5Max").innerHTML = Math.round(data.list[0].main.temp_max - 273.15, -2);

document.getElementById("img1").src = "http://openweathermap.org/img/w/"+
data.list[0].weather[0].icon
+".png";
document.getElementById("img2").src = "http://openweathermap.org/img/w/"+
data.list[1].weather[0].icon
+".png";
document.getElementById("img3").src = "http://openweathermap.org/img/w/"+
data.list[2].weather[0].icon
+".png";
document.getElementById("img4").src = "http://openweathermap.org/img/w/"+
data.list[3].weather[0].icon
+".png";
document.getElementById("img5").src = "http://openweathermap.org/img/w/"+
data.list[4].weather[0].icon
+".png";


document.getElementById("day1").innerHTML = weekday[CheckDay(0)];
document.getElementById("day2").innerHTML = weekday[CheckDay(1)];
document.getElementById("day3").innerHTML = weekday[CheckDay(2)];
document.getElementById("day4").innerHTML = weekday[CheckDay(3)];
document.getElementById("day5").innerHTML = weekday[CheckDay(4)];

weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

