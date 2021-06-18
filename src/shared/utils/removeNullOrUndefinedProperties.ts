const removeNullOrUndefinedProperties = <T>(object: T): Partial<T> => {
  return Object.entries(object)
    .filter(([_, v]) => v != null)
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: v === Object(v) ? removeNullOrUndefinedProperties(v) : v,
      }),
      {},
    );
};

export default removeNullOrUndefinedProperties;
