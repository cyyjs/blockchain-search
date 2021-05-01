// 相关配置
module.exports = {
  IS_DEV: process.env.NODE_ENV === 'development',
  PORT: process.env.BLOCKLET_PORT || 4000,
  API: {
    rawblock: (hash) => `https://blockchain.info/rawblock/${hash}`
  }
}
