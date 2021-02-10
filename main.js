const Wishlist = {
  data() {
    return {
      counter: 0,
      wishlistData: []
    }
  },
  mounted() {
    // TODO: finish getting data
    // see here: https://stackoverflow.com/questions/53152072/import-data-from-a-json-file-in-vue-js-instead-of-manual-data
  }
};

const myWishlistApp = Vue.createApp(Wishlist);

// create vue components before mount

myWishlistApp.mount('#wishlist');