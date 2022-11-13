export default {
  props: ['emails', 'unreaEmails'],
  template: `
    <section class="email-folder-list flex gap">
        <button @click="composeEmail"><span class="fa pen-icon"></span><span>Compose</span></button>
        <ul class="clean-list gap">
          <li ref="button" :class="{active: isActive === 'btn1' }" @click="setFilterByStatus('inbox'); isActive = 'btn1'"><span class="fa inbox-icon"></span>Inbox <span class="unread-num">{{unreaEmails}}</span></li>
          <li ref="button" :class="{active: isActive === 'btn2' }" @click="setFilterByStatus('sent'); isActive = 'btn2'"><span class="fa sent-icon"></span>Sent</li>
          <li ref="button" :class="{active: isActive === 'btn3' }" @click="setFilterByStatus('trash'); isActive = 'btn3'"><span class="fa trash-icon"></span>Trash</li>
          <li ref="button" :class="{active: isActive === 'btn4' }" @click="setFilterByStatus('draft'); isActive = 'btn4'"><span class="fa draft-icon"></span>Draft</li>
        </ul>
    </section>
    `,

  data() {
    return {
      filterByStatus: {
        status: null,
      },
      isActive: ''
    }
  },

  methods: {
    setFilterByStatus(status) {
      this.filterByStatus.status = status
      console.log(status)
      this.$emit('filterByStatus', this.filterByStatus.status)
    },

    composeEmail() {
      this.$emit('composeEmail')
    },
  },

}
