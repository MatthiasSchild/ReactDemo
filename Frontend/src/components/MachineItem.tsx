import {MachineData} from '../api/models'
import React from 'react'
import {IonAvatar, IonItem, IonLabel} from '@ionic/react'
import './MachineItem.css'

interface Props {
    machine: MachineData
}

interface State {
}

export default class MachineItem extends React.Component<Props, State> {
    render() {
        const url = 'http://localhost:3001'
        const machine = this.props.machine
        const imageUrl = `${url}/api/assets/machines/${machine.image}`

        return (
            <IonItem lines="full" routerLink={'/machine/' + machine._id}>
                <IonAvatar slot="start">
                    <img src={imageUrl} alt={machine.image}/>
                </IonAvatar>
                <IonLabel>
                    <h1>{machine.name}</h1>
                </IonLabel>
            </IonItem>
        )
    }
}
