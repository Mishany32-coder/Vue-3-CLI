<template>
    <div class="page__wrapper">
        <div
            v-for="pageNumber in totalPage"
            :key="pageNumber"
            class="page"
            :class="{
                    'current-page': modelValue === pageNumber
                }"
            @click="$emit('update:modelValue',pageNumber)"
        >
            {{ pageNumber }}
        </div>
    </div>
</template>

<script>
export default {
    name : 'my-page-wrapper',
    props: {
        modelValue: {
            type: Number,
        },
        totalPage : {
            type    : Number,
            required: true,
        }
    }
}
</script>

<style scoped>
.page__wrapper {
    display: flex;
    margin-top: 15px;

}

.page {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
}

.current-page {
    border: 3px solid teal;
}
</style>