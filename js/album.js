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
  albumOrSomethingElse = document.querySelector("#albumInfoWrapper h2"),
  usernameOnPage = document.querySelector(".dropdownButton > span > span"),
  releaseDate = document.querySelector("#songsWrapper table ~ span"),
  labelOnPage = document.querySelector("#songsWrapper table ~ span ~ span"),
  alert = document.querySelector("#alertContainer .alert");

options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "000a57005dmsh95a0332ee97d51fp16e40cjsn07c5dcf98f81",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const setUsername = (username = "username") => {
  usernameOnPage.innerText = username;
};

window.onload = async () => {
  setUsername(
    localStorage
      .getItem("username")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
  window.addEventListener("scroll", changeBGColorOnScroll);
  setVolume();
  const slider = document.querySelector(".slider");
  slider.addEventListener("input", setVolume);
  try {
    const response = await fetch(`${url}/${albumID}`, options),
      albumData = await response.json(),
      {
        title,
        cover_xl,
        artist,
        tracks,
        duration,
        link,
        release_date,
        record_type,
        label,
      } = albumData,
      { name, picture } = artist,
      tracksArray = tracks.data;

    browserTabTitle.innerText = `Spotify - ${title}`;
    titleShowsUpOnScroll.innerText = title;
    albumTitle.innerText = title;
    albumCover.src = cover_xl;
    artistName.innerText = name;
    artistName.href = link;
    artistPicture.src = picture;
    albumOrSomethingElse.innerText = record_type.toUpperCase();
    year.innerText = release_date.substring(0, 4);
    numOfSongsOnPage.innerText = `${tracksArray.length} songs`;
    durationOfTrackList.innerText =
      secToMin(duration) + " min " + secToSec(duration) + " sec";
    releaseDate.innerText = dateFixer(release_date);
    labelOnPage.innerText = `© ${label}`;

    displayTrackList(tracksArray);
  } catch (error) {
    console.error(error.message);
  }
};

const dateFixer = (date) => {
  const monthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const year = date.substring(0, 4),
    monthIndex = parseInt(date.substring(5, 7)) - 1,
    month = monthsArray[monthIndex],
    day = date.substring(8, 10);

  return `${month} ${day}, ${year}`;
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
    return "00";
  }
};

const displayTrackList = (tracksArray) => {
  let i = 1;
  const tracksHTML = tracksArray
    .map((song) => {
      return `
            <tr class="unlikedSong" onclick="selectSong(this)" ondblclick="playSong(this)">
              <td
                class="d-none"
                data-preview="${song.preview}"
                data-img="${song.album.cover}"
                data-artist="${song.artist.name}"
                data-title="${song.title}"
              ></td>
              <td
                scope="col"
                style="width: 30px"
                class="numberToPlayIcon position-relative"
              >
                <span>${i++}</span>
                <i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPause(this)"></i>
              </td>
              <td>
                ${song.title_short}${
        song.explicit_lyrics
          ? `<span
                  class="badge badge-light ml-1 d-none d-lg-inline"
                  >E</span
                >`
          : ""
      }
                <br />
                <span class="text-muted">${song.artist.name}</span>
              </td>
              <td class="text-right">
                <i class="bi bi-heart mr-5 d-none d-md-inline" onclick="likeSong(this)"></i
                ><span style="display: inline-block ;width: 50px">${secToMin(
                  song.duration
                )}:${secToSec(song.duration)}</span>
              </td>
            </tr>
            `;
    })
    .join("");
  musicTableBody.innerHTML = tracksHTML;
};

const selectSong = (musicToSelect) => {
  const selectedBefore = document.querySelector(".selected");
  musicToSelect.classList.add("selected");
  if (selectedBefore != null) {
    selectedBefore.classList.remove("selected");
  }
};

const playSong = (musicToPlay) => {
  const songData = musicToPlay.firstElementChild;
  document.querySelector("audio").src = songData.dataset.preview;
  document.querySelector(".footer-info img").src = songData.dataset.img;
  document.querySelector(".footer-info h6").innerText = songData.dataset.title;
  document.querySelector(".footer-info span").innerText =
    songData.dataset.artist;
  document.querySelector("audio").play();
  showPlayIcon();

  // const musicsPlayButton = musicToPlay.childNodes[3].childNodes[3].outerHTML;
  // localStorage.setItem("btn", musicsPlayButton);
};

const setVolume = () => {
  const slider = document.querySelector(".slider");
  const audio = document.querySelector("audio");
  audio.volume = slider.value;
};

const togglePlay = () => {
  const audio = document.querySelector("audio");
  if (audio.classList.contains("playing")) {
    audio.classList.remove("playing");
    audio.pause();
    showPauseIcon();
  } else {
    audio.classList.add("playing");
    audio.play();
    showPlayIcon();
  }
};

const playButtonOnHeader = document.querySelector("header #playButton svg"),
  playButtonOnFooter = document.querySelector("footer .play-button-footer"),
  playButtonOnMiddle = document.querySelector(".play-button svg");

const showPlayIcon = () => {
  playButtonOnHeader.innerHTML = `<path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>`;
  playButtonOnMiddle.innerHTML = `<path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path>`;
  playButtonOnFooter.innerHTML = `<svg role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`;
};

