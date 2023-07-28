<template>
  <v-col cols="12" lg="6">
    <v-card>
      <v-card-text>
        <v-btn rounded="xl" block class="mt-4" @click="navigateTo('auth/login')">Login</v-btn>
        <v-btn rounded="xl" block color="primary" class="mt-4" @click="navigateTo('auth/create-account')">Create account</v-btn>
      </v-card-text>
    </v-card>
  </v-col>
</template>
