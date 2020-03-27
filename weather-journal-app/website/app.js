// import { resolve } from "dns";

/* Global Variables */
const apiKey = '&appid=9f15e45060210ec849a698b3298f0bed&units=imperial';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
zipCode = ''
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
zipCode = document.getElementById('zip').value;
let temp = 0 
const retrieveData = async (url,zipcode,api) => {
    const request = await fetch(url+zipcode+api)
    const column = await request.json()
    temp=column['main']['temp']
}
const postData = async (url='',data={}) => {
    const response = await fetch(url,{
        method:'POST',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(data),
    });
    try{
        const newData = await response.json();
        console.log(newData)
        return newData
    }catch(error){
        console.log('error:',error)
    }
}
const updateUI = async () => {
    const request = await fetch('/all');
    try{
        const allData = await request.json()
        let length = allData.length
        document.getElementById('date').innerHTML = allData[length-1].date;
        document.getElementById('temp').innerHTML = allData[length-1].temp;
        document.getElementById('content').innerHTML = allData[length-1].feeling;
    }catch(error){
        console.log('error',error)
    }
}

document.getElementById('generate').addEventListener('click', performAction);


 function performAction(){
    const feel = document.querySelector('#feelings').value
    retrieveData(baseURL,zipCode,apiKey)
    .then(()=>{
        postData('/add',{'temp':temp,'feeling':feel,'date':newDate})
    })
    .then(()=>{
        updateUI()
    })
}