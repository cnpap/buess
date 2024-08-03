import { ComponentType, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClerkProvider } from '@clerk/clerk-react';
import NiceModal from '@ebay/nice-modal-react';
import { VITE_CLERK_PUBLISHABLE_KEY } from '@/const';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

function render(App: ComponentType) {
  root.render(
    <StrictMode>
      <NiceModal.Provider>
        <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY} afterSignOutUrl="/auth">
          <TooltipProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
              <HelmetProvider>
                <App />
              </HelmetProvider>
            </ThemeProvider>
          </TooltipProvider>
        </ClerkProvider>
      </NiceModal.Provider>
    </StrictMode>,
  );
}

export default render;
