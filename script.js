const apiUrl = "https://rickandmortyapi.com/api/character";

const characterId = document.querySelector(".characterId");
const characterName = document.querySelector("input[name='characterName']");

const characterInfo = document.querySelector(".characterInfo");
const button = document.querySelector("button");

button.addEventListener("click", (e) => {
  e.preventDefault();

  characterInfo.innerHTML = "";

  const id = characterId.value;
  const name = characterName.value;
  const selectedStatus = document.querySelector("select").value;

  console.log(selectedStatus);

  const isForm1Filled = Array.from(
    document.querySelector(".form1").elements
  ).some(function (element) {
    return element.value !== "";
  });

  const isForm2Filled = Array.from(
    document.querySelector(".form2").elements
  ).some(function (element) {
    return element.value !== "";
  });

  if (isForm1Filled && isForm2Filled) {
    characterInfo.innerHTML = `
        <div class="error-container">
            <p class="error-message">"Only fill one form!"<p>
        </div>`;
  } else if (isForm1Filled) {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then((data) => data.json())
        .then((json) => printCharacter(json))
        .catch((err) => alert("Something went wrong.", err));
    }
  } else if (isForm2Filled) {
    let url = `${apiUrl}/?`;

    if (name) {
      url += `name=${name}&`;
    }

    if (selectedStatus) {
      url += `status=${selectedStatus}&`;
    }

    url = url.slice(0, -1);

    fetch(url)
      .then((data) => data.json())
      .then((json) => filteredCharacters(json.results))
      .catch((err) => alert("Something went wrong.", err));
  } else {
    characterInfo.innerHTML = `
        <div class="error-container">
            <p class="error-message">"Please fill out one of the forms!"<p>
        </div>`;
  }

  document.querySelector(".form1").reset();
  document.querySelector(".form2").reset();
});

function printCharacter(character) {
  const statusColors = {
    alive: "green",
    dead: "red",
    unknown: "purple",
  };

  const status = character.status.toLowerCase();
  const statusColor = statusColors[status] || "black";

  characterInfo.innerHTML = `
    <article>
        <img src="${character.image}" alt="${character.name}"/>
        <h2>${character.name}</h2>
        <p>Gender: ${character.gender}</p>
        <p>Species: ${character.species}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Status: <span style="color: ${statusColor};">${character.status}</span></p>
    </article>`;
  document.querySelector(".form1").reset();
}

function filteredCharacters(characters) {
  characterInfo.innerHTML = "";
  const statusColors = {
    alive: "green",
    dead: "red",
    unknown: "purple",
  };
  
  characters.forEach((character) => {
    const status = character.status.toLowerCase();
    const statusColor = statusColors[status] || "black";

    const article = document.createElement("article");
    article.innerHTML = `
            <img src="${character.image}" alt="${character.name}"/>
            <h2>${character.name}</h2>
            <p>Gender: ${character.gender}</p>
            <p>Species: ${character.species}</p>
            <p>Origin: ${character.origin.name}</p>
            <p>Status: <span style="color: ${statusColor};">${character.status}</span></p>
        `;
    characterInfo.appendChild(article);
  });

  document.querySelector(".form2").reset();
}
