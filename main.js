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
            let a = response.diem
            db.set('diem',a).write()
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
                db.set('diem',[]).write()
                getDiem()            
            }
        },
        timeout: 500000,
        error: function (e) {
            console.log(e)
        }
    });
}

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
    rl.close()
}


db.get('diem').value().map(val=>{
    if(val.hoc_ky==1){
        console.log('HK1')
        console.log('--------------------------')
        val.mon_hoc.map(val=>{
            switch (val.ten_mon_hoc) {
                case 'Toán học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break;
                case 'Vật lí':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break;
                case 'Hóa học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Sinh học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Tin học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Ngữ văn':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Lịch sử':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Địa lí':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Ngoại ngữ':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'GDCD':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Công nghệ':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Thể dục':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'GDQP':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                default:
                    break;
            }
        })
        console.log('--------------------------')
        console.log('\n')
    }
    if(val.hoc_ky==2){
        console.log('HK2')
        console.log('--------------------------')
        val.mon_hoc.map(val=>{
            switch (val.ten_mon_hoc) {
                case 'Toán học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break;
                case 'Vật lí':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break;
                case 'Hóa học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Sinh học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Tin học':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Ngữ văn':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Lịch sử':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Địa lí':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Ngoại ngữ':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'GDCD':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Công nghệ':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'Thể dục':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                case 'GDQP':
                    console.log(`${val.ten_mon_hoc}`)
                    if(val.M[0]!=undefined){
                        console.log('M:')
                        val.M.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.P[0]!=undefined){
                        console.log('15P:')
                        val.P.map(val2=>console.log(`\t ${val2.diem}`))    
                    }
                    if(val.V[0]!=undefined){
                        console.log('45P:')
                        val.V.map(val2=>console.log(`\t ${val2.diem}`))
                    }
                    if(val.HK[0]!=undefined){
                        console.log(`HK: ${val.HK[0].diem}`)
                        console.log(`TK: ${val.TK[0].diem}`)
                    }
                    console.log('\n')
                    break
                default:
                    break;
            }
        })
        console.log('--------------------------')
    }
})