import { useState } from 'react'
import { toast } from 'react-hot-toast'

export const AgregarLugar = () => {
    const [nombre, setNombre] = useState('')
    const [grupo, setGrupo] = useState('cervecerias')
    const [latitud, setLatitud] = useState('')
    const [longitud, setLongitud] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/lugares/agregar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    grupo,
                    latitud,
                    longitud,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setNombre('')
                setLatitud('')
                setLongitud('')

                toast.success('lugar agregado')
            } else {
                console.error('error al agregar lugar desde el front:', data.error)
                toast.error('no se pudo agregar el lugar')
            }

        } catch (err) {
            console.error('error en el POST al agregar un lugar:', err)
        }
    }

    return (
        <section className="max-w-md mx-auto p-6 bg-white rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Agregar lugar</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nombre del lugar"
                    className="border px-4 py-2 rounded-lg"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <select
                    className="border px-4 py-2 rounded-lg cursor-pointer"
                    value={grupo}
                    onChange={(e) => setGrupo(e.target.value)}
                >
                    <option value="cervecerias">Cervecerias</option>
                    <option value="universidades">Universidades</option>
                    <option value="farmacias">Farmacias</option>
                    <option value="emergencias">Emergencias</option>
                    <option value="supermercados">Supermercados</option>
                </select>

                <input
                    type="number"
                    placeholder="Latitud"
                    className="border px-4 py-2 rounded-lg"
                    value={latitud}
                    onChange={(e) => setLatitud(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Longitud"
                    className="border px-4 py-2 rounded-lg"
                    value={longitud}
                    onChange={(e) => setLongitud(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-amber-400 hover:bg-amber-600 font-semibold text-white py-2 rounded-lg cursor-pointer"
                >
                    Agregar
                </button>
            </form>
        </section>
    )
}
