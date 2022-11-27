const crypto = require("crypto")
const algorithm = 'aes-256-cbc'
const key = "Blockbuster-karthiknallala-mypro" // must be of 32 characters
const iv = crypto.randomBytes(16)


let getEncrypt = (password) => {
    var dict = {
        'encryptedData': '',
        'base64date': ''

    }
    let message = password;
    console.log(message + ' is the message')
    const iv = crypto.randomBytes(16);
    // encrypt the string using encryption algorithm, private key and initialization vector
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    // console.log(encryptedData);

    // convert the initialization vector to base64 string
    const base64data = Buffer.from(iv, 'binary').toString('base64');
    dict.encryptedData = encryptedData;
    dict.base64date = base64data;
    // console.log(dict);
    return dict;

}
var getdecrypt = (qpass, base64d) => {

    const origionalData = Buffer.from(base64d, 'base64')
    // decrypt the string using encryption algorithm and private key
    const decipher = crypto.createDecipheriv(algorithm, key, origionalData);
    let decryptedData = decipher.update(qpass, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    qpass = decryptedData;
    return qpass;
}

module.exports = { getEncrypt, getdecrypt };



