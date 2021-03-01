import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonItem,
    IonLabel, IonList, IonMenuButton,
    IonPage,
    IonTitle, IonToggle,
    IonToolbar,
} from '@ionic/react'
import React from 'react'
import {home} from 'ionicons/icons'
import {RouteComponentProps} from 'react-router'
import {MachineData, MachineValuePair} from '../api/models'
import {fetchMachineData, setMachineValue} from '../api/api'
import ValueItem from '../components/ValueItem'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    machine: MachineData
}

export default class MachinePage extends React.Component<Props, State> {
    private interruptFetch = 0

    componentDidMount() {
        this.fetchData()
        setInterval(() => {
            if (this.interruptFetch > 0) return
            this.fetchData()
        }, 1000)
    }

    private getMachineID(): string {
        return this.props.match.params.id
    }

    private fetchData() {
        const machineID = this.getMachineID()
        if (!machineID) return

        fetchMachineData(machineID)
            .then(machineData => this.setState({'machine': machineData[0]}))
    }

    private onElementChange(valuePair: MachineValuePair) {
        this.interruptFetch++

        const machine = this.state.machine
        setMachineValue(machine._id, valuePair.name, valuePair.value)
            .finally(() => this.interruptFetch--)
    }

    render() {
        const values = this?.state?.machine?.values || []

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>

                        {this.state?.machine
                            ? <IonTitle>{this.state?.machine?.name}</IonTitle>
                            : <IonTitle>Machine</IonTitle>
                        }
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        {values.map(valuePair => (
                            <ValueItem key={valuePair.name}
                                       valuePair={valuePair}
                                       onChange={v => this.onElementChange(v)}/>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}
