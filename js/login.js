const dangerAlertBox = document.querySelector("#alertContainer .alert-danger");

const loginActions = () => {
  const username = document.querySelector("#usernameInput").value,
    password = document.querySelector("#passwordInput").value;
  if (password === "epicode") {
    if (username !== "") {
      localStorage.setItem("username", username);
      window.location.href = "../homepage.html";
    }
  } else if (username === "") {
    dangerAlertBox.firstElementChild.innerText = "Please insert a username!";
    dangerAlertBox.classList.replace("d-none", "d-block");
    setTimeout(() => {
      dangerAlertBox.classList.replace("d-block", "d-none");
    }, 3000);
  } else {
    dangerAlertBox.firstElementChild.innerText = "Wrong password!";
    dangerAlertBox.classList.replace("d-none", "d-block");
    setTimeout(() => {
      dangerAlertBox.classList.replace("d-block", "d-none");
    }, 3000);
  }
};

const windowOnloadActions = () => {
  document.querySelector("#usernameInput").value = "";
  document.querySelector("#passwordInput").value = "";
  rememberMeBtn.addEventListener("click", rememberOrNot);
  rememberMeLabel.addEventListener("click", rememberOrNot);
};

window.onload = () => {
  hideOrShow();
  windowOnloadActions();
};

const hideOrShow = () => {
  const hOsButton = document.querySelector(
      "#inputWrapper #passwordInput ~ div"
    ),
    passwordInput = document.querySelector("#passwordInput");

  hOsButton.addEventListener("click", () => {
    if (hOsButton.classList.contains("hide")) {
      hOsButton.classList.remove("hide");
      hOsButton.firstElementChild.innerHTML = `
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />`;
      passwordInput.type = "text";
    } else {
      hOsButton.classList.add("hide");
      hOsButton.firstElementChild.innerHTML = `<path
                                                d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"
                                                />
                                                <path
                                                d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"
                                                />`;
      passwordInput.type = "password";
    }
  });
};

const rememberMeBtn = document.querySelector("#rememberMe"),
  rememberMeLabel = document.querySelector("#rememberMe ~ label");

const rememberOrNot = () => {
  if (rememberMeBtn.classList.contains("selected")) {
    rememberMeBtn.classList.remove("selected");
    rememberMeBtn.innerHTML = "";
  } else {
    rememberMeBtn.classList.add("selected");
    rememberMeBtn.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                    </svg>`;
  }
};
