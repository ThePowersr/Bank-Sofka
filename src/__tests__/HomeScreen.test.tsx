import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import axiosMock from '../../__mocks__/axios';
import axios from 'axios';

describe("render <HomeScreen/>", () => {
  it("updates data on search", () => {
    const { debug, getByTestId } = render(<HomeScreen />);
    const searchInput = getByTestId('search');

    //simulate search
    fireEvent.changeText(searchInput, 'searchTerm');
    console.log(searchInput.props.value);

    //validate value input
    expect(searchInput.props.value).toBe('searchTerm');

  });

  it('handles API error', async () => {
    axiosMock.get.mockRejectedValueOnce(new Error('API error'));

    // spy for console.log
    const consoleLogSpy = jest.spyOn(console, 'log');

    render(<HomeScreen />);

    // wait for error
    await new Promise(resolve => setTimeout(resolve, 100));

    // verify error call
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.objectContaining(new Error('API error')));

    // Restaura el spy
    // consoleLogSpy.mockRestore();
  });



})
