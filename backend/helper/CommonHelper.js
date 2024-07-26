import axios from "axios";
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
export const sendOtpSmsToMobile=(payload)=> {
    let mobileNo = payload?.mobile;
    let otp = payload?.otp;
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://2factor.in/API/V1/ee9c4bac-b789-11ee-8cbb-0200cd936042/SMS/${mobileNo}/${otp}/LOG+IN+OTP+SMS`,
        headers: { }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}