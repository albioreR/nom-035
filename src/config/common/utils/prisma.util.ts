export const removeInactive = (data: any): any => {
  if (Array.isArray(data)) {
    return data
      .map(removeInactive)
      .filter((item) => !(item && item.active === false))
      .filter((item) => item !== null && item !== undefined);
  } else if (typeof data === 'object' && data !== null) {
    const newData: any = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key];

        newData[key] = removeInactive(value);
      }
    }

    if (newData.active === false) {
      return undefined;
    }

    return newData;
  }

  return data;
};
