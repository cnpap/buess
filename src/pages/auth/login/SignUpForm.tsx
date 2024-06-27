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

export default function SignUpForm() {
  // noinspection HtmlUnknownTarget
  return (
    <>
      <div className="grid gap-4">
        <AutoForm formSchema={formSchema}>
          <Link to="/auth/sign-in" className="ml-auto inline-block text-sm underline">
            go to login?
          </Link>
          <Button type="submit" className="w-full">
            send registration link
          </Button>
        </AutoForm>
      </div>
    </>
  );
}
