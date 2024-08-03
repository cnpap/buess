import { email, messages } from '@/config';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, RotateCcw } from 'lucide-react';
import { resetApp } from '@/utils/func';

function AppErrorBoundaryFallback() {
  return (
    <div
      style={{
        margin: '0 auto',
      }}
      className="sm:col-span-2 mt-8 w-[400px]"
    >
      <CardHeader className="pb-3">
        <CardTitle>{messages.app.crash.title}</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          {messages.loader.fail}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={() => {
            // 弹出邮件客户端
            window.location.href = `
              mailto:${email}
            `;
          }}
          rel="noreferrer"
        >
          <Mail className={'mr-2'} />
          {messages.app.crash.options.email}
        </Button>
        <Button className={'mt-2'} onClick={resetApp}>
          <RotateCcw className={'mr-2'} />
          {messages.app.crash.options.reset}
        </Button>
      </CardContent>
    </div>
  );
}

export default AppErrorBoundaryFallback;
