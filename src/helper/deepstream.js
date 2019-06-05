import deepstream from 'deepstream.io-client-js'
import server from './server'
const options = {
    reconnectIntervalIncrement: 10000,
    maxReconnectInterval: 30000,
    maxReconnectAttempts: Infinity,
    heartbeatInterval: 60000
};

const ds = deepstream(`${server.ws.address}:${server.ws.port}/bcelconnect`, options)

export default ds;