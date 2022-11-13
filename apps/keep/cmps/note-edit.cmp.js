import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

import labelPicker from "../../../cmps/label-picker.cmp.js"

export default {
    name: 'note edit',

    props: ['note'],
    emits: ['removeNote', 'setNewNoteBGC', 'setNewNoteLabel', 'setNewNotePin', 'duplicateNote'],

    template: `
        <section class="note-edit">
            <div v-if="this.note.id" class="fa trash-icon" @click.stop="removeNote"></div>
            <div class="fa pallet-icon show-pallet" >
                <section class="color-pallet flex row">
                    <div class="color-one color-pick" @click.stop="changeBGC(note,'#ff9aa2')"></div>
                    <div class="color-two color-pick" @click.stop="changeBGC(note,'#ffb7b2')"></div>
                    <div class="color-three color-pick" @click.stop="changeBGC(note,'#ffdac1')"></div>
                    <div class="color-four color-pick" @click.stop="changeBGC(note,'#fff895')"></div>
                    <div class="color-five color-pick" @click.stop="changeBGC(note,'#e2f0cb')"></div>
                    <div class="color-six color-pick" @click.stop="changeBGC(note,'#b5ead7')"></div>
                    <div class="color-seven color-pick" @click.stop="changeBGC(note,'#89daff')"></div>
                </section>
            </div>
            <router-link v-if="this.note.id"  :to="'/note/' + this.note.id " @click="changeRoute"><div class="fa draft-icon"></div></router-link>
            <div class="fa label-icon show-label-picker">
                <div class="label-picker-container">
                    <label-picker  @editLabels="editLabels" :labels="note.info.label"/> 
                </div>
            </div>
            <router-link  :to="'/email/' + email.subject + '/'+ email.body + ''"><div class="fa sent-icon"></div></router-link>
            <div v-if="this.note.id" class="fa duplicate-icon" @click.stop="duplicateNote"></div>
            <div class="fa pin-icon" @click.stop="togglePin"></div>
        </section>
 
        `,

    components: {
        labelPicker,

    },

    created() {

        if (this.note.info.title) {
            this.email.subject = this.getURLFromTitle
        }
        if (this.note.info.url) {
            this.email.body = this.getURLFromLink
        } else if (this.note.info.txt) {
            this.email.body = this.getURLFromTxt
        }
    },

    data() {
        return {
            chosenLabels: [],
            email: {
                subject: 'hello',
                body: 'hello',
            },
        }
    },

    methods: {
        changeRoute() {
            this.$route.params.id = this.note.id
            this.isNoteSelected = true

        },
        closeNote() {
            this.$route.params.id = undefined
            this.isNoteSelected = false

        },
        removeNote() {
            var note = { ...this.note }
            if (!this.note.id) return
            noteService.remove(note.id)
                .then(() => {
                    this.$emit('removeNote', this.note.id)
                    showSuccessMsg('note was deleted successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while deleting note from storage!'))
        },

        editNote(note) {
            if (!this.note.id) return
        },

        changeBGC(note, color) {
            this.note.info.style.backgroundColor = color
            var note = { ...this.note }
            if (!this.note.id) {
                this.$emit('setNewNoteBGC', color)
                return
            }
            noteService.save(note)
                .then(() => {
                    showSuccessMsg('note was saved successfully!')

                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))
        },

        editLabels(labels) {
            this.chosenLabels = labels
            this.note.info.label = labels
            var note = { ...this.note }
            if (!this.note.id) {
                this.$emit('setNewNoteLabel', labels)
                return
            }
            noteService.save(note)
                .then(() => {
                    showSuccessMsg('labels were saved successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))

        },

        togglePin(note) {
            this.note.isPinned = !this.note.isPinned
            var note = { ...this.note }
            if (!this.note.id) {
                this.$emit('setNewNotePin', !{ ...this.note.isPinned })
                return
            }
            noteService.save(note)
                .then(() => {
                    showSuccessMsg('note was pinned successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))

        },
        duplicateNote() {
            let noteCopy = Object.assign({}, { ...this.note });
            noteCopy.id = null

            noteService.save(noteCopy)
                .then(noteCopy => {
                    showSuccessMsg('note was copied successfully!')
                    this.$emit('duplicateNote', noteCopy)
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))

        }

    },

    computed: {
        getTitleFromURL() {

        },
        getURLFromTitle() {
            return this.note.info.title.split(' ').join('$')

        },
        getTxtFromURL() {

        },
        getURLFromTxt() {
            return this.note.info.txt.split(' ').join('$')

        },
        getLinkFromURL() {

        },
        getURLFromLink() {
            return this.note.info.url.split('/').join(']')

        },
    },
}
