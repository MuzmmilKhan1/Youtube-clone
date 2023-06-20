import React, { useState, useEffect } from 'react';

const TimeAgo = ({ dateString }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const date = new Date(dateString);
      const currentDate = new Date();
      const timeDifference = currentDate - date;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30.436875); // Approximate average month length
      const years = Math.floor(days / 365.25); // Approximate average year length

      let timeAgo = '';
      if (years > 0) {
        timeAgo = `${years} year${years > 1 ? 's' : ''} ago`;
      } else if (months > 0) {
        timeAgo = `${months} month${months > 1 ? 's' : ''} ago`;
      } else if (days > 0) {
        timeAgo = `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        timeAgo = `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        timeAgo = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        timeAgo = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }

      setTimeAgo(timeAgo);
    };

    calculateTimeAgo();
  }, [dateString]);

  return <address style={{textAlign: "left",fontSize: "smaller"}}>{timeAgo}</address>;
};

export default TimeAgo;