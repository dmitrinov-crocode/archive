export function pauseAllVideo () {
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
    video.pause()
    // video.load()
  })
}