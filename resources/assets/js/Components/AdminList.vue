<template>
    <div>
        <v-list three-line class="secondary pb-0">
            <v-list-tile ripple>
                <v-list-tile-content>
                    <v-text-field
                            prepend-icon="search"
                            clearable
                            dark
                            v-model.lazy="keyword"
                            color="white"
                            name="keyword"
                            label="Search cards"
                            :hide-details="true"
                    ></v-text-field>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <v-card class="secondary" flat tile>
            <v-card-actions class="pt-0 pl-5">
                <v-btn depressed color="success" @click="showCreateForm('card')">
                    <v-icon left dark>add</v-icon> Card
                </v-btn>
                <v-btn depressed color="info" @click="showCreateForm('category')">
                    <v-icon left dark>add</v-icon> Category
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-progress-linear
                v-show="loading"
                color="accent"
                :indeterminate="true">
        </v-progress-linear>

        <v-list v-show="!loading" subheader>
            <v-subheader class="info white--text">Categories</v-subheader>

            <template v-for="(category, index) in categories">
                <v-list-tile
                        @click="editByCategory(category)"
                        :key="'category'+index"
                        avatar
                        ripple>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ category.title }}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="category.description">{{ category.description }}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < categories.length" :key="index"></v-divider>
            </template>
        </v-list>

        <v-list v-show="!loading" subheader>
            <v-subheader class="success white--text">Cards</v-subheader>

            <template v-for="(card, index) in cards">
                <v-list-tile
                        @click="editByCard(card)"
                        :key="'card'+index"
                        avatar
                        ripple>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ card.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < cards.length" :key="index"></v-divider>
            </template>
        </v-list>
    </div>
</template>

<script>
    import Category from '../Model/Category'
    import Event from '../event-bus'
    import Card from '../Model/Card'

    export default {
        data() {
            return {
                categories: [],
                cards: [],
                loading: false,
                initial: true,
                limit: 20,
                category: 0,
                keyword: '',
            }
        },
        mounted() {
           this.loadData();
        },

        watch: {
            keyword() {
                _.debounce(() => this.loadData(), 300)();
            }
        },

        methods: {
            showCreateForm(type) {
                let payload = {
                    categories: this.categories,
                };
                payload[type] = {};
                Event.$emit('edit-by-' + type, payload);
            },
            editByCategory(category) {
                Event.$emit('edit-by-category', {
                    category:category,
                    categories: this.categories,
                });
            },
            editByCard(card) {
                Event.$emit('edit-by-card', {
                    card:card,
                    categories: this.categories,
                });
            },
            loadData() {
                if (this.loading) {
                    return;
                }
                this.loading = true;
                Category
                    .limit(this.limit)
                    .where('search', this.keyword)
                    .get()
                    .then(response => {
                        if (response !== undefined) {
                            this.categories = [
                                ...response,
                            ];
                            this.loading = false;
                            this.initial = false;
                        }
                    });
                Card
                    .limit(this.limit)
                    .where('search', this.keyword)
                    .get()
                    .then(response => {
                        if (response.data !== undefined) {
                            this.cards = [
                                ...response.data,
                            ];
                            this.loading = false;
                            this.initial = false;
                        }
                    });
            }
        }
    }
</script>
