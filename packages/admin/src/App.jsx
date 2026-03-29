import React, { useEffect } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router';

import Forgot from './pages/forgot/index.jsx';
import Login from './pages/login/index.jsx';
import ManageComments from './pages/manage-comments/index.jsx';
import Migration from './pages/migration/index.jsx';
import Profile from './pages/profile/index.jsx';
import Register from './pages/register/index.jsx';
import User from './pages/user/index.jsx';
import { store } from './store/index.js';

const Access = (props) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token in URL and load user info
    const query = new URLSearchParams(location.search);
    const tokenFromUrl = query.get('token');
    if (tokenFromUrl && !user?.objectId) {
      window.TOKEN = tokenFromUrl;
      sessionStorage.setItem('TOKEN', tokenFromUrl);
      // Load user info with the token
      dispatch.user.loadUserInfo();
      // Remove token from URL
      const newUrl = location.pathname + location.search.replace(/[?&]token=[^&]+/, '').replace(/^&/, '?');
      window.history.replaceState({}, '', newUrl);
      return;
    }

    const meta = props.meta ?? {};
    const basename = props.basename ?? '';
    const emptyUser = !user?.objectId;

    if (emptyUser) {
      return (location.href = `${basename}/ui/login?redirect=${location.pathname.replace(basename, '')}`);
    }

    const noPermission = meta.auth ? props.meta.auth !== user.type : false;

    if (noPermission) {
      return (location.href = `${basename}/ui/profile`);
    }
  }, [user, props.meta, dispatch]);

  return user ? props.children : null;
};

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load user info on app initialization if we have a token
    dispatch.user.loadUserInfo();
  }, [dispatch]);

  const match = location.pathname.match(/(.*?)\/ui/);
  const basePath = match ? match[1] : '/';

  return (
    <Router basename={basePath}>
      <Routes>
        <Route
          path="/ui"
          exact
          element={
            <Access meta={{ auth: 'administrator' }} basename={basePath}>
              <ManageComments />
            </Access>
          }
        />
        <Route
          path="/ui/user"
          exact
          element={
            <Access meta={{ auth: 'administrator' }} basename={basePath}>
              <User />
            </Access>
          }
        />
        <Route
          path="/ui/migration"
          exact
          element={
            <Access meta={{ auth: 'administrator' }} basename={basePath}>
              <Migration />
            </Access>
          }
        />
        <Route path="/ui/login" exact element={<Login />} />
        <Route path="/ui/register" exact element={<Register />} />
        <Route path="/ui/forgot" exact element={<Forgot />} />
        <Route
          path="/ui/profile"
          exact
          element={
            <Access>
              <Profile />
            </Access>
          }
        />
      </Routes>
    </Router>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
