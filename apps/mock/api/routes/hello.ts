export default defineEventHandler(() => {
  return {
    message: 'Hello from Nitro mock API!',
    time: new Date().toISOString(),
  }
})
