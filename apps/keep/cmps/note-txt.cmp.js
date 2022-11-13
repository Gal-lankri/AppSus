import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

import noteEdit from './note-edit.cmp.js'
import longTxt from '../../../cmps/long-txt.cmp.js'
export default {
    name: '',
    props: ['note'],
    template: `
        <section class='note-txt' :style="style">
        <div v-if="note.isPinned" class="pinned" @click="togglePin(note)"><span class="fa pin-icon"></span></div>

            <h5>{{note.info.title}}</h5>
            <!-- <p>{{note.info.txt..slice(0,)}}</p> -->
            <long-txt v-if="note.info.txt" :txt="note.info.txt"/>
            
            <note-edit :note="note" @removeNote="removeNote" @duplicateNote="duplicateNote"/>
        </section>
        `,
    components: {
        noteEdit,
        longTxt,
    },
    created() { },
    data() {
        return {}
    },
    methods: {
        togglePin(note) {
            const noteToEdit = note
            noteToEdit.isPinned = !noteToEdit.isPinned
            noteService.save(noteToEdit)
                .then(() => {
                    showSuccessMsg('note was pinned successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))
        },
        removeNote(noteId) {
            this.$emit('removeNote', noteId)
        },
        duplicateNote(noteCopy) {
            this.$emit('duplicateNote', noteCopy)
        }
    },
    computed: {
        style() {
            const deg = utilService.getRandomInt(-10, 10)
            return { transform: 'rotate(' + deg + 'deg)', backgroundColor: this.note.info.style.backgroundColor }
        },

    },
}
