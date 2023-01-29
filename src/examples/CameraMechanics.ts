import "@babylonjs/loaders"

import {
  AbstractMesh, ArcRotateCamera, CubeTexture, Engine, Scene, SceneLoader, Vector3
} from "@babylonjs/core"

export class CameraMechanics {
  scene: Scene
  engine: Engine
  watch!: AbstractMesh
  camera!: ArcRotateCamera

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()

    this.CreateCamera()

    this.ImportWatch()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)

    const envTex = CubeTexture.CreateFromPrefilteredData("./environment/xmas_bg.env", scene)
    envTex.gammaSpace = false
    envTex.rotationY = Math.PI

    scene.environmentTexture = envTex
    scene.createDefaultSkybox(envTex, true, 1000, 0.25)

    return scene
  }

  CreateCamera() {
    this.camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 60, Vector3.Zero(), this.scene)
    this.camera.attachControl(this.canvas, true)

    this.camera.wheelPrecision = 100
    this.camera.minZ = 0.3

    this.camera.lowerRadiusLimit = 1
    this.camera.upperRadiusLimit = 5
    //this.camera.useBouncingBehavior = true;

    this.camera.panningSensibility = 0

    this.camera.useAutoRotationBehavior = true
    this.camera.autoRotationBehavior!.idleRotationSpeed = 0.5
    this.camera.autoRotationBehavior!.idleRotationSpinupTime = 1000
    this.camera.autoRotationBehavior!.idleRotationWaitTime = 2000
    this.camera.autoRotationBehavior!.zoomStopsAnimation = true

    this.camera.useFramingBehavior = true
    this.camera.framingBehavior!.radiusScale = 1
    this.camera.framingBehavior!.framingTime = 3000
  }

  async ImportWatch() {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "vintage_watch.glb")
    this.watch = meshes[0]

    // meshes[1].showBoundingBox = true;
    // meshes[2].showBoundingBox = true;
    // meshes[3].showBoundingBox = true;

    this.camera.setTarget(meshes[2])

    this.engine.hideLoadingUI()
  }
}
