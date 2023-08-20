import React from 'react';
import styled from "styled-components";

interface Props {
  active: boolean
  setShowSubTask: Function
  deleteTask: Function
  setEdit: Function
  i: number
  isSubTask: boolean
}

const EditWrapper = styled.div<{ active: boolean, isSubTask: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px;
  height: ${props => props.active ? (props.isSubTask ? '30px' : '40px') : '0'};
  transition: 0.3s ease;
  background-color: #00000043;
  overflow: hidden;
  width: 95%;
  &:hover {
    color: white;
  }
`

const Button = styled.img<{ isSubTask: boolean }>`
  width: ${props => props.isSubTask ? '35px' : '40px'};
  height: ${props => props.isSubTask ? '35px' : '40px'};
  padding: 5px;
  filter: invert(1);
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    filter: invert(0.8);
  }
  &:active {
    transform: translateY(1px);
  }
  &:first-child {
    width: 35px;
    height: 35px;
  }
`;

const Menu = ({ active, setShowSubTask, deleteTask, setEdit, i, isSubTask }: Props) => {
  return (
    <EditWrapper active={active} isSubTask={isSubTask}>
      {!isSubTask ? <Button isSubTask={isSubTask} src="/images/add.png" onClick={() => setShowSubTask(prev => !prev)} /> : null}
      <Button isSubTask={isSubTask} src="/images/edit.png" onClick={() => setEdit(true)} />
      <Button isSubTask={isSubTask} src="/images/trash.png" onClick={() => deleteTask()} />
    </EditWrapper>
  );
};

export default Menu;