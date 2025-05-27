import { useEffect, useState } from 'react'
import { CardLugar } from './CardLugar'

export const LugaresCercanos = ({ distancia, calcularDistancia, ubicacion }) => {
    const [lugaresCercanos, setLugaresCercanos] = useState([])
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        const fetchCercanos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/lugares/cercanos?latitud=${ubicacion.latitud}&longitud=${ubicacion.longitud}`)
                const data = await response.json()

                if (response.ok) {
                    setLugaresCercanos(data)
                } else {
                    console.error('error obteniendo lugares cercanos')
                }

            } catch (err) {
                console.error('error al obtener lugares cercanos:', err)
            }

            setCargando(false)
        }

        fetchCercanos()
    }, [ubicacion])

    if (cargando) return <p className="text-center mt-3 font-bold">Buscando lugares cercanos...</p>

    return (
        <section className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Lugares Cercanos (5km)</h2>

            {lugaresCercanos.length === 0 ? (
                <p className="text-center font-bold">No se encontraron lugares cercanos</p>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {lugaresCercanos.map((lugar, index) => (
                        <CardLugar 
                            key={index} 
                            lugar={lugar} 
                            distancia={distancia} 
                            calcularDistancia={calcularDistancia} 
                        />
                    ))}
                </div>
            )}
        </section>
    )
}