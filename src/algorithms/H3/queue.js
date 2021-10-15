
let drivers = []
let clients = []

export const Queue = {
    addClient: (client) => {
        return clients.push(client)
    },

    addDriver: (driver) => {
        return drivers.push(driver)
    },

    removeClient: (i) => {
        return clients[i] = null
    },

    removeDriver: (i) => {
        return drivers[i] = null
    },

    getClient: (i) => {
        return clients[i]
    },

    getDriver: (i) => {
        return drivers[i]
    },

    resetClients: () => {
        clients = []
        return true
    },

    resetDrivers: () => {
        drivers = []
        return true
    },

    getClients: () => {
        return clients
    },

    getDrivers: () => {
        return drivers
    },

    clearClients: () => {
        return clients = clients.filter(value => {
            return value != null
        })
    },

    clearDrivers: () => {
        return drivers = drivers.filter(value => {
            return value != null
        })
    },

    searchDriversToMatch: (drivers, client, func = p => p) => {
        const foundDrivers = []
        drivers.forEach((value, idx) => {
            if (value != null) {
                const deepClient = client
                const deepDriver = func({ type: 'searchDriver', value })
                console.log("deepClient : ", `${deepClient.id} - ${deepClient.indexH3}`);
                console.log("deepDriver : ", `${deepDriver.id} - ${deepDriver.indexH3}`);

                if (deepClient.indexH3 === deepDriver.indexH3) {
                    foundDrivers.push({ value, idx })
                }
            }

        })
        return foundDrivers
    }

}