const superagent = require("superagent");
const apiHost = "http://localhost:3000";
const apiUrl = `${apiHost}/swapi`;

const defaultUrl = "https://swapi.dev/api";

const get = (url = defaultUrl) =>
  superagent
    .post(apiUrl)
    .send({ url })
    .then((resp) => {
      if (resp && resp.body && resp.body.data) {
        return resp.body.data;
      }
    });

export const swapi = { get };
