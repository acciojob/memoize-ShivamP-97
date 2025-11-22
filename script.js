function memoize(callback, resolver) {
  const cache = new Map();

  function getKey(args) {
    if (resolver) return resolver(...args);

    return args[0];
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
