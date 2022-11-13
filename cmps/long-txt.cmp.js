export default {
    name: 'long-txt',
    props: ['txt'],
    template: `
    <section class="long-txt">
        <div v-if="!isLongTxt"> <span>{{shortTxt}}</span> <span class="toggle-txt" @click="isLongTxt = !isLongTxt">read more</span></div>
        <div v-if="isLongTxt"> <span>{{txt}}</span> <span class="toggle-txt" @click="isLongTxt = !isLongTxt">read less</span></div>
    </section>
        `,
    components: {},
    created() { },
    data() {
        return {
            isLongTxt: false,
        }
    },
    methods: {

    },
    computed: {
        shortTxt() {
            return this.txt.slice(0, 40) + '...'
        }
    },
}
