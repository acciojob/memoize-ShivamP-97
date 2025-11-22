function memoize(callback, resolver) {
  const cache = new Map();

  function getKey(args) {
    if (resolver) {
      return resolver(...args);
    }
    return JSON.stringify(args);
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
    return cache.delete(getKey(args));
  };

  memoized.has = function (...args) {
    return cache.has(getKey(args));
  };

  return memoized;
}

module.exports = memoize;
