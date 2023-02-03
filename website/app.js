/* Global Variables */
// API key
const ApiKey = "b439ca07c6e15f56375e668f493d5705&units=imperial";

// the DOM elements
let zipCode = document.querySelector("#zip");
let feelings = document.querySelector("#feelings");
let generateBtn = document.querySelector("#generate");

// the DOM elements which i will add the content to
let dateDisplayer = document.querySelector("#date");
let tempDisplayer = document.querySelector("#temp");
let feelingsDisplayer = document.querySelector("#content");

// Create a new date instance dynamically with JS
let d = new Date();
let date =`${d.getMonth() + 1} / ${d.getDate()} / ${d.getFullYear()}`;

// addEventListener to button

generateBtn.addEventListener("click",whenClick);

function whenClick (){
     // get the content of input elemets
     let zipContent = zipCode.value;
     let feelingsContent = feelings.value;
 
     // invoke the zipInfo func
     zipInfo(zipContent)
     .then((result) =>{
         // check if the zip is avalible
         if (result.cod === 200){
             // post data to my server file
             let temp = result.main.temp;
            //  invoke post data function
             postData({temp,date,feelings : feelingsContent})

            //  invoke the function get date from server
            getData();
         }
         else {
             alert("please try another zipCode");
         }
     })
}

// get the zipcode info
async function zipInfo (zip){
    let fetchUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},&appid=${ApiKey}`;
    const response = await fetch (fetchUrl);
    return response.json();
}

// postData fun
async function postData (info = {}){
    const response = await fetch("http://localhost:8080/addData",{
        method : "POST",
        credentials :"same-origin",
        headers :{"content-type" : "application/json"},
        body : JSON.stringify(info)
    }).catch(err => console.log(err));
}

// get Data fun
async function getData (){
    const response = await fetch("http://localhost:8080/sendData")
    .then((result) =>{
        return result.json();
    }).then((result) =>{
        upadteUi(result)       
    })
    .catch(err => console.log(err));
}

// update ui
async function upadteUi(data){
    tempDisplayer.innerHTML = `<p>Temperature : <span> ${Math.round(data.temp)} degrees </span> </p>`;
    dateDisplayer.innerHTML = `<p>Date : <span> ${data.date} </span> </p>`;
    feelingsDisplayer.innerHTML =`<p> Feelings : <span> ${data.feelings} </span> </p>`;
}