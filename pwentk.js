/* globals Image */
var pwentk = {
	sprites: [],
	Sprite: class{
		constructor(name, visible, shapes, shapeNumber, scaleX, scaleY, x, y, z, rotation){			
			this.id = Math.random().toString(36).substr(2, 5);
			this.setName(name, false);
			this.setVisible(visible || true, false);
			this.shapes = shapes || [{name:"Sample image",img:this.genImg("https://playentry.org/lib/entry-js/images/media/entrybot1.png")}];
			this.setShape(shapeNumber || 0, false);
			this.setScaleX(scaleX || 1, false);
			this.setScaleY(scaleY || 1, false);
			this.setX(x || 0, false);
			this.setY(y || 0, false);
			this.setZ(z || 0, false);
			this.setRotation(rotation || 0, false);
			pwentk.sprites.push(this);
			pwentk.event.newSprite(this);
		}

		setName(name, doEvent = true){
			if(!name){
				this.setName(`스프라이트 ${this.id}`, doEvent);
				pwentk.genErr(22,this);
			}else if(pwentk.sprites.some(val=>{return val.name==String(name);})){
				this.setName(`스프라이트 ${this.id}`, doEvent);
				pwentk.genErr(11,this);
			}else{
				this.name = String(name);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		show(doEvent = true){
			this.visible = true;
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		hide(doEvent = true){
			this.visible = false;
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setVisible(boolean, doEvent = true){
			this.visible = Boolean(boolean);
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setShape(n, doEvent = true){
			if(!isNaN(n)){
				if(this.shapes[Number(n)]){
					this.shapeNumber = Number(n);
				}else{
					pwentk.genErr(14,this);
				}
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		getShape(){
			return this.shapes[this.shapeNumber];
		}
		setScaleX(scaleX, doEvent = true){
			if(!isNaN(scaleX)){
				this.scaleX = Number(scaleX);
			}else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setScaleY(scaleY, doEvent = true){
			if(!isNaN(scaleY)){
				this.scaleY = Number(scaleY);
			}else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		//좌표
		setX(x, doEvent = true){
			if(!isNaN(x)){
				this.x = Number(x);
			}else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setY(y, doEvent = true){
			if(!isNaN(y)){
				this.y = Number(y);
			}else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setZ(z, doEvent = true){
			if(!isNaN(z)){
				this.z = Number(z);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		setRotation(rotation, doEvent = true){
			if(!isNaN(rotation)){
				this.rotation = Number(rotation);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		addX(x, doEvent = true){
			if(!isNaN(x)){
				this.x += Number(x);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		addY(y, doEvent = true){
			if(!isNaN(y)){
				this.y += Number(y);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		addZ(z, doEvent = true){
			if(!isNaN(z)){
				this.z += Number(z);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}
		addRotation(rotation, doEvent = true){
			if(!isNaN(rotation)){
				this.rotation += Number(rotation);
			}
			else{
				pwentk.genErr(21,this);
			}
			if(doEvent){pwentk.event.changed(this);}
			return this;
		}

		genImg(src){
			let img = new Image();
			img.src = src;
			return img;
		}

	},
	Block: class{
		constructor(name, text, shape, func){
			if(name&&text&&shape&&func){
				this.name = name;
				this.text = text;
				this.shape = shape;
				this.func = func;
				this.param = 
				pwentk.nArray(this.text.match(/(?<=\(\()(.*?)(?=\)\))/g))
				.map(name => ({name: name, type: "string", data: "0"}))
				.concat(
					pwentk.nArray(this.text.match(/(?<=\<\<)(.*?)(?=\>\>)/g))
					.map(name => ({name: name, type: "boolean", data: true}))
					)
				.concat(
					pwentk.nArray(this.text.match(/(?<=\{\{)(.*?)(?=\}\})/g))
					.map(name => ({name: name, type: "function", data: function(){}}))
					);
			}else{
				pwentk.genErr(20);
			}
		}
	},
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
		newSprite: function(sprite){return sprite;}
	},
	getSprite: function(info, option = "name"){
		switch(info.constructor.name){
			case "Number":{
				let returnTemp = this.sprites[info];
				if(returnTemp){
					return returnTemp;
				}else{
					pwentk.genErr(12);
				}
				break;
			}
			case "String":{
				let returnTemp = this.sprites.filter(val => {return val[option] == info;})[0];
				if(returnTemp){
					return returnTemp;
				}else{
					pwentk.genErr(13);
				}
				break;
			}
		}
	},
	nArray: arr => arr?arr:[]
};