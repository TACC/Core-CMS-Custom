export const titleCase = (field: string): string => {
  if (!field) return field;
  return field
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
