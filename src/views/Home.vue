<template>

  <app-loader v-if="isLoader"></app-loader>

  <div v-if="!tasks.length">
    <div class="card">
      У вас нет активных задач. Для начала работы добавьте новую
    </div>
  </div>

  <section v-else class="block__body">
    <div class="block__column">
      <h3 class="block__title">Приоритетные задачи</h3>
      <div class="card yellow" v-for="t in tasksPriority" :key="t.title">
        <h2 class="card__title">{{ t.title }}</h2>
        <app-deadline :deadline="t.deadline"></app-deadline>
        <div class="card__btns">
          <app-status :type="t.statusTask"></app-status>
          <button class="card__open" @click="openTask(t.id)">
            Открыть задачу
          </button>
        </div>
      </div>
    </div>
    <div class="block__column">
      <h3 class="block__title">Текущие задачи</h3>

      <div class="card orange" v-for="task in tasksCurrent" :key="task.title">
        <h2 class="card__title">{{ task.title }}</h2>
        <app-deadline :deadline="task.deadline"></app-deadline>
        <div class="card__btns">
          <app-status :type="task.statusTask"></app-status>
          <button class="card__open" @click="openTask(task.id)">
            Открыть задачу
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppDeadline from "../components/ui/AppDeadline.vue";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoader = ref(true);

    onMounted(async () => {
      isLoader.value = true;
      await store.dispatch("request/setTasks");
      isLoader.value = false;
    });

    const tasks = computed(() => store.getters["request/tasks"]);
    const tasksPriority = computed(() =>
      tasks.value.filter((t) => t.importance === "priority")
    );
    const tasksCurrent = computed(() =>
      tasks.value.filter((t) => t.importance === "current")
    );

    function openTask(id) {
      router.push("task/" + id);
    }

    return {
      tasks,
      close,
      tasksPriority,
      tasksCurrent,
      openTask,
    };
  },
  components: {
    AppDeadline,
    AppLoader,
    AppStatus,
  },
};
</script>

<style></style>
