<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
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
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
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

        <!--        <my-page-wrapper-->
        <!--            v-model="page"-->
        <!--            :total-page="totalPage"-->
        <!--            @changePage="changePage"-->
        <!--        />-->
    </div>
</template>

<script>
import PostForm                                         from "@/components/PostForm";
import PostList                                         from "@/components/PostList";
import axios                                            from 'axios';
import MyButton                                         from "@/components/UI/MyButton";
import MySelect                                         from "@/components/UI/MySelect";
import MyPageWrapper                                    from "@/components/UI/MyPageWrapper";
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    components: {
        MyPageWrapper,
        MySelect,
        MyButton,
        PostList, PostForm
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage        : 'post/setPage',
            setTotalPage   : 'post/setTotalPage',
            setSearchQuery : 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions({
            fetchPosts   : 'post/fetchPosts',
            loadMorePosts: 'post/loadMorePosts',
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts.forEach((p, index) => p.id === post.id && this.posts.splice(index, 1));
        },

        showDialog() {
            this.dialogVisible = true;
        },

    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapState({
            posts         : state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort  : state => state.post.selectedSort,
            searchQuery   : state => state.post.searchQuery,
            page          : state => state.post.page,
            limit         : state => state.post.limit,
            totalPage     : state => state.post.totalPage,
            sortOptions   : state => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts         : 'post/sortedPosts',
            sortedAndSearchPosts: 'post/sortedAndSearchPosts',
        })
    },
    watch   : {}
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

