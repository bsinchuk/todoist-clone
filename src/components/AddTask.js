import React, { useState } from 'react';
import { useSelectedProjectValue } from '../context';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';

export const AddTask = (
  shouldAddTaskMain = false,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask
) => {
  const [task, setTask] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [project, setProject] = useState('');
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;

    let selectedDate = '';
    if (projectId === 'TODAY') {
      selectedDate = moment().format('DD/MM/YYYY');
    } else if (projectId === 'NEXT_7') {
      selectedDate = moment()
        .add(7, 'days')
        .format('DD/MM/YYYY');
    }
    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          task,
          date: selectedDate || taskDate,
          projectId,
          userId: 'a1b2c3'
        })
        .then(() => {
          setTask('');
          setProject('');
          setShowMain('');
          setShowProjectOverlay(false);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task-comp">
        {shouldAddTaskMain && (
          <div
            className="add-task__shallow"
            data-testid="show-ain-action"
            onClick={() => setShowMain(!showMain)}>
              <span className="add-task__plus">+</span>
              <span className="add-task__text">Add Task</span>
          </div>
        )}

        {(showMain || showQuickAddTask) && (
          <div className="add-task__main" data-testid="add-task-main">
            {showQuickAddTask && (
              <>
                <div data-testid="quick-add-task">
                  <h2 className="header">Quick add Task</h2>
                  <span
                    className="add-task__cancel-x"
                    data-testid="add-task-quick-cancel"
                    onClick={() =>{
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                    }}>
                    x
                  </span>
                </div>
              </>
            )}
            <p>Project Overlay here</p>
            <p>TaskDate here</p>
            <input
              className="add-task__content"
              data-testid="add-task-content"
              type="text"
              value={task}
              onChange={e => setTask(e.target.value)} />
            <button
              type="button"
              className="add-task__submit"
              data-testid="add-task"
              onClick={() => addTask()}
            >
              Add Task
            </button>
            {!showQuickAddTask && (
              <span
                className="add-task__cancel"
                data-testid="add-task-main-cancel"
                onClick={() => {
                  setShowMain(false);
                  setShowProjectOverlay(false)
                }}
              >
                Cancel
              </span>
            )}
            <span
              className="add-task__project"
              data-testid="show-project-overlay"
              onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            >
              <FaRegListAlt />
            </span>
            <span
              className="add-task__date"
              data-testid="show-task-date-overlay"
              onClick={() => setShowTaskDate(!showTaskDate)}
            >
              <FaRegCalendarAlt />
            </span>
          </div>
        )}
    </div>
  )
};
