<script setup lang="ts">
import { Icon } from '@iconify/vue'

const route = useRoute()
const slug = route.params.slug as string

const { share } = useShare()
const { show: showToast } = useToast()

interface Post {
  id: string
  title: string
  slug: string
  subtitle: string | null
  category: string
  category_path: string
  image: string | null
  author: string | null
  date: string | null
  read_time: string | null
  body: any[]
  views: number
  created_at: string
  published_at: string | null
}

interface Comment {
  id: string
  parent_id: string | null
  name: string
  text: string
  is_admin: boolean
  created_at: string
  replies: Comment[]
}

const loading = ref(true)
const post = ref<Post | null>(null)
const notFound = ref(false)

// Comments
const commentsLoading = ref(true)
const comments = ref<Comment[]>([])
const commentName = ref('')
const commentText = ref('')
const postingComment = ref(false)

const replyToId = ref<string | null>(null)
const replyName = ref('')
const replyText = ref('')
const postingReply = ref(false)

const dateOf = (p: Post) => {
  if (p.date) return p.date
  if (!p.published_at && !p.created_at) return ''
  return new Date(p.published_at || p.created_at).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

const formatTime = (s: string) =>
  new Date(s).toLocaleString('en-KE', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

const loadComments = async () => {
  commentsLoading.value = true
  try {
    const res = await $fetch<{ ok: boolean; comments: Comment[] }>(`/api/posts/${slug}/comments`)
    comments.value = res.comments || []
  } catch {
    comments.value = []
  } finally {
    commentsLoading.value = false
  }
}

onMounted(async () => {
  try {
    const res = await $fetch<{ ok: boolean; post: Post }>(`/api/posts/${slug}`)
    post.value = res.post
    await loadComments()
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
})

const submitComment = async () => {
  if (postingComment.value) return
  const name = commentName.value.trim()
  const text = commentText.value.trim()
  if (!name || !text) return showToast('Please fill in your name and comment.')

  postingComment.value = true
  try {
    await $fetch(`/api/posts/${slug}/comments`, {
      method: 'POST',
      body: { name, text },
    })
    commentName.value = ''
    commentText.value = ''
    await loadComments()
    showToast('Comment posted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not post comment.')
  } finally {
    postingComment.value = false
  }
}

const startReply = (id: string) => {
  replyToId.value = id
  replyName.value = ''
  replyText.value = ''
}
const cancelReply = () => {
  replyToId.value = null
  replyName.value = ''
  replyText.value = ''
}
const submitReply = async () => {
  if (!replyToId.value || postingReply.value) return
  const name = replyName.value.trim()
  const text = replyText.value.trim()
  if (!name || !text) return showToast('Please fill in your name and reply.')

  postingReply.value = true
  try {
    await $fetch(`/api/posts/${slug}/comments`, {
      method: 'POST',
      body: { name, text, parent_id: replyToId.value },
    })
    cancelReply()
    await loadComments()
    showToast('Reply posted')
  } catch (err: any) {
    showToast(err?.data?.statusMessage || 'Could not post reply.')
  } finally {
    postingReply.value = false
  }
}
</script>

<template>
  <div v-if="loading" class="text-center py-16">
    <p class="text-sm text-gray-500">Loading article…</p>
  </div>

  <div v-else-if="notFound || !post">
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="ml-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span class="mx-1">›</span>
      <span class="font-semibold text-gray-700">Article</span>
    </div>

    <div class="rounded-lg border border-[#e8e8e8] bg-white p-8 md:p-16 text-center">
      <span class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-3">
        Article
      </span>
      <h1 class="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">Not Found</h1>
      <p class="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto mb-2">
        This article is not available or has not been published.
      </p>
      <p class="text-xs text-gray-400 mb-6">
        Reference: <span class="font-mono">{{ slug }}</span>
      </p>
      <NuxtLink
        to="/"
        class="inline-block bg-[#cc0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors rounded"
      >
        Back to Home
      </NuxtLink>
    </div>
  </div>

  <article v-else>
    <div class="text-xs text-gray-500 mb-4">
      <span>You are here:</span>
      <NuxtLink to="/" class="mx-1 hover:text-[#cc0000]">Home</NuxtLink>
      <span>›</span>
      <NuxtLink :to="post.category_path" class="mx-1 hover:text-[#cc0000]">{{ post.category }}</NuxtLink>
      <span>›</span>
      <span class="font-semibold text-gray-700 ml-1">Article</span>
    </div>

    <NuxtLink
      :to="post.category_path"
      class="inline-block bg-[#cc0000] text-white text-[0.6rem] font-bold px-2 py-0.5 uppercase tracking-wider rounded mb-3"
    >
      {{ post.category }}
    </NuxtLink>

    <h1 class="text-2xl md:text-4xl font-bold text-[#1a1a1a] leading-tight mb-3">
      {{ post.title }}
    </h1>

    <div class="flex items-center gap-3 mb-3">
      <button
        class="flex items-center gap-2 text-xs font-bold text-[#cc0000] uppercase tracking-wider hover:underline"
        @click="share(post.title, `/article/${post.slug}`)"
      >
        <Icon icon="fa6-solid:share-nodes" />
        Share
      </button>
    </div>

    <p v-if="post.subtitle" class="text-sm md:text-base italic text-gray-600 mb-4">
      {{ post.subtitle }}
    </p>

    <div class="flex flex-wrap items-center gap-2 text-xs text-gray-500 border-b border-[#f0f0f0] pb-4 mb-6">
      <span>By {{ post.author }}</span>
      <span>·</span>
      <span>{{ dateOf(post) }}</span>
      <template v-if="post.read_time">
        <span>·</span>
        <span>{{ post.read_time }}</span>
      </template>
      <span>·</span>
      <NuxtLink to="/about" class="font-semibold text-[#cc0000] hover:underline">View Author</NuxtLink>
    </div>

    <img
      v-if="post.image"
      :src="post.image"
      :alt="post.title"
      class="w-full h-52 md:h-80 object-cover bg-[#f0f0f0] rounded-lg mb-6"
    />
    <div v-else class="w-full h-52 md:h-80 bg-[#f0f0f0] rounded-lg mb-6 flex items-center justify-center text-gray-400 text-sm font-semibold">
      IMAGE
    </div>

    <div class="max-w-3xl">
      <template v-for="(b, i) in post.body" :key="i">
        <h2 v-if="b.type === 'heading'" class="text-xl md:text-2xl font-bold text-[#1a1a1a] mt-8 mb-3">
          {{ b.text }}
        </h2>

        <div v-else-if="b.type === 'highlight'" class="bg-[#f8f8f8] border-l-4 border-[#cc0000] px-4 py-4 my-5">
          <p class="text-sm md:text-base font-bold text-[#1a1a1a] leading-relaxed">{{ b.text }}</p>
        </div>

        <ul v-else-if="b.type === 'list'" class="my-4 space-y-1 pl-4">
          <li
            v-for="(item, j) in b.items"
            :key="j"
            class="text-sm md:text-base leading-relaxed text-gray-700 flex items-start gap-2 before:content-['>'] before:text-[#cc0000] before:font-bold before:mt-0.5"
          >
            <span>{{ item }}</span>
          </li>
        </ul>

        <div v-else-if="b.type === 'link'" class="my-3">
          <a
            :href="b.url"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm md:text-base font-bold text-[#cc0000] hover:underline break-all"
          >
            <Icon icon="fa6-solid:link" class="text-xs" />
            {{ b.label || b.url }}
          </a>
        </div>

        <p v-else-if="b.type === 'signature'" class="text-sm md:text-base text-gray-700 mt-8">
          {{ b.text }}
        </p>
        <p v-else-if="b.type === 'signatureName'" class="text-base md:text-lg font-bold text-[#1a1a1a] mt-3">
          {{ b.text }}
        </p>
        <p v-else-if="b.type === 'signatureRole'" class="text-xs md:text-sm text-gray-500 mb-1">
          {{ b.text }}
        </p>
        <p v-else-if="b.type === 'signatureContact'" class="text-xs md:text-sm text-[#cc0000] font-semibold">
          {{ b.text }}
        </p>

        <p v-else class="text-sm md:text-base leading-relaxed text-gray-700 mb-4">
          {{ b.text }}
        </p>
      </template>
    </div>

    <div class="mt-10 p-5 md:p-6 rounded-lg bg-[#cc0000] text-white">
      <p class="text-sm md:text-base mb-3 italic">Yours in Education, Mentorship and Service,</p>
      <p class="text-lg md:text-xl font-bold mb-1">Mwalimu Malata O.J. Benson</p>
      <p class="text-xs md:text-sm text-white/90 mb-3">
        Teacher – Mentor – Publisher – Writer – Political Analyst – Educational Consultant – Motivational Speaker
      </p>
      <p class="text-xs md:text-sm font-semibold">0728701795 · bensonmalata65@gmail.com</p>
    </div>

    <!-- COMMENTS -->
    <div class="mt-10 p-5 md:p-6 rounded-lg border border-[#e8e8e8] bg-white">
      <h3 class="text-lg md:text-xl font-bold text-[#1a1a1a] mb-4 border-l-4 border-[#cc0000] pl-3">
        Comments ({{ comments.length }})
      </h3>

      <div v-if="commentsLoading" class="text-center py-4">
        <p class="text-xs text-gray-500">Loading comments…</p>
      </div>

      <div v-else-if="comments.length" class="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
        <div
          v-for="c in comments"
          :key="c.id"
          class="bg-[#f8f8f8] border-l-4 px-4 py-3 rounded"
          :class="c.is_admin ? 'border-[#cc0000]' : 'border-[#e8e8e8]'"
        >
          <div class="flex items-center justify-between mb-1 flex-wrap gap-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold text-[#1a1a1a]">{{ c.name }}</span>
              <span v-if="c.is_admin" class="text-[0.55rem] font-bold uppercase tracking-wider bg-[#cc0000] text-white px-1.5 py-0.5 rounded">
                Author
              </span>
            </div>
            <span class="text-[0.7rem] text-gray-500">{{ formatTime(c.created_at) }}</span>
          </div>
          <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ c.text }}</p>

          <button
            v-if="!c.is_admin"
            class="text-[0.7rem] font-bold text-[#cc0000] uppercase tracking-wider mt-2 hover:underline"
            @click="startReply(c.id)"
          >Reply</button>

          <div v-if="c.replies.length" class="mt-3 ml-4 space-y-3 border-l-2 border-[#e8e8e8] pl-3">
            <div
              v-for="r in c.replies"
              :key="r.id"
              class="bg-white px-3 py-2 rounded"
              :class="r.is_admin ? 'border-l-4 border-[#cc0000]' : ''"
            >
              <div class="flex items-center justify-between mb-1 flex-wrap gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold text-[#1a1a1a]">{{ r.name }}</span>
                  <span v-if="r.is_admin" class="text-[0.55rem] font-bold uppercase tracking-wider bg-[#cc0000] text-white px-1.5 py-0.5 rounded">
                    Author
                  </span>
                </div>
                <span class="text-[0.7rem] text-gray-500">{{ formatTime(r.created_at) }}</span>
              </div>
              <p class="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{{ r.text }}</p>
            </div>
          </div>

          <form
            v-if="replyToId === c.id"
            class="mt-3 ml-4 space-y-2 border-l-2 border-[#cc0000] pl-3"
            @submit.prevent="submitReply"
          >
            <input
              v-model="replyName"
              type="text"
              maxlength="80"
              class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm rounded"
              placeholder="Your name"
              :disabled="postingReply"
              required
            />
            <textarea
              v-model="replyText"
              rows="2"
              maxlength="2000"
              class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm rounded"
              placeholder="Write your reply..."
              :disabled="postingReply"
              required
            ></textarea>
            <div class="flex gap-2">
              <button
                type="submit"
                class="bg-[#cc0000] text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#990000] disabled:opacity-60"
                :disabled="postingReply"
              >{{ postingReply ? 'Posting…' : 'Post Reply' }}</button>
              <button
                type="button"
                class="bg-[#e8e8e8] text-[#1a1a1a] px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded hover:bg-[#d0d0d0]"
                :disabled="postingReply"
                @click="cancelReply"
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <p v-else class="text-sm text-gray-500 mb-6">
        No comments yet. Be the first to share your thoughts.
      </p>

      <form class="space-y-3" @submit.prevent="submitComment">
        <div>
          <label for="comment-name" class="block text-sm font-semibold text-[#1a1a1a] mb-1">Your Name</label>
          <input
            id="comment-name"
            v-model="commentName"
            type="text"
            maxlength="80"
            class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#cc0000] rounded"
            placeholder="Enter your name"
            :disabled="postingComment"
            required
          />
        </div>
        <div>
          <label for="comment-text" class="block text-sm font-semibold text-[#1a1a1a] mb-1">Your Comment</label>
          <textarea
            id="comment-text"
            v-model="commentText"
            rows="4"
            maxlength="2000"
            class="w-full px-3 py-2 border border-[#e8e8e8] bg-white text-sm text-[#1a1a1a] focus:outline-none focus:border-[#cc0000] rounded"
            placeholder="Share your thoughts on this article..."
            :disabled="postingComment"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-[#cc0000] text-white px-6 py-2 font-semibold text-sm uppercase tracking-wider hover:bg-[#990000] transition-colors rounded disabled:opacity-60"
          :disabled="postingComment"
        >{{ postingComment ? 'Posting…' : 'Post Comment' }}</button>
      </form>
    </div>

    <div class="mt-6 p-5 md:p-6 rounded-lg bg-[#f8f8f8] border-l-4 border-[#cc0000] text-center">
      <p class="text-sm text-gray-600 mb-4">
        Found this useful? Share it with a teacher, parent or KCSE candidate.
      </p>
      <NuxtLink
        :to="post.category_path"
        class="inline-block bg-[#cc0000] text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-[#990000] transition-colors rounded"
      >
        More from {{ post.category }}
      </NuxtLink>
    </div>
  </article>
</template>