import DeviceInfo from 'react-native-device-info';

export const deviceInfo = {
  default: {
    uniqueId: DeviceInfo.getUniqueId(),
  },
  persist: true,
  actions: {},
};
