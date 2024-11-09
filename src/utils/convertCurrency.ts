export function convertCurrency(number: number) {
  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);

  return currency;
}
