<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'Haven of Hope · Let His word light your way' })

/*
|--------------------------------------------------------------------------
| Rotating hero — verses and teachings only (45s)
|--------------------------------------------------------------------------
*/
interface HeroSlide {
  kind: 'verse' | 'teaching'
  eyebrow: string
  title: string
  body: string
  meta: string
}

const ROTATION_MS = 45_000
const FADE_MS = 900

const slides: HeroSlide[] = [
  {
    kind: 'verse',
    eyebrow: 'A peaceful place to rest',
    title: 'Find Peace. Renew Your Hope. Grow in Faith.',
    body: '"Your word is a lamp for my feet, a light on my path."',
    meta: 'Psalm 119:105',
  },
  {
    kind: 'verse',
    eyebrow: 'When it feels impossible',
    title: 'What is impossible with man is possible with God.',
    body: '"What is impossible with man is possible with God."',
    meta: 'Luke 18:27',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'You do not have to save yourself.',
    body: 'When you look at your life and see something that cannot be fixed by your own strength — an addiction, a broken relationship, a dream that died — that is exactly the place where God does His best work. Bring your impossibility to Him.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'God\u2019s timing is not our timing',
    title: 'He makes everything beautiful in its time.',
    body: '"He has made everything beautiful in its time. He has also set eternity in the human heart; yet no one can fathom what God has done from beginning to end."',
    meta: 'Ecclesiastes 3:11',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'Your delay is not denial.',
    body: 'God is never late. He is not slow; He is precise. What feels like a delay from where you are standing is often preparation from where He is standing. The door that has not opened yet is not because He forgot you. It is because the room behind it is not ready. Wait with hope. He is never early and never late.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'Run to Him in trouble',
    title: 'The righteous run to Him and are safe.',
    body: '"The name of the Lord is a fortified tower; the righteous run to it and are safe."',
    meta: 'Proverbs 18:10',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'Run to God, not from Him.',
    body: 'When trouble comes, our first instinct is often to hide, to fix it ourselves, or to run from God because we feel unworthy. But the Bible says the righteous run to Him. Not because they are perfect — because they are wise. A tower does not chase you. You run to it. Whatever you are facing today, run to Him. He is already there, arms open.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'Give Him your plans',
    title: 'Commit everything you do to the Lord.',
    body: '"Commit to the Lord whatever you do, and he will establish your plans."',
    meta: 'Proverbs 16:3',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'Put your plans in His hands — then trust the outcome.',
    body: 'You can plan your life down to the minute and still watch it fall apart. Or you can place it in the hands of the One who wrote time itself. Committing your plans to God is not laziness. It is wisdom. It is saying, "I will do my part, but the result is Yours." When He establishes something, no storm can shake it.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'The story of Bartimaeus',
    title: 'Blind Bartimaeus refused to be silenced.',
    body: '"Jesus, Son of David, have mercy on me!" Many rebuked him and told him to be quiet, but he shouted all the more. Jesus stopped and said, "Call him here." Throwing his cloak aside, Bartimaeus jumped to his feet and came to Jesus. "What do you want me to do for you?" "Rabbi, I want to see." "Go," said Jesus, "your faith has healed you."',
    meta: 'Mark 10:46-52',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'He threw off his cloak and ran.',
    body: 'Bartimaeus was blind. He lived in darkness — no light, no direction, no hope of change. But when he heard Jesus was passing by, everything changed. He did three things we can all do. He cried out — he did not stay silent. He threw off his cloak — his only possession, the thing that identified him as a beggar — and he left it behind. And he ran to Jesus. Whatever has defined your old life, throw it off. Leave it on the ground. Run to Jesus.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'Dry bones come alive',
    title: 'Can these bones live again?',
    body: 'The hand of the Lord was on Ezekiel, and He set him in the middle of a valley full of dry bones. God asked, "Son of man, can these bones live?" Ezekiel said, "Sovereign Lord, you alone know." Then God said, "Prophesy to these bones." As Ezekiel spoke, there was a rattling sound — bone to bone. Tendons and flesh appeared. And breath entered them, and they came to life, a vast army.',
    meta: 'Ezekiel 37:1-14',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'Nothing is too dead for God.',
    body: 'The valley of dry bones is a picture of every broken thing, every dead dream, every hope that has dried up in your life. God did not ask Ezekiel to bury the bones. He asked him to speak to them. Nothing is too far gone for Him. The thing you have given up on may be the very thing He is about to bring back to life.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'The story of David',
    title: 'From a shepherd boy to a king.',
    body: 'David was the youngest of his brothers. When the prophet Samuel came to anoint a king, David was not even invited — he was out in the fields watching sheep. But God said to Samuel, "The Lord does not look at the things people look at. People look at the outward appearance, but the Lord looks at the heart." David went from a nobody in the field to a king on the throne of Israel.',
    meta: '1 Samuel 16:7-13',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'God sees the heart, not the resume.',
    body: 'David was overlooked by his own father. He was not on anyone\u2019s list of important people. But while he was faithful with sheep, God was preparing him to shepherd a nation. If you feel invisible — like nobody sees you, like you are wasting your days in a small place — remember David. God is not looking for the qualified. He is looking for the faithful. Where you are today is not where you will always be.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'A friendship that saved a life',
    title: 'Jonathan loved David as his own soul.',
    body: 'David and Jonathan became one in spirit. When King Saul wanted to kill David, Jonathan — Saul\u2019s own son and the rightful heir to the throne — risked everything to protect him. He warned David, spoke up for him, and let go of his own claim to the throne so David could be king. Their friendship was greater than ambition, greater than family loyalty, greater than fear of death.',
    meta: '1 Samuel 18:1-4, 20:1-42',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'A true friend gives up something to protect you.',
    body: 'Jonathan had every reason to hate David. David was going to take his throne. But Jonathan chose friendship over power. That is the kind of friend everyone needs and few people are. Ask yourself — who is my Jonathan? And who am I a Jonathan to? A real friendship is not measured by how many times you talk. It is measured by what you are willing to lose for the other person.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'A warning about sin',
    title: 'Sin always takes you further than you wanted to go.',
    body: 'David — the shepherd boy, the giant-slayer, the man after God\u2019s own heart — stood on his roof one evening and saw a woman bathing. Her name was Bathsheba. He sent for her. He slept with her. She became pregnant. To cover it up, David had her husband Uriah killed in battle. What began as one glance ended in adultery and murder. God sent the prophet Nathan, who said, "You are the man."',
    meta: '2 Samuel 11-12',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'Even the strongest hearts can fall.',
    body: 'David was not a weak man. He was the bravest, the most favoured, the most loved. And that is exactly why his story is a warning to all of us. Sin does not attack the weak alone — it attacks the distracted. It starts with one small compromise and ends somewhere you never planned to be. Guard your heart. Guard your eyes. Guard your evenings.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'Mercy after the fall',
    title: 'Create in me a clean heart, O God.',
    body: 'After Nathan confronted him, David did not make excuses. He fell on his face and wrote: "Have mercy on me, O God, according to your unfailing love. Wash away all my iniquity and cleanse me from my sin. Create in me a pure heart, O God, and renew a steadfast spirit within me."',
    meta: 'Psalm 51:1-11',
  },
  {
    kind: 'teaching',
    eyebrow: 'A quiet teaching',
    title: 'You are not too far gone.',
    body: 'David committed adultery and arranged a murder. Under the law, he deserved to die. But God did not destroy him. He restored him. If you think you have gone too far, remember: your sin is not bigger than His mercy. Repent. He is waiting. He has not stopped loving you.',
    meta: '— Haven of Hope Reflection',
  },
  {
    kind: 'verse',
    eyebrow: 'A promise for the broken',
    title: 'The Lord is close to the brokenhearted.',
    body: '"The Lord is close to the brokenhearted and saves those who are crushed in spirit."',
    meta: 'Psalm 34:18',
  },
  {
    kind: 'verse',
    eyebrow: 'Peace for the anxious heart',
    title: 'Cast your anxiety on Him.',
    body: '"Cast all your anxiety on him because he cares for you."',
    meta: '1 Peter 5:7',
  },
  {
    kind: 'verse',
    eyebrow: 'Grace for today',
    title: 'His mercy is new every morning.',
    body: '"Because of the Lord\u2019s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness."',
    meta: 'Lamentations 3:22-23',
  },
  {
    kind: 'verse',
    eyebrow: 'Fear will not win',
    title: 'Do not be afraid. He is with you.',
    body: '"Don\u2019t be afraid, for I am with you. Don\u2019t be discouraged, for I am your God. I will strengthen you and help you. I will hold you up with my victorious right hand."',
    meta: 'Isaiah 41:10',
  },
]

