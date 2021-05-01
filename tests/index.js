/**
 * 测试脚本
 */
const spawn = require('cross-spawn')

const server = spawn('node', ['blocklet.js'])

server.stdout.on('data', str => {
  str = str.toString()
  console.log(str);

  if (str.includes('localhost:')) {
    const test = spawn('yarn', ['test:e2e'], { stdio: 'inherit' })
    test.on('exit', str => {
      process.kill(server.pid)
    })
  }
})

