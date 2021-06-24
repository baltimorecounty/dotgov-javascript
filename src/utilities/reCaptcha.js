//****************************************************************** */
//Add to Header File
function addGoogleAttributes() {
  var buttons = document.getElementsByClassName("g-recaptcha");

  var head = document.head;
  var script = document.createElement("script");
  script.src = "https://www.google.com/recaptcha/api.js";

  var legalHTML =
    "<small>This site is protected by reCAPTCHA and the Google <a href='https://policies.google.com/privacy'>Privacy Policy</a> and <a href='https://policies.google.com/terms'>Terms of Service</a> apply </small>";

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].setAttribute(
      "data-sitekey",
      "6Lc4JOEaAAAAAEPQVSlCq1hvxsjZzyTiSD3l3q2q"
    );
    buttons[i].setAttribute("data-callback", "onSubmit");
    buttons[i].setAttribute("data-action", "submit");

    var element = document.createElement("div");
    element.classList.add("grecaptcha-legaltext");
    element.innerHTML = legalHTML;

    buttons[i].parentNode.appendChild(element);
  }

  if (buttons.length > 0) {
    head.appendChild(script);
  }
}

addGoogleAttributes();
//*************************************************************** */

//*************************************************************** */
//Custom submit for the Rate this module. Each module will need a custom JS
//to reference the form name (i.e. RateThisPageForm160406) and add any form validations they need since google hijacks
//the form and blocks built in SE validations.
function onSubmit(token) {
  if (!$("input[name='_PageRating_radiobox1_']:checked").val()) {
    alert("Please select a page rating.");
  } else {
    document.getElementById("RateThisPageForm160406").submit();
  }
}
//******************************************************************* */

//********************************************************************* */
//Honey Pot - requires a hidden field with that ID to catch bots
//********************************************************************* */

(function ($) {
  $("form").submit(function () {
    if ($("#BCGSubField").val().length > 0) {
      return false;
    }
  });
})(jQuery);
