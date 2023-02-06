import axios from "axios";

export const postModule = {
    namespaced: true,
    state     : () => ({
        posts         : [],
        deletedPost   : {},
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
    }),
    getters   : {
        sortedPosts(state) {
            if (state.selectedSort !== 'id') {
                return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
            } else {
                return [...state.posts].sort((post1, post2) => post1[state.selectedSort] - post2[state.selectedSort])
            }
        },
        sortedAndSearchPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }

    },
    mutations : {
        setPosts(state, posts) {
            state.posts = posts;
        },
        setLoading(state, bool) {
            state.isPostsLoading = bool;
        },
        setPage(state, page) {
            state.page = page;
        },
        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort;
        },
        setTotalPage(state, totalPage) {
            state.totalPages = totalPage;
        },
        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        setDeletedPost(state, deletedPost) {
            state.deletedPost = deletedPost;
        }
    },
    actions   : {
        removePost({state}) {
            if (Object.keys(state.deletedPost).length > 0) {
                return state.posts = state.posts.filter(p => p.id !== state.deletedPost.id);
            }
        },
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page : state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', response.data);
            } catch (e) {
                alert('Ошибка');
            } finally {
                commit('setLoading', false);
            }
        },
        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page : state.page,
                        _limit: state.limit,
                    }
                });
                commit('setTotalPage', Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts', [...state.posts, ...response.data]);
            } catch (e) {
                alert('Ошибка');
            }
        },
    }
}