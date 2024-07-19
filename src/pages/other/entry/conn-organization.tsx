import { Card, CardContent } from '@/components/ui/card';
import Decorate from '@/components/decorate/decorate';
import * as React from 'react';
import { useStore } from '@nanostores/react';
import { $userPayloadAtom } from '@/atoms/organization';
import { Button } from '@/components/ui/button';
import { useLogto } from '@logto/react';
import { VITE_BASE_URL } from '@/const';
import { useMount } from 'ahooks';
import { organizationsByUser } from '@/services/logto/src/organization';
import { cn } from '@/lib/utils';
import OrganizationCard from '@/pages/other/entry/organization-card';
import NiceModal from '@ebay/nice-modal-react';
import CreateOrganizationForm from '@/pages/other/entry/create-organization-form';
import { useNavigate } from 'react-router-dom';

function ConnOrganization() {
  const { signOut } = useLogto();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    // noinspection JSIgnoredPromiseFromCall
    signOut(`${VITE_BASE_URL}/auth`);
  };
  const { organizations } = useStore($userPayloadAtom);
  const fresh = () => {
    organizationsByUser().then((res) => {
      if (res.data.length) {
        $userPayloadAtom.set({
          ...$userPayloadAtom.get(),
          organizations: res.data,
        });
      }
    });
  };
  useMount(async () => {
    fresh();
  });
  const handleCreate = () => {
    NiceModal.show(CreateOrganizationForm, {
      onOk: () => {
        fresh();
      },
    });
  };
  return (
    <Decorate>
      <Card className="inset-0 mx-auto z-50 md:top-1/4">
        <CardContent className={'p-6 flex gap-4'}>
          {organizations.length
            ? organizations.map((organization) => (
                <OrganizationCard
                  onClick={() => {
                    navigate(`/main?id=${organization.id}`);
                  }}
                  freshOrganization={fresh}
                  key={organization.id}
                  organization={organization}
                />
              ))
            : 'loading...'}
        </CardContent>
      </Card>
      <div
        className={cn(
          'fixed bottom-0 left-0 w-full h-16 bg-white dark:bg-[#090909] border-t border-gray-200 dark:border-gray-800',
          'flex items-center justify-end gap-4 px-4',
        )}
      >
        <Button onClick={handleCreate}>create organization</Button>
        <Button onClick={handleLogout} variant="secondary">
          logout
        </Button>
      </div>
    </Decorate>
  );
}

export default ConnOrganization;
