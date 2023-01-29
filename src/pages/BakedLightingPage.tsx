import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { BakedLighting } from "../examples"

const BakedLightingPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new BakedLighting(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/lights-shadows'
        prevText='Lights and Shadows'
        nextLink='/camera-mechanics'
        nextText='Camera Mechanics'
        title='Baked Lighting'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default BakedLightingPage
