import React, { useEffect } from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import StackNavigation from './src/navigations/stackNavigation';
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Reducers from './src/reducers'
import { notifConfiguration, notifCreateChannel } from './src/helper'
import PushNotification from 'react-native-push-notification';

const App = (props) => {

  // mode componentDidMount
  useEffect(() => {
    notifConfiguration()
    notifCreateChannel("A1", "Checkout Notif")
    // Memeriksa list channel
    PushNotification.getChannels((channel_id) => {
      console.log(channel_id)
    })
  }, [])
  
  return (
    <SafeAreaProvider>
      <Provider store={createStore(Reducers, {}, applyMiddleware(ReduxThunk))}>
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App;