export default {
  template: `
<section>
      <input class="search-filter" @input="filter" v-model="filterBy.text" type="search" placeholder="Search mail" />
      <select v-if="!this.$route.params.id"  class="filter-select" @change="filter" v-model="filterBy.isRead">
      <option value="all" >&#9634; <span>All</span> </option>
      <option value="true">R <span>read</span></option>
      <option value="">U <span>unread</span></option>
    </select>
</section>
    `,
  data() {
    return {
      filterBy: {
        text: '',
        isRead: 'all',
      },
    }
  },

  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },

}
