import React, { useState, memo, useEffect } from 'react';
import Counter from './Counter';
import { Cancel } from '@styled-icons/material-outlined/Cancel';
import styled from 'styled-components';

const ListContainer = styled.div`
  display: flex;
  align-items: center;
`;

const List = ({ setTotalCount, data, setTotalPrice }) => {
  const [count, setCount] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteList = () => {
    setTotalCount((prev) => prev - count);
    setTotalPrice((prev) => prev - data.product_price * count);
    setIsDeleted(true);
  };

  return (
    <>
      {!isDeleted ? (
        <ListContainer>
          <Counter
            data={data}
            count={count}
            setTotalCount={setTotalCount}
            setCount={setCount}
            setTotalPrice={setTotalPrice}
          />
          <Cancel onClick={deleteList} size='25' />
        </ListContainer>
      ) : null}
    </>
  );
};
export default List;
