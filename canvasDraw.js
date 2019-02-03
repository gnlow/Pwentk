/* globals fabric */
/* globals pwentk */
var canvas = new fabric.Canvas("mainCanvas");
canvas.setWidth(960);
canvas.setHeight(540);
canvas.setDimensions({width: 1920, height: 1080},{backstoreOnly:true});
fabric.Object.prototype.cornerSize =30;
fabric.Object.prototype.transparentCorners = false;

var pwentkFabric = {
	newSprite:function(sprite){
		let spriteImg = sprite.getShape().img;
		spriteImg.onload = function(){
			canvas.add(new fabric.Image(spriteImg, pwentkFabric.spriteToObject(sprite)));
		};
	},
	spriteToObject:function(sprite){
		return {
			id: sprite.name,
			left: sprite.x+ canvas.width/2,
			top: -sprite.y+ canvas.height/2,
			angle: sprite.rotation,
			originX: "center",
			originY: "center"
		};
	}
};

pwentk.event.newSprite = pwentkFabric.newSprite;

pwentk.event.changed = function(sprite){
	let targetObject = canvas.getObjects().filter(val => {return val.id == sprite.name;})[0];
	if(targetObject){
		if(sprite.visible){
			targetObject.set(pwentkFabric.spriteToObject(sprite));
		}else{
			canvas.remove(targetObject);
		}
	}else if(sprite.visible){
		console.log("d1");
		pwentkFabric.newSprite(sprite);
	}
	canvas.renderAll();
};

canvas.on("object:modified", function(event){
	pwentk.getSprite(event.target.id)
	.setX(event.target.left- canvas.width/2, false)
	.setY(-event.target.top+ canvas.height/2, false)
	.setRotation(event.target.angle, false)
	.setScaleX(event.target.scaleX, false)
	.setScaleY(event.target.scaleY);
	console.log(pwentk.getSprite(event.target.id), event.target);
});