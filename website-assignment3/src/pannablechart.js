// PannableAreaChart.js
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './PannableAreaChart.css'; // Import CSS for styling

const PannableAreaChart = ({ data }) => {
  const svgRef = useRef();
  const xAxisRef = useRef();
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleBand()
      .domain(data.map(d => d.suburb))
      .range([0, width - margin.right - margin.left])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Draw bars
    svg.append("g")
      .attr("transform", `translate(${margin.left + scrollLeft}, 0)`) // Adjusted position with scrollLeft
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.suburb))
      .attr("y", d => y(d.price))
      .attr("width", x.bandwidth())
      .attr("height", d => height - margin.bottom - y(d.price))
      .attr("fill", "steelblue");

    // Create y-axis
    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));

    // Draw x-axis
    const xAxis = d3.axisBottom(x);
    d3.select(xAxisRef.current)
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis);
  }, [data, scrollLeft]);

  const handleScroll = (e) => {
    setScrollLeft(e.target.scrollLeft);
  };

  return (
    <div className="chart-container">
      <svg ref={svgRef}></svg>
      <g ref={xAxisRef}></g>
      <div className="scroll-container" onScroll={handleScroll}>
        {/* Spacer to enable scrolling */}
        <div style={{ width: `${data.length * 80}px`, height: '0' }}></div>
      </div>
    </div>
  );
};

export default PannableAreaChart;
