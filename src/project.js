import pwentk from "./global.js";

export default class Project{
		constructor(options){
			this.name = options.name;
			this.scenes = [new pwentk.Scene({"name": "장면 1"})];
			this.nowSceneNo = 0;
			pwentk.fire("sceneChanged", this);
		}
		setNowScene(sceneNo){
			this.nowSceneNo = sceneNo;
			pwentk.fire("sceneChanged", this);
		}
		nowScene(){
			return this.scenes[this.nowSceneNo];
		}
		newScene(name){
			this.scenes.push(new pwentk.Scene({"name": name}));
		}
		deleteScene(sceneNo){
			this.scenes.splice(sceneNo, 1);
			if(this.nowSceneNo > this.scenes.length - 1){
				this.setNowScene(this.scenes.length - 1);
			}else if(this.nowSceneNo > sceneNo){
				this.setNowScene(this.nowSceneNo - 1);
			}
		}
	}