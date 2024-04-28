<template>
	<router-link to="/" class="block__item">Все задачи</router-link>
    <app-loader v-if="isLoader"></app-loader>
	 <div class="card" v-else-if="!tasks.length">
		У вас нет завершенных задач
	</div>
    <div v-else v-for="task in tasks" :key="task.id" class="block__card card blur">
      <h4 class="card__title">{{ task.title }}</h4>

      <div class="card__deadline">
        Дэдлайн:
        {{ new Date(task.deadline).toLocaleDateString() }}
      </div>

      <app-status :type="task.statusTask"></app-status>

      <div class="card__description">Описание: {{ task.description }}</div>

      <div class="card__priority">
        Приоритетность:
        {{ task.importance === "current" ? "Текущая" : "Приоритетная" }}
      </div>

      <div class="card__date">
        Дата постановки задачи: {{ new Date(task.date).toLocaleDateString() }}
      </div>

      <div class="card__btns">
        <button class="btn primary" @click="resumeTask(task.id)">
          Возобновить задачу
        </button>
      </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import AppLoader from "@/components/ui/AppLoader.vue";
import AppStatus from "@/components/ui/AppStatus.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoader = ref(true);

    onMounted(async () => {
      isLoader.value = true;
      await store.dispatch("completed/setCompletedTasks");
      isLoader.value = false;
    });

    const tasks = computed(() => store.getters["completed/tasksCompleted"]);

    async function resumeTask(id) {
      const myTask = tasks.value.find((t) => t.id === id);
      myTask.statusTask = "awaits";
      await store.dispatch("request/createTask", myTask);
      await store.dispatch("completed/deleteTask", id);
      router.push("/");
    }

    return {
      isLoader,
      tasks,
      resumeTask,
    };
  },
  components: {
    AppLoader,
    AppStatus,
  },
};
</script>

<style></style>
