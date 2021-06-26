import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import styled from 'styled-components';
import ProductImage from './ProductImage';
import ProductNamePrice from './ProductNamePrice';
import { CancelBtn } from './CancelBtn';

import _, { cloneDeep } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCheckCounter,
  selectCheckCounter,
  selectProductList,
  setProductList,
} from '../../store/counterReducer';

const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.2fr minmax(15rem, auto) 0.2fr 0.1fr;
  place-items: center;
  column-gap: 0.3rem;
  padding: 1rem;
  border: 0.6px solid ${(props) => props.theme.colors.grey200};
`;

const List = ({
  passOrder,
  data,
  idx,
  setTotalCount,
  setTotalPrice,
  totalChecker,
}) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const [checker, setChecker] = useState(false);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);
  const productList = useSelector(selectProductList);
  let copyProductList = cloneDeep(productList);

  const onChange = (e) => {
    let isChecked = e.target.checked;
    setChecker(!checker);
    isChecked
      ? dispatch(setCheckCounter(checkCount + 1))
      : dispatch(setCheckCounter(checkCount - 1));

    if (!isChecked) {
      copyProductList.splice(idx, 1);
      dispatch(setProductList(copyProductList));
    } else {
      copyProductList.splice(idx, 0, data);
      dispatch(setProductList(copyProductList));
    }
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
            passOrder={passOrder}
            checker={checker}
            data={data}
            count={count}
            setTotalPrice={setTotalPrice}
            setTotalCount={setTotalCount}
            setCount={setCount}
          />
          <CancelBtn
            idx={idx}
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
