import { useContext, useState } from 'react';
import styled from "styled-components";
import { StylesContext } from '../contexts/StylesContext';
import { Input, Checkbox } from '@mui/material';
import { SettingsContext } from '../contexts/SettingsContext';

interface Props {
  font: string;
  opacity: number
}

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
}

const Wrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: 65px;
  transition: 1s ease;
  left: ${props => props.open ? '20px' : '-250px'};
`

const ToDoWrapper = styled.div<Props>`
  border-radius: 20px;
  border-top-right-radius: 0px;
  width: 250px;
  padding: 10px;
  background-color: ${props => `rgb(0,0,0,${props.opacity / 100})`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  * {
    color: white;
  }
  font-family: ${props => props.font};
`

const Drawer = styled.div<{ opacity: number, open: boolean }>`
  position: absolute;
  top: 0;
  right: -50px;
  height: 60px;
  width: 50px;
  background-color: ${props => `rgb(0,0,0,${props.opacity / 100})`};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 10px;

  cursor: pointer;
  transition: 0.3s ease-in;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;


  &:hover {
    width: ${props => props.open ? '50px' : '60px'};
    right: ${props => props.open ? '-50px' : '-60px'};
    img {
      filter: invert(0.8);
    }
  }

  img {
    &:active {
      transform: ${props => props.open ? 'none' : 'translateY(1px)'};
    }
  }
`

const TaskIcon = styled.img<{ open: boolean }>`
  filter: invert(1);
  transform: ${props => props.open ? 'none' : 'rotate(180deg)'};
  height: 30px;
  width: 30px;

`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.h1`
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5px;
`

const ListWrapper = styled.ul<{ hasTasks: boolean }>`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.hasTasks ? 'flex-start' : 'center'};
  justify-content: flex-start;
  padding: 0;
  margin-bottom: 5px;
`

const ListItem = styled.li<{ checked: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  text-decoration: ${props => props.checked ? 'line-through' : null};
  &:hover {
    span {
      visibility: visible;
    }
  }
`

const StyledCheckbox = styled(Checkbox)`
  padding: 2px 9px 9px 9px;
`

const Delete = styled.span`
  color: #d1d1d1;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  position: absolute;
  right: 5px;
  visibility: hidden;
  padding: 5px;
  &:hover {
    color: white;
  }
  &:active {
    transform: translateY(1px);
  }
`

const Form = styled.form`
  display: flex;
  justify-content: center;
`

const StyledInput = styled(Input)`
  width: 90%;
  input {
    color: white;
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
  }

`

const ToDo = () => {
  const { opacity, selectedFont } = useContext(StylesContext);
  const { taskItems, setTaskItems, openTasks, setOpenTasks, tasksLoading, setTasksLoading } = useContext(SettingsContext);
  const [input, setInput] = useState<string>("");

  const addTask = (e) => {
    e.preventDefault();
    const temp: Task[] = taskItems.slice();
    temp.push({ complete: false, taskText: input, createdTime: Date.now() });
    setTaskItems(temp);
    setInput("");
    setTasksLoading(true);
  }

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

  const label = { inputProps: { 'aria-label': 'Checkbox' } };

  return (
    <Wrapper open={openTasks}>
      <ToDoWrapper opacity={opacity} font={selectedFont}>
        <TopWrapper>
          <Header>Task List</Header>
          <ListWrapper hasTasks={taskItems.length > 0}>
            {taskItems.length ? taskItems.map((task: Task, i) => {
              return (
                <ListItem key={task.taskText} checked={task.complete}>
                  <StyledCheckbox
                    {...label}
                    color="default"
                    checked={task.complete}
                    onChange={() => tickTask(i)}
                  />
                  {task.taskText}
                  <Delete onClick={() => deleteTask(i)}>x</Delete>
                </ListItem>
              )
            }) : <ListItem checked={false}>Let's get stuff done!</ListItem>}

          </ListWrapper>
        </TopWrapper>
        <Form onSubmit={(e) => addTask(e)}>
          <StyledInput color="primary" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add new task" />
        </Form>
      </ToDoWrapper >
      <Drawer opacity={opacity} onClick={() => { setOpenTasks(!openTasks); setTasksLoading(true) }} open={openTasks}>
        <TaskIcon src='/images/arrow.png' alt="task icon" open={openTasks} />
        Tasks
      </Drawer>
    </Wrapper>
  );
};

export default ToDo;