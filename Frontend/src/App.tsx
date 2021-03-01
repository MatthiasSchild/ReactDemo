import {Redirect, Route} from 'react-router-dom'
import {IonApp, IonContent, IonItem, IonLabel, IonList, IonMenu, IonRouterOutlet, IonSplitPane} from '@ionic/react'
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

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonSplitPane contentId="main">
                <Menu/>

                <IonRouterOutlet id="main">
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/machine/:id" component={MachinePage}/>

                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                </IonRouterOutlet>
            </IonSplitPane>
        </IonReactRouter>
    </IonApp>
)

export default App
