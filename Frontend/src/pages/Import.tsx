import {
    IonButtons, IonCheckbox,
    IonContent,
    IonHeader, IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import MachineItem from '../components/MachineItem'
import React from 'react'

interface Props {
}

interface State {
}

export default class ImportPage extends React.Component<Props, State> {
    private onButtonFileSelector() {
    }

    private onButtonUpload() {
    }

    render() {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar color="primary">
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>

                        <IonTitle>Import</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent fullscreen>
                    <IonList>
                        <IonItem lines="full" button onClick={_ => this.onButtonFileSelector()}>
                            <IonLabel>
                                <h2>File upload</h2>
                                <h3>-</h3>
                            </IonLabel>
                        </IonItem>

                        <IonItem lines="full">
                            <IonCheckbox slot="start"/>
                            <IonLabel>Delete all existing machines</IonLabel>
                        </IonItem>

                        <IonItem color="primary" button onClick={_ => this.onButtonUpload()}>
                            <IonLabel>
                                <h2>Start upload</h2>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}
