import emailPreview from './email-preview.cmp.js'

export default {
  name: 'email-list',
  emits: ['remove', 'read'],
  props: ['emails'],
  template: `
        <section class="email-list" v-if="!this.$route.params.id">
          <ul class="flex flex-column clean-list">
            <li v-for="email in emails" :key="email.id">
              <button class="remove-btn fa" @click="remove(email.id)"></button>
              <router-link  @click="openEmail(email.id)" :to="'/email/' + email.id"> <email-preview :email="email"/></router-link>
            </li>
          </ul>
        </section>
        <section>
          <router-view  @removeEmail="remove" @closeEmail="closeEmail"></router-view>
        </section>
        `,
  data() {
    return {
      isListShow: true,
    }
  },
  created() {
    this.isListShow = true
    console.log(this.isListShow);
  },

  methods: {
    remove(emailId) {
      this.$emit('remove', emailId)
    },
    openEmail(emailId) {
      this.isListShow = !this.isListShow
      if (this.isListShow === true) return
      const idx = this.emails.findIndex((email) => email.id === emailId)
      if (this.emails[idx].isRead === true) return
      this.$emit('read', emailId)
    },
    closeEmail() {
      this.isListShow = !this.isListShow
    },
  },

  components: {
    emailPreview,
  },
}
