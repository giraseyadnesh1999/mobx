import SecureLS from "secure-ls";

export const getToken = () => {
  const ls: any = new SecureLS();
  var token = ls?.get("token");
  return token?.data;
};

export const roleName = () => {
  const ls = new SecureLS();

  return ls?.get("role")?.data;
};

export const userPermission = () => {
  const ls = new SecureLS();

  return ls?.get("userPermissions")?.data;
};
