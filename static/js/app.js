var bellyData
var MetaData

// Discovering the patient ID after user has clicked
function optionChanged(value){
    var patientID = value
// Find corresponding information based on selected user
    tableData = bellyData.samples.filter(d => d.id == patientID)
    tableData = tableData[0]
//Finding the 10 highest Sample Values
    var otuIds = tableData.otu_ids.slice(0,10);
    console.log(otuIds)
    var sampleValues = tableData.sample_values.slice(0,10);
    console.log(sampleValues)
    var otuLabels = tableData.otu_labels.slice(0,10)
    console.log(otuLabels);
// Reformatting y-axis and hover text
    otuLabels = otuLabels.map(d => d.replace(/;/g, ' '))
     otuIds = otuIds.map(d => `OTU ${d}`)
// Creating bar graph
    var data = [
        {
          x: sampleValues.reverse(),
          y: otuIds.reverse(),
          text: otuLabels.reverse(),
          type: 'bar',
          orientation: 'h',
          marker: {
          color: 'rgb(24,78,155)'
          }
          //colorscale: "Earth"

        }
      ];

      var layoutbar ={
        title: "Top 10 Bacteria by Sample Value",
        margin: {
          t: 30,
          l: 150,      
        }
      }
      
      Plotly.newPlot('bar', data, layoutbar);
// Creating random colors for otu_ids
colors = []
for (var i = 0; i < tableData.otu_ids.length; i++) {
    randnum1 = (Math.floor(((Math.random() * 255))));
    randnum2 = (Math.floor(((Math.random() * 255))));
    randnum3 = (Math.floor(((Math.random() * 255))))
    colors.push(`'rgb(${randnum1}, ${randnum2}, ${randnum3})'`)
   }
// Creating Bubble Chart
    var trace1 = {
        x: tableData.otu_ids,
        y: tableData.sample_values,
        text: tableData.otu_labels.map(d => d.replace(/;/g, ' ')),
        marker: {
          color: tableData.otu_ids,
          size: tableData.sample_values,
          colorscale: "Blues"
        },
        mode: 'markers'
      };
      
      var data = [trace1];
      
      var layout = {
        xaxis: {title: 'OTU ID'},
        title: 'All Bacteria by Sample Count'
      };
      
      Plotly.newPlot('bubble', data, layout);

// Completing Demographic Information

    meta = d3.select('#sample-metadata')
    meta.html('')
    metaData = bellyData.metadata.filter(d => d.id == patientID)
    metaData = metaData[0]
    Object.entries(metaData).forEach(([key,value]) => {
        meta.append('p').text(`${key} : ${value}`)
    });

  // Completing the Guage Chart

function buildGauge(wfreq) {
  // Enter the washing frequency between 0 and 180
  var level = parseFloat(wfreq) * 20;
  // Trig to calc meter point
  var degrees = 180 - level;
  var radius = 0.5;
  var radians = (degrees * Math.PI) / 180;
  var x = radius * Math.cos(radians);
  var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = "M -.0 -0.05 L .0 0.05 L ";
    var pathX = String(x);
    var space = " ";
    var pathY = String(y);
    var pathEnd = " Z";
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

var data = [
    {
      domain: { x: [0], y: [0] },
      type: 'scatter',
      title: { text: "Belly Button Scrubs Per Week" },
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Freq",
      text: level,
      hoverinfo: "text+name",
    },
    {
      values: level,
      rotation: 90,
      text: ["","8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", "","","","","","","",""],
      textinfo: "text",
      textposition: "inside",
      marker: {
          colors: [
            "rgba(255, 255, 255, 0)",
            "rgb(0,79,198)",
            "rgb(20,93,204)",
            "rgb(41,109,209)",
            "rgb(64,124,215)",
            "rgb(88,141,221)",
            "rgb(113,158,226)",
            "rgb(166,195,238)",
            "rgb(194,214,243)",
            "rgb(224,234,249)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)",
            "rgba(255, 255, 255, 0)"
          ]
      },
      labels: ["","8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", "","","","","","","","",],
      hoverinfo: "skip",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];


  var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };
  var GAUGE = document.getElementById("gauge");
  Plotly.newPlot(GAUGE, data, layout);
}
buildGauge(metaData.wfreq);

}

//Reading in json file
d3.json('./samples.json').then(function(data) {
    console.log(data);
    bellyData = data
    ids = data.metadata.map(d => d.id)
    console.log(ids)
//Adding option in dropdown menu for each patient ID
    dropdown = d3.select("#selDataset")
    ids.forEach((idnum) => {
        dropdown.append('option').text(idnum)
    });
   optionChanged(data.metadata[0].id);

  });


