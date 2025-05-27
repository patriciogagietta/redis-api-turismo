export const CardLugar = ({ lugar, distancia, calcularDistancia }) => {
    return (
        <div className="border rounded-2xl p-4 bg-white shadow hover:shadow-lg">
            <h3 className="text-lg font-bold mb-2 uppercase">{lugar.nombre}</h3>
            <p className="">Grupo: <span className=''>{lugar.grupo}</span></p>
            <p className="">Latitud: {lugar.latitud}</p>
            <p className="">Longitud: {lugar.longitud}</p>
            <button
                className="mt-4 px-4 py-2 bg-amber-400 font-semibold rounded-lg hover:bg-amber-600 duration-150 cursor-pointer"
                onClick={() => calcularDistancia(lugar.grupo, lugar.nombre)}
            >
                Calcular distancia
            </button>

            {distancia && distancia.grupo === lugar.grupo && distancia.nombre === lugar.nombre && (
                <p className="mt-2 text-green-600 font-semibold">
                    Distancia: {distancia.valor}
                </p>
            )}
        </div>
    )
}
