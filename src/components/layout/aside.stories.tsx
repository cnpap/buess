import type { Meta } from '@storybook/react';
import RouteTemplate from '@/routes';
import Aside from '@/components/layout/aside';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Page/Main',
  component: Aside,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Aside>;

// noinspection JSUnusedGlobalSymbols
export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// noinspection JSUnusedGlobalSymbols
export const AsideByRouteHome = RouteTemplate.bind({});
(
  AsideByRouteHome as unknown as {
    args: Record<string, string>;
  }
).args = {
  route: '/main/home',
};

// noinspection JSUnusedGlobalSymbols
export const AsideByRouteData = RouteTemplate.bind({});
(
  AsideByRouteData as unknown as {
    args: Record<string, string>;
  }
).args = {
  route: '/main/data',
};
