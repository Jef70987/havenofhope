<script setup lang="ts">
import { Icon } from '@iconify/vue'

useHead({ title: 'Words of Hope · Haven of Hope' })

interface Teaching {
  id: string
  tag: string
  title: string
  scripture: string
  scriptureRef: string
  teaching: string[]
  wordOfHope: string
  image: string
}

const teachings: Teaching[] = [
  {
    id: 'bartimaeus',
    tag: 'Faith',
    title: 'What Blind Bartimaeus Teaches Us About Leaving the Old Life',
    scripture:
      '"Jesus, Son of David, have mercy on me!" Many rebuked him and told him to be quiet, but he shouted all the more. So Jesus stopped and said, "Call him." Throwing his cloak aside, Bartimaeus jumped to his feet and came to Jesus. "What do you want me to do for you?" "Rabbi, I want to see." "Go," said Jesus, "your faith has healed you." Immediately he received his sight and followed Jesus along the road.',
    scriptureRef: 'Mark 10:46-52',
    teaching: [
      'Bartimaeus was blind. In his culture, blindness was not only a physical condition — it was a life of begging, of darkness, of no direction and no future. He sat by the roadside because he had nowhere else to go. That is what a life without God looks like: sitting still, hoping someone will help, not knowing the way forward. We all have a "blindness" — an area where we cannot see clearly, where we are stuck, where life has become confusion and darkness.',
      'Then Jesus passed by. And Bartimaeus did three things that changed his story. First, he cried out — he did not keep silent about his pain. He named his need. Second, when the crowd told him to be quiet, he shouted louder. That is not noise. That is faith. He refused to let other people decide what he deserved. Third, when Jesus called him, he threw off his cloak. That cloak was his only possession, the thing that identified him as a beggar. By throwing it away, he was saying: I am done being who I was. I am leaving the old life behind.',
      'When he stood before Jesus and said, "I want to see," his blindness ended — and a new life began. He did not go back to the roadside. He followed Jesus. This is what God does with a life that runs to Him. He does not just fix the problem. He gives a new direction, a new identity, a new beginning.',
    ],
    wordOfHope:
      'Whatever has kept you sitting by the roadside — cry out. Throw off the old life. Run to Jesus. He is not just able to heal you. He is ready to give you a new one.',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&q=80',
  },
  {
    id: 'prodigal',
    tag: 'Forgiveness',
    title: 'The Son Who Came Home — You Are Always Welcome Back',
    scripture:
      'But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him. The son said, "Father, I have sinned against heaven and against you. I am no longer worthy to be called your son." But the father said to his servants, "Quick! Bring the best robe and put it on him. Put a ring on his finger and sandals on his feet."',
    scriptureRef: 'Luke 15:20-22',
    teaching: [
      'The prodigal son took everything his father had given him and wasted it — on wild living, on people who did not care about him, on a life that promised him pleasure and gave him emptiness. When the money ran out, so did everyone else. He ended up feeding pigs, wishing he could eat what they ate. That is what sin does. It is not loud. It is quiet. It takes a little at a time until you look up one day and realise you are far from home.',
      'But the story does not end in the pig pen. It ends on the road home. The son decided to return — not because he deserved to, but because he knew the kind of father he had. And what did the father do when he saw him? He did not wait. He did not lecture. He did not make him earn his place back. He ran. He embraced him. He dressed him in the best robe and put a ring on his finger. The ring was not just jewellery — it was the family seal. It meant: you are still my son. You are still mine.',
      'Some of us have been away from God for years. Some of us think we have sinned past the point of return. That is a lie. The father is not standing at the door with his arms crossed. He is looking down the road, waiting for you. He has been waiting the whole time.',
    ],
    wordOfHope:
      'You are not too far. You are not too late. The door is open, the robe is ready, and the father is running toward you. Come home.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1600&q=80',
  },
  {
    id: 'davids-fall',
    tag: 'Grace',
    title: 'David Fell — and God Still Called Him a Man After His Own Heart',
    scripture:
      'Then Nathan said to David, "You are the man!" David said to Nathan, "I have sinned against the Lord." Nathan replied, "The Lord has taken away your sin. You are not going to die." Then David wrote: "Have mercy on me, O God, according to your unfailing love; wash away all my iniquity and cleanse me from my sin. Create in me a pure heart, O God, and renew a steadfast spirit within me."',
    scriptureRef: '2 Samuel 12:7, 13 · Psalm 51:1-2, 10',
    teaching: [
      'David was the shepherd boy who killed a giant. He was the man God chose to be king. He was beloved, blessed, anointed. And yet one evening, from his roof, he saw a woman bathing and everything began to fall apart. He slept with her. She became pregnant. To cover it up, he had her husband killed in battle. Adultery, then murder. The man after God\u2019s own heart fell harder than most of us ever will.',
      'But here is what makes David\u2019s story different. When the prophet Nathan confronted him — "You are the man!" — David did not make excuses. He did not blame the woman. He did not blame the pressure of being king. He said four words: "I have sinned against the Lord." No defence. No spin. Just honesty. And God — the same God who sees everything, the same God who could have struck him down — said, "The Lord has taken away your sin."',
      'David still faced consequences. The sword did not leave his house. He lost children, he lost peace, he lost years. But he did not lose his place in God\u2019s heart. He did not lose the title "a man after God\u2019s own heart." He wrote Psalm 51 on his knees, asking God to create in him a clean heart — and God did. Your sin is not the end of your story. It is the beginning of your return.',
    ],
    wordOfHope:
      'God does not love you less in your failure. He loves you the same. Repent, get up, and keep walking — He has already gone ahead of you.',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1600&q=80',
  },
]
</script>

