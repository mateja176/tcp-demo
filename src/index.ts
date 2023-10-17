import net from 'net';

const power = process.argv[2] === 'on' ? 'on' : 'off';

const socket = new net.Socket();
socket.connect(55443, '192.168.1.4', () => {
  console.log('Connected');
  socket.write(
    JSON.stringify({
      id: 0,
      method: 'set_power',
      params: [power, 'smooth', 500, 0],
    }).concat('\r\n'),
    (err) => {
      if (err) {
        console.log('failed to send message: ', err);
      }
    },
  );
});

socket.on('data', (data) => {
  console.log('Received: ', data.toString());
  socket.destroy();
});

socket.on('close', () => {
  console.log('Connection closed');
});
