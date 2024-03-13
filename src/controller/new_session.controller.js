const {inicializarWSP} = require('../config/wsp/inicializarWSP');
const fs = require('fs');
const path = require('path');

const newSessionController =(req, res) => {
    const clientId = req.query['clientId'];
    const customerID = req.query['customerID'];
    const ip=req.query['ip'];    
    try{          
        const jsonSting = JSON.stringify({clientId:clientId, customerID:customerID, ip:ip});
        const filePath = path.join(__dirname, '../templates/config.json');       
        fs.writeFileSync(filePath, jsonSting);
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