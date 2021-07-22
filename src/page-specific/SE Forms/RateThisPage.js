function onSubmit(token) {
    if (!$("input[name='_PageRating_radiobox1_']:checked").val()) {
      alert("Please select a page rating.");
    } else {
      document.getElementById("RateThisPageForm160406").submit();
    }
  }