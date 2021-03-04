import './Home.css'
import {IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React from 'react'
import MachineItem from '../components/MachineItem'
import {MachineData} from '../api/models'

interface Props {
    machines: MachineData[]
}

interface State {
}

export default class HomePage extends React.Component<Props, State> {
    render() {
        const machines = this.props.machines

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>

                        <IonTitle>Overview</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        {machines.map(machine => (
                            <MachineItem key={machine._id} machine={machine}/>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}
