import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'React PWA & Shadcn';

const email = 'sia-fl@outlook.com';

const repository = 'https://github.com/sia-fl/buess';

const messages = {
  app: {
    crash: {
      title: 'The app has crashed!',
      options: {
        email: `Contact the author through this email - ${email}`,
        reset: 'Click here to reset the application',
      },
    },
  },
  loader: {
    fail: 'An unknown error caused the app to crash. If urgent, please submit a screenshot and description of the error via email. Our maintenance team will resolve it as soon as possible.',
  },
  images: {
    failed: 'Something went wrong while loading the image :(',
  },
  or: 'or',
  404: 'Hey buddy, what are you looking for?',
};

const dateFormat = 'MMMM DD, YYYY';

const notifications: Notifications = {
  options: {
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    autoHideDuration: 6000,
  },
  maxSnack: isMobile ? 3 : 4,
};

const loader = {
  // no more blinking in your app
  delay: 300, // if your asynchronous process is finished during 300 milliseconds you will not see the loader at all
  minimumLoading: 700, // but if it appears, it will stay for at least 700 milliseconds
};

const defaultMetaTags = {
  image: '/cover.png',
  description: 'Starter kit for modern web applications',
};
const giphy404 = 'https://giphy.com/embed/xTiN0L7EW5trfOvEk0';

export {
  loader,
  notifications,
  dateFormat,
  messages,
  repository,
  email,
  title,
  defaultMetaTags,
  giphy404,
};
