import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from './List';
import { cartLists } from '../../data.js';

import { useSelector, useDispatch } from 'react-redux';
import {
  setSecondsLoop,
  selectCheckCounter,
  selectCartListCount,
} from '../../store/counterReducer';

const StyledContainer = styled.div``;
const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 1rem 1rem;
  outline: 1px solid red;
  #lists {
    tr:nth-of-type(odd) {
      background-color: #efefef;
    }
    td {
      width: 20rem;
      line-height: 5rem;
    }
  }
`;

export default function OrderList() {
  const [totalCount, setTotalCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalChecker, setTotalChecker] = useState(true);
  const dispatch = useDispatch();
  const checkCount = useSelector(selectCheckCounter);

  const numberCommaInjector = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const checkOnChange = () => {
    setTotalChecker(!totalChecker);
    dispatch(setSecondsLoop());
  };
  //   cartLists.length 의존성 제거
  //   checkCount===check되어 있는 수
  useEffect(() => {
    if (checkCount === cartLists.length) {
      setTotalChecker(true);
    } else {
      setTotalChecker(false);
    }
  }, [checkCount]);
  return (
    <StyledContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>상품 내역</th>
          </tr>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={totalChecker}
                onChange={checkOnChange}
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
                children={
                  <List
                    totalChecker={totalChecker}
                    setTotalChecker={setTotalChecker}
                    setTotalCount={setTotalCount}
                    setTotalPrice={setTotalPrice}
                    data={data}
                    orderNumber={i + 1}
                    orderLength={cartLists.length}
                  />
                }
              />
            </tr>
          ))}
        </tbody>
        <colgroup>
          <col />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>상품 내역</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span>총 상품 수량</span>
              <span>{totalCount}</span>
            </td>
            <td>
              <span>총 상품 금액</span>
              <span>{numberCommaInjector(totalPrice)}원</span>
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
}
