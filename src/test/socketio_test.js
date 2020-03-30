import io from 'socket.io-client'

const socket = io('ws://localhost:4000')

socket.on('receiveMsg', function (data) {
  console.log('接收消息：', data)
})

socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('发送消息：', {name: 'Tom', date: Date.now()})
