import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { RayCasting } from "../examples"

const RayCastingPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new RayCasting(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/physics-forces'
        prevText='PhysicsForces'
        nextLink='/'
        nextText='To be continued'
        title='Ray Casting'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default RayCastingPage
