//Any table with an ID of responsive-main-table will have this run against it to create the responsive data table
const CreateDataTable = () => {
  if (!$.fn.DataTable.isDataTable(".responsive-main-table")) {
    $(".responsive-main-table").DataTable({
      info: false,
      paging: false,
      bFilter: false,
      processing: true,
      ordering: true,
      responsive: true,
      autoWidth: false,
      order: [[1, "asc"]],
    });
  }
  CheckForBlankHeader();
};

const CheckForBlankHeader = () => {
  $(".responsive-main-table th").each(function (index) {
    var Header = $(this);
    if (!Header.text()) {
      Header.removeClass("sorting").addClass("sorting_disabled");
    }
  });
};

window.addEventListener("load", CreateDataTable);
