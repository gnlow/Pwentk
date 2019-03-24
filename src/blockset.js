import pwentk from "./global.js";

export default class BlockSet{
	constructor(options){
		this.name = options.name;
		this.template = options.template;
		this.func = options.func;
		this.param = 
		pwentk.nArray(this.template.match(/(?<=\(\()(.*?)(?=\)\))/g))
		.map(name => ({name: name, type: "string", data: "0"}))
		.concat(
			pwentk.nArray(this.template.match(/(?<=\<\<)(.*?)(?=\>\>)/g))
			.map(name => ({name: name, type: "boolean", data: true}))
			)
		.concat(
			pwentk.nArray(this.template.match(/(?<=\{\{)(.*?)(?=\}\})/g))
			.map(name => ({name: name, type: "function", data: function(){}}))
			);
	}
}