const { inicializarWSP,getClientWSPsession } = require('./src/config/wsp/inicializarWSP')
const {apirest} = require('./src/config/apirest')


;(async () => {
    try {
      //await inicializarWSP('5555059804')        
      apirest.listen(3000, () => {
        console.log('Servidor escuchando en puerto 3000')
      })
    } catch (error) {
      console.error(error)
    }
  })()