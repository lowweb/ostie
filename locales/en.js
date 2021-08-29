export default {
  header: {
    title: 'Searching movies and series based on the soundtrack'
  },
  search: {
    placeholder: {
      byArtist: "a Band/performer's name",
      bySong: 'some track title'
    },
    eg: 'E.g.,',
    toogle: {
      byArtist: 'Band or Performer based search',
      bySong: 'Track based search'
    }

  },
  resent: 'Latest Searches',
  footer: {
    aboutLink: 'About Ostie.org',
    aboutCap: 'Where did I hear that song?',
    aboutText: 'A good movie has a good soundtrack.Ostie.org helps you find movies and TV series by artist name or song title. If you want to find out in what movie the song was played in or which series soundtrack your favorite band took part in – Ostie.org will help you.',
    telegram:'Ostie’s Telegram'
  },
  result: {
    countArtist:'Artists found:',
    cap: 'You may hear {what} in these movies',
    byArtist: {
      nullResult: 'Looks like there is no movie with such a soundtrack...Try searching by',
      nullResultLinkText: 'track name',
    },
    bySong: {
      nullResult: "We couldn't find any movies...Try searching for",
      nullResultLinkText: 'another track',
      nullResultForSong: '{artistName} does not have a soundtrack for the selected song. Try to find',
      nullResultForSongLinkText: 'movies by artist',
    },
    songs: 'Tracks:',
    episodes: 'Episodes:',
    spoiler: 'More results'
  }

}
