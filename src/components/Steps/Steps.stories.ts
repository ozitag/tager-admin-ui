import { defineComponent, ref } from '@vue/composition-api';
import Steps from './Steps.vue';
import BaseButton from '../BaseButton/index.vue';
import { StepType } from '../../typings/common';

export default { title: 'Steps' };

const STEPS: Array<StepType> = [
  {
    title: 'Login',
  },
  {
    title: 'Verification',
  },
  {
    title: 'Pay',
  },
  {
    title: 'Done',
  },
];

export const Default = () =>
  defineComponent({
    name: 'DefaultSteps',
    components: { Steps, BaseButton },
    setup() {
      const steps = ref<Array<StepType>>(STEPS);
      const current = ref<number>(0);

      function next() {
        current.value += 1;
      }

      function prev() {
        current.value -= 1;
      }

      function done() {
        alert('Processing complete!');
      }

      return {
        steps,
        current,

        next,
        prev,
        done,
      };
    },
    template: `
      <div>
        <Steps :steps="steps" :current="current" />
        
        <div style="background-color: #fafafa; border: 1px dashed #e9e9e9; border-radius: 2px; min-height: 200px; margin: 16px 0; display: flex; align-items: center; justify-content: center;">
          {{ steps[current].title }} content
        </div>
        
        <div class="steps-action">
          <BaseButton
            v-if="current < steps.length - 1"
            variant="primary"
            @click="next"
          >
            Next
          </BaseButton>
          
          <BaseButton
            v-if="current === steps.length - 1"
            variant="primary"
            @click="done"
          >
            Done
          </BaseButton>
          
          <BaseButton
            v-if="current > 0"
            variant="outline-secondary"
            @click="prev"
          >
            Previous
          </BaseButton>
        </div>
      </div>
    `,
  });
