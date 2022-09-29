import { useState, createContext } from "react";
import axios from "axios";
const LetrasContext = createContext()

const LetrasProvider = ({children}) => {

    const [alerta, setAlerta] = useState('')
    const [letra, setLetra] = useState('')
    const [cargando, setCargando] = useState(false)
    const busquedaLetra = async (busqueda) => {
        setCargando(true)
        try {
            const {artista, cancion} = busqueda
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': `${import.meta.env.VITE_API_KEY}`,
                    'X-RapidAPI-Host': `${import.meta.env.VITE_API_HOST}`
                }
            };

            const url = `https://lyrics-plus.p.rapidapi.com/lyrics/${artista}/${cancion}`
            const {data} = await axios(url,options)
            setLetra(data.lyrics)
            setAlerta('')
        } catch (error) {
            setAlerta('Canción no Encontrada')
            console.log(error)
        }
        setCargando(false)
    }

    return (
        <LetrasContext.Provider
        value={{
            alerta,
            setAlerta,
            busquedaLetra,
            letra,
            cargando
        }}>
            {children}
        </LetrasContext.Provider>
    )
}
export {
    LetrasProvider
}
export default LetrasContext