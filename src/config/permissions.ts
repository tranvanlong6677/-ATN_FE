export const ALL_PERMISSIONS = {
  COMPANIES: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/companies",
      module: "COMPANIES",
    },
    CREATE: {
      method: "POST",
      apiPath: "/api/v1/companies",
      module: "COMPANIES",
    },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/companies/:id",
      module: "COMPANIES",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/companies/:id",
      module: "COMPANIES",
    },
    GET_BY_ID: {
      method: "GET",
      apiPath: "/api/v1/companies/:id",
      module: "COMPANIES",
    },
  },
  JOBS: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/jobs", module: "JOBS" },
    CREATE: { method: "POST", apiPath: "/api/v1/jobs", module: "JOBS" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/jobs/:id", module: "JOBS" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/jobs/:id", module: "JOBS" },
    GET_BY_ID: {
      method: "GET",
      apiPath: "/api/v1/jobs/:id",
      module: "JOBS",
    },
  },
  PERMISSIONS: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/permissions",
      module: "PERMISSIONS",
    },
    CREATE: {
      method: "POST",
      apiPath: "/api/v1/permissions",
      module: "PERMISSIONS",
    },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/permissions/:id",
      module: "PERMISSIONS",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/permissions/:id",
      module: "PERMISSIONS",
    },
    FETCH_BY_ID: {
      method: "GET",
      apiPath: "/api/v1/permissions/:id",
      module: "PERMISSIONS",
    },
  },
  RESUMES: {
    GET_PAGINATE: {
      method: "GET",
      apiPath: "/api/v1/resumes",
      module: "RESUMES",
    },
    CREATE: { method: "POST", apiPath: "/api/v1/resumes", module: "RESUMES" },
    UPDATE: {
      method: "PATCH",
      apiPath: "/api/v1/resumes/:id",
      module: "RESUMES",
    },
    DELETE: {
      method: "DELETE",
      apiPath: "/api/v1/resumes/:id",
      module: "RESUMES",
    },
    FETCH_IN_WEEK: {
      method: "POST",
      apiPath: "/api/v1/resumes/in-week",
      module: "RESUMES",
    },
    FETCH_BY_USER: {
      method: "POST",
      apiPath: "/api/v1/resumes/by-user",
      module: "RESUMES",
    },
    GET_BY_ID: {
      method: "POST",
      apiPath: "/api/v1/resumes/:id",
      module: "RESUMES",
    },
  },
  ROLES: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/roles", module: "ROLES" },
    CREATE: { method: "POST", apiPath: "/api/v1/roles", module: "ROLES" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/roles/:id", module: "ROLES" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/roles/:id", module: "ROLES" },
    FETCH_BY_ID: {
      method: "GET",
      apiPath: "/api/v1/roles/:id",
      module: "ROLES",
    },
  },
  USERS: {
    GET_PAGINATE: { method: "GET", apiPath: "/api/v1/users", module: "USERS" },
    CREATE: { method: "POST", apiPath: "/api/v1/users", module: "USERS" },
    UPDATE: { method: "PATCH", apiPath: "/api/v1/users", module: "USERS" },
    DELETE: { method: "DELETE", apiPath: "/api/v1/users/:id", module: "USERS" },
    CHANGE_PASSWORD: {
      method: "PATCH",
      apiPath: "/api/v1/users/password/change",
      module: "USERS",
    },
    UPDATE_BY_ID: {
      method: "PATCH",
      apiPath: "/api/v1/users/:id",
      module: "USERS",
    },
  },
  MAILS: {
    SEND_EMAIL: { method: "GET", apiPath: "/api/v1/mail", module: "MAILS" },
  },
};

export const ALL_MODULES = {
  AUTH: "AUTH",
  COMPANIES: "COMPANIES",
  FILES: "FILES",
  JOBS: "JOBS",
  PERMISSIONS: "PERMISSIONS",
  RESUMES: "RESUMES",
  ROLES: "ROLES",
  USERS: "USERS",
  SUBSCRIBERS: "SUBSCRIBERS",
  MAILS: "MAILS",
};
