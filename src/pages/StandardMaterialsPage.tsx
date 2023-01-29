import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { StandardMaterials } from "../examples"

const StandardMaterialsPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new StandardMaterials(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/basic-scene'
        prevText='Basic Scene'
        nextLink='/pbr'
        nextText='PBR'
        title='Standard Materials'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default StandardMaterialsPage
