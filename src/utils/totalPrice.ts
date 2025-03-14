export const calculatePrice = (
  checkIn: string,
  checkOut: string,
  price: number
): {
  nightQuantity: number;
  totalPrice: number;
  subTotalPrice: number;
  iva: number;
  ivaInDollars: number;
} => {
  if (!checkIn || !checkOut || price === undefined || price === null)
    return {
      nightQuantity: 0,
      totalPrice: 0,
      subTotalPrice: 0,
      iva: 0,
      ivaInDollars: 0,
    };

  const dateIn = new Date(checkIn);
  const dateOut = new Date(checkOut);

  if (
    isNaN(dateIn.getTime()) ||
    isNaN(dateOut.getTime()) ||
    dateOut <= dateIn
  ) {
    return {
      nightQuantity: 0,
      totalPrice: 0,
      subTotalPrice: 0,
      iva: 0,
      ivaInDollars: 0,
    };
  }

  const nightQuantity =
    (dateOut.getTime() - dateIn.getTime()) / (1000 * 60 * 60 * 24);
  const subTotalPrice = nightQuantity * price;
  const iva = 0.21; 
  const ivaInDollars = subTotalPrice * iva;
  const totalPrice = subTotalPrice + ivaInDollars; 

  return { nightQuantity, totalPrice, subTotalPrice, iva, ivaInDollars };
};
