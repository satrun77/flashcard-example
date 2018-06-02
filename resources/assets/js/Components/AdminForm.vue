<template>
    <div>
        <card-form
                :action="cardAction"
                v-show="card"
                :card="card"
                :categories="categories">
        </card-form>
        <category-form
                :action="categoryAction"
                v-show="category"
                :category="category"
                :categories="categories">
        </category-form>
    </div>
</template>

<script>
    import Event from '../event-bus'

    export default {
        data() {
            return {
                card: null,
                category: null,
                categories: [],
            }
        },

        props: ['category-action', 'card-action'],

        created() {
            Event.$on('edit-by-card', this.editCard);
            Event.$on('edit-by-category', this.editCategory);
        },

        methods: {
            editCard(payload) {
                this.card = payload.card;
                this.categories = payload.categories;
                this.category = null;
            },
            editCategory(payload) {
                this.card = null;
                this.categories = payload.categories;
                this.category = payload.category;
            },
        }
    };
</script>
