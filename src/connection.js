import { v1 as neo4j } from 'neo4j-driver'
import { subscribeToDatabaseCredentialsForActiveGraph } from 'graph-app-kit/components/GraphAppBase'

import {
  setConnected,
  setDisconnected
} from './state/connection'

const subscribeToConnection = (store) => {
  const onNewActiveGraph = (credentials, activeProject, activeGraph) => {
    try {
      const driver = neo4j.driver(credentials.host, neo4j.auth.basic(credentials.username, credentials.password))

      store.dispatch(setConnected(
        driver,
        activeGraph.name,
        activeGraph.description
      ))
    } catch (e) {
      console.warn('Failed to connect: ', e)
    }
  }
    
  const onDisconnect = () => {
    store.dispatch(setDisconnected())
  }

  subscribeToDatabaseCredentialsForActiveGraph(window.neo4jDesktopApi, onNewActiveGraph, onDisconnect)
}

export default subscribeToConnection
