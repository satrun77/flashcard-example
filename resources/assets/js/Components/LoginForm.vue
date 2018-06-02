<template>
    <form @submit.prevent="submit"
          @keydown="form.errors.clear($event.target.name);"
          :action="action"
          :method="method">
        <slot></slot>
        <v-card class="ma-5">
            <v-toolbar color="secondary" dark prominent>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text>
                <v-alert :value="message" type="error">
                    {{ message }}
                </v-alert>

                <v-text-field
                        v-model="form.email"
                        name="email"
                        label="Email"
                        required
                        :error-messages="form.errors.get('email')"
                        :error="form.errors.has('email')"
                ></v-text-field>
                <v-text-field
                        v-model="form.password"
                        label="Password"
                        required
                        append-icon="visibility_off"
                        type="password"
                        name="password"
                        :error-messages="form.errors.get('password')"
                        :error="form.errors.has('password')"
                ></v-text-field>
                <v-checkbox
                        v-model="form.remember"
                        label="Remember Me"
                        required
                ></v-checkbox>
            </v-card-text>

            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
                <v-btn
                        type="submit"
                        :loading="processing"
                        block
                        color="info"
                        :disabled="form.errors.any()"
                        @click="submit"
                >
                    Login
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
                form: new Form({
                    email: '',
                    password: '',
                    remember: false,
                }),
                message: '',
                processing: false,
            }
        },

        props: ['method', 'action'],

        methods: {
            submit() {
                this.processing = true;
                this.clearMessage();
                this.form[this.method](this.action)
                    .then(response => window.location = '/home')
                    .catch(response => this.displayErrorMessage('Failed to login'));
            },

            displayErrorMessage(message) {
                this.message = message;
                this.processing = false;
            },

            clearMessage() {
                this.message = '';
            },
        }
    };
</script>
