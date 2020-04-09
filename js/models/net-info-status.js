export const netInfoStatus = {
  default: {
    status: true,
  },
  persist: false,
  actions: {
    UPDATE_NETINFO_STATUS: {
      inputs: ['status'],
      reducer: 'MERGE',
    },
  },
};
