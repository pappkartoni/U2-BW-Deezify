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
    rowNode.innerHTML += `<div class="col">
    <div class="card">
    //   <img src="${song.album.cover_medium}" class="card-img-top" alt="...">
      <div class="card-body">
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
    </div>
  </div>
    `;
  });
  console.log(rawData.data);
};

//render data by changing html by appending child with innerHtml. Call func that rendersData
