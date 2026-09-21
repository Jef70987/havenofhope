export const clearPublicCache = async () => {
  const storage = useStorage('cache')
  const keys = await storage.getKeys('nitro:handlers:')

  const toDelete = keys.filter((k) =>
    k.includes('posts:') ||
    k.includes('post:') ||
    k.includes('comments:') ||
    k.includes('ratings:')
  )

  await Promise.all(toDelete.map((k) => storage.removeItem(k)))
}
