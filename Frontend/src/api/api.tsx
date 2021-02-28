import {MachineData} from './models'

const serverUrl = 'http://localhost:3001'

export function fetchMachineData(id: (string|null) = null): Promise<MachineData[]> {
    const url = id ? `${serverUrl}/api/machines/${id}` : `${serverUrl}/api/machines`

    return fetch(url)
        .then(resp => resp.json())
}

export function setMachineValue(machineID: string, valueName: string, value: any): Promise<MachineData[]> {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({machineID, valueName, value}),
    }

    return fetch(`${serverUrl}/api/values`, requestOptions)
        .then(resp => resp.json())
}
