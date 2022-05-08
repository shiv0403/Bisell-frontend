exports.addQueryParams = function (navigate, location, key, value, path) {
  let pathname = location.pathname;
  let searchParams = new URLSearchParams(location.search);
  searchParams.set(key, value);

  if (path) {
    pathname = path;
  }

  navigate({
    pathname,
    search: searchParams.toString(),
  });
};

exports.addQueryParamsArray = function (navigate, location, array, path) {
  let pathname = location.pathname;
  let searchParams = new URLSearchParams(location.search);

  if (path) {
    pathname = path;
  }

  array.forEach((item) => {
    searchParams.set(item.key, item.value);
  });

  navigate({
    pathname,
    search: searchParams.toString(),
  });
};
