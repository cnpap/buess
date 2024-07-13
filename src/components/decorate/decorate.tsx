import { PropsWithChildren } from 'react';

function Decorate({ children }: PropsWithChildren) {
  return (
    <div
      className="
      w-full absolute inset-0 z-0 h-full bg-white dark:bg-[#090909]
      bg-[linear-gradient(to_right,#f9f9f9_1px,transparent_1px),linear-gradient(to_bottom,#f9f9f9_1px,transparent_1px)] bg-[size:10rem_10rem]
      dark:bg-[linear-gradient(to_right,#090909_1px,transparent_1px),linear-gradient(to_bottom,#090909_1px,transparent_1px)]
      [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)
      "
    >
      <div
        className="
      absolute top-1/5 left-3
      hidden lg:block
      "
      >
        <img src="/auth/background.png" alt="Image" className="h-[800px] w-[800px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">{children}</div>
    </div>
  );
}

export default Decorate;
