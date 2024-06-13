import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRouteTemplate from '@/routes/auth';
import '@/globals.css';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import { useTheme } from './components/theme-provider';
import { useHotkeys } from 'react-hotkeys-hook';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export function useToggleEvent() {
  const { setTheme, theme } = useTheme();
  useHotkeys('alt+t', () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });
}

function App() {
  useToggleEvent();
  return (
    <Fragment>
      <BrowserRouter>
        <AuthRouteTemplate />
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
