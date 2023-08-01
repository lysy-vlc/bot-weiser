<template>
  <v-layout>
    <v-app-bar :elevation="2">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>BotWiser {{ route.meta.title }}</v-toolbar-title>

      <client-only>
        <v-btn
          v-if="user"
          rounded="xl"
          variant="text"
          icon="mdi-logout"
          @click="logout"
        ></v-btn>
      </client-only>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      position="left"
      :permanent="!smAndDown"
    >
      <client-only>
        <v-list nav>
          <template v-for="navItem in navItems" :key="navItem.name">
            <v-list-item
              :active="route.name === navItem.routeName"
              :disabled="route.name === navItem.routeName"
              :title="navItem.name"
              :value="navItem.name"
              @click="navigateTo(navItem.path)"
            />
          </template>
        </v-list>
      </client-only>
    </v-navigation-drawer>

    <v-main>
      <v-container class="fill-height main-container">
        <v-row justify="center">
          <slot />
        </v-row>
      </v-container>
      <v-snackbar
        v-model="uiStore.snackbar"
        class="mb-10"
        :color="uiStore.snackbarColor"
        :timeout="uiStore.snackbarTime"
      >
        {{ uiStore.snackbarText }}
      </v-snackbar>
    </v-main>

    <v-dialog v-model="uiStore.overlay">
      <component :is="dialogComponent" />
    </v-dialog>
  </v-layout>
</template>

<script setup>
import { useDisplay } from 'vuetify'
import Login from '~/components/organisms/LoginForm.vue'
import { useUIStore } from '~/stores/ui'

const { smAndDown } = useDisplay()

const uiStore = useUIStore()

const drawer = ref(false)

const user = useSupabaseUser()

const client = useSupabaseClient()

const route = await useRoute()

const router = useRouter()

const dynamicComponents = {
  'login-form': Login,
}

const dialogComponent = computed(() =>
  defineComponent(dynamicComponents[uiStore.overlayContent])
)

const navItems = computed(() =>
  user.value
    ? [
        {
          name: 'Zapytaj AI',
          path: '/',
          routeName: 'index'
        },
        {
          name: 'Baza pytań',
          path: '/question-base',
          routeName: 'question-base'
        },
      ]
    : [
        {
          name: 'Login',
          path: '/auth/login',
          routeName: 'auth-login'
        },
        {
          name: 'Create account',
          path: '/auth/create-account',
          routeName: 'auth-create-account'
        },
      ]
)

const logout = async () => {
  const client = useSupabaseAuthClient()

  navigateTo('/auth')

  await client.auth.signOut()
}

onMounted(async () => {
  await router.isReady()
  client.auth.onAuthStateChange((_event, session) => {
    if (
      session?.user?.aud !== 'authenticated' &&
      route.name !== 'auth-create-account' &&
      route.name !== 'auth-login' &&
      route.name !== 'auth' &&
      route.name !== 'account'
    ) {
      uiStore.showOverlay('login-form')
    }
  })
})
</script>

<style scoped lang="scss">
.main-container {
  min-height: calc(100vh - 64px);
}
</style>
