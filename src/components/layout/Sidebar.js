import React, { useState } from 'react';
import { Projects } from '../Projects';
import { useSelectedProjectValue } from '../../context';
import { FaChevronDown, FaRegCalendar, FaRegCalendarAlt, FaInbox } from 'react-icons/fa';

export const Sidebar = () => {
  const [active, setActive] = useState('inbox');
  const [showProjects, setShowProjects] = useState(true);
  const { setSelectedProject } = useSelectedProjectValue();

  return (
    <div className="sidebar" data-testid="sidebar">
      <ul className="sidebar__generic">
        <li 
          data-testid="inbox" 
          className={active === "inbox" ? "active inbox" : "inbox"}
          onClick={() => {
            setActive('inbox');
            setSelectedProject('INBOX');
          }}>
          <span><FaInbox /></span>
          <span>Inbox</span>
        </li>
        <li 
          data-testid="today" 
          className={active === "today" ? "active today" : "today"}
          onClick={() => {
            setActive('today');
            setSelectedProject('TODAY');
          }}>
          <span><FaRegCalendar /></span>
          <span>Today</span>
        </li>
        <li 
          data-testid="next_7" 
          className={active === "next_7" ? "active next_7" : "next_7"}
          onClick={() => {
            setActive('next_7');
            setSelectedProject('NEXT_7');
          }}>
          <span><FaRegCalendarAlt /></span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div 
        className="sidebar__middle"
        onClick={() => setShowProjects(!showProjects)}
        >
        <span>
          <FaChevronDown className={!showProjects ? "hidden-projects" : undefined}/>
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">
        { showProjects && <Projects /> }
      </ul>
    </div>
  )
}