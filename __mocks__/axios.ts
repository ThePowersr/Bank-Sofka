// __mocks__/axios.js

const mockResponse = {
  data: [
    {
      "id": "trj-crds",
      "name": "Tarjetas de Credito",
      "description": "Tarjeta de consumo bajo la modalidad de credito",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "date_release": "2023-02-01T00:00:00.000+00:00",
      "date_revision": "2024-02-01T00:00:00.000+00:00"
    },
    {
      "id": "trj-crdts",
      "name": "Tarjetas de Creditos",
      "description": "Tarjeta de consumo bajo la modalidad de creditos",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
      "date_release": "2023-02-01T00:00:00.000+00:00",
      "date_revision": "2024-02-01T00:00:00.000+00:00"
    },
    {
      "id": "visa-gold",
      "name": "Visa Gold Credito",
      "description": "Tarjeta de consumo bajo la modalidad de creditos",
      "logo": "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Find%20a%20Card/Credit%20cards/Gold/visa_gold_card_400x225.jpg",
      "date_release": "2023-02-01T00:00:00.000+00:00",
      "date_revision": "2024-02-01T00:00:00.000+00:00"
    }
  ]
};

const axiosMock: any = {
  create: jest.fn(() => axiosMock),
  get: jest.fn().mockResolvedValue(mockResponse),
  post: jest.fn()
};

export default axiosMock;
