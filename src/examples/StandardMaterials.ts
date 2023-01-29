import {
  Engine, FreeCamera, HemisphericLight, MeshBuilder, Scene, StandardMaterial, Texture, Vector3
} from "@babylonjs/core"

export class StandardMaterials {
  scene: Scene
  engine: Engine

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true)
    this.scene = this.CreateScene()

    this.engine.runRenderLoop(() => {
      this.scene.render()
    })
  }

  CreateScene() {
    const scene = new Scene(this.engine)
    const camera = new FreeCamera("camera", new Vector3(0, 1, -5), scene)
    camera.attachControl()
    camera.speed = 0.25

    const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene)
    hemisphericLight.intensity = 1

    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene)
    ground.material = this.CreateGroundMaterial()

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, scene)
    ball.material = this.CreateBallMaterial()
    ball.position = new Vector3(0, 1, 0)

    return scene
  }

  CreateGroundMaterial() {
    const uvScale = 4
    const textures: Texture[] = []

    const diffuseTexture = new Texture("./textures/stone/stone_diffuse.jpg", this.scene)
    textures.push(diffuseTexture)

    const bumpTexture = new Texture("./textures/stone/stone_normal.jpg", this.scene)
    textures.push(bumpTexture)

    const ambientTexture = new Texture("./textures/stone/stone_ao.jpg", this.scene)
    textures.push(ambientTexture)

    const specularTexture = new Texture("./textures/stone/stone_spec.jpg", this.scene)
    textures.push(specularTexture)

    const groundMaterial = new StandardMaterial("groundMaterial", this.scene)
    groundMaterial.diffuseTexture = diffuseTexture
    groundMaterial.bumpTexture = bumpTexture
    groundMaterial.ambientTexture = ambientTexture
    groundMaterial.specularTexture = specularTexture

    textures.forEach((texture) => {
      texture.uScale = uvScale
      texture.vScale = uvScale
    })

    return groundMaterial
  }

  CreateBallMaterial() {
    const uvScale = 2
    const textures: Texture[] = []

    const diffuseTexture = new Texture("./textures/metal/metal_diffuse.jpg", this.scene)
    textures.push(diffuseTexture)

    const bumpTexture = new Texture("./textures/metal/metal_normal.jpg", this.scene)
    textures.push(bumpTexture)

    const ambientTexture = new Texture("./textures/metal/metal_ao.jpg", this.scene)
    textures.push(ambientTexture)

    const specularTexture = new Texture("./textures/metal/metal_spec.jpg", this.scene)
    textures.push(specularTexture)

    const ballMaterial = new StandardMaterial("ballMaterial", this.scene)
    ballMaterial.diffuseTexture = diffuseTexture
    ballMaterial.bumpTexture = bumpTexture
    ballMaterial.ambientTexture = ambientTexture
    ballMaterial.specularTexture = specularTexture

    ballMaterial.specularPower = 3

    ballMaterial.invertNormalMapX = true
    ballMaterial.invertNormalMapY = true

    textures.forEach((texture) => {
      texture.uScale = uvScale
      texture.vScale = uvScale
    })

    return ballMaterial
  }
}
