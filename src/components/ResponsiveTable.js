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

// function dynamicallyLoadScript(callback) {
//   // Adding the script tag to the head as suggested before
//   var head = document.head;
//   var script1 = document.createElement("script"); // create a script DOM node
//   script1.src =
//     "https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"; // set its src to the provided URL

//   var script2 = document.createElement("script"); // create a script DOM node
//   script2.src =
//     "https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.min.js"; // set its src to the provided URL

//   // Then bind the event to the callback function.
//   // There are several events for cross browser compatibility.
//   script1.onreadystatechange = callback;
//   script1.onload = callback;

//   script2.onreadystatechange = callback;
//   script2.onload = callback;

//   // Fire the loading
//   head.appendChild(script1);
//   head.appendChild(script2);
// }

// //loadScript(CreateDataTable());

window.addEventListener("load", CreateDataTable);
