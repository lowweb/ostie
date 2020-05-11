export const state = () => ({
    searchResult: [],
    searchResultArtistSongs: [],
    visible: false,
    searchResultHighLigth:[],
    byArtist: true,
    page: 1,
    pageArtistSongs: 1
  })


  export const getters = {
    getResult(state) {
        return state.searchResult
      },
      getItemByIndex: (state) => (index) => {
        return state.searchResult[index]
    },
    getByArtist(state) {
      return state.byArtist
    },
    getSearchResultArtistSongs(state) {
      return state.searchResultArtistSongs
    }
}

  export const mutations = {
    fillResult(state, fillData) {
        state.searchResult = fillData
    },
    fillResultArtistSongs(state, fillData) {
      fillData.shift()
      state.searchResultArtistSongs = fillData
   },
    changeVisible(state, value) {
      state.visible = value
    },
    changeByArtist (state, status) {
      state.byArtist = status
    },
    clearResult (state) {
      state.searchResult = []
      state.searchResultHighLigth = []
      state.searchResultArtistSongs=[]
    },
    addLazyToSearchResult(state, addData) {
      state.searchResult = state.searchResult.concat(addData)
    },
    addLazyToSearchResultArtistSongs(state, addData) {
      addData.shift()
      state.searchResultArtistSongs = state.searchResultArtistSongs.concat(addData)
    },
    highlightData(state, findStr) {
      //подсвечиваем найдены кусок текста дюблируем обьект/массив в новый
      state.searchResultHighLigth = JSON.parse(JSON.stringify(state.searchResult))
      // определяем тип поиска
      var keyName = ''
      if (state.byArtist)
        keyName = 'artistName'
      else
        keyName = 'trackName' 
        // console.log('kn=' + keyName) 
      //выделяем текст который нашли в тексте
      state.searchResultHighLigth.forEach( function(item,i,arr){
        if (item[keyName].toLowerCase().indexOf(findStr.toLowerCase()) !== -1) {
          //если есть первое вхождения
          var index = item[keyName].toLowerCase().indexOf(findStr.toLowerCase())
          var originPart = item[keyName].slice(index,index+findStr.length)
          var re = new RegExp(findStr, "i");
          //подменяем на новуб част строкиы
          state.searchResultHighLigth[i][keyName]=item[keyName].replace(re, "<span style='color:#051923'>"+originPart+"</span>");
        }
      })
    }
}

export const actions = {
    async makeRequest({commit},payload) {

      await this.$axios.get(`https://itunes.apple.com/search?term=${payload.searchStr}&entity=${(!payload.byArtist) ? 'musicTrack' : 'musicArtist'}&attribute=${(!payload.byArtist) ? 'songTerm' : 'artistTerm'}&limit=20&offset=0`)
      // await this.$axios.get(`https://itunes.apple.com/search?term=${payload.searchStr}&entity=${(!payload.byArtist) ? 'musicTrack' : 'musicArtist'}&attribute=${(!payload.byArtist) ? 'songTerm' : 'artistTerm'}&media=music&limit=10&offset=0`)
          .then((res) => {
            if (res.status === 200) {
             commit('fillResult', res.data.results)
             state.page=1
           }
          })
        .catch(e => {
            console.log(e)
        })
    },
    async makeLazyRequest({commit},payload) {
      await this.$axios.get(`https://itunes.apple.com/search?term=${payload.searchStr}&entity=${(!payload.byArtist) ? 'musicTrack' : 'musicArtist'}&attribute=${(!payload.byArtist) ? 'songTerm' : 'artistTerm'}&limit=10&offset=${state.page * 10}`)
          .then((res) => {
            if (res.status === 200) {
             commit('addLazyToSearchResult', res.data.results)
             state.page++
           }
          })
        .catch(e => {
            console.log(e)
        })
    },


    async makeRequestArtistSongs({commit},payload) {
      await this.$axios.get(`https://itunes.apple.com/lookup?id=${payload.artistId}&entity=song&limit=10&offset=0`)
          .then((res) => {
            if (res.status === 200) {
             commit('fillResultArtistSongs', res.data.results)
             state.pageArtistSongs=1
           }
          })
        .catch(e => {
            console.log(e)
        })
    },

    async makeLazyRequestArtistSongs({commit},payload) {
      await this.$axios.get(`https://itunes.apple.com/lookup?id=${payload.artistId}&entity=song&limit=10&offset=${state.pageArtistSongs * 10}`)
          .then((res) => {
            if (res.status === 200) {
             commit('addLazyToSearchResultArtistSongs', res.data.results)
             state.pageArtistSongs++
           }
          })
        .catch(e => {
            console.log(e)
        })
    }


}