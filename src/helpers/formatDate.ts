export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

export const formatDateYyyyMmDd = (dateString: string) => {
  const [day, month, year] = dateString.split('/');

  // Asegurarse de que el día y el mes tengan dos dígitos
  const formattedDay = day.length === 1 ? `0${day}` : day;
  const formattedMonth = month.length === 1 ? `0${month}` : month;

  // Formatear la fecha en el formato deseado
  return `${year}-${formattedMonth}-${formattedDay}`;
};

export const initDate = () => {
  const dateParts = new Date().toLocaleDateString('es-EC').split('/');
  const yearUpdate = Number(dateParts[2]) + 1;
  dateParts[2] = yearUpdate.toString();
  //console.log(dateParts.join('/'));
  return dateParts.join('/');
}

export const fechaLiberacionChange = (fecha: string) => {
  const dateParts = fecha.split('/');
  const yearUpdate = Number(dateParts[2]) + 1;
  dateParts[2] = yearUpdate.toString();
  const dateUpdate = dateParts.join('/');
  return dateUpdate;
}