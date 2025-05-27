import { useEffect, useState } from 'react'
import { CardLugar } from './CardLugar'

export const Lugares = ({ distancia, calcularDistancia }) => {
    const [lugares, setLugares] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchLugares = async () => {
            try {
                const response = await fetch('http://localhost:3000/lugares')
                if (!response.ok) {
                    console.error('error al obtener los lugares')
                    return
                }

                const data = await response.json()

                setLugares(data)
                setCargando(false)
            } catch (err) {
                console.error('error en el fetch de todos los lugares:', err)
            }
        }

        fetchLugares()
    }, [])

    if (cargando) return <p className="text-center mt-3 font-bold">Cargando lugares...</p>

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Todos los lugares</h2>

            <div className="grid grid-cols-3 gap-6">
                {lugares.map((lugar, index) => (
                    <CardLugar 
                        key={index} 
                        lugar={lugar} 
                        distancia={distancia} 
                        calcularDistancia={calcularDistancia} 
                    />
                ))}
            </div>
        </section>
    )
}
