// ===========================================================================
// ALL LOCAL STORAGE METHODS
// ===========================================================================
export const storageItem = {
  ID_TOKEN_KEY: 'id_token',
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

export default {getItemFromLS, setItemToLS, removeItemFromLS, storageItem};
