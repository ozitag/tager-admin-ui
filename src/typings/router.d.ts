import { Route } from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $previousRoute: Route | null;
  }
  interface VueConstructor {
    $previousRoute: Route | null;
  }
}
