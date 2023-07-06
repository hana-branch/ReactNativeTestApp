import React, { Component, useEffect } from 'react'
import {Alert} from 'react-native';
import branch from 'react-native-branch'
import BranchMethods from './src/BranchMethods'

const App = () => {
  useEffect(() => {
    const unsubscribe = branch.subscribe({
        onOpenComplete: ({ error, params, uri }) => {
            if (error) {
                console.error(`[branch.io] subscribe onOpenComplete, Error from opening uri: ${uri} Error: ${error}`);
                return;
            }
            else {
              console.log(`[branch.io] subscribe: ${JSON.stringify(params)}`);
              Alert.alert('[branch.io] subscribe',`${JSON.stringify(params)}`);
            }
        }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BranchMethods />
  );
}

export default App;