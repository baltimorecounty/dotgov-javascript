require(["BcGisQuery", "jquery", "footable", "mustache"], function (
  t,
  e,
  a,
  r
) {
  var d = '<table id="responsive-main-table" class="table">';
  (d +=
    "<thead><tr><th>Road</th><th>Community</th><th>Closed Date</th><th>Between</th><th>Reason</th></tr></thead>"),
    (d += "<tbody>"),
    (d += "{{#.}}"),
    (d += "{{#attributes}}"),
    (d +=
      "<tr><td>{{#FIRST_STLABEL}}{{FIRST_STLABEL}}{{/FIRST_STLABEL}}</td><td>{{#FIRST_COMMUNITY}}{{FIRST_COMMUNITY}}{{/FIRST_COMMUNITY}}</td><td>{{FIRST_ROAD_CLOSURE_DATE}}</td><td>{{FIRST_INTERSECTIONLIST}}</td><td>{{FIRST_CLOSURE_TYPE}}</td></tr>"),
    (d += "{{/attributes}}"),
    (d += "{{/.}}"),
    (d += "</tbody>"),
    (d += "</table>"),
    (d += "{{^.}}"),
    (d +=
      "<p>There are no major road closures reported at the current time</p>"),
    (d += "{{/.}}"),
    new t({
      outfields: [
        "CLOSURE_ID",
        "FIRST_ROAD_CLOSURE_DATE",
        "FIRST_CLOSURE_TYPE",
        "FIRST_STLABEL",
        "FIRST_INTERSECTIONLIST",
        "FIRST_COMMUNITY",
      ],
      resultsContainer: "results",
      serviceUrl:
        "https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Apps/RoadClosureProd/MapServer/0",
      template: d,
    }).Show(function () {
      var a = "{{#.}}";
      (a += "{{#attributes}}"),
        (a +=
          "<tr><td>{{#CLOSED_ROAD_NAME}}{{CLOSED_ROAD_NAME}}{{/CLOSED_ROAD_NAME}}</td><td>{{#COMMUNITY}}{{COMMUNITY}}{{/COMMUNITY}}</td><td>{{ROAD_CLOSURE_DATE}}</td><td>{{CROSS_ST_1}} {{#CROSS_ST_2}}& {{CROSS_ST_2}}{{/CROSS_ST_2}}</td><td>{{CLOSURE_TYPE}}</td></tr>"),
        (a += "{{/attributes}}"),
        (a += "{{/.}}"),
        new t({
          outfields: [
            "CLOSURE_ID",
            "ROAD_CLOSURE_DATE",
            "CLOSURE_TYPE ",
            "CLOSED_ROAD_NAME ",
            "CROSS_ST_1",
            "CROSS_ST_2",
            "COMMUNITY",
          ],
          resultsContainer: "unmapped-results",
          serviceUrl:
            "https://bcgis.baltimorecountymd.gov/arcgis/rest/services/Apps/RoadClosureProd/MapServer/3",
          template: a,
        }).GetResults(function (t) {
          if (t.length) {
            var d = r.render(a, t);
            e(".results table").append(d);
          }
          e(".footable").footable();
        });
    });
});
