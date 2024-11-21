export const setTokenInSession = (token: string) => {
   sessionStorage.setItem("token", token);
};
export const getTokenFromSession = () => {
   return sessionStorage.getItem("token"); // null not found
};

export const clearTokenInSession = () => {
   sessionStorage.removeItem("token");
};
