import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  // noinspection HtmlUnknownTarget
  return (
    <div className="w-full lg:grid lg:grid-cols-2 h-full">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Outlet />
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
