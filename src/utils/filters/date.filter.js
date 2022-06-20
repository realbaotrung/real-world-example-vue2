import format from 'date-fns/format';

export const formatDate = (date) => {
  return format(new Date(date), 'MMMM D, YYYY');
};
