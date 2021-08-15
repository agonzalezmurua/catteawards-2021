import Axios from "axios";

export const WebClient = Axios.create({ withCredentials: true });

/**
 * Use along with SWR
 * @param {string} url
 * @returns
 */
export const WebClientFetcher = (url) =>
  Axios.get(url).then(({ data }) => data);
