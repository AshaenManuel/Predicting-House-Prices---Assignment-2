import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './scatterplot.css';

const BrushableScatterPlot = ({ data }) => {
  const svgRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    // Function to update dimensions based on the parent container
    const updateDimensions = () => {
      const width = svgRef.current.parentElement.getBoundingClientRect().width;
      const height = (width / 6) * 3; // Maintain aspect ratio
      setDimensions({ width, height });
    };

    updateDimensions(); // Initial call to set dimensions
    window.addEventListener('resize', updateDimensions); // Update dimensions on window resize

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const { width, height } = dimensions;
    const margin = { top: 20, right: 50, bottom: 60, left: 60 };

    svg.attr("width", width).attr("height", height);

    // Create scales
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)]) // Set domain for price
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([800, d3.max(data, d => d.educationScore)]) // Set domain for education score
      .range([height - margin.bottom, margin.top]);

    // Create scatter points
    svg.append("g")
      .selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", d => x(d.price))
      .attr("cy", d => y(d.educationScore))
      .attr("r", 5)
      .attr("fill", "steelblue");

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
      .text("Average Price in $1,000,000");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left / 5)
      .attr("x", -height / 2)
      .attr("text-anchor", "middle")
      .text("Average Education Score");

    // Implement brushing
    const brush = d3.brush()
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]])
      .on("brush end", brushed);

    svg.append("g").call(brush);

    function brushed(event) {
      if (!event.selection) return; // If no selection, return
      const [[x0, y0], [x1, y1]] = event.selection;

      // Update points based on brush selection
      svg.selectAll("circle")
        .classed("selected", d => {
          const xPos = x(d.price);
          const yPos = y(d.educationScore);
          return x0 <= xPos && xPos <= x1 && y0 <= yPos && yPos <= y1;
        });
    }

  }, [data, dimensions]);

  return (
    <svg ref={svgRef} />
  );
};

export default BrushableScatterPlot;
