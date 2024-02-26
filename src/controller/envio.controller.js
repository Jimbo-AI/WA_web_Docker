const { enviarMensajeWSP } = require('../config/wsp/inicializarWSP');
const { Buttons } = require('whatsapp-web.js');
const envioController =(req, res) => {
    const{numero, mensaje,type} = req.body;
    console.log(req.body)
    let mensaje_out=null
    const buttons = new Buttons("Hello Button", [{id:'customId',body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}], 'Hello');
    try{
        if (type=='text'){
            mensaje_out=mensaje;
        }else if(type=='buttons'){            
            mensaje_out=buttons;
        }
        // console.log(mensaje_out);
        const respuesta = enviarMensajeWSP(numero, mensaje_out);
        if (respuesta){
            res.send('Mensaje enviado');
        }else{
            res.send('Error al enviar mensaje');            
        }
    }catch(error){
        const errorController= `Error al enviar mensaje a ${numero}`;
        console.error(errorController, error);
        res.status(500).send({mensaje:errorController});
    }
}

module.exports = {
    envioController
}