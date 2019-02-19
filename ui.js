function canvasResize(){
			canvas.setWidth($("#canvases").parent().width());
			canvas.setHeight($("#canvases").parent().width()/16*9);
			canvas.setDimensions({width: 1920, height: 1080},{backstoreOnly:true});
		}
		var block = Vue.component("pwentk-block",{
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
				}
			},
			created(){
				interact(`#ws > g:nth-child(${this.index+1})`)
				.draggable({
					inertia: true,
					snap:{
						endOnly: true,
						targets:[{x:900, y:300, range: 50}]
					},
					restrict: {
						restriction: "parent",
						endOnly: true
					},
					autoScroll: true,
					onmove: this.dragMove
				})
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
				}
			}
		});
		var app = new Vue({
			el: "#app",
			data: {
				scenes: [
				{name: "장면 1", active: true}
				],
				blocks: [],
				ws: {
					scale: 2
				},
				lastClick: undefined
			},
			methods: {
				sceneChange: function(selectScene){
					for(var i=0;i<this.scenes.length;i++){
						this.scenes[i].active = false;
					}
					this.scenes[selectScene].active = true;
				}
			}
		});
		window.addEventListener("resize", canvasResize);
		$(canvasResize);