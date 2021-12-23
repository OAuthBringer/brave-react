import humanizeString from "humanize-string";

export const adaptToDisplay = (respData = {}, primaryColumn, url) => {
  const data = {};
  const urls = {};
  const type = url ? url.split("/")[4] : null;

  console.log({ type, url });

  for (const key in respData) {
    if (Array.isArray(respData[key])) {
      urls[key] = respData[key];
      continue;
    }

    if (key === primaryColumn) {
      continue;
    }

    data[key] = respData[key];
  }

  const title = respData[primaryColumn];
  const displayName = type ? `${humanizeString(type)} - ${title}` : title;

  return { displayName, data, urls };
};
