const url = "https://striveschool-api.herokuapp.com/api/deezer/album",
  parameters = new URLSearchParams(location.search),
  albumID = parameters.get("id"),
  albumTitle = document.querySelector("#albumTitle"),
  albumCover = document.querySelector("#albumCover"),
  artistName = document.querySelector("#artistName"),
  artistPicture = document.querySelector("#artistPicture"),
  year = document.querySelector("#year"),
  numOfSongsOnPage = document.querySelector("#numOfSongs"),
  durationOfTrackList = document.querySelector("#durationOfTrackList"),
  musicTableBody = document.querySelector("#musicTableWrapper tbody"),
  browserTabTitle = document.querySelector("title"),
  options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "000a57005dmsh95a0332ee97d51fp16e40cjsn07c5dcf98f81",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

window.onload = async () => {
  window.addEventListener("scroll", changeBGColorOnScroll);
  try {
    const response = await fetch(`${url}/${albumID}`, options),
      albumData = await response.json(),
      { title, cover_xl, artist, tracks, duration, link, release_date } =
        albumData,
      { name, picture } = artist,
      tracksArray = tracks.data;

    titleShowsUpOnScroll.innerText = title;
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
    if (sec < 10) {
      return "0" + sec;
    } else return sec;
  } else {
    return;
  }
};

const displayTrackList = (tracksArray) => {
  let i = 1;
  const tracksHTML = tracksArray
    .map((song) => {
      return `
            <tr>
                <td scope="col" style="width: 30px" class="numberToPlayIcon position-relative"><span>${i++}</span><i class="bi bi-play-fill position-absolute"></i></td>
                <td>${song.title_short}</br><span class="text-muted">${
        song.artist.name
      }</span></td>
                <td class="text-right"><i class="bi bi-heart mr-5"></i>${secToMin(
                  song.duration
                )}:${secToSec(song.duration)}</td>
            </tr>
    `;
    })
    .join("");
  musicTableBody.innerHTML = tracksHTML;
};

// header related (check window.addEventListener at line 22)
const topButtonWrapper = document.querySelector("#topButtonWrapper"),
  showOnScroll = document.querySelector("#topButtonWrapper .showOnScroll"),
  titleShowsUpOnScroll = document.querySelector("#topButtonWrapper h5");

const changeBGColorOnScroll = () => {
  var scroll = window.scrollY;
  if (scroll >= 175) {
    topButtonWrapper.classList.add("halfOp");
    showOnScroll.classList.add("opacity-75");
  }

  if (scroll >= 300) {
    topButtonWrapper.classList.add("changedBG");
    showOnScroll.classList.add("opacity-100");
  }

  if (scroll <= 175) {
    topButtonWrapper.classList.remove("changedBG", "halfOp");
    showOnScroll.classList.remove("opacity-75", "opacity-100");
  }
};
