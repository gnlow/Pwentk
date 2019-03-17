/* globals fabric */
/* globals pwentk */
var canvas = new fabric.Canvas("mainCanvas");
canvas.setDimensions({width: 1920, height: 1080},{backstoreOnly:true});

fabric.Object.prototype.cornerSize = 30;
fabric.Object.prototype.transparentCorners = false;
fabric.Object.prototype.borderScaleFactor = 5;
fabric.Object.prototype.rotatingPointOffset = 120;
fabric.Object.prototype.borderColor = "rgba(235,88,171,0.75)";
fabric.Object.prototype.cornerColor = "rgba(235,88,171,0.75)";

var pwentkFabric = {
	newSprite:function(sprite){
		let spriteImg = sprite.getShape().img;
		if(sprite.getShape().loaded){
			canvas.add(new fabric.Image(spriteImg, pwentkFabric.spriteToObject(sprite)));
		}else{
			spriteImg.onload = function(){
				canvas.add(new fabric.Image(spriteImg, pwentkFabric.spriteToObject(sprite)));
				sprite.getShape().loaded = true;
			};
		}
	},
	spriteToObject:function(sprite){
		return {
			id: sprite.id,
			scaleX: sprite.scaleX,
			scaleY: sprite.scaleY,
			left: sprite.x+ canvas.width/2,
			top: -sprite.y+ canvas.height/2,
			angle: sprite.rotation,
			originX: "center",
			originY: "center"
		};
	}
};

pwentk.on("newSprite", pwentkFabric.newSprite);

pwentk.on("changed", function(sprite){
	let targetObject = canvas.getObjects().filter(val => {return val.id == sprite.id;})[0];
	if(targetObject){
		if(sprite.visible){
			targetObject.set(pwentkFabric.spriteToObject(sprite));
		}else{
			canvas.remove(targetObject);
		}
	}else if(sprite.visible){
		pwentkFabric.newSprite(sprite);
	}
	canvas.renderAll();
});

canvas.on("object:modified", function(event){
	var sprite = pwentk.getSprite(app.scenes[app.activeScene], event.target.id, "id");
	if(sprite){
		sprite
		.setScaleX(event.target.scaleX, false)
		.setScaleY(event.target.scaleY, false)
		.setX(event.target.left- canvas.width/2, false)
		.setY(-event.target.top+ canvas.height/2, false)
		.setRotation(event.target.angle);
	}
});