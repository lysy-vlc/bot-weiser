import { SupabaseClient } from '@supabase/supabase-js'

export const createQuestion = async (
  question: string,
  answer: string,
  userId: string,
  client: SupabaseClient
) => {
  const { data, error } = await client
    .from('questions')
    .insert({
      question,
      answer,
      views: 1,
      user_id: userId,
    })
    .select()

  return {
    data,
    error,
  }
}

export const fetchAllUserQuestions = async (
  userId: string,
  client: SupabaseClient
) => {
  const { data: questions, error } = await client
    .from('questions')
    .select('*')
    .eq('user_id', userId)
    .order('views', { ascending: false })

  return {
    questions,
    error,
  }
}

export const fetchAllQuestions = async (
  userId: string,
  client: SupabaseClient
) => {
  const { data: questions, error } = await client
    .from('questions')
    .select('*')
    .order('views', { ascending: false })

  return {
    questions,
    error,
  }
}

export const doesQuestionExists = async (
  question: string,
  client: SupabaseClient
) => {
  const { data: questions, error } = await client
    .from('questions')
    .select('question')
    .ilike('question', question)
    .limit(1)
    .single()

  return !!questions?.question
}

export const registerView = async (
  questionId: string | number,
  views: number,
  client: SupabaseClient
) => {
  const { data, error } = await client
    .from('questions')
    .update({
      views: views + 1,
    })
    .eq('id', questionId)
    .select()

  return {
    data,
    error,
  }
}
