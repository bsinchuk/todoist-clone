import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import { Content } from "./components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from './context';

export const App = () => {
  const [darkmode, setDarkmode] = useState(false);
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="App">
          <div className={darkmode ? 'darkmode' : null}>
            <Header darkmode={darkmode} setDarkmode={setDarkmode}/>
            <Content />
          </div>
        </div>
        </ProjectsProvider>
    </SelectedProjectProvider>
  );
}

export default App;
