// MainLayout.js
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Common/Sidebar'; 
import './MainLayout.css'; 

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 로그인 및 회원가입 페이지에서는 사이드바를 숨깁니다.
  const shouldShowSidebar = !(location.pathname === '/login' || location.pathname === '/signup');

  return (
    <div className="main-layout">
      {shouldShowSidebar && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
