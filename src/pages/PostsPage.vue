<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>

        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"

            />
        </my-dialog>

        <post-list
            :posts="sortedAndSearchPosts"
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Идет загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>

        <!--                <my-page-wrapper-->
        <!--                v-model="page"-->
        <!--                :total-page="totalPage"-->
        <!--                @changePage="changePage"-->
        <!--                />-->

    </div>
</template>

<script>
import PostForm      from "@/components/PostForm";
import PostList      from "@/components/PostList";
import axios         from 'axios';
import MyButton      from "@/components/UI/MyButton";
import MySelect      from "@/components/UI/MySelect";
import MyPageWrapper from "@/components/UI/MyPageWrapper";

export default {
    components: {
        MyPageWrapper,
        MySelect,
        MyButton,
        PostList, PostForm
    },
    data() {
        return {
            posts         : [],
            dialogVisible : false,
            isPostsLoading: false,
            selectedSort  : '',
            searchQuery   : '',
            page          : 1,
            limit         : 10,
            totalPage     : 0,
            sortOptions   : [
                {value: 'id', name: 'По айдишнику'},
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержанию'},
            ]
        }
    },
    methods: {
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        // changePage(pageNumber) {
        //     this.page = pageNumber;
        // },
        showDialog() {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response      = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page : this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage      = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts          = response.data;
            } catch (e) {
                alert('Ошибка');
            } finally {
                this.isPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page++;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page : this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPage = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts     = [...this.posts, ...response.data];
            } catch (e) {
                alert('Ошибка');
            }
        },

    },
    mounted() {
        this.fetchPosts();

    },
    computed: {
        sortedPosts() {
            if (this.selectedSort !== 'id') {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
            } else {
                return [...this.posts].sort((post1, post2) => post1[this.selectedSort] - post2[this.selectedSort])
            }
        },
        sortedAndSearchPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        }
    },
    watch   : {
        // page() {
        //     this.fetchPosts();
        // }
    }
}
</script>

<style>


.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.observer {
    height: 30px;
}

</style>

