enum PermissionName {
  ORIGINATIONS_USER_INVITE = 'originations:user:invite',
  ORIGINATIONS_USER_REMOVE = 'originations:user:remove',
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
    name: PermissionName.ORIGINATIONS_USER_INVITE,
    description: 'Invite new members to the organization',
  },
  {
    name: PermissionName.ORIGINATIONS_USER_REMOVE,
    description: 'Remove members from the organization',
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

interface OriginationRole {
  includes: PermissionName[];
  name: string;
  description: string;
}

export const ORIGINATION_ROLE_DBA: OriginationRole = {
  includes: [
    PermissionName.DATASOURCE_SELECT,
    PermissionName.DATASOURCE_WRITE,
    PermissionName.SCHEMAS_SELECT,
    PermissionName.CONFIGS_SELECT,
    PermissionName.OPTIONS_SELECT,
  ],
  name: 'origination:role:dba',
  description: `\
The database administrator has the highest authority and can manage the database and data source`,
};

export const ORIGINATION_ROLE_DEVELOPER: OriginationRole = {
  includes: [
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_WRITE,
    PermissionName.OPTIONS_WRITE,
  ],
  name: 'origination:role:developer',
  description: `\
Developers can modify the schema, configuration, and business settings of the database`,
};

export const ORIGINATION_ROLE_HR: OriginationRole = {
  includes: [PermissionName.ORIGINATIONS_USER_INVITE, PermissionName.ORIGINATIONS_USER_REMOVE],
  name: 'origination:role:hr',
  description: `\
HR can manage the organization's members`,
};

export const ORIGINATION_ROLE_PD: OriginationRole = {
  includes: [
    PermissionName.ORIGINATIONS_USER_INVITE,
    PermissionName.ORIGINATIONS_USER_REMOVE,
    PermissionName.DATASOURCE_SELECT,
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_SELECT,
    PermissionName.OPTIONS_SELECT,
  ],
  name: 'origination:role:pd',
  description: `\
Product managers can manage the organization's members, data sources, and business settings`,
};

export const ORIGINATION_ROLE_MASTER: OriginationRole = {
  includes: [
    PermissionName.ORIGINATIONS_USER_INVITE,
    PermissionName.ORIGINATIONS_USER_REMOVE,
    PermissionName.DATASOURCE_SELECT,
    PermissionName.DATASOURCE_WRITE,
    PermissionName.SCHEMAS_SELECT,
    PermissionName.SCHEMAS_WRITE,
    PermissionName.CONFIGS_SELECT,
    PermissionName.CONFIGS_WRITE,
    PermissionName.OPTIONS_SELECT,
    PermissionName.OPTIONS_WRITE,
  ],
  name: 'origination:role:master',
  description: `\
The master has the highest authority and can manage the organization's members, data sources, and business settings`,
};

export const ORIGINATION_ROLES: OriginationRole[] = [
  ORIGINATION_ROLE_DBA,
  ORIGINATION_ROLE_DEVELOPER,
  ORIGINATION_ROLE_HR,
  ORIGINATION_ROLE_PD,
  ORIGINATION_ROLE_MASTER,
];
