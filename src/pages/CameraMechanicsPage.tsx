import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { CameraMechanics } from "../examples"

const CameraMechanicsPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new CameraMechanics(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/baked-lighting'
        prevText='Baked Lighting'
        nextLink='/mesh-actions'
        nextText='Mesh Actions'
        title='Camera Mechanics'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default CameraMechanicsPage
