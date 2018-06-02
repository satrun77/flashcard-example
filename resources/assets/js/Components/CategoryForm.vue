<template>
    <form @submit.prevent="submit"
          @keydown="form.errors.clear($event.target.name);"
          :action="action"
          method="post">
        <slot></slot>
        <v-card class="ma-5">
            <v-toolbar color="secondary" dark prominent>
                <v-toolbar-title>Category details</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-alert class="ma-0" :value="message" :type="messageType || 'info'">
                {{ message }}
            </v-alert>
            <v-progress-linear
                    class="ma-0"
                    v-show="processing"
                    color="accent"
                    :indeterminate="true">
            </v-progress-linear>

            <v-card-text>
                <v-text-field
                        clearable
                        :auto-grow="true"
                        color="accent"
                        :class="{'input-group--focused': form.title}"
                        v-model="form.title"
                        name="title"
                        label="Title"
                        required
                        :error-messages="form.errors.get('title')"
                        :error="form.errors.has('title')"
                ></v-text-field>
                <v-switch :label="`Active: ${form.active? 'Yes' : 'No'}`" v-model="form.active"></v-switch>
                <v-select
                        clearable
                        color="accent"
                        :auto-grow="true"
                        :class="{'input-group--focused': form.parent}"
                        autocomplete
                        :items="categories"
                        item-text="title"
                        item-value="id"
                        v-model="form.parent"
                        label="Parent category"
                        single-line
                        :error-messages="form.errors.get('parent')"
                        :error="form.errors.has('parent')"
                ></v-select>
                <v-text-field
                        clearable
                        color="accent"
                        :auto-grow="true"
                        :class="{'input-group--focused': form.description}"
                        v-model="form.description"
                        multi-line
                        label="Description"
                        name="description"
                        :error-messages="form.errors.get('description')"
                        :error="form.errors.has('description')"
                ></v-text-field>

                <v-radio-group color="accent" label="Color" v-model="form.color" mandatory>
                    <v-container fluid>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md6>
                                <v-radio
                                        v-for="(color, index) in colors"
                                        v-if="index < colors.length/2"
                                        :class="`${color + '--text'}`"
                                        :key="color"
                                        :label="color"
                                        :color="color"
                                        :value="color"
                                ></v-radio>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-radio
                                        v-for="(color, index) in colors"
                                        v-if="index >= colors.length/2"
                                        :class="`${color + '--text'}`"
                                        :key="color"
                                        :label="color"
                                        :color="color"
                                        :value="color"
                                ></v-radio>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-radio-group>
            </v-card-text>

            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
                <v-btn
                        :loading="processing"
                        :disabled="processing"
                        type="submit"
                        block
                        color="info"
                >
                    Save details
                </v-btn>
            </v-card-actions>
        </v-card>
    </form>
</template>

<script>
    import Form from 'form-backend-validation';

    const COLORS = [
        'cyan',
        'light-blue',
        'red',
        'pink',
        'blue',
        'teal',
        'lime',
        'green',
        'yellow',
        'orange',
    ];

    export default {
        data() {
            return {
                colors: COLORS,
                message: '',
                messageType: 'info',
                processing: false,
                data: {
                    title: '',
                    description: '',
                    active: true,
                    color: 'light-blue',
                    parent: 0,
                }
            }
        },

        computed: {
            form() {
                if (this.category && this.category.title !== undefined) {
                    this.data = {
                        ...this.category,
                    }
                }
                return new Form(this.data);
            },
            selectCategories() {
                return this.categories.map(item => {
                    return {
                        id: item.id,
                        name: item.title,
                    }
                });
            },
        },

        props: {
            action: String,
            categories: Array,
            category: {
                type: Object,
                default() {
                    return {};
                },
            },
        },

        methods: {
            submit() {
                this.processing = true;
                this.clearMessage();
                this.form.post(this.action)
                    .then(response => this.displaySuccessMessage('Card details saved.'))
                    .catch(response => this.displayErrorMessage('Card details not saved.'));
            },

            displaySuccessMessage(message) {
                this.message = message;
                this.messageType = 'success';
                this.processing = false;
            },

            displayErrorMessage(message) {
                this.message = message;
                this.messageType = 'error';
                this.processing = false;
            },

            clearMessage() {
                this.message = '';
            },
        }
    };
</script>
