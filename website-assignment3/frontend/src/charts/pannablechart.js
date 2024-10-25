import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const PannableChart = ({ data }) => {
  const svgRefY = useRef();  // Ref for the fixed Y-axis
  const svgRefChart = useRef();  // Ref for the scrollable chart
  const containerRef = useRef(); // Ref for the container div
  const [containerWidth, setContainerWidth] = useState(800); // Initial container width

  useEffect(() => {
    // Resize handler to update containerWidth based on the screen width
    const handleResize = () => {
      const newWidth = containerRef.current.offsetWidth; // Get the container width
      setContainerWidth(newWidth);
    };

    // Initial setup
    handleResize();

    // Attach resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup the resize listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const height = 400;
    
    // Dynamically calculate the left margin based on the container width for the Y-axis label
    const margin = { top: 20, right: 30, bottom: 50, left: Math.max(containerWidth * 0.1, 60) }; 

    // Calculate bar width dynamically, ensuring a minimum width of 80px
    const barWidth = Math.max(containerWidth / Math.max(data.length, 5), 80); // Minimum bar width set to 80px
    const totalWidth = data.length * barWidth; // Total width of all bars

    // Create scales
    const x = d3.scaleBand()
      .domain(data.map(d => d.suburb))
      .range([0, totalWidth]) // Responsive x-range
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.price)]).nice()
      .range([height - margin.bottom, margin.top]);

    // Y-axis rendering
    const svgY = d3.select(svgRefY.current);
    svgY.selectAll('*').remove(); // Clear previous content
    svgY.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    // Y-axis label
    svgY.append('text')
      .attr('x', -(height / 2))  // Vertically center the Y-axis label
      .attr('y', margin.left / 4) // Adjust based on dynamic margin
      .attr('dy', '-1em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('transform', 'rotate(-90)')  // Rotate the label vertically
      .text('Price in $1,000,000');

    // Scrollable chart rendering (x-axis + bars)
    const svgChart = d3.select(svgRefChart.current);
    svgChart.selectAll('*').remove(); // Clear previous content

    // Create a group for the scrollable chart
    const chartGroup = svgChart.append('g')
      .attr('transform', `translate(0,0)`);

    // Add x-axis inside the scrollable group
    const xAxis = chartGroup.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add bars inside the scrollable group
    chartGroup.selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.suburb))
      .attr('y', d => y(d.price))
      .attr('width', x.bandwidth())
      .attr('height', d => y(0) - y(d.price))
      .attr('fill', 'steelblue');

  }, [data, containerWidth]);

  return (
    <div ref={containerRef} style={{ display: 'flex', width: '100%' }}>
      {/* Fixed Y-axis */}
      <svg ref={svgRefY} style={{ overflow: 'visible' }} width={Math.max(containerWidth * 0.1, 60)} height={400} />

      {/* Scrollable Bars and X-axis */}
      <div style={{ overflowX: 'auto', width: `${containerWidth - Math.max(containerWidth * 0.1, 60)}px` }}> {/* Scrollable container */}
        <svg ref={svgRefChart} width={data.length * Math.max(containerWidth / Math.max(data.length, 5), 80)} height={400} />
      </div>
    </div>
  );
};

export default PannableChart;