const currentSlide = ref(0)
const isPaused = ref(false)
const isFading = ref(false)
const progress = ref(0)

let rotationTimer: ReturnType<typeof setInterval> | null = null
let progressTimer: ReturnType<typeof setInterval> | null = null
let fadeTimeout: ReturnType<typeof setTimeout> | null = null

const activeSlide = computed(() => slides[currentSlide.value])

const kindStyle = (kind: HeroSlide['kind']) =>
  kind === 'verse'
    ? { bg: 'bg-[#cc0000]', label: 'Scripture' }
    : { bg: 'bg-[#0f172a]', label: 'Teaching' }

function advance() {
  isFading.value = true
  fadeTimeout = setTimeout(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.length
    progress.value = 0
    isFading.value = false
  }, FADE_MS)
}

function startRotation() {
  stopRotation()
  progressTimer = setInterval(() => {
    if (!isPaused.value) {
      progress.value = Math.min(100, progress.value + (100 / (ROTATION_MS / 250)))
    }
  }, 250)
  rotationTimer = setInterval(() => {
    if (!isPaused.value) advance()
  }, ROTATION_MS)
}

function stopRotation() {
  if (rotationTimer) { clearInterval(rotationTimer); rotationTimer = null }
  if (progressTimer) { clearInterval(progressTimer); progressTimer = null }
  if (fadeTimeout)   { clearTimeout(fadeTimeout); fadeTimeout = null }
}

