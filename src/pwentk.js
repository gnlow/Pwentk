import pwentk from "./global.js";
import Project from "./project.js";
import Scene from "./scene.js";
import BlockSet from "./blockset.js";
import Block from "./block.js";
import Sprite from "./sprite.js";

pwentk.Project = Project;
pwentk.Scene = Scene;
pwentk.BlockSet = BlockSet;
pwentk.Block = Block;
pwentk.Sprite = Sprite;

window.pwentk = pwentk;

export default pwentk;