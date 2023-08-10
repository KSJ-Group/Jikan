import { useState, useRef, useEffect, useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import styled from "styled-components";
import { Checkbox } from '@mui/material';

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
}


const ListItemWrapper = styled.div<{ checked: boolean, hasTasks: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.hasTasks ? 'flex-start' : 'center'};
  width: 100%;
  textarea {
    text-decoration: ${props => props.checked ? 'line-through' : null};
  }
`

const StyledCheckbox = styled(Checkbox)`
  padding: 2px 9px 9px 9px;
`

const TaskWrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TaskForm = styled.form``

const TaskText = styled.textarea<{ active: boolean, height: string }>`
  background: none;
  resize: none;
  border: none;
  padding: 0;
  margin-top: 5px;
  &:focus-within {
    outline: none;
    box-shadow: 0 2px 2px -2px black;
  }
  height: ${props => props.height + 'px'};
`

const EditWrapper = styled.div<{ active: boolean }>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 10px;
  height: ${props => props.active ? '40px' : '0'};
  transition: 0.3s ease;
  background-color: #00000043;
  overflow: hidden;
  &:hover {
    color: white;
  }
`

const MeatballIcon = styled.img<{ active: boolean, visible: boolean }>`
  width: 20px;
  height: 100%;
  object-fit: contain;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  filter: invert(1);
  cursor: pointer;
  transition: 0.3s ease;
  transform: ${props => props.active ? 'rotate(270deg)' : 'none'};
`

const Button = styled.img`
  width: 40px;
  height: 40px;
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
`;

const ListItem = ({ task, i, taskItems, setTaskItems }) => {
  const { setTasksLoading } = useContext(SettingsContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [thisInput, setThisInput] = useState<string>(task.taskText);
  const listItemRef: React.RefObject<HTMLDivElement> = useRef(null);
  const inputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const label = { inputProps: { 'aria-label': 'Checkbox' } };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (listItemRef.current && !listItemRef.current.contains(e.target)) {
      setActive(false);
      setEdit(false);
    }
  };

  const tickTask = (index) => {
    const temp: Task[] = taskItems.slice();
    temp[index] = {
      complete: !temp[index].complete,
      taskText: temp[index].taskText,
      createdTime: temp[index].createdTime
    }
    setTaskItems(temp);
    setTasksLoading(true);
  }

  const deleteTask = (index) => {
    const beginning = taskItems.slice(0, index);
    const end = taskItems.slice(index + 1);
    setTaskItems([...beginning, ...end]);
    setTasksLoading(true);
  }

  useEffect(() => {
    if (edit) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [edit]);

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      if (formRef.current) {
        e.preventDefault();
        updateTask(e, i);
      }
    }
  }

  const updateTask = (e, i) => {
    e.preventDefault();
    const temp = taskItems.slice();
    temp[i] = {
      taskText: thisInput,
      completed: temp.completed,
      createdTime: temp.createdTime
    }
    setTaskItems(temp);
    setTasksLoading(true);
  }

  return (
    <ListItemWrapper
      ref={listItemRef}
      key={task.taskText}
      checked={task.complete}
      hasTasks={taskItems.length > 0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => { if (!active) setVisible(false) }}>
      <TaskWrapper active={active}>
        <LeftWrapper>
          <StyledCheckbox
            {...label}
            color="default"
            checked={task.complete}
            onChange={() => tickTask(i)} />
          <TaskForm onSubmit={(e) => updateTask(e, i)} ref={formRef}>
            <TaskText
              active={active}
              value={thisInput}
              onChange={(e) => setThisInput(e.target.value)}
              disabled={!edit}
              wrap='hard'
              onKeyDown={(e) => onEnterPress(e)}
              height={inputRef.current ? inputRef.current.scrollHeight.toString() : '0'}
              ref={inputRef} />
          </TaskForm>
        </LeftWrapper>
        <MeatballIcon src="/images/meatball-icon.png" onClick={() => { setActive(!active) }} active={active} visible={visible} />
      </TaskWrapper>
      <EditWrapper active={active}>
        <Button src="/images/edit.png" onClick={() => setEdit(true)} />
        <Button src="/images/trash.png" onClick={() => deleteTask(i)} />
      </EditWrapper>
    </ListItemWrapper>
  );
};

export default ListItem;