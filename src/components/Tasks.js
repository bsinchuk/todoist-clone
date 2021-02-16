import React, { useEffect } from 'react';
import { Checkbox } from './Checkbox';
import { useTasks } from '../hooks';
import { defaultProjects } from '../constants';
import { getTitle, getDefaultTitle, isADefaultProject } from '../helpers';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { AddTask } from './AddTask';


export const Tasks = () => {
  const { projects } = useProjectsValue();
  const { selectedProject } = useSelectedProjectValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = '';

  if (projects && selectedProject && !isADefaultProject(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
    console.log('projectName 1: ', projectName);
  }

  if (selectedProject && isADefaultProject(selectedProject)) {
    projectName = getDefaultTitle(defaultProjects, selectedProject).name;
    console.log('proejctName 2: ', projectName);
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  });

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
      <AddTask />
    </div>
  );
}