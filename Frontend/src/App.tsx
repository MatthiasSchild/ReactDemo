import {Redirect, Route} from 'react-router-dom'
import {IonApp, IonRouterOutlet, IonSplitPane} from '@ionic/react'
import {IonReactRouter} from '@ionic/react-router'
import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import './theme/variables.css'

import HomePage from './pages/Home'
import MachinePage from './pages/Machine'
import React from 'react'
import Menu from './components/Menu'
import ImportPage from './pages/Import'
import {MachineData} from './api/models'
import {fetchMachineData} from './api/api'

interface Props {
}

interface State {
    machines: MachineData[]
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
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

    private fetchData() {
        fetchMachineData()
            .then(machines => this.setState({machines}))
    }

    render() {
        return (
            <IonApp>
                <IonReactRouter>
                    <IonSplitPane contentId="main">
                        <Menu machines={this.state.machines}/>

                        <IonRouterOutlet id="main">
                            <Route exact path="/home"
                                   component={() => <HomePage machines={this.state.machines}/>}/>
                            <Route exact path="/machine/:id"
                                   component={(props: any) => <MachinePage machines={this.state.machines} {...props}/>}/>
                            <Route exact path="/import" component={ImportPage}/>

                            <Route exact path="/">
                                <Redirect to="/home"/>
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </IonApp>
        )
    }
}
