// Sort the data by Greek search results
var sortedData = data.sort((firstNum, lastNum) => lastNum.greekSearchResults-firstNum.greekSearchResults)
console.log(sortedData)

// Slice the first 10 objects for plotting
var finalData = sortedData.slice(0,10);
console.log(finalData);

// Reverse the array to accommodate Plotly's defaults
dataToPlot = finalData.reverse();
console.log(dataToPlot);

// Trace1 for the Greek Data
var trace1 = {
    x: dataToPlot.map(d => d.greekSearchResults),
    y: dataToPlot.map(d => d.greekName),
    type: 'bar',
    orientation: 'h'
  };

// data
trace1 = [trace1];
// layout
var layout = {
    title: "Greek God Search Results"
};
// Render the plot to the div tag with id "plot"
Plotly.newPlot('plot', trace1, layout);
