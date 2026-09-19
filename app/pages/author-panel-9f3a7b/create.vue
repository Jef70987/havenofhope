<script setup lang="ts">
import { Icon } from '@iconify/vue'

definePageMeta({ layout: 'admin' })

const meta = reactive({
  title: '',
  subtitle: '',
  slug: '',
  category: '',
  categoryPath: '',
  image: '',
  author: 'Mwalimu Malata Benson',
  date: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' }),
})

const readValue = ref<number | ''>('')
const readUnit = ref<'min' | 'sec' | 'hr' | 'days'>('min')

const readTimeComputed = computed(() => {
  if (!readValue.value && readValue.value !== 0) return ''
  return `${readValue.value} ${readUnit.value} read`
})

type BlockType = 'p' | 'heading' | 'highlight' | 'list' | 'signature' | 'signatureName' | 'signatureRole' | 'signatureContact'

interface Block {
  id: number
  type: BlockType
  text?: string
  items?: string[]
}

const blockTypes: { value: BlockType; label: string; hint: string; input: 'short' | 'long' | 'list' }[] = [
  { value: 'p',               label: 'Paragraph',       hint: 'Normal body paragraph',                          input: 'long' },
  { value: 'heading',         label: 'Section Heading', hint: 'Bold section title',                             input: 'short' },
  { value: 'highlight',       label: 'Highlight Box',   hint: 'Red-bordered callout for key points',            input: 'long' },
  { value: 'list',            label: 'Bullet List',     hint: 'One item per line',                              input: 'list' },
  { value: 'signature',       label: 'Signature line',  hint: 'e.g. Yours in Education...',                     input: 'short' },
  { value: 'signatureName',   label: 'Signature name',  hint: 'Bold name',                                      input: 'short' },
  { value: 'signatureRole',   label: 'Signature role',  hint: 'Small grey line',                                input: 'short' },
  { value: 'signatureContact',label: 'Signature contact',hint:'Red contact line',                                input: 'short' },
]

const categories = [
  { label: 'TSC',              path: '/tsc' },
  { label: 'Schools',          path: '/schools' },
  { label: 'Workshops',        path: '/workshops' },
  { label: 'Educational News', path: '/educational-news' },
  { label: 'KNEC',             path: '/knec' },
  { label: 'Leadership',       path: '/leadership' },
  { label: 'Politics',         path: '/politics' },
  { label: 'Social',           path: '/social' },
]

const blocks = ref<Block[]>([])
const newBlockType = ref<BlockType>('p')
const newBlockText = ref('')
const editingId = ref<number | null>(null)

const currentTypeInfo = computed(() => blockTypes.find((b) => b.value === newBlockType.value)!)

const addBlock = () => {
  if (!newBlockText.value.trim()) return
  const block: Block = { id: Date.now(), type: newBlockType.value }
  if (newBlockType.value === 'list') {
    block.items = newBlockText.value.split('\n').map((s) => s.trim()).filter(Boolean)
  } else {
    block.text = newBlockText.value.trim()
  }
  if (editingId.value !== null) {
    const idx = blocks.value.findIndex((b) => b.id === editingId.value)
    if (idx !== -1) blocks.value[idx] = { ...block, id: editingId.value }
    editingId.value = null
  } else {
    blocks.value.push(block)
  }
  newBlockText.value = ''
}

const editBlock = (b: Block) => {
  editingId.value = b.id
  newBlockType.value = b.type
  newBlockText.value = b.type === 'list' ? (b.items || []).join('\n') : (b.text || '')
}

const deleteBlock = (id: number) => {
  blocks.value = blocks.value.filter((b) => b.id !== id)
}

const moveUp = (i: number) => {
  if (i === 0) return
  const arr = blocks.value
  ;[arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
}

const moveDown = (i: number) => {
  if (i === blocks.value.length - 1) return
  const arr = blocks.value
  ;[arr[i + 1], arr[i]] = [arr[i], arr[i + 1]]
}

const cancelEdit = () => {
  editingId.value = null
  newBlockText.value = ''
}

watch(() => meta.title, (val) => {
  if (!meta.slug) {
    meta.slug = val.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-').slice(0, 60)
  }
})

watch(() => meta.category, (val) => {
  const c = categories.find((x) => x.label === val)
  meta.categoryPath = c ? c.path : ''
})

const fileInput = ref<HTMLInputElement | null>(null)
const pickImage = () => fileInput.value?.click()

const onFileChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => { meta.image = reader.result as string }
  reader.readAsDataURL(file)
}

const clearImage = () => {
  meta.image = ''
  if (fileInput.value) fileInput.value.value = ''
}

const { show: showToast } = useToast()

