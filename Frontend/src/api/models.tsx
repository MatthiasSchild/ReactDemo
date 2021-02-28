export interface MachineValuePair {
    name: string
    value: number
}

export interface MachineTogglePair {
    name: string
    value: boolean
}

export interface MachineData {
    _id: string
    name: string
    demo: boolean
    values: MachineValuePair[]
    toggles: MachineTogglePair[]
}
