const Wishlist = {
    data() {
        return {
            counter: 0,
            wishlistData: []
        };
    },
    mounted() {
        // TODO: NEED TO FIX
        // the wishlistData will not populate correctly due to async fetch.  should reconfigure with await:
        // https://igbiriki.medium.com/javascript-fetch-synchronous-or-asynchronous-fd24f8ba6129
        // Promise.all() may be better
        // https://stackoverflow.com/questions/53377774/fetch-multiple-links-inside-foreach-loop
        // https://stackoverflow.com/questions/45285129/any-difference-between-await-promise-all-and-multiple-await
        fetch('my-wishlist.json')
            .then(response => response.json())
            .then(data => {
            // console.log('data', data);
            const myWishlistItems = data.items;
            const wlPromises = myWishlistItems.map((wlItem) => {
                // if (wlItem.itemId === 'UP1003-CUSA08793_00-ARKANEBUNDLE20YR' || wlItem.itemId === 'UP0082-CUSA04551_00-GOTYORHADIGITAL0') {
                return fetch('https://store.playstation.com/valkyrie-api/en/US/19/resolve/' + wlItem.itemId)
                    .then(response2 => response2.json())
                    .then((itemData) => {
                    // console.log('itemData', itemData);
                    const dAttr = itemData?.included[0]?.attributes;
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
                        yPlus_availEnd: new Date(yPlus.availability['end-date'])
                    };
                    // console.log('psnData', psnData);
                    // console.log('wlItem', wlItem);
                    // return psnData;
                    // return Object.assign(wlItem, { psnDataX: psnData });
                    return { ...wlItem, psnData: psnData };
                }).catch(error => {
                    return null;
                });
                // }
                // return Promise.resolve({itemId: '0'});
            });
            console.log('wishlistPromises', wlPromises);
            Promise.all(wlPromises).then(wlItems => {
                console.log('promise.all.then', wlItems);
                this.wishlistData = [...wlItems];
            });
            /* myWishlistItems.forEach((item, indx) => {
              if (item.itemId === 'UP1003-CUSA08793_00-ARKANEBUNDLE20YR'|| item.itemId === 'UP0082-CUSA04551_00-GOTYORHADIGITAL0') {
                fetch('https://store.playstation.com/valkyrie-api/en/US/19/resolve/' + item.itemId)
                .then(response2 => response2.json())
                .then(itemData => {
                  // console.log('data2', data2);
                  const dAttr = itemData?.included[0]?.attributes;
                  const nPlus = dAttr?.skus[0]?.prices['non-plus-user'];
                  const yPlus = dAttr?.skus[0]?.prices['plus-user'];
      
                  const psnData: IPsnData = {
                    name: dAttr.name,
                    nPlus_actualPrice: nPlus['actual-price']?.value / 100 || null,
                    nPlus_strikePrice: nPlus['strikethrough-price']?.value / 100 || null,
                    nPlus_availStart: new Date(nPlus.availability['start-date']),
                    nPlus_availEnd: new Date(nPlus.availability['end-date']),
                    yPlus_actualPrice: yPlus['actual-price']?.value / 100 || null,
                    yPlus_strikePrice: yPlus['strikethrough-price']?.value / 100 || null,
                    yPlus_availStart: new Date(yPlus.availability['start-date']),
                    yPlus_availEnd: new Date(yPlus.availability['end-date'])
                  };
      
                  // console.log('psnData', psnData);
                  item.psnData = psnData;
                });
              }
            }); */
            // console.log('final wishlistData', this.wishlistData);
        });
    }
};
const myWishlistApp = Vue.createApp(Wishlist);
// create vue components before mount
myWishlistApp.mount('#wishlist');
