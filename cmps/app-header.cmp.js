import appNavbar from "./app-navbar.cmp.js"


export default {
    template: `
            <div class="logo flex row align-center justify-center" >
                <img v-if="appOpen.startsWith('/email')" src="assets/img/header/gmail.png" alt="" />
                <img v-if="appOpen.startsWith('/note')" src="assets/img/header/keep.png" alt="" />
                <img v-if="appOpen === '/'" src="assets/img/header/home.svg" alt="" />
                <img v-if="appOpen === '/books'" src="assets/img/header/scholar.png" alt="" />
                <h1><span>AppSus</span><span class="app-type">{{activeApp}}</span></h1>
            </div>
            <div @click="isNavShown = !isNavShown"><h1 class="fa navbar-icon"></h1></div>

            <app-navbar v-if="isNavShown === true"  @click="isNavShown = !isNavShown"/>
     `,
    data() {
        return {
            isNavShown: false,
            activeApp: 'Home',
        }
    },

    created() {

    },

    methods: {
        setActiveApp(app) {
            this.activeApp = app
        }
    },

    computed: {
        appOpen() {
            return this.$route.path
        },
    },

    watch: {
        appOpen() {
            const url = this.$route.path

            if (url.startsWith('/email')) this.activeApp = 'Mail'
            else if (url.startsWith('/note')) this.activeApp = 'Note'
            else if (url.startsWith('/books')) this.activeApp = 'Books'
            else this.activeApp = 'Home'
        }
    },
    components: {
        appNavbar,
    }
}
