/* Global Variables */

const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');
const dateDiv = document.getElementById('date');
const btn = document.getElementById('generate');
const feelings=document.getElementById('feelings').value;
const baseUrl =' https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=aae405498ffe932b837154be990553f7';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
const getTemp = async (baseUrl,zip,apiKey) =>{
  const res = await fetch(baseUrl+zip+apiKey+'&units=metric');
  try {
    // convert json data and return result
    const data = await res.json();
    console.log(data);
    return data;
  }catch (error){
    console.log(error);
  }
};
const postTemp = async (url = "" , data = {}) =>{
const req= await fetch(url, {
  method: "POST",
  credentials:"same-origin",
  headers: {
          'Content-Type': 'application/json',
      },
  body: JSON.stringify(data)
})
try {
  return;
}catch (error){
  console.log(error);
}
};
const updateUI = async (req,res) => {
  await fetch('/all');
  try{
    tempDiv.innerHTML = res.temp
    dateDiv.innerHTML = newDate
    contentDiv.innerHTML = feelings
  }catch(error){

  }
};
//event
btn.addEventListener('click' , myFunction )
function myFunction(){
  var zipInput = document.getElementById('zip');
  if(zipInput.value != ""){
  getTemp(baseUrl,zipInput.value,apiKey)
  .then(function(data){
    postTemp('/all',{temp:data.temp});
    updateUI();
  })
  }
  else{alert('Please Enter Zip Code')}
}
