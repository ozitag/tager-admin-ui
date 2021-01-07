<script lang="js">
import Vue from 'vue';
import { isAbsoluteUrl } from '@tager/admin-services';
function getComponentTag(type) {
  switch (type) {
    case 'divider': return 'hr';
    case 'link': return 'a';
    case 'button': return 'button';
    default: return 'button';
  }
}
export default Vue.extend({
  name: 'DropdownItem',
  functional: true,
  props: {
    item: {
      type: Object,
      required: true,
    }
  },
  render(createElement, context) {
    const { type, text, url, onClick } = context.props.item;
    const componentType = getComponentTag(type);
    return createElement(componentType, {
      attrs: {
        href: url
      },
      on: {
        ...context.listeners,
        click: (event) => {
          /** Handle custom onClick */
          if (onClick) {
            onClick(event);
          }
          if (url && !isAbsoluteUrl(url)) {
            event.preventDefault();
            if (context.parent.$router) {
              context.parent.$router.push(url);
            } else {
              console.error(`Vue router is [${String(context.parent.$router)}]. Cannot make page transition`)
            }
          }
          /** Handle parent's onClick */
          if (context.listeners.click) {
            if (Array.isArray(context.listeners.click)) {
              context.data.on.click.forEach(listener => {
                listener(event);
              })
            } else {
              context.listeners.click(event);
            }
          }
        }
      },
      style: context.data.style,
      class: type === 'divider' ? 'dropdown-divider' : 'dropdown-item'
    }, text)
  },
});
</script>

<style scoped lang="scss">
.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  transition: none;
  &:focus,
  &:hover {
    color: #16181b;
    background-color: #f8f9fa;
  }
}
.dropdown-divider {
  color: inherit;
  background-color: currentColor;
  border: 0;
  opacity: 0.25;
  margin: 0.5rem 0;
  overflow: hidden;
  border-top: 1px solid #e9ecef;
  height: 1px;
}
</style>
