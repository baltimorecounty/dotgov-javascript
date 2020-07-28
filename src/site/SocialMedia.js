/**
 * This handles the twitter social media button event
 * Generates an href for the current page
 */
window.twttr = (function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function (f) {
    t._e.push(f);
  };
  return t;
})(document, "script", "twitter-wjs");
twttr.ready(function (twttr) {
  // bind events here
  var twitterButton = document.getElementById("twitterButton");
  if (twitterButton) {
    twitterButton.href = twitterHref + "&url=" + window.location.href;
  }
  var facebookButton = document.getElementById("facebookButton");
  if (facebookButton) {
    facebookButton.href = facebookHref + "?u=" + window.location.href;
  }
});
