<template>
  <div class="container">
    <div v-for="(navItem, index) of navItems" :key="index" class="nav-card">
      <div class="inner">
        <span class="name">{{ navItem.name }}</span>

        <div v-if="Boolean(navItem.total)" class="total-block">
          <spinner
            v-if="navItem.total.status === 'IN_PROGRESS'"
            :size="50"
            :stroke-width="3"
            class="spinner"
          />
          <span v-else class="total-value">
            {{ navItem.total.value }}
          </span>
        </div>

        <ul v-if="navItem.linkList.length > 0" class="link-list">
          <li v-for="(link, linkIndex) of navItem.linkList" :key="linkIndex">
            <router-link :to="link.href">
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Vue from 'vue';
import Spinner from '../Spinner';

export default Vue.extend({
  name: 'NavigationGrid',
  components: { Spinner },
  props: {
    navItems: {
      type: Array,
      default: () => []
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
}

.nav-card {
  width: 33.33%;
  padding: 0.5rem;
}

.inner {
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
  border-radius: 4px;
  padding: 1rem;
  height: 100%;
}

.name {
  display: block;
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
}

.total-block {
  display: flex;
  justify-content: center;
}

.total-value {
  font-size: 2.3rem;
  font-weight: 500;
}

.link-list {
  a {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
