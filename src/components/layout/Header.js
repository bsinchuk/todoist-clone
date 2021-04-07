import React, { useState } from 'react';
import { AddTask } from '../AddTask';
import { FaPizzaSlice } from 'react-icons/fa';

export const Header = ({ darkmode, setDarkmode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className="header" data-testid="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todoist logo"/>
        </div>
        <div className="settings">
          <ul>
            <li 
              data-testid="quick-add-task-action" 
              className="settings__add"
              onClick={() => {
                setShowQuickAddTask(true);
                setShouldShowMain(true);
              }}
            >
                +
            </li>
            <li data-testid="dark-mode-action"
                className="settings__dark-mode"
                onClick={() => setDarkmode(!darkmode)}
            >
                  <FaPizzaSlice />
            </li>
          </ul>
        </div>
      </nav>
      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );

}