export const slugToTitleCase = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const stringToTitleCase = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const stringToSlug = (str) => {
  return str.replace(/\s+/g, "-").toLowerCase();
};
