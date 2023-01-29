import "@babylonjs/loaders"

import * as CANNON from "cannon"

import {
  CannonJSPlugin, Color3, CubeTexture, Engine, FreeCamera, Matrix, MeshBuilder, PBRMaterial,
  PhysicsImpostor, Scene, SceneLoader, Texture, Vector3
} from "@babylonjs/core"

export class RayCasting {
  scene: Scene
  engine: Engine
  camera!: FreeCamera
  splatters!: PBRMaterial[]

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()

    this.CreateEnvironment()
    this.CreateTextures()
    this.CreatePickingRay()
    this.CreatePhysics()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)

    const envTex = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene)
    envTex.gammaSpace = false
    envTex.rotationY = Math.PI / 2
    scene.environmentTexture = envTex
    scene.createDefaultSkybox(envTex, true, 1000, 0.25)

    const camera = new FreeCamera("camera", new Vector3(0, 2, -10), scene)
    camera.attachControl()
    camera.minZ = 0.5
    this.camera = camera

    return scene
  }

  async CreateEnvironment() {
    await SceneLoader.ImportMeshAsync("", "./models/", "prototype_level.glb", this.scene)

    this.engine.hideLoadingUI()
  }

  async CreatePhysics() {
    this.scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON))

    this.CreateImpostors()
  }

  CreateImpostors() {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    })
    ground.isVisible = false
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, { mass: 0, friction: 10 })

    const sphere = MeshBuilder.CreateSphere("sphere", { diameter: 3 })
    const sphereMat = new PBRMaterial("sphereMat", this.scene)
    sphereMat.roughness = 1
    sphere.position.y = 3
    sphereMat.albedoColor = new Color3(1, 0.5, 0)
    sphere.material = sphereMat
    sphere.physicsImpostor = new PhysicsImpostor(sphere, PhysicsImpostor.SphereImpostor, { mass: 50, friction: 10 })
  }

  CreateTextures() {
    const blue = new PBRMaterial("blue", this.scene)
    const orange = new PBRMaterial("orange", this.scene)
    const green = new PBRMaterial("green", this.scene)

    blue.roughness = 1
    orange.roughness = 1
    green.roughness = 1

    blue.albedoTexture = new Texture("./textures/blue.png", this.scene)
    green.albedoTexture = new Texture("./textures/green.png", this.scene)
    orange.albedoTexture = new Texture("./textures/orange.png", this.scene)

    blue.albedoTexture.hasAlpha = true
    orange.albedoTexture.hasAlpha = true
    green.albedoTexture.hasAlpha = true

    blue.zOffset = -0.25
    orange.zOffset = -0.25
    green.zOffset = -0.25

    this.splatters = [blue, orange, green]
  }

  CreatePickingRay() {
    this.scene.onPointerDown = () => {
      const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.camera)

      const rayCastHit = this.scene.pickWithRay(ray)

      if (rayCastHit?.hit && rayCastHit.pickedMesh?.name === "sphere") {
        const decal = MeshBuilder.CreateDecal("decal", rayCastHit.pickedMesh, {
          position: rayCastHit.pickedPoint!,
          normal: rayCastHit.getNormal(true)!,
          size: new Vector3(1, 1, 1),
        })

        decal.material = this.splatters[Math.floor(Math.random() * this.splatters.length)]
        decal.setParent(rayCastHit.pickedMesh)

        rayCastHit.pickedMesh.physicsImpostor?.applyImpulse(ray.direction.scale(5), rayCastHit.pickedPoint!)
      }
    }
  }
}
