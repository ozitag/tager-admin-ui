<template>
  <img v-if="status === 'SUCCESS'" loading="lazy" v-bind="$attrs" />

  <div v-else class="image-container" :style="loadingContainerStyle">
    <spinner-container v-if="status === 'LOADING'">
      <spinner size="40" />
    </spinner-container>

    <img
      :style="[{ opacity: 0 }]"
      loading="lazy"
      v-bind="$attrs"
      @load="setStatus('SUCCESS')"
      @error="setStatus('FAILURE')"
    />
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import { FETCH_STATUSES } from '@tager/admin-services';

import Spinner from '../Spinner';
import SpinnerContainer from '../SpinnerContainer';

export default Vue.extend({
  name: 'LoadableImage',
  components: { Spinner, SpinnerContainer },
  inheritAttrs: false,
  props: {
    loadingContainerStyle: {
      type: [Object, String, Array],
      default: null,
    }
  },
  data() {
    return {
      status: FETCH_STATUSES.LOADING,
    }
  },
  methods: {
    setStatus(status) {
      this.status = status;
    }
  }
});
</script>

<style scoped lang="scss">
.image-container {
  height: 100%;
  position: relative;

  img {
    display: block;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}
</style>
