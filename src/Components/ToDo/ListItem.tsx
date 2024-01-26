import { useState, useRef, useEffect, useContext } from 'react';
import { SettingsContext } from '../../contexts/SettingsContext';
import styled, { AnyStyledComponent } from "styled-components";
import { Checkbox, Input } from '@mui/material';
import Menu from './Menu';
import { StylesContext } from '../../contexts/StylesContext';

interface Task {
  complete: boolean
  taskText: string
  createdTime: number
  subTasks: Task[]
}

interface ListProps {
  checked: boolean;
  hasTasks: boolean;
  children: any;
  ref: any;
  key: string;
  onMouseEnter: Function;
  onMouseLeave: Function;
}

interface TaskTextProps {
  active: boolean;
  isMobile: boolean;
  isSubTask: boolean;
  value: string;
  onChange: Function;
  disabled: Boolean;
  wrap: string;
  onKeyDown: Function;
  height: string;
  ref: any;
}

interface MeatballProps {
  active: boolean;
  visible: boolean;
  isSubTask: boolean;
  onClick: Function;
}

interface SubtaskProps {
  active: boolean;
  children: any;
  onSubmit: Function;
}

const ListItemWrapper = styled.div<ListProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.hasTasks ? 'flex-start' : 'center'};
  align-items: center;
  /* width: 100%; */
  textarea {
    text-decoration: ${props => props.checked ? 'line-through' : 'none'};
  }
`

const StyledCheckbox = styled(Checkbox)`
  padding: 2px 9px;
`

const TaskWrapper = styled.div`
  display: flex;
`

const SubTaskWrapper = styled.div<{ children: any }>``

const LeftWrapper = styled.div`
  display: flex;
`

const TaskForm = styled.form<{ onSubmit: Function, ref: any, children: any }>``

const TaskText = styled.textarea<TaskTextProps>`
  font-size: ${props => props.isMobile ? (props.isSubTask ? '12px' : '11px') : (props.isSubTask ? '16px' : '18px')};
  background: none;
  resize: none;
  border: none;
  padding: 0;
  margin-top: 8px;
  &:focus-within {
    outline: none;
    box-shadow: 0 2px 2px -2px black;
  }
  min-height: ${props => props.isMobile ? '20px' : '27px'};
  height: ${props => props.height};
`

const MeatballIcon = styled.img<MeatballProps>`
  width: 20px;
  height: 38px;
  object-fit: contain;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  filter: invert(1);
  cursor: pointer;
  transition: 0.3s ease;
  transform: ${props => props.active ? 'rotate(270deg)' : 'none'};

`

const SubTaskForm = styled.form<SubtaskProps>`
  display: flex;
  height: ${props => props.active ? '40px' : '0'};
  transition: 0.3s ease;
  justify-content: flex-end;
  width: 90%;
  padding: ${props => props.active ? '5px 0' : '0'};
  overflow: hidden;
  margin-left: 15px;
`

const Arrow = styled.img<{ active: boolean }>`
  transform: scaleY(-1);
  height: 20px;
  filter: invert(1);
  display: ${props => props.active ? 'block' : 'none'};
`

const SubTaskInput = styled(Input)`
  width: 100%;
  padding: 0 5px 5px 5px;
  margin-right: 20px;
  input {
    color: white;
    font-size: 14px;
  }
`

const Separator = styled.hr`
  width: 95%;
  color: #8f8f8f;
  margin: 0;
