<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="7">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-alert
              v-if="errorMessage"
              class="mb-4"
              color="error"
              icon="$success"
              title="Login error"
              :text="errorMessage"
            ></v-alert>

            <v-text-field
              v-model="email"
              label="Email"
              type="email"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
            ></v-text-field>
            <v-btn rounded="xl" block @click="login">Login</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js'
import { Ref } from 'vue'
import { useUIStore } from '~/stores/ui'

const client: SupabaseClient = useSupabaseAuthClient()
const uiStore = useUIStore()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const errorMessage: Ref<string> = ref('')

const login = async () => {
  errorMessage.value = ''

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (data.user) {
      email.value = ''
      password.value = ''

      uiStore.hideOverlay()

      return await navigateTo('/question-base')
    }

    if (error) errorMessage.value = error.message
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped lang="scss"></style>
