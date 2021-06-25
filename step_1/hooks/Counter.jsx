import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import { PatchPlus } from '@styled-icons/bootstrap/PatchPlus';
import { PatchMinus } from '@styled-icons/bootstrap/PatchMinus';
import { useSelector } from 'react-redux';
import { selectIsClickedCheckBox } from '../../store/counterReducer';

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 1rem;
  }
`;

export default memo(function Counter({
  setTotalPrice,
  setTotalCount,
  count,
  setCount,
  data,
  checker,
}) {
  const minimum = data.current_count;
  const maximum = data.stock;
  const price = data.product_price;
  const isClickedCheckBox = useSelector(selectIsClickedCheckBox);
  useEffect(() => {
    if (!checker && isClickedCheckBox) {
      console.log('price: ', price);
      console.log('count: ', count);
      setTotalCount((prev) => prev - count);
      setTotalPrice((prev) => prev - price * count);
    } else if (checker && isClickedCheckBox) {
      setTotalCount((prev) => prev + count);
      setTotalPrice((prev) => prev + price * count);
    }
  }, [checker]);
  useEffect(() => {
    setCount(minimum);
    setTotalCount((prev) => prev + minimum);
    setTotalPrice((prev) => prev + price);
  }, []);

  const plus = () => {
    if (count === maximum) return;
    setCount((prev) => prev + 1);
    setTotalCount((prev) => prev + 1);
    setTotalPrice((prev) => prev + price);
  };
  const minus = () => {
    if (count === minimum) return;
    setCount((prev) => prev - 1);
    setTotalCount((prev) => prev - 1);
    setTotalPrice((prev) => prev - price);
  };

  return (
    <CounterContainer>
      <div onClick={plus}>
        <PatchPlus size='22' />
      </div>
      <div>{count}</div>
      <div onClick={minus}>
        <PatchMinus size='22' />
      </div>
    </CounterContainer>
  );
});
