import './ExploreContainer.css'
import {IonItem, IonLabel, IonList, IonToggle} from '@ionic/react'
import React from 'react'
import {MachineData} from '../api/models'
import {fetchMachineData} from '../api/api'

interface ExploreContainerProps {
}

interface ExploreContainerState {
    machines: MachineData[]
}

class ExploreContainer extends React.Component<ExploreContainerProps, ExploreContainerState> {
    constructor(props: any) {
        super(props)

        this.state = {
            machines: [],
        }
    }

    componentDidMount() {
        this.fetchData()
        setInterval(() => {
            this.fetchData()
        }, 1000)
    }

    fetchData() {
        fetchMachineData()
            .then(machineValues => this.setState({'machines': machineValues}))
    }

    render() {
        return this.state.machines.map(machine => (
            <IonList key={machine._id}>

                <IonItem lines="full">
                    <IonLabel>
                        <h1>{machine.name}</h1>
                    </IonLabel>
                </IonItem>

                {machine.toggles?.map(toggle => (
                    <IonItem key={machine._id + '_toggle_' + toggle.name} lines="none">
                        <IonLabel>{toggle.name}</IonLabel>
                        <IonToggle slot="start" checked={toggle.value}/>
                    </IonItem>
                ))}

                {machine.values.map((valuePair => (
                    <IonItem key={machine._id + '_value_' + valuePair.name} lines="none">
                        <IonLabel>
                            <h2>{valuePair.name}: {valuePair.value.toFixed(2)}</h2>
                        </IonLabel>
                    </IonItem>
                )))}
            </IonList>
        ))
    }
}

export default ExploreContainer
