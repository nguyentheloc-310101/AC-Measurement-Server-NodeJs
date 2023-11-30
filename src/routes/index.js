import dataRouter from './dataRoutes.js';
// const swaggerJSDocs = YAML.load("./routes/api.yaml");

const route = (app) => {
  app.use('/api/data', dataRouter);
  // app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDocs))
};

export default route;
