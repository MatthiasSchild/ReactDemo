import React from 'react'
import {IonItem, IonLabel, IonToggle} from '@ionic/react'
import {MachineValuePair} from '../api/models'
import {sprintf} from 'sprintf-js'

interface Props {
    valuePair: MachineValuePair
    onChange: (v: MachineValuePair, newValue: any) => void
}


interface State {
}

export default class ValueItem extends React.Component<Props, State> {
    private formatNumber(valuePair: MachineValuePair): string {
        if (valuePair.format) {
            return sprintf(valuePair.format, valuePair.value)
        }

        return valuePair.value.toFixed(2)
    }

    render() {
        const valuePair = this.props.valuePair
        const onChange = this.props.onChange

        switch (typeof (valuePair.value)) {
            case 'string':
                return (
                    <IonItem lines="full">
                        <IonLabel>
                            <h1>{valuePair.name}</h1>
                            <h2>{valuePair.value}</h2>
                        </IonLabel>
                    </IonItem>
                )

            case 'number':
                return (
                    <IonItem lines="full">
                        <IonLabel>
                            <h1>{valuePair.name}</h1>
                            <h2>{this.formatNumber(valuePair)}</h2>
                        </IonLabel>
                    </IonItem>
                )

            case 'boolean':
                return (
                    <IonItem lines="full">
                        <IonLabel>{valuePair.name}</IonLabel>
                        <IonToggle checked={valuePair.value}
                                   onIonChange={e => onChange(valuePair, e.detail.checked)}
                                   slot="start"/>
                    </IonItem>
                )
        }

        return null
    }
}
