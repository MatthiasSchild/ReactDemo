import './Home.css'
import {IonButtons, IonContent, IonHeader, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import React from 'react'
import {fetchMachineData} from '../api/api'
import MachineItem from '../components/MachineItem'
import {MachineData} from '../api/models'

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
            .then(machines => this.setState({machines}))
    }

    render() {
        const machines = this.state.machines

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
