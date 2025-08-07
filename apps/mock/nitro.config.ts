import errorHandler from './error'

process.env.COMPATIBILITY_DATE = new Date().toISOString()
export default defineNitroConfig({
  preset: 'vercel',
  vercel: {
    config: {
      bypassToken: process.env.VERCEL_BYPASS_TOKEN,
    },
  },
  devErrorHandler: errorHandler,
  errorHandler: '~/error',
  routeRules: {
    '/api/**': {
      cors: true,
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers':
          'Accept, Authorization, Content-Length, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since, X-CSRF-TOKEN, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
        // 不要用 *，要设置明确的 origin，例如：
        'Access-Control-Allow-Origin': 'https://your-frontend-domain.vercel.app',
        'Access-Control-Expose-Headers': '*',
      },
    },
  },
})
