interface WorshipTrack {
  title: string
  artist: string
  src: string
}

const PLAYLIST: WorshipTrack[] = [
  { title: 'Pray for Me',                artist: 'Sunvera Scott',      src: '/audio/pray-for-me.mp3' },
  { title: 'All To Jesus I Surrender',   artist: 'Robin Mark',         src: '/audio/all-to-jesus-i-surrender.mp3' },
  { title: 'Holy Forever',               artist: 'Chris Tomlin',       src: '/audio/holy-forever.mp3' },
  { title: 'Holy Forever (Reprise)',     artist: 'Chris Tomlin',       src: '/audio/holy-forever-1.mp3' },
  { title: 'Days of Elijah',             artist: 'Robin Mark',         src: '/audio/days-of-elijah.mp3' },
  { title: 'Rock of Ages',               artist: 'Hymnal Worship',     src: '/audio/rock-of-ages.mp3' },
  { title: 'Come Thou Fount',            artist: 'Shane & Shane',      src: '/audio/come-thou-fount.mp3' },
  { title: 'Baraka Zako Ziwe Na Mimi',   artist: 'Swahili Worship',    src: '/audio/baraka-zako.mp3' },
  { title: 'Hata Hili Litapita',         artist: 'Patrick Kubuya',     src: '/audio/hata-hili-litapita.mp3' },
  { title: 'Jireh',                      artist: 'Elevation Worship',  src: '/audio/jireh.mp3' },
  { title: 'Ombi Langu',                 artist: 'Swahili Worship',    src: '/audio/ombi-langu.mp3' },
  { title: 'Umenipendelea',              artist: 'Henrick Mruma',      src: '/audio/umenipendelea.mp3' },
  { title: 'My Trust Is In You',         artist: 'David G',            src: '/audio/my-trust-is-in-you.mp3' },
  { title: 'Jesus Paid It All',          artist: 'Kim Walker-Smith',   src: '/audio/jesus-paid-it-all.mp3' },
  { title: 'God of Vengeance',           artist: 'Minister GUC',       src: '/audio/god-of-vengeance.mp3' },
  { title: 'Moyo Wangu',                 artist: 'Patrick Kubuya',     src: '/audio/moyo-wangu.mp3' },
  { title: 'Ushirika Na Wewe',           artist: 'Swahili Worship',    src: '/audio/ushirika-na-wewe.mp3' },
]

const SHUFFLE = false
const START_VOLUME = 0.5

let audioEl: HTMLAudioElement | null = null
const currentIndex = ref(0)
const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(START_VOLUME)
const userUnmuted = ref(false)
const hasStarted = ref(false)

const currentTrack = computed(() => PLAYLIST[currentIndex.value])
const playlist = PLAYLIST

function buildAudio() {
  if (typeof window === 'undefined') return
  if (audioEl) return

  audioEl = new Audio()
  audioEl.loop = false
  audioEl.volume = volume.value
  audioEl.preload = 'auto'
  audioEl.src = PLAYLIST[0].src
  audioEl.load()

  audioEl.addEventListener('ended', () => next())

  const savedTime = sessionStorage.getItem('worship-audio-time')
  if (savedTime) {
    audioEl.addEventListener(
      'loadedmetadata',
      () => {
        try { audioEl!.currentTime = parseFloat(savedTime) } catch {}
      },
      { once: true }
    )
  }

  setInterval(() => {
    if (audioEl && !audioEl.paused) {
      try { sessionStorage.setItem('worship-audio-time', String(audioEl.currentTime)) } catch {}
    }
  }, 4000)
}

function loadTrack(index: number) {
  if (!audioEl) return
  currentIndex.value = index
  audioEl.src = PLAYLIST[index].src
  audioEl.load()
}

function next() {
  if (!audioEl) return
  const nextIndex = SHUFFLE
    ? Math.floor(Math.random() * PLAYLIST.length)
    : (currentIndex.value + 1) % PLAYLIST.length
  loadTrack(nextIndex)
  if (isPlaying.value) play()
}

function prev() {
  if (!audioEl) return
  const prevIndex = SHUFFLE
    ? Math.floor(Math.random() * PLAYLIST.length)
    : (currentIndex.value - 1 + PLAYLIST.length) % PLAYLIST.length
  loadTrack(prevIndex)
  if (isPlaying.value) play()
}

async function play() {
  if (!audioEl) buildAudio()
  if (!audioEl) return
  if (!audioEl.src) loadTrack(currentIndex.value)

  try {
    await audioEl.play()
    isPlaying.value = true
    hasStarted.value = true
  } catch {
    isPlaying.value = false
  }
}

function pause() {
  if (!audioEl) return
  audioEl.pause()
  isPlaying.value = false
}

function toggle() {
  if (isPlaying.value) pause()
  else play()
}

async function enableSound() {
  if (typeof window === 'undefined') return
  if (!audioEl) buildAudio()
  if (!audioEl) return

  audioEl.muted = false
  isMuted.value = false
  userUnmuted.value = true

  if (!isPlaying.value) await play()
}

function toggleMute() {
  if (!audioEl) return
  if (isMuted.value) {
    enableSound()
  } else {
    audioEl.muted = true
    isMuted.value = true
  }
}

function setVolume(v: number) {
  volume.value = Math.max(0, Math.min(1, v))
  if (audioEl) audioEl.volume = volume.value
}

function playTrackBySrc(src: string) {
  const idx = PLAYLIST.findIndex((t) => t.src === src)
  if (idx === -1) return
  loadTrack(idx)
  play()
}

export function useWorshipAudio() {
  if (typeof window === 'undefined') {
    return {
      isPlaying, isMuted, userUnmuted, volume, currentTrack, playlist,
      play, pause, toggle, next, prev, toggleMute, enableSound, setVolume, playTrackBySrc,
    }
  }
  if (!audioEl) buildAudio()
  return {
    isPlaying, isMuted, userUnmuted, volume, currentTrack, playlist,
    play, pause, toggle, next, prev, toggleMute, enableSound, setVolume, playTrackBySrc,
  }
}
