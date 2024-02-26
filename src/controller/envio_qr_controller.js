const enviarQr = async (number,QR,res) => {
    try{
        console.log(QR);
        res.send(QR);
    }catch(error){
        const mensajeError=`Error al enviar QR`;
        console.error(mensajeError, error);
        throw new Error(mensajeError);
    }
}
module.exports = {
    enviarQr
}