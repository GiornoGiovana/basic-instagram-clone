const MAX_ID = 732;

export const getRandomId = () => {
  return Math.floor(Math.random() * MAX_ID);
};
