import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import AutoForm from '@/components/ui/auto-form';
import { formSchema, signIn } from '@/services/auth/sign-in';
import { useState } from 'react';
import { z } from 'zod';
import { LoadingButton } from '@/components/ui/loading-button';
import { toast } from 'react-toastify';
import { useMount } from 'ahooks';
import { preLoad } from '@/utils/pre-load';

function ChromeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function SignInForm() {
  const navigate = useNavigate();
  const preLoadCallback = preLoad();
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setSubmitting(true);
    signIn(values)
      .then((res) => {
        if (res.data) {
          toast.success('sign in success !', {
            position: 'top-center',
          });
          localStorage.setItem('token', res.data.token);
          preLoadCallback().then(() => {
            navigate('/main/home');
          });
        }
      })
      .catch(() => setSubmitting(false));
  };
  useMount(() => {
    preLoadCallback().then(() => {
      navigate('/main/home');
    });
  });
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
            forgot password?
          </Link>
          <LoadingButton loading={submitting} type="submit" className="w-full">
            sign in
          </LoadingButton>
          <div className={`flex flex-col gap-1 items-center justify-center space-x-1`}>
            <Button variant="outline" className="w-full">
              <ChromeIcon />
              <p className={'ml-2 w-32 text-start'}>sign by google</p>
            </Button>
            <Button variant="outline" className="w-full">
              <GithubIcon />
              <p className={'ml-2 w-32 text-start'}>sign by github</p>
            </Button>
          </div>
        </AutoForm>
      </div>
      <div className="mt-4 text-center text-sm">
        <Link to="/auth/sign-up" className="underline">
          sign up by email
        </Link>
      </div>
    </>
  );
}
