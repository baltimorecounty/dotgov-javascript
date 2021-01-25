// This is the javascript that must be included on the Contact=>AnEmployee=>index.html file in order for phone directory to work.
// This is currently house in the phonedirectoty2.js file in SE and references inside of the header on index.html
var jQuery = $.noConflict(true);
var pageCount = 0;

function __onPrevPage() {
  setNextPrevious(-1);
}

function __onNextPage() {
  setNextPrevious(1);
}

function setNextPrevious(offset) {
  var currentPageNum = 0;
  for (var i = 1; i <= pageCount; i++) {
    if (document.getElementById("Page" + i).style.display == "block") {
      currentPageNum = i;
    }
  }
  var newPageNum = currentPageNum + offset;
  document.getElementById("Page" + currentPageNum).style.display = "none";
  document.getElementById("Page" + newPageNum).style.display = "block";

  jQuery("#Next").toggle(newPageNum < pageCount);
  jQuery("#Previous").toggle(newPageNum > 1);
}

function validateForm() {
  var firstName = jQuery("#txtFirst")
    .val()
    .trim();
  var lastName = jQuery("#txtLast")
    .val()
    .trim();
  var department = jQuery("#ddlAgency").val();

  var alert = jQuery("#dg_Alert-Holder");
  var alerMessage = jQuery("#dg_Alert-Message");

  if (firstName == "" && lastName == "" && department == "0") {
    alert.show();
    alerMessage.html(
      "When searching All Departments, you must enter at least one letter of the last name or one letter of the first name."
    );
    return false;
  } else {
    alert.hide();
  }
  return true;
}

jQuery(document).ready(function() {
  jQuery.support.cors = true; // force cross-site scripting (as of jQuery 1.5)

  jQuery("#btnSubmit").click(function(submitEvent) {
    console.log("inside submit click ");
    submitEvent.preventDefault();

    //Hide next previous button incase they were visible from a previous search
    jQuery("#Next,#Previous").hide();
    if (validateForm()) {
      console.log("validation complete");
      //  jQuery("#output").text("");
      dataString =
        jQuery(this)
          .closest("form")
          .serialize() +
        "&formId=" +
        jQuery(this)
          .closest("form")
          .attr("id");

      jQuery.ajax({
        url:
          "https://testservices.baltimorecountymd.gov/api/hub/phoneDirectory/ProcessPhoneDirSearchForm",
        data: dataString,
        type: "GET",
        dataType: "jsonp",
        jsonpCallback: "formatJsonpResult",
        success: function(result, status, xhr) {
          result =  [{ "Name":"Smith, Scott","Telephone":"410-887-4399","Department":"Information Technology" },
          {"Name":"Smith, Kristy","Telephone":"410-887-2410","Department":"Budget and Finance"} ,
          {"Name":"Smith, Bob","Telephone":"410-887-3804","Department":"Recreation and Parks"} ,
          {"Name":"Smith, Tonya","Telephone":"410-887-3603","Department":"Health"}] ;
        
        },
        error: function(xhr, status, error) {
          console.log(
            "Result: " +
              status +
              " " +
              error +
              " " +
              xhr.status +
              " " +
              xhr.statusText
          );
        }
      });

      //==============================================
      // if (!jQuery.fn.DataTable.isDataTable("#BACO_table1")) {
      //   console.log('---true----');
      //   jQuery("#BACO_table1").DataTable({
      //     processing: true,
      //     serverSide: true,
      //     ajax: {
      //       url:
      //         "https://testservices.baltimorecountymd.gov/api/hub/phoneDirectory/ProcessPhoneDirSearchForm",
      //       dataType: "jsonp",
      //       jsonpCallback: "formatJsonpResult"
      //     }
      //   });
      // }
      //============================================================
      // jQuery.ajax({
      //   url:
      //     "https://testservices.baltimorecountymd.gov/api/hub/phoneDirectory/ProcessPhoneDirSearchForm",
      //   //url:
      //   //"https://services.baltimorecountymd.gov/api/hub/phoneDirectory/ProcessPhoneDirSearchForm", When copying out to prod this must be uncommented and the test services entry removed
      //   data: dataString,
      //   type: "GET",
      //   dataType: "jsonp",
      //   jsonpCallback: "formatJsonpResult"
      // });
      console.log("After -- jqueryajax ---call()");
    } //end of if ValidForm
  });

  jQuery("#btnClear").click(function(clearEvent) {
    clearEvent.preventDefault();
    jQuery("#dg_Alert-Holder").hide();
    jQuery("#Next,#Previous").hide();
    jQuery("#BACO_table,#prevNext,#output center").hide();
    jQuery("#txtLast,#txtFirst").val("");
    jQuery("#ddlAgency").val("0");
  });
});

window.formatJsonpResult = function(jsonpResult) {
  jsonpResult =[{ "Name":"Smith, Scott","Telephone":"410-887-4399","Department":"Information Technology" },
                {"Name":"Smith, Kristy","Telephone":"410-887-2410","Department":"Budget and Finance"} ,
                {"Name":"Smith, Bob","Telephone":"410-887-3804","Department":"Recreation and Parks"} ,
                {"Name":"Smith, Tonya","Telephone":"410-887-3603","Department":"Health"}] ;
//};
  // if (jsonpResult.ResponseError.length > 0 && jsonpResult.ResponseStatus == 0) {
  //   console.log("jsonpResult.ResponseError.length > 0");
  //   console.log("result.length:" + JSON.stringify(jsonpResult));
  //   jsonpResult.ResponseError = jsonpResult.ResponseError.replace(
  //     "Agency",
  //     "Department"
  //   );
  //  jQuery("#output").append(jsonpResult.ResponseError);

    //this element is actually being returned as part of the JSON Result
    // if (document.getElementById("page_count")) {
    //   pageCount = document.getElementById("page_count").value;
    // }

  //   if (pageCount > 1) {
  //     jQuery("#Next").show();
  //   }
  // } else if (
  //   jsonpResult.ResponseError.length == 0 &&
  //   jsonpResult.ResponseStatus == 0
  // ) {
  //   jQuery("#output").append(
  //     "<div><div class='list-header'><p>No records found matching your search criteria</p></div><div class='list'></div></div>"
  //   );
  // } else 
 // if (jsonpResult.ResponseError.length > 0 && jsonpResult.ResponseStatus < 0)
 //  {
   // jQuery("#output").append("<font color='red'><center>Error: " + jsonpResult.ResponseError + "</center></font>");
  // }

   jQuery("#BACO_table1").DataTable({
    searching: false,
    paging: false,
    data: jsonpResult,
    columns: [
      { data: "Name" },
      { data: "Telephone" },
      { data: "Department" }
    ],
    pageLength: 3
  });
//}
 // jQuery("#output").append(jsonpResult.ResponseError);
  jQuery("#BACO_table,#prevNext").show();
  //}
};
