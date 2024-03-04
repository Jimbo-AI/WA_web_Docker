const express = require('express')
var cors = require('cors')

const { envioController } = require('../controller/envio.controller')
const { newSessionController } = require('../controller/new_session.controller')
const { getSessionState } = require('../controller/health_check_controller')
const apirest = express()
apirest.use(express.json())
apirest.use(cors())

apirest.post('/envio', envioController)
apirest.get('/session', newSessionController)
apirest.get('/status', getSessionState)
module.exports = {
    apirest
    }