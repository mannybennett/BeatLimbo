const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://beatlimbo-frontend.onrender.com',
      changeOrigin: true,
    })
  );
}; 