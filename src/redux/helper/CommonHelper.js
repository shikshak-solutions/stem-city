//import React from "react";
//import CryptoJS from "crypto-js";
export const generateUniqueIdForBlock=()=> {
    let str = 'abcdeABCDEFGHIJKfghijklmnopqrstuvwxyzLMNOPQRSTUVWXYZ0123456789';
    let char = '',
        genID = '';

    while(genID.length < 8) {
        char = new Date().getSeconds()+str.charAt(Math.floor(Math.random() * str.length));
        genID += char;
    }
    return genID;
}
export const encryptData=(messageToencrypt)=>{
  /*  let DataVector = CryptoJS.enc.Hex.parse('101112131415161718191a1b1c1d1e1f');
    //16 char need
    let secretkey = CryptoJS.enc.Hex.parse('bcb04b7e103a0cd8b54763051cef08bc55abe029fdebae5e1d417e2ffb2a00a3');
    // 32 Char need
    let encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey, {iv: DataVector});
    return encryptedMessage.toString();*/
}

