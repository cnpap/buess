import isMobile from '@/utils/is-mobile';

import type { Notifications } from './types';

const title = 'React PWA & Shadcn';

const email = 'sia-fl@outlook.com';

const repository = 'https://github.com/sia-fl/buess';

const messages = {
  app: {
    crash: {
      title: '程序崩溃了！',
      options: {
        email: `通过这个邮箱联系作者 - ${email}`,
        reset: '点击这里重置应用程序',
      },
    },
  },
  loader: {
    fail: '未知的错误导致程序崩溃，如急需处理请通过邮箱提交 截图、文字 描述该错误信息，维护人员将尽快为您解决。',
  },
  images: {
    failed: '加载图像时出了点问题 :(',
  },
  or: '或者',
  404: '嘿，兄弟，你在找什么？',
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
