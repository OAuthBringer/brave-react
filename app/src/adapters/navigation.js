export const adaptToDisplay = (respData = {}) => {
  if (!respData) return [];

  return Object.entries(respData).map(([key, value]) => ({
    name: key,
    url: value,
  }));
};
