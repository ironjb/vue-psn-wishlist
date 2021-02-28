const Wishlist_Old = {
  data() {
    return {
      counter: 0,
      wishlistData: []
    }
  },
  mounted() {
    // TODO: NEED TO FIX
    // the wishlistData will not populate correctly due to async fetch.  should reconfigure with await:
    // https://igbiriki.medium.com/javascript-fetch-synchronous-or-asynchronous-fd24f8ba6129

    fetch('my-wishlist.json')
    .then(response => response.json())
    .then(data => {
      // console.log('data', data);
      this.wishlistData = data.items;
      this.wishlistData.forEach((item, indx) => {
        if (item.itemId === 'UP1003-CUSA08793_00-ARKANEBUNDLE20YR'|| item.itemId === 'UP0082-CUSA04551_00-GOTYORHADIGITAL0') {
          fetch('https://store.playstation.com/valkyrie-api/en/US/19/resolve/' + item.itemId)
          .then(response2 => response2.json())
          .then(data2 => {
            // console.log('data2', data2);
            const dAttr = data2?.included[0]?.attributes;
            const nPlus = dAttr?.skus[0]?.prices['non-plus-user'];
            const yPlus = dAttr?.skus[0]?.prices['plus-user'];

            const psnData = {
              name: dAttr.name,
              nPlus_actualPrice: nPlus['actual-price']?.value / 100 || null,
              nPlus_strikePrice: nPlus['strikethrough-price']?.value / 100 || null,
              nPlus_availStart: new Date(nPlus.availability['start-date']),
              nPlus_availEnd: new Date(nPlus.availability['end-date']),
              yPlus_actualPrice: yPlus['actual-price']?.value / 100 || null,
              yPlus_strikePrice: yPlus['strikethrough-price']?.value / 100 || null,
              yPlus_availStart: new Date(yPlus.availability['start-date']),
              yPlus_availEnd: new Date(yPlus.availability['end-date']),
            };

            // console.log('psnData', psnData);
            item.psnData = psnData;
          });
        }
      });
      // console.log('final wishlistData', this.wishlistData);
    });
  }
};

const myWishlistApp_Old = Vue.createApp(Wishlist_Old);

// create vue components before mount

myWishlistApp_Old.mount('#wishlist');