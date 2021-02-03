import React, { useState } from 'react';
import { useProjectsValue } from '../context';
import { generatePushId } from '../helpers';
import { firebase } from '../firebase';


export const AddProject = ({ shouldShow}) => {
  const [show, setShow] = useState(shouldShow);

  const { setProjects } = useProjectsValue();
  const [projectName, setProjectName] = useState('');
  const projectId = generatePushId();

  const addProject = () => {
    show && firebase
      .firestore()
      .collection('projects')
      .add({
        projectId: projectId,
        name: projectName,
        userId: 'a1b2c3'
      })
      .then(() => {
        setProjects([]);
        setProjectName('');
        setShow(false);
      });
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input"> 
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            data-testid="project-name"
            placeholder="Name Your Project"
            type="text" />     
          <button
            className="add-project__submit"
            data-testid="add-project-submit"
            type="button"
            onClick={() => addProject()}>
              Add Project
          </button>
          <span
            className="add-project__cancel"
            data-testid=""
            onClick={() => setShow(false)}>
              Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        className="add-project__text"
        data-testid="add-project-action"
        onClick={() => setShow(!show)}>
          Add Project
      </span>
    </div>
  );
}