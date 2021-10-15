import { H3 } from './H3'


export const Calulate = {
    'Based on geospatial index': ({ dataClients,
        dataDrivers,
        output,
        setOutput,
        arrayMatch,
        setArrayMatch,
        setDraw, 
        options }) => H3({ dataClients, dataDrivers, output, setOutput, arrayMatch, setArrayMatch, setDraw, options })
}