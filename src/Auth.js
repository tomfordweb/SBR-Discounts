export const organizationId = process.env.REACT_APP_MSR_ORGANIZATION_ID;
export const username = process.env.REACT_APP_MSR_USERNAME;
export const password = process.env.REACT_APP_MSR_PASSWORD;


export default {
  headers: {
    'X-Organization-Id' : organizationId
  },
  auth: {
    username,
    password
  },
};
