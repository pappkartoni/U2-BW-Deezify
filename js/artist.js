const url = "https://striveschool-api.herokuapp.com/api/deezer/"
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
            const { id, name, share, picture_xl, nb_fan, tracklist } = artist
            document.title = name
            document.querySelector("#jumbo h1").innerText = name
            document.querySelector("#jumbo p span").innerText = nb_fan
            document.querySelector(".jumbotron-fluid").style.backgroundImage = `url(${picture_xl})`
        } else {
            throw res.status + res.statusText
        }
        
    } catch (error) {
        console.log(error)
    }
}

window.onload = () => {
    getArtist()
}