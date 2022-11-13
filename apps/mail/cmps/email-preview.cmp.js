export default {
  props: ['email'],
  template: `
     <section class="email-preview" :class="isRead">
       <div>{{email.from.name}}</div>
       <div>{{getShortSubject}}</div>
       <div>{{getDate}}</div>
      </section>
    `,

  computed: {
    isRead() {
      return { unread: !this.email.isRead, read: this.email.isRead }
    },

    getDate() {
      return new Date(this.email.sentAt).toDateString().slice(4, 10)
    },

    getShortSubject() {
      if (this.email.subject.length > 40) return this.email.subject.substring(0, 40) + '...'
      return this.email.subject
    },
  },
}
