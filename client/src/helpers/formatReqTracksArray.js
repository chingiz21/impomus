function formatReqBody(playlist) {
  const tracks = playlist.map(item => 
      `${item.track.artists[0].name} - ${item.track.name}`
    );

    return tracks;
};

module.exports = formatReqBody();