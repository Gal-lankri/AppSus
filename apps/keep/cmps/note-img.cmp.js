import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

import noteEdit from './note-edit.cmp.js'

export default {
    name: '',
    props: ['note'],
    emits: ['removeNote', 'duplicateNote'],
    template: `
        <section class='note-img' :style="style" >
                <div v-if="note.isPinned"  class="pinned" @click="togglePin(note)"><span class="fa pin-icon"></span></div>

            <div class="image-container "  :style="{ backgroundImage: 'url(' + note.info.url + ')' }" >
            </div>
        <!-- <img :src="info.url" alt="" /> -->
            <h5>{{note.info.title}}</h5>
            <note-edit :note="note" @removeNote="removeNote" @duplicateNote="duplicateNote"/>
        </section>
    
        `,
    components: {
        noteEdit
    },
    created() {
    },
    data() {
        return {
            // note: this.note,
        }
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
