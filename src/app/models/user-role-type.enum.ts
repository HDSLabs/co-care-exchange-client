export enum UserRoleType {
  Admin = 'ADMIN',
  Player = 'PLAYER',
  Coach = 'COACH',
}

export function fromRoleName(name: string): UserRoleType {
  if (UserRoleType.Admin === name) {
    return UserRoleType.Admin;
  } else if (UserRoleType.Player === name) {
    return UserRoleType.Player;
  } else if (UserRoleType.Coach === name) {
    return UserRoleType.Coach;
  }

  return null;
}
