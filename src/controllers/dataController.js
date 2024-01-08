import { adaRequest } from '../utils/axiosUtils.js';
import { handleReturn } from '../utils/handleResponse.js';
import { publishData } from '../utils/mqttUtils.js';

export const dataFan = async (req, res, next) => {
  adaRequest
    .get('/feeds/device1/data')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'device1',
        message: 'successful',
      });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};
// export const dataTemperature = async (res, next) => {
//   adaRequest
//     .get('https://io.adafruit.com/api/v2/theloc3101/feeds/temperature')
//     .then(({ data }) => {
//       res.status(200).json({
//         ...data,
//         feed_key: 'temperature',
//         message: 'successful',
//       });
//     })
//     .catch((error) => {
//       res.status(400);
//       return next(new Error(error.message));
//     });
// };
export const dataTemp = async (req, res, next) => {
  adaRequest
    .get('https://io.adafruit.com/api/v2/theloc3101/feeds/temperature/data')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'temperature',
        message: 'successful',
      });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};
export const dataHumid = async (req, res, next) => {
  adaRequest
    .get('https://io.adafruit.com/api/v2/theloc3101/feeds/humidity/data')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'humidity',
        message: 'successful',
      });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};

export const dataLed = async (req, res, next) => {
  adaRequest
    .get('https://io.adafruit.com/api/v2/theloc3101/feeds/device2/data')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'device2',
        message: 'successful',
      });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};

// set value to adafruit
export const setFan = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error('Value is not sent!'));
  } else {
    let temperature = parseInt(value);
    if (temperature >= 0 && temperature <= 100) {
      publishData('device1', temperature, (result) =>
        handleReturn(result, res, next)
      );
    } else {
      res.status(400);
      return next(new Error('Value is invalid'));
    }
  }
};

export const toggleLed = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error('Value is not sent!'));
  } else {
    let light = parseInt(value);
    if (light >= 0 && light <= 1) {
      publishData('device2', light, (result) =>
        handleReturn(result, res, next)
      );
    } else {
      res.status(400);
      return next(new Error('Value is invalid'));
    }
  }
};
