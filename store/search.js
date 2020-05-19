export const state = () => ({
    inputText: '',
    isReturnResults: false,
    whatSearch: [],
    kindSearchByArtist: true,
    loaderIcn: require(`../assets/bars.svg`),
    inputTextOnChangeFocus: ' ' 
  })

  export const getters = {
    getKind(state) {
      return state.kindSearchByArtist
    }
}

  export const mutations = {
    change (state,text) {
      state.inputText=text.trim()
      // state.inputText=text.toString().replace(/\s+/g, '+')
    },
    statusResults(state, value) {
      state.isReturnResults = value
    },
    changeSearch(state, data) {
      state.whatSearch = data
    },
    changeKindSearchByArtist (state, status) {
      state.kindSearchByArtist = status
    },
    changeLoaderIcn (state) {
      if (!state.kindSearchByArtist)
        state.loaderIcn=require(`../assets/bars--pink.svg`) 
      else 
        state.loaderIcn=require(`../assets/bars.svg`) 
    },
    rememberInputText (state) {
      state.inputTextOnChangeFocus = state.inputText
    }


  }