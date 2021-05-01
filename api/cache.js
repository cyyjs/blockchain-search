/**
 * 数据缓存
 */
const Datastore = require('nedb-promises')
const fs = require('fs')
const cacheFile = '/tmp/blockchain-search/cache.db'
const db = Datastore.create(cacheFile)

const getCacheByHash = (hash) => {
  return db.findOne({hash})
}

const setCacheByHash = (data) => {
  return db.insert(data)
}

// 删除缓存文件
const clear = () => {
  fs.unlinkSync(cacheFile)
}

module.exports = {
  getCacheByHash,
  setCacheByHash,
  clear
}