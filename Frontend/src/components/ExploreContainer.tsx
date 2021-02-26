import './ExploreContainer.css'
import {IonItem, IonLabel, IonList} from '@ionic/react'
import React from 'react'

interface MachineValue {
    name: string
    value: number
}

interface ExploreContainerProps {
}

interface ExploreContainerState {
    msg: string
    values: MachineValue[]
}

class ExploreContainer extends React.Component<ExploreContainerProps, ExploreContainerState> {
    constructor(props: any) {
        super(props)

        this.state = {
            msg: 'Hey!',
            values: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData() {
        fetch('http://localhost:3001/fetch')
            .then(resp => resp.json())
            .then((machineValues: MachineValue[]) => this.setState({'values': machineValues}))
    }

    render() {
        return (
            <IonList>
                {this.state.values.map((value: any, i: number) => {
                    return (
                        <IonItem lines="full" key={i}>
                            <IonLabel>{value.name} = {value.value}</IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
}

// const ExploreContainer: React.FC<ContainerProps> = () => {
//     fetch('http://localhost:3001/fetch')
//         .then(resp => resp.json())
//         .then(machineValues => console.log(machineValues))
//
//     return (
//         <IonList>
//             <IonItem lines="full">
//                 <IonLabel>Hello!</IonLabel>
//             </IonItem>
//         </IonList>
//     )
// }

export default ExploreContainer
