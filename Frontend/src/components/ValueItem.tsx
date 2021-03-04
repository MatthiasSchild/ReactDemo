import React from 'react'
import {IonItem, IonLabel, IonToggle} from '@ionic/react'
import {MachineValuePair} from '../api/models'
import {sprintf} from 'sprintf-js'
import {FlexibleXYPlot, LineSeries} from 'react-vis'

interface Props {
    valuePair: MachineValuePair
    onChange: (v: MachineValuePair, newValue: any) => void
}


interface State {
    dataCache: { [index: string]: number[] }
}

export default class ValueItem extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)

        this.state = {
            dataCache: {},
        }
    }

    private formatNumber(valuePair: MachineValuePair): string {
        if (valuePair.format) {
            return sprintf(valuePair.format, valuePair.value)
        }

        return valuePair.value.toFixed(2)
    }

    private dataForPair(valuePair: MachineValuePair) {
        const key = `${valuePair.name}` // TODO differentiate between machines
        let line = this.state.dataCache[key] || []

        line.push(valuePair.value)
        line = line.splice(-30) // limit the size
        this.state.dataCache[key] = line

        return line.map((val, index) => ({x: index, y: val}))
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
                            <FlexibleXYPlot height={100}>
                                <LineSeries data={this.dataForPair(valuePair)} style={{fill: 'none'}}/>
                            </FlexibleXYPlot>
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
