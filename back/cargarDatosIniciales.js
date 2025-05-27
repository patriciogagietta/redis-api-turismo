import { grupos } from './datos.js'

const cargaDatosIniciales = async (client) => {

    const cargado = await client.get('cargado')
    if (cargado === 'true'){
        console.log('los datos iniciales ya estan cargados en redis')
        return
    }

    for (const [grupo, lugares] of Object.entries(grupos)) {
        for (const lugar of lugares) {
            await client.geoAdd(`grupo:${grupo}`, {
                longitude: lugar.longitud,
                latitude: lugar.latitud,
                member: lugar.nombre
            })
        }
    }

    await client.set('cargado', 'true')
    console.log('datos iniciales cargados en Redis')
}

export default cargaDatosIniciales
