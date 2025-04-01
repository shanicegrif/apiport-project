const apiUrl = "https://rickandmortyapi.com/api/character";

const characterId = document.querySelector(".characterId");
const characterName = document.querySelector("input[name='characterName']");
const characterInfo = document.querySelector(".characterInfo");
const errorContainer = document.querySelector(".error-container");
const button = document.querySelector("button");

// Fetch characters when the page loads
window.addEventListener("load", () => {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => filteredCharacters(json.results))
    .catch(() => showErrorMessage("Failed to load characters."));
});

button.addEventListener("click", (e) => {
  e.preventDefault();

  errorContainer.innerHTML = ""; // Clear previous errors

  const id = characterId.value;
  const name = characterName.value;
  const selectedStatus = document.querySelector("select").value;

  const isForm1Filled = Array.from(document.querySelector(".form1").elements).some(el => el.value !== "");
  const isForm2Filled = Array.from(document.querySelector(".form2").elements).some(el => el.value !== "");

  hideError(); // Hide any previous errors

  if (isForm1Filled && isForm2Filled) {
    showError("Only fill one form!");
    return;
  } else if (!isForm1Filled && !isForm2Filled) {
    showError("Please fill out one of the forms!");
    return;
  }

  if (isForm1Filled) {
    if (id) {
      fetch(`${apiUrl}/${id}`)
        .then((data) => data.json())
        .then((json) => printCharacter(json))
        .catch(() => showErrorMessage("Something went wrong. Please try again!"));
    }
  } else if (isForm2Filled) {
    let url = `${apiUrl}/?`;
    if (name) url += `name=${name}&`;
    if (selectedStatus) url += `status=${selectedStatus}&`;
    url = url.slice(0, -1);

    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        if (json.results) {
          filteredCharacters(json.results);
        } else {
          showErrorMessage("No characters found.");
        }
      })
      .catch(() => showErrorMessage("Something went wrong. Please try again!"));
  } else {
    showErrorMessage("Please fill out one of the forms!");
  }

  document.querySelector(".form1").reset();
  document.querySelector(".form2").reset();
});

const showError = (message) => {
  let errorContainer = document.querySelector(".error-container");

  if (!errorContainer) {
    errorContainer = document.createElement("div");
    errorContainer.classList.add("error-container");
    document.querySelector(".characterInfo").prepend(errorContainer);
  }

  errorContainer.innerHTML = `<p class="error-message">${message}</p>`;
  errorContainer.classList.add("active"); // Show error
};

const hideError = () => {
  const errorContainer = document.querySelector(".error-container");
  if (errorContainer) {
    errorContainer.classList.remove("active"); // Hide error
  }
};

function printCharacter(character) {
  const statusColors = { alive: "green", dead: "red", unknown: "purple" };
  const statusColor = statusColors[character.status.toLowerCase()] || "black";

  characterInfo.innerHTML = `
    <article class="fade-in">
        <img src="${character.image}" alt="${character.name}"/>
        <h2>${character.name}</h2>
        <p>Gender: ${character.gender}</p>
        <p>Species: ${character.species}</p>
        <p>Origin: ${character.origin.name}</p>
        <p>Status: <span style="color: ${statusColor};">${character.status}</span></p>
    </article>`;
}

function filteredCharacters(characters) {
  characterInfo.innerHTML = "";
  characters.slice(0, 10).forEach((character) => {
    const statusColors = { alive: "green", dead: "red", unknown: "purple" };
    const statusColor = statusColors[character.status.toLowerCase()] || "black";

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
}

// Navbar Animation
const navbar = document.querySelector(".link-2");
navbar.addEventListener("mouseover", () => {
  navbar.style.transform = "translateY(-5px)";
  navbar.style.transition = "0.3s";
});
navbar.addEventListener("mouseout", () => {
  navbar.style.transform = "translateY(0)";
});

// Show Summary Animation
const details = document.querySelector("details");
details.addEventListener("toggle", () => {
  if (details.open) {
    details.style.animation = "bounce 0.5s ease-out";
  }
});

// Hero Section Animation
const heroSection = document.querySelector(".character-header");
window.addEventListener("load", () => {
  heroSection.style.animation = "zoomIn 1s ease-in-out";
});