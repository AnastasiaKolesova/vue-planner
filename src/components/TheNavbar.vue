<template>
	<teleport to="body"
    ><new-task :isModal="isModal" @close="isModal = false"></new-task
  ></teleport>
  <header class="header">
    <div class="header__top">
      <div class="header__container _container">
        <div class="header__body">
          <router-link to="/"
            ><img src="@/assets/MyPlan (Stroke).svg" alt="myPlan"
          /></router-link>

          <nav class="header__menu menu">
            <ul class="menu__list">
              <li class="menu__item">
                <router-link class="menu__link" to="/completed"
                  >Завершенные задачи</router-link
                >
              </li>
              <li class="menu__item">
                <a href="#" @click.prevent="logout"
                  ><img src="@/assets/Union.svg" alt="выход" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="header__bottom">
      <div class="header__btn _container">
        <button class="block__btn" @click.prevent="modalShow">
          <img src="@/assets/add.svg" alt="добавить" /><span>добавить задачу</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import NewTask from "../views/NewTask.vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
	 const isModal = ref(false);

	 function modalShow() {
      isModal.value = true;
    }

    return {
      logout: () => {
        store.commit("auth/logout");
        store.state["request/tasks"] = [];
        router.push("/auth");
      },
		isModal,
      modalShow,
    };
  },
  components: {
    NewTask,
  },
};
</script>

<style></style>
