const url = "https://striveschool-api.herokuapp.com/api/deezer/album";
const parameters = new URLSearchParams(location.search);
const albumID = parameters.get("id");

const albumTitle = document.querySelector("#albumTitle");
const albumCover = document.querySelector("#albumCover");
const artistName = document.querySelector("#artistName");
const artistPicture = document.querySelector("#artistPicture");
const year = document.querySelector("#year");
const numOfSongsOnPage = document.querySelector("#numOfSongs");
const durationOfTrackList = document.querySelector("#durationOfTrackList");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "000a57005dmsh95a0332ee97d51fp16e40cjsn07c5dcf98f81",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.onload = async () => {
  try {
    const response = await fetch(`${url}/${albumID}`, options);
    const albumData = await response.json();
    // console.log(albumData);

    const { title, cover_xl, artist, tracks, duration, link } = albumData;
    console.log(title, cover_xl, artist, tracks, duration, link);

    const { name, picture } = artist;
    console.log(name, picture);

    const tracksArray = tracks.data;

    albumTitle.innerText = title;
    albumCover.src = cover_xl;
    artistName.innerText = name;
    artistPicture.src = picture;
    numOfSongsOnPage.innerText = `${tracksArray.length} songs`;
  } catch (error) {}
};
