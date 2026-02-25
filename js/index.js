//Fetch GitHub repository

fetch ("https://www.swapi.tech/api/people")
    .then(response => response.json())
    .then(data => {
        const characters = data.results;
        const container = document.getElementById("characters");

    for (let i = 0; i < 9; i++) {

      fetch(characters[i].url)
        .then(response => response.json())
        .then(characterData => {

          const props = characterData.result.properties;

          const card = document.createElement("div");
          card.classList.add("card");

          card.innerHTML = `
            <h3>${props.name}</h3>
            <p>Height: ${props.height}</p>
            <p>Gender: ${props.gender}</p>
            <p>Birth year: ${props.birth_year}</p>
          `;

          container.appendChild(card);

        });

    }
})
.catch(error => console.error("These are not the droids you're looking for. - Obi-Wan Kenobi", error ))
