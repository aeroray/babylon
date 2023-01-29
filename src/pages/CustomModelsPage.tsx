import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { CustomModels } from "../examples"

const CustomModelsPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new CustomModels(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/pbr'
        prevText='PBR'
        nextLink='/lights-shadows'
        nextText='Lights and Shadows'
        title='Custom Models'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default CustomModelsPage
