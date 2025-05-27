import logoTurismo from '../assets/logo-turismo.png';

import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className='flex justify-between items-center py-4 px-12 bg-amber-100'>
      <Link to="/">
        <img className='w-90 cursor-pointer hover:scale-105 duration-150' src={logoTurismo} alt="logo header turismo" />
      </Link>

      <ul className='flex gap-4 font-semibold'>
        <li>
          <Link to="/" className="hover:text-amber-400 duration-150">Lugares</Link>
        </li>
        <li>
          <Link to="/lugarescercanos" className="hover:text-amber-400 duration-150">Lugares cercanos</Link>
        </li>
        <li>
          <Link to="/agregarlugar" className="hover:text-amber-400 duration-150">Agregar lugar</Link>
        </li>
      </ul>
    </header>
  )
}
