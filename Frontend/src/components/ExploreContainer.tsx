import './ExploreContainer.css'
import {IonItem, IonLabel, IonList} from '@ionic/react'

interface ContainerProps {
}

const ExploreContainer: React.FC<ContainerProps> = () => {
    fetch('http://localhost:3001/fetch').then(resp => {
        resp.json().then(machineValues => {
            console.log(machineValues)
        })
    })

    return (
        <IonList>
            <IonItem lines="full">
                <IonLabel>Hello!</IonLabel>
            </IonItem>
        </IonList>
    )
}

export default ExploreContainer
