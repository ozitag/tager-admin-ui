<template>
  <div class="nav-container">
    <div v-for="(navItem, index) of navItems" :key="index" class="nav-card" :style="`width: ${navItem.width ? navItem.width : 33.3333333}%`">
      <component
          :is="navItem.url ? 'router-link' : 'div'"
          :to="navItem.url || undefined"
          :class="['inner', { link: navItem.url }]"
      >
        <div :class="['top', { 'full-height': hasNameOnly(navItem) }]">
          <span class="name">{{ navItem.name }}</span>
        </div>
        <div v-if="!hasNameOnly(navItem)" class="content">
          <div v-if="Boolean(navItem.total)" class="total-block">
            <spinner
                v-if="navItem.total.status === 'LOADING'"
                :size="40"
                :stroke-width="3"
                class="spinner"
            />
            <component
                :is="navItem.total.url ? 'router-link' : 'span'"
                v-else
                class="total-value"
                :to="navItem.total.url || undefined"
            >
              {{ formatNumber(navItem.total.value) }}
            </component>
          </div>

          <ul
              v-if="navItem.linkList && navItem.linkList.length > 0"
              :class="['link-list', { center: navItem.linkList.length === 1 }]"
          >
            <li v-for="(link, linkIndex) of navItem.linkList" :key="linkIndex">
              <router-link :to="link.url">
                {{ link.text }}
              </router-link>
            </li>
          </ul>
        </div>
      </component>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@vue/composition-api';
import Spinner from '../Spinner';
import {NavigationGridItem} from '../../typings/common';

interface Props {
  navItems: Array<NavigationGridItem>;
}

export default defineComponent<Props>({
  name: 'NavigationGrid',
  components: {Spinner},
  props: {
    navItems: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    function hasNameOnly(navItem: NavigationGridItem): boolean {
      const hasLinkList =
          Array.isArray(navItem.linkList) && navItem.linkList.length > 0;

      return Boolean(navItem.name) && !navItem.total && !hasLinkList;
    }

    function formatNumber(number: number) {
      const parts = String(number).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      return parts.join('.');
    }

    return {
      hasNameOnly,
      formatNumber,
    };
  },
});
</script>

<style scoped lang="scss">
.nav-container {
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
}

.nav-card {
  padding: 0.5rem;
  min-height: 150px;
}

.inner {
  display: block;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2),
  0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
  background-color 100ms linear;
  background-color: #fff;
  border-radius: 4px;
  height: 100%;

  &.link {
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);

      .top {
        border-color: #ccc;
      }
    }
  }
}

.content {
  padding: 1rem;
}

.top {
  position: relative;
  display: block;
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding: 0.5rem;
  transition: border-color 100ms linear;

  &.full-height {
    border: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.name {
}

.total-block {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;

  a {
    &:hover {
      opacity: 0.75;
    }
  }
}

.total-value {
  font-size: 2.3rem;
  font-weight: 500;
}

.link-list {
  margin-top: 0.5rem;

  &.center {
    text-align: center;
  }

  a {
    color: #007bff;

    &:hover {
      color: #0056b3;
      text-decoration: underline;
    }
  }
}
</style>
