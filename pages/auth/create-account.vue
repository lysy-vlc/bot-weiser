<template>
  <v-col cols="12" lg="6">
    <v-card>
      <v-card-title>Create account</v-card-title>
      <v-card-text>
        <v-alert
          v-if="errorMessage"
          class="mb-4"
          color="error"
          icon="$success"
          title="Login error"
          :text="errorMessage"
        ></v-alert>
        <v-text-field label="Email" v-model="email" type="email"></v-text-field>
        <v-text-field label="Password" v-model="password" type="password"></v-text-field>
        <v-btn
          rounded="xl"
          block
          @click="signup"
          :disabled="loading"
          :loading="loading"
        >Sing up</v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
import { useUIStore } from '~/stores/ui'

definePageMeta({
  title: '- Utwórz konto'
})

const client = useSupabaseAuthClient()

const email = ref('');
const password = ref('')

const errorMessage = ref('')

const loading = ref(false)

const { showSnackbar } = useUIStore()

const signup = async () => {
  errorMessage.value = ''
  loading.value = true

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  })

  loading.value = false

  if (data.user) {
    email.value = ''
    password.value = ''

    showSnackbar('Konto utworzone. Sprawdź email i potwierdź utworzenie konta', 'success', 6000)

    return navigateTo('/auth-login')
  }

  if (error?.status === 429) {
    showSnackbar(error.message + '. Try again later', 'warning')

    return
  }

  if (error) errorMessage.value = error?.message
}
</script>
