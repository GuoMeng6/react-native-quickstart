export const loading = {
  default: { visible: false, percentage: '' },
  persist: false,
  actions: {
    SET_LOADING: {
      reducer: 'MERGE',
    },
  },
};
