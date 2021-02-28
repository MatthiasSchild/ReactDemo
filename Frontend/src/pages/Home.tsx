import './Home.css'
import {IonAvatar, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React from 'react'
import {MachineData} from '../api/models'
import {fetchMachineData} from '../api/api'

interface Props {
}

interface State {
    machines: MachineData[]
}

export default class HomePage extends React.Component<Props, State> {
    private interruptFetch = 0

    constructor(props: any) {
        super(props)

        this.state = {
            machines: [],
        }
    }

    componentDidMount() {
        this.fetchData()
        setInterval(() => {
            if (this.interruptFetch > 0) return
            this.fetchData()
        }, 1000)
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
                        <IonTitle>Data Overview</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    {this.state.machines.map(machine => (
                        <IonList key={machine._id}>
                            <IonItem lines="full" routerLink={'/machine/' + machine._id}>
                                <IonAvatar slot="start">
                                    <img src={'http://localhost:3001/api/assets/machines/' + machine.image}/>
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
