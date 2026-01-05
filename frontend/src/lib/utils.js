export const capitialize = (str = "") => {
  if (typeof str !== "string" || str.trim() === "") return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
