const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../templates/config.json');

const enviarMensajeRecibido=async (numero, mensaje)=>{
    try{
        const customerID = JSON.parse(fs.readFileSync (filePath, 'utf8')).customerID;
        const conversationID='';
        console.log('Customer ID', customerID);
        console.log('Conversation ID', conversationID);
        const URL='https://xjbxulvq7rxvpj357gitovanhe0qqxyk.lambda-url.us-east-1.on.aws/webhook/whatsapp_zero'
        const opciones={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({numero, mensaje, customerID, conversationID})
        }
        const respuesta=await fetch(URL, opciones);
        if (respuesta.status!==200){
            const mensajeError=`Error al enviar mensaje al webhook del clientid: ${numero}`;
            console.error(mensajeError, respuesta);            
        }
        const data=await respuesta.json();
        console.log('Mensaje enviado al webhook del', numero, 'exitosamente'); 
        console.log(data);       
    }catch(error){
        const mensajeError=`Error al enviar mensaje al webhook del clientid: ${numero}`;
        console.error(mensajeError, error);
    }
}
module.exports={
    enviarMensajeRecibido
}