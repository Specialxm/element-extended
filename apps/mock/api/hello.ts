import { eventHandler } from 'h3'

export default eventHandler(() => {
  return {
    message: 'Hello from Nitro mock API!',
    time: new Date().toISOString(),
  }
})