function togglePause() { isPaused.value = !isPaused.value }

function goTo(index: number) {
  isFading.value = true
  if (fadeTimeout) clearTimeout(fadeTimeout)
  fadeTimeout = setTimeout(() => {
    currentSlide.value = index
    progress.value = 0
    isFading.value = false
  }, FADE_MS)
}

onMounted(() => startRotation())
onBeforeUnmount(() => stopRotation())

/*
|--------------------------------------------------------------------------
| Live ticker — verses + voices
|--------------------------------------------------------------------------
*/
interface TickerItem {
  type: 'verse' | 'comment'
  text: string
  meta: string
}

const tickerItems: TickerItem[] = [
  { type: 'verse',   text: 'Come to me, all you who are weary and burdened, and I will give you rest.', meta: 'Matthew 11:28' },
  { type: 'comment', text: 'This prayer brought me to tears. I needed this today.', meta: 'Hopeful Soul' },
  { type: 'verse',   text: 'Be strong and courageous. Do not be afraid; do not be discouraged.', meta: 'Joshua 1:9' },
  { type: 'comment', text: 'Reading this every morning has changed how I start my day.', meta: 'Child of God' },
  { type: 'verse',   text: 'My grace is sufficient for you, for my power is made perfect in weakness.', meta: '2 Corinthians 12:9' },
  { type: 'comment', text: 'I felt alone for weeks. This reminded me I am never truly alone.', meta: 'Faithful Heart' },
  { type: 'verse',   text: 'Cast all your anxiety on him because he cares for you.', meta: '1 Peter 5:7' },
  { type: 'comment', text: 'I read this testimony three times. Thank you for being brave.', meta: 'Redeemed' },
  { type: 'verse',   text: 'His mercies are new every morning; great is your faithfulness.', meta: 'Lamentations 3:23' },
  { type: 'comment', text: 'The worship music is so peaceful. I keep this open while I work.', meta: 'Quiet Soul' },
]

const tickerLoop = computed(() => [...tickerItems, ...tickerItems])

/*
|--------------------------------------------------------------------------
| TEACHING OF THE DAY — changes every 12 hours
|--------------------------------------------------------------------------
*/
interface DailyTeaching {
  scripture: string
  scriptureRef: string
  teachingTitle: string
  teaching: string
  prayer: string
  encouragement: string
}

const teachings: DailyTeaching[] = [
  {
    scripture: '"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."',
    scriptureRef: 'Proverbs 3:5-6',
    teachingTitle: 'When you cannot see the road ahead.',
    teaching: 'We spend so much energy trying to figure everything out — the next step, the right decision, the thing that will finally make sense. But God never asked us to understand the whole road. He asked us to trust the One who made it. Your job is not to see the end. Your job is to take the next step with Him. Understanding is not the goal. Trust is.',
    prayer: 'Father, I confess that I try to control what only You can hold. Teach me to trust You with the parts of my life I cannot see. Steady my heart in the unknown, and let me walk forward knowing You go before me. Amen.',
    encouragement: 'You do not have to know the way. You only have to know the One who is the Way.',
  },
  {
    scripture: '"Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls."',
    scriptureRef: 'Matthew 11:28-29',
    teachingTitle: 'You were never meant to carry this alone.',
    teaching: 'There is a kind of tiredness that sleep cannot fix — the tiredness of carrying things that were never yours to carry. The weight of what you cannot control, the grief you have not spoken, the pressure to hold everything together. Jesus does not ask you to try harder. He asks you to come. Rest is not weakness. It is obedience. And it is available today.',
    prayer: 'Jesus, I am tired. I bring You the weight I have been holding — the worries, the fears, the things I cannot fix. Take them from me. Give me the rest You promised. Teach me to receive, not to strive. Amen.',
    encouragement: 'Put the weight down. He is strong enough to carry what you cannot.',
  },
]

