import { CLUB_DATA, DELETE_CLUB_DATA, FILTER_CLUB_DATA, SAVE_TOKEN, SEARCH_CLUB_DATA, UPDATE_CLUB_DATA, SAVE_PLAYERDETAILS } from '../actions/types';

const initialState = {
  token: '',
  clubData: [],
  playerDetails: []
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case CLUB_DATA:
      return {
        ...state,
        clubData: action.payload,
      };

    case UPDATE_CLUB_DATA:
      const highlightedData = state.clubData.map(item => {
        if (item.teamID == action.payload) {
          item.show = !item.show;
        }
        return item;

      });
      return {
        ...state,
        clubData: highlightedData
      };

    case FILTER_CLUB_DATA:
      const filteredData = state.clubData.sort((a, b) => {
        if (a.teamName.toLowerCase() < b.teamName.toLowerCase()) return -1;
        if (a.teamName.toLowerCase() > b.teamName.toLowerCase()) return 1;
        return 0;
      });
      return {
        ...state,
        clubData: filteredData
      };

    case SEARCH_CLUB_DATA:
      const searchData = clubData && clubData.filter(item => {
        if (pname === '') return item;
        if (item.teamName.toLowerCase().includes(pname.toLowerCase())) return item;
      });

      return {
        ...state,
        clubData: searchData
      };


      case SAVE_PLAYERDETAILS:
        return {
          ...state,
          playerDetails: action.payload,
        };


    

    default:
      return state;
  }
};

export default Reducer;