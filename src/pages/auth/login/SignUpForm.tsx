import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

export function SignUpForm() {
  // noinspection HtmlUnknownTarget
  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">邮箱</Label>
          <Input id="email" type="email" placeholder="em@x.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">密码</Label>
          <Input id="password" type="password" required />
        </div>
        <Link to="/forgot-password" className="ml-auto inline-block text-sm underline">
          找回密码?
        </Link>
        <Button type="submit" className="w-full">
          登录
        </Button>

        <Button variant="outline" className="w-full">
          通过谷歌登录
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        <Link to="#" className="underline">
          注册账号
        </Link>
      </div>
    </>
  );
}
