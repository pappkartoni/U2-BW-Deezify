const url = "https://striveschool-api.herokuapp.com/api/deezer/"
const url1 = "https://deezerdevs-deezer.p.rapidapi.com/"
const params = new URLSearchParams(location.search)
const id = params.get("id")
const headers = {
    'X-RapidAPI-Key': '1fd0bc5ccfmshf2b04cf36ba473ap157883jsnb65aff44a460',
    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
}

const getArtist = async () => {
    try {
        const res = await fetch(url + "artist/" + id, {headers: headers})
        if (res.ok) {
            const artist = await res.json()
            console.log(artist)
            const { id, name, share, picture_xl, nb_fan, tracklist } = artist
            document.title = "Deezify - " + name
            document.querySelector("#jumbo h1").innerText = name
            document.querySelector("header h5").innerText = name; 
            document.querySelector("#jumbo p span").innerText = nb_fan.toLocaleString("en-US")
            document.querySelector(".jumbotron-fluid").style.backgroundImage = `url(${picture_xl})`
            getTopSongs(tracklist)
        } else {
            throw res.status + res.statusText
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getTopSongs = async (tUrl) => {
    try {
        console.log(tUrl)
        const res = await fetch(tUrl, {headers: headers})
        if (res.ok) {
            const songs = await res.json()
            renderTopSongs(songs.data)
        } else {
            throw res.status + res.statusText
        }
    } catch (error) {
        console.log(error)
    }
}

const renderTopSongs = (songs) => {
    const top = document.getElementById("top")
    for (let i = 0; i < songs.length; i++) {
        const {title, explicit_lyrics, rank, album, artist, duration, preview} = songs[i]
        top.innerHTML += `
                        <div class="d-flex align-items-center py-1" onclick="highlightSong(this)" ondblclick="playSong(this)">
                            <span class="d-none" data-preview="${preview}" data-img="${album.cover}" data-artist="${artist.name}" data-title="${title}"></span>
                            <div class="top-song-nr mr-4">${i+1}</div>
                            <div class="mr-4"><img src="${album.cover}" style="width: 40px"></div>
                            <div class="top-song-title text-white mr-auto">${title} ${explicit_lyrics ? "<span class='badge badge-light'>E</span>" : ""}</div>
                            <div class="mr-5 d-none d-md-block">${rank.toLocaleString("en-US")}</div>
                            <div class="d-flex">
                                <button class="btn-transparent">
                                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M1.69 2A4.582 4.582 0 018 2.023 4.583 4.583 0 0111.88.817h.002a4.618 4.618 0 013.782 3.65v.003a4.543 4.543 0 01-1.011 3.84L9.35 14.629a1.765 1.765 0 01-2.093.464 1.762 1.762 0 01-.605-.463L1.348 8.309A4.582 4.582 0 011.689 2zm3.158.252A3.082 3.082 0 002.49 7.337l.005.005L7.8 13.664a.264.264 0 00.311.069.262.262 0 00.09-.069l5.312-6.33a3.043 3.043 0 00.68-2.573 3.118 3.118 0 00-2.551-2.463 3.079 3.079 0 00-2.612.816l-.007.007a1.501 1.501 0 01-2.045 0l-.009-.008a3.082 3.082 0 00-2.121-.861z"></path></svg>
                                </button>
                                <span class="pr-3 pl-4">${durationFormatter(duration)}</span>
                                <button class="btn-transparent">
                                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm6.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM16 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path></svg>
                                </button>
                            </div>
                        </div>`
    }
    renderArtistPick(songs[0].album, songs[0].artist)
}

const renderArtistPick = (pick, artist) => {
    console.log(pick)
    const artPick = document.getElementById("artpick")
    artPick.innerHTML = `
                        <a href="./album.html?id=${pick.id}">
                        <div class="row d-flex no-gutters">
                            <div class="pr-2 mb-2">
                                <img src="${pick.cover}" class="card-img" style="width: 80px">
                            </div>
                            <div class="artpick-info">
                                <div class="d-flex flex-column">
                                    <span class=""><img src="${pick.cover}"> Posted By ${artist.name}</span>
                                    <h5 class="text-truncate">${pick.title}</h5>
                                    <span class="">${capitalize(pick.type)}</span>
                                </div>
                            </div>
                        </div>
                        </a>
                        `
}

const togglePlay = () => {
    const audio = document.querySelector("audio")
    if (audio.paused) {
        document.querySelector(".play-button-footer").innerHTML = `<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
        document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
        document.querySelector("header #playButton").innerHTML = `<svg role="img" height="24" width="24" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"></path></svg>`
        audio.play()
    } else {
        document.querySelector(".play-button-footer").innerHTML = `<svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z"></path></svg>`
        document.querySelector(".container-fluid .play-button").innerHTML = `<svg role="img" height="28" width="28" aria-hidden="true" viewBox="0 0 24 24" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
        document.querySelector("header #playButton").innerHTML = `<svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"></path></svg>`
        audio.pause()
    }
}
const highlightSong = (div) => {
    const prevHighlighted = document.querySelector(".highlighted")
    if (prevHighlighted && prevHighlighted !== div) {
        prevHighlighted.classList.remove("highlighted")
    }
    div.classList.toggle("highlighted")
}

const playSong = (div) => {
    const data = div.firstElementChild.dataset
    const player = document.querySelector("audio")
    document.querySelectorAll(".text-green").forEach((elem) => elem.classList.remove("text-green"))
    div.querySelector(".top-song-nr").classList.add("text-green")
    div.querySelector(".top-song-title").classList.add("text-green")
    document.querySelector(".footer-info img").src = data.img
    document.querySelector(".footer-info h6").innerText = data.title
    document.querySelector(".footer-info span").innerText = data.artist
    player.src = data.preview
    if(player.paused) {
        togglePlay()
    } else {
        player.play()
    }
}

const prevSong = () => {
    const previous = document.querySelector(".text-green").parentNode.previousElementSibling
    if (previous) {
        playSong(previous)
    }
}
const nextSong = () => {
    const next = document.querySelector(".text-green").parentNode.nextElementSibling
    if (next) {
        playSong(next)
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
    this.style.background = `linear-gradient(to right, white 0%, white ${percentage}%, hsla(0, 0%, 100%, 0.3) ${percentage}%,  hsla(0, 0%, 100%, 0.3) 100%)`
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

// username function -> between line 131 and 145

const usernameOnPage = document.querySelector(".dropdownButton > span > span");
const setUsername = (username = "username") => {
  usernameOnPage.innerText = username;
};

window.onload = () => {
    window.addEventListener("scroll", changeBGColorOnScroll);
    setUsername(
        localStorage
        .getItem("username")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
    setVolume()
    const slider = document.querySelector(".slider")
    slider.addEventListener("input", setVolume)
    getArtist()
}

// header related -> between line 152 and 194

const header = document.querySelector("header"),
  showOnScroll = document.querySelector("header .showOnScroll"),
  prevButton = document.querySelector("#prevButton"),
  nextButton = document.querySelector("#nextButton"),
  dropdownButton = document.querySelector(".dropdownButton");

// we'll see whether it works or not
prevButton.addEventListener("click", window.history.back);
nextButton.addEventListener("click", window.history.forward);

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