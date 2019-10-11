import "../polyfills/includes.polyfill";
import "../polyfills/closest.polyfill";

var btn = document.getElementById("myBtn");
btn.onclick = function() {
  $("#myModal").modal();
};
