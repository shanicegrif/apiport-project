const apiUrl = "https://rickandmortyapi.com/api/character"

const characterId = document.querySelector(".characterId");
const characterName = document.querySelector(".characterName");
const characterInfo = document.querySelector(".characterInfo");
const button = document.querySelector("button");

button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("firing click");
    const id = characterId.value;

    fetch(`${apiUrl}/${id}`)
    .then(data => data.json())
    .then(json => {
        getCharacter(json);
    })
    .catch(err => alert("Something went wrong.", err));

    
})

function getCharacter(json) {
    characterInfo.innerHTML = `
    <article>
        <img src="${json.image}" alt="${json.name}"/>
        <h2>Name: ${json.name}</h2>
        <p>Gender: ${json.gender}</p>
        <p>Origin: ${json.origin.name}</p>
        <p>Status: ${json.status}</p>
    </article>
    `  
}