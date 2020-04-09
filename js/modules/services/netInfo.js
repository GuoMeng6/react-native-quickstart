import NetInfo from '@react-native-community/netinfo';
import actions, { store } from '~/modules/redux-app-config';

const UPDATE_NETINFO_STATUS = params => {
  store.dispatch(actions.UPDATE_NETINFO_STATUS(params));
};

class NetInfoManager {
  constructor() {
    NetInfo.addEventListener(this.handleConnectionInfoChange.bind(this));
    NetInfo.fetch().then(isNetConnected => {
      UPDATE_NETINFO_STATUS({ status: isNetConnected.isConnected });
    });
  }

  handleConnectionInfoChange(data) {
    const { type } = data;
    const netCanBeUsed = !(
      type === 'none' ||
      type === 'unknown' ||
      type === 'NONE' ||
      type === 'UNKNOWN'
    );
    UPDATE_NETINFO_STATUS({ status: netCanBeUsed });
  }
}

export default new NetInfoManager();
