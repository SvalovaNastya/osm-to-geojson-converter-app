function addParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | number | string[] | number[],
): void {
  switch (typeof value) {
    case 'string':
      searchParams.append(key, value);
      break;
    case 'number':
      searchParams.append(key, value.toString());
      break;
    case 'object':
      if (Array.isArray(value)) {
        addParam(searchParams, key, value.join(','));
        break;
      }
      throw TypeError('Unexpected object type of param value');
    default:
      throw TypeError(`Unexpected type of param value: ${typeof value}`);
  }
}

function createUrl(
  baseUrl: string,
  relativeUrl: string,
  params?: Record<string, string | number | string[] | number[]>,
): string {
  const url = new URL(relativeUrl, baseUrl).toString();
  if (params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach((entry) => {
      addParam(searchParams, entry[0], entry[1]);
    });

    return `${url}?${searchParams.toString()}`;
  }

  return url;
}

export default createUrl;
