import { defaultProjects } from '../constants/index';

export const isADefaultProject = project => (
  defaultProjects.find(defaultProject => defaultProject.key === project)
);