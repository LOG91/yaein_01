var index = function(req, res) {
    console.log('/index 호출됨.');
    var database = req.app.get('database');
    if (database.db) {
        database.CellModel.findAll(function(err, results) {
            if (err) {
                console.error('셀 리스트 조회 중 오류 발생 : ' + err.stack);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>셀 리스트 조회 중 오류 발생</h2>');
                res.write('<p>' + err.stack + '</p>');
                res.end();

                return;
            }
            if (results) {
                console.dir(results);
                var context = { results: results };
                req.app.render('index', context, function(err, html) {
                    res.end(html);
                })
            }
        })
    }
}

var addcell = function(req, res) {
    console.log('/process/addcell 호출됨.');
    var paramCellName = req.body.cellname || req.query.cellname;
    var paramNwLeader = req.body.nwleader || req.query.nwleader;
    var database = req.app.get('database');

    if (database.db) {
        addCell(database, paramCellName, paramNwLeader, function(err, result) {
            if (err) { throw err; }

            // 결과 객체 확인하여 추가된 데이터 있으면 성공 응답 전송
            if (result && result.insertedCount < 0) {
                console.dir(result);
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();

            } else {
                var context = { cellName: paramCellName, nwLeader: paramNwLeader };
                req.app.render('addcell', context, function(err, html) {
                    if (err) {
                        console.error('뷰 랜더링 중 오류 발생 : ' + err.stack);
                        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                        res.write('<h2>뷰 렌더링 중 오류 발생</h2>');
                        res.write('<p>' + err.stack + '</p>');
                        res.end();

                        return;
                    }

                    console.log("rendered : " + html);

                    res.end(html);
                });
            }
        });
    } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charet=utf8' });
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
}
var addCell = function(database, cellname, nwleader, callback) {
    console.log('addCell 호출됨.');

    // CellModel 인스턴스 생성
    var cell = new database.CellModel({ "cellName": cellname, "nwLeader": nwleader });

    // save()로 저장
    cell.save(function(err) {
        if (err) {
            callback(err, null);
            return;
        }

        console.log("사용자 데이터 추가함.");
        callback(null, cell);
    })
}

module.exports.index = index;
module.exports.addcell = addcell;