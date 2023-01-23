const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "0cbcd173dfmshe0d3767927ec133p151910jsn1f811931eda4",
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

const fetchData = () => {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?q=U2", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
fetchData();

const create = async function () {
  const response = await fetch(
    "https://deezerdevs-deezer.p.rapidapi.com/search?q=U2",
    {
      method: "POST",
      body: JSON.stringify(data.album),
      headers: {
        "Content-type": "application/json",
        "X-RapidAPI-Key": "0cbcd173dfmshe0d3767927ec133p151910jsn1f811931eda4",
        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
      },
    }
  );
  if (response.ok) {
    alert("OK!");
  } else {
    alert("error :(");
  }
};
