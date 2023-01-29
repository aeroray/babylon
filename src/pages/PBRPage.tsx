import { useEffect, useRef } from "react"

import { NavBar } from "../components"
import { PBR } from "../examples"

const PBRPage = () => {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current) return

    new PBR(ref.current)
  }, [])

  return (
    <>
      <NavBar
        prevLink='/standard-materials'
        prevText='Standard Materials'
        nextLink='/custom-models'
        nextText='Custom Models'
        title='PBR'
      />
      <section className='flex items-center justify-center w-full h-full'>
        <canvas className='w-4/5 h-4/5 rounded-xl outline-none' ref={ref}></canvas>
      </section>
    </>
  )
}

export default PBRPage
