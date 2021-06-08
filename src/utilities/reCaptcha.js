function addGoogleAttributes() {
  var buttons = document.getElementsByClassName("g-recaptcha");
  var head = document.head;
  var script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute(
      "data-sitekey",
      "6Lc4JOEaAAAAAEPQVSlCq1hvxsjZzyTiSD3l3q2q"
    );
    buttons[i].setAttribute("data-callback", "onSubmit");
    buttons[i].setAttribute("data-action", "submit");
  }

  if (buttons.length > 0) {
    head.appendChild(script);
  }
}

function onSubmit(token) {
  document.getElementById("root").submit();
}

addGoogleAttributes();
