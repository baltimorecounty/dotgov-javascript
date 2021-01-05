require(["BcGisQuery", "jquery", "footable", "mustache"], function (
  t,
  e,
  a,
  r
) {
  var d = '<table data-filter="#filter" class="footable table">';
  (d +=
    '<thead><tr><th class="footable-first-column" data-toggle="true">Road</th><th data-toggle="true">Community</th><th data-hide="phone,tablet" data-sort-initial="true" data-name="Closed">Closed Date</th><th data-hide="phone,tablet" data-name="Between">Between</th><th data-hide="phone">Reason</th></tr></thead>'),
    (d += "<tbody>"),
    (d += "{{#.}}"),
    (d += "{{#attributes}}"),
    (d +=
      '<tr class="{{CLOSURE_ID}}"><td>{{#FIRST_STLABEL}}{{FIRST_STLABEL}}{{/FIRST_STLABEL}}</td><td>{{#FIRST_COMMUNITY}}{{FIRST_COMMUNITY}}{{/FIRST_COMMUNITY}}</td><td data-type="numeric" data-value="{{#date}}{{FIRST_ROAD_CLOSURE_DATE}}{{/date}}" class="date">{{FIRST_ROAD_CLOSURE_DATE}}</td><td>{{FIRST_INTERSECTIONLIST}}</td><td>{{FIRST_CLOSURE_TYPE}}</td></tr>'),
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
          '<tr class="{{CLOSURE_ID}}"><td>{{#CLOSED_ROAD_NAME}}{{CLOSED_ROAD_NAME}}{{/CLOSED_ROAD_NAME}}</td><td>{{#COMMUNITY}}{{COMMUNITY}}{{/COMMUNITY}}</td><td data-type="numeric" data-value="{{#date}}{{ROAD_CLOSURE_DATE}}{{/date}}" class="date">{{ROAD_CLOSURE_DATE}}</td><td>{{CROSS_ST_1}} {{#CROSS_ST_2}}& {{CROSS_ST_2}}{{/CROSS_ST_2}}</td><td>{{CLOSURE_TYPE}}</td></tr>'),
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
