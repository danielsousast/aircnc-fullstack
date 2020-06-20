import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LogoImage = styled.Image``;

export const Form = styled.View`
  align-self: stretch;
  padding: 0 30px;
  margin-top: 30px;
`;

export const Label = styled.Text`
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0 20px;
  font-size: 16px;
  color: #444;
  height: 44px;
  margin-bottom: 20px;
`;

export const Button = styled.TouchableOpacity`
  height: 44px;
  justify-content: center;
  align-items: center;
  background-color: #f05a5b;
`;

export const ButtonTitle = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
