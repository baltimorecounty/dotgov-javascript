//Any table with an ID of responsive-main-table will have this run against it to create the responsive data table
const applyDataTable = () => {
  var $responsiveTable = $("#responsive-main-table");
  $responsiveTable.DataTable({
    info: false,
    paging: false,
    bFilter: false,
    processing: true,
    ordering: true,
    responsive: true,
    autoWidth: false,
    order: [[1, "asc"]],
    columnDefs: [
      {
        targets: 0,
        orderable: false,
      },
    ],
  });
};

//Hides any columns without header text. These headers are typically image or icon headers and not needed for the responsive table.
const HideHeaders = () => {
  var $responsiveTable = $("#responsive-main-table").DataTable({
    info: false,
    paging: false,
    bFilter: false,
    processing: true,
    ordering: true,
    responsive: true,
    autoWidth: false,
    order: [[1, "asc"]],
    columnDefs: [
      {
        targets: 0,
        orderable: false,
      },
    ],
  });
  var columns = $responsiveTable.columns().count();
  var w = window.innerWidth;

  for (i = 0; i < columns; i++) {
    var header = $responsiveTable.column(i).header();
    if (header.innerHTML === "") {
      $responsiveTable.column(i).visible(w > 767);
    }
  }
};

document.addEventListener("DOMContentLoaded", applyDataTable);

//trigger upon pageload
document.addEventListener("DOMContentLoaded", HideHeaders);

//trigger upon screen resize
window.addEventListener("resize", HideHeaders);
