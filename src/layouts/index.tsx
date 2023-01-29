import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <main className='flex flex-col w-screen h-screen relative'>
      <div className='absolute inset-0 -z-10 bg-slate-50 bg blur-lg opacity-25'></div>
      <Outlet />
    </main>
  )
}
