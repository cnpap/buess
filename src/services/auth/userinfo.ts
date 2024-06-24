import { UserJwtPayload } from '@/glob';
import { genToken } from '@/services/func';
import { signInedMiddleware } from '@/services/middlewares';
import { useJwtPayload } from 'viteser';
import { maPrisma } from '@/utils/facade-init';

export async function getUserInfo() {
  'use server';

  await signInedMiddleware();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [payload] = useJwtPayload<UserJwtPayload>();

  const user = await maPrisma().user.findFirstOrThrow({
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
