import { formatDateYyyyMmDd, initDate, fechaLiberacionChange } from '../../helpers/formatDate'; // Asegúrate de importar correctamente las funciones

describe('formatDateYyyyMmDd function', () => {
  it('formats date correctly', () => {
    const formattedDate = formatDateYyyyMmDd('01/05/2024');
    expect(formattedDate).toBe('2024-05-01');
  });

  it('ensures day and month have two digits', () => {
    const formattedDate = formatDateYyyyMmDd('5/5/2024');
    expect(formattedDate).toBe('2024-05-05');
  });
});

describe('initDate function', () => {
  it('returns the next year in correct format', () => {
    jest.spyOn(global.Date, 'now').mockReturnValue(2024);

    const nextYearDate = initDate();
    expect(nextYearDate.split('/')[2]).toBe('2025');
  });
});

describe('fechaLiberacionChange function', () => {
  it('updates year correctly', () => {
    const updatedDate = fechaLiberacionChange('01/05/2024');
    expect(updatedDate).toBe('01/05/2025');
  });

  it('handles single-digit month and day correctly', () => {
    const updatedDate = fechaLiberacionChange('1/1/2024');
    expect(updatedDate).toBe('1/1/2025');
  });
});