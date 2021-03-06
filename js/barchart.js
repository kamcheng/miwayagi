// barchart
var skills = [
      {subject: 'HTML', years: 7},
      {subject: 'CSS', years: 7},
      {subject: 'Photoshop', years: 7},
      {subject: 'javascript', years: 2.5},
      {subject: 'wordpress', years: 2},
      {subject: 'd3.js', years: .5}]
var bardata = [];
var subject = [];

for(var i=0; i<skills.length; i++){
  subject.push(skills[i].subject);
  bardata.push(skills[i].years);
}

bardata.sort(function compareNumbers(a,b) {
    return b - a;
});

var margin = {top: 30, right: 30, bottom: 40, left: 100}

var height = 300 - margin.top - margin.bottom,
    width = 500 - margin.left - margin.right,
    barOffset = 5,
    barHeight = Math.floor(height / bardata.length) - barOffset;

var colors = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range(['#9ecae1', '#3182bd'])

var xScale = d3.scale.linear()
      .domain([0, d3.max(bardata)])
      .range([0, width]);

var yScale = d3.scale.ordinal()
      .domain(d3.range(0, bardata.length))
      .rangeBands([0, height])

var tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('padding', '10px')
      .style('background', '#FFF')
      .style('opacity', 0)

var myChart = d3.select('#chart-skills').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.right + ')')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', colors)
      .attr('width', 0)
      .attr('x', 0)
      .attr('height', barHeight)
      .attr('y', function(d, i) {
          return i * (barHeight + barOffset);
      })

    .on('mouseover', function(d){
      tooltip.transition()
        .style('opacity', .9)

      tooltip.html(d)
        .style('left', (d3.event.pageX + 30) + 'px')
        .style('top', (d3.event.pageY) + 'px')

      d3.select(this)
        .style('opacity', .5)
    })

    .on('mouseout', function(d){
      tooltip.transition()
        .style('opacity', 0)

      d3.select(this)
        .style('opacity', 1)
    })

myChart.transition()
    .attr('width', function(d) {
        return xScale(d);
    })
    .delay(function(d, i){
      return i * 100;
    })

// left side axis
var vGuideScale = d3.scale.linear()
    .domain([0, bardata.length])
    .range([0, height])

var vAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .tickFormat(function(d){
        return subject[d];
      })

var vGuide = d3.select('svg').append('g')
    vAxis(vGuide)
    vGuide.attr('transform', 'translate(' + margin.left + ', ' +  margin.top + ')')
      .classed('v-guide', true)
      .selectAll('path')
      .style({ fill: 'none', stroke: "none"})
      .selectAll('line')
      .style({ stroke: "#000"})

// bottom axis
var hGuideScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([0, width])
var hAxisTickArray = [];
    for(var i = 0; i <= d3.max(bardata); i++){
      hAxisTickArray.push(i);
    }
var hAxis = d3.svg.axis()
    .scale(hGuideScale)
    .orient('bottom')
    .tickValues(hAxisTickArray)

var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
      .classed('h-guide', true)
      .selectAll('path')
      .style({ fill: 'none', stroke: "#000"})
      .selectAll('line')
      .style({ stroke: "#000"})
