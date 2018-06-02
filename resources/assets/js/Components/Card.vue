<template>
    <v-card light>
        <v-toolbar :color="card.category.color" dark card prominent>
            <v-toolbar-title>{{ card.title }}</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-btn v-if="inGallery" icon :href="link">
                <v-icon>link</v-icon>
            </v-btn>

            <v-menu offset-y>
                <v-btn slot="activator" icon>
                    <v-icon>share</v-icon>
                </v-btn>

                <v-list class="pa-0">
                    <v-list-tile avatar
                                 :ripple="{ class: social.color + '--text' }"
                                 :color="social.color"
                                 v-for="(social, index) in socialNetworks"
                                 :key="index"
                                @click="">
                        <v-list-tile-avatar>
                            <span v-html="social.icon"
                                  class="mr-1 pa-1 social-icon"
                                  :style="{fill: social.iconColor}">
                            </span>
                        </v-list-tile-avatar>

                        <v-list-tile-title>
                            <social-sharing
                                    :url="link"
                                    :title="card.title"
                                    :hashtags="socialHashTags"
                                    inline-template>
                                <network :network="social.name">
                                    {{ social.label }}
                                </network>
                            </social-sharing>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>

        <v-card-text>
            <div class="text-xs-right ma-0 pb-3">
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    <v-icon left color="white">label</v-icon>
                    {{ card.category.title }}
                </v-chip>
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    <strong class="pr-1">{{ card.views }}</strong>
                    Views
                </v-chip>
                <v-chip class="ma-0" small disabled label :color="card.category.color" text-color="white">
                    {{ card.short_modified }}
                </v-chip>
            </div>

            <div v-html="card.content"></div>
        </v-card-text>

        <v-footer v-if="!inGallery" class="pa-3">
            <v-spacer></v-spacer>
            <div class="accent--text caption">
                Moo FlashCard (ver. 2.0.0) &copy; Copyright {{ new Date().getFullYear() }} -
                <a class="accent--text" href="http://my.geek.nz">
                    Mohamed Alsharaf
                </a>
            </div>
        </v-footer>
    </v-card>
</template>

<script>
    export default {
        data() {
            return {
                fab: false,
                socialNetworks: [
                    {
                        name: 'twitter',
                        label: 'Twitter',
                        color: 'cyan',
                        iconColor: '#1DA1F2',
                        icon: '<svg aria-labelledby="simpleicons-twitter-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-twitter-icon">Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>',
                    },
                    {
                        name: 'facebook',
                        label: 'Facebook',
                        color: 'light-blue',
                        iconColor: '#3B5998',
                        icon: '<svg aria-labelledby="simpleicons-facebook-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title id="simpleicons-facebook-icon">Facebook icon</title><path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0"/></svg>',
                    },
                ],
            }
        },
        computed: {
            link() {
                return window.location.origin + '/' + this.card.slug;
            },
            socialHashTags() {
                let tags = [
                    this.card.category.title,
                    'MooFlashCard',
                ];
                return tags.join(',');
            },
        },
        props: ['card', 'inGallery'],
    }
</script>