`

const label = { inputProps: { 'aria-label': 'Checkbox' } };

const ListItem = ({ task, i, subTaskIndex, taskItems, setTaskItems, isSubTask }) => {
  const { setTasksLoading, isMobile } = useContext(SettingsContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [thisInput, setThisInput] = useState<string>(task.taskText);
  const [showSubTask, setShowSubTask] = useState<boolean>(false);
  const [subTaskInput, setSubTaskInput] = useState<string>('');

  const listItemRef: React.RefObject<HTMLDivElement> = useRef(null);
  const inputRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const formRef: React.RefObject<HTMLFormElement> = useRef(null);
  const subInputRef: React.RefObject<HTMLInputElement> = useRef(null);

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
      setShowSubTask(false);
    }
  };

  const tickTask = () => {
    const tasks: Task[] = taskItems.slice();
    if (isSubTask) {
      const subTasks = tasks[i].subTasks;
      subTasks[subTaskIndex].complete = !subTasks[subTaskIndex].complete;
      tasks[i].subTasks = subTasks;
      let allSubTasksComplete = true;
      for (let i = 0; i < subTasks.length; i++) {
        if (subTasks[i].complete == false) {
          allSubTasksComplete = false;
          break;
        }
      }
      tasks[i].complete = allSubTasksComplete;
    } else {
      tasks[i].complete = !tasks[i].complete;
      if (tasks[i].subTasks && tasks[i].complete) {
        const subTasks = tasks[i].subTasks;
        for (let i = 0; i < subTasks.length; i++) {
          subTasks[i].complete = true;
        }
        tasks[i].subTasks = subTasks;
      }
    }
    setTaskItems(tasks);
    setTasksLoading(true);
  }

  const deleteTask = () => {
    if (!isSubTask) {
      const beginning = taskItems.slice(0, i);
      const end = taskItems.slice(i + 1);
      setTaskItems([...beginning, ...end]);
    } else {
      const tasks: Task[] = taskItems.slice();
      const subTasks = tasks[i].subTasks;
      tasks[i].subTasks = [...subTasks.slice(0, subTaskIndex), ...subTasks.slice(subTaskIndex + 1)];
      setTaskItems(tasks);
    }
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
        updateTask(e);
      }
    }
  }

  const updateTask = (e) => {
    e.preventDefault();
    if (!thisInput.length) return;
    const tasks: Task[] = taskItems.slice();
    if (!isSubTask) {
      tasks[i].taskText = thisInput;
    } else {
      const subTasks = tasks[i].subTasks;
      subTasks[subTaskIndex].taskText = thisInput;
      tasks[i].subTasks = subTasks;
    }

    setTaskItems(tasks);
    setTasksLoading(true);
  }

  const addSubTask = (e) => {
    e.preventDefault();
    if (!isSubTask && subTaskInput.length) {
      const tasks: Task[] = taskItems.slice();
      const curr = tasks[i];
      const subTasks: Task[] = curr.subTasks ? curr.subTasks.slice() : [];
      subTasks.push({
        complete: false,
        taskText: subTaskInput,
        createdTime: Date.now(),
        subTasks: []
      })

      curr["subTasks"] = subTasks;
      tasks[i] = curr;
      setTaskItems(tasks);
      setActive(false);
      setTasksLoading(true);
    }
  }

  useEffect(() => {
    if (!active) {
      setShowSubTask(false);
      setSubTaskInput("");
    }
  }, [active, taskItems])

  useEffect(() => {
    if (showSubTask && subInputRef.current) {
      const input: any = subInputRef.current.children[0];
      input.focus();
    }
  }, [showSubTask])

  return (
    <ListItemWrapper
      ref={listItemRef}
      key={task.taskText}
      checked={task.complete}
      hasTasks={taskItems.length > 0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => { if (!active) setVisible(false) }}>
      <TaskWrapper>
        <SubTaskWrapper>
          <LeftWrapper>
            <StyledCheckbox
              {...label}
              color="default"
              checked={task.complete}
              onChange={tickTask} />
            <TaskForm onSubmit={updateTask} ref={formRef}>
              <TaskText
                active={active}
                isMobile={isMobile}
                isSubTask={isSubTask}
                value={thisInput}
                onChange={(e) => setThisInput(e.target.value)}
                disabled={!edit}
                wrap='hard'
                onKeyDown={onEnterPress}
                height={inputRef.current ? inputRef.current.scrollHeight.toString() + 'px' : '0'}
                ref={inputRef} />
            </TaskForm>
          </LeftWrapper>
        </SubTaskWrapper>
        <MeatballIcon src="/images/meatball-icon.png" onClick={() => { setActive(!active) }} active={active} visible={visible} isSubTask={isSubTask} />
      </TaskWrapper>
      {!isSubTask && task.subTasks && task.subTasks.length ? task.subTasks.map((child, index) => {
        return (
          <ListItem
            key={`${child.taskText}-${child.createdTime}`}
            task={child}
            i={i}
            subTaskIndex={index}
            taskItems={taskItems}
            setTaskItems={setTaskItems}
            isSubTask={true} />
        )
      }) : null}
      <SubTaskForm active={showSubTask} onSubmit={addSubTask}>
        <Arrow active={showSubTask} src="/images/angle-arrow.png" />
        <SubTaskInput
          ref={subInputRef}
          value={subTaskInput}
          onChange={(e) => setSubTaskInput(e.target.value)}
          onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
        />
      </SubTaskForm>
      <Menu active={active} setShowSubTask={setShowSubTask} deleteTask={deleteTask} setEdit={setEdit} i={i} isSubTask={isSubTask} />
      {i !== taskItems.length - 1 && !isSubTask ? <Separator /> : null}
    </ListItemWrapper>
  );
};

export default ListItem;