const cache = require('./cache')
const { GraphQLError } = require('graphql')
const { API } = require('./config')
const request = require('request-promise')

const resolvers = {
  Query: {
    async block(obj, { hash }) {
      console.log('req: hash->', hash);
      if (!hash) {
        return new GraphQLError('query block hash is required!')
      }
      // 获取缓存数据
      const cacheBlock = await cache.getCacheByHash(hash)
      if (cacheBlock) {
        return cacheBlock
      }
      try {
        const data = await request({
          method: 'GET',
          url: API.rawblock(hash),
          json: true
        })
        if (data.error) {
          return new GraphQLError(data.message)
        }
        // 设置缓存
        await cache.setCacheByHash(data)
        return data
      } catch (e) {
        console.log(e);
        return new GraphQLError(e.message || '服务器错误')
      }
    }
  }
}

module.exports = resolvers