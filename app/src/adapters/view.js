import humanizeString from "humanize-string";

export const adaptToDisplay = (respData = {}, primaryColumn, url) => {
  const data = {};
  const urls = {};
  const type = url ? url.split("/")[4] : null;

  for (const key in respData) {
    if (Array.isArray(respData[key])) {
      urls[key] = respData[key];
      continue;
    }

    data[key] = respData[key];
  }

  const displayName = humanizeString(type)

  return { displayName, data, urls };
};
