Vue.use(SemanticUIVue);
document.addEventListener('contextmenu', function (e) {
	e.preventDefault();
}, false);
function canvasResize(){
	app.topMargin = document.getElementById("topbar").clientHeight+"px";
	app.mainHeight = (window.innerHeight-document.getElementById("topbar").clientHeight)+"px";
	var canvasParent = document.getElementById("canvases").parentNode;
	var canvasWidth = canvasParent.offsetWidth-28;//window.getComputedStyle(canvasParent).getPropertyValue("padding").replace("px", "")*2;
	canvas.setWidth(canvasWidth);
	canvas.setHeight(canvasWidth/16*9);
	canvas.setDimensions({width: 1920, height: 1080},{backstoreOnly:true});
}
Vue.component("pwentk-block",{
	template: `<g :class="['draggable', 'blockGroup', {clicked: clicked}, {lastClick: (lastClick==index)}]"
	:style="{transform:'translate('+x+'px,'+y+'px) scale('+ws.scale+')'}">
	<path class="basic block" 
	:d="path"/>
	<text class="blockText" x="7.5" y="7">{{text}}</text>
	</g>`,
	props:["text", "path", "index"],
	data(){
		return {
			x:0, 
			y:0,
			clicked:false,
			beforeX:0,
			beforeY:0,
			ws:app.ws,
			lastClick:app.lastClick
		};
	},
	created(){
		interact(`#ws > g:nth-child(${this.index+1})`)
		.draggable({
			inertia: true,
			snap:{
				targets:[{x:900, y:300, range: 50}]
			},
			restrict: {
				restriction: "parent",
				endOnly: true
			},
			autoScroll: true,
			onmove: this.dragMove
		});
	},
	methods:{
		getTextWidth: function(text, font) {
			var canvas = this.getTextWidth.canvas || (this.getTextWidth.canvas = document.createElement("canvas"));
			var context = canvas.getContext("2d");
			context.font = font;
			var metrics = context.measureText(text);
			return metrics.width*0.6;
		},
		log: console.log,
		dragMove: function(e){
			this.x += e.dx;
			this.y += e.dy;
			console.log(e.interactable.options.drag.snap.targets);
			e.interactable
			.draggable({
				snap:{
					targets:[{x:900, y:100, range: 50}]
				}
			});
		}
	}
});
var app = new Vue({
	el: "#app",
	data: {
		scenes: [
		"장면 1"
		],
		activeScene: 0,
		targetScene: 0,
		blocks: [],
		ws: {
			scale: 2
		},
		lastClick: undefined,
		topMargin: "0px",
		mainHeight: "0px",
		contextPos: {left: 0, top: 100},
		context: false
	},
	methods: {
		newScene(){
			this.scenes.push("장면 "+(this.scenes.length+1))
		},
		deleteScene(){
			this.scenes.splice(this.targetScene, 1);
		},
		contextOpen(e, target){
			this.targetScene = target;
			this.contextPos.left = e.clientX;
			this.contextPos.top = e.clientY + 20;
			this.context = true;
		},
		contextClose(e){
			this.context = false;
		}
	}
});
window.addEventListener("resize", canvasResize);
window.addEventListener("DOMContentLoaded", canvasResize);