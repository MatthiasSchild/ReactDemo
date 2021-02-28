import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import React from 'react'
import {arrowBackOutline} from 'ionicons/icons'
import {RouteComponentProps} from 'react-router'
import {MachineData} from '../api/models'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

interface State {
    machineID: string
    machine: MachineData
}

export default class MachinePage extends React.Component<Props, State> {
    componentDidMount() {
        const machineID = this.props.match.params.id
        this.setState({machineID})
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonButton routerLink="/home">
                                <IonLabel>
                                    <IonIcon icon={arrowBackOutline}/>
                                </IonLabel>
                            </IonButton>
                        </IonButtons>

                        {/*TODO, this does not work as expected*/}
                        {/*{this.state.machine*/}
                        {/*    ? <IonTitle>{this.state.machine.name}</IonTitle>*/}
                        {/*    : <IonTitle>Machine</IonTitle>*/}
                        {/*}*/}
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                </IonContent>
            </IonPage>
        )
    }
}
