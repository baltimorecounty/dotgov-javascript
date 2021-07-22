function generateDate() {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var todaysDate =
    "Today is " + new Date().toLocaleDateString("en-us", options);

  document.getElementById("loop-date").innerHTML = todaysDate;
}
window.addEventListener("load", generateDate);
