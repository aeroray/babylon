import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { BasicScene } from "../examples"

const BasicScenePage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new BasicScene(ref.current)
  }, [])

  return (
    <>
      <NavBar nextLink='/standard-materials' nextText='Standard Materials' title='Basic Scene' />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default BasicScenePage
