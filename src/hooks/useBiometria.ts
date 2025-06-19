import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export function useBiometria() {
    const autenticarBiometria = async () => {
        const compatible = await LocalAuthentication.hasHardwareAsync();
        if (!compatible) {
            Alert.alert('Biometria não disponível', 'Seu dispositivo não suporta autenticação biométrica.');
            return false;
        }

        const biometricRecords = await LocalAuthentication.isEnrolledAsync();
        if (!biometricRecords) {
            Alert.alert('Biometria não configurada', 'Configure sua biometria no dispositivo para usar esta funcionalidade.');
            return false;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Confirme sua identidade',
            cancelLabel: 'Cancelar',
            disableDeviceFallback: false,
        });

        if (result.success) {
            return true;
        } else {
            Alert.alert('Falha na autenticação', 'Biometria não reconhecida ou cancelada.');
            return false;
        }
    };

    return { autenticarBiometria };
}
