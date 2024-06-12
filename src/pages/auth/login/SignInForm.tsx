import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AutoForm from '@/components/ui/auto-form';
import { formSchema } from '@/services/auth/sign-in';

export default function SignInForm() {
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
