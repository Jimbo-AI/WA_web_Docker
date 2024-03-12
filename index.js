const {apirest} = require('./src/config/apirest')

;(async () => {
    try {
      apirest.listen(3000, () => {
        console.log('Servidor escuchando en puerto 3000')
      })
    } catch (error) {
      console.error(error)
    }
  })()