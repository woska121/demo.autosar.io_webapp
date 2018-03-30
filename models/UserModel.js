var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var UserSchema = new Schema({
    userid : {
        type : String,
        required : [true, '아이디는 필수입니다.']
    },
    password : {
        type : String,
        required : [true, '패스워드는 필수입니다.']
    },
    displayname : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    // 관리자권한  1(true) : 관리자, 0(false) : 일반회원
    authority : {
        type : Boolean,
        default : false
    },
    // 활성상태 1(true) : 활성, 0(false) : 비활성 -> 탈퇴처리
    state : {
        type : Boolean,
        default : true
    },
    dormant_date : { // 휴면 전환 날짜
        type : Date
    },    
    dormant_mail_send : { // 휴면 전환 알림 메일 전송 여부
        type : Boolean,
        default : false
    },
    // 회원 휴면상태 여부 1(true) : 휴면상태, 0(false) : 정상상태 
    dormant_state : {
        type : Boolean,
        default : false,
    },
    // 탈퇴일자 
    withdraw_at : {
        type : Date
    },
    // 가입상태 이메일인증완료 1(true), 이메일인증미완료 0(false)
    email_verification_state : {
        type : Boolean,
        default : false
    },
    login_at : {
        type : Date
    }
});

UserSchema.virtual('getDate').get(function() {
    var date = new Date(this.created_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    };
});

UserSchema.virtual('getWithdrawDate').get(function() {
    var date = new Date(this.withdraw_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate(),
        hour : date.getHours(),
        minutes : date.getMinutes()
    };
});

UserSchema.virtual('getDormantDate').get(function() {
    var date = new Date(this.dormant_date);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate()
    }
});

UserSchema.virtual('getLoginDate').get(function() {
    var date = new Date(this.login_at);
    return {
        year : date.getFullYear(),
        month : date.getMonth()+1,
        day : date.getDate(),
        hour : date.getHours(),
        minutes : date.getMinutes()
    }
})

UserSchema.plugin( autoIncrement.plugin , {model : "user", field : "id", startAt : 1} );
module.exports = mongoose.model('user', UserSchema);


