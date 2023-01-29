import "@babylonjs/loaders"

import { CubeTexture, Engine, FreeCamera, Scene, SceneLoader, Vector3 } from "@babylonjs/core"

export class CustomModels {
  scene: Scene
  engine: Engine

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0, 1, -8), scene)
    camera.attachControl()
    camera.speed = 0.25

    const envTexture = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene)
    scene.environmentTexture = envTexture
    scene.createDefaultSkybox(envTexture, true)
    scene.environmentIntensity = 0.5

    this.ImportCampfire()

    return scene
  }

  // ImportBarrel() {
  //   SceneLoader.ImportMesh("", "./models/", "barrel.glb", this.scene, (meshes) => console.log(meshes))
  // }

  async ImportCampfire() {
    const models = await SceneLoader.ImportMeshAsync("", "./models/", "campfire.glb", this.scene)
    console.log(models)

    this.engine.hideLoadingUI()
  }
}
