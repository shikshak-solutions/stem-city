import redisClient from './redis.js'

// This function is used to set cache key-value pair in Redis
export function setCache(key, value) {
    try{
        redisClient.set(key, value, (error, result) => {
            if (error) {
                console.error('Error setting cache:', error);
            } else {
                console.log('Cache set successfully:', result);
            }
        });
       // redisClient.disconnect();
    }catch(error){
        console.log(error);
    }

}

// This function is used to get cache value key in Redis
export async function getCache(key) {
    try {
        let value = await redisClient.get(key);
        //redisClient.disconnect();
        return value;
    }
    catch (err){
        console.log(err)
    }
}
// This function is used to push cache value key in Redis
export async function pushValueInKey(key,value) {
    return await redisClient.lPush(key, value);
}

// This function is used to resetting a value from Redis
export async function resetKey(key) {
    return await redisClient.del(key);
}

// This function is used to updating key value from Redis
export async function updateKey(key,columns,values,id) {
    const result = await redisClient.get(key);
    let data = JSON.parse(result);
    if(data){
        columns.map((column,i) =>{
            data[id][column]=values[i];
        })
        redisClient.set(`${key}`,JSON.stringify(data))
    }
    return data;
}
// This function is used to updating key value from Redis
export async function deleteDataByKey(key,id) {
    const result = await redisClient.get(key);
    let data = JSON.parse(result);
    if(data){
        delete data[id];
        redisClient.set(`${key}`,JSON.stringify(data))
    }
    return data;
}


// This function is used to updating key value from Redis
export async function updateCountingKey(key,column,value,id) {
    const result = await redisClient.get(key);
    let data = JSON.parse(result);
    if(data){
        data[id][column]=data[id][column]+value;
        redisClient.set(`${key}`,JSON.stringify(data))
    }
    return data;
}