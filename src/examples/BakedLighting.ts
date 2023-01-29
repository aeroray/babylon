import "@babylonjs/loaders"

import { Engine, FreeCamera, Scene, SceneLoader, Vector3 } from "@babylonjs/core"

export class BakedLighting {
  scene: Scene
  engine: Engine

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()

    this.ImportBust()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene(): Scene {
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0, 0.5, -2), scene)
    camera.attachControl()
    camera.speed = 0.1
    camera.minZ = 0.01

    return scene
  }

  async ImportBust() {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "bust.glb")

    this.engine.hideLoadingUI()
  }
}
