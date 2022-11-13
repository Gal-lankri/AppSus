import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from '../../../services/event-bus.service.js'
import { showErrorMsg } from '../../../services/event-bus.service.js'

import noteEdit from "./note-edit.cmp.js"

export default {
    name: 'note-add',

    props: ['urlInfo'],

    template: `
        <form class="note-add flex column "  @submit.prevent="createNote">
            <div class="flex row grow">
                <input type="text" placeholder="Enter note title" v-model="note.info.title"  ref="name" />
                <div class="flex row align-center btns-container ">
                    <div :class="{selectedNoteType : note.type==='note-txt' }">
                        <span @click="setNoteType('note-txt')" class="fa text-icon add-btn"></span>
                    </div>                    
                    <div :class="{selectedNoteType : note.type==='note-img' }">
                        <span @click="setNoteType('note-img')" class="fa img-icon add-btn" ></span>
                    </div>
                    <div :class="{selectedNoteType : note.type==='note-video' }">
                        <span @click="setNoteType('note-video')" class="fa video-icon add-btn" ></span>
                    </div>
                    <div :class="{selectedNoteType : note.type==='note-todos' }">
                        <span @click="setNoteType('note-todos')" class="fa list-icon add-btn" ></span>
                    </div>
                </div>
            </div>
            <div class="note-add-slide animate__slideInDown" :class="{isSlideActive:isSlideActive}">
                <button class="close-slide" @click="isSlideActive = false"><span class="fa close-icon"></span>  </button>
                <textarea id="w3review" name="w3review" rows="4"  :placeholder="placeholder" v-model="note.info.value" @click.stop="isSlideActive = true"></textarea>
                <note-edit :note="note" @setNewNoteBGC ="setNoteBGC"   @setNewNoteLabel ="setNoteLabel"  @setNewNotePin="setNotePin"
                
                />    
            </div>
        </form>
        `,

    components: {
        noteEdit
    },

    created() {
        if (this.urlInfo.title) {
            if (this.urlInfo.title !== '') {
                this.note.info.title = this.urlInfo.title
                this.note.info.value = this.urlInfo.txt
                this.note.type = 'note-txt'
                this.note.isPinned = true

                this.createNote()
            }
        }

    },

    mounted() {
        this.$refs.name.focus()

    },

    data() {
        return {
            placeholder: `Enter text to remember`,

            note: {
                type: '',
                isPinned: false,
                info: {
                    title: null,
                    value: null,
                    label: [],
                    style: { backgroundColor: "white" }
                }
            },
            isSlideActive: false,
        }
    },

    methods: {
        setNoteType(type) {
            if (type === 'note-txt') {
                this.placeholder = 'Enter text to remember'
            } else if (type === 'note-img') {
                this.placeholder = 'Enter img url to remember'
            } else if (type === 'note-video') {
                this.placeholder = 'Enter video url to remember'
            } else if (type === 'note-todos') {
                this.placeholder = 'Enter comma separated list to remember'
            }
            this.closeSlide(type)
            this.note.type = type
            this.$refs.name.focus()
        },

        createNote() {
            var title = this.note.info.title
            if (title === undefined) {
                showErrorMsg('A note must have title!')
                return
            }
            var note = { ...this.note }
            noteService.createNote(note)
                .then(response => {
                    this.$emit('newNote', response)
                    this.note.title = ''
                    this.note.info.value = ''
                    showSuccessMsg('note was saved successfully!')
                })
                .catch(() => showErrorMsg('Error occurred while saving note to storage!'))


        },

        closeSlide(type) {
            if (this.note.type === '') {
                this.isSlideActive = !this.isSlideActive
            } else if (type != this.note.type) return
            else this.isSlideActive = !this.isSlideActive
        },

        setNoteBGC(color) {
            this.note.info.style.backgroundColor = color
        },
        setNoteLabel(labels) {
            this.note.info.label = labels
        },
        setNotePin(value) {
            this.note.isPinned = value
        }
    },

    computed: {
    },
}


