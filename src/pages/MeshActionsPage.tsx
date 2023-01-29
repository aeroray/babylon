import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { MeshActions } from "../examples"

const MeshActionsPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new MeshActions(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/camera-mechanics'
        prevText='Camera Mechanics'
        nextLink='/fp-controller'
        nextText='First Person Controller'
        title='Mesh Actions'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default MeshActionsPage
