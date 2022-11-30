export function formatDate(inputDate: Date) {
  let date = String(inputDate.getDate());
  let month = String(inputDate.getMonth() + 1);
  const year = inputDate.getFullYear();

  date = date.padStart(2, '0');

  month = month.padStart(2, '0');

  return `${date}/${month}/${year}`;
}
