//Displays Current Day
$(".currentDay").text(moment().format('LLLL'));

function getInfo(){
    const newName=document.getElementById("city-input");
    const cityName=doment.getElementById("city-name");
    cityName.innerHTML ="--"+newName.value+"--";
}

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
});
