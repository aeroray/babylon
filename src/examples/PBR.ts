import {
  Color3, CubeTexture, Engine, FreeCamera, GlowLayer, HemisphericLight, MeshBuilder, PBRMaterial,
  Scene, Texture, Vector3
} from "@babylonjs/core"

export class PBR {
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

    // const hemisphericLight = new HemisphericLight("hemisphericLight", new Vector3(0, 1, 0), scene)
    // hemisphericLight.intensity = 0

    const envTexture = CubeTexture.CreateFromPrefilteredData("./environment/sky.env", scene)
    scene.environmentTexture = envTexture
    scene.createDefaultSkybox(envTexture, true)
    scene.environmentIntensity = 0.5

    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene)
    ground.material = this.CreateGroundMaterial()

    const ball = MeshBuilder.CreateSphere("ball", { diameter: 1 }, scene)
    ball.material = this.CreateBallMaterial()
    ball.position = new Vector3(0, 1, 0)

    return scene
  }

  CreateGroundMaterial() {
    const pbr = new PBRMaterial("pbr", this.scene)
    pbr.albedoTexture = new Texture("./textures/asphalt/asphalt_diffuse.jpg", this.scene)
    pbr.bumpTexture = new Texture("./textures/asphalt/asphalt_normal.jpg", this.scene)
    pbr.metallicTexture = new Texture("./textures/asphalt/asphalt_ao_rough_metal.jpg", this.scene)

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true

    return pbr
  }

  CreateBallMaterial() {
    const pbr = new PBRMaterial("pbr", this.scene)
    pbr.albedoTexture = new Texture("./textures/lava/lava_diffuse.jpg", this.scene)
    pbr.bumpTexture = new Texture("./textures/lava/lava_normal.jpg", this.scene)
    pbr.metallicTexture = new Texture("./textures/lava/lava_ao_rough_metal.jpg", this.scene)
    pbr.emissiveTexture = new Texture("./textures/lava/lava_emissive.jpg", this.scene)

    pbr.emissiveColor = new Color3(1, 1, 1)
    pbr.emissiveIntensity = 2

    pbr.useAmbientOcclusionFromMetallicTextureRed = true
    pbr.useRoughnessFromMetallicTextureGreen = true
    pbr.useMetallnessFromMetallicTextureBlue = true

    pbr.invertNormalMapX = true
    pbr.invertNormalMapY = true

    pbr.environmentIntensity = 0.25

    const glowLayer = new GlowLayer("glow", this.scene)
    glowLayer.intensity = 1

    return pbr
  }
}
