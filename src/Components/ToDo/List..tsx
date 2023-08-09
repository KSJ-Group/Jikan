import styled from "styled-components";
import ListItem from './ListItem';

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
}

interface Props {
  taskItems: Task[],
  setTaskItems: Function
}

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

const NoItem = styled.li`

`

const List = ({ taskItems, setTaskItems }: Props) => {
  return (
    <ListWrapper>
      {taskItems.length ? taskItems.map((task: Task, i) => {
        return (
          <ListItem key={task.taskText + i} task i taskItems setTaskItems />
        )
      }) : <NoItem>Start adding tasks below :)</NoItem>}
    </ListWrapper>
  );
};

export default List;