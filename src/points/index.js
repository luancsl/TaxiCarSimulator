import react from "react";
import { XML } from '../xml'

const downloadFile = (data, text) => {
    const element = document.createElement("a");
    const file = new Blob([data], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    const date = new Date()
    element.download = `Test ${text ? ('(' + text + ')') : ''} - ${date.getTime()}.xml`;
    document.body.appendChild(element);
    element.click();
}


export const exportPoints = (clients, drivers, text) => {
    const xml = XML.parseCoords2Xml({ clients, drivers })
    return downloadFile(xml, text)

}


export const importPoints = (file, setClients, setDrivers, setCountClient, setCountDriver, countDriverRef) => {

    const coords = XML.parseXml2Coords(file)
    const clients = coords.data.clients
    const drivers = coords.data.drivers

    if (clients) {
        if (Array.isArray(clients)) {
            setClients(clients)
            const count = parseInt(clients[0].id.substring(1))
            setCountClient(count + 1)
        } else {
            setClients([clients])
            const count = parseInt(clients.id.substring(1))
            setCountClient(count + 1)
        }
    }

    if (drivers) {
        if (Array.isArray(drivers)) {
            setDrivers(drivers)
            const count = parseInt(drivers[0].id.substring(1))
            setCountDriver(countDriverRef.current = count + 1)
        } else {
            setDrivers([drivers])
            const count = parseInt(drivers.id.substring(1))
            setCountDriver(countDriverRef.current = count + 1)
        }
    }
}