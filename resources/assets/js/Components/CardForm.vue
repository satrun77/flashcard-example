<template>
    <form @submit.prevent="submit"
          @keydown="form.errors.clear($event.target.name);"
          :action="action"
          method="post">
        <slot></slot>
        <v-card class="ma-5">
            <v-toolbar color="secondary" dark prominent>
                <v-toolbar-title>Card details</v-toolbar-title>
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
                        color="accent"
                        clearable
                        :auto-grow="true"
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
                        color="accent"
                        clearable
                        :auto-grow="true"
                        :class="{'input-group--focused': form.category_id}"
                        :items="categories"
                        v-model="form.category_id"
                        label="Category"
                        single-line
                        :error-messages="form.errors.get('category_id')"
                        :error="form.errors.has('category_id')"
                        autocomplete
                        item-text="title"
                        item-value="id"
                ></v-select>
                <v-text-field
                        color="accent"
                        clearable
                        :auto-grow="true"
                        :class="{'input-group--focused': form.content}"
                        rows="8"
                        v-model="form.content"
                        multi-line
                        label="Content"
                        required
                        name="content"
                        :error-messages="form.errors.get('content')"
                        :error="form.errors.has('content')"
                ></v-text-field>
                <v-text-field
                        color="accent"
                        clearable
                        :auto-grow="true"
                        :class="{'input-group--focused': form.meta_description}"
                        v-model="form.meta_description"
                        multi-line
                        label="Meta description"
                        required
                        name="meta_description"
                        :error-messages="form.errors.get('meta_description')"
                        :error="form.errors.has('meta_description')"
                ></v-text-field>
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

    export default {
        data() {
            return {
                messageType: 'info',
                message: '',
                processing: false,
                data: {
                    title: '',
                    content: '',
                    active: true,
                    meta_description: '',
                    category_id: 0,
                },
            }
        },

        computed: {
            form() {
                if (this.card && this.card.title !== undefined) {
                    this.data = {
                        ...this.card,
                    }
                }
                return new Form(this.data);
            }
        },

        props: {
            action: String,
            categories: Array,
            card: {
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
