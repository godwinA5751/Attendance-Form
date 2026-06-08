export const setAdminAuth = (value) => {
  localStorage.setItem("isAdmin", value ? "true" : "false");
};

export const isAdminAuth = () => {
  return localStorage.getItem("isAdmin") === "true";
};

export const logoutAdmin = () => {
  localStorage.removeItem("isAdmin");
};