const calculateProgress = (items) => {
    const completedItems = items.filter((item) => item.isCompleted).length;
    const totalItems = items.length;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  export  { calculateProgress }



  //function to find font size

  export const getFontSizeClass = (depth) => {
    switch (depth) {
      case 0:
        return "text-lg md:text-2xl";
      case 1:
        return "text-base md:text-xl";
      default:
        return "text-sm md:text-lg";
    }
  };
