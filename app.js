const auth = "563492ad6f9170000100000141911af501354d4e871e6ff70ca52648";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;

//Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  //   console.log(e.target.value);
  searchValue = e.target.value;
}

// Refactoring
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class = "gallery-info">  
    <p>${photo.photographer} </p>
    <a href = ${photo.src.original} >Download </a> 
    </div>
    <img src = ${photo.src.large}> </img>
        `;
    gallery.appendChild(galleryImg);
  });
  //   data.photos.forEach((photo) => {
  //     const galleryImg = document.createElement("div");
  //     galleryImg.classList.add("gallery-img");
  //     galleryImg.innerHTML = `<img src = ${photo.src.large}> </img>
  //     <p>${photo.photographer} </p>
  //     `;
  //     gallery.appendChild(galleryImg);
  //   });
}

// remember this
async function curatedPhotos() {
  //   const dataFetch = await fetch(
  //     "https://api.pexels.com/v1/curated?per_page=15",
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: auth,
  //       },
  //     }
  //   );
  //   const data = await dataFetch.json();
  const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15");
  generatePictures(data);
}

async function searchPhotos(query) {
  //   const dataFetch = await fetch(
  //     `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: auth,
  //       },
  //     }
  //   );
  //   const data = await dataFetch.json();
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  //   data.photos.forEach((photo) => {
  //     const galleryImg = document.createElement("div");
  //     galleryImg.classList.add("gallery-img");
  //     galleryImg.innerHTML = `<img src = ${photo.src.large}> </img>
  //         <p>${photo.photographer} </p>
  //         `;
  //     gallery.appendChild(galleryImg);
  //   });
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
