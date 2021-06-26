import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import List from './List';
import { cartLists } from '../../data.js';
import { ProductDetails } from './ProductDetails';
import { Dropdown } from './Dropdown';

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
  #emptyCart {
    text-align: center;
  }
  #totalChecker {
    text-align: left;
    padding-left: 1rem;
  }
  #lists {
    tr:nth-of-type(odd) {
      background-color: #efefef;
    }
  }

  #lastBorder {
    padding-bottom: 1.8rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey400};
  }
`;
const Boundary = styled.div`
  margin: 2rem 1rem;
  width: 36.5rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey400};
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
      {cartListLength === 0 ? (
        <div>
          <StyledTable>
            <thead>
              <tr id='emptyCart'>
                <td>
                  <h2>선택하신 물건이 없습니다. 🌹</h2>
                </td>
              </tr>
            </thead>
          </StyledTable>
          <Dropdown />
          <Boundary />
          <ProductDetails totalCount={totalCount} totalPrice={totalPrice} />
        </div>
      ) : (
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
          </StyledTable>
          <Dropdown />
          <Boundary />
          <ProductDetails totalCount={totalCount} totalPrice={totalPrice} />
        </div>
      )}
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
