function onSubmit(token) {
  var requiredElements = document.getElementsByClassName("seRequiredElement");
  var alertMessage = "";

  for (var i = 0; i < requiredElements.length; i++) {
    if (!requiredElements[i].value.trim()) {
      var fieldText = $("label[for='" + requiredElements[i].id + "']").text();

      alertMessage += "Please enter a value for " + fieldText + "\n";
    }
  }

  if (alertMessage === "") {
    document.getElementById("disabilitiesnomination").submit();
  } else {
    alert(alertMessage);
  }
}
