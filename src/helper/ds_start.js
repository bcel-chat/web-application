const DeepstreamServer = require('deepstream.io')

const server = new DeepstreamServer("../conf/config.yml")

server.start()