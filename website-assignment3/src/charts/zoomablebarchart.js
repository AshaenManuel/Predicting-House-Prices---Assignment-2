import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ZoomableBarChart = ({ data }) => {
  const svgRef = useRef(null);

  const width = 928;
  const height = 500;
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .style("max-width", "100%")
      .style("height", "auto");

    // Create the horizontal scale and its axis generator
    const x = d3.scaleBand()
      .domain(data.map(d => d.suburb))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);

    // Create the vertical scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)]).nice()
      .range([height - marginBottom, marginTop]);

    // Append the bars
    svg.append("g")
      .attr("class", "bars")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", d => x(d.suburb))
      .attr("y", d => y(d.price))
      .attr("height", d => y(0) - y(d.price))
      .attr("width", x.bandwidth());

    // Append the axes
    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

    svg.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    // Zoom functionality
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .translateExtent([[marginLeft, marginTop], [width - marginRight, height - marginTop]])
      .extent([[marginLeft, marginTop], [width - marginRight, height - marginTop]])
      .on("zoom", zoomed);

    svg.call(zoom);

    function zoomed(event) {
      const transform = event.transform;

      x.range([marginLeft, width - marginRight].map(d => transform.applyX(d)));

      svg.selectAll(".bars rect")
        .attr("x", d => x(d.suburb))
        .attr("width", x.bandwidth());

      svg.selectAll(".x-axis")
        .call(xAxis);
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default ZoomableBarChart;
