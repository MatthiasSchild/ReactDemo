import {MachineData} from './models'

const serverUrl = 'http://localhost:3001'

export function fetchMachineData(): Promise<MachineData[]> {
    return fetch(`${serverUrl}/fetch`)
        .then(resp => resp.json())
}
