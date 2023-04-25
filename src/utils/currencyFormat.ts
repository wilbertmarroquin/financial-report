const currencyFormat = (value: number) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return currencyFormatter.format(value || 0);
};

export default currencyFormat;
