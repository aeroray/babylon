import "@babylonjs/loaders"

import {
  AbstractMesh, Color3, Engine, FreeCamera, GizmoManager, GlowLayer, Light, LightGizmo, PointLight,
  Scene, SceneLoader, ShadowGenerator, SpotLight, Vector3
} from "@babylonjs/core"

export class LightsShadows {
  scene: Scene
  engine: Engine
  lightTubes!: AbstractMesh[]
  models!: AbstractMesh[]

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
    const camera = new FreeCamera("camera", new Vector3(0, 1, -4), scene)
    camera.attachControl()
    camera.speed = 0.2

    this.CreateEnvironment()

    return scene
  }

  async CreateEnvironment() {
    const { meshes } = await SceneLoader.ImportMeshAsync("", "./models/", "LightingScene.glb")
    this.models = meshes
    this.lightTubes = meshes.filter((mesh) => mesh.name === "lightTube_left" || mesh.name === "lightTube_right")

    const glowLayer = new GlowLayer("glowLayer", this.scene)
    glowLayer.intensity = 0.75

    this.CreateLights()
  }

  CreateLights() {
    // const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), this.scene)
    // hemisphericLight.diffuse = new Color3(1, 0, 0)
    // hemisphericLight.groundColor = new Color3(0, 0, 1)
    // hemisphericLight.specular = new Color3(0, 1, 0)

    // const directionalLight = new DirectionalLight("directionalLight", new Vector3(0, -1, 0), this.scene)

    const pointLight = new PointLight("pointLight", new Vector3(0, 1, 0), this.scene)
    pointLight.diffuse = new Color3(172 / 255, 246 / 255, 250 / 255)
    pointLight.intensity = 0.25

    const pointClone = pointLight.clone("pointClone") as PointLight
    pointLight.parent = this.lightTubes[0]
    pointClone.parent = this.lightTubes[1]

    const spotLight = new SpotLight(
      "spotLight",
      new Vector3(0, 0.5, -3),
      new Vector3(0, 1, 3),
      Math.PI / 2,
      10,
      this.scene
    )
    spotLight.intensity = 100
    spotLight.shadowEnabled = true
    spotLight.shadowMinZ = 1
    spotLight.shadowMaxZ = 10

    const shadowGen = new ShadowGenerator(2048, spotLight)
    shadowGen.useBlurCloseExponentialShadowMap = true

    this.models.map((mesh) => {
      mesh.receiveShadows = true
      shadowGen.addShadowCaster(mesh)
    })

    this.CreateGizmos(spotLight)
  }

  CreateGizmos(customLight: Light) {
    const lightGizmo = new LightGizmo()
    lightGizmo.scaleRatio = 2
    lightGizmo.light = customLight

    const gizmoManager = new GizmoManager(this.scene)
    gizmoManager.positionGizmoEnabled = true
    gizmoManager.rotationGizmoEnabled = true
    gizmoManager.usePointerToAttachGizmos = false
    gizmoManager.attachToMesh(lightGizmo.attachedMesh)

    this.engine.hideLoadingUI()
  }
}
