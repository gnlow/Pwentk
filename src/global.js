/* globals Image */
var pwentk = {
	genErr: function(errCode, errSprite){
		if(errSprite){
			console.warn(new Error(`"${errSprite.name}" 스프라이트에서 에러 #${errCode} : "${pwentk.errorCode[errCode]}"`));
		}else{
			console.warn(new Error(`에러 #${errCode} : "${pwentk.errorCode[errCode]}"`));
		}
	},
	errorCode: {
		"10": "잘못된 참조",
		"11": "중복된 스프라이트 이름",
		"12": "존재하지 않는 스프라이트 번호",
		"13": "존재하지 않는 스프라이트 이름",
		"14": "존재하지 않는 모양 번호",
		"15": "존재하지 않는 모양 이름",

		"20": "잘못된 입력 형식",
		"21": "잘못된 입력 형식 (Number여야 함)",
		"22": "스프라이트 이름이 입력되지 않음",
		"23": "잘못된 입력 형식 (String여야 함)"
	},
	event: {
		newSprite: [],
		changed: [],
		sceneChanged: []
	},
	on: function(eventName, callback){
		this.event[eventName].push(callback);
	},
	fire: function(eventName, param){
		console.log(`"${eventName}" event fired`);
		for(var i in this.event[eventName]){
			this.event[eventName][i](param);
		}
	},
	getSprite: function(scene, info, option = "name"){
		switch(info.constructor.name){
			case "Number":{
				let returnTemp = scene.sprites[info];
				if(returnTemp){
					return returnTemp;
				}else{
					pwentk.genErr(12);
				}
				break;
			}
			case "String":{
				let returnTemp = scene.sprites.filter(val => {return val[option] == info;})[0];
				if(returnTemp){
					return returnTemp;
				}else{
					pwentk.genErr(13);
				}
				break;
			}
		}
	},
	nArray: arr => arr?arr:[],
	genId: () => Math.random().toString(36).substr(2, 5)
};

export default pwentk;