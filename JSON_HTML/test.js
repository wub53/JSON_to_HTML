var form = document.getElementById("1")

form.addEventListener('submit',event=>{
    event.preventDefault()
    alert("The form has been submittedS")
    
})

console.log(d3)
// parsing using jQuery
$.getJSON("test.json", (data) => {
    
    document.getElementById("label1").innerHTML = data.quiz1.question1.content
})

const data = [
    { name: 'John', score: 80 },
    { name: 'Simon', score: 38 },
    { name: 'Samantha', score: 90 },
    { name: 'Patrick', score: 50 },
    { name: 'Mary', score: 35 },
    { name: 'Christina', score: 75 },
    { name: 'Michael', score: 65 },
  ];
  
  const width = 900;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()        //maps discrete input to continuous output (pixles)
    .domain(d3.range(data.length))  // goes from 0 - data.length - 1
    .range([margin.left, width - margin.right])  // length of the x axis  "so bandwidth = range / domain"
    .padding(0.1)   // 10% of the width of each band will be used as padding between the bands.
  
  const y = d3.scaleLinear()  // maps continuous input (numbers) to continuous output (pixels)
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])
  
  svg 
    .append("g")
    .attr("fill", 'green')
    .selectAll("rect") 
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")                                             // this uses .enter() in the background to create new rects from the starting empty selection that .selectAll() gave us  so that we can bind the data to it
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      //.attr('title', (d) => d.score)
      //.attr("class", "rect")
      .attr("height", d => y(0) - y(d.score))
      .attr("width", x.bandwidth());
  
  // 'g' element generator on yAxis
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`) // this makes sure the bars are not overlapped and are placed sequentially with some gap between them
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();