import React from 'react';

export const useNumberToMoney = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
