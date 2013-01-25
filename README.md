# Good Life

Simple and flexible wrapper for HTML5 localStorage. GoodLife gives you the ability to track the age of items cached in storage. It also returns items in their original data type form. Gone are the days of storing JavaScript objects and getting back the "[object object]" thingy - that's not living the good life! Good Life also supports namespacing.

# Usage

```javascript

// old and busted
localStorage.setItem( 'mykey', { life: 'sucks'} );
localStorage.getItem( 'mykey' ); // "[object Object]" My life sucks!


localStorage.setItem( 'number', 5 );
localStorage.getItem( 'item' ); // "5" Doh!


// the new hotness
var store = GoodLife.store;
store.save( 'mykey', { life: 'isGood' } );
store.get( 'mykey' ); // { life: 'good' } aw yea!!

store.save( 'number', 5 );
store.get( 'mykey' ); // 5 woohoo!!

// track the age of an item
// item save returns the momenent it was persisted in milliseconds
var bday = store.save( 'anotherKey', 'val' );

// do something for about 500 milliseconds

store.age( 'anotherKey' ); // 500 (give or take a few milliseconds)

// namespaces
var diffNamespace = 'com.company';
var key = "key";

store.save( key, "foo" );
store.setNamespace( diffNamespace );
store.save( key, "bar");

store.get( key ); // "bar"
store.originalNamespace(); // watch closely
store.get( key ); // "foo" woah!

// by default, items expire after 1 minute and accessing them past that expiration
// will return null. you can however extend the life of items

store.setCacheMaxAge( 120000 );

```
Good life also supports the removal of items and clearing of localStorage. More features coming soon (including fallback for browsers that don't support localStorage). Launch index.html to see test results.