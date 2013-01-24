# Good Life

Simple and flexible wrapper for HTML5 local storage. Good life allows gives you the ability to track the age of items stored in storage. It also returns items in their original data type form. Gone are the days of storing JavaScript objects and getting back the strigified version of that object - that's not living the good life!

# Usage

```javascript

// old and busted
localStorage.setItem( 'mykey', { life: 'sucks'} );
var obj = localStorage.getItem( 'mykey' );

console.log( obj ); // "[object Object]" My life sucks!


// the new hotness
var store = Goodlife.store;
store.save( 'mykey', { life: 'isGood' } );
var obj = store.get( 'mykey' );

console.log( obj ); // { life: 'good' } aw yea!!

// track the age of an item
// item save returns the momenent it was persisted in milliseconds
var bday = store.save( 'anotherKey', 'val' );

// do something for about 500 milliseconds

console.log( store.age( 'anotherKey' ) ); // 500 (give or take a few milliseconds)

// by default, items expire after 1 minute and accessing them past that expiration
// will return null. you can however extend the life of items

store.setCacheMaxAge( 120000 );

```
Good life also supports the removal of items and clearing of localStorage. More features coming soon (including fallback for browsers that don't support localStorage). Launch index.html to see test results.