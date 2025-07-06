// სერვერიდან ინფორმაცია - (get methods)
let request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/users");

request.addEventListener("load", function () {
  let response = this.responseText;
  let users = JSON.parse(response);

  let ulEl = document.createElement("ul");

  fetch("https://randomuser.me/api/?results=3")
    .then((res) => res.json())
    .then((randomData) => {
      for (let i = 0; i < 3; i++) {
        let user = users[i];
        let randomUser = randomData.results[i];

        let li = document.createElement("li");


        let nameText = document.createElement("p");
        nameText.textContent = user.name;

        let img = document.createElement("img");
        img.src = randomUser.picture.large;
        img.alt = user.name;
        img.style.width = "55%";


        li.appendChild(img);
        li.appendChild(nameText);
        ulEl.appendChild(li);
      }

      document.getElementById("api").appendChild(ulEl);
    });
});

request.addEventListener("error", function () {
  let pError = document.createElement("p");
  pError.textContent = "Server error";
  document.getElementById("api").appendChild(pError);
});

request.send();

// form

// 
let loginForm = document.getElementById("form-login");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let checkbox = document.getElementById("save");

    if (checkbox.checked) {
      let usernameValue = document.getElementById("username").value;
      Cookies.set("saved_username", usernameValue);
    } else {
      Cookies.remove("saved_username");
    }

    this.submit();
  });

  let savedUsername = Cookies.get("saved_username");
  if (savedUsername) {
    document.getElementById("username").value = savedUsername;
    document.getElementById("save").checked = true;
  }
}

// 
let regForm = document.getElementById("registration");

if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let errors = {};

    // 
    let username = document.getElementById("usernamefield").value;
    if (username === "") {
      errors.username = "Username field cannot be empty";
    }

    // 
    let password = document.getElementById("passwordfield").value;
    let password2 = document.getElementById("passwordfield2").value;

    if (password === "") {
      errors.password = "Password field cannot be empty";
    }

    if (password !== password2) {
      errors.password2 = "Passwords do not match";
    }

    // 
    let gender = false;
    this.querySelectorAll(".input-el").forEach(function (item) {
      if (item.checked) {
        gender = true;
      }
    });

    if (!gender) {
      errors.gender = "Please select your gender";
    }

    // 
    let agree = document.getElementById("check").checked;
    if (!agree) {
      errors.agree = "You must agree to our terms and conditions";
    }

    // 
    this.querySelectorAll(".error-text").forEach((item) => {
      item.innerText = "";
    });

    // 
    for (let key in errors) {
      let errorText = document.getElementById("error-" + key);
      if (errorText) {
        errorText.textContent = errors[key];
      }
    }

    if (Object.keys(errors).length === 0) {
      this.submit();
    }
  });

  //
  let emailInput = document.getElementById("email");

  function emailValidation() {
    let emailValue = emailInput.value;
    let pError = document.getElementById("email-error");
    let pError2 = document.getElementById("emailfield");
    let pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailValue === "") {
      pError2.textContent = "Email field cannot be empty";
    } else if (pattern.test(emailValue)) {
      pError.innerText = "Your Email is Valid";
      pError.style.color = "green";
    } else {
      pError.innerText = "Your Email is Invalid";
      pError.style.color = "red";
    }
  }

  emailInput.addEventListener("keyup", emailValidation);
}


// cookies

// 
function setCookie(name, value, days) {
  let d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// 
function getCookie(name) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  name = name + "=";
  for(let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

// 
window.onload = () => {
  let banner = document.getElementById("cookieBanner");
  let acceptBtn = document.getElementById("acceptCookies");

  if (!getCookie("cookiesAccepted")) {
    banner.style.display = "block";
  }

  acceptBtn.onclick = () => {
    setCookie("cookiesAccepted", "true", 30);
    banner.style.display = "none";
  };
};

// scroll to top

window.onscroll = function () {
  showScrollButton();
};

function showScrollButton() {
  let btn = document.getElementById("scrollTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

// 
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// burger


    let burger = document.getElementById('burgerbarmain');
    let nav = document.querySelector('.mainnav');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });




