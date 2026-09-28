<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'Prayers · Haven of Hope' })

interface PrayerSlot {
  slot: 'morning' | 'afternoon' | 'night'
  label: string
  greeting: string
  scripture: string
  scriptureRef: string
  prayerFor: string
  prayer: string
  image: string
}

const prayerSlots: PrayerSlot[] = [
  {
    slot: 'morning',
    label: 'Morning Prayer',
    greeting: 'Good morning',
    scripture: '"Let the morning bring me word of your unfailing love, for I have put my trust in you. Show me the way I should go, for to you I entrust my life."',
    scriptureRef: 'Psalm 143:8',
    prayerFor: 'A Prayer for a Fresh Start Today',
    prayer: 'Father, thank You for this new morning. Thank You for breath, for mercy that resets, for a day I have never lived before. I do not know what this day holds — but I know who holds this day. Go before me. Guard my heart from worry, my mouth from careless words, my mind from what I cannot control. Let everything I do today reflect You. Give me strength for what is heavy, kindness for who I meet, and peace in the middle of the unknown. This day is Yours. I am Yours. Lead me, and I will follow. Amen.',
    image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1600&q=80',
  },
  {
    slot: 'afternoon',
    label: 'Afternoon Prayer',
    greeting: 'Good afternoon',
    scripture: '"Cast all your anxiety on him because he cares for you."',
    scriptureRef: '1 Peter 5:7',
    prayerFor: 'A Prayer for Strength in the Middle of the Day',
    prayer: 'Lord, the day is halfway through and I am already tired. There are things I am carrying that I have not spoken to You about — the pressure, the worry, the things I keep trying to fix on my own. I put them down now. I give them to You. Refresh me in this hour. Renew my strength, steady my mind, and remind me that You are still in control even when I am not. Let me not rush through today without noticing You. Fill the rest of this day with Your peace. Amen.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80',
  },
  {
    slot: 'night',
    label: 'Night Prayer',
    greeting: 'Good evening',
    scripture: '"In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety."',
    scriptureRef: 'Psalm 4:8',
    prayerFor: 'A Prayer for Rest and a Quiet Heart',
    prayer: 'Father, the day is done and I bring it to You — the good, the hard, the things I wish I had done differently. Forgive me where I failed. Thank You for every grace I did not deserve. I do not carry this day into the night. I leave it with You. Quiet my mind, calm my heart, and let me rest in the safety of Your presence. Watch over my home, my loved ones, and every anxious thought that tries to keep me awake. I will lie down in peace, because You are near. Amen.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
  },
]

// ---------------- Determine current slot by time of day ----------------
const hour = ref(new Date().getHours())

function slotFromHour(h: number): 'morning' | 'afternoon' | 'night' {
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'night'
}

const currentSlotKey = computed(() => slotFromHour(hour.value))
const currentPrayer = computed(
  () => prayerSlots.find((p) => p.slot === currentSlotKey.value) ?? prayerSlots[0]
)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  // Update every minute so the slot switches at the exact hour
  timer = setInterval(() => {
    hour.value = new Date().getHours()
  }, 60_000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="hover:text-[#cc0000] ml-1">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Prayers</span>
    </div>

    <!-- PAGE HEADER -->
    <div class="mb-6 md:mb-8">
      <span class="inline-block bg-[#cc0000] text-white text-[0.65rem] md:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
        Prayers
      </span>
      <h1 class="text-2xl md:text-4xl font-bold text-[#1f2937] leading-tight">
        Pray along, in your own quiet space
      </h1>
      <p class="text-sm md:text-base text-gray-600 mt-2 max-w-2xl italic">
        A written prayer for each part of the day. Read it slowly. Pray it in your heart.
      </p>
    </div>

    <!-- =========================================================
         THE PRAYER CARD
    ========================================================== -->
    <section class="relative overflow-hidden rounded-xl bg-[#0f172a] text-white min-h-[560px] md:min-h-[640px] mb-8 md:mb-12">

      <img
        :src="currentPrayer.image"
        :alt="currentPrayer.label"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/85 to-[#0f172a]/40"></div>

      <div class="relative z-10 p-6 md:p-10 lg:p-14">

        <!-- Top row: slot label + greeting -->
        <div class="flex items-center justify-between mb-6 md:mb-8">
          <div class="flex items-center gap-2">
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#cc0000]">
              {{ currentPrayer.label }}
            </span>
            <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white/60">
              {{ currentPrayer.greeting }}
            </span>
          </div>
          <Icon icon="fa6-solid:hands-praying" class="text-[#d4a24c] text-lg" />
        </div>

        <!-- Scripture -->
        <div class="mb-8 md:mb-10 max-w-4xl">
          <div class="flex items-center gap-2 mb-3">
            <Icon icon="fa6-solid:book-open" class="text-[#cc0000]" />
            <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
              Word from the Bible
            </span>
          </div>
          <p class="text-lg sm:text-xl md:text-3xl italic leading-relaxed text-white/95 mb-3">
            {{ currentPrayer.scripture }}
          </p>
          <p class="text-[0.7rem] md:text-sm font-bold uppercase tracking-widest text-[#d4a24c]">
            {{ currentPrayer.scriptureRef }}
          </p>
        </div>

        <!-- "A Prayer for..." -->
        <div class="mb-6 md:mb-8 max-w-4xl">
          <div class="flex items-center gap-2 mb-2">
            <Icon icon="fa6-solid:cross" class="text-[#cc0000]" />
            <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
              A Prayer for…
            </span>
          </div>
          <h2 class="text-xl sm:text-2xl md:text-4xl font-black leading-tight">
            {{ currentPrayer.prayerFor }}
          </h2>
        </div>

        <!-- The prayer itself -->
        <div class="bg-white/5 border border-white/10 rounded-xl p-5 md:p-8 max-w-4xl">
          <p class="text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
            {{ currentPrayer.prayer }}
          </p>
        </div>

        <!-- Slot indicators -->
        <div class="mt-6 md:mt-8 flex flex-wrap items-center gap-2">
          <span
            v-for="p in prayerSlots"
            :key="p.slot"
            class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
            :class="
              p.slot === currentSlotKey
                ? 'bg-[#cc0000] border-[#cc0000] text-white'
                : 'bg-white/5 border-white/15 text-white/60'
            "
          >
            {{ p.label }}
          </span>

          <span class="ml-auto text-[0.6rem] md:text-xs uppercase tracking-widest text-white/50">
            Changes with the time of day
          </span>
        </div>

      </div>
    </section>

    <!-- =========================================================
         FINAL CTA
    ========================================================== -->
    <section class="rounded-xl bg-[#0f172a] text-white px-5 md:px-6 py-8 md:py-14 text-center mb-4 md:mb-6">
      <Icon icon="fa6-solid:dove" class="text-3xl md:text-4xl text-[#d4a24c] mb-3 md:mb-4" />
      <h2 class="text-xl sm:text-2xl md:text-4xl font-black leading-tight mb-2 md:mb-3">
        He is listening.
      </h2>
      <p class="text-sm md:text-base text-white/75 max-w-2xl mx-auto italic mb-5 md:mb-6">
        Come back any time. Morning, afternoon, or night — there is a prayer waiting.
      </p>
    </section>

  </div>
</template>
