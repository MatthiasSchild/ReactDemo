import React from 'react'
import {IonItem, IonLabel, IonToggle} from '@ionic/react'
import {MachineValuePair} from '../api/models'

interface Props {
    valuePair: MachineValuePair
    onChange: (v: MachineValuePair) => void
}


interface State {
}

export default class ValueItem extends React.Component<Props, State> {
    render() {
        const valuePair = this.props.valuePair
        const onChange = this.props.onChange

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
                                   onIonChange={e => onChange(valuePair)}
                                   slot="start"/>
                    </IonItem>
                )
        }

        return undefined
    }
}
