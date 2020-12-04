//**********************************************************************
//Add this to the head in a script tag in the taxsearch.html page in SE
//**********************************************************************

function addToBodyTag() {
  body = document.getElementsByTagName("body")[0];
  body.setAttribute("onpageshow", "if (event.persisted) onPageShow();");
}

document.addEventListener("DOMContentLoaded", addToBodyTag);

function reloadPage(event){
    if (event.persisted) {
        window.location.reload();
      }
}

window.addEventListener("pageshow", function (event) {
  if (event.persisted) {
    window.location.reload();
  }
});
