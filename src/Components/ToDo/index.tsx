import { useContext, useState } from 'react';
import styled from "styled-components";
import { StylesContext } from '../../contexts/StylesContext';
import { Input } from '@mui/material';
import { SettingsContext } from '../../contexts/SettingsContext';
import ListItem from './ListItem';

interface Props {
  font: string;
  opacity: number
}

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
  subTasks: Task[]
}

const wrapperWidth = 300;

const Wrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: 70px;
  transition: 1s ease;
  left: ${props => props.open ? '16px' : `-${wrapperWidth}px`};
`

const ToDoWrapper = styled.div<Props>`
  border-radius: 20px;
  border-top-right-radius: 0px;
  width: ${wrapperWidth + 'px'};
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


const ListWrapper = styled.ul`
  width: 100%;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin-bottom: 5px;
`

const NoItem = styled.li<{ isMobile: boolean }>`
  font-size: ${props => props.isMobile ? '12px' : '18px'};
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

const TaskIcon = styled.img<{ open: boolean, isMobile: boolean }>`
  filter: invert(1);
  transform: ${props => props.open ? 'none' : 'rotate(180deg)'};
  height: ${props => props.isMobile ? '20px' : '30px'};
  width: ${props => props.isMobile ? '20px' : '30px'};
`

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Header = styled.h1<{ isMobile: boolean }>`
  font-size: ${props => props.isMobile ? '12px' : '18px'};
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 5px;
`

const Form = styled.form`
  display: flex;
  justify-content: center;
`

const StyledInput = styled(Input)`
  width: 90%;
  input {
    color: white;
    font-size: 18px;
    @media screen and (max-width: 450px) {
      font-size: 12px;
    }
    ::placeholder {
      color: white;
      opacity: 0.5;
    }
  }
`

const ToDo = () => {
  const { opacity, selectedFont } = useContext(StylesContext);
  const { taskItems, setTaskItems, openTasks, setOpenTasks, setTasksLoading, isMobile } = useContext(SettingsContext);
  const [input, setInput] = useState<string>("");

  const addTask = (e) => {
    e.preventDefault();
    const temp: Task[] = taskItems.slice();
    temp.push({ complete: false, taskText: input, createdTime: Date.now(), subTasks: [] });
    setTaskItems(temp);
    setInput("");
    setTasksLoading(true);
  }

  const openDrawer = () => {
    setOpenTasks(!openTasks);
    setTasksLoading(true);
  }

  const options: any = { weekday: 'short', month: 'long', day: 'numeric' };
  const today = new Date();

  return (
    <Wrapper open={openTasks}>
      <ToDoWrapper opacity={opacity} font={selectedFont}>
        <TopWrapper>
          <Header isMobile={isMobile}>{today.toLocaleDateString("en-US", options)}</Header>
          <ListWrapper>
            {taskItems.length ? taskItems.map((task: Task, i) => {
              return (
                <ListItem key={task.taskText + i} task={task} i={i} subTaskIndex={null} taskItems={taskItems} setTaskItems={setTaskItems} isSubTask={false} />
              )
            }) : <NoItem isMobile={isMobile}>Add tasks below</NoItem>}
          </ListWrapper>
        </TopWrapper>
        <Form onSubmit={(e) => addTask(e)}>
          <StyledInput color="primary" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter task here.." />
        </Form>
      </ToDoWrapper >
      <Drawer opacity={opacity} onClick={openDrawer} open={openTasks}>
        <TaskIcon isMobile={isMobile} src='/images/arrow.png' alt="task icon" open={openTasks} />
        Tasks
      </Drawer>
    </Wrapper>
  );
};

export default ToDo;