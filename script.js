const apiUrl = "https://rickandmortyapi.com/api/character"

const characterId = document.querySelector("#characterId");
const characterName = document.querySelector("#characterName");
const status = document.querySelector("status");
const characterInfo = document.querySelector(".characterInfo");
const button = document.querySelector("button");

button.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("firing click");
    const id = characterId.value;
    const name =  characterName.value;
    const selectedStatus = e.target.status.value;

    if(selectedStatus || name) {
        let url = `${apiUrl}/?`;

        if(name) {
            url += `name=${name}&`;
        }

        if(selectedStatus) {
            url += `status=${selectedStatus}&`
        }

        url = url.slice(0, -1);
    } else if (id) {
        fetch(`${apiUrl}/${id}`)
        .then(data => data.json())
        .then(json => {
            getCharacter(json);
        })
        .catch(err => alert("Something went wrong.", err));
    }


    
})

function submitform() {
    const form1 = document.querySelector(".form1");
    const form2 = document.querySelector(".form2");

    const isForm1Filled = Array.from(form1.elements).some(function(element) {
        return element.value !== "";
    });

    const isForm2Filled =Array.from(form2.elements).some(function(element) {
        return element.value !== "";
    });

    if (isForm1Filled && isForm2Filled) {
        alert("Only fill one form!");
    } else if (isForm1Filled) {
        form1.submit();
    } else if (isForm2Filled) {
        form2.submit();
    } else {
        alert("Please fill out one of the forms!")
    }
}

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