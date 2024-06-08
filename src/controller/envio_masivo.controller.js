const { enviarMensajeWSP,statusCheck } = require('../config/wsp/inicializarWSP');
const { Buttons } = require('whatsapp-web.js');
const envio_masivoController =(req, res) => {
    const{lista_numeros, mensaje,type} = req.body;
    console.log(req.body)
    let mensaje_out=null    
    let resultados=[];
    let listnumeros=lista_numeros
    try{        
            if (type=='text'){
                mensaje_out=mensaje;
            }else if(type=='buttons'){            
                mensaje_out=buttons;
            }
            // console.log(mensaje_out);
            for (let i=0;i<listnumeros.length;i++){
                const numero = listnumeros[i];
                const respuesta = enviarMensajeWSP(numero, mensaje_out);
                console.log(respuesta);
                respuesta.then((data)=>{
                    if (data){
                        resultados.push({numero:numero,mensaje:'Mensaje enviado'});
                    }else{
                        resultados.push({numero:numero,mensaje:'Error al enviar mensaje'});
                    }
                }).catch((error)=>{
                    resultados.push({numero:numero,mensaje:"Error al enviar mensaje a "+numero, error:"Error al enviar mensaje a "+numero});
                });
            }
            res.status(200).send({resultados});                  
    }catch(error){
        const errorController= `Error al enviar mensaje a ${numero}`;
        console.error(errorController, error);
        res.status(500).send({mensaje:errorController});
    }

}

module.exports = {
    envio_masivoController
}