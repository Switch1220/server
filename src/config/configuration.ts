export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  eventPort: parseInt(process.env.EVENT_PORT, 10) || 80,
  eventOptions: { cors: true },
  eventName: process.env.EVENT_NAME || 'events',
});
