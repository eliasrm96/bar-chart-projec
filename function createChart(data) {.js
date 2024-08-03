function createChart(data) {
    const svgWidth = 1000;
    const svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3.select("#chart").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const xScale = d3.scaleBand()
        .domain(data.data.map(d => d[0]))
        .range([0, width])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data.data, d => d[1])])
        .nice()
        .range([height, 0]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    chart.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(xAxis);

    chart.append("g")
        .attr("id", "y-axis")
        .call(yAxis);

    // Create bars
    chart.selectAll(".bar")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("x", d => xScale(d[0]))
        .attr("y", d => yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d[1]))
        .on("mouseover", function(event, d) {
            d3.select("#tooltip")
                .style("opacity", 1)
                .attr("data-date", d[0])
                .html(`${d[0]}<br>$${d[1].toFixed(2)} Billion`);
        })
        .on("mouseout", function() {
            d3.select("#tooltip").style("opacity", 0);
        });

    // Add title
    svg.append("text")
        .attr("id", "title")
        .attr("x", svgWidth / 2)
        .attr("y", margin.top / 2)
        .attr("text-anchor", "middle")
        .text("GDP by Year");

    // Add tooltip
    d3.select("#chart").append("div")
        .attr("id", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("background-color", "white")
        .style("border", "1px solid black")
        .style("padding", "5px");
}
