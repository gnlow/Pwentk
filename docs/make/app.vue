<template>
	<sui-menu borderless inverted>
		<a is="sui-menu-item">
			<sui-image src="../logo.svg" size="tiny" style="fill:white;"/>
		</a>
		<sui-menu-menu position="right">
			<a is="sui-menu-item">
				Lorem!
			</a>
		</sui-menu-menu>
	</sui-menu>
	<sui-segment inverted>
		<sui-menu secondary pointing inverted>
			<a is="sui-menu-item" 
			v-for="(scene, index) in scenes"
			:active="activeScene == index" 
			:content="scene"
			@click="activeScene = index"
			/>
			<a is="sui-menu-item"
			@click="newScene()">
			<sui-icon name="plus"/>
		</a>
	</sui-menu>
</sui-segment>
<div id="main">
	<sui-grid :columns="2" stackable>
		<sui-grid-column>
			<div id="canvases">
				<canvas id="mainCanvas" height="360" width="640"></canvas>
			</div>
		</sui-grid-column>
		<sui-grid-column>
			<sui-segment>
				<svg class="ws" id="ws" style="width:100%;height:100%;">
					<component v-for="(block, index) in blocks" is="pwentk-block" :path="block.getPath()" :key="index" :text="block.template" :index="index"></component>
				</svg>
			</sui-segment>
		</sui-grid-column>
	</sui-grid>
</div>
</template>

<script>
	export default {};
</script>