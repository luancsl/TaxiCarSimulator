import { h3ToParent, h3GetResolution, h3ToGeoBoundary, geoToH3 } from "h3-js";

export const Match = {
    calculate: ({
        getClients,
        getDrivers,
        getClient,
        getDriver,
        removeClient,
        removeDriver,
        clearClients,
        clearDrivers,
        searchDriversToMatch,
        onSelected,
        options
    }) => {
        const initialResolution = options?.initialResolution
        const depthLimit = options?.depthLimit
        const matchArray = []

        console.log("initialResolution : ", initialResolution);
        console.log("depthLimit : ", depthLimit);


        const clients = [...getClients().map((value, i) => {
            const indexH3 = geoToH3(value.lat, value.lng, initialResolution)
            const compose = { indexH3, ...value }
            onSelected({ type: 'defaultPlace', coords: null, value: compose })
            return compose
        })]
        let drivers = [...getDrivers().map((value, i) => {
            const indexH3 = geoToH3(value.lat, value.lng, initialResolution)
            const compose = { indexH3, ...value }
            onSelected({ type: 'defaultPlace', coords: null, value: compose })
            return compose
        })]

        const startTime = new Date().getTime()

        clients.forEach((value, idx) => {
            console.log(`--------------------Client ${value.id}/${idx}------------------`);
            let c = 0
            let found = []
            while (c < depthLimit) {
                const depth = h3GetResolution(value.indexH3) - c
                console.log('depth : ', depth);
                const indexClient = h3ToParent(value.indexH3, depth)
                const composeClientWithParent = { ...value, indexH3: indexClient }
                new Promise((resolve, reject) => {
                    resolve(onSelected({ type: 'searchClient', coords: null, value: composeClientWithParent }))
                })
                found = searchDriversToMatch(drivers, composeClientWithParent, (v) => {
                    
                    const indexDriver = h3ToParent(v.value.indexH3, depth)
                    const composeDriverWithParent = { ...v.value, indexH3: indexDriver }
                    new Promise((resolve, reject) => {
                        resolve(onSelected({ type: v.type, coords: null, value: composeDriverWithParent }))
                    })
                    return composeDriverWithParent
                })

                if (found.length > 0) {
                    console.log('drivers found : ', found.map((v, i) => v.value.id));
                    const selectedDriver = found[0]
                    const indexSelectDriver = h3ToParent(selectedDriver.value.indexH3, depth)
                    const composeSelectDriverWithParent = { ...selectedDriver.value, indexH3: indexSelectDriver }
                    new Promise((resolve, reject) => {
                        resolve(onSelected({ type: 'match', coords: [composeClientWithParent, composeSelectDriverWithParent], value: composeSelectDriverWithParent }))
                    })
                    console.log('selected driver : ', composeSelectDriverWithParent.id);
                    matchArray.push(
                        {
                            client: [composeClientWithParent, idx],
                            driver: [composeSelectDriverWithParent, selectedDriver.idx]
                        }
                    )
                    removeClient(idx)
                    removeDriver(selectedDriver.idx)
                    drivers[selectedDriver.idx] = null

                    break
                }
                c += 1
            }
            console.log(`------------------------------------------------------------`);


        });

        const endTime = new Date().getTime()

        console.log("-----------remove clients and drivers matched the source queue---------");
        clearClients()
        console.log("Clients removed");
        clearDrivers()
        console.log("Drivers removed");
        console.log("-----------------------------------------------------------------------");

        return { matchArray, time: endTime - startTime }

    }
}