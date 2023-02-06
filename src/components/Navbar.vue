<template>
    <div class="navbar">
        <div class="homePage" @click="$router.push('/')">Vue 3</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button class='margin__btn' @click="$router.push('/store')">Posts with Store (Vuex)</my-button>
            <my-button class='margin__btn' @click="$router.push('/composition')">Posts with API Composition</my-button>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: lightgray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}

.navbar__btns {
    margin-left: auto;
}

.homePage {
    cursor: pointer;
}

.margin__btn {
    margin-left: 20px;
}
</style>