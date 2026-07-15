/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function AbstractShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Brand Maroon Blob (Top Right) */}
      <svg
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] opacity-[0.06] animate-float-slow text-brand-maroon"
        viewBox="0 0 200 200"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M45.5,-57.4C58.3,-47.9,67.7,-33.1,72,-16.9C76.2,-0.7,75.3,16.8,68.8,32.2C62.4,47.6,50.4,60.8,35.4,68.2C20.4,75.6,2.5,77.1,-15.1,73.5C-32.7,69.8,-49.9,61,-60.7,46.9C-71.5,32.7,-75.8,13.2,-73.8,-5C-71.8,-23.2,-63.5,-40.1,-50.2,-49.7C-37,-59.4,-18.5,-61.7,-0.4,-61.2C17.7,-60.8,35.4,-57.4,45.5,-57.4Z" transform="translate(100 100)" />
      </svg>

      {/* Brand Orange Soft Circle/Blob (Middle Left) */}
      <svg
        className="absolute top-[35%] left-[-8%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] opacity-[0.05] animate-float-medium text-brand-orange"
        viewBox="0 0 200 200"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M41.6,-56C53.7,-48.5,63.1,-35.6,67.9,-21C72.8,-6.4,73,9.8,67.9,24.6C62.8,39.4,52.2,52.7,38.6,61.4C25,70.1,8.3,74.1,-7.8,72.7C-23.9,71.2,-39.5,64.2,-51.2,53.4C-62.9,42.7,-70.7,28.2,-73.6,12.5C-76.4,-3.3,-74.3,-20.3,-66.1,-33.7C-57.9,-47.1,-43.6,-56.9,-29.2,-62.9C-14.7,-68.9,-0.1,-71,13.6,-68.5C27.3,-65.9,41.6,-56,41.6,-56Z" transform="translate(100 100)" />
      </svg>

      {/* Soft Triangle (Bottom Right) */}
      <svg
        className="absolute bottom-[5%] right-[2%] w-[250px] h-[250px] md:w-[380px] md:h-[380px] opacity-[0.04] animate-float-slow text-brand-maroon"
        viewBox="0 0 100 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 50 10 C 60 10, 85 70, 75 80 C 65 90, 35 90, 25 80 C 15 70, 40 10, 50 10 Z" />
      </svg>

      {/* Smaller Accent Circles */}
      <div className="absolute top-[15%] left-[20%] w-12 h-12 rounded-full border-2 border-brand-orange opacity-10 animate-pulse" />
      <div className="absolute bottom-[25%] left-[40%] w-16 h-16 rounded-full border-2 border-brand-maroon opacity-10 animate-bounce" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[60%] right-[15%] w-20 h-20 rounded-full bg-brand-orange opacity-5 animate-pulse" style={{ animationDuration: '6s' }} />
    </div>
  );
}
