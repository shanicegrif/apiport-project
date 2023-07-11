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
    const name = characterName.value;
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

        fetch(url)
        .then(data => data.json())
        .then(json => {
            if(json.results.length === 0) {
                characterInfo.innerHTML = "<p>No characters found.</p>"
            } else {
                filteredCharacters(json.results);
            }
        })
        .catch(err => alert("Something went wrong.", err));

    } else if (id) {
        fetch(`${apiUrl}/${id}`)
        .then(data => data.json())
        .then(json => {
            if(json.error === 0) {
                characterInfo.innerHTML = "<p> No character found. </p>";
            } else {
                printCharacter(json.results);
            }
        })
        .catch(err => alert("Something went wrong.", err));
    } else {
        alert("Please fill out one of the forms!")
    }
});

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

function printCharacter(json) {
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