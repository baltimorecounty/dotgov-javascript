//*********************************************************************************
//This is the js file added to the other page that builds the responsive table
// Need these includes on header of the html page
  {/* <script src="https://code.jquery.com/jquery-3.5.1.js"></script>

<script type="text/javascript"  src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" async src ="https://cdn.datatables.net/responsive/2.2.6/js/dataTables.responsive.min.js"></script>
<link rel="stylesheet" href="https://cdn.datatables.net/1.10.22/css/jquery.dataTables.min.css"></link>
<link rel="stylesheet"  href="https://cdn.datatables.net/responsive/2.2.6/css/responsive.dataTables.min.css"></link>
<script src="https://kit.fontawesome.com/2475edd293.js"></script> */}
//*********************************************************************************


(function ($) {
 
  $(document).ready(function () {
  
    var $responsiveTable = $("#responsive-main-table");

    /*Intialize the DataTable Plugin*/
    if ($responsiveTable.DataTable)
      $responsiveTable.DataTable({
        info: false,
        paging: false,
        bFilter: false,
        processing: true,
        responsive:true,
        autoWidth: false,
        bJQueryUI: true,
          order: [[1, "asc"]],
          columnDefs: [
            {
              targets: 0,
              orderable: false,
            },
          ],
       
  });
});
})(jQuery);


onpageshow="if (event.persisted) onPageShow();"