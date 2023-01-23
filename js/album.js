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
const musicTableBody = document.querySelector("#musicTableWrapper tbody");

const browserTabTitle = document.querySelector("title");

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

    const { title, cover_xl, artist, tracks, duration, link, release_date } =
      albumData;
    console.log(title, cover_xl, artist, tracks, duration, link, release_date);

    const { name, picture } = artist;
    console.log(name, picture);

    const tracksArray = tracks.data;

    browserTabTitle.innerText = `Spotify - ${title}`;
    albumTitle.innerText = title;
    albumCover.src = cover_xl;
    artistName.innerText = name;
    artistName.href = link;
    artistPicture.src = picture;
    year.innerText = release_date.substring(0, 4);
    numOfSongsOnPage.innerText = `${tracksArray.length} songs`;
    durationOfTrackList.innerText =
      secToMin(duration) + " min " + secToSec(duration) + " sec";

    displayTrackList(tracksArray);
  } catch (error) {}
};

const secToMin = (duration) => {
  const min = Math.floor(duration / 60);
  if (min !== 0) {
    return min;
  } else {
    return "0";
  }
};

const secToSec = (duration) => {
  const sec = duration % 60;
  if (sec !== 0) {
    return sec;
  } else {
    return;
  }
};

const displayTrackList = (tracksArray) => {
  console.log(tracksArray);

  let i = 1;
  const tracksHTML = tracksArray
    .map((song) => {
      return `
            <tr>
                <td scope="col" style="width: 30px" class="numberToPlayIcon">${i++}</td>
                <td>${song.title_short}</br><span class="text-muted">${
        song.artist.name
      }</span></td>
                <td class="text-right">${secToMin(song.duration)}:${secToSec(
        song.duration
      )}</td>
            </tr>
    `;
    })
    .join("");

  musicTableBody.innerHTML = tracksHTML;
};
