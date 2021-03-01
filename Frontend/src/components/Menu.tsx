import React from 'react'
import {IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar} from '@ionic/react'

const Menu: React.FC = () => (
    <IonMenu contentId="main" type="overlay">
        <IonHeader>
            <IonToolbar color="primary">
                <IonTitle>Machine control</IonTitle>
            </IonToolbar>
        </IonHeader>

        <IonContent>
            <IonList>
                <IonItem routerLink="/home">
                    <IonLabel>Overview</IonLabel>
                </IonItem>

                <IonItem lines="none">
                    <IonLabel>
                        <h1>Machines</h1>
                    </IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    </IonMenu>
)

export default Menu
