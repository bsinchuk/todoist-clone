import React, { useState } from 'react';
import { useProjectsValue, useSelectedProjectValue } from '../context';
import { IndividualProject } from './IndividualProject';

export const Projects = ({activeValue = null}) => {
  const [active, setActive] = useState(activeValue);
  const { projects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  return (
    projects &&
    projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId ?
          'active sidebar__project' :
          'sidebar__project'
        }
        onClick={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}
        onKeyDown={() => {
          setActive(project.projectId);
          setSelectedProject(project.projectId);
        }}>
          <IndividualProject project={project} />
      </li>
    ))
  );
};