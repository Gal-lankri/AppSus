export default {
    name: 'note-filter',
    props: [],
    emits: ['filterTitle'],
    template: `
        <section >
            <input type="text" placeholder="search note by title" v-model.lazy="filterBy.title" @change="filter" />
            <div class="filter-by-type-btns-container">
                <button @click="setNoteType('note-txt')"  :class="{ isActiveType : isActiveTypeFilter['note-txt']}" > <span  class="fa text-icon "></span></button>
                <button @click="setNoteType('note-img')"  :class="{ isActiveType : isActiveTypeFilter['note-img']}" > <span class="fa img-icon "></span> </button>
                <button @click="setNoteType('note-video')" :class="{ isActiveType : isActiveTypeFilter['note-video']}"  ><span class="fa video-icon "></span>  </button>
                <button @click="setNoteType('note-todos')" :class="{ isActiveType : isActiveTypeFilter['note-todos']}" > <span  class="fa list-icon "></span></button>
            </div>
        </section>
        `,
    created() { },
    data() {
        return {
            filterBy: {
                title: null,
                type: null,
            },
            isActiveTypeFilter: {
                'note-txt': false,
                'note-img': false,
                'note-video': false,
                'note-todos': false,
            },
        }
    },

    methods: {
        filter() {
            this.$emit('filterTitle', { ...this.filterBy })
        },
        setNoteType(type) {
            this.isActiveTypeFilter['note-txt'] = false
            this.isActiveTypeFilter['note-img'] = false
            this.isActiveTypeFilter['note-video'] = false
            this.isActiveTypeFilter['note-todos'] = false

            if (this.filterBy.type === type) {
                this.isActiveTypeFilter[type] = false
                this.filterBy.type = null
            }
            else {
                this.filterBy.type = type
                this.isActiveTypeFilter[type] = true
            }
            this.filter()
        },
    },
}
