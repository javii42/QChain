
const since = {
    year: 2021,
    month: 5,
    day: 8
  };
  
  const currentDate = {
    year: 2021,
    month: 12,
    day: 12
  };
  
  const to = {
    year: 2022,
    month: 9,
    day: 4
  };
  
  if (
    (currentDate.year === since.year &&
      currentDate.month === since.month &&
      currentDate.day >= since.day) ||
    currentDate.year > since.year
  ) {
    if (
      (currentDate.year === to.year &&
        currentDate.month === to.month &&
        currentDate.day <= to.day) ||
      currentDate.year < to.year ||
      (currentDate.year === to.year && currentDate.month < to.month)
    ) {
      console.log("between javiss");
      console.log("between javiss");
    }
  }