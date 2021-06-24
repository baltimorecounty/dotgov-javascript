import load from "little-loader";

var scriptDatetimeMoment =
  "https://cdn.datatables.net/plug-ins/1.10.22/sorting/datetime-moment.js";
var scriptDatatables =
  "https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.min.js";
var scriptMoment = "https://momentjs.com/downloads/moment.min.js";
var scriptJqueryDataTables =
  "https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js";

load(scriptJqueryDataTables, function () {
  load(scriptDatatables, function () {
    load(scriptMoment, function () {
      load(scriptDatetimeMoment, function () {
        document.addEventListener("readystatechange", function () {
          if (document.readyState === "complete") {
            CreateTable();
          } else {
          }
        });
      });
    });
  });
});

//Any table with a class of responsive-main-table will have this run against it to create the responsive data table
//window.onload = new (function CreateDataTable() {
function CreateTable() {
  //Windows variables that change the appearance of the datatable. If this doesn't exist then we default the values.
  const isSearchable = window.responsivetable
    ? window.responsivetable.isSearchable
    : false;
  const searchText = window.responsivetable
    ? window.responsivetable.searchText
    : "";
  const placeHolderText = window.responsivetable
    ? window.responsivetable.placeHolderText
    : "";

  //format of the date we want to recognize for sorting https://datatables.net/blog/2014-12-18
  $.fn.dataTable.moment("MMMM D, YYYY");
  $.fn.dataTable.moment("MM/DD/YYYY");

  if (!$.fn.DataTable.isDataTable(".responsive-main-table")) {
    $(".responsive-main-table").DataTable({
      info: false,
      paging: false,
      bFilter: false,
      processing: true,
      searching: isSearchable,
      language: {
        searchPlaceholder: placeHolderText,
        search: searchText,
      },
      ordering: true,
      responsive: true,
      autoWidth: false,
      order: [
        $(".order-by-asc").index() !== -1
          ? [$(".order-by-asc").index(), "asc"]
          : [
              $(".order-by").index() === -1 ? 0 : $(".order-by").index(),
              "desc",
            ],
      ], //this class is added to a <th> for the column we want to pre order.
      //This needs an index integer so we are finding the index of the matching column.
      //If no class is set then it defaults to 0 so first column
      columnDefs: [
        { targets: "no-sort", orderable: false }, //this class added to a <th> prevents sorting
        { targets: "hide-onload", visible: false }, //this class added to a <th> hides that column of data
      ],
    });
  }
}
