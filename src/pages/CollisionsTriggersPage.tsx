import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { CollisionsTriggers } from "../examples"

const CollisionsTriggersPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new CollisionsTriggers(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/fp-controller'
        prevText='First Person Controller'
        nextLink='/physics-velocity'
        nextText='Physics Velocity'
        title='Collisions and Triggers'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default CollisionsTriggersPage
