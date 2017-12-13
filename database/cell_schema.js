var Schema = {};

Schema.createSchema = function(mongoose) {

    // 스키마 정의
    CellSchema = mongoose.Schema({
        cellName: { type: String, required: true },
        nwLeader: { type: String, required: true }
    });
    // 스키마에 static 메소드 추가
    CellSchema.static('findById', function(id, callback) {
        return this.find({ id: id }, callback);
    });

    CellSchema.static('findAll', function(callback) {
        return this.find({}, callback);
    });

    console.log('CellSchema 정의함.');

    return CellSchema;
}

module.exports = Schema;