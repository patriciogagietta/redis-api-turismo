import express from 'express'
import cors from 'cors'

import client from './redisClient.js'
import cargaDatosIniciales from './cargarDatosIniciales.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/lugares', async (req, res) => {
    try {
        const grupos = ['cervecerias', 'universidades', 'farmacias', 'emergencias', 'supermercados']

        const lugares = []

        for (const grupo of grupos) {
            const nombresLugares = await client.zRange(`grupo:${grupo}`, 0, -1)

            for (const nombre of nombresLugares) {
                const posicion = await client.geoPos(`grupo:${grupo}`, nombre)

                if (posicion[0]) {
                    lugares.push({
                        nombre,
                        grupo,
                        longitud: posicion[0].longitude,
                        latitud: posicion[0].latitude
                    })
                }
            }
        }

        res.status(200).json(lugares)

    } catch (error) {
        res.status(500).json({
            error: 'error al obtener los lugares'
        })
    }
})

app.post('/lugares/agregar', async (req, res) => {
    const { nombre, grupo, latitud, longitud } = req.body

    if (!nombre || !grupo || !latitud || !longitud) {
        return res.status(400).json({ 
            error: 'faltan datos requeridos'
        })
    }

    const grupos = ['cervecerias', 'universidades', 'farmacias', 'emergencias', 'supermercados']

    if (!grupos.includes(grupo)) {
        return res.status(400).json({ 
            error: 'grupo incorrecto'
        })
    }

    try {
        const existe = await client.zScore(`grupo:${grupo}`, nombre)

        if (existe !== null) {
            return res.status(400).json({ 
                error: 'el lugar ya existe en el grupo'
            })
        }

        await client.geoAdd(`grupo:${grupo}`, {
            longitude: longitud,
            latitude: latitud,
            member: nombre
        })

        res.status(201).json({ 
            mensaje: 'lugar agregado' 
        })

    } catch (error) {
        res.status(500).json({ 
            error: 'error al agregar el lugar' 
        })
    }
})

app.get('/lugares/cercanos', async (req, res) => {
    const { latitud, longitud } = req.query

    if (!latitud || !longitud) {
        return res.status(400).json({ 
            error: 'Faltan latitud o longitud' 
        })
    }

    const grupos = ['cervecerias', 'universidades', 'farmacias', 'emergencias', 'supermercados']
    const lugaresCercanos = []

    try {
        for (const grupo of grupos) {
            const lugares = await client.sendCommand([
                'GEOSEARCH',
                `grupo:${grupo}`,
                'FROMLONLAT',
                longitud,
                latitud,
                'BYRADIUS',
                '5',
                'km',
                'WITHCOORD'
            ])

            for (const lugar of lugares) {
                const [nombre, [lonStr, latStr]] = lugar
                lugaresCercanos.push({
                    nombre,
                    grupo,
                    longitud: parseFloat(lonStr),
                    latitud: parseFloat(latStr)
                })
            }
        }

        res.status(200).json(lugaresCercanos)
    } catch (error) {
        res.status(500).json({ 
            error: 'error buscando lugares cercanos a 5km' 
        })
    }
})

app.get('/lugares/distancia', async (req, res) => {
    const { latitud, longitud, nombre, grupo } = req.query

    if (!latitud || !longitud || !nombre || !grupo) {
        return res.status(400).json({
            error: 'faltan datos requeridos'
        })
    }

    try {
        const posicion = await client.geoPos(`grupo:${grupo}`, nombre)

        if (!posicion[0]) {
            return res.status(400).json({ 
                error: 'lugar no encontrado cuando se busca un lugar especifico' 
            })
        }

        const latUser = parseFloat(latitud)
        const longUser = parseFloat(longitud)

        const latLugar = parseFloat(posicion[0].latitude)
        const longLugar = parseFloat(posicion[0].longitude)

        const distancia = calcularDistancia(latUser, longUser, latLugar, longLugar)

        res.status(200).json({ distancia: distancia.toFixed(2) })
    } catch (error) {
        res.status(500).json({ 
            error: 'error al calcular distancia del usuario con un lugar especifico' 
        })
    }
})

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
}


const main = async () => {
    try {
        await client.connect()

        await cargaDatosIniciales(client)

        app.listen(3000, () => {
            console.log('Servidor corriendo en el puerto 3000')
        })
    } catch (err) {
        console.error('Error al iniciar el servidor', err)
    }

}

main()