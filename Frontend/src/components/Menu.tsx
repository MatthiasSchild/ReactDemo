import React from 'react'
import {IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar} from '@ionic/react'
import MachineItem from './MachineItem'
import {MachineData} from '../api/models'
import {fetchMachineData} from '../api/api'
import {cloudUploadOutline, home} from 'ionicons/icons'

interface Props {
}

interface State {
    machines: MachineData[]
}

export default class Menu extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)

        this.state = {
            machines: [],
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    private fetchData() {
        fetchMachineData()
            .then(machines => this.setState({machines}))
    }

    render() {
        const machines = this.state.machines

        return (
            <IonMenu contentId="main" type="overlay">
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonTitle>Machine control</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent>
                    <IonList>
                        <IonItem routerLink="/home" lines="full">
                            <IonIcon slot="start" icon={home}/>
                            <IonLabel>Overview</IonLabel>
                        </IonItem>

                        <IonItem routerLink="/import" lines="full">
                            <IonIcon slot="start" icon={cloudUploadOutline}/>
                            <IonLabel>Import</IonLabel>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel>
                                <h1>Machines</h1>
                            </IonLabel>
                        </IonItem>


                        {machines.map(machine => (
                            <MachineItem key={machine._id} machine={machine}/>
                        ))}
                    </IonList>
                </IonContent>
            </IonMenu>
        )
    }
}
