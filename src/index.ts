import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import { api_port, database } from '../configuration.json'
import { logger, initializePool } from '@services'
import { log, handleErrors } from '@middlewares'
import routes from './routes'

const main = async () => {

  // Inizializzazione del pool di connessione
  initializePool(database)

  const app = express()
  const webserver = http.createServer(app)

  app.use(bodyParser.json())

  const listeningCallback = () => {
    logger.info(`Server listening on port ${api_port}`)
    app.use(log)
    app.use(routes)
    app.use(handleErrors)
  }

  // TODO: gestire errore di binding

  webserver.listen(api_port, listeningCallback)
}

main().catch(logger.error)