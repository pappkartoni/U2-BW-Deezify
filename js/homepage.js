const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cbcd173dfmshe0d3767927ec133p151910jsn1f811931eda4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const songsToPlay = []
let playIndex = 0

const searchURL = "https://striveschool-api.herokuapp.com/api/deezer/";


const artistIds = [1, 2, 3, 413, 5, 2857]; // [{id: 123, type: "album"}, {}]
const albumIds = [
  382588837, 152555282, 282033892, 382588837, 152555282, 282033892, 382588837,
  152555282,
];

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

const renderGoodMorningSongs = async function () {
  const goodMorningRowNode = document.querySelector(
    ".good-morning-container .row"
  );
  for (let i = 0; i < 6; i++) {
    const data = await fetchData(searchURL, "artist/", artistIds[i]);
    goodMorningRowNode.innerHTML += `

    <div class="col-lg-4 col-sm-6">
    <a href="./artist.html?id=${data.id}">
      <div class="welcome-card w-100">
        <div class="d-flex align-items-center" style="height: 80px">
          <div class="h-100">
            <img
              class="h-100"
              src="${data.picture_medium}"
              alt="..."
            />
          </div>
          <h5>${data.name}</h5>
        </div>
        <div class="btn-wrapper justify-content-end">
          <button class="btn-transparent d-none"></button>
          <button class="btn-transparent">
            <div
              class="play-button-cards d-flex align-items-center justify-content-center" data-tracklist="${data.tracklist}"
            >
              <svg
                role="img"
                height="16"
                width="16"
                aria-hidden="true"
                viewBox="0 0 16 16"
                data-encore-id="icon"
                class="Svg-sc-ytk21e-0 uPxdw"
              >
                <path
                  d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </a>
  </div>
    `;
  }
  goodMorningRowNode.querySelectorAll(".play-button-cards").forEach((node) => {
      node.addEventListener("click", (e) => {
          e.preventDefault();
          const btn = e.target.closest(".play-button-cards")
          const audio = document.querySelector("audio")
          if (!btn.classList.contains("playing")) {
            getArtistTopSongs(btn.dataset.tracklist)
            btn.innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`

            toggleButtons()
          } else {
            togglePlay()
            if (!audio.classList.contains("playing")) {
              //TODO document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
              btn.innerHTML = `<svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
            }   else {
              //document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
              btn.innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
            }
          }
          btn.classList.add("playing")
          document.querySelectorAll(".play-button-cards.playing").forEach((button) => {
            if (button !== btn) {
              button.innerHTML = `<svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
              button.classList.remove("playing")}})
        
      })
  })
};

const renderData = async function (container) {
  for (let i = 0; i < 8; i++) {
    const data = await fetchData(searchURL, "album/", albumIds[i]);
    container.innerHTML += `<div class="col">
                              <a href="./album.html?id=${data.id}">
                              <div class="card mb-3">
                              <div class="img-wrapper">
                              <img src="${
                                data.cover_medium
                              }" class="card-img-top" alt="...">
                              <button class="btn-transparent" onclick="playAlbum(${data.tracks})">
                                <div
                                  class="play-button-cards d-flex align-items-center justify-content-center"
                                >
                                  <svg
                                    role="img"
                                    height="16"
                                    width="16"
                                    aria-hidden="true"
                                    viewBox="0 0 16 16"
                                    data-encore-id="icon"
                                    class="Svg-sc-ytk21e-0 uPxdw"
                                  >
                                    <path
                                      d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"
                                    ></path>
                                  </svg>
                                </div>
                              </button>
                              </div>
                              <div class="card-body">
                                <h5 class="card-title text-truncate">${
                                  data.title
                                }</h5>
                                <h6 class="card-subtitle">${data.release_date.substring(
                                  0,
                                  4
                                )} ??? ${data.artist.name}</h6>
                              </div>
                            </a>
                          </div>`;
  }

};

const playAlbum = (tracks) => {
  while (songsToPlay.length) {
    songsToPlay.pop()
  }
  tracks.forEach((song) => songsToPlay.push(song))
  playIndex = 0
}

const setWelcomeMessage = () => {
  const hours = new Date().getHours();
  const h1 = document.querySelector("h1");
  if (hours < 6) {
    h1.innerText = "Good night";
  } else if (hours < 12) {
    h1.innerText = "Good morning";
  } else if (hours < 22) {
    h1.innerText = "Good evening";
  } else {
    h1.innerText = "Good night";
  }
};


const changeBGColorOnScroll = () => {
  var scroll = window.scrollY;
  if (scroll >= 120) {
    header.classList.add("changedBG");
  } else {
    header.classList.remove("changedBG");
  }
};


const togglePlay = () => {
  const audio = document.querySelector("audio")
  audio.classList.toggle("playing") 
  toggleButtons()
  if (audio.paused) {
      audio.play()
  } else {
      audio.pause()
  }
}

const toggleButtons = () => {
  const audio = document.querySelector("audio")
  if (!audio.classList.contains("playing")) {
      document.querySelector(".play-button-footer").innerHTML = `<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>`
      //TODO document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
      //document.querySelector("header #playButton").innerHTML = `<svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
  }   else {
      document.querySelector(".play-button-footer").innerHTML = `<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
      //document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
      //document.querySelector("header #playButton").innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
  }
}

const highlightSong = (div) => {
  const prevHighlighted = document.querySelector(".highlighted")
  if (prevHighlighted && prevHighlighted !== div) {
      prevHighlighted.classList.remove("highlighted")
  }
  div.classList.toggle("highlighted")
}

const playSong = (index) => {
  const song = songsToPlay[index]
  const player = document.querySelector("audio")
  //TODO document.querySelectorAll(".text-green").forEach((elem) => elem.classList.remove("text-green"))
  //div.querySelector(".top-song-nr").classList.add("text-green")
  //div.querySelector(".top-song-title").classList.add("text-green")
  document.querySelector(".footer-info img").src = song.album.cover_medium
  document.querySelector(".footer-info h6").innerText = song.title
  document.querySelector(".footer-info span").innerText = song.artist.name
  player.src = song.preview
  if(!player.classList.contains("playing")) {
      togglePlay()
  } else {
      player.play()
  }
}

const prevSong = () => {
  
  if (playIndex > 0) {
      playIndex--
      playSong(playIndex)
  }
}
const nextSong = () => {
  if (playIndex < songsToPlay.length - 1) {
      playIndex++
      playSong(playIndex)
  } else if (songsToPlay.length) {
      document.querySelector("audio").classList.toggle("playing") 
      toggleButtons()
    }
  }
  
  const endSong = () => {
    if (playIndex < songsToPlay.length - 1) { 
      nextSong()
    } else {
      document.querySelector("audio").classList.toggle("playing") 
      toggleButtons()
  }
}

const setVolume = () => {
  const slider = document.querySelector(".slider")
  slider.style.background = `linear-gradient(to right, white 0%, white ${slider.value * 200}%, hsla(0, 0%, 100%, 0.3) ${slider.value * 200}%,  hsla(0, 0%, 100%, 0.3) 100%)`
  const audio = document.querySelector("audio")
  audio.volume = slider.value
  changeVolumeImage()
}

const changeVolumeImage = () => {
  const volume = document.querySelector(".slider").value
  const btn = document.querySelector(".volume .btn-transparent")
  if (volume == 0) {
      btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume off" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M13.86 5.47a.75.75 0 00-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 008.8 6.53L10.269 8l-1.47 1.47a.75.75 0 101.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 001.06-1.06L12.39 8l1.47-1.47a.75.75 0 000-1.06z"></path><path d="M10.116 1.5A.75.75 0 008.991.85l-6.925 4a3.642 3.642 0 00-1.33 4.967 3.639 3.639 0 001.33 1.332l6.925 4a.75.75 0 001.125-.649v-1.906a4.73 4.73 0 01-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 01-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>`
  } else {
      if (volume < 0.166) {
          btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume low" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path></svg>`
      } else if (volume < 0.333) {
          btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume medium" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 000-8.474v1.65a2.999 2.999 0 010 5.175v1.649z"></path></svg>`
      } else {
          btn.innerHTML = `<svg role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volume high" id="volume-icon" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 000-11.228v1.55a4.252 4.252 0 010 8.127v1.55z"></path></svg>`
      }
  }

}

const songProgress = () => {
  const audio = document.querySelector("audio")
  const length = audio.duration
  const cur = audio.currentTime
  const progress = document.querySelector(".progress")
  document.querySelector(".curDur").innerText = durationFormatter(Math.round(cur))
  document.querySelector(".maxDur").innerText = durationFormatter(Math.round(length))
  const percentage = 100 * cur / length
  progress.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, hsla(0, 0%, 100%, 0.3) ${percentage}%,  hsla(0, 0%, 100%, 0.3) 100%)`
  progress.addEventListener("click", seek)
}   

const seek = (event) => {
  const audio = document.querySelector("audio")
  const percentage = event.offsetX / event.target.offsetWidth

  audio.currentTime = percentage * audio.duration
 /*  event.target.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, hsla(0, 0%, 100%, 0.3) ${percentage}%,  hsla(0, 0%, 100%, 0.3) 100%)` */
}

const followMock = (btn) => {
  btn.innerText === "FOLLOW" ? btn.innerText = "FOLLOWING" : btn.innerText = "FOLLOW"
}

const durationFormatter = (dur) => {
  return (Math.floor(dur / 60)) + ":" + ((dur % 60) < 10 ? "0" + (dur % 60) : dur % 60)
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const renderNavbarList = async () => {
  const navbarUl = document.querySelector(".scroll-container ul");
  for (let i = 0; i < 6; i++) {
    const data = await fetchData(searchURL, "artist/", artistIds[i]);
    navbarUl.innerHTML += `<li><a href="./artist.html?id=${data.id}">${data.name}</a></li>`;
  }
};

const getArtistTopSongs = async (url) => {
  try {
      const res = await fetch(url, options)
      if (res.ok) {
          const songs = await res.json()
          while (songsToPlay.length) {
            songsToPlay.pop()
          }
          songs.data.forEach((song) => songsToPlay.push(song))
          playIndex = 0
          playSong(playIndex)
      } else {
          throw res.status + res.statusText
      }
  } catch (error) {
      console.log(error)
  }
}

window.onload = () => {
  window.addEventListener("scroll", changeBGColorOnScroll);
  setWelcomeMessage();
  renderGoodMorningSongs();
  const recentlyPlayedRowNode = document.querySelector("main .recently-played");
  const showsToTryRowNode = document.querySelector("main .shows-to-try");
  renderData(recentlyPlayedRowNode);
  renderData(showsToTryRowNode);

  setVolume()
  const slider = document.querySelector(".slider")
  slider.addEventListener("input", setVolume)
  
  renderNavbarList();
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

// header related -> between line 152 and 187
const header = document.querySelector("header"),
  titleShowsUpOnScroll = document.querySelector("header h5"),
  prevButton = document.querySelector("#prevButton"),
  nextButton = document.querySelector("#nextButton"),
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