<template>
  <div class="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 md:py-4">

    <!-- BREADCRUMB -->
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="hover:text-[#cc0000] ml-1">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Words of Hope</span>
    </div>

    <!-- PAGE HEADER -->
    <div class="mb-6 md:mb-10">
      <span class="inline-block bg-[#cc0000] text-white text-[0.65rem] md:text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
        Words of Hope
      </span>
      <h1 class="text-2xl md:text-4xl font-bold text-[#1f2937] leading-tight">
        Teachings for real life
      </h1>
      <p class="text-sm md:text-base text-gray-600 mt-2 max-w-2xl italic">
        Scripture, teaching, and a word of hope — for the things we actually face.
      </p>
    </div>

    <!-- TEACHINGS LIST -->
    <div class="space-y-8 md:space-y-12">

      <article
        v-for="t in teachings"
        :key="t.id"
        class="relative overflow-hidden rounded-xl bg-[#0f172a] text-white"
      >
        <!-- Background image -->
        <img
          :src="t.image"
          :alt="t.title"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/90 to-[#0f172a]/50"></div>

        <!-- Content -->
        <div class="relative z-10 p-6 md:p-10 lg:p-14">

          <!-- Tag + label -->
          <div class="flex items-center justify-between mb-6 md:mb-8">
            <div class="flex items-center gap-2">
              <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-[#cc0000]">
                Teaching
              </span>
              <span class="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white/60">
                {{ t.tag }}
              </span>
            </div>
            <Icon icon="fa6-solid:book-open" class="text-[#d4a24c] text-lg" />
          </div>

          <!-- Title -->
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6 md:mb-8 max-w-4xl">
            {{ t.title }}
          </h2>

          <!-- Scripture -->
          <div class="mb-8 md:mb-10 max-w-4xl">
            <div class="flex items-center gap-2 mb-3">
              <Icon icon="fa6-solid:cross" class="text-[#cc0000]" />
              <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
                Scripture
              </span>
            </div>
            <p class="text-base sm:text-lg md:text-2xl italic leading-relaxed text-white/95 mb-3">
              {{ t.scripture }}
            </p>
            <p class="text-[0.7rem] md:text-sm font-bold uppercase tracking-widest text-[#d4a24c]">
              {{ t.scriptureRef }}
            </p>
          </div>

          <!-- Teaching body -->
          <div class="mb-8 md:mb-10 max-w-4xl space-y-5">
            <div class="flex items-center gap-2 mb-2">
              <Icon icon="fa6-solid:lightbulb" class="text-[#cc0000]" />
              <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
                The Teaching
              </span>
            </div>

            <p
              v-for="(para, i) in t.teaching"
              :key="i"
              class="text-sm sm:text-base md:text-lg leading-relaxed text-white/85"
            >
              {{ para }}
            </p>
          </div>

          <!-- Word of Hope -->
          <div class="bg-white/5 border border-white/10 rounded-xl p-5 md:p-8 max-w-4xl">
            <div class="flex items-center gap-2 mb-3">
              <Icon icon="fa6-solid:heart" class="text-[#cc0000]" />
              <span class="text-[0.65rem] md:text-xs font-bold uppercase tracking-widest text-white/70">
                Word of Hope
              </span>
            </div>
            <p class="text-base sm:text-lg md:text-2xl italic leading-relaxed text-white/95 font-bold">
              {{ t.wordOfHope }}
            </p>
          </div>

        </div>
      </article>

    </div>

    <!-- FINAL CTA -->
    <section class="rounded-xl bg-[#0f172a] text-white px-5 md:px-6 py-8 md:py-14 text-center mt-10 md:mt-14">
      <Icon icon="fa6-solid:dove" class="text-3xl md:text-4xl text-[#d4a24c] mb-3 md:mb-4" />
      <h2 class="text-xl sm:text-2xl md:text-4xl font-black leading-tight mb-2 md:mb-3">
        His word is alive.
      </h2>
      <p class="text-sm md:text-base text-white/75 max-w-2xl mx-auto italic mb-5 md:mb-6">
        Every story in Scripture is a mirror. Read it slowly. You will find yourself in it — and you will find Him.
      </p>
    </section>

  </div>
</template>
