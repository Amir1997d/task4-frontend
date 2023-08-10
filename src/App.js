import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import AdminPage from './pages/AdminPage';
import BlockedUser from './pages/BlockedUser';

function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">Register</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/adminpage" element={<AdminPage currentUser={currentUser} />} />
          <Route path="/blocked-user" element={<BlockedUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
