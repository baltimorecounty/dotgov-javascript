import "../polyfills/includes.polyfill";
import "../polyfills/closest.polyfill";

document.addEventListener("click", function(event)  {
  if(event.target.classList.contains('dg_button')){
   $("#myModal").modal();
  }
  else{
    return;
  }
 },
 false );