import pwentk from "./global.js";

export default class Sprite{
	constructor(name, visible, shapes, shapeNumber, scaleX, scaleY, x, y, z, rotation){
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
	}

	setScene(scene){
		this.scene = scene;
	}
	setName(name, doEvent = true){
		if(!name){
			this.setName(`스프라이트 ${pwentk.genId()}`, doEvent);
			pwentk.genErr(22,this);
		}/*else if(pwentk.sprites.some(val=>{return val.name==String(name);})){
			this.setName(`스프라이트 ${this.id}`, doEvent);
			pwentk.genErr(11,this);
		}*/else{
			this.name = String(name);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	show(doEvent = true){
		this.visible = true;
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	hide(doEvent = true){
		this.visible = false;
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	setVisible(boolean, doEvent = true){
		this.visible = Boolean(boolean);
		if(doEvent){pwentk.fire("changed", this);}
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
		if(doEvent){pwentk.fire("changed", this);}
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
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	setScaleY(scaleY, doEvent = true){
		if(!isNaN(scaleY)){
			this.scaleY = Number(scaleY);
		}else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	//좌표
	setX(x, doEvent = true){
		if(!isNaN(x)){
			this.x = Number(x);
		}else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	setY(y, doEvent = true){
		if(!isNaN(y)){
			this.y = Number(y);
		}else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	setZ(z, doEvent = true){
		if(!isNaN(z)){
			this.z = Number(z);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	setRotation(rotation, doEvent = true){
		if(!isNaN(rotation)){
			this.rotation = Number(rotation);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	addX(x, doEvent = true){
		if(!isNaN(x)){
			this.x += Number(x);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	addY(y, doEvent = true){
		if(!isNaN(y)){
			this.y += Number(y);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	addZ(z, doEvent = true){
		if(!isNaN(z)){
			this.z += Number(z);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}
	addRotation(rotation, doEvent = true){
		if(!isNaN(rotation)){
			this.rotation += Number(rotation);
		}
		else{
			pwentk.genErr(21,this);
		}
		if(doEvent){pwentk.fire("changed", this);}
		return this;
	}

	genImg(src){
		let img = new Image();
		img.src = src;
		return img;
	}

}