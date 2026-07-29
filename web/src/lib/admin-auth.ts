export const ADMIN_COOKIE = "maggie-admin";
export const ADMIN_COOKIE_VALUE = "authenticated";

export const ADMIN_USERNAME =
  process.env.ADMIN_USERNAME ?? "maggieadmin";
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? "access";

export function credentialsMatch(username: string, password: string) {
  return (
    username.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD
  );
}

export function isAdminCookie(value: string | undefined | null) {
  return value === ADMIN_COOKIE_VALUE;
}
