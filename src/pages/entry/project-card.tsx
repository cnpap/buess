import { toast } from 'react-toastify';
import NiceModal from '@ebay/nice-modal-react';
import Confirm from '@/components/confirm';
import { Button } from '@/components/ui/button';
import { deleteProject, ProjectMember } from '@/pages/entry/api';

type ProjectCardProps = {
  onClick?: () => void;
  freshTeam: () => void;
  userId: string;
} & {
  member: ProjectMember;
};

export function ProjectCard({ member, onClick, userId, freshTeam }: ProjectCardProps) {
  const handleDelete = async () => {
    // noinspection ES6MissingAwait
    NiceModal.show(Confirm, {
      title: 'delete project',
      id: member.name as string,
      onOk: () => {
        deleteProject(member.project_id).then((res) => {
          if (res.success) {
            toast.info('deleted');
            freshTeam();
          }
        });
      },
    });
  };

  return (
    <div className="relative w-72 mx-auto cursor-default hover-container opacity-90 hover:opacity-100 transition-opacity duration-300">
      <div className=" overflow-hidden h-full rounded transition duration-200 group bg-white hover:shadow border border-gray-200 dark:border-gray-800">
        <div className="h-[280px] project-card py-6 px-6 dark:bg-zinc-900 flex flex-col justify-between">
          <div>
            <h2 className="font-bold pb-2 text-lg text-zinc-700 dark:text-zinc-100">
              {member.name}
            </h2>
            <span className="text-sm text-gray-700">{member.desc}</span>
          </div>
          <div className="flex flex-row justify-between items-center mt-3">
            {member.created_by === userId ? (
              <Button variant={'destructive'} size={'default'} onClick={handleDelete}>
                delete
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              size={'default'}
              onClick={onClick}
              className={'bg-primary bg-opacity-80 dark:bg-opacity-50'}
            >
              open
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
