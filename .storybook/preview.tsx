import type { Preview } from '@storybook/react';
import '../src/globals.css'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, c) => {
      return (
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      )
    }
  ]

};

// noinspection JSUnusedGlobalSymbols
export default preview;
