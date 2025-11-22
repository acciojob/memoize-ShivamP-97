function memoize(callback, resolver = JSON.stringify) {
  const cache = new Map();

  function getKey(args) {
    return resolver === JSON.stringify
      ? JSON.stringify(args)
      : resolver(...args);
  }

  function memoized(...args) {
    const key = getKey(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = callback(...args);
    cache.set(key, result);
    return result;
  }

  memoized.clear = function () {
    cache.clear();
  };

  memoized.delete = function (...args) {
    const key = getKey(args);
    return cache.delete(key);
  };

  memoized.has = function (...args) {
    const key = getKey(args);
    return cache.has(key);
  };

  return memoized;
}

module.exports = memoize;
