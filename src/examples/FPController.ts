import "@babylonjs/loaders"

import { Engine, FreeCamera, HemisphericLight, Scene, SceneLoader, Vector3 } from "@babylonjs/core"

export class FPController {
  scene: Scene
  engine: Engine

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()
    this.CreateEnvironment()
    this.CreateController()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)
    new HemisphericLight("light", new Vector3(0, 1, 0), scene)

    scene.onPointerDown = (evt) => {
      if (evt.button === 0) this.engine.enterPointerlock()
      if (evt.button === 2) this.engine.exitPointerlock()
    }

    const framesPerSecond = 60
    const gravity = -9.81
    scene.gravity = new Vector3(0, gravity / framesPerSecond, 0)
    scene.collisionsEnabled = true

    return scene
  }

  async CreateEnvironment() {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "prototype_level.glb", this.scene)

    meshes.map((mesh) => {
      mesh.checkCollisions = true
    })

    this.engine.hideLoadingUI()
  }

  CreateController() {
    const camera = new FreeCamera("camera", new Vector3(0, 1, 0), this.scene)
    camera.attachControl()
    camera.minZ = 0.45
    camera.speed = 0.75
    camera.angularSensibility = 4000

    camera.applyGravity = true
    camera.checkCollisions = true
    camera.ellipsoid = new Vector3(1, 1, 1)

    camera.keysUp.push(87)
    camera.keysLeft.push(65)
    camera.keysDown.push(83)
    camera.keysRight.push(68)
  }
}
