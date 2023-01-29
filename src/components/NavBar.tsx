import { FC } from "react"
import { Link } from "react-router-dom"

interface IProps {
  prevLink?: string
  prevText?: string
  nextLink?: string
  nextText?: string
  title: string
}

const NavBar: FC<IProps> = (props) => {
  const { prevLink, prevText, nextLink, nextText, title } = props

  return (
    <header className='relative flex items-center justify-center bg-white opacity-70 shadow'>
      {prevLink && (
        <Link to={prevLink} className='absolute left-4 flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
          </svg>
          <span>{prevText}</span>
        </Link>
      )}
      <div className='h-16 text-3xl flex justify-center items-center'>{title}</div>
      {nextLink && (
        <Link to={nextLink} className='absolute right-4 flex'>
          <span>{nextText}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
          </svg>
        </Link>
      )}
    </header>
  )
}

export default NavBar
