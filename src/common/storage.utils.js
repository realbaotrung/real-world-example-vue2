// ===========================================================================
// ALL LOCAL STORAGE METHODS
// ===========================================================================
export const storageItem = {
  auth: 'app/auth',
  accessToken: 'app/accessToken',
  refreshToken: 'app/refreshToken',
};

export const getItemFromLS = (itemName) => {
  const item = localStorage.getItem(itemName);
  return item ? JSON.parse(item) : null;
};

export const setItemToLS = (itemName, value) => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const removeItemFromLS = (itemName) => {
  localStorage.removeItem(itemName);
};

export default { getItemFromLS, setItemToLS, removeItemFromLS, storageItem }