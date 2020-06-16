var najax = require('najax')
var readline = require('readline')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const adapter = new FileSync('db.json')
const db = low(adapter)
var check = new RegExp('[a-z]')

function question(){
    rl.question('ma hoc sinh : ',(val)=>{
        if(check.test(val)){
            question()
        }else{
            db.set('info.mahs',val).write()
            rl.question('ma tinh : ',(val)=>{
                if(check.test(val)){
                    question()
                }else{
                    db.set('info.matinh',val).write()
                    rl.question('nam hoc : ',(val)=>{
                        if(check.test(val)){
                            question()
                        }
                        else{
                            db.set('info.namhoc',val).write()
                            rl.question('mat khau : ',(val)=>{
                                db.set('info.matkhau',val).write()
                                rl.close()
                            })
                        }
                    })
                }
            })
        }
    })
}
function getDiem() {
    console.log(1)
    najax({
        url: "https://hocbadientu.vnedu.vn/sllservices/index.php" ,
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            call: 'solienlac.getSodiem',
            mahocsinh: "1800576647",
            key: 'd33e425220d1f1184a9fb9a477055fd6',
            namhoc:'2019',
            tinh_id:"60",
            dot_diem_id:"0",
        },
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Cookie",db.get('info.cookies').value());
        },
        success: function (response) {
            console.log(response)
        },
        timeout: 500000,
        error: function (e) {
            console.log(e)
        }
    });
}
function login(mahs,tinhid,pass,namhoc){
    najax({
        url: "https://hocbadientu.vnedu.vn/sllservices/index.php",
        jsonp: "callback",
        dataType: 'jsonp',
        data: {
            call: 'solienlac.checkSll',
            mahocsinh: mahs,
            tinh_id: tinhid,
            password: pass,
            namhoc: namhoc,
            dot_diem_id:"0"
        },
        success: function (response,a,xhr) {
            if(response.success){
                db.set('info.cookies',xhr.getResponseHeader('Set-Cookie')[0]).write()
                getDiem()            
            }
        },
        timeout: 500000,
        error: function (e) {
            console.log(e)
        }
    });
}


var mahs = db.get('info.mahs').value()
var tinhid = db.get('info.matinh').value()
var pass = db.get('info.matkhau').value()
var namhoc = db.get('info.namhoc').value()

login(mahs,tinhid,pass,namhoc)

if(Object.values(db.get('info').value()).every(val=>val=='')){
    question()
    rl.on('close',()=>{
        var mahs = db.get('info.mahs').value()
        var tinhid = db.get('info.matinh').value()
        var pass = db.get('info.matkhau').value()
        var namhoc = db.get('info.namhoc').value()
        console.log(mahs)
        login(mahs,tinhid,pass,namhoc)
    })
    
}else{
    var mahs = db.get('info.mahs').value()
    var tinhid = db.get('info.matinh').value()
    var pass = db.get('info.matkhau').value()
    var namhoc = db.get('info.namhoc').value()
    login(mahs,tinhid,pass,namhoc)
}

