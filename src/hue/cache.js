import redis from 'redis';
import { promisify } from 'util'

const cache = redis.createClient('redis://redis:6379');
console.log('------- env -----', process.env)
const getCacheAsync = promisify(cache.get).bind(cache);

cache.flushdb();

cache.on('connect', () => {
  console.log('Redis client connected');
});

cache.on('error', err => {
  console.log(`Redis: something went wrong ${err}`)
});

const handleRedisError = err => err && console.log(err);

export const cacheResponse = res => {
  const url = res.config.url;
  const key = url.replace(res.config.baseURL, '');
  cache.set(key, JSON.stringify(res.data), 'EX', 600, handleRedisError);
};

export const getCachedResponse = key =>
  getCacheAsync(key)
  .then(value => value && JSON.parse(value))
  .catch(err => console.log(`error fetching ${err}`));

export default cache
