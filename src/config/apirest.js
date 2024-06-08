const express = require('express')
const { envio_masivoController } = require('../controller/envio_masivo.controller')
const { envioController } = require('../controller/envio.controller')
const { newSessionController } = require('../controller/new_session.controller')
const { getSessionState } = require('../controller/health_check_controller')
const {qr_controller} = require('../controller/qr_controller')
const apirest = express()
apirest.use(express.json())

apirest.post('/envio', envioController)
apirest.post('/envio_masivo', envio_masivoController)
apirest.get('/session', newSessionController)
apirest.get('/status', getSessionState)
apirest.get('/qr', qr_controller)
module.exports = {
    apirest
    }