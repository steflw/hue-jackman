import expect from 'expect';
import cache, { getCachedResponse } from '../../src/hue/cache';

const livingRoom = {
  0: {
    name: 'living room'
  }
};

describe('cache.js', function () {
  afterEach(() => {
    cache.flushdb()
  });
  describe('getCachedResponse', function () {
    it('should return expected value for existing key', async function () {
      cache.set('rooms', JSON.stringify(livingRoom));
      const response = await getCachedResponse('rooms');
      expect(response).toEqual(livingRoom);
    });

    it('should return null if key does not exist in cache', async function () {
      const response = await getCachedResponse('somethingUnexpected');
      expect(response).toEqual(null);
    });
  })
});
