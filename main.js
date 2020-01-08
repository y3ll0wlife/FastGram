var accounts = [];

function getImages() {
  try {
    document.getElementById("foundImages").textContent = "";
  } catch (error) {}

  var element = document.createElement("div");
  element.setAttribute("class", "images");

  for (let z = 0; z < accounts.length; z++) {
    let baseUrl = "https://www.instagram.com/" + accounts[z] + "/?__a=1";

    fetch(baseUrl)
      .then(res => res.json())
      .then(out => {
        var text = document.createElement("h1");
        text.innerHTML = out.graphql.user.username.toUpperCase();
        element.appendChild(text);

        for (let i = 0; i <= document.getElementById("myRange").value - 1; i++) {
          var img = document.createElement("img");
          var linkToImage = document.createElement("a");

          linkToImage.href = "https://www.instagram.com/p/" + out.graphql.user.edge_owner_to_timeline_media.edges[i].node.shortcode + "/";
          linkToImage.setAttribute("target", "_blank");
          img.src = out.graphql.user.edge_owner_to_timeline_media.edges[i].node.display_url;
          img.style.width = "20em";
          img.style.height = "20em";

          linkToImage.appendChild(img);
          element.appendChild(linkToImage);
        }
      })
      .catch(err => {
        throw err;
      });
  }
  document.getElementById("foundImages").appendChild(element);
}
function addUser() {
  accounts.push(document.getElementById("user").value);
  document.getElementById("user").value = "";

  setCookie("name", accounts);

  updateCurrent();
}

function updateCurrent() {
  let current = "Currently watching: " + accounts;
  document.getElementById("currentUsers").innerHTML = current;
}

function clearList() {
  accounts = [];

  document.cookie.split(";").forEach(function(c) {
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });

  updateCurrent();
}

function getOldAccounts() {
  accounts = getCookie("name").split(",");
  updateCurrent();
}

// Cookies
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
