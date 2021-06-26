import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import List from './List';
import { cartLists } from '../../data.js';
import { ProductDetails } from './ProductDetails';

import { useSelector, useDispatch } from 'react-redux';
import {
  setSecondsLoop,
  selectCheckCounter,
  selectCartListCount,
  setCheckCounter,
  selectSecondsLoop,
} from '../../store/counterReducer';

const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem 1rem;
  outline: 1px solid red;
  #totalChecker {
    text-align: left;
    padding-left: 1rem;
  }
  #lists {
    tr:nth-of-type(odd) {
      background-color: #efefef;
    }
  }
`;

export default memo(function OrderList() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalChecker, setTotalChecker] = useState(true);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);
  const cartListLength = useSelector(selectCartListCount);
  const secondsLoop = useSelector(selectSecondsLoop);
  useEffect(() => {
    dispatch(setCheckCounter(cartListLength));
  }, []);

  useEffect(() => {
    if (checkCount !== cartListLength) {
      setTotalChecker(false);
    } else if (checkCount === cartListLength) {
      setTotalChecker(true);
    }
  }, [checkCount]);
  const onChange = () => {
    dispatch(setSecondsLoop());
    setTotalChecker(!totalChecker);
  };
  useEffect(() => {
    if (!secondsLoop) return;
    if (totalChecker) {
      dispatch(setCheckCounter(cartListLength));
    }
    if (!totalChecker && checkCount === cartListLength) {
      dispatch(setCheckCounter(0));
    }
  }, [totalChecker]);
  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>상품 내역</th>
          </tr>
          <tr>
            <th id='totalChecker'>
              <input
                type='checkbox'
                checked={totalChecker}
                onChange={onChange}
                name='all'
              />
              전체
            </th>
          </tr>
        </thead>
        <tbody id='lists'>
          {cartLists.map((data, i) => (
            <tr key={data.id}>
              <td
                id='list'
                children={
                  <List
                    data={data}
                    totalChecker={totalChecker}
                    setTotalPrice={setTotalPrice}
                    setTotalCount={setTotalCount}
                  />
                }
              />
            </tr>
          ))}
        </tbody>

        <ProductDetails totalCount={totalCount} totalPrice={totalPrice} />
      </StyledTable>
    </div>
  );
});

//     totalChecker={totalChecker}
//     setTotalChecker={setTotalChecker}
//     setTotalCount={setTotalCount}
//     setTotalPrice={setTotalPrice}
//     data={data}
//     orderNumber={i + 1}
//     orderLength={cartLists.length}

//   cartLists.length 의존성 제거
//   checkCount===check되어 있는 수
//   useEffect(() => {
//     if (checkCount === cartListLength) {
//       setTotalChecker(true);
//     } else {
//       setTotalChecker(false);
//     }
//   }, [checkCount]);
