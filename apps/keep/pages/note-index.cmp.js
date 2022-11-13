import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

import noteFilter from '../cmps/note-filter.cmp.js'
import noteList from '../cmps/note-list.cmp.js'
import noteAdd from '../cmps/note-add.cmp.js'
import noteLabelFilter from '../cmps/note-label-filter.cmp.js'
import noteDetails from "../cmps/note-details.cmp.js"


export default {
    name: 'note-index',
    props: [],
    template: `
        <section class="app-container note-app">
            <note-filter class="search-filter note-search-filter" @filterTitle="setFilterTitle" />
            
            <section class="flex row">
                
                <note-label-filter @filterLabel="setFilterLabel"/>
                
                <div class="note-lists flex column">
                    <note-add class="" @newNote="addNewNote" :urlInfo="urlInfo"/>
                    <note-list 
                    v-if="notes"
                    :notes="notes"
                     />

                </div>
            </section>
                <note-details 
                    v-if="isNoteSelected && notes" 
                    :notes="notes"
                    />
        </section>

        `,
    data() {
        return {
            filterBy: {
                title: null,
                label: [],
                type: null,
            },
            notes: null,
            urlInfo: {
                title: '',
                txt: '',
            },
        }
    },

    created() {
        this.notesToShow()
            .then(notes => {
                console.log(notes)
                this.notes = notes
                showSuccessMsg('notes were loaded successfully!')
            })
            .catch(() => showErrorMsg('Error occurred while loading notes from storage!'))

        this.urlInfo.title = this.$route.params.title
        this.urlInfo.txt = this.$route.params.txt
        console.log({ ...this.urlInfo })

    },
    mounted() {


    },
    methods: {
        setFilterTitle(value) {
            this.filterBy.title = value.title
            if (this.filterBy.type === value.type) { this.filterBy.type = null }
            else { this.filterBy.type = value.type }
            this.notesToShow()
        },

        setFilterLabel(value) {
            this.filterBy.label = value
            this.notesToShow()
        },

        notesToShow() {
            return noteService.query(this.filterBy)
                .then(notes => {
                    this.notes = notes
                    this.filterBy = {
                        title: null,
                        label: [],
                        type: null,
                    }
                    showSuccessMsg('notes were loaded successfully!')
                    return notes
                })
                .catch(() => showErrorMsg('Error occurred while loading notes from storage!'))
        },

        addNewNote(newNote) {
            this.notes.unshift(newNote)
        },

    },

    computed: {
        isNoteSelected() {
            if (this.$route.params.id) return true
            else false
        },
    },
    components: {
        noteFilter,
        noteList,
        noteAdd,
        noteLabelFilter,
        noteDetails
    },
}