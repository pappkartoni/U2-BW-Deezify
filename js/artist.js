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
            document.title = name
            document.querySelector("#jumbo h1").innerText = name
            document.querySelector("#jumbo p span").innerText = nb_fan
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
        const res = await fetch(tUrl, {headers: headers})
        if (res.ok) {
            const songs = await res.json()
            console.log(songs)
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

        top.innerHTML += `
                        <div class="d-flex align-items-center  py-1">
                            <div class="mr-4">${i+1}</div>
                            <div class="mr-4"><img src="${songs[i].album.cover}" style="width: 40px"></div>
                            <div class="mr-auto">${songs[i].title} ${songs[i].explicit_lyrics ? "<span class='badge badge-light'>E</span>" : ""}</div>
                            <div class="mr-4">${songs[i].rank}</div>
                            <div>${durationFormatter(songs[i].duration)}</div>
                        </div>`
    }
    renderArtistPick(songs[0].album)
}

const renderArtistPick = (pick) => {
    console.log(pick)
    const artPick = document.getElementById("artpick")
    artPick.innerHTML = `
                        <div class="card">
                            <div class="row no-gutter">
                                <div class="col-4">
                                    <img src="${pick.cover}" class="card-img" style="width: 80px">
                                </div>
                                <div class="col-8">
                                    <div class="card-body">
                                        <h5 class="card-title text-truncate">${pick.title}</h5>
                                        <h6 class="card-subtitle">${pick.type}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
}

const durationFormatter = (dur) => {
    return (Math.floor(dur / 60)) + ":" + (dur % 60)
}

window.onload = () => {
    getArtist()
}