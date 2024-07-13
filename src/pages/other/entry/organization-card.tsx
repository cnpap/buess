import { OrganizationPayload } from '@/glob';
type OrganizationCardProps = {
  onClick?: () => void;
} & {
  organization: OrganizationPayload;
};

import { FollowerPointerCard } from '@/components/ui/following-pointer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function OrganizationCard({ organization, onClick }: OrganizationCardProps) {
  return (
    <div className="w-72 mx-auto cursor-default">
      <FollowerPointerCard title={<TitleComponent title={blogContent.author} avatar={''} />}>
        <div className="relative overflow-hidden h-full rounded-2xl transition duration-200 group bg-white hover:shadow-xl border border-zinc-100 dark:border-zinc-800">
          <div className="w-full aspect-w-16 aspect-h-10 rounded-tr-lg rounded-tl-lg overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative dark:bg-zinc-900">
            <img
              src={organization.custom_data.coverImage}
              alt="thumbnail"
              className={`group-hover:scale-95 h-48 group-hover:rounded-2xl transform object-cover transition duration-200 w-full`}
            />
          </div>
          <div className="h-[200px] py-4 px-4 dark:bg-zinc-900 flex flex-col justify-between">
            <div>
              <h2 className="font-bold my-4 text-lg text-zinc-700 dark:text-zinc-100">
                {organization.name}
              </h2>
              <h2 className="font-normal my-4 text-sm text-zinc-500 dark:text-zinc-400">
                {organization.description}
              </h2>
            </div>
            <div className="flex flex-row justify-between items-center mt-10">
              <span className="text-sm text-gray-500">{organization.created_at}</span>
              <div
                onClick={onClick}
                className="hover:bg-red-500 relative z-10 px-6 py-2 bg-black text-white font-bold rounded-xl block text-xs"
              >
                open
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: 'amazing-tailwindcss-grid-layouts',
  author: 'Manu Arora',
  date: '28th March, 2023',
  title: 'Amazing Tailwindcss Grid Layout Examples',
  description:
    'Grids are cool, but Tailwindcss grids are cooler. In this article, we will learn how to create amazing Grid layouts with Tailwindcs grid and React.',
  image: '/demo/thumbnail.png',
  authorAvatar: '/manu.png',
};

const TitleComponent = ({ title, avatar }: { title: string; avatar: string }) => (
  <div className="flex space-x-2 items-center">
    <Avatar className={'w-5 h-5'}>
      {avatar && <AvatarImage src={avatar} />}
      <AvatarFallback className={'bg-gray-700'}>A</AvatarFallback>
    </Avatar>
    <p>{title}</p>
  </div>
);

export default OrganizationCard;
