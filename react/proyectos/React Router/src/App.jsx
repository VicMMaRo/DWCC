import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'
import './App.css'
import Inicio from './components/Inicio'
import Coches from './components/Coches'
import Motos from './components/Motos'
import Padre from './components/Padre'

function App() {

  return (
    /* <BrowserRouter> 
    <nav>
      <Link to = "/">Inicio</Link>
      <Link to = "/coches">Coches</Link>
      <Link to = "/motos">Motos</Link>
    </nav>

    <div>
      <Routes>
        <Route path='/' element={<Inicio/>}/>
        <Route path='/coches' element={<Coches/>}/>
        <Route path='/motos' element={<Motos/>}/>
      </Routes>
    </div>

    </BrowserRouter> */
    <Padre />

  )
  
}

export default App
