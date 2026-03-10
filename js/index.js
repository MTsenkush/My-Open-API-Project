//
//---BUTTON---
//

const button = document.getElementById("generate");
const characterCard = document.getElementById("character");
const wikiCard = document.getElementById("wiki");
const youtubeCard = document.getElementById("youtube");


button.addEventListener("click", getRandomCharacter);
async function getRandomCharacter() {
  try {
    // we're scaning, let humans know
    button.innerHTML = "Scanning the Galaxy";

    //let's make them wait
    await new Promise(resolve => setTimeout(resolve, 2000));

    //who of 82 heroes will show us today?
    const randomId = Math.floor(Math.random()*82) + 1;

    //fetching hero out of API cave
    const response = await fetch (`https://www.swapi.tech/api/people/${randomId}`)
    const data = await response.json();

    //no character?, go again and look better
    if(!data.result){ return getRandomCharacter();}

    const props = data.result.properties;
    button.textContent = props.name;

    //He's here, let's let humans know about that or possibility to scan again
    button.innerHTML = `Today we'll fly with<br>${props.name}<br>Or just scan the Galaxy again`;

    //Lets create his dossier CARD 1
    characterCard.innerHTML = `<h3>${props.name}</h3><p>Height: ${props.height}</p><p>Gender: ${props.gender}</p><p>Birth year: ${props.birth_year}</p><p>Homeworld: ${props.homeworld}</p><p>Films: ${props.films.length}</p><p>Starships: ${props.starships.length}</p><p>Vehicles: ${props.vehicles.length}</p>`;

    //What does Wiki thinks? CARD 2
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(props.name)}`)
      .then(res => res.json())
      .then(wikiData => {
        wikiCard.innerHTML = `<h3>Wiki</h3><p>${wikiData.extract}</p>`;
      })
      .catch(() => {
        wikiCard.innerHTML =`<p>No wiki article found.</p>`;
      });

    // 🎵 YOUTUBE

    // Choice of themes to be added...

    const Videos = [
    {title: "Star Wars Main Theme / Main Title",
    url: "https://www.youtube.com/embed/vZ734NWnAHA"},
    ];


    const randomVideo = Videos[Math.floor(Math.random()*Videos.length)];

    youtubeCard.innerHTML = 
      `<h3>${randomVideo.title}</h3>
      <iframe width="100%" height="315"
        src="${randomVideo.url}"
        frameborder="0"
        allowfullscreen>
      </iframe>`
    ;
  } catch (error) {
    console.error("Error", error); 
    button.innerHTML = "These are not the droids you're looking for. Try again.";
    };
}


const today = new Date();
const thisYear = today.getFullYear();

const footer = document.querySelector("footer");

const copyright = document.createElement("p");

copyright.innerText = `© Mariia Tsenkush ${thisYear}`;

footer.appendChild(copyright);          


   
