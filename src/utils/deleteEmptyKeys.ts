export const deleteEmptyKeys = (obj: Record<string, unknown>) => {
  const newObj: Record<string, unknown> = {};
  obj &&
    Object.keys(obj).forEach(key => {
      if (obj[key] === Object(obj[key])) newObj[key] = deleteEmptyKeys(obj[key] as Record<string, unknown>);
      else if (obj[key] !== undefined && obj[key] !== null) newObj[key] = obj[key];
    });
  return newObj;
};
