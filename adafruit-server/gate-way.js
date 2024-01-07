import mqtt from 'mqtt';

const realtimeUpdate = (io) => {
  const username = 'theloc3101';
  const key = 'aio_MSLa80LuIuRtM9aP68apG9hB0OgA';
  const host = 'mqtt://io.adafruit.com';
  const client = mqtt.connect(host, {
    username: username,
    password: key,
  });

  client.on('connect', () => {
    console.log('Connected to adafruit');
    client.subscribe(`${username}/feeds/device1`);

    client.subscribe('theloc3101/feeds/device2');

    // client.subscribe(`${username}/feeds/device3`);

    // client.subscribe(`${username}/feeds/device4`);

    // client.subscribe(`${username}/feeds/person`);
  });

  client.on('message', (topic, message) => {
    let data = message;

    if (topic.endsWith('yolo-sensor')) {
      // Emit a "temperatureUpdate" event with the new temperature data
      io.emit('temperatureUpdate', { temperature: parseInt(data) });
      console.log(parseInt(data));
      console.log(`Temperature: ${data}°C`);
    } else if (topic.endsWith('dht20-humid')) {
      // Emit a "humidityUpdate" event with the new humidity data
      io.emit('humidityUpdate', { humidity: parseInt(data) });
      console.log(parseInt(data));
      console.log(`Humidity: ${data}%`);
    } else if (topic.endsWith('yolo-fan')) {
      // Emit a "fanUpdate" event with the new fan data
      io.emit('fanUpdate', { fan: parseInt(data) });
      console.log(`Fan: ${data}`);
    } else if (topic.endsWith('device2')) {
      // Emit a "lightUpdate" event with the new light data
      io.emit('ledUpdate', { led: parseInt(data) });
      console.log(`Light from gate-way: ${data}`);
    }
  });
};

export default realtimeUpdate;
