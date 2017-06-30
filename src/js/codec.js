var saveData = {};
var ProtoBuf = dcodeIO.ProtoBuf;
var ByteBuffer = ProtoBuf.ByteBuffer;
var MsgCmdDef = ProtoBuf.loadProtoFile("js/Common.proto").build("MsgCmdDef");

var C2SViewPlayerRanking=ProtoBuf.loadProtoFile("js/HttpParam.proto").build("C2SViewPlayerRanking");   //玩家排行榜
var S2CViewPlayerRanking=ProtoBuf.loadProtoFile("js/HttpParam.proto").build("S2CViewPlayerRanking");

var C2SLastPlayerRanking = ProtoBuf.loadProtoFile("js/HttpParam.proto").build("C2SLastPlayerRanking");   //玩家上赛季排行榜
var S2CLastPlayerRanking = ProtoBuf.loadProtoFile("js/HttpParam.proto").build("S2CLastPlayerRanking");

function addCookie(name,value,timeout){
	var d=new Date();
	d.setDate(d.getDate()+timeout);
	document.cookie = name + '=' + value + ';expires=' + d;
};
function removeCookie(name){
	addCookie(name,1,-1);
};

function DealMsg(data){
	var msg=DecodeToProto(data);
	//处理逻辑
	var data=msg.data;
}


function Decode(rcvdata){
    var len=rcvdata.byteLength;
    var dv = new DataView(rcvdata);
    //var b8=new Uint16Array(rcvdata);
    var msgid=dv.getUint16(0,false);

	var msg={};
	msg.id=msgid;
	msg.data=null;
	if(len>2){
		var bb=new ArrayBuffer(len-2);
		var b8=new Uint8Array(bb);
		for(var i=0;i<len-2;i++){
			b8[i]=dv.getUint8(2+i);
		}
		msg.data=bb;
	}

	DealMsg(msg);

}
function Encode(msg){
	var msgid=msg.id;
	var bytes=msg.msg;
	var len=0;
	if(bytes!=null){
		len=bytes.byteLength;
	}
    var bb=new ArrayBuffer(2+len);
    var buf=new ByteBuffer(2);
    buf.writeShort(msgid);
    var b8s=buf.view;
    var b8=new Uint8Array(bb);
    b8[0]=b8s[0];
    b8[1]=b8s[1];
    if(bytes!=null){
        b8s=new Uint8Array(bytes);
        for(var i=0;i<len;i++){
            b8[2+i]=b8s[i];
        }
    }
    return bb;
}

function BluildReqTcpTokenByteArray(){
	var msgid=MsgCmdDef.MSGID_TOKEN_REG;
	var tokenid=g_data.user_token;
    var jsdata={
        token: tokenid
    }
    var msg = new MsgToken(jsdata);
    var bytes=msg.toArrayBuffer();
	var array_buffer=Encode(msg);	//ArrayBuffer
	return array_buffer;
}