const showPauseIcon = () => {
  playButtonOnHeader.innerHTML = `<path
                      d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                    ></path>`;
  playButtonOnMiddle.innerHTML = `<path
                      d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"
                    ></path>`;
  playButtonOnFooter.innerHTML = `<svg role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>`;
};

const changeIconToPause = (btn) => {
  playSong(btn.closest("tr"));
  btn.outerHTML = `<i class="bi bi-pause-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
};

const changeIconToPlay = (btn) => {
  btn.outerHTML = `<i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPause(this)"></i>`;
};

const likeAlbum = (btn) => {
  if (btn.classList.contains("unlikedAlbum")) {
    btn.classList.replace("unlikedAlbum", "likedAlbum");
    btn.innerHTML = `<svg role="img" height="32" style="fill: #1ed760" width="32" viewBox="0 0 24 24"><path d="M8.667 1.912a6.257 6.257 0 00-7.462 7.677c.24.906.683 1.747 1.295 2.457l7.955 9.482a2.015 2.015 0 003.09 0l7.956-9.482a6.188 6.188 0 001.382-5.234l-.49.097.49-.099a6.303 6.303 0 00-5.162-4.98h-.002a6.24 6.24 0 00-5.295 1.65.623.623 0 01-.848 0 6.257 6.257 0 00-2.91-1.568z"></path></svg>`;
    alert.innerHTML = `Added to your <strong>Albums</strong>`;
    alert.classList.replace("d-none", "d-block");
    setTimeout(() => {
      alert.classList.replace("d-block", "d-none");
    }, 2000);
  } else {
    btn.classList.replace("likedAlbum", "unlikedAlbum");
    btn.innerHTML = `<svg role="img" height="32" width="32" viewBox="0 0 24 24"><path d="M5.21 1.57a6.757 6.757 0 016.708 1.545.124.124 0 00.165 0 6.741 6.741 0 015.715-1.78l.004.001a6.802 6.802 0 015.571 5.376v.003a6.689 6.689 0 01-1.49 5.655l-7.954 9.48a2.518 2.518 0 01-3.857 0L2.12 12.37A6.683 6.683 0 01.627 6.714 6.757 6.757 0 015.21 1.57zm3.12 1.803a4.757 4.757 0 00-5.74 3.725l-.001.002a4.684 4.684 0 001.049 3.969l.009.01 7.958 9.485a.518.518 0 00.79 0l7.968-9.495a4.688 4.688 0 001.049-3.965 4.803 4.803 0 00-3.931-3.794 4.74 4.74 0 00-4.023 1.256l-.008.008a2.123 2.123 0 01-2.9 0l-.007-.007a4.757 4.757 0 00-2.214-1.194z"></path></svg>`;
    alert.innerHTML = `Removed from your <strong>Albums</strong>`;
    alert.classList.replace("d-none", "d-block");
    setTimeout(() => {
      alert.classList.replace("d-block", "d-none");
    }, 2000);
  }
};

const likeSong = (btn) => {
  if (btn.closest("tr").classList.contains("unlikedSong")) {
    btn.closest("tr").classList.replace("unlikedSong", "likedSong");
    btn.outerHTML = `<i class="bi bi-heart-fill mr-5 d-none d-md-inline" style="color: #1ed760"  onclick="likeSong(this)"></i>`;
    alert.innerHTML = `Added to your <strong>Liked Songs</strong>`;
    alert.classList.replace("d-none", "d-block");
    setTimeout(() => {
      alert.classList.replace("d-block", "d-none");
    }, 2000);
  } else {
    btn.closest("tr").classList.replace("likedSong", "unlikedSong");
    btn.outerHTML = `<i class="bi bi-heart mr-5 d-none d-md-inline" onclick="likeSong(this)"></i>`;
    alert.innerHTML = `Removed from your <strong>Liked Songs</strong>`;
    alert.classList.replace("d-none", "d-block");
    setTimeout(() => {
      alert.classList.replace("d-block", "d-none");
    }, 2000);
  }
};

// header related (check window.addEventListener at line 22)
const header = document.querySelector("header"),
  showOnScroll = document.querySelector("header .showOnScroll"),
  titleShowsUpOnScroll = document.querySelector("header h5"),
  prevButton = document.querySelector("#prevButton"),
  nextButton = document.querySelector("#nextButton"),
  dropdownButton = document.querySelector(".dropdownButton");

// we'll see whether it works or not
// prevButton.addEventListener("click", window.history.back);
// nextButton.addEventListener("click", window.history.forward);

const changeDropDownIconWhenShowing = () => {
  let isDropdownShowing = dropdownButton.getAttribute("aria-expanded");
  if (isDropdownShowing === "false") {
    document.querySelector(
      ".dropdownButton svg"
    ).innerHTML = `<path d="M14 10L8 4l-6 6h12z"></path>`;
  } else {
    document.querySelector(
      ".dropdownButton svg"
    ).innerHTML = `<path d="M14 6l-6 6-6-6h12z"></path>`;
  }
};

const changeBGColorOnScroll = () => {
  var scroll = window.scrollY;
  if (scroll >= 175) {
    header.classList.add("halfOp");
    showOnScroll.classList.add("opacity-75");
  }

  if (scroll >= 300) {
    header.classList.add("changedBG");
    showOnScroll.classList.add("opacity-100");
  }

  if (scroll <= 175) {
    header.classList.remove("changedBG", "halfOp");
    showOnScroll.classList.remove("opacity-75", "opacity-100");
  }
};
