import { h3ToGeoBoundary } from "h3-js";
import { Queue } from './queue';
import { Match } from './match';


const coordinatesPresent = (obj, dataClients, dataDrivers) => {

    return {
        client: dataClients[obj.client[1]].id,
        driver: dataDrivers[obj.driver[1]].id
    }
}

const matchPresent = (obj, dataClients, dataDrivers) => {

    return {
        origin: dataClients[obj.client[1]],
        destination: dataDrivers[obj.driver[1]]
    }
}

const init = ({
    dataClients,
    dataDrivers,
    output,
    setOutput,
}) => {

    console.log("dataClients ::", dataClients);
    console.log("dataDrivers ::", dataDrivers);

    Queue.resetClients()
    Queue.removeDriver()



    dataClients.forEach(value => {
        Queue.addClient(value);
    });

    setOutput(output.current = [...output.current, "-----------------seeded clients----------- ----"])

    setOutput(output.current = [...output.current, `Clients : ${JSON.stringify(Queue.getClients().map((v, i) => v.id), null, 4)}`]);

    dataDrivers.forEach(value => {
        Queue.addDriver(value);
    });

    setOutput(output.current = [...output.current, "-----------------seeded drivers---------------"])

    setOutput(output.current = [...output.current, `Drivers : ${JSON.stringify(Queue.getDrivers().map((v, i) => v.id), null, 4)}`]);

}


export const H3 = ({
    dataClients,
    dataDrivers,
    output,
    setOutput,
    arrayMatch,
    setArrayMatch,
    draw,
    setDraw,
    options
}) => {

    setOutput([])

    console.log("Draws: ", draw);

    init({ dataClients, dataDrivers, output, setOutput })

    setOutput(output.current = [...output.current, "---------------------------------------------"]);

    const matchArray = Match.calculate({
        ...Queue, onSelected: (v) => {
            const bounds = h3ToGeoBoundary(v.value.indexH3).map((value, idx) => ({ lat: value[0], lng: value[1] }))
            setDraw({ type: v.type, coords: v.coords ? [{ lat: v.coords[0].lat, lng: v.coords[0].lng }, { lat: v.coords[1].lat, lng: v.coords[1].lng }] : null, bounds: [...bounds, bounds[0]] })
        },
        options
    });

    const direction = matchArray.matchArray.map(value => matchPresent(value, dataClients, dataDrivers))

    setArrayMatch(arrayMatch.current = direction);

    matchArray.matchArray.map((value, idx) => {
        const outputResult = coordinatesPresent(value, dataClients, dataDrivers)
        setOutput(output.current = [...output.current, `Match ${idx} : ${JSON.stringify(outputResult, null, 6)}`]);
    })

    setOutput(output.current = [...output.current, `Time : ${JSON.stringify(matchArray.time, null, 4)} ms`]);

    setOutput(output.current = [...output.current, "---------------------------------------------"]);

    setOutput(output.current = [...output.current, `Clients : ${JSON.stringify(Queue.getClients().map((v, i) => v.id), null, 4)}`]);
    setOutput(output.current = [...output.current, `Drivers : ${JSON.stringify(Queue.getDrivers().map((v, i) => v.id), null, 4)}`]);

}