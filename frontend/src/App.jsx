import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { appRoutes } from './routes.js';
import RootPage from './pages/RootPage.js';
import LoginForm from './pages/LoginForm.js';
import SignUpForm from './pages/SignUpForm.js';
import PageNotFound from './pages/PageNotFound.js';
import Header from './components/Header.jsx';

const App = () => (
  <BrowserRouter>
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path={appRoutes.rootPage} element={<RootPage />} />
          <Route path={appRoutes.loginForm} element={<LoginForm />} />
          <Route path={appRoutes.signUpForm} element={<SignUpForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  </BrowserRouter>
);

export default App;
