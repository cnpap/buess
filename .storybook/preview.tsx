import type { Preview } from '@storybook/react';
import '../src/globals.css';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

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
      const { route = '/' } = c.args;
      return (
        <MemoryRouter initialEntries={[route]}>
          <Story />
        </MemoryRouter>
      );
    },
  ],

};

// noinspection JSUnusedGlobalSymbols
export default preview;
