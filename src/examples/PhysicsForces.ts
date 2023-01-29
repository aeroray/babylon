import "@babylonjs/loaders"

import * as CANNON from "cannon"

import {
  ActionManager, CannonJSPlugin, Color3, CubeTexture, Engine, ExecuteCodeAction, FreeCamera, Mesh,
  MeshBuilder, PBRMaterial, PhysicsImpostor, Scene, SceneLoader, Vector3
} from "@babylonjs/core"

export class PhysicsForces {
  scene: Scene
  engine: Engine
  camera!: FreeCamera
  cannonball!: Mesh
  ground!: Mesh

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()
    this.CreateEnvironment()
    this.CreatePhysics()

    this.scene.onPointerDown = (e) => {
      if (e.button === 2) this.ShootCannonball()
    }

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
    this.CreateImpulse()
    this.CreateCannonball()
  }

  CreateImpostors() {
    const ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    })
    ground.isVisible = false
    ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor, {
      mass: 0,
      friction: 1,
      restitution: 0.5,
    })

    this.ground = ground
  }

  CreateImpulse() {
    const box = MeshBuilder.CreateBox("box", { height: 4 })
    const boxMat = new PBRMaterial("boxMat", this.scene)
    boxMat.roughness = 1
    boxMat.albedoColor = new Color3(1, 0.5, 0)

    box.position.y = 3
    box.material = boxMat
    box.physicsImpostor = new PhysicsImpostor(box, PhysicsImpostor.BoxImpostor, { mass: 0.5, friction: 1 })

    box.actionManager = new ActionManager(this.scene)
    box.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPickDownTrigger, () => {
        box.physicsImpostor!.applyImpulse(new Vector3(-1, 0, 0), box.getAbsolutePosition().add(new Vector3(0, 2, 0)))
      })
    )
  }

  CreateCannonball() {
    this.cannonball = MeshBuilder.CreateSphere("cannonball", { diameter: 0.5 })

    const ballMat = new PBRMaterial("ballMat", this.scene)
    ballMat.roughness = 1
    ballMat.albedoColor = new Color3(0, 1, 0)

    this.cannonball.material = ballMat
    this.cannonball.physicsImpostor = new PhysicsImpostor(this.cannonball, PhysicsImpostor.SphereImpostor, {
      mass: 1,
      friction: 1,
      restitution: 0.5,
    })
    this.cannonball.position = this.camera.position
    this.cannonball.setEnabled(false)
  }

  ShootCannonball() {
    const clone = this.cannonball.clone("clone")
    clone.position = this.camera.position
    clone.setEnabled(true)

    clone.physicsImpostor!.applyForce(this.camera.getForwardRay().direction.scale(500), clone.getAbsolutePosition())
    clone.physicsImpostor!.registerOnPhysicsCollide(this.ground.physicsImpostor!, () => {
      setTimeout(() => {
        clone.dispose()
      }, 3000)
    })
  }
}
