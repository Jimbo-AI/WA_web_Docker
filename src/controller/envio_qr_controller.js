const fs = require('fs');
const path = require('path');

const enviarQr = async (number,QR,res) => {
    try{
        const example_file = path.join(__dirname, '../templates/qr.html');
        const file_new = path.join(__dirname, '../templates/qr_'+number+'.html');
        fs.readFile(example_file, 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            } else {
                const newData = data.replace(/'__QR_CODE__'/g, "'"+QR+"'");
                fs.writeFile(file_new, newData, 'utf8', function (err) {
                    if (err) return console.log(err);
                });
            }
        });
        console.log(QR);
        res.send(QR);
    }catch(error){
        const mensajeError=`Error al enviar QR`;
        console.error(mensajeError, error);
        res.status(500).send({mensaje:mensajeError});
    }
}
module.exports = {
    enviarQr
}