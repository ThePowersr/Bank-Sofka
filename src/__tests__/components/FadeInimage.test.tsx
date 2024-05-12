import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import FadeInImage from '../../components/FadeInImage';

describe("render component <FadeInImage/>", () => {
  it('onLoad activity-indicator', async () => {
    const uri = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    const { getByTestId, getByLabelText, debug } = render(
      <FadeInImage uri={uri} style={{ width: 100, height: 100 }} />
    );
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('onLoadEnd show image', async () => {
    const uri = "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg";
    const { getByTestId, getByLabelText, debug } = render(
      <FadeInImage uri={uri} style={{ width: 100, height: 100 }} />
    );
    fireEvent(getByTestId('image'), 'onLoadEnd');
    await act(() => {
      expect(() => getByTestId('activity-indicator')).toThrow();
    })
  });

})