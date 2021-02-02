import { defaultProjects } from '../constants/index';

export const getTitle = (projects, projectId) => (
  projects.find(project => project.projectId === projectId)
)

export const getDefaultTitle = (projects, key) => (
  projects.find(project => project.key === key)
)

export const isADefaultProject = project => (
  defaultProjects.find(defaultProject => defaultProject.key === project)
);