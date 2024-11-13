const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);
  if (isContactType(contactType)) return contactType;
};

const parseBoolean = (boolean) => {
  if (typeof boolean === 'string') {
    const lowerCasedBoolean = boolean.toLowerCase();

    if (lowerCasedBoolean === 'true') {
      return true;
    }

    if (lowerCasedBoolean === 'false') {
      return false;
    }

    return undefined;
  }

  if (typeof boolean === 'boolean') {
    return boolean;
  }

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return { contactType: parsedContactType, isFavourite: parsedIsFavourite };
};
