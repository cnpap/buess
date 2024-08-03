import Decorate from '@/components/decorate/decorate';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProjectCard from '@/pages/other/entry/project-card';
import NiceModal from '@ebay/nice-modal-react';
import { useAuth, useClerk } from '@clerk/clerk-react';
import { VITE_CLERK_TEMPLATE } from '@/const';
import CreateTeamForm from '@/pages/other/entry/create-project-form';
import { useEffect, useState } from 'react';
import { getProjectMembers, ProjectMember } from '@/pages/other/entry/api';

function ConnTeam() {
  const clerk = useClerk();
  const auth = useAuth();
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const fresh = async () => {
    const newMembers = await getProjectMembers();
    setMembers(newMembers.data);
  };
  useEffect(() => {
    if (auth.isLoaded) {
      if (auth.isSignedIn) {
        (async () => {
          const token = localStorage.getItem('token');
          if (!token) {
            const newToken = await auth.getToken({
              template: VITE_CLERK_TEMPLATE,
            });
            if (!newToken) {
              throw new Error('token is empty');
            }
            localStorage.setItem('token', newToken);
          }
          await fresh();
        })();
      }
    }
  }, [auth, auth.isLoaded, auth.isSignedIn]);
  const handleLogout = () => {
    clerk
      .signOut({
        redirectUrl: '/auth',
      })
      .then(() => {
        localStorage.clear();
      });
  };
  const handleCreate = () => {
    // noinspection JSIgnoredPromiseFromCall
    NiceModal.show(CreateTeamForm, {
      onOk: async () => {
        await fresh();
      },
    });
  };
  const userId = (auth.userId ?? '').replace('user_', '') as string;
  return (
    <Decorate>
      <div className="inset-0 mx-auto z-50 md:top-1/4 flex space-x-4">
        {members.length
          ? members.map((member) => (
              <ProjectCard
                userId={userId}
                onClick={() => {
                  window.open(`/main?id=${member.project_id}`);
                }}
                freshTeam={fresh}
                key={member.project_id}
                member={member}
              />
            ))
          : 'loading...'}
      </div>
      <div
        className={cn(
          'fixed bottom-0 left-0 w-full h-16 bg-white dark:bg-[#090909] border-t border-gray-200 dark:border-gray-800',
          'flex items-center justify-end gap-4 px-4',
        )}
      >
        <Button onClick={handleCreate}>create team</Button>
        <Button onClick={handleLogout} variant="secondary">
          logout
        </Button>
      </div>
    </Decorate>
  );
}

export default ConnTeam;
