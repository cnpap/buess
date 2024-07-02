import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LogtoConfig, LogtoProvider } from '@logto/react';
import { VITE_LOGTO_APP_ID, VITE_LOGTO_SERVE, VITE_RESOURCE_BUESS } from '@/const';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
const config: LogtoConfig = {
  endpoint: VITE_LOGTO_SERVE,
  appId: VITE_LOGTO_APP_ID,
  resources: [VITE_RESOURCE_BUESS],
  scopes: [],
};

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <LogtoProvider config={config}>
        <TooltipProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ThemeProvider>
        </TooltipProvider>
      </LogtoProvider>
    </StrictMode>,
  );
}

export default render;
