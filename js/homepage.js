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
    .then((data) => renderData(data.data))
    .catch((err) => console.error(err));
};
fetchData();

const renderData = async function (data) {
  console.log(data);
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