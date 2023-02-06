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

    </div>
</template>

<script>
import PostForm                  from "@/components/PostForm";
import PostList                  from "@/components/PostList";
import axios                     from 'axios';
import MyButton                  from "@/components/UI/MyButton";
import MySelect                  from "@/components/UI/MySelect";
import MyPageWrapper             from "@/components/UI/MyPageWrapper";
import {ref}                     from 'vue';
import {usePosts}                from '@/hooks/usePosts';
import {useSortedPosts}          from '@/hooks/useSortedPosts';
import {useSortedAndSearchPosts} from '@/hooks/useSortedAndSearchPosts';

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
            sortOptions  : [
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
        showDialog() {
            this.dialogVisible = true;
        },
    },
    setup(props) {
        const {posts, totalPage, isPostsLoading}  = usePosts(10);
        const {sortedPosts, selectedSort}         = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchPosts} = useSortedAndSearchPosts(sortedPosts);

        return {
            posts,
            totalPage,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchPosts,
        }

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

