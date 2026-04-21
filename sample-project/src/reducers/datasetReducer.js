export const initialState = {
  data: [],
  filteredData: [],
  loading: false,
  error: null,
};

export const datasetReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        data: action.payload,
        filteredData: action.payload 
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'APPLY_FILTER':
      // Using 'filter' as required
      const searchTerm = action.payload.toLowerCase();
      const newFilteredData = state.data.filter(item => {
        const titleMatch = item.name ? item.name.toLowerCase().includes(searchTerm) : false;
        const descMatch = item.description ? item.description.toLowerCase().includes(searchTerm) : false;
        const typeMatch = item.type ? item.type.toLowerCase().includes(searchTerm) : false;
        return titleMatch || descMatch || typeMatch;
      });
      return { ...state, filteredData: newFilteredData };
    default:
      return state;
  }
};
