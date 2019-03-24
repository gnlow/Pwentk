import pwentk from "./global.js";

export default class Scene{
	constructor(options){
		this.name = options.name;
		this.sprites = [];
	}

	newSprite(sprite){
		sprite.setScene(this);
		this.sprites.push(sprite);
		pwentk.fire("newSprite", sprite);
	}
}