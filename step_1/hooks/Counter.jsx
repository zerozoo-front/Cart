import React, { useEffect, useState } from 'react';
import { cartLists } from '../../data.js';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { PatchPlus } from '@styled-icons/bootstrap/PatchPlus';
import { PatchMinus } from '@styled-icons/bootstrap/PatchMinus';
import { selectCounter, setCounter } from '../../store/counterReducer';

const CounterContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10rem;
  div {
    margin: 0 1rem;
  }
`;

export default function Counter({ input }) {
  const count = useSelector(selectCounter);
  const minimum = cartLists[0].current_count;
  const maximum = cartLists[0].stock;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCounter(cartLists[0].current_count));
  }, []);
  const plus = () => {
    if (maximum === count) return;
    dispatch(setCounter(count + 1));
  };
  const minus = () => {
    if (count === minimum) return;
    dispatch(setCounter(count - 1));
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
}
