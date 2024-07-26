import { createClient } from 'redis';
const redisDBPort =6379;

const redisClient = createClient({
    socket: {
        host: '97.74.95.243',
        port: redisDBPort,
        password: 'shikshak-solutions',
       no_ready_check: true,
       auth_pass: 'shikshak-solutions'
    },
    host: '97.74.95.243',
    port: redisDBPort,
    password: 'shikshak-solutions',
    no_ready_check: true,
    auth_pass: 'shikshak-solutions'
});

redisClient.on('error', err => console.log('Redis Client Error', err));

try{
    console.log(process.env.NODE_ENV,'env');
    if(process.env.NODE_ENV == 'PRODUCTION')
    await redisClient.connect();
}catch(err){
    console.log('Redis Client Error', err)
}

export default redisClient;