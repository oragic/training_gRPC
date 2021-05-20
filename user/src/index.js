const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc');

const implamentation = require('./implementations')

require('./database')

const packageDefinition = protoLoader.loadSync(
    path.resolve(__dirname,'pb','user.proto'),
    
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
const proto= grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server()

Object.keys(proto).forEach(key =>{
    server.addService(proto[key].service, implamentation[key])
})