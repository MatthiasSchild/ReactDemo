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
import './Machine.css'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    machine: (MachineData|null)
}

export default class MachinePage extends React.Component<Props, State> {
    private interruptFetch = 0

    constructor(props: Props) {
        super(props)

        this.state = {
            machine: null,
        }
    }

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
        if (!machine) return;

        setMachineValue(machine._id, valuePair.name, valuePair.value)
            .finally(() => this.interruptFetch--)
    }

    render() {
        const machine = this.state.machine
        if (!machine) return null;

        const url = 'http://localhost:3001'
        const imageUrl = `${url}/api/assets/machines/${machine.image}`
        const title = machine.name || 'Machine'
        const values = machine.values || []

        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>

                        <IonTitle>{title}</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <div>
                        <img className="header-image" src={imageUrl} alt={machine.name}/>
                    </div>

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
