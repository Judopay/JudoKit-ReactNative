import { Platform } from 'react-native';

export class PlatformType {
    static isIOS = (Platform.OS == 'ios');
    static isAndroid = (Platform.OS == 'android');
}