(function () {
  var filterDepartments = function (changeEvent) {
    var filterValue = changeEvent.target.value || "";
    var $filterRows = $(".filter-table-container").find("table > tbody > tr");

    $filterRows.show();

    if (filterValue) {
      $filterRows.each(function () {
        var $row = $(this);
        var departmentName = $row.find(".dg_department-name").text() || "";
        if (
          departmentName.toLowerCase().indexOf(filterValue.toLowerCase()) === -1
        ) {
          $row.hide();
        }
      });
    }

    var hasNoVisibleRecords =
      $(".filter-table-container").find("table > tbody > tr:visible").length ===
      0;

    // Show no results message
    $("#filter-list-no-results").toggle(hasNoVisibleRecords);

    // Hide the table when there are not results
    $(".filter-table-container")
      .find("table thead")
      .toggle(!hasNoVisibleRecords);
  };

  $(document).on("input", ".department-list-filter", filterDepartments);
})();
