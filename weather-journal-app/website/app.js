/* Global Variables */
const apiKey = '&appid=9f15e45060210ec849a698b3298f0bed&units=imperial';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const check = async () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?zip="11216"'+apiKey)
    .then((resp) => resp.json())
    .then(function(data){
        console.log(data)
    })
    .catch(function(error) {
        console.log(error);
    });
    //为什么他提醒说不存在这个城市？，我换了好几个编码，还是说不存在
}
check()

const retrieveData = async () =>{
    const request = await fetch('/all')
    try{
        const allData = await request.json()
    }
    catch(error){
        console.log('error',error)
    }
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
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.feeling;
    }catch(error){
        console.log('error',error)
    }
}

document.getElementById('generate').addEventListener('click', performAction);


function performAction(){
    const zipCode = 20
    const feel = document.querySelector('#feelings').value
    retrieveData()
    .then(function(){
        postData('/add',{'temp':zipCode,'feeling':feel,'date':newDate})
    })
    .then(()=>{
        updateUI()
        }
    )
}