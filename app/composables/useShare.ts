export const useShare = () => {
  const { show } = useToast()

  const share = async (title: string, path: string) => {
    const url = `${window.location.origin}${path}`
    const text = `${title}\n${url}`

    if (navigator.share) {
      try {
        await navigator.share({ title, text })
        return
      } catch {
        return
      }
    }

    try {
      await navigator.clipboard.writeText(text)
      show('Copied to clipboard')
    } catch {
      show('Could not copy link')
    }
  }

  return { share }
}