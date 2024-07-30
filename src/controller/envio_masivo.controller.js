const { enviarMensajeWSP } = require('../config/wsp/inicializarWSP');

const envio_masivoController = async (req, res) => {
    const lista_mensajes = req.body;
    console.log(req.body);
    let resultados = [];

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    try {
        const resultados = [];
        for (const { numero, mensaje } of lista_mensajes) {
            try {
                await delay(3000); // Espera de 5 segundos
                const data = await enviarMensajeWSP(numero, mensaje);
                if (data) {
                    resultados.push({ numero: numero, mensaje: 'Mensaje enviado' });
                } else {
                    resultados.push({ numero: numero, mensaje: 'Error al enviar mensaje' });
                }
            } catch (error) {
                resultados.push({ numero: numero, mensaje: `Error al enviar mensaje a ${numero}`, error: error.message });
            }
        }
        console.log(resultados);
        res.status(200).send({ resultados });
    } catch (error) {
        const errorController = `Error al procesar los mensajes`;
        console.error(errorController, error);
        res.status(500).send({ mensaje: errorController });
    }
};

module.exports = {
    envio_masivoController
};
