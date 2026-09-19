<script setup lang="ts">
import { Icon } from '@iconify/vue'
const { share } = useShare()

const message = ref('9th September 2026 — 20 years completed')
const formData = reactive({ name: '', phone: '', interest: '' })
const formStatus = ref('')

const celebrateBtn = () => {
  message.value = '20 YEARS! From KSh 6,500 to transforming schools across Kenya'
  setTimeout(() => { message.value = '9th September 2026 — 20 years completed' }, 5000)
}
const statsBtn = () => {
  message.value = 'KCSE 2025: 8.95 (515 candidates) · Defeated Mukumu 8.90!'
  setTimeout(() => { message.value = '9th September 2026 — 20 years completed' }, 5000)
}
const resetBtn = () => {
  message.value = '9th September 2026 — 20 years completed'
}
const handleFormSubmit = () => {
  if (formData.name && formData.phone && formData.interest) {
    formStatus.value = 'Thank you! Your message has been sent.'
    formData.name = ''
    formData.phone = ''
    formData.interest = ''
    setTimeout(() => { formStatus.value = '' }, 5000)
  } else {
    formStatus.value = 'Please fill in all fields.'
    setTimeout(() => { formStatus.value = '' }, 3000)
  }
}
</script>

<template>
  <!-- BREADCRUMB -->
  <div class="text-xs text-gray-500 mb-4">
    <span>You are here:</span>
    <NuxtLink to="/" class="hover:text-[#cc0000]">Home</NuxtLink>
    <span class="mx-1">›</span>
    <span class="font-semibold text-gray-700">About the Author</span>
  </div>

  <!-- CATEGORY AND TITLE -->
  <div class="mb-6">
    <span class="inline-block bg-[#cc0000] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider mb-2 rounded">
      Featured Story
    </span>
    <h1 class="text-2xl md:text-4xl font-bold text-[#1a1a1a] leading-tight">
      20 Years in the Classroom: Two Decades of Sacrifice, Service, Results and Purpose
    </h1>

    <!-- SHARE BUTTON -->
    <div class="flex items-center gap-3 mt-3 mb-2">
      <button
        class="flex items-center gap-2 text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
        @click="share('20 Years in the Classroom: Two Decades of Sacrifice, Service, Results and Purpose', '/about')"
      >
        <Icon icon="fa6-solid:share-nodes" />
        Share
      </button>
    </div>

    <div class="text-sm text-gray-500 mt-2 border-b border-gray-200 pb-3">
      <span class="font-semibold text-gray-700">9th September 2006 — The Day My Professional Journey Began</span>
      <span class="hidden md:inline mx-2">•</span>
      <br class="md:hidden" />
      By Mwalimu Malata Benson
      <span class="hidden md:inline mx-2">•</span>
      <br class="md:hidden" />
      Updated: 9th September 2026
    </div>
  </div>

  <!-- AUTHOR PORTRAIT -->
  <img src="/images/img1.jpeg" alt="Mwalimu Malata Benson" class="w-full h-72 md:h-96 object-cover bg-[#f0f0f0] rounded-lg mb-6" />

  <!-- MESSAGE BOX -->
  <div class="bg-[#f8f8f8] border border-[#e8e8e8] px-3 py-1.5 text-[0.8rem] md:text-[1rem] text-[#1a1a1a] text-center my-2 min-h-[2.2rem] flex items-center justify-center rounded">
    {{ message }}
  </div>

  <!-- BUTTONS -->
  <div class="flex gap-2 my-3 flex-wrap">
    <button class="bg-[#cc0000] text-white px-4 py-1.5 font-semibold text-[0.75rem] md:text-[0.9rem] uppercase tracking-[0.5px] hover:bg-[#aa0000] transition-colors rounded" @click="celebrateBtn">Celebrate 20 Years</button>
    <button class="bg-transparent text-[#1a1a1a] border-2 border-[#1a1a1a] px-4 py-1.5 font-semibold text-[0.75rem] md:text-[0.9rem] uppercase tracking-[0.5px] hover:bg-[#1a1a1a] hover:text-white transition-colors rounded" @click="statsBtn">2025 Results</button>
    <button class="bg-[#e8e8e8] text-[#1a1a1a] px-4 py-1.5 font-semibold text-[0.75rem] md:text-[0.9rem] uppercase tracking-[0.5px] hover:bg-[#d0d0d0] transition-colors rounded" @click="resetBtn">Reset</button>
  </div>

  <!-- STATS -->
  <div class="grid grid-cols-3 bg-[#f8f8f8] py-2 md:py-4 mb-4 border border-[#e8e8e8] rounded">
    <div class="text-center">
      <span class="block text-[1.2rem] md:text-[2rem] font-bold text-[#cc0000]">20</span>
      <span class="text-[0.55rem] md:text-[0.7rem] text-[#666] uppercase tracking-[0.3px]">Years Service</span>
    </div>
    <div class="text-center">
      <span class="block text-[1.2rem] md:text-[2rem] font-bold text-[#cc0000]">5</span>
      <span class="text-[0.55rem] md:text-[0.7rem] text-[#666] uppercase tracking-[0.3px]">Schools</span>
    </div>
    <div class="text-center">
      <span class="block text-[1.2rem] md:text-[2rem] font-bold text-[#cc0000]">8.95</span>
      <span class="text-[0.55rem] md:text-[0.7rem] text-[#666] uppercase tracking-[0.3px]">KCSE 2025 Mean</span>
    </div>
  </div>

  <!-- FIRST PARAGRAPHS -->
  <div class="space-y-4">
    <p class="text-sm md:text-base leading-relaxed text-gray-700">On 9th September 2006, I walked through the gates of <strong class="text-[#1a1a1a]">St. James Bulimbo Girls</strong>, now known as Mary Seat of Wisdom Bulimbo Girls, in Kakamega County, as a young teacher beginning a journey whose destination I could not see. Today, 9th September 2026, I look back with immense gratitude. I have completed 20 years in the teaching profession and entered my 21st year of service.</p>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">The school stands at the boundary of Kakamega and Bungoma counties, between Harambee Market and Watoya Market. It was there that my professional journey began—not on a permanent government appointment, but on BOM terms, earning a modest <strong class="text-[#1a1a1a]">KSh 6,500 per month</strong>. My rent at Harambee Market was KSh 700.</p>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">I had just left Moi University after completing my teacher training, whose climax was teaching practice at Umoja High School in Eldoret between May and July 2006. I arrived at Bulimbo Girls with little money, but with something far more valuable: a determination to serve the child.</p>
  </div>

  <!-- SECOND IMAGE -->
  <img src="/images/img2.jpeg" alt="Mwalimu Malata Benson in the field" class="w-full h-72 md:h-96 object-cover bg-[#f0f0f0] rounded-lg my-6" />

  <!-- STORY CONTINUES -->
  <div class="space-y-4">
    <div class="bg-[#f8f8f8] px-4 py-4 border-l-4 border-[#cc0000] my-4 rounded">
      <p class="text-sm md:text-base italic text-gray-700 font-medium">"Welcome to Bulimbo Girls and do your best to serve the child."</p>
      <p class="text-xs md:text-sm text-gray-500 font-semibold mt-1">— Madam Electine Wabuyabo Kisiangani, Principal</p>
    </div>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">Those few words became a professional philosophy that has remained with me for two decades. I learnt very early that teaching is not merely about completing a syllabus, attending lessons or earning a salary. Teaching is about serving the child.</p>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">4.20 A.M. — The Beginning of a Culture of Sacrifice</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">Every morning, I left my house early enough to arrive at school at about 4.20 a.m. My responsibility was to oversee the waking up and preparation of students for morning preps, which began at 5.00 a.m. and ended at 6.00 a.m. The response of the girls encouraged me. They appreciated my presence.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">Becoming the First Male Boarding Master</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">In 2007, I was entrusted with another responsibility. I became the Boarding Master—the first male Boarding Master in a girls' school. I took that responsibility very seriously.</p>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">I even bought a <strong class="text-[#1a1a1a]">Hero Jet bicycle for KSh 5,500</strong>, which became an important tool in enabling me to move around as I discharged this sacred responsibility.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">Bulimbo Girls — Where Kiswahili Became a Brand</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">Through sacrifice, teamwork and dedication, remarkable results began to emerge. Working alongside my Kiswahili counterpart, <strong class="text-[#1a1a1a]">Mr. Alex Chegenye</strong>, we pushed the subject to greater heights. Kiswahili eventually achieved a <strong class="text-[#1a1a1a]">mean score of 8.4 in KCSE</strong>, helping to establish the subject as a brand at Bulimbo Girls.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">2008 — Mandera and a New Chapter</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">In August 2008, I attended an interview at <strong class="text-[#1a1a1a]">Sheikh Ali Boys in Mandera</strong>. I succeeded and secured my first TSC appointment. Suddenly, the young teacher from Bulimbo Girls was moving to a completely different environment bordering Somalia and Ethiopia. But I carried the same philosophy with me: Wherever I am posted, I must serve the child to the best of my ability.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">When Teaching Went Beyond the Classroom</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">At Mandera, I worked closely with colleagues, among them <strong class="text-[#1a1a1a]">Mr. Abdikhalif</strong>, now Principal of Arabia Boys in Mandera. Together, we trained a Somali-dramatised dance. In 2009, that team reached the national level at Kaaga Girls in Meru.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">2010 — Ngozi Girls and the Birth of a Writer</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">In October 2010, I was posted to <strong class="text-[#1a1a1a]">Ngozi Girls in Lungalunga</strong>, at the Kenya-Tanzania border. This became another defining chapter. I eventually wrote <em>'Pepeto ya Isimujamii'</em>, which I later published in 2015.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">St. Peter's Boys Mumias — The Dream of 10.3</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">My journey later brought me to <strong class="text-[#1a1a1a]">St. Peter's Boys High School, Mumias</strong>, in 2014. Mr. Owuor Godfrey, the Principal, had developed an interest in my work from as early as 2007. In <strong class="text-[#1a1a1a]">KCSE 2015, Kiswahili achieved a mean score of 10.3</strong>, placing the school second behind Sacred Heart Mukumu Girls. That 10.3 remains a record yet to be broken at St. Peter's Boys.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">The Dream of Defeating Mukumu</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">From 2015, I developed one particular academic ambition: One day, I would defeat Sacred Heart Mukumu Girls in Kiswahili mean score. For years, that remained a dream. Then came <strong class="text-[#1a1a1a]">KCSE 2025 when Musingu High School achieved a Kiswahili mean score of 8.95</strong>, while Sacred Heart Mukumu Girls recorded 8.90. The dream had finally become reality. A dream pursued for ten years had finally been achieved — I could finally say: Mission accomplished.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">2017 — I Left Teaching to Try Politics</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">In 2017, I made a completely different decision. I resigned from teaching and ventured into politics, contesting for the position of MCA for Bukhayo Central Ward in Busia County. I lost to Hon. Kassaman. But losing an election did not mean losing my purpose.</p>
    </div>

    <div>
      <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">20th January 2019 — Musingu Boys</h3>
      <p class="text-sm md:text-base leading-relaxed text-gray-700">On 20th January 2019, I reported to <strong class="text-[#1a1a1a]">Musingu Boys High School</strong> in Kakamega South Sub-County. I joined a team. And together, we began another journey.</p>
    </div>
  </div>

  <!-- RESULTS TABLE -->
  <div class="my-6 pt-4 border-t-2 border-gray-200">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-3">Musingu Boys KCSE Performance</h3>
    <div class="grid grid-cols-5 md:grid-cols-10 gap-0.5">
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2016</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">6.53</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2017</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">5.00</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2018</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">5.40</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2019</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">6.70</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2020</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">7.40</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2021</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">7.70</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2022</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">7.90</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2023</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">8.40</span></div>
      <div class="bg-[#f8f8f8] border border-[#e8e8e8] text-center py-2 text-xs md:text-sm"><span class="block text-[#666] font-semibold">2024</span><span class="font-bold text-[#1a1a1a] text-sm md:text-base">8.50</span></div>
      <div class="bg-[#cc0000] border border-[#cc0000] text-center py-2 text-xs md:text-sm"><span class="block text-white/80 font-semibold">2025</span><span class="font-bold text-white text-sm md:text-base">8.95</span></div>
    </div>
    <p class="text-xs md:text-sm text-[#666] mt-2">515 candidates · Defeated Mukumu (8.90) in 2025</p>
  </div>

  <div class="mt-6">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-2">Results Are Built, Not Wished For</h3>
    <p class="text-sm md:text-base leading-relaxed text-gray-700 mb-3">Quality results do not happen by accident. They are built through:</p>
    <ul class="grid grid-cols-2 md:grid-cols-4 gap-2">
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Sacrifice</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Commitment</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Teamwork</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Discipline</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Consistency</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Collaboration</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Strategic Planning</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Mentorship</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Hard Work</li>
      <li class="list-none text-sm md:text-base text-[#333] py-1 flex items-center gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold">Belief in Learners</li>
    </ul>
  </div>

  <div class="mt-6">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">My Passion for Boarding Has Never Died</h3>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">Throughout the schools where I have worked, I have consistently found myself serving as a Boarding Master. This is not by accident. I have a deep passion for boarding. I believe that some of the roots of academic indiscipline begin in the boarding environment when teachers withdraw and leave students to manage themselves.</p>
  </div>

  <div class="mt-6">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">From Teacher to Mentor</h3>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">Today, my passion for teaching has developed into a wider mission. Principals from different schools now invite me to share knowledge and experience with teachers and students. I have been invited across <strong class="text-[#1a1a1a]">Kenya's eight regions</strong>.</p>
  </div>

  <div class="mt-6 p-4 bg-[#f8f8f8] border-l-4 border-[#cc0000] rounded">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-2">Gratitude to the Teachers Who Walked With Me</h3>
    <p class="leading-relaxed text-sm md:text-base text-[#333]">
      To every colleague who stood beside me: <strong class="text-[#1a1a1a]">ASANTE</strong>.<br />
      To every student who responded to my mentorship: <strong class="text-[#1a1a1a]">ASANTE</strong>.<br />
      To every principal who opened the school gate for me: <strong class="text-[#1a1a1a]">ASANTE</strong>.<br />
      To every teacher who embraced teamwork: <strong class="text-[#1a1a1a]">ASANTE</strong>
    </p>
  </div>

  <div class="mt-6">
    <h3 class="font-bold text-base md:text-lg text-[#1a1a1a] mb-1">The Journey Continues</h3>
    <p class="text-sm md:text-base leading-relaxed text-gray-700">
      Today, I celebrate 20 years of teaching and the beginning of my 21st year.<br />
      I celebrate the young teacher who arrived at Bulimbo Girls in 2006 with KSh 6,500 in his pocket but a heart full of determination.<br />
      I celebrate the bicycle that carried me through boarding responsibilities.<br />
      I celebrate the early mornings.<br />
      Above all, I celebrate many of students who have gone through my hands since 2006.
    </p>
  </div>

  <div class="bg-[#cc0000] text-white px-4 py-4 my-6 rounded">
    <p class="text-base md:text-xl font-bold text-center">MAY I CONTINUE TO HAVE THE STRENGTH, WISDOM AND HUMILITY TO SERVE THE CHILD.</p>
  </div>

  <div class="mt-6">
    <p class="text-lg md:text-2xl font-bold text-[#1a1a1a]">20 YEARS DOWN. THE CALLING REMAINS.</p>
    <div class="mt-2 p-4 bg-[#f8f8f8] border-l-4 border-[#cc0000] rounded">
      <p class="text-sm md:text-base text-[#333]">
        <strong class="text-[#1a1a1a] text-base md:text-lg">Mwalimu Malata Benson</strong><br />
        <span class="text-[#666]">Teacher – Mentor – Writer – Publisher – Educational Consultant – Political Analyst</span>
      </p>
    </div>
  </div>

  <div class="mt-8 p-5 md:p-6 rounded-lg bg-[#f8f8f8] border-l-4 border-[#cc0000]">
    <h3 class="text-lg md:text-xl font-bold text-[#1a1a1a] mb-2">Get In Touch</h3>
    <p class="text-sm text-gray-600 mb-4">Interested in connecting with Mwalimu Malata Benson for mentorship, speaking engagements, or collaboration? Fill in the form below.</p>
    <form class="space-y-4 max-w-2xl" @submit.prevent="handleFormSubmit">
      <div>
        <label for="name" class="block text-sm font-semibold text-[#1a1a1a] mb-1">Full Name</label>
        <input id="name" v-model="formData.name" type="text" class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#cc0000] rounded" placeholder="Enter your full name" required />
      </div>
      <div>
        <label for="phone" class="block text-sm font-semibold text-[#1a1a1a] mb-1">Phone Number</label>
        <input id="phone" v-model="formData.phone" type="tel" class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#cc0000] rounded" placeholder="Enter your phone number" required />
      </div>
      <div>
        <label for="interest" class="block text-sm font-semibold text-[#1a1a1a] mb-1">Description of Interest</label>
        <textarea id="interest" v-model="formData.interest" rows="4" class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#cc0000] rounded" placeholder="Briefly describe your interest or how you'd like to connect" required></textarea>
      </div>
      <button type="submit" class="bg-[#cc0000] text-white px-6 py-2 font-semibold text-sm uppercase tracking-wider hover:bg-[#990000] transition-colors rounded">Send Message</button>
      <p v-if="formStatus" :class="formStatus.includes('Thank you') ? 'text-green-700' : 'text-red-700'" class="text-sm mt-2">{{ formStatus }}</p>
    </form>
  </div>
</template>