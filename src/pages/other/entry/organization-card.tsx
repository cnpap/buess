import { OrganizationPayload } from '@/glob';

type OrganizationCardProps = {
  onClick?: () => void;
  freshOrganization: () => void;
} & {
  organization: OrganizationPayload;
};

import {
  deleteOrganizationById,
  freshOrganizationCoverImage,
} from '@/services/logto/src/organization';
import { toast } from 'react-toastify';
import NiceModal from '@ebay/nice-modal-react';
import Confirm from '@/components/confirm';
import { Button } from '@/components/ui/button';
import { $permissions } from '@/atoms/organization';
import { useStore } from '@nanostores/react';
import { ORIGINATION_ROLE_MASTER } from '@/services/data/permission';
import { RefreshCcw } from 'lucide-react';

export function OrganizationCard({
  organization,
  onClick,
  freshOrganization,
}: OrganizationCardProps) {
  const permissions = useStore($permissions);
  const handleDelete = async () => {
    NiceModal.show(Confirm, {
      title: 'delete organization',
      content: 'are you sure?',
      onOk: () => {
        deleteOrganizationById(organization.id).then((res) => {
          if (res.success) {
            toast.info('deleted');
            freshOrganization();
          }
        });
      },
    });
  };
  const handleRefresh = async () => {
    freshOrganizationCoverImage(organization.id).then((res) => {
      if (res.success) {
        toast.info('refreshed');
        freshOrganization();
      }
    });
  };

  return (
    <div className="w-72 mx-auto cursor-default">
      <div className="relative overflow-hidden h-full rounded transition duration-200 group bg-white hover:shadow border border-zinc-100 dark:border-zinc-800">
        <div className="w-full aspect-w-16 aspect-h-10 rounded-tr rounded-tl overflow-hidden xl:aspect-w-16 xl:aspect-h-10 relative dark:bg-zinc-900">
          <img
            src={organization.custom_data.coverImage}
            alt="thumbnail"
            className={`group-hover:scale-95 h-48 group-hover:rounded transform object-cover transition duration-200 w-full`}
          />
          <Button
            onClick={handleRefresh}
            size="icon"
            className={
              'absolute hidden group-hover:flex w-6 h-6 top-4 right-4 bg-gray-800 bg-opacity-50 dark:bg-opacity-50'
            }
          >
            <RefreshCcw className={'w-3 h-3'} />
          </Button>
        </div>
        <div className="h-[200px] py-4 px-4 dark:bg-zinc-900 flex flex-col justify-between">
          <div>
            <h2 className="font-bold pb-2 text-lg text-zinc-700 dark:text-zinc-100">
              {organization.name}
            </h2>
            <span className="text-sm text-gray-500">{organization.description}</span>
          </div>
          <div className="flex flex-row justify-between items-center mt-10">
            {permissions.hasRole(ORIGINATION_ROLE_MASTER.name, organization.id) && (
              <Button
                onClick={handleDelete}
                variant={'destructive'}
                className={'bg-red-500 bg-opacity-80 dark:bg-opacity-50'}
              >
                delete
              </Button>
            )}
            <Button
              size={'default'}
              onClick={onClick}
              className={'bg-blue-700 bg-opacity-80 dark:bg-opacity-50'}
            >
              open
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationCard;
