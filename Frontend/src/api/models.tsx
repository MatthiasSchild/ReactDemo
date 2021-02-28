export interface MachineValuePair {
    name: string
    value: number
    type: string
}

export interface MachineData {
    _id: string
    name: string
    image: string
    type: string
    values: MachineValuePair[]
}
