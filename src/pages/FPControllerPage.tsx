import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { FPController } from "../examples"

const FPControllerPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new FPController(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/mesh-actions'
        prevText='Mesh Actions'
        nextLink='/collisions-triggers'
        nextText='Collisions and Triggers'
        title='First Person Controller'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default FPControllerPage
