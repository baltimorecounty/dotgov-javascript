// import load from "little-loader";

// load("https://code.jquery.com/jquery-3.5.1.js", function () {
//   load(
//     "https://cdn.datatables.net/1.10.23/js/jquery.dataTables.min.js",
//     function () {
//       load(
//         "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment-with-locales.min.js",
//         function () {
//           load(
//             "https://cdn.datatables.net/plug-ins/1.10.22/sorting/datetime-moment.js",
//             window.addEventListener("load", CreateDataTable)
//           );
//         }
//       );
//     }
//   );
// });

//Any table with a class of responsive-main-table will have this run against it to create the responsive data table
const CreateDataTable = () => {
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

  $.fn.dataTable.moment("MMMM D, YYYY"); //format of the date we want to recognize for sorting https://datatables.net/blog/2014-12-18

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
