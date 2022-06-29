function onSubmit() {
  var requiredElementstext = document.querySelectorAll(
    'input[type="text"].seRequiredElement'
  );
  var requiredElementsCheckbox = document.querySelectorAll(
    'input[type="checkbox"].seRequiredElement'
  );
  var requiredElementsRadio = document.querySelectorAll(
    'input[type="radio"].seRequiredElement'
  );

  var alertMessage = "";

  for (var i = 0; i < requiredElementstext.length; i++) {
    if (!requiredElementstext[i].value.trim()) {
      var fieldText = $(
        "label[for='" + requiredElementstext[i].id + "']"
      ).text();
      fieldText = fieldText.replace(">>", "");

      alertMessage += "Please enter a value for " + fieldText + "\n";
    }
  }

  alertMessage += checkButtonInputs(requiredElementsCheckbox);
  alertMessage += checkButtonInputs(requiredElementsRadio);

  if (alertMessage === "") {
    document.getElementById("agingFMlottery").submit(); //This ID must match the name of the form or else an alert will not display
  } else {
    alert(alertMessage);
  }
}

//This function picks through an input set and determines if anything has been selected. If so then we ignore it. If not then we add an alert message to select an option.
function checkButtonInputs(buttonSet) {
  var dict = {};
  buttonSet.forEach((obj) => {
    dict[obj.name] = (dict[obj.name] || []).concat([obj]);
  });

  var group = Object.keys(dict).map((k) => dict[k]);

  var alertMessage = "";

  for (var i = 0; i < group.length; i++) {
    var count = group[i].filter(function (item) {
      return item.checked;
    }).length;

    if (count === 0) {
      var labelElement = document.getElementById(group[i][0].id);

      var ParentDiv = labelElement.closest(".SEAFWrapper");
      var ChildLabel = ParentDiv.querySelector("div.seLabelCell");
      var fieldText = ChildLabel.innerHTML;
      fieldText = fieldText.split("<")[0];
      alertMessage += "Please select a value for " + fieldText + "\n";
    }
  }
  return alertMessage ? alertMessage : "";
}
