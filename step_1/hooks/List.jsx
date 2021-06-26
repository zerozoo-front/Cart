import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import styled from 'styled-components';
import ProductImage from './ProductImage';
import ProductNamePrice from './ProductNamePrice';
import { CancelBtn } from './CancelBtn';

import { useSelector, useDispatch } from 'react-redux';
import {
  setCheckCounter,
  selectCheckCounter,
  selectSecondsLoop,
  selectCartListCount,
  setIsClickedCheckBox,
} from '../../store/counterReducer';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.2fr minmax(15rem, auto) 0.2fr 0.1fr;
  place-items: center;
  column-gap: 0.3rem;
  padding: 1rem;
  border: 0.6px solid ${(props) => props.theme.colors.grey200};
`;

const List = ({ data, setTotalCount, setTotalPrice, totalChecker }) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checker, setChecker] = useState(false);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);

  const onChange = (e) => {
    let isChecked = e.target.checked;
    setChecker(!checker);
    dispatch(setIsClickedCheckBox());
    isChecked
      ? dispatch(setCheckCounter(checkCount + 1))
      : dispatch(setCheckCounter(checkCount - 1));
  };

  // react total checker
  useEffect(() => {
    if (totalChecker) {
      setChecker(true);
    }
    if (checkCount === 4 && !totalChecker) {
      setChecker(false);
    }
  }, [totalChecker]);
  // totalChecker=>Checker

  return (
    <>
      {!isDeleted ? (
        <ListContainer>
          <input
            onChange={onChange}
            checked={checker}
            type='checkbox'
            name={data.id + 'chkBox'}
          />
          <ProductImage data={data} />
          <ProductNamePrice data={data} />
          <Counter
            checker={checker}
            data={data}
            count={count}
            setTotalPrice={setTotalPrice}
            setTotalCount={setTotalCount}
            setCount={setCount}
          />
          <CancelBtn
            data={data}
            setTotalCount={setTotalCount}
            setTotalPrice={setTotalPrice}
            setCount={setCount}
          />
        </ListContainer>
      ) : null}
    </>
  );
};
export default memo(List);
