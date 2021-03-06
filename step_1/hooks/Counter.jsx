import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import { PatchPlus } from '@styled-icons/bootstrap/PatchPlus';
import { PatchMinus } from '@styled-icons/bootstrap/PatchMinus';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectProductCount,
  selectIsOrder,
  setProductCount,
  setIsOrder,
} from '../../store/counterReducer';

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 0 1rem;
  }
`;

export default memo(function Counter({
  passOrder,
  setTotalPrice,
  setTotalCount,
  count,
  setCount,
  data,
  checker,
}) {
  const productCount = useSelector(selectProductCount);
  const isOrder = useSelector(selectIsOrder);
  const minimum = data.current_count;
  const maximum = data.stock;
  const price = data.product_price;
  const dispatch = useDispatch();
  useEffect(() => {
    setCount(minimum);
    setTotalCount((prev) => prev + minimum);
    setTotalPrice((prev) => prev + price);
  }, []);

  useEffect(() => {
    if (passOrder) {
      console.log('pass', passOrder);
      dispatch(setProductCount({ data, count }));
      dispatch(setIsOrder());
    }
  }, [passOrder]);

  useEffect(() => {
    if (!checker) {
      setTotalCount((prev) => prev - 1);
      setTotalPrice((prev) => prev - price);
    } else {
      setTotalCount((prev) => prev + 1);
      setTotalPrice((prev) => prev + price);
    }
  }, [checker]);

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
      <div>
        <PatchPlus onClick={plus} size='22' />
      </div>
      <div>{count}</div>
      <div>
        <PatchMinus onClick={minus} size='22' />
      </div>
    </CounterContainer>
  );
});
