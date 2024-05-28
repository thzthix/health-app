// App.js
import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';  // MainLayout 경로 확인 필요
import MainPage from './pages/MainPage';
import ExercisePage from './pages/ExercisePage';
import BoardPage from './pages/BoardPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PrivateRoute from './components/Auth/PrivateRoute'; 
import { AuthProvider } from './Contexts/AuthContext';
import RequireAuth from './components/Auth/RequireAuth';
import { ExerciseProvider } from './Contexts/ExerciseContext';
import PostPage from './pages/PostPage'; 
import PostForm from './pages/PostForm';
import { ExerciseFeedbackProvider } from './Contexts/ExcerciseFeedback';
import WebcamPage from './pages/WebcamPage';
// import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const App=()=> {

  const router=createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={
      <MainLayout />
    }>
       <Route index element={ 
        <RequireAuth>
          <MainPage/>
        </RequireAuth>
      } />
       {/* <Route index element={
               <RequireAuth>
               <Squat />
             </RequireAuth>
       } /> */}
      <Route path='/login' element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/exercise" element={<ExercisePage />} />
      <Route path="/webcam" element={<WebcamPage />} />
          <Route path="/board" element={<BoardPage />} />
          <Route path="/board/:id" element={<PostPage/>} />
          <Route path="/board/write" element={<PostForm/>} />
          <Route path="/profile" element={<ProfilePage />} />
      {/* <Route path='*' element={<NotFoundPage/>}/> */}
  
    </Route>
    ))
    
  return (
    <AuthProvider>
<ExerciseProvider>
  <ExerciseFeedbackProvider >
<RouterProvider router={router}/>
</ExerciseFeedbackProvider>
</ExerciseProvider>
</AuthProvider>
  );
}

export default App;
