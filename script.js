const apiUrl = "https://rickandmortyapi.com/api/character/[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]"

const characterId = document.getElementById('characterId');
const characterName = document.getElementById('characterName');
const submitButton = document.querySelector('button')

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("firing click");

    fetch(apiUrl)
    .then(data => data.json())
    .then(json => console.log(json))
})