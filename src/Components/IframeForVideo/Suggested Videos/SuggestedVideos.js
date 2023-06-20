import React, { useEffect, useRef } from 'react';
import { useScrollDetection } from '../../ScrollDetection/Scroll';

function SuggestedVideos() {
  const scrollContainerRef = useScrollDetection(handleScrollToBottom);

  function handleScrollToBottom() {
    console.log('Reached bottom');
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Your additional useEffect logic here

  }, []);

  return (
    <div
      className="scroll-container"
      ref={scrollContainerRef}
      style={{
        overflowY: 'scroll',
        maxHeight: '100vh',
      }}
    >
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
      <h1>Hey</h1>Hey
    </div>
  );
}

export default SuggestedVideos;