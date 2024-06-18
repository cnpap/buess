import { UserJwtPayload } from '@/glob';
import { facade } from '@/utils/facade';
import { genToken } from '@/services/func';

export async function getUserInfo() {
  'use server';
  const { signInedMiddleware } = await import('@/services/middlewares');

  await signInedMiddleware();
  const { useJwtPayload } = await import('viteser');

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payload] = useJwtPayload<UserJwtPayload>();

  const user = await facade.prisma.user.findFirstOrThrow({
    where: {
      id: payload.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      TeamMembers: {
        select: {
          status: true,
          teamId: true,
          role: true,
          Team: {
            select: {
              id: true,
              name: true,
              cover: true,
              Projects: {
                select: {
                  id: true,
                  name: true,
                  cover: true,
                },
              },
            },
          },
        },
      },
    },
  });
  payload.teams = user.TeamMembers.map((teamMember) => {
    const { Team } = teamMember;
    return {
      id: teamMember.teamId,
      name: Team.name,
      cover: teamMember.Team.cover,
      role: teamMember.role,
      status: teamMember.status,
      projects: Team.Projects.map((project) => ({
        name: project.name,
        cover: project.cover,
        id: project.id,
      })),
    };
  });

  const token = await genToken(payload);

  return {
    data: {
      token,
      payload,
    },
  };
}
