function onSubmit(token) {
  var requiredElements = document.getElementsByClassName("seRequiredElement");
  var alertMessage = "";

  for (var i = 0; i < requiredElements.length; i++) {
    if (!requiredElements[i].value.trim()) {
      var fieldText = $("label[for='" + requiredElements[i].id + "']").text();
      fieldText = fieldText.replace(">>", "");

      alertMessage += "Please enter a value for " + fieldText + "\n";
    }
  }

  //******************************************************************
  //This is a lesson in what NOT to do when finding elements on a page
  //If SE changes the naming convention this no longer works. But I guess
  //that could happen with structure as well. Anyway we are finding the
  //groups of inputs and doing a count on how many are checked in each
  //group. If we get a count less then 1 we flag an error.
  //******************************************************************
  var Ethnicity = document.querySelectorAll(
    'input[name="fieldName16"]:checked'
  );
  var Race = document.querySelectorAll('input[name="fieldName18"]:checked');
  var Acknowledge = document.querySelectorAll(
    'input[name="fieldName17"]:checked'
  );

  if (Ethnicity.length < 1) {
    alertMessage += "Please select a value for Ethnicity" + "\n";
  }

  if (Race.length < 1) {
    alertMessage += "Please select a value for Race" + "\n";
  }

  if (Acknowledge.length < 1) {
    alertMessage += "Please select a value for Acknowledge" + "\n";
  }

  if (alertMessage === "") {
    document.getElementById("agingFMlottery").submit();
  } else {
    alert(alertMessage);
  }
}
