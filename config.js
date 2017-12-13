module.exports = {
    server_port: 3000,
    db_url: 'mongodb://localhost:27017/local',

    db_schemas: [{
        file: './cell_schema',
        collection: 'network',
        schemaName: 'CellSchema',
        modelName: 'CellModel'
    }],

    route_info: [
        { file: './user', path: '/', method: 'index' },
        { file: './user', path: '/process/addcell', method: 'addcell', type: 'post' }
    ]


}