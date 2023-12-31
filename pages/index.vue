<script setup lang="ts">
import { createQuestion, doesQuestionExists } from '~/services/questions'
import { useUIStore } from '~/stores/ui'

definePageMeta({
  middleware: 'auth',
  title: '- Zapytaj AI'
})

const client = useSupabaseClient()
const user = useSupabaseUser()
const uiStore = useUIStore()
const config = useRuntimeConfig()

const question = ref<string>('')
const response = ref<string>('')
const loading = ref<boolean>(false)

const getResponse = async () => {
  if (!user.value) {
    return uiStore.showSnackbar('Użytkownik musi być zalogowany', 'warning')
  }
  loading.value = true

  try {
    if (await doesQuestionExists(question.value, client)) {
      uiStore.showSnackbar('To pytanie było już zadane. Sprawdź w bazie pytań. Przekierowuję...', 'info', 6000)

      loading.value = false
      return navigateTo('/question-base')
    }
  } catch (e) {
    console.error(e)
  }

  try {
    const apiResponse = await $fetch<{ 'out-0': string }>(
      'https://www.stack-inference.com/run_deployed_flow?flow_id=64b6732ee6e6573c75ca8ea2&org=69dcea64-60e9-43ef-b092-fd783ab1d925',
      {
        headers: {
          Authorization: config.public.STACK_AI_TOKEN as string,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          'in-0': question.value,
        }),
      }
    )

    if (apiResponse?.['out-0'].length) response.value = apiResponse['out-0']
  } catch (e) {
    uiStore.showSnackbar('Wystąpił problem z serwisem AI. Sprawdź konsolę, aby zobaczyć więcej szczegółów')
  } finally {
    loading.value = false
  }

  if (response.value.length) {
    await createQuestion(question.value, response.value, user.value?.id, client)
  }
}
</script>

<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" md="8">
        <v-card>
          <v-text-field
            type="text"
            :autocomplete="false"
            v-model="question"
            placeholder="Twoje pytanie"
          />

          <v-card-actions>
            <v-btn
              @click="getResponse"
              color="primary"
              :disabled="loading || question.length < 5"
              :loading="loading"
              block
            >uzyskaj odpowiedź</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="response.length || loading" class="justify-center">
      <v-col cols="12" md="8">
        <v-card :loading="loading">
          <v-card-text>
            <span v-if="loading && !response.length">Trwa generowanie odpowiedzi...</span>
            <span v-else>{{ response }}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
