export const state = () => ({
    searchResult: [],
    visible: false,
    searchResultHighLigth:[],
    byArtist: true
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
    }
}

  export const mutations = {
    fillResult(state, fillData) {
        state.searchResult = fillData
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
      await this.$axios.get('https://itunes.apple.com/search?', {
        params: {
            'term' : payload.searchStr,
            'cors': 'no-cors',
            'media': 'music',
            // 'entity': 'musicArtist',
            'entity': (!payload.byArtist) ? 'musicTrack' : 'musicArtist',
            // 'attribute': 'artistTerm',
            'attribute': (!payload.byArtist) ? 'songTerm' : 'artistTerm',
            'limit': '500'
            }
         })
        .then((res) => {
          if (res.status === 200) {
            // console.log(res.data.results) 
            // res.data.results = {'byArtist': payload.byArtist,'data': res.data.results}
            commit('fillResult', res.data.results)
          }
        })
        .catch(e => {
            console.log(e)
        })
    },
    makeFakeReq({commit}){
        const res=[ { "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true },{ "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true },{ "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true },{ "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true },{ "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true },{ "wrapperType": "track", "kind": "song", "artistId": 1312089606, "collectionId": 1390408224, "trackId": 1390408233, "artistName": "Llmanny", "collectionName": "Soul Glo - EP", "trackName": "Vnf", "collectionCensoredName": "Soul Glo - EP", "trackCensoredName": "Vnf", "artistViewUrl": "https://music.apple.com/us/artist/llmanny/1312089606?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "trackViewUrl": "https://music.apple.com/us/album/vnf/1390408224?i=1390408233&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/a0/7d/95/a07d95ff-72cd-1573-a43e-0c804ace3b48/mzaf_8932002555771100037.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/03/a6/6e/03a66e0c-aaad-2346-940e-4bded1255f2f/source/100x100bb.jpg", "collectionPrice": 4.95, "trackPrice": 0.99, "releaseDate": "2018-05-27T12:00:00Z", "collectionExplicitness": "explicit", "trackExplicitness": "explicit", "discCount": 1, "discNumber": 1, "trackCount": 5, "trackNumber": 4, "trackTimeMillis": 164284, "country": "USA", "currency": "USD", "primaryGenreName": "Hip-Hop/Rap", "contentAdvisoryRating": "Explicit", "isStreamable": true }, { "wrapperType": "track", "kind": "song", "artistId": 323910153, "collectionId": 323909882, "trackId": 323910152, "artistName": "Vnf Productions", "collectionName": "World Raiser, Vol. 5 (Paranoid)", "trackName": "Thalysee", "collectionCensoredName": "World Raiser, Vol. 5 (Paranoid)", "trackCensoredName": "Thalysee", "collectionArtistId": 4035426, "collectionArtistName": "Various Artists", "artistViewUrl": "https://music.apple.com/us/artist/vnf-productions/323910153?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/thalysee/323909882?i=323910152&uo=4", "trackViewUrl": "https://music.apple.com/us/album/thalysee/323909882?i=323910152&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview62/v4/3b/95/c0/3b95c072-02b3-1524-02ba-220cf3a8a839/mzaf_1506422478655404593.plus.aac.p.m4a", "artworkUrl30": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/a7/58/54/a7585451-dae6-e76a-0f4d-4d97dcdb69ca/source/30x30bb.jpg", "artworkUrl60": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/a7/58/54/a7585451-dae6-e76a-0f4d-4d97dcdb69ca/source/60x60bb.jpg", "artworkUrl100": "https://is2-ssl.mzstatic.com/image/thumb/Music/v4/a7/58/54/a7585451-dae6-e76a-0f4d-4d97dcdb69ca/source/100x100bb.jpg", "collectionPrice": 19.99, "trackPrice": 0.99, "releaseDate": "1996-06-10T12:00:00Z", "collectionExplicitness": "notExplicit", "trackExplicitness": "notExplicit", "discCount": 2, "discNumber": 1, "trackCount": 12, "trackNumber": 11, "trackTimeMillis": 225850, "country": "USA", "currency": "USD", "primaryGenreName": "Dance", "isStreamable": true }, { "wrapperType": "track", "kind": "song", "artistId": 323910153, "collectionId": 324042236, "trackId": 324044054, "artistName": "Vnf Productions", "collectionName": "Rave Guardian ( 27 Raving Terror Traxxx)", "trackName": "Thalysee", "collectionCensoredName": "Rave Guardian ( 27 Raving Terror Traxxx)", "trackCensoredName": "Thalysee", "collectionArtistId": 4035426, "collectionArtistName": "Various Artists", "artistViewUrl": "https://music.apple.com/us/artist/vnf-productions/323910153?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/thalysee/324042236?i=324044054&uo=4", "trackViewUrl": "https://music.apple.com/us/album/thalysee/324042236?i=324044054&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/Music2/v4/44/f6/f8/44f6f8e4-1b8f-a1a7-8eb0-f6afa7a6e701/mzaf_4013612297001267913.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/0c/d2/37/0cd237e8-500b-410f-8e0d-ccdd7a4c8fe0/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/0c/d2/37/0cd237e8-500b-410f-8e0d-ccdd7a4c8fe0/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/0c/d2/37/0cd237e8-500b-410f-8e0d-ccdd7a4c8fe0/source/100x100bb.jpg", "collectionPrice": 19.99, "trackPrice": 0.99, "releaseDate": "1996-07-16T12:00:00Z", "collectionExplicitness": "notExplicit", "trackExplicitness": "notExplicit", "discCount": 2, "discNumber": 2, "trackCount": 14, "trackNumber": 8, "trackTimeMillis": 227605, "country": "USA", "currency": "USD", "primaryGenreName": "Dance", "isStreamable": true }, { "wrapperType": "track", "kind": "song", "artistId": 323910153, "collectionId": 325702013, "trackId": 325706262, "artistName": "Vnf Productions", "collectionName": "Red Devil", "trackName": "Thalysee", "collectionCensoredName": "Red Devil", "trackCensoredName": "Thalysee", "collectionArtistId": 4035426, "collectionArtistName": "Various Artists", "artistViewUrl": "https://music.apple.com/us/artist/vnf-productions/323910153?uo=4", "collectionViewUrl": "https://music.apple.com/us/album/thalysee/325702013?i=325706262&uo=4", "trackViewUrl": "https://music.apple.com/us/album/thalysee/325702013?i=325706262&uo=4", "previewUrl": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview62/v4/0b/ea/c1/0beac199-201a-ffe2-c056-fb12c9a99094/mzaf_1831053017745184172.plus.aac.p.m4a", "artworkUrl30": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/8b/54/ff/8b54ff45-8673-8d2a-22e1-b3675850ffc4/source/30x30bb.jpg", "artworkUrl60": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/8b/54/ff/8b54ff45-8673-8d2a-22e1-b3675850ffc4/source/60x60bb.jpg", "artworkUrl100": "https://is1-ssl.mzstatic.com/image/thumb/Music/v4/8b/54/ff/8b54ff45-8673-8d2a-22e1-b3675850ffc4/source/100x100bb.jpg", "collectionPrice": 19.99, "trackPrice": 0.99, "releaseDate": "1997-11-10T12:00:00Z", "collectionExplicitness": "notExplicit", "trackExplicitness": "notExplicit", "discCount": 2, "discNumber": 2, "trackCount": 17, "trackNumber": 5, "trackTimeMillis": 227766, "country": "USA", "currency": "USD", "primaryGenreName": "Dance", "isStreamable": true } ]
        commit('fillResult', res)
    }
}