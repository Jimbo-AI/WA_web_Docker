const {statusCheck} = require('../config/wsp/inicializarWSP')

const getSessionState = async (req, res) => {
    try{
        const state = await statusCheck();
        // console.log(state);
        res.send(state);
    }catch(error){
        const errorController= `Error al obtener estado de la sesión`;
        // console.error(errorController, error);
        // res.status(500).send({mensaje:errorController});
        res.send({status: 'disconnected'});
    }
}

module.exports = {
    getSessionState
}