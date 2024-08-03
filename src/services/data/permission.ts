export enum PermissionName {
  USER_INVITE = 'user:invite',
  USER_REMOVE = 'user:remove',
  DATASOURCE_SELECT = 'datasource:select',
  DATASOURCE_WRITE = 'datasource:write',
  SCHEMAS_SELECT = 'schemas:select',
  SCHEMAS_WRITE = 'schemas:write',
  CONFIGS_SELECT = 'configs:select',
  CONFIGS_WRITE = 'configs:write',
  OPTIONS_SELECT = 'options:select',
  OPTIONS_WRITE = 'options:write',
}

export const PERMISSIONS = [
  {
    name: PermissionName.USER_INVITE,
    description: 'Invite new members to the team',
  },
  {
    name: PermissionName.USER_REMOVE,
    description: 'Remove members from the team',
  },
  {
    name: PermissionName.DATASOURCE_SELECT,
    description: 'Used to understand which data sources are being used',
  },
  {
    name: PermissionName.DATASOURCE_WRITE,
    description: 'Modify the connection information of the data source in the background or API',
  },
  {
    name: PermissionName.SCHEMAS_SELECT,
    description: 'View the schemas of tables and fields in the database',
  },
  {
    name: PermissionName.SCHEMAS_WRITE,
    description: 'Modify the schema of the table and field in the database',
  },
  {
    name: PermissionName.CONFIGS_SELECT,
    description: 'You can check what configurations have been added to this project',
  },
  {
    name: PermissionName.CONFIGS_WRITE,
    description: 'You can add or modify configurations to this project',
  },
  {
    name: PermissionName.OPTIONS_SELECT,
    description: 'View business settings such as tables, relationships, field configurations, etc.',
  },
  {
    name: PermissionName.OPTIONS_WRITE,
    description:
      'Modify business settings such as tables, relationships, field configurations, etc.',
  },
];

export interface TeamRole {
  includes: PermissionName[];
  name: string;
  description: string;
}

export const TEAM_ROLE_DBA: TeamRole = {
  includes: [
    PermissionName.DATASOURCE_SELECT,
    PermissionName.DATASOURCE_WRITE,
    PermissionName.SCHEMAS_SELECT,
    PermissionName.CONFIGS_SELECT,
    PermissionName.OPTIONS_SELECT,
  ],
  name: 'role:dba',
  description: `\
The database administrator has the highest authority and can manage the database and data source`,
};

export const TEAM_ROLE_DEVELOPER: TeamRole = {
  includes: [
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_WRITE,
    PermissionName.OPTIONS_WRITE,
  ],
  name: 'role:developer',
  description: `\
Developers can modify the schema, configuration, and business settings of the database`,
};

export const TEAM_ROLE_HR: TeamRole = {
  includes: [PermissionName.USER_INVITE, PermissionName.USER_REMOVE],
  name: 'role:hr',
  description: `\
HR can manage the team's members`,
};

export const TEAM_ROLE_PD: TeamRole = {
  includes: [
    PermissionName.USER_INVITE,
    PermissionName.USER_REMOVE,
    PermissionName.DATASOURCE_SELECT,
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_SELECT,
    PermissionName.OPTIONS_SELECT,
  ],
  name: 'role:pd',
  description: `\
Product managers can manage the team's members, data sources, and business settings`,
};

export const TEAM_ROLE_MASTER: TeamRole = {
  includes: [
    PermissionName.USER_INVITE,
    PermissionName.USER_REMOVE,
    PermissionName.DATASOURCE_SELECT,
    PermissionName.DATASOURCE_WRITE,
    PermissionName.SCHEMAS_SELECT,
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_SELECT,
    PermissionName.CONFIGS_WRITE,
    PermissionName.OPTIONS_SELECT,
    PermissionName.OPTIONS_WRITE,
  ],
  name: 'role:master',
  description: `\
The master has the highest authority and can manage the team's members, data sources, and business settings`,
};

export const TEAM_ROLES: TeamRole[] = [
  TEAM_ROLE_DBA,
  TEAM_ROLE_DEVELOPER,
  TEAM_ROLE_HR,
  TEAM_ROLE_PD,
  TEAM_ROLE_MASTER,
];
