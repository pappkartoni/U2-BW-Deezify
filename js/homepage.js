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

const artistIds = [1, 2, 3, 4, 5, 6];
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
    goodMorningRowNode.innerHTML += `<div class="col-lg-4 col-md-6 col-sm-6">
      <div class="card mb-3"  >
        <div class="row no-gutters">
          <div class="col-md-3">
            <img src="${data.picture_medium}" alt="...">
          </div>
          <div class="col-md-8 ">
            <div class="card-body d-flex">
              <h5 class="card-title">${data.name}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    console.log(data);
  }
};

const renderData = async function (container) {
  for (let i = 0; i < 8; i++) {
    const data = await fetchData(searchURL, "album/", albumIds[i]);
    container.innerHTML += `<div class="col">
    <div class="card">
    <img src="${data.cover_medium}" class="card-img-top" alt="...">
    <div class="card-body">
      <p class="card-text">${data.title}</p>
    </div>
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
  console.log(rawData.data);
};

window.onload = () => {
  renderGoodMorningSongs();
  const recentlyPlayedRowNode = document.querySelector(
    ".main-container .recently-played"
  );

  const showsToTryRowNode = document.querySelector(
    ".main-container .shows-to-try"
  );
  renderData(recentlyPlayedRowNode);
  renderData(showsToTryRowNode);
};

//render data by changing html by appending child with innerHtml. Call func that rendersData
