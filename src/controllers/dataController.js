import { adaRequest } from '../utils/axiosUtils.js';
import { handleReturn } from '../utils/handleResponse.js';
import { publishData } from '../utils/mqttUtils.js';

export const lastFan = async (req, res, next) => {
  adaRequest
    .get('/feeds/yolo-fan/data/last')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'yolo-fan',
        message: 'successful',
      });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};

export const lastLed = async (req, res, next) => {
  adaRequest
    .get('/feeds/yolo-led/data/last')
    .then(({ data }) => {
      res.status(200).json({
        ...data,
        feed_key: 'yolo-led',
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
      publishData('yolo-fan', temperature, (result) =>
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
      publishData('yolo-led', light, (result) =>
        handleReturn(result, res, next)
      );
    } else {
      res.status(400);
      return next(new Error('Value is invalid'));
    }
  }
};
