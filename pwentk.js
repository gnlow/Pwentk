/* globals Image */
var pwentk = {
	sprites: [],
	Sprite: class{
		constructor(name, visible, shapes, shapeNumber, scaleX, scaleY, x, y, z, rotation){			
			this.setName(name, false);
			this.setVisible(visible || true, false);
			this.shapes = shapes || [{name:"Sample image",img:this.genImg("http://lorempixel.com/960/540/")}];
			this.setShape(shapeNumber || 0, false);
			this.setX(x || 0, false);
			this.setY(y || 0, false);
			this.setZ(z || 0, false);
			this.setRotation(rotation || 0, false);
			pwentk.sprites.push(this);
			pwentk.event.newSprite(this);
		}

		setName(name, doEvent = true){
			if(!name){
				this.setName("스프라이트 "+Math.random().toString(36).substr(2, 5), doEvent);
				pwentk.genErr(22,this);
			}else if(pwentk.sprites.some(val=>{return val.name==String(name);})){
				this.setName("스프라이트 "+Math.random().toString(36).substr(2, 5), doEvent);
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
	getSprite: function(info){
		if(typeof info === "number"){
			let returnTemp = this.sprites[info];
			if(returnTemp){
				return returnTemp;
			}else{
				pwentk.genErr(12);
			}
		}else if(typeof info === "string"){
			let returnTemp = this.sprites.filter(val => {return val.name == info;})[0];
			if(returnTemp){
				return returnTemp;
			}else{
				pwentk.genErr(13);
			}
		}
	}
};