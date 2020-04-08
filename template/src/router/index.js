import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: () => import("@/pages/index.vue"),
      redirect: "/testlist",
      children: [
        {
          path: "testlist",
          component: () => import("@/components/TestList/list/index.vue")
        },
        {
          path: "createTest",
          redirect: "/createTest/add",
          component: () => import("@/components/TestList/createTest/index.vue"),
          children: [
            {
              path: "add",
              component: () => import("@/components/TestList/createTest/addCard.vue")
            },
            {
              path: "edit",
              component: () => import("@/components/TestList/createTest/edit.vue")
            }
          ]
        },
        {
          path: "rollCall",
          component: () => import("@/components/TestList/rollCall/grade.vue")
        },
        {
          path: "rollstudent",
          component: () => import("@/components/TestList/rollCall/student.vue")
        }
      ]
    },
    {
      path: "/correct",
      name: "correct",
      component: () => import("@/pages/correct.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  next();
});
export default router;
