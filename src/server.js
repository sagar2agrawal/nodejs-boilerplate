import config from './config/index.js';
import app from './app.js';

app.listen(config.PORT, () => {
  console.log(`server is running on PORT ${config.PORT}`);
});

// When signaled from the process manager to shut down
process.on('SIGTERM', signal => {
  console.log(`Process ${process.pid} received a SIGTERM signal`);
  process.exit(0);
});

// When abrubtly shutdown using ctrl+c in the commnad line
process.on('SIGINT', signal => {
  console.log(`Process ${process.pid} has been interrupted`);
  process.exit(0);
});