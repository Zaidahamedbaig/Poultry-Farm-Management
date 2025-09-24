function groupBy<T>(
  array: Array<T>,
  callback: (data: T) => string
): Record<string, T[]> {
  return array.reduce((acc: Record<string, T[]>, item) => {
    // Get key from callback
    const key = callback(item);

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(item);

    return acc;
  }, {});
}

export { groupBy };
