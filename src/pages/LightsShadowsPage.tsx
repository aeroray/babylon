import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { LightsShadows } from "../examples"

const LightsShadowsPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new LightsShadows(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/custom-models'
        prevText='Custom Models'
        nextLink='/baked-lighting'
        nextText='Baked Lighting'
        title='Lights and Shadows'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default LightsShadowsPage
