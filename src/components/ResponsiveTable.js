//Any table with a class of responsive-main-table will have this run against it to create the responsive data table
const CreateDataTable = () => {
  $.fn.dataTable.moment("MMMM D, YYYY"); //format of the date we want to recognize for sorting https://datatables.net/blog/2014-12-18

  if (!$.fn.DataTable.isDataTable(".responsive-main-table")) {
    $(".responsive-main-table").DataTable({
      info: false,
      paging: false,
      bFilter: false,
      processing: true,
      searching: true,
      language: {
        searchPlaceholder: "Community or street name",
        search:
          "<b>Filter:</b> Enter a community or street name to filter this list.",
      },
      ordering: true,
      responsive: true,
      autoWidth: false,
      order: [[$(".order-by").index(), "asc"]], //this class is added to a <th> for the column we want to pre order.
      //This needs an index integer so we are finding the index of the matching column.
      //If no class is set then it defaults to 0 so first column
      columnDefs: [
        { targets: "no-sort", orderable: false }, //this class added to a <th> prevents sorting
        { targets: "hide-onload", visible: false }, //this class added to a <th> hides that column of data
      ],
    });
  }
};

window.addEventListener("load", CreateDataTable);
