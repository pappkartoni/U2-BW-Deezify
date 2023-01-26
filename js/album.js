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
  labelOnPage = document.querySelector("#songsWrapper table ~ span ~ span");

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
            <tr>
                <td scope="col" style="width: 30px" class="numberToPlayIcon position-relative">
                  <span>${i++}</span>
                  <i class="bi bi-play-fill position-absolute"></i>
                </td>
                <td>${song.title_short}
                    ${
                      song.explicit_lyrics
                        ? `<span class="badge badge-light ml-1 d-none d-lg-inline">E</span>`
                        : ""
                    }
                </br>
                <span class="text-muted">${song.artist.name}</span>
                </td>
                <td class="text-right"><i class="bi bi-heart mr-5 d-none d-md-inline"></i>${secToMin(
                  song.duration
                )}:${secToSec(song.duration)}</td>
            </tr>
    `;
    })
    .join("");
  musicTableBody.innerHTML = tracksHTML;
};

// header related (check window.addEventListener at line 22)
const header = document.querySelector("header"),
  showOnScroll = document.querySelector("header .showOnScroll"),
  titleShowsUpOnScroll = document.querySelector("header h5"),
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
