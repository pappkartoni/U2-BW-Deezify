const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cbcd173dfmshe0d3767927ec133p151910jsn1f811931eda4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const searchURL = "https://striveschool-api.herokuapp.com/api/deezer/";
// const parametres = new URLSearchParams(location.search);
// let id = parametres.get("id");
// id = "pink%20floyd";

const artistIds = [1, 2, 3, 413, 5, 2857]; // [{id: 123, type: "album"}, {}]
const albumIds = [
  382588837, 152555282, 282033892, 382588837, 152555282, 282033892, 382588837,
  152555282,
];

const fetchData = async (url, apiCall, query) => {
  //we could use + instead of `${}`, bc they're both strings
  const res = await fetch(`${url}${apiCall}${query}`, options);
  const data = await res.json();
  return data;
  // .then((response) => response.json())
  // .then((rawData) => renderGoodMorningSongs(rawData))
  // .catch((err) => console.error(err));
};

const renderGoodMorningSongs = async function () {
  const goodMorningRowNode = document.querySelector(
    ".good-morning-container .row"
  );
  for (let i = 0; i < 6; i++) {
    const data = await fetchData(searchURL, "artist/", artistIds[i]);
/*     goodMorningRowNode.innerHTML += `<div class="col-lg-4 col-sm-6">
                                        <a href="./artist.html?id=${data.id}">
                                          <div class="card mb-3" href="google.com">
                                            <div class="row no-gutters h-100">
                                              <div class="col-md-2 h-100">
                                                <div>
                                                    <img src="${data.picture_medium}" alt="...">
                                                        <button class="btn-transparent d-none"> </button>
                                                    </div>
                                              </div>
                                              <div class="col-md-10 h-100">
                                                <div class="card-body d-flex h-100 align-items-center">
                                                  <h5 class="card-title">${data.name}</h5>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </a>
                                      </div>`; */

    goodMorningRowNode.innerHTML += `
                                    <div class="col-lg-4 col-sm-6">
                                      <a href="./artist.html?id=${data.id}">
                                      <div class="welcome-card w-100">
                                        <div class="d-flex align-items-center" style="height: 80px">
                                          <div class="h-100">
                                          <img class="h-100" src="${data.picture_medium}" alt="...">
                                              <button class="btn-transparent d-none"> </button>
                                          </div>
                                          <h5>${data.name}</h5>
                                        </div>
                                      </div>
                                      </a>
                                    </div>
    `
  }
};

const renderData = async function (container) {
  for (let i = 0; i < 8; i++) {
    const data = await fetchData(searchURL, "album/", albumIds[i]);
    container.innerHTML += `<div class="col">
                              <a href="./album.html?id=${data.id}">
                              <div class="card">
                              <img src="${data.cover_medium}" class="card-img-top" alt="...">
                              <div class="card-body">
                                <h5 class="card-title text-truncate">${data.title}</h5>
                                <h6 class="card-subtitle">${data.release_date.substring(0, 4)} • ${data.artist.name}</h6>
                              </div>
                            </a>
                          </div>`;
  }

  // songs.forEach((song) => {
  //   rowNode.innerHTML += `<div class="col-4">
  //   <div class="card mb-5"  >
  //     <div class="row no-gutters">
  //       <div class="col-md-4">
  //         <img src="${song.album.cover_medium}" alt="...">
  //       </div>
  //       <div class="col-md-8">
  //         <div id="try" class="card-body d-flex">
  //           <h5 class="card-title">${song.album.title}</h5>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>`;
  // });
};
const setWelcomeMessage = () => {
  const hours = new Date().getHours()
  const h1 = document.querySelector("h1")
  if (hours < 6) {
    h1.innerText = "Good night"
  } else if (hours < 12) {
    h1.innerText = "Good morning"
  } else if (hours < 22) {
    h1.innerText = "Good evening"
  } else {
    h1.innerText = "Good night"
  }
}

window.onload = () => {
  setWelcomeMessage()
  renderGoodMorningSongs();
  const recentlyPlayedRowNode = document.querySelector(
    "main .recently-played"
  );

  const showsToTryRowNode = document.querySelector(
    "main .shows-to-try"
  );
  renderData(recentlyPlayedRowNode);
  renderData(showsToTryRowNode);
};

//render data by changing html by appending child with innerHtml. Call func that rendersData

// username function -> between line 23 and 36

const usernameOnPage = document.querySelector(".dropdownButton > span > span");
const setUsername = (username = "username") => {
  usernameOnPage.innerText = username;
};

setUsername(
  localStorage
    .getItem("username")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
);