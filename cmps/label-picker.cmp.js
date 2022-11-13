export default {
    name: 'label-picker',
    props: ['labels'],
    emits: ['editLabels'],
    template: `
        <ul class="label-picker">
            <li @click="toggleLabel('critical')" class="bgc-red" :class="{greyedLabel : !activeLabels.critical}">Critical</li>
            <li @click="toggleLabel('family')" class="bgc-blue" :class="{greyedLabel : !activeLabels.family}">Family</li>
            <li @click="toggleLabel('work')" class="bgc-green" :class="{greyedLabel : !activeLabels.work}">Work</li>
            <li @click="toggleLabel('friends')" class="bgc-yellow" :class="{greyedLabel : !activeLabels.friends}">Friends</li>
            <li @click="toggleLabel('spam')" class="bgc-orange" :class="{greyedLabel : !activeLabels.spam}">Spam</li>
            <li @click="toggleLabel('memories')" class="bgc-pink" :class="{greyedLabel : !activeLabels.memories}">Memories</li>
            <li @click="toggleLabel('romantic')" class="bgc-lightblue" :class="{greyedLabel : !activeLabels.romantic}">Romantic</li>
            <!-- <div @click="saveLabels">Save</div> -->
        </ul>
        `,
    components: {},
    created() {
        // console.log([...this.labels])
        // console.log({ ...this.activeLabels })
        this.chosenLabels = [...this.labels]

        this.chosenLabels.forEach(label => {
            this.activeLabels[label] = true
        });
    },
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
            }
        }
    },
    methods: {
        toggleLabel(labelToEdit) {
            console.log(labelToEdit)
            if (this.chosenLabels.includes(labelToEdit)) {
                this.activeLabels[labelToEdit] = false
                const labelIdx = this.chosenLabels.findIndex(label => label === labelToEdit)
                console.log(`labelIdx:`, labelIdx)
                this.chosenLabels.splice(labelIdx, 1)
                console.log([...this.chosenLabels])
                this.saveLabels()
            } else {
                this.activeLabels[labelToEdit] = true
                this.chosenLabels.push(labelToEdit)
                this.saveLabels()
            }
        },

        saveLabels() {
            console.log([...this.chosenLabels])
            // const labels = [...]
            this.$emit('editLabels', this.chosenLabels)
        },
    },
    computed: {

    },
}
