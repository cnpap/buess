import { Fragment, useLayoutEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouteTemplate from '@/routes';
import '@/globals.css';
import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import { useTheme } from './components/theme-provider';
import { useHotkeys } from 'react-hotkeys-hook';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useMount } from 'ahooks';
import Hello from '@/components/hello.svelte';

export function useToggleEvent() {
  const { setTheme, theme } = useTheme();
  useHotkeys('alt+t', () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    // 通过发送事件来切换主题
    const newTheme = theme === 'light' ? 'dark' : 'light';
    const channel = new BroadcastChannel('theme-change');
    channel.postMessage(newTheme);
  });

  useMount(() => {
    const channel = new BroadcastChannel('theme-change');
    channel.onmessage = (e) => {
      setTheme(e.data);
    };
  });
}

function App() {
  useToggleEvent();
  const svelteRef = useRef();
  useLayoutEffect(() => {
    while (svelteRef.current?.firstChild) {
      svelteRef.current?.firstChild?.remove();
    }
    new Hello({
      target: svelteRef.current,
    });
  }, []);
  return (
    <Fragment>
      <BrowserRouter>
        <div ref={svelteRef}></div>
        <RouteTemplate />
      </BrowserRouter>
      <ToastContainer />
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
