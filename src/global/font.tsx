import { Text } from 'react-native';

(Text as any).defaultProps = (Text as any).defaultProps || {};
(Text as any).defaultProps.style = [{ fontFamily: 'Roboto_400Regular' }];
