import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import AutoForm from '@/components/ui/auto-form';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'email 是必填的',
    })
    .describe('邮箱')
    .email({
      message: 'email 格式不正确',
    }),
  password: z
    .string({
      required_error: 'password 是必填的',
    })
    .describe('密码')
    .min(8, {
      message: '密码 至少 8 个字符',
    })
    .max(30, {
      message: '密码 最多 30 个字符',
    }),
});

export function SignInForm() {

  return (
    <>
      <div className="grid gap-4">
        <AutoForm
          formSchema={formSchema}
          fieldConfig={{
            password: {
              inputProps: {
                type: 'password',
              },
            },
          }}
        >
          <Link to="/auth/forgot-password" className="ml-auto inline-block text-sm underline">
            找回密码?
          </Link>
          <Button type="submit" className="w-full">
            登录
          </Button>
          <Button variant="outline" className="w-full">
            通过谷歌登录
          </Button>
        </AutoForm>
      </div>
      <div className="mt-4 text-center text-sm">
        <Link to="/auth/sign-up" className="underline">
          注册账号
        </Link>
      </div>
    </>
  );
}
