import "@babylonjs/loaders"

import * as CANNON from "cannon"

import {
  AbstractMesh, CannonJSPlugin, Color3, Engine, FreeCamera, HemisphericLight, MeshBuilder,
  PhysicsImpostor, Scene, SceneLoader, StandardMaterial, Vector3
} from "@babylonjs/core"

export class CollisionsTriggers {
  scene: Scene
  engine: Engine
  sphere!: AbstractMesh
  ground!: AbstractMesh

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.engine.displayLoadingUI()

    this.scene = this.CreateScene()

    this.CreateEnvironment()
    this.CreateImpostors()
    this.DetectTrigger()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)

    new HemisphericLight("light", new Vector3(0, 1, 0), scene)

    const camera = new FreeCamera("camera", new Vector3(0, 10, -20), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl()
    camera.minZ = 0.5

    scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin(true, 10, CANNON))

    return scene
  }

  async CreateEnvironment() {
    await SceneLoader.ImportMeshAsync("", "./models/", "prototype_level.glb", this.scene)

    this.engine.hideLoadingUI()
  }

  CreateImpostors() {
    this.ground = MeshBuilder.CreateGround("ground", {
      width: 40,
      height: 40,
    })
    this.ground.position.y = 0.25
    this.ground.isVisible = true
    this.ground.physicsImpostor = new PhysicsImpostor(this.ground, PhysicsImpostor.BoxImpostor, {
      mass: 0,
      restitution: 1,
    })

    this.sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2 })
    this.sphere.position = new Vector3(0, 4, 0)
    this.sphere.physicsImpostor = new PhysicsImpostor(this.sphere, PhysicsImpostor.SphereImpostor, {
      mass: 1,
      restitution: 1,
      friction: 1,
    })

    this.sphere.physicsImpostor.registerOnPhysicsCollide(this.ground.physicsImpostor, this.DetectCollisions)
    // this.sphere.physicsImpostor.unregisterOnPhysicsCollide(this.ground.physicsImpostor, this.DetectCollisions)
  }

  DetectCollisions(col: PhysicsImpostor, colAgainst: any): void {
    const redMat = new StandardMaterial("mat", this.scene)
    redMat.diffuseColor = new Color3(1, 0, 0)

    // col.object.scaling = new Vector3(3, 3, 3);
    // col.setScalingUpdated();

    const againstObj = colAgainst.object as AbstractMesh
    againstObj.material = redMat
  }

  DetectTrigger() {
    const box = MeshBuilder.CreateBox("box", { width: 4, height: 1, depth: 4 })
    box.position = new Vector3(0, 0.5, 0)
    box.visibility = 0.25

    let counter = 0

    this.scene.registerBeforeRender(() => {
      if (box.intersectsMesh(this.sphere)) counter++

      if (counter === 1) console.log("Entered Trigger")
    })
  }
}
