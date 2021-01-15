//Any table with a class of responsive-main-table will have this run against it to create the responsive data table
const CreateDataTable = () => {
  //$.fn.dataTable.moment("MMMM D, YYYY"); //format of the date we want to recognize for sorting https://datatables.net/blog/2014-12-18

  if (!$.fn.DataTable.isDataTable(".responsive-main-table")) {
    $(".responsive-main-table").DataTable({
      info: false,
      paging: false,
      bFilter: false,
      processing: true,
      ordering: true,
      responsive: true,
      autoWidth: false,
      order: [[0, "asc"]],
      columnDefs: [
        { targets: "no-sort", orderable: false }, //this class added to a <th> prevents sorting
        { targets: "hide-onload", visible: false }, //this class added to a <th> hides that column of data
      ],
    });
  }
};

// function dynamicallyLoadScriptDateTimeMoment() {
//   var tid = setInterval(LoadMoment, 2000);

//   function abortTimer() {

//     clearInterval(tid);
//   }
//   console.log(new Date.parse());
//   if (window.moment) {
//     function LoadMoment() {
//       var head = document.head;
//       var script = document.createElement("script");
//       script.src =
//         "https://cdn.datatables.net/plug-ins/1.10.22/sorting/datetime-moment.js";

//       head.appendChild(script);
//       abortTimer();
//     }
//   }
// }

window.addEventListener("load", CreateDataTable);
