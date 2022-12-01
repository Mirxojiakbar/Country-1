"use strict"

const Basic = "https://restcountries.com/v3.1"




//========Take All Countries=========
const getAllCountries = async ()=>{
    const countries = await fetch(`${Basic}/all`);
    const result = await countries.json();
    dataRender(result)
    dinamicCategory(result)
}

getAllCountries()


//========Take All Countries end=========

//===========RENDERING!!!=============
function dataRender(data=[]){
    data.forEach((el)=>{
        const card=createElement('div', 'card shadow-lg', `
        <img src="${el.flags.svg ? el.flags.svg : "https://picsum.photos/id/122/267/160" }" alt="flag" class="card-top-img">
        <div class="card-body p-4">
           <h3 class="card-title">${el.name.common}</h3>
           <ul class="card-list p-0">
              <li class="card-list-item list-unstyled"><strong>Population: </strong> ${el.population} </li>
              <li class="card-list-item list-unstyled"><strong>Region: </strong> ${el.region} </li>
              <li class="card-list-item list-unstyled"><strong>Capital: </strong> ${el.capital} </li>
           </ul>
           <button class="btn btn-primary" data-id="${el.name}">READ MORE . . .</button>
        </div>`
        
        );
    $(".wrapper").appendChild(card)
    })

}
//===========RENDERING!!!=============
  
//============Rendering Categories============
function dinamicCategory(data){
    const category=['All']
    data.forEach((el)=>{
        if(!category.includes(el.region)){
            category.push(el.region)
        }
    })
    
    category.forEach((el)=>{
        const option = createElement('option','item',el)
        $('#region').appendChild(option)
    })
}
//============Rendering Categories end============
// dakrmode
// $('.btn_darke').addEventListener("click",()=>{
//     dare()
// })
// $('.btn_lighte').addEventListener("click",()=>{
//     erad()
// })

//==============DinamicCategory===================

$('#search').addEventListener('keyup', (e)=>{
$('.wrapper').innerHTML=""
let countval = e.target.value
    if(e.target.value.trim().length!==0){
        findingCountry("/"+countval)
    }else{
        alert('please enter a country name')
    }
    console.log(countval);
})


async function findingCountry (country){
    const response = await fetch(`${Basic}/name${country}`);
    const data = await response.json();
    dataRender(data)
}





$('#region').addEventListener('change',(e)=>{
    if(e.target.value === "All"){
        sortCountry()
    }else{
        sortCountry(e.target.value.toLowerCase())
    }
})

async function sortCountry(region){

    $('.wrapper').innerHTML=""`
    const response = await fetch(`${Basic}/region${region}`);
    const data = await response.json();
    if(response.status === 404){
        $('.row').innerHTML = "<h1 class='text-center w-100'>404 NOT FOUND</h1>"
    } else{
        $('.row').innerHTML= `<h1 class='text-center w-100'>Qdruv natijasi:${data.length}</h1>`
        dataRender(data)
    }
}