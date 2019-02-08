$(function(){
	newBlock({
		class:"basic",
		text:"안녕안녕",
		font:"6px sans-serif"
	})
});

function xyRound(obj){
	return {x:Math.round(obj.x),y:Math.round(obj.y)}
};

function getTextWidth(text, font) {
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
}

function getBlock(inp){
	return parseSVG(`<g class="draggable blockGroup">
		<path class="${inp.class} block" 
		d="M0 0 L 5 5 V 1 
		A 1 1 90 0 1 6 0  
		h ${getTextWidth(inp.text, inp.font)*0.6} 
		a 5 5 180 0 1 0 10 
		H 6 
		A 1 1 90 0 0 5 11 
		V 15 L 0 10 L 0 0 Z"/>
		<text class="blockText" x="7.5" y="7">${inp.text}</text>
		</g>`)
}

function parseSVG(s) {
	var div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
	div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
	var frag = document.createDocumentFragment();
	while(div.firstChild.firstChild){
		frag.appendChild(div.firstChild.firstChild);
	}
	return frag;
}

function newBlock(inp){
	$('#ws').append($(getBlock(inp))
		.attr('y',100));
}

