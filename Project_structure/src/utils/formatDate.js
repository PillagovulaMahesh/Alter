// src/utils/formatDate.js

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  
  // Using toLocaleString to format the date in a readable format
  return date.toLocaleString('en-US', options);
};

export default formatDate;
