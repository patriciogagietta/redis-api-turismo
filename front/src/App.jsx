import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Header } from './componentes/Header'
import { Lugares } from './componentes/Lugares'
import { LugaresCercanos } from './componentes/LugaresCercanos'
import { AgregarLugar } from './componentes/AgregarLugar'
import './App.css'

function App() {
  const [distancia, setDistancia] = useState(null)
  const [ubicacion, setUbicacion] = useState({})

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitud = pos.coords.latitude
        const longitud = pos.coords.longitude
        setUbicacion({ latitud, longitud })
      },
      (err) => {
        console.error('error al obtener ubicación:', err)
      }
    )
  }, [])
  
  const calcularDistancia = async (grupo, nombre) => {
    if (!ubicacion) return

    try {
      const response = await fetch(`http://localhost:3000/lugares/distancia?latitud=${ubicacion.latitud}&longitud=${ubicacion.longitud}&nombre=${nombre}&grupo=${grupo}`)
      const data = await response.json()

      if (response.ok) {
        setDistancia({
          grupo,
          nombre,
          valor: `${data.distancia} km`
        })
      }
    } catch (err) {
      console.error('error al calcular distancia:', err)
    }
  }

  return (
    <>
      <Toaster position="bottom-left" />
      <Header />
      <Routes>
        <Route path="/" element={<Lugares distancia={distancia} calcularDistancia={calcularDistancia} />} />
        <Route path='/lugarescercanos' element={<LugaresCercanos distancia={distancia} calcularDistancia={calcularDistancia} ubicacion={ubicacion} />} />
        <Route path='/agregarlugar' element={<AgregarLugar />} />
      </Routes>
    </>
  )
}

export default App
