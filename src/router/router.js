import Main                             from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import PostsPage                        from "@/pages/PostsPage";
import PostIdPage                       from "@/pages/PostIdPage";
import PostPageWithStore                from "@/pages/PostPageWithStore";
import PostPageComposition              from "@/pages/PostPageComposition";

const routes = [
    {
        path     : '/',
        component: Main
    }, {
        path     : '/posts',
        component: PostsPage
    }, {
        path     : '/posts/:id',
        component: PostIdPage
    }, {
        path     : '/store',
        component: PostPageWithStore
    }, {
        path     : '/composition',
        component: PostPageComposition
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router;