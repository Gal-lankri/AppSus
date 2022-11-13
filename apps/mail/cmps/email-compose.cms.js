export default {
  name: 'email-compose',
  props: ['urlInfo'],
  template: `
    <form @submit.prevent="sendMail">
      <h4>New Message <button @click="close"  title="Close">&#215;</button></h4>
      <input v-model="newMail.emailAddress" ref="to" type="email" placeholder="To"/>
      <input v-model="newMail.subject" type="text" placeholder="Subject" />
      <textarea v-model="newMail.body" name="comment" ></textarea>
      <section class="btns">
      <button class="send-btn" title="Send email">Send</button>
      <router-link class="save-email-to-note"  :to="'/note/'+ '0/' + newMail.subject + '/' + newMail.body + ''">Keep as Note</router-link>
      </section>
      </form>
    `,

  data() {
    return {
      newMail: {
        emailAddress: '',
        subject: '',
        body: '',
      },
    }
  },
  created() {
    if (this.urlInfo.subject !== 'undefined') {
      var newSubject = this.urlInfo.subject.split('$').join(' ')
      this.newMail.subject = newSubject
    }
    if (this.urlInfo.body !== 'undefined') {
      var newBody = this.urlInfo.body.split(']').join('/')
      newBody = newBody.split('$').join(' ')
      this.newMail.body = newBody
    }
  },
  methods: {
    sendMail() {
      this.$emit('sendMail', { ...this.newMail })
    },
    close() {
      this.$emit('close')
    },
  },

  mounted() {
    this.$refs.to.focus()
  },
}
