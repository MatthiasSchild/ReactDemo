import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon, IonItem,
    IonLabel, IonList,
    IonPage,
    IonTitle, IonToggle,
    IonToolbar,
} from '@ionic/react'
import React from 'react'
import {home} from 'ionicons/icons'
import {RouteComponentProps} from 'react-router'
import {MachineData, MachineValuePair} from '../api/models'
import {fetchMachineData, setMachineValue} from '../api/api'

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
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="end">
                            <IonButton routerLink="/home">
                                <IonLabel>
                                    <IonIcon icon={home}/>
                                </IonLabel>
                            </IonButton>
                        </IonButtons>

                        {this.state?.machine
                            ? <IonTitle>{this.state?.machine?.name}</IonTitle>
                            : <IonTitle>Machine</IonTitle>
                        }
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        {this?.state?.machine?.values?.map(valuePair => {
                            switch (typeof (valuePair.value)) {
                                case 'number':
                                    return (
                                        <IonItem lines="full">
                                            <IonLabel>
                                                <h1>{valuePair.name}</h1>
                                                <h2>{valuePair.value.toFixed(2)}</h2>
                                            </IonLabel>
                                        </IonItem>
                                    )

                                case 'boolean':
                                    return (
                                        <IonItem lines="full">
                                            <IonLabel>{valuePair.name}</IonLabel>
                                            <IonToggle checked={valuePair.value}
                                                       onIonChange={e => this.onElementChange(valuePair)}
                                                       slot="start"/>
                                        </IonItem>
                                    )

                                default:
                                    return (
                                        <IonItem lines="full">
                                            <IonLabel>
                                                <h1>{valuePair.name}</h1>
                                            </IonLabel>
                                        </IonItem>
                                    )
                            }
                        })}
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}
