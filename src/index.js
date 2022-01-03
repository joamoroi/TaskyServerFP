const server = require('./server');
require('./database')

server.listen(server.get('PORT'), () => {
  console.log(`Server running on port: ${server.get('PORT')}`);
});
