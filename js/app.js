const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => generateImage(data.message))

fetch('https://dog.ceo/api/breeds/list')
    .then(response => response.json())
    .then(data => generateOptions(data.message))

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function generateImage(data) {
    const html = `
    <img src='${data}' alt></img>
    <p>Click to view images of ${select.value}s</p>
    `;
    card.innerHTML = html;
}

function generateOptions(data){
    const breedList = data.map(item => `
        <option value='${item}'>${item}</option>
    `);
    
    select.innerHTML = breedList;
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------



// ------------------------------------------
//  POST DATA
// ------------------------------------------

