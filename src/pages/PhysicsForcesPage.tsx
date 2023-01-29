import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { PhysicsForces } from "../examples"

const PhysicsForcesPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new PhysicsForces(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/physics-velocity'
        prevText='Physics Velocity'
        nextLink='/ray-casting '
        nextText='Ray Casting '
        title='Physics Forces'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default PhysicsForcesPage
