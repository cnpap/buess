import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AutoForm from '@/components/ui/auto-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({
      required_error: 'email 是必填的',
    })
    .describe('email')
    .email({
      message: 'email 格式不正确',
    }),
});

export default function ForgotPassword() {
  // noinspection HtmlUnknownTarget
  return (
    <>
      <div className="grid gap-4">
        <AutoForm formSchema={formSchema}>
          <Link to="/auth/sign-in" className="ml-auto inline-block text-sm underline">
            去登录?
          </Link>
          <Button type="submit" className="w-full">
            发送重置连接
          </Button>
        </AutoForm>
      </div>
    </>
  );
}
