export default {
    name: '',
    props: [],
    template: `
        <div class="navbar">
            <nav class="flex row gap align-center justify-center">
                <router-link to="/" @click="setActiveApp('Home')">
                    <img src="assets/img/header/home.svg" alt="" />
                </router-link>
                <router-link to="/books" >
                    <img src="assets/img/header/scholar.png" alt="" />
                </router-link>
                <router-link to="/email">
                    <img src="assets/img/header/gmail.png" alt="" />
                </router-link>
                <router-link to="/note">
                    <img src="assets/img/header/keep.png" alt="" />
                </router-link>
            </nav>
        </div>
        `,
    components: {},
    created() { },
    data() {
        return {
            // activeApp: 'Home'
        }
    },
    methods: {
        // setActiveApp(app) {
        //     if (!['Home', 'Books', 'Notes', 'Email'].includes(app)) return

        //     console.log(!['Home', 'Books', 'Notes', 'Email'].includes(app))
        //     console.log(app)
        //     this.activeApp = app
        //     this.$emit('setApp', this.activeApp)

        // }
    },
    computed: {},
}
