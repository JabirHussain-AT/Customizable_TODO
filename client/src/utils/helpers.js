const calculateProgress = (items) => {
    const completedItems = items.filter((item) => item.isCompleted).length;
    const totalItems = items.length;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  export  { calculateProgress }