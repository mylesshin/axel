
export const capitalizeCategory = (category) => {
    const words = category.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(' ');
  };
  
  export const fixTitle = (title) => {
    const words = title.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i] === 'Mens') {
        words[i] = `Men's`;
      } else if (words[i] === '15') {
        words[i] = '15"';
      }
    }
    return words.join(' ');
  };
  