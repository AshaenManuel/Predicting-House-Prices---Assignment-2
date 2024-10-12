import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Box } from '@mui/material'; // Import Box from MUI

const BarChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 60, left: 50 }; // Adjust margins for labels

    svg.attr("width", width).attr("height", height);

    // Create x scale
    const x = d3.scaleBand()
      .domain(data.map(d => d.suburb))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    // Create y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Create bars
    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.suburb))
      .attr("y", d => y(d.price))
      .attr("height", d => y(0) - y(d.price))
      .attr("width", x.bandwidth());

    // Create x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Create y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Add axis labels
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 4)
      .attr("text-anchor", "middle")
      .text("Suburb");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 3)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Price in $1,000,000");
  }, [data]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <svg ref={svgRef} />
    </Box>
  );
};

export default BarChart;
