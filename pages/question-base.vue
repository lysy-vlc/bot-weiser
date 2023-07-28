<template>
  <v-container>
    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="{ question, answer, id, views } in allQuestions.questions"
            :title="question"
            :text="answer"
            @group:selected="handleQuestionSelect($event.value, id, views)"
          >
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { fetchAllQuestions, registerView } from '~/services/questions'

definePageMeta({
  middleware: 'auth',
  title: '- Baza pytań'
})

const client = useSupabaseClient()

const user = useSupabaseUser()

const { data: allQuestions, error: allUserQuestionsError } = await useAsyncData('allQuestions', () => fetchAllQuestions(user.value?.id as string, client))

const handleQuestionSelect = async (questionExpanded: boolean, questionId: number, views: number) => {
  if (!questionExpanded) return

  try {
    const { data } = await registerView(questionId, views, client)

    if (data?.[0]?.views && allQuestions.value?.questions) {
      allQuestions.value.questions = allQuestions.value.questions.map(question => question.id === questionId ? { ...question, views: data?.[0]?.views } : question)
    }
  } catch (e) {
    console.error(e)
  }
}
</script>
