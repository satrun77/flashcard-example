<template>
    <div>
        <v-list three-line class="secondary">
            <v-list-tile :ripple="{ class: 'error--text' }">
                <v-list-tile-content>
                    <v-text-field
                            prepend-icon="search"
                            clearable
                            dark
                            color="white"
                            name="keyword"
                            label="Search cards"
                            @keyup.enter.native="filterByKeyword($event.target.value)"
                    ></v-text-field>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>

        <v-progress-linear
                v-show="loading"
                color="accent"
                :indeterminate="true">
        </v-progress-linear>

        <v-list v-show="!loading" subheader two-line>
            <v-subheader>Categories</v-subheader>

            <template v-for="(category, index) in categories">
                <v-list-tile
                        @click="filterByCategory(category)"
                        :key="'c'+index"
                        v-if="category.cards_count > 0"
                        avatar
                        ripple>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ category.title }}</v-list-tile-title>
                        <v-list-tile-sub-title v-if="category.description">{{ category.description }}
                        </v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-avatar size="30" :color="category.color">
                            <span class="white--text subheading">{{ category.cards_count }}</span>
                        </v-avatar>
                    </v-list-tile-action>
                </v-list-tile>
                <v-divider
                        v-if="category.cards_count > 0 && index + 1 < categories.length"
                        :key="index">
                </v-divider>
            </template>
        </v-list>
    </div>
</template>

<script>
    import Category from '../Model/Category'
    import Event from '../event-bus'

    export default {
        data() {
            return {
                categories: [],
                loading: true,
            }
        },
        async mounted() {
            this.categories = await Category
                .select({
                    card_category: ['id', 'title', 'description', 'color']
                })
                .get()

            this.loading = false;
        },
        methods: {
            filterByCategory(category) {
                Event.$emit('filter-cards-by-category', category.id);
            },
            filterByKeyword(value) {
                Event.$emit('filter-cards-by-keyword', value);
            }
        }
    }
</script>
