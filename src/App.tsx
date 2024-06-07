import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRouteTemplate from '@/routes/auth';
import '@/globals.css';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <AuthRouteTemplate />
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
