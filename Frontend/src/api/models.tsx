export interface MachineValuePair {
    name: string
    value: number
    type: string
    format: (string|undefined)
}

export interface MachineData {
    _id: string
    name: string
    image: string
    type: string
    values: MachineValuePair[]
}
