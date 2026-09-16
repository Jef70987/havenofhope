export const useToast = () => {
  const message = useState<string>('toast-message', () => '')
  const visible = useState<boolean>('toast-visible', () => false)
  let timer: ReturnType<typeof setTimeout> | null = null

  const show = (msg: string, duration = 2500) => {
    message.value = msg
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, duration)
  }

  return { message, visible, show }
}
