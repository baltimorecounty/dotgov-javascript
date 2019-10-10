import "../polyfills/includes.polyfill";
import "../polyfills/closest.polyfill"; 
 
 document.addEventListener(
  "click",
  onDocumentClick => {
    const { target } = onDocumentClick;
    if (target.className.includes("btn-info")) {
      $("#myModal").modal();
    } else {
      return;
    }
  },
  false
);
