import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import App from '../../App';
import { StatusBar } from 'expo-status-bar';
import Navigator from '../navigator/Navigator';


it("render app", () => {
  render(<App />);
})
