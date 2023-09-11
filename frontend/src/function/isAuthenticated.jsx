import { GetStore } from "../config/store";
import CryptoJS from "crypto-js";
import { allowedRoles } from "../config/allowedRoles";

export const IsAuthenticated = () => {
  const user = GetStore("user");

  if (!user) {
    return null;
  }

  const hashedRoleFromServer = user.user.role;
  const clientRoles = allowedRoles;

  const hashedClientRoles = clientRoles.map((role) =>
    CryptoJS.SHA256(role).toString()
  );

  const matchingRoleIndex = hashedClientRoles.findIndex(
    (hashedRole) => hashedRole === hashedRoleFromServer
  );

  if (matchingRoleIndex !== -1) {
    return clientRoles[matchingRoleIndex];
  }

  return null;
};
