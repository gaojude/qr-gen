const PDFDocument = require('pdfkit');
const fs = require('fs');
const QRCode = require('qrcode');

const generateFfwQr = async (url) => {
    try {
        await QRCode.toFile("qr.png", url,
            {
                type: 'png',
                width: 400,
                errorCorrectionLevel: 'H',
                margin: 1
            }
        );
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('output.pdf'));
        doc.image('in.png', 0, 0, {
            fit: [630, 774]
        });
        doc.image("qr.png", 439, 78, {
            fit: [124, 124]
        });
        doc.end();
    } catch (err) {
        console.log(err)
    }
};

generateFfwQr("desmond.com");