const publish = () => {
  if (!meta.title.trim()) return showToast('Please add a title.')
  if (!meta.category) return showToast('Please choose a category.')
  if (!blocks.value.length) return showToast('Please add at least one content block.')
  console.log('ARTICLE TO SAVE:', { ...meta, readTime: readTimeComputed.value, body: blocks.value })
  showToast('Preview only — saving wired tomorrow.')
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-start w-full max-w-full overflow-hidden">
    <!-- FORM -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 md:p-5 w-full min-w-0">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
        Create / Draft Article Details
      </h2>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-semibold mb-1">Title *</label>
          <input
            v-model="meta.title"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="e.g. TSC Re-Advertises 1,631 Promotion Jobs for Teachers"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">Subtitle (optional)</label>
          <input
            v-model="meta.subtitle"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            placeholder="Short subtitle or note"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="min-w-0">
            <label class="block text-xs font-semibold mb-1">Category *</label>
            <select
              v-model="meta.category"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
            >
              <option value="">Choose...</option>
              <option v-for="c in categories" :key="c.label" :value="c.label">{{ c.label }}</option>
            </select>
          </div>
          <div class="min-w-0">
            <label class="block text-xs font-semibold mb-1">Read Time</label>
            <div class="flex gap-2">
              <input
                v-model.number="readValue"
                type="number"
                min="0"
                class="w-16 sm:w-20 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
                placeholder="5"
              />
              <select
                v-model="readUnit"
                class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
              >
                <option value="sec">sec</option>
                <option value="min">min</option>
                <option value="hr">hr</option>
                <option value="days">days</option>
              </select>
              <span class="self-center text-xs text-gray-500">read</span>
            </div>
            <p class="text-[0.65rem] text-gray-500 mt-1">
              Preview: {{ readTimeComputed || '—' }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">Slug (auto from title)</label>
          <input
            v-model="meta.slug"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm font-mono focus:outline-none focus:border-[#1a1a1a]"
            placeholder="kiswahili-workshop-nakuru"
          />
          <p class="text-[0.65rem] text-gray-500 mt-1 break-all">URL: /article/{{ meta.slug || '...' }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">Featured Image</label>
          <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFileChange" />

          <button
            v-if="!meta.image"
            type="button"
            class="w-full flex items-center justify-center gap-2 px-3 py-3 border-2 border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-[#cc0000] hover:text-[#cc0000] transition-colors"
            @click="pickImage"
          >
            <Icon icon="fa6-solid:cloud-arrow-up" />
            Click to upload image
          </button>

          <div v-else class="border border-gray-200 rounded overflow-hidden">
            <img :src="meta.image" alt="Featured" class="w-full h-40 object-cover bg-[#f0f0f0]" />
            <div class="flex gap-2 p-2 bg-[#f8f8f8] border-t border-gray-200">
              <button
                type="button"
                class="flex-1 text-xs font-semibold py-1.5 rounded bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
                @click="pickImage"
              >Change</button>
              <button
                type="button"
                class="flex-1 text-xs font-semibold py-1.5 rounded bg-[#cc0000] text-white hover:bg-[#990000]"
                @click="clearImage"
              >Remove</button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="min-w-0">
            <label class="block text-xs font-semibold mb-1">Author</label>
            <input
              v-model="meta.author"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
          <div class="min-w-0">
            <label class="block text-xs font-semibold mb-1">Date</label>
            <input
              v-model="meta.date"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            />
          </div>
        </div>
      </div>

      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mt-6 mb-3 border-l-4 border-[#cc0000] pl-2">
        Body Content
      </h2>

      <div class="bg-[#f8f8f8] border border-[#e8e8e8] rounded p-3 space-y-2">
        <div>
          <label class="block text-xs font-semibold mb-1">Block type</label>
          <select
            v-model="newBlockType"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:border-[#1a1a1a]"
          >
            <option v-for="b in blockTypes" :key="b.value" :value="b.value">{{ b.label }}</option>
          </select>
          <p class="text-[0.65rem] text-gray-500 mt-1">{{ currentTypeInfo.hint }}</p>
        </div>

        <div>
          <label class="block text-xs font-semibold mb-1">
            {{ newBlockType === 'list' ? 'Items (one per line)' : 'Text' }}
          </label>
          <textarea
            v-model="newBlockText"
            :rows="currentTypeInfo.input === 'long' || newBlockType === 'list' ? 5 : 2"
            class="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#1a1a1a]"
            :placeholder="newBlockType === 'list' ? 'First item\nSecond item\nThird item' : 'Type or paste content here...'"
          ></textarea>
        </div>

        <div class="flex gap-2">
          <button
            type="button"
            class="flex-1 bg-[#cc0000] text-white py-2 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
            @click="addBlock"
          >
            {{ editingId !== null ? 'Save Changes' : '+ Add Block' }}
          </button>
          <button
            v-if="editingId !== null"
            type="button"
            class="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded bg-[#e8e8e8] hover:bg-[#d0d0d0]"
            @click="cancelEdit"
          >Cancel</button>
        </div>
      </div>

      <div v-if="blocks.length" class="mt-4 space-y-2">
        <h3 class="text-xs font-bold uppercase tracking-wider text-gray-500">Blocks ({{ blocks.length }})</h3>
        <div
          v-for="(b, i) in blocks"
          :key="b.id"
          class="border border-[#e8e8e8] rounded p-2 bg-white flex items-start gap-2"
        >
          <div class="flex-1 min-w-0">
            <div class="text-[0.65rem] font-bold uppercase tracking-wider text-[#cc0000]">
              {{ blockTypes.find(x => x.value === b.type)?.label }}
            </div>
            <div class="text-xs text-gray-700 truncate">
              {{ b.type === 'list' ? (b.items || []).join(' · ') : b.text }}
            </div>
          </div>
          <div class="flex flex-col gap-0.5">
            <button class="text-gray-400 hover:text-[#1a1a1a] text-xs" @click="moveUp(i)">▲</button>
            <button class="text-gray-400 hover:text-[#1a1a1a] text-xs" @click="moveDown(i)">▼</button>
          </div>
          <div class="flex flex-col gap-0.5">
            <button class="text-gray-500 hover:text-[#1a1a1a] text-xs" @click="editBlock(b)">Edit</button>
            <button class="text-[#cc0000] hover:underline text-xs" @click="deleteBlock(b.id)">Delete</button>
          </div>
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-2">
        <button
          class="flex-1 bg-[#cc0000] text-white py-2.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000]"
          @click="publish"
        >Publish</button>
        <button
          class="flex-1 bg-[#e8e8e8] text-[#1a1a1a] py-2.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
          @click="publish"
        >Save Draft</button>
      </div>
    </section>

    <!-- PREVIEW -->
    <section class="bg-white rounded-lg shadow border border-[#e8e8e8] p-4 md:p-5 lg:sticky lg:top-4 w-full min-w-0">
      <h2 class="text-sm font-bold uppercase tracking-wider text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-2">
        Live Preview
      </h2>

      <div class="lg:max-h-[75vh] lg:overflow-y-auto lg:pr-2">
        <div v-if="meta.category" class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-2">
          {{ meta.category }}
        </div>

        <h1 class="text-xl md:text-2xl font-bold text-[#1a1a1a] leading-tight mb-2 break-words">
          {{ meta.title || 'Your article title' }}
        </h1>

        <p v-if="meta.subtitle" class="text-sm italic text-gray-600 mb-3 break-words">{{ meta.subtitle }}</p>

        <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 border-b border-[#f0f0f0] pb-3 mb-4">
          <span>By {{ meta.author || 'Author' }}</span>
          <span>·</span>
          <span>{{ meta.date }}</span>
          <template v-if="readTimeComputed">
            <span>·</span>
            <span>{{ readTimeComputed }}</span>
          </template>
        </div>

        <div v-if="meta.image" class="mb-4">
          <img :src="meta.image" :alt="meta.title" class="w-full h-40 object-cover rounded bg-[#f0f0f0]" />
        </div>

        <div class="space-y-3">
          <template v-for="b in blocks" :key="b.id">
            <h2 v-if="b.type === 'heading'" class="text-lg font-bold text-[#1a1a1a] mt-4 break-words">{{ b.text }}</h2>
            <div v-else-if="b.type === 'highlight'" class="bg-[#f8f8f8] border-l-4 border-[#cc0000] px-3 py-3 my-2">
              <p class="text-sm font-bold text-[#1a1a1a] leading-relaxed break-words">{{ b.text }}</p>
            </div>
            <ul v-else-if="b.type === 'list'" class="my-2 space-y-1 pl-4">
              <li
                v-for="(item, j) in b.items"
                :key="j"
                class="text-sm text-gray-700 flex items-start gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold break-words"
              >
                <span>{{ item }}</span>
              </li>
            </ul>
            <p v-else-if="b.type === 'signature'" class="text-sm text-gray-700 mt-4 italic break-words">{{ b.text }}</p>
            <p v-else-if="b.type === 'signatureName'" class="text-base font-bold text-[#1a1a1a] mt-2 break-words">{{ b.text }}</p>
            <p v-else-if="b.type === 'signatureRole'" class="text-xs text-gray-500 break-words">{{ b.text }}</p>
            <p v-else-if="b.type === 'signatureContact'" class="text-xs text-[#cc0000] font-semibold break-words">{{ b.text }}</p>
            <p v-else class="text-sm text-gray-700 leading-relaxed break-words">{{ b.text }}</p>
          </template>

          <p v-if="!blocks.length" class="text-xs text-gray-400 italic">
            Content blocks will appear here as you add them.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>