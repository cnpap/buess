import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  // noinspection HtmlUnknownTarget
  return (
    <div
      className="
      w-full lg:grid lg:grid-cols-2 h-fullabsolute inset-0 z-0 h-full bg-white dark:bg-[#090909]
      bg-[linear-gradient(to_right,#f9f9f9_1px,transparent_1px),linear-gradient(to_bottom,#f9f9f9_1px,transparent_1px)] bg-[size:10rem_10rem]
      dark:bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)]
      [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)
      "
    >
      <div className="z-20 flex items-center justify-center py-12">
        <div className="mx-auto grid w-[300px] gap-6">
          <div className={'flex justify-center'}>
            <img src={'/logo.png'} style={{ width: '200px' }} alt="logo" />
          </div>
          <Outlet />
        </div>
      </div>
      <div
        className="
      hidden lg:block
      "
      >
        <img src="/auth/background.png" alt="Image" className="h-screen w-screen" />
      </div>
    </div>
  );
}
