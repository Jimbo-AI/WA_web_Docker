const { enviarMensajeWSP,statusCheck } = require('../config/wsp/inicializarWSP');
const { Buttons } = require('whatsapp-web.js');
const envio_masivoController = async (req, res) => {
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
            const promesas = listnumeros.map((numero) => {
                return enviarMensajeWSP(numero, mensaje_out)
                    .then((data) => {
                        if (data) {
                            resultados.push({ numero: numero, mensaje: 'Mensaje enviado' });
                        } else {
                            resultados.push({ numero: numero, mensaje: 'Error al enviar mensaje' });
                        }
                    })
                    .catch((error) => {
                        resultados.push({ numero: numero, mensaje: `Error al enviar mensaje a ${numero}`, error: `Error al enviar mensaje a ${numero}` });
                    });
            });
    
            // Esperar a que todas las promesas se resuelvan
            await Promise.all(promesas);
    
            console.log(resultados);
            res.status(200).send({ resultados });                  
    }catch(error){
        const errorController= `Error al enviar mensaje a ${numero}`;
        console.error(errorController, error);
        res.status(500).send({mensaje:errorController});
    }

}

module.exports = {
    envio_masivoController
}