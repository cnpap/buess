const P_ORIGINATIONS_USER_INVITE = 'originations:user:invite';
const P_ORIGINATIONS_USER_REMOVE = 'originations:user:remove';

const P_DATASOURCE_SELECT = 'datasource:select';
const P_SCHEMAS_SELECT = 'schemas:select';
const P_CONFIGS_SELECT = 'configs:select';
const P_OPTIONS_SELECT = 'options:select';

const P_DATASOURCE_WRITE = 'datasource:write';
const P_SCHEMAS_WRITE = 'schemas:write';
const P_CONFIGS_WRITE = 'configs:write';
const P_OPTIONS_WRITE = 'options:write';

export const PERMISSIONS = [
  {
    name: P_ORIGINATIONS_USER_INVITE,
    description: `\
Invite new members to the organization`,
  },
  {
    name: P_ORIGINATIONS_USER_REMOVE,
    description: `\
Remove members from the organization`,
  },
  {
    name: P_DATASOURCE_SELECT,
    description: `\
Used to understand which data sources are being used`,
  },
  {
    name: P_DATASOURCE_WRITE,
    description: `\
Modify the connection information of the data source in the background or API`,
  },
  {
    name: P_SCHEMAS_SELECT,
    description: `\
View the schemas of tables and fields in the database`,
  },
  {
    name: P_SCHEMAS_WRITE,
    description: `\
Modify the schema of the table and field in the database`,
  },
  {
    name: P_CONFIGS_SELECT,
    description: `\
You can check what configurations have been added to this project`,
  },
  {
    name: P_CONFIGS_WRITE,
    description: `\
You can add or modify configurations to this project`,
  },
  {
    name: P_OPTIONS_SELECT,
    description: `\
View business settings such as tables, relationships, field configurations, etc.`,
  },
  {
    name: P_OPTIONS_WRITE,
    description: `\
Modify business settings such as tables, relationships, field configurations, etc.`,
  },
];

interface OriginationRole {
  includes: string[];
  name: string;
  description: string;
}

export const ORIGINATION_ROLE_DBA: OriginationRole = {
  includes: [
    P_DATASOURCE_SELECT,
    P_DATASOURCE_WRITE,
    P_SCHEMAS_SELECT,
    P_CONFIGS_SELECT,
    P_OPTIONS_SELECT,
  ],
  name: 'origination:role:dba',
  description: `\
The database administrator has the highest authority and can manage the database and data source`,
};

export const ORIGINATION_ROLE_DEVELOPER: OriginationRole = {
  includes: [P_SCHEMAS_WRITE, P_CONFIGS_WRITE, P_OPTIONS_WRITE],
  name: 'origination:role:developer',
  description: `\
Developers can modify the schema, configuration, and business settings of the database`,
};

export const ORIGINATION_ROLE_HR: OriginationRole = {
  includes: [P_ORIGINATIONS_USER_INVITE, P_ORIGINATIONS_USER_REMOVE],
  name: 'origination:role:hr',
  description: `\
HR can manage the organization's members`,
};

export const ORIGINATION_ROLE_PD: OriginationRole = {
  includes: [
    P_ORIGINATIONS_USER_INVITE,
    P_ORIGINATIONS_USER_REMOVE,
    P_DATASOURCE_SELECT,
    P_SCHEMAS_WRITE,
    P_CONFIGS_SELECT,
    P_OPTIONS_SELECT,
  ],
  name: 'origination:role:pd',
  description: `\
Product managers can manage the organization's members, data sources, and business settings`,
};

export const ORIGINATION_ROLE_MASTER: OriginationRole = {
  includes: [
    P_ORIGINATIONS_USER_INVITE,
    P_ORIGINATIONS_USER_REMOVE,
    P_DATASOURCE_SELECT,
    P_DATASOURCE_WRITE,
    P_SCHEMAS_SELECT,
    P_SCHEMAS_WRITE,
    P_CONFIGS_SELECT,
    P_CONFIGS_WRITE,
    P_OPTIONS_SELECT,
    P_OPTIONS_WRITE,
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
