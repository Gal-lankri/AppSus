export default {
    name: 'label-filter',
    props: [],
    emits: ['filterLabel'],
    template: `
        <section class="note-label-filter" :style="toggleLabelFilterMobileStyle">
            <ul >
                <li @click="toggleLabelFilter('critical')"  :class="{isLabelActive : activeLabels.critical}">
                    <span class="fa star-icon"></span>
                    Critical
                </li>
                <li @click="toggleLabelFilter('family')"  :class="{isLabelActive : activeLabels.family}">
                    <span class="fa house-icon"></span>
                    Family
                </li>
                <li @click="toggleLabelFilter('work')"  :class="{isLabelActive : activeLabels.work}">
                    <span class="fa work-icon"></span>
                    Work
                </li>
                <li @click="toggleLabelFilter('friends')"  :class="{isLabelActive : activeLabels.friends}">
                    <span class="fa friends-icon"></span>
                    Friends
                </li>
                <li @click="toggleLabelFilter('spam')"  :class="{isLabelActive : activeLabels.spam}">
                    <span class="fa backspace-icon"></span>
                    Spam
                </li>
                <li @click="toggleLabelFilter('memories')"  :class="{isLabelActive : activeLabels.memories}">
                    <span class="fa sdcard-icon"></span>
                    Memories
                </li>
                <li @click="toggleLabelFilter('romantic')"  :class="{isLabelActive : activeLabels.romantic}">
                    <span class="fa heart-icon"></span>
                    Romantic
                </li>
            </ul>
        </section>
        <button v-if="screenWidth" class="show-label-filter" @click="toggleLabelFilterMobile()" :class="{isButtonActive :showLabelFilterMobile }"><span class="fa label-icon"></span></button>
        `,
    components: {},
    created() { },
    data() {
        return {
            chosenLabels: [],
            activeLabels: {
                critical: false,
                family: false,
                work: false,
                friends: false,
                spam: false,
                memories: false,
                romantic: false,
            },
            showLabelFilterMobile: false

        }
    },
    methods: {
        toggleLabelFilter(label) {
            if (this.chosenLabels.includes(label)) {
                this.activeLabels[label] = false
                const labelIdx = this.chosenLabels.findIndex(label => label === label)
                this.chosenLabels.splice(labelIdx, 1)
                this.$emit('labelFilter', [...this.chosenLabels])
            } else {
                this.activeLabels[label] = true
                this.chosenLabels.push(label)
                this.$emit('filterLabel', [...this.chosenLabels])
            }
        },
        toggleLabelFilterMobile() {
            if (!this.showLabelFilterMobile) {
                this.showLabelFilterMobile = !this.showLabelFilterMobile
            } else {
                this.showLabelFilterMobile = !this.showLabelFilterMobile
            }

        }
    },
    computed: {
        screenWidth() {
            return screen.width < 780
        },

        toggleLabelFilterMobileStyle() {
            if (this.showLabelFilterMobile) {
                return { 'left': '0px' }
            } else {
                return { 'left': '-100px' }
            }

        }
    },
}
