const {inicializarWSP} = require('../config/wsp/inicializarWSP');

const newSessionController =(req, res) => {
    const clientId = req.query['clientId'];
    try{          
        initSession(req, res);                        
    }catch(error){
        const errorController= `Error al iniciar sesión`;
        console.error(errorController, error);
        res.status(500).send({mensaje:errorController});
    }
}
const initSession = async (req, res) => {
    const clientId = req.query['clientId'];
    try{   
        await inicializarWSP(clientId,res,true);                        
    }catch(error){
        const errorController= `Error al iniciar sesión`;
        console.error(errorController, error);
        res.status(500).send({mensaje:errorController});
    }
}
module.exports = {
    newSessionController
}