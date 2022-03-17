const fs = require('fs')
const { Client } = require('@elastic/elasticsearch');
const { dirname } = require('path')

module.exports = function elasticSearch() {

  const appDir = dirname(require.main.filename);

  const client = new Client({
      node: process.env.ELASTIC_HOST,
      auth: {
        username: process.env.ELASTIC_USERNAME,
        password: process.env.ELASTIC_PASSWORD
      },
      ssl: {
        ca: fs.readFileSync(appDir + '/elasticSearch/http_ca.crt'),
        rejectUnauthorized: true,
      }
  })

  client.ping(
    {}, 
    {requestTimeout: 30000}, 
    (error) => error ? console.error('Elasticsearch cluster is down!') : console.log('Elasticsearch is connected successfully!')
  )

  return client
}