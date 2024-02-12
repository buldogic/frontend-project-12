const apiPath = '/api/v1';

const appRoutes = {
  rootPage: '/',
  loginForm: '/login',
  signUpForm: '/signup',
};

const apiRoutes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  signUpPath: () => [apiPath, 'signup'].join('/'),
};

export { apiRoutes, appRoutes };
