import pwentk from "./global.js";

export default class Block{
	constructor(parent){
		this.name = parent.name;
		this.template = parent.template;
		this.param = parent.param;
		this.innerBlock = this.param.filter(val=>val.type=="function");
	}
	getPath(text){
		var output = "";
		output += `M0 0 l 5 5 v -4 
		a 1 1 90 0 1 1 -1  
		h 70
		a 5 5 180 0 1 0 10 `;
		output += `H 11 `;

		if(this.innerBlock.length > 0){
			output += `a 1 1 90 0 0 -1 1
			v 4
			l -5 -5`;
			for(var i=0;i<this.innerBlock.length-1;i++){
				output += `v 10 
				l 5 5 v -4 
				a 1 1 90 0 1 1 -1  
				h 20 
				a 5 5 180 0 1 0 10 
				H 11 
				a 1 1 90 0 0 -1 1 
				v 4 
				l -5 -5 `;
			}
			output += `v 10 
			l 5 5 v -4 
			a 1 1 90 0 1 1 -1  
			h 20 
			a 5 5 180 0 1 0 10 `;
		}
		output += `H 6 a 1 1 90 0 0 -1 1 v 5 l -5 -5
		Z`;
		return output;
	}
}