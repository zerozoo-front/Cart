import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ArrowDownShort } from '@styled-icons/bootstrap/ArrowDownShort';
import { useNumberToMoney } from './useNumberToMoney';
import { deliveryTypes } from '../../data';

import { useDispatch } from 'react-redux';
import { setDelivery } from '../../store/counterReducer';

const DropdownContainer = styled.div`
  #select {
    display: flex;
    span:last-child {
      margin-left: auto;
    }
  }
  width: 60vw;
  margin-left: 1rem;
  div > ul > li {
    border: 1px solid black;
    padding: 0.5rem 0.5rem;
    margin: 0rem 0;
  }

  .items {
    border: 1px solid black;
    border-bottom: none;
    display: flex;
    padding: 0.5rem 0.5rem;
    margin: 0rem 0;

    &:first-child {
      border-top: none;
    }
    &:last-child {
      border-bottom: 1px solid black;
    }
  }
  .item:last-child {
    color: ${(props) => props.theme.colors.grey500};
    margin-left: auto;
  }
`;

export const Dropdown = () => {
  const [isDown, setIsDown] = useState(false);
  const [chosen, setChosen] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDown) return;
    const event = document.addEventListener('click', (e) => {
      if (!document.getElementById('Dropdown').contains(e.target)) {
        setIsDown(!isDown);
      }
    });
    return event;
  }, [isDown]);

  const select = (e) => {
    setIsDown(!isDown);
    if (e.target.className === 'items') {
      dispatch(setDelivery(e.target.parentNode.dataset.index));
      setChosen(e.target.innerText);
      return;
    }
    dispatch(setDelivery(e.target.parentNode.dataset.index));
    setChosen(e.target.parentNode.innerText);
  };
  return (
    <DropdownContainer>
      <div>
        <ul id='Dropdown' onClick={select}>
          <li id='select'>
            <span>{chosen === '' ? '선택해주세요.' : chosen}</span>
            <span>
              <ArrowDownShort size='18' />
            </span>
          </li>
          <div id='listDelivery'>
            {isDown &&
              deliveryTypes.map((v, i) => (
                <li className='items' data-index={i} key={v.id}>
                  <span className='item'>{v.name}</span>
                  <span className='item'>
                    {useNumberToMoney(v.delivery_price)} 원
                  </span>
                </li>
              ))}
          </div>
        </ul>
      </div>
    </DropdownContainer>
  );
};
