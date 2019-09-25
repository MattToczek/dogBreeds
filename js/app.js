const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then (res => res.json())
        .catch(error => console.log('Looks like there was a problem', error)
    )
}

Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
    .then(data =>{
        const breedList = data[0].message;
        const randomImg = data[1].message;

        generateOptions(breedList);
        generateImage(randomImg);
    })

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response)
    }else {
        return Promise.reject(new Error(response.statusText));
    }
}

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
    `).join('');
    select.innerHTML = breedList;
}

function fetchBreedImg() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData( `https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s.`
        })
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImg);
card.addEventListener('click', fetchBreedImg);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