function AjaxPostUrl(key, url, callback, data) {
	var xmlHttp;
	try{
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();    // 实例化对象
	}catch( e ){
		// Internet Explorer
		try{
			xmlHttp = new ActiveXObject( "Msxml2.XMLHTTP" );
		}catch ( e ){
			try{
				xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );
			}catch( e ){
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}
	xmlHttp.onreadystatechange = function(event){
		//alert("The get return:"+xmlHttp.readyState+"||"+xmlHttp.status);
		if( xmlHttp.readyState == 4  && xmlHttp.status == 200 ){
			//alert(key+":: "+xmlHttp.responseText);
			var res_head_info=xmlHttp.getAllResponseHeaders();
			var res_c_type=xmlHttp.getResponseHeader("Content-Type");
			callback(key,xmlHttp.response);
		}else if(xmlHttp.status==404){
			alert("url="+url+" 404");
		}
	}
	xmlHttp.open( "POST", url, true );
	//xmlHttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xmlHttp.overrideMimeType('text/plain; charset=x-user-defined');
	xmlHttp.send( data );
}

//解析table表
function AjaxGetCsv(key,url,callback)
{
	var xmlHttp;
	try{
		// Firefox, Opera 8.0+, Safari
		xmlHttp = new XMLHttpRequest();    // 实例化对象
	}catch( e ){
		// Internet Explorer
		try{
			xmlHttp = new ActiveXObject( "Msxml2.XMLHTTP" );
		}catch ( e ){
			try{
				xmlHttp = new ActiveXObject( "Microsoft.XMLHTTP" );
			}catch( e ){
				alert("您的浏览器不支持AJAX！");
				return false;
			}
		}
	}
	xmlHttp.onreadystatechange = function(){
		//alert("The get return:"+xmlHttp.readyState+"||"+xmlHttp.status);
		if( xmlHttp.readyState == 4  && xmlHttp.status == 200 ){
			//alert(xmlHttp.responseText);
			//var ret_data = JSON.stringify(xmlHttp.responseText);
			var ary=xmlHttp.responseText.toString().split("\r\n");
			var tmp_str=ary[0];
			var col_name_ary=tmp_str.toString().split(",");
			var col_name_map={};
			for(var i=0;i<col_name_ary.length;i++){
				col_name_map[col_name_ary[i]] = i;
			}
			var data_row=[];
			var row_num=0;
			for(var i=2;i<ary.length;i++){
				tmp_str=ary[i];
				if(tmp_str.length>0){
					data_row[row_num]=tmp_str.toString().split(",");
					row_num++;
				}
			}
			callback(key,col_name_map,data_row);
			//alert("json:"+ret_data);
		}else if(xmlHttp.status==404){
			alert("url="+url+" 404");
		}
	};
	xmlHttp.open( "GET", url, true );
	xmlHttp.setRequestHeader("Content-Type", "text/html; charset=UTF-8");
	xmlHttp.send( );
}


function BuildHttpContentArrayBuffer(msgid,bytes){
	var len=0;
	if(bytes!=null){
		len=bytes.byteLength;
	}
	var bb=new ArrayBuffer(2+len);
	var buf=new ByteBuffer(2);
	buf.writeShort(msgid);
	var b8s=buf.view;
	var b8=new Uint8Array(bb);
	b8[0]=b8s[0];
	b8[1]=b8s[1];
	if(bytes!=null){
		b8s=new Uint8Array(bytes);
		for(var i=0;i<len;i++){
			b8[2+i]=b8s[i];
		}
	}
	return bb;
}
function ParseHttpContentArrayBuffer(data){
	var ty=typeof(data);
	var rcvdata=data;
	var len=rcvdata.length;

	var buf=new ByteBuffer(len);
	for(var i=0;i<len;i++){
		buf.writeUint8(rcvdata.charCodeAt(i) & 0xff);
	}
	var b8s=buf.view;
	var bb=new ArrayBuffer(2);
	var b8=new Uint8Array(bb);
	b8[0]=b8s[0];
	b8[1]=b8s[1];

	var dv = new DataView(bb);
	var msgid=dv.getUint16(0,false);

	var msg={};
	msg.id=msgid;
	msg.data=null;
	if(len>2){
		var bb2=new ArrayBuffer(len-2);
		var b8=new Uint8Array(bb2);
		for(var i=0;i<len-2;i++){
			b8[i]=b8s[2+i];
		}
		msg.data=bb2;
	}
	return msg;
}

//玩家排行
function ReqPlayRanking(token,gm_url){

	var msgid=MsgCmdDef.HTTP_VIEW_PLAYRANKLIST;   //玩家登陆
	var jsdata={
		token:token
	};
	var msg = new C2SViewPlayerRanking(jsdata);
	var bytes=msg.toArrayBuffer();
	var snd_buf=BuildHttpContentArrayBuffer(msgid,bytes);
	AjaxPostUrl(15, gm_url, CbkPlayRanking, snd_buf);
}

function CbkPlayRanking(key,text){
	var msg=ParseHttpContentArrayBuffer(text);
	if(msg.id==MsgCmdDef.HTTP_VIEW_PLAYRANKLIST){
		msg.msg=S2CViewPlayerRanking.decode(msg.data);

		//首页排行榜逻辑代码
		var playerRankInfo=msg.msg.playerRankInfo;
		var timeRemain=msg.msg.timeRemaining;
		var arr = [];
		var str = '';
		playerRankInfo.splice(5, playerRankInfo.length - 5);
		for(var i=0; i<playerRankInfo.length; i++){
			arr.push("{name: '"+ playerRankInfo[i].name +"', trophy:"+ playerRankInfo[i].trophy +"}")
		}

		addCookie('gamerRank', "["+arr+"]", 3);
		console.log(location.hash)
//		if(window.location.path)
		var oRank = document.getElementById('rank');
		if(!oRank) return;
		var oTbody = oRank.getElementsByTagName('tbody')[0];
		var index = 0;
		for(var i=0; i<5; i++){
			var oTr = document.createElement('tr');
			index++;
			oTr.innerHTML = '<td><i class="n'+ index +'">'+ index +'</i></td><td>'+ playerRankInfo[i].name +'</td><td>'+ playerRankInfo[i].trophy +'</td>';
			oTbody.appendChild(oTr);
		};
	}
}

function play_rank() {
    var token="1166f99e283900d5495bfde422a6aff4";
    var gm_url="http://pro-gm-cw.opd2c.com:5050";
    ReqPlayRanking(token,gm_url);
};
play_rank();

//玩家上赛季排行
function ReqLastPlayRanking(token,gm_url){

	var msgid=MsgCmdDef.HTTP_VIEW_LASTRANKLIST;   //玩家登陆
	var jsdata={
		token:token
	};
	var msg = new C2SLastPlayerRanking(jsdata);
	var bytes=msg.toArrayBuffer();
	var snd_buf=BuildHttpContentArrayBuffer(msgid,bytes);
	AjaxPostUrl(15, gm_url, CbkLastPlayRanking, snd_buf);
}


function CbkLastPlayRanking(key,text){
	var msg=ParseHttpContentArrayBuffer(text);
	if(msg.id==MsgCmdDef.HTTP_VIEW_LASTRANKLIST){
		if(msg.data==null){
			alert("无上赛季数据！");
			return;
		}
		msg.msg=S2CLastPlayerRanking.decode(msg.data);
		var lastPlayerRankInfo=msg.msg.lastRacePlayerRankInfo;
	}
}

