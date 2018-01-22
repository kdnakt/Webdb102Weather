import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <App />
  );
  expect(tree.toJSON()).toMatchSnapshot();
});

const mockBaseId = 'id-mocked-uuid';
let mockUuidCount = 0;
jest.mock('react-navigation/src/routers/StackRouter', () => ({
  _getUuid: () => `${mockBaseId}-${mockUuidCount++}`,
}));
