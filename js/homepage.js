const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cbcd173dfmshe0d3767927ec133p151910jsn1f811931eda4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const fetchData = () => {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=U2", options)
    .then((response) => response.json())
    .then((rawData) => renderData(rawData))
    .catch((err) => console.error(err));
};
fetchData();

const renderData = async function (rawData) {
  console.log(rawData);

  const songs = rawData.data;
  console.log(songs);
  const rowNode = document.querySelector(".good-morning-container .row");
  songs.forEach((song) => {
    rowNode.innerHTML += `<div class="col-4">
    <div class="card mb-5"  >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${song.album.cover_medium}" alt="...">
        </div>
        <div class="col-md-8">
          <div id="try" class="card-body d-flex">
            <h5 class="card-title">${song.album.title}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });
  console.log(rawData.data);
};

//render data by changing html by appending child with innerHtml. Call func that rendersData
