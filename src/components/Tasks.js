import React from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks/index';

export const Tasks = () => {
  const projectName = '1';
  const { tasks } = useTasks(projectName);
  console.log(tasks);

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map(task => (
          <li key={`${task.id}`} >
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>
    </div>
  );

}