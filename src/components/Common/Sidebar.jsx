// Sidebar.js 업데이트
import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaDumbbell, FaComments, FaCog } from 'react-icons/fa';
import { GiRunningShoe } from 'react-icons/gi';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        {isOpen && (
          <div className="logo">
            <GiRunningShoe size="2em" /><span>Health</span> {/* 로고 크기 조정 */}
          </div>
        )}
        <FaBars onClick={toggleSidebar} className="hamburger-icon" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <FaHome size="1.5em" />
            {isOpen && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/exercise">
            <FaDumbbell size="1.5em" />
            {isOpen && <span>Exercise</span>}
          </Link>
        </li>
        <li>
          <Link to="/board">
            <FaComments size="1.5em" />
            {isOpen && <span>Community</span>}
          </Link>
        </li>
        {/* 설정 메뉴를 ul 태그 밖으로 이동하여 별도로 처리 */}
      </ul>
      {/* 설정 메뉴를 별도의 섹션으로 분리하여 아래에 위치하도록 함 */}
      <div className="settings">
        <Link to="/profile">
          <FaCog size="1.5em" />
          {isOpen && <span>Settings</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
