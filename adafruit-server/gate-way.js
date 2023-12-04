import mqtt from 'mqtt';

const realtimeUpdate = (io) => {
  const username = 'theloc3101';
  const key = 'aio_unJU27qNA5xpveMTxiJGmG3Bgufm';
  const host = 'mqtt://io.adafruit.com';
  const client = mqtt.connect(host, {
    username: username,
    password: key,
  });

  client.on('connect', () => {
    console.log('Connected to adafruit');
    client.subscribe(`${username}/feeds/device1`);

    client.subscribe(`${username}/feeds/device2`);

    client.subscribe(`${username}/feeds/device3`);

    client.subscribe(`${username}/feeds/device4`);

    // client.subscribe(`${username}/feeds/person`);
  });

  client.on('message', (topic, message) => {
    let data = message;

    if (topic.endsWith('devices1')) {
      //TODO:have to check which is this device
      // Emit a "fanUpdate" event with the new fan data
      io.emit('fanUpdate', { fan: parseInt(data) });
      console.log(`Fan: ${data}`);
    } else if (topic.endsWith('devices2')) {
      // Emit a "lightUpdate" event with the new light data
      io.emit('ledUpdate', { led: parseInt(data) });
      console.log(`Light from gate-way: ${data}`);
    }
  });
};

export default realtimeUpdate;
