import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { PhysicsVelocity } from "../examples"

const PhysicsVelocityPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new PhysicsVelocity(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/collisions-triggers'
        prevText='Collisions and Triggers'
        nextLink='/physics-forces'
        nextText='Physics Forces'
        title='Physics Velocity'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default PhysicsVelocityPage
