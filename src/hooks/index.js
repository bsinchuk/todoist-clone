import { useState, useEffect } from 'react';
import { isADefaultProject } from '../helpers/index';
import { firebase } from '../firebase';
import moment from 'moment';

export const useTasks = selectedProject => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'a1b2c3');

    unsubscribe = selectedProject && !isADefaultProject(selectedProject) 
      ? (unsubscribe.where('projectId', '==', selectedProject)) 
      : selectedProject === 'TODAY'
      ? (unsubscribe.where(
        'date',
        '==',
        moment().format('DD/MM/YYYY')
      ))
      : selectedProject === 'INBOX' || selectedProject === 0
      ? (unsubscribe.where('date', '==', ''))
      : unsubscribe;
    
    unsubscribe = unsubscribe.onSnapshot(snapshot => {
      const newTasks = snapshot.docs.map(task => ({
        id: task.id,
        ...task.data()        
      }));

      setTasks(
        selectedProject === 'NEXT_7'
        ? newTasks.filter(
          task =>
            moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
            task.archived !== 'true'
        )
        : newTasks.filter(task => task.archived !== 'true')
      );
      setArchivedTasks(newTasks.filter(task => task.archived === 'true'));
    });
    return () => unsubscribe();
  }, [selectedProject]);
  return { tasks, archivedTasks };
}

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'a1b2c3')
      .orderBy('projectId')
      .get()
      .then(snapshot => {
        const allProjects = snapshot.docs.map(project => ({
          ...project.data(),
          docId: project.id
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects])

  return { projects, setProjects };
}