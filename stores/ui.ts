import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
  const overlay = ref(false)
  const overlayContent = ref('')

  const snackbar = ref(false)
  const snackbarText = ref('')
  const snackbarColor = ref('info')
  const snackbarTime = ref()

  const showOverlay = (componentName: string) => {
    overlayContent.value = componentName
    overlay.value = true
  }

  const hideOverlay = () => {
    overlay.value = false
    overlayContent.value = ''
  }

  const showSnackbar = (text = '', color = 'info', time = 4000) => {
    snackbarText.value = text
    snackbar.value = true
    snackbarColor.value = color
    snackbarTime.value = time
  }

  return {
    overlay,
    overlayContent,
    showOverlay,
    hideOverlay,
    snackbar,
    snackbarText,
    showSnackbar,
    snackbarColor,
    snackbarTime,
  }
})
