import type { Meta } from '@storybook/react';
import { SignInForm } from './login/SignInForm';
import { AuthLayout } from '@/pages/auth/AuthLayout';
import AuthRouteTemplate from '@/routes/auth';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Page/Auth/Layout',
  component: AuthLayout,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof SignInForm>;

// noinspection JSUnusedGlobalSymbols
export default meta;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// noinspection JSUnusedGlobalSymbols
export const SignIn = AuthRouteTemplate.bind({});
(
  SignIn as unknown as {
    args: Record<string, string>;
  }
).args = {
  route: '/auth/',
};

// noinspection JSUnusedGlobalSymbols
export const SignUp = AuthRouteTemplate.bind({});
(
  SignUp as unknown as {
    args: Record<string, string>;
  }
).args = {
  route: '/auth/sign-up',
};
