import React from 'react';
import { firebase } from '../firebase';

export const Checkbox = props => {
  const archiveTask = () => {
    firebase
      .firestore()
      .collection('tasks')
      .doc(props.id)
      .update({
        archived: true
      });
  }
  return (
    <div 
      onClick={() => archiveTask()}
      className="checkbox-holder"
      data-testid="checkbox-action">
      <span className="checkbox" />
    </div>
  );
}