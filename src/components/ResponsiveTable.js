//Any table with an ID of responsive-main-table will have this run against it to create the responsive data table
const CreateDataTable = () => {
  if (!$.fn.DataTable.isDataTable("#responsive-main-table")) {
    $("#responsive-main-table").DataTable({
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
  }
};

window.addEventListener("load", CreateDataTable);
