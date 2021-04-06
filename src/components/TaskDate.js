import React from 'react';
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa';
import moment from 'moment';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => (
  showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
      <ul className="task-date__list">
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment().format('DD/MM/YYYY'));
          }}
          data-testid="task-date-ovelay"
        >
          <span>
            <FaSpaceShuttle />
          </span>
          <span>Today</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment()
              .add(1, 'day')
              .format('DD/MM/YYYY'));
          }}
          data-testid="task-date-ovelay"
        >
          <span>
            <FaSun />
          </span>
          <span>Tommorroww</span>
        </li>
        <li
          onClick={() => {
            setShowTaskDate(false);
            setTaskDate(moment()
              .add(7, 'days')
              .format('DD/MM/YYYY'));
          }}
          data-testid="task-date-ovelay"
        >
          <span>
            <FaRegPaperPlane />
          </span>
          <span>Next Week</span>
        </li>
      </ul>
    </div>
  )
);