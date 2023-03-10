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

const artistIds = [1, 2, 3, 413, 5, 2857]; 

const setUsername = (username = "username") => {
  usernameOnPage.innerText = username;
};

const fetchData = async (url, apiCall, query) => {
  try {
    const res = await fetch(`${url}${apiCall}${query}`, options);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw res.status + res.statusText
    }
  } catch (error) {
    console.log(error)
  }
};

const renderNavbarList = async () => {
  const navbarUl = document.querySelector(".scroll-container ul");
  for (let i = 0; i < 6; i++) {
    const data = await fetchData("https://striveschool-api.herokuapp.com/api/deezer/", "artist/", artistIds[i]);
    navbarUl.innerHTML += `<li><a href="./artist.html?id=${data.id}">${data.name}</a></li>`;
  }
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

    browserTabTitle.innerText = `Deezify - ${title}`;
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
    labelOnPage.innerText = `?? ${label}`;

    displayTrackList(tracksArray);
  } catch (error) {
    console.error(error.message);
  }
  renderNavbarList()
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
                <span class='artistName'>${song.title_short}</span>${
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
  const data = musicToPlay.firstElementChild.dataset;
  const audio = document.querySelector("audio");
  document.querySelectorAll(".text-green").forEach((elem) => {
    elem.classList.remove("text-green");
    if (elem.classList.contains("numberToPlayIcon")) {
      elem.childNodes[3].outerHTML = `<i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
    }
  });
  musicToPlay.querySelector(".numberToPlayIcon").classList.add("text-green");
  musicToPlay.querySelector(".artistName").classList.add("text-green");
  document.querySelector(".footer-info img").src = data.img;
  document.querySelector(".footer-info h6").innerText = data.title;
  document.querySelector(".footer-info span").innerText = data.artist;
  audio.src = data.preview;
  if (!audio.classList.contains("playing")) {
    togglePlay();
    musicToPlay.childNodes[3].childNodes[3].outerHTML = `<i class="bi bi-pause-fill showAnyway position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
  } else {
    musicToPlay.childNodes[3].childNodes[3].outerHTML = `<i class="bi bi-pause-fill showAnyway position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
    audio.play();
    showPlayIcon();
  }
};

const prevSong = () => {
  console.log("prev song");
  const previous =
    document.querySelector(".text-green").parentNode.previousElementSibling;
  document.querySelector(
    ".text-green"
  ).childNodes[3].outerHTML = `<i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
  if (previous) {
    playSong(previous);
  }
};
const nextSong = () => {
  console.log("next song");
  const next =
    document.querySelector(".text-green").parentNode.nextElementSibling;
  document.querySelector(
    ".text-green"
  ).childNodes[3].outerHTML = `<i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
  if (next) {
    playSong(next);
  } else {
    document.querySelector("audio").classList.toggle("playing");
  }
};

const endSong = () => {
  console.log("end song");
  if (document.querySelector(".text-green")) {
    nextSong();
  } else {
    document.querySelector("audio").classList.toggle("playing");
  }
};

const setVolume = () => {
  const slider = document.querySelector(".slider");
  slider.style.background = `linear-gradient(to right, white 0%, white ${
    slider.value * 200
  }%, hsla(0, 0%, 100%, 0.3) ${
    slider.value * 200
  }%,  hsla(0, 0%, 100%, 0.3) 100%)`;
  const audio = document.querySelector("audio");
  audio.volume = slider.value;
  changeVolumeImage();
};

const togglePlay = () => {
  const audio = document.querySelector("audio");
  console.log(document.querySelector(".bi.bi-pause-fill"));
  if (document.querySelector(".bi.bi-pause-fill")) {
    document.querySelector(
      ".bi.bi-pause-fill"
    ).outerHTML = `<i class="bi bi-play-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
  } else if (document.querySelector(".text-green .bi.bi-play-fill")) {
    document.querySelector(
      ".text-green .bi.bi-play-fill"
    ).outerHTML = `<i class="bi bi-pause-fill position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
  }

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

const changeVolumeImage = () => {
  const volume = document.querySelector(".slider").value;
  const btn = document.querySelector(".volume .btn-transparent");
  if (volume == 0) {
    btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume off" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>`;
  } else {
    if (volume < 0.166) {
      btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg>`;
    } else if (volume < 0.333) {
      btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg>`;
    } else {
      btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>`;
    }
  }
};

const songProgress = () => {
  const audio = document.querySelector("audio");
  const length = audio.duration;
  const cur = audio.currentTime;
  const progress = document.querySelector(".progress");
  document.querySelector(".curDur").innerText = durationFormatter(
    Math.round(cur)
  );
  document.querySelector(".maxDur").innerText = durationFormatter(
    Math.round(length)
  );
  const percentage = (100 * cur) / length;
  progress.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, hsla(0, 0%, 100%, 0.3) ${percentage}%,  hsla(0, 0%, 100%, 0.3) 100%)`;
  progress.addEventListener("click", seek);
};

const seek = (event) => {
  const audio = document.querySelector("audio");
  const percentage = event.offsetX / event.target.offsetWidth;

  audio.currentTime = percentage * audio.duration;
};

const durationFormatter = (dur) => {
  return (
    Math.floor(dur / 60) + ":" + (dur % 60 < 10 ? "0" + (dur % 60) : dur % 60)
  );
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
  btn.outerHTML = `<i class="bi bi-pause-fill showAnyway position-absolute" onclick="togglePlay(), changeIconToPlay(this)"></i>`;
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
  dropdownButton = document.querySelector(".dropdownButton");

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
