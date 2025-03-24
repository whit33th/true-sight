import NodeCache from "node-cache";
const apiCache = new NodeCache({
  stdTTL: 60 * 60 * 24,
  checkperiod: 60 * 60,
});

export default apiCache;
