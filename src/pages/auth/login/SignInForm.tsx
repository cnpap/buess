import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AutoForm from '@/components/ui/auto-form';
import { formSchema, signIn } from '@/services/auth/sign-in';
import { useState } from 'react';
import { z } from 'zod';
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from 'react-toastify';

export default function SignInForm() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    signIn(values)
      .then((res) => {
        if (res.data) {
          toast.success('sign in success !', {
            position: 'top-center',
          });
          // localStorage.setItem('token', res.data.token)
        }
      })
      .catch(() => setSubmitting(false));
  };
  return (
    <>
      <div className="grid gap-4">
        <AutoForm
          onSubmit={onSubmit}
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
          <LoadingButton loading={submitting} type="submit" className="w-full">
            登录
          </LoadingButton>
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
