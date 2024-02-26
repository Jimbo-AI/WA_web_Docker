const enviarMensajeRecibido=async (numero, mensaje)=>{
    try{
        const URL='http://localhost:8080/webhook'
        const opciones={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({numero, mensaje})
        }
        const respuesta=await fetch(URL, opciones);
        if (respuesta.statusText != 'OK'){
            throw new Error('Error en la respuesta de la API');            
        }
        const data=await respuesta.json();
        console.log('Respuesta de la API');        
    }catch(error){
        const mensajeError=`Error al enviar mensaje a ${numero}`;
        console.error(mensajeError, error);
        throw new Error(mensajeError);
    }
}
module.exports={
    enviarMensajeRecibido
}