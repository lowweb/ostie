export const state = () => ({
    resentSearch: []
})

export const getters = {
  resentList: state => {
    return state.resentSearch
  }

}

export const mutations = {
    add(state, data) {
        state.resentSearch = data
    }
}


export const actions = {
    get({commit}) {
       const result = [
        {   picUrl: 'https://m.media-amazon.com/images/M/MV5BNTE1NmE3NjYtZWIzNi00OWI3LTk3OGMtODAzNTFjYWU1ODVkXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg',
            film: 'Point Break',
            song: 'If 6 Was 9',
            artist: 'Jimi Hendrix'
        },
        {
            picUrl: 'https://m.media-amazon.com/images/M/MV5BNTAwYjNlNTQtMzE1OC00NjkxLWEzNGItNTg3OWIwMzFhYjEzXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg',    
            film: 'The Gentlemen 2019',
            song: 'In Every Dream Homea Heartache',
            artist: 'Roxy Music'
        },
        {
            picUrl: 'https://m.media-amazon.com/images/M/MV5BOThlMjgxNmYtN2E2Mi00ODliLWE1M2ItYjAxN2JmYzBkZWMxXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg',
            film: 'Jaws',
            song: 'Spanish Ladies',
            artist: 'Robert Shaw'
        },
        {
            picUrl: 'https://m.media-amazon.com/images/M/MV5BNjk0ODIzNDQ1N15BMl5BanBnXkFtZTgwMjMxNTI5NzE@._V1_UX477_CR0,0,477,268_AL_.jpg',
            film: 'Demolition 2015',
            song: 'Touch Me, Im Going to Scream (Pt. 2)',
            artist: 'My Morning Jacket'
        },
    {   picUrl: 'https://m.media-amazon.com/images/M/MV5BMWIxMGMwMzUtN2YzNy00OTQ1LWJiZmUtMjBiMzhkNGQ0MjJjXkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_UX477_CR0,0,477,268_AL_.jpg',
            film: 'Peaky Blinders',
            song: 'Burn The Witch',
            artist: 'Queens of the Stone Age'
        },
        {
            picUrl: 'https://m.media-amazon.com/images/M/MV5BOTk5ZjYyZTMtYzYwOC00NmJiLTk1OGQtZTMxY2I1YWQ3ZjJmXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg',    
            film: 'Dumb and Dumber',
            song: 'Oh Pretty Woman',
            artist: 'Roy Orbison'
        },
        {
            picUrl: 'https://m.media-amazon.com/images/M/MV5BNjk0ODIzNDQ1N15BMl5BanBnXkFtZTgwMjMxNTI5NzE@._V1_UX477_CR0,0,477,268_AL_.jpg',
            film: 'Demolition 2015',
            song: 'Touch Me, Im Going to Scream (Pt. 2)',
            artist: 'My Morning Jacket'
        }
    ]

        commit('add', result)

    }
}