const teachingIndex = ref(0)
const currentTeaching = computed(() => teachings[teachingIndex.value])

function pickTeaching() {
  const hour = new Date().getHours()
  teachingIndex.value = hour < 12 ? 0 : 1
}

let teachingTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  pickTeaching()
  teachingTimer = setInterval(pickTeaching, 5 * 60 * 1000)
})

onBeforeUnmount(() => {
  if (teachingTimer) clearInterval(teachingTimer)
})
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <!-- =========================================================
         HERO (left) + LIVE TICKER (right)
    ========================================================== -->
    <section class="grid lg:grid-cols-5 gap-4 md:gap-5 mb-8 md:mb-12">

      <!-- LEFT: Rotating hero -->
      <div class="lg:col-span-3 relative overflow-hidden rounded-xl bg-[#0f172a] text-white min-h-[480px] md:min-h-[560px]">
        <img
          src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80"
          alt="Peaceful"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>

        <div class="relative z-10 flex items-center justify-between p-5 md:p-6">
          <div class="flex items-center gap-2">
            <span
              class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded"
              :class="kindStyle(activeSlide.kind).bg"
            >
              {{ kindStyle(activeSlide.kind).label }}
            </span>
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white/60">
              {{ activeSlide.eyebrow }}
            </span>
          </div>

          <button
            class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            :title="isPaused ? 'Resume rotation' : 'Pause rotation'"
            @click="togglePause"
          >
            <Icon :icon="isPaused ? 'fa6-solid:play' : 'fa6-solid:pause'" class="text-xs" />
          </button>
        </div>

        <div
          class="relative z-10 px-5 md:px-8 pb-16 md:pb-20 flex flex-col justify-end min-h-[400px] md:min-h-[480px] transition-opacity duration-700"
          :class="isFading ? 'opacity-0' : 'opacity-100'"
        >
          <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-6">
            {{ activeSlide.title }}
          </h1>

          <p
            class="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mb-4 md:mb-5"
            :class="activeSlide.kind === 'verse' ? 'italic text-white/90' : 'text-white/85'"
          >
            {{ activeSlide.body }}
          </p>

          <p class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-[#d4a24c] mb-6 md:mb-8">
            {{ activeSlide.meta }}
          </p>
        </div>

        <div class="absolute bottom-0 left-0 right-0 z-10 px-5 md:px-8 pb-4 md:pb-5">
          <div class="w-full h-0.5 bg-white/10 rounded overflow-hidden mb-3">
            <div
              class="h-full bg-[#cc0000] transition-[width] duration-300 ease-linear"
              :style="{ width: progress + '%' }"
            ></div>
          </div>

          <div class="flex items-center gap-1.5">
            <button
              v-for="(s, i) in slides"
              :key="i"
              class="h-1.5 rounded-full transition-all"
              :class="i === currentSlide ? 'bg-[#cc0000] w-6' : 'bg-white/25 w-1.5 hover:bg-white/50'"
              :title="`Go to slide ${i + 1}`"
              @click="goTo(i)"
            ></button>

            <span class="ml-auto text-[0.6rem] md:text-[0.65rem] uppercase tracking-widest text-white/50">
              {{ currentSlide + 1 }} / {{ slides.length }}
            </span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Live ticker -->
      <div class="lg:col-span-2 rounded-xl overflow-hidden bg-[#0f172a] text-white relative h-80 sm:h-96 md:h-[560px]">
        <div class="p-4 md:p-5 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#cc0000] animate-pulse"></span>
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
              Live · Verses &amp; Voices
            </span>
          </div>
          <Icon icon="fa6-solid:arrow-up" class="text-white/40 text-xs" />
        </div>

        <div class="ticker-wrap h-[calc(100%-52px)]">
          <div class="ticker-column">
            <div
              v-for="(item, i) in tickerLoop"
              :key="i"
              class="px-4 md:px-5 py-4 border-b border-white/5"
            >
              <div v-if="item.type === 'verse'" class="flex items-start gap-3">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded bg-[#cc0000] flex items-center justify-center shrink-0">
                  <Icon icon="fa6-solid:book-open" class="text-xs" />
                </div>
                <div class="min-w-0">
                  <p class="text-sm md:text-base leading-relaxed italic text-white/90">
                    "{{ item.text }}"
                  </p>
                  <p class="text-[0.65rem] md:text-xs font-bold uppercase tracking-wider text-[#d4a24c] mt-2">
                    {{ item.meta }}
                  </p>
                </div>
              </div>

              <div v-else class="flex items-start gap-3">
                <div class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-xs font-bold">
                  {{ item.meta.charAt(0) }}
                </div>
                <div class="min-w-0">
                  <p class="text-[0.65rem] md:text-xs font-bold uppercase tracking-wider text-white/60 mb-1">
                    {{ item.meta }}
                  </p>
                  <p class="text-sm md:text-base leading-relaxed text-white/85">
                    "{{ item.text }}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =========================================================
         TEACHING OF THE DAY (changes every 12 hours)
    ========================================================== -->
    <section class="relative overflow-hidden rounded-xl bg-[#0f172a] text-white mb-8 md:mb-12">

      <img
        src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80"
        alt="Teaching of the day"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/85 to-[#0f172a]/60"></div>

      <div class="relative z-10 p-6 md:p-10 lg:p-14">

        <div class="flex items-center justify-between mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#cc0000]">
              Teaching of the Day
            </span>
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white/60">
              Changes every 12 hours
            </span>
          </div>
          <Icon icon="fa6-solid:sun" class="text-[#d4a24c] text-lg" />
        </div>

        <div class="mb-6 md:mb-8">
          <p class="text-base sm:text-lg md:text-2xl italic leading-relaxed text-white/95 max-w-4xl mb-3">
            {{ currentTeaching.scripture }}
          </p>
          <p class="text-[0.7rem] md:text-sm font-bold uppercase tracking-widest text-[#d4a24c]">
            {{ currentTeaching.scriptureRef }}
          </p>
        </div>

        <div class="mb-6 md:mb-8 max-w-4xl">
          <h2 class="text-xl sm:text-2xl md:text-3xl font-black leading-tight mb-3 md:mb-4">
            {{ currentTeaching.teachingTitle }}
          </h2>
          <p class="text-sm sm:text-base md:text-lg leading-relaxed text-white/85">
            {{ currentTeaching.teaching }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4 md:gap-6">

          <div class="bg-white/5 border border-white/10 rounded-lg p-5 md:p-6">
            <div class="flex items-center gap-2 mb-3">
              <Icon icon="fa6-solid:hands-praying" class="text-[#cc0000]" />
              <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
                A Brief Prayer
              </span>
            </div>
            <p class="text-sm md:text-base leading-relaxed italic text-white/85">
              {{ currentTeaching.prayer }}
            </p>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-lg p-5 md:p-6">
            <div class="flex items-center gap-2 mb-3">
              <Icon icon="fa6-solid:heart" class="text-[#cc0000]" />
              <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
                Word of Encouragement
              </span>
            </div>
            <p class="text-sm md:text-base leading-relaxed text-white/90">
              {{ currentTeaching.encouragement }}
            </p>
          </div>

        </div>

      </div>
    </section>

    <!-- =========================================================
         FINAL CTA
    ========================================================== -->
    <section class="rounded-xl bg-[#0f172a] text-white px-5 md:px-6 py-8 md:py-14 text-center mb-4 md:mb-6">
      <Icon icon="fa6-solid:dove" class="text-3xl md:text-4xl text-[#d4a24c] mb-3 md:mb-4" />
      <h2 class="text-xl sm:text-2xl md:text-4xl font-black leading-tight mb-2 md:mb-3">
        Let His word light your way.
      </h2>
      <p class="text-sm md:text-base text-white/75 max-w-2xl mx-auto italic mb-5 md:mb-6">
        Come as you are. Stay as long as you need. His peace is here for you.
      </p>
    </section>

  </div>
</template>

<style scoped>
.transition-opacity { will-change: opacity; }

.ticker-wrap { overflow: hidden; position: relative; }

.ticker-column {
  display: flex;
  flex-direction: column;
  animation: ticker-up 60s linear infinite;
  will-change: transform;
}

.ticker-wrap:hover .ticker-column { animation-play-state: paused; }

@keyframes ticker-up {
  0%   { transform: translateY(0); }
  100% { transform: translateY(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-column { animation: none; }
  .transition-opacity { transition: none; }
}
</style>
