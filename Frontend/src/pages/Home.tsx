import './Home.css'
import {
    IonAvatar, IonButtons,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import React from 'react'
import {MachineData} from '../api/models'
import {fetchMachineData} from '../api/api'

interface Props {
}

interface State {
    machines: MachineData[]
}

export default class HomePage extends React.Component<Props, State> {
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
            .then(machineValues => this.setState({'machines': machineValues}))
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>

                        <IonTitle>Data Overview</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    {this.state.machines.map(machine => (
                        <IonList key={machine._id}>
                            <IonItem lines="full" routerLink={'/machine/' + machine._id}>
                                <IonAvatar slot="start">
                                    <img src={'http://localhost:3001/api/assets/machines/' + machine.image}
                                         alt={machine.image}/>
                                </IonAvatar>
                                <IonLabel>
                                    <h1>{machine.name}</h1>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    ))}
                </IonContent>
            </IonPage>
        )
    }
}
