import { utilService } from '../../../services/util.service.js'
import { noteService } from '../services/note.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

export default {
    name: '',

    props: ['notes'],

    template: `
        <section v-if="note" class="note-details-container">
            <form   class="note-details flex column gap" @submit.prevent="closeEditor">
                <section>
                    <input type="text" v-model="note.info.title" />
                </section>
                <section v-if="note.info.txt">
                    <h4>Note text editor</h4>
                    <textarea type="text"  v-model="note.info.txt"></textarea>
                </section>
                <section v-if="note.info.url">
                    <h4 v-if="note.type === 'note-img'">Note image url editor</h4>
                    <h4 v-if="note.type === 'note-video'">Note video url editor</h4>
                    <textarea type="text"  v-model="note.info.url"></textarea>
                </section>
                <section v-if="note.type === 'note-todos'" class="todos-details">
                <h4>Note list editor</h4>
                    <ul>
                        <li v-for="todo in note.info.todos" class="flex row justify-between" id="todo.txt"> 
                            <div>
                                <input type="checkbox" v-model="todo.doneAt" id="todo.txt" />
                                <input :class="{greyedTodo : todo.doneAt}" v-model="todo.txt"/>
                                <br>
                            </div>
                            <ul>
                                <li>
                                    <span v-if="todo.doneAt">
                                        {{  getDate(todo.doneAt)  }} 
                                        <span>&nbsp;&nbsp;</span>
                                        &#10003;
                                    </span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section>
                <button class="close-editor" @click.stop="closeEditor"><span class="fa close-icon"></span></button>
            </form>
        </section>
        `,

    created() {
        this.setNoteToEdit()
    },

    unmounted() {
    },

    data() {
        return {
            noteId: null,
            noteIdx: null,
            note: null,
        }
    },

    methods: {
        removeNote() {
            noteService.remove(this.note.id)
                .then(() => {
                    this.$emit('noteToRemove', { ...this.note.id })
                    this.closeNote()
                    showSuccessMsg('note was deleted successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while deleting note from storage!'))
        },

        setNoteToEdit() {
            if (!this.notes) return
            this.noteId = this.$route.params.id
            this.noteIdx = this.notes.findIndex(note => {
                const noteToCheck = { ...note }
                return noteToCheck.id === +this.noteId
            })
            this.note = this.notes[this.noteIdx]
        },

        closeEditor() {
            noteService.save(this.note)
                .then(() => {
                    showSuccessMsg('note was saved successfully!')
                    this.$router.push({ path: '/note' })
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))
        },

        getDate(timestamp) {
            if (!timestamp) return
            const date = new Date(timestamp)
            return date.toLocaleDateString('ils')
        }
    },

    computed: {
        noteOpen() {
            return this.$route.params.id
        },
    },

    components: {
    },

    watch: {
        noteOpen() {
            this.setNoteToEdit()


            if (this.noteOpen === undefined) {
                this.noteId = null
                this.noteIdx = null
                this.note = null
            }
        }
    }
}
