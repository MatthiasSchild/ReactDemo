import {MachineData} from './models'

const serverUrl = 'http://localhost:3001'

export function fetchMachineData(): Promise<MachineData[]> {
    return fetch(`${serverUrl}/api/machines`)
        .then(resp => resp.json())
}

export function setMachineToggle(machineID: string, toggleName: string, value: boolean): Promise<MachineData[]> {
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({machineID, toggleName, value}),
    }

    return fetch(`${serverUrl}/api/values`, requestOptions)
        .then(resp => resp.json())
}
