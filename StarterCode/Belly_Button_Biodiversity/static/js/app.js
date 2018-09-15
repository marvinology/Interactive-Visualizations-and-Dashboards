//margin and radius
var margin = {top: 20, right: 20, bottom: 20, left: 20},
  width = 500 - margin.right - margin.left,
  height = 500 - margin.top - margin.bottom
  radius = width/2;

//arc generato
var arc = d3.arc()
    .outterRadius(radius -10)
    .innerRadius(0);

var pie = d3.pie()
  .sort(null)
  .value(function(d) {return d.count;});

// Set the width of the graph
var width = parseInt(d3.select("#scatter").style("width"));

// Set the height of the graph
var height = width - width / 3.9;

//define svg
var svg = d3.select()
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

//import datas
d3.csv("belly_button_data.csv", function(error, data) {
  d3.csv("belly_button_metadata.csv", function(error2,data2) {
    if (error) throw error;

    //parse data
    data.forEach(function(d) {
      d.count = +d.count;
      d.belly = d.belly;
    });

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    //apend g elements for arc
    g.append("path")
      .attr("d", arc)
      .style("fill","blue")

    //append path of arc
    g.append("path")
      .attr("d",arc)
      .style("fill","blue")

  });
});


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
