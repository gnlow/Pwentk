/* globals fabric */
/* globals pwentk */
var main = new pwentk.Project({name: "새 작품"});

fabric.Object.prototype.cornerSize = 30;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.borderScaleFactor = 5;
fabric.Object.prototype.rotatingPointOffset = 120;
fabric.Object.prototype.borderColor = "rgba(235,88,171,0.75)";
fabric.Object.prototype.cornerColor = "rgba(235,88,171,0.75)";

var pwentkFabric = {};

pwentkFabric.newSprite = function(sprite, canvas){
	let spriteImg = sprite.getShape().img;
	if(sprite.getShape().loaded){
		canvas.add(new fabric.Image(spriteImg, pwentkFabric.spriteToObject(sprite, canvas)));
	}else{
		spriteImg.onload = function(){
			canvas.add(new fabric.Image(spriteImg, pwentkFabric.spriteToObject(sprite, canvas)));
			sprite.getShape().loaded = true;
			pwentkFabric.spriteReDraw(sprite, canvas);
		};
	}
};

pwentkFabric.spriteToObject = function(sprite, canvas){
	return {
		sprite: sprite,
		scaleX: sprite.scaleX,
		scaleY: sprite.scaleY,
		left: sprite.x+ canvas.width/2,
		top: -sprite.y+ canvas.height/2,
		angle: sprite.rotation,
		originX: "center",
		originY: "center"
	};
};

pwentkFabric.spriteReDraw = function(sprite, canvas){
	let targetObject = canvas.getObjects().filter(val => {return val.sprite == sprite;})[0];
	if(targetObject){
		if(sprite.visible && sprite.scene == main.nowScene()){
			targetObject.set(pwentkFabric.spriteToObject(sprite, canvas));
		}else{
			canvas.remove(targetObject);
		}
	}else if(sprite.visible && sprite.scene == main.nowScene()){
		pwentkFabric.newSprite(sprite, canvas);
	}
	canvas.renderAll();
};

pwentkFabric.init = function(setup){
	pwentk.on("newSprite", function(sprite){
		pwentkFabric.newSprite(sprite, setup.canvas);
	});
	pwentk.on("changed", function(sprite){
		pwentkFabric.spriteReDraw(sprite, setup.canvas);
	});
	pwentk.on("sceneChanged", function(project){
		console.log(setup.canvas.getObjects());
		canvas.remove(...setup.canvas.getObjects());
		for(var i in project.nowScene().sprites){
			if(project.nowScene().sprites[i].visible){
				pwentkFabric.newSprite(project.nowScene().sprites[i], setup.canvas);
			}
		}
		setup.canvas.renderAll();
	});
	setup.canvas.on("object:modified", function(event){
		var sprite = event.target.sprite;
		if(sprite){
			sprite
			.setScaleX(event.target.scaleX, false)
			.setScaleY(event.target.scaleY, false)
			.setX(event.target.left- setup.canvas.width/2, false)
			.setY(-event.target.top+ setup.canvas.height/2, false)
			.setRotation(event.target.angle);
		}
	});
};