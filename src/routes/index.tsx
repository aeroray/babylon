import { useRoutes } from "react-router-dom"

import { Layout } from "../layouts"
import BakedLightingPage from "../pages/BakedLightingPage"
import BasicScenePage from "../pages/BasicScenePage"
import CameraMechanicsPage from "../pages/CameraMechanicsPage"
import CollisionsTriggersPage from "../pages/CollisionsTriggersPage"
import CustomModelsPage from "../pages/CustomModelsPage"
import FPControllerPage from "../pages/FPControllerPage"
import LightsShadowsPage from "../pages/LightsShadowsPage"
import MeshActionsPage from "../pages/MeshActionsPage"
import PBRPage from "../pages/PBRPage"
import PhysicsForcesPage from "../pages/PhysicsForcesPage"
import PhysicsVelocityPage from "../pages/PhysicsVelocityPage"
import RayCastingPage from "../pages/RayCastingPage"
import StandardMaterialsPage from "../pages/StandardMaterialsPage"

const Router = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <BasicScenePage /> },
        { path: "basic-scene", element: <BasicScenePage /> },
        { path: "standard-materials", element: <StandardMaterialsPage /> },
        { path: "pbr", element: <PBRPage /> },
        { path: "custom-models", element: <CustomModelsPage /> },
        { path: "lights-shadows", element: <LightsShadowsPage /> },
        { path: "baked-lighting", element: <BakedLightingPage /> },
        { path: "camera-mechanics", element: <CameraMechanicsPage /> },
        { path: "mesh-actions", element: <MeshActionsPage /> },
        { path: "fp-controller", element: <FPControllerPage /> },
        { path: "collisions-triggers", element: <CollisionsTriggersPage /> },
        { path: "physics-velocity", element: <PhysicsVelocityPage /> },
        { path: "physics-forces", element: <PhysicsForcesPage /> },
        { path: "ray-casting", element: <RayCastingPage /> },
      ],
    },
  ])

  return router
}

export default Router
