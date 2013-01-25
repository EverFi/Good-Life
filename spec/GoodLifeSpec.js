describe("GoodLife", function() {
  
  describe("when you're living the good life", function() {
    var store = GoodLife.store;
    var number = 'number';
    var string = 'string';
    var object = 'object';
    store.init();

    beforeEach(function(){
      jasmine.Clock.useMock();
    });

    afterEach(function(){
      store.clear();
    });

    it("should cache a string item", function() {
      var key = 'key.for.string'
      var stringItem = "goodlife";

      store.save( key, stringItem );
      var tmp = store.get( key );
      expect( tmp ).toEqual( stringItem );
    });

    it("should cache an object and return an object type", function(){
      var key = 'key.for.object';
      var obj = {
        life: 'good'
      };
      store.save( key, obj );
      var tmp = store.get( key );
      expect( typeof tmp ).toEqual( object );
      expect( tmp ).toEqual( obj );
    });

    it("should cache a number and return a number type", function() {
      var key = 'key.for.number';
      var num = 6.77;
      store.save( key, num );
      var tmp = store.get( key );
      expect( typeof tmp ).toEqual( number );
      expect( tmp ).toEqual( num );
    });

    it("should set/get max age for cached items", function(){
      var defaultMax = 60000; // one minute
      var newMax = 120000; // two minutes
      expect( store.getCacheMaxAge() ).toEqual( defaultMax );
      store.setCacheMaxAge( newMax );
      expect( store.getCacheMaxAge() ).toEqual( newMax );
    });

    it("should check for an item's existence", function(){
      var key = 'foo.key';
      var val = 'bar';
      var exists;
      expect( store.itemExists( key ) ).toEqual( false );
      store.save( key, val );
      expect( store.itemExists( key ) ).toEqual( true );
    });

    it("removes an item from the cache", function(){
      var key = 'foo.key';
      var val = 'bar';
      store.save( key, val );
      expect( store.itemExists( key ) ).toEqual( true );
      store.remove( key );
      expect( store.itemExists( key ) ).toEqual( false );
    });

    it("saves two items with the same key under different namespaces", function(){
      var diffNamespace = 'com.company';
      var key = "key";

      store.save( key, "foo" );
      store.setNamespace( diffNamespace );
      store.save( key, "bar");

      var val = store.get( key );
      expect( val ).toEqual( "bar" );
      store.originalNamespace();
      val = store.get( key );
      expect( val ).toEqual( "foo" );
    });

    it("should track a cached item's age", function(){
      var item = 'bar';
      var key = 'foo.key';
      var birthdate;
      var age;

      runs(function(){
        birthdate = new Date( store.save( key, item ) ).getTime();
      });

      waits( 500 );

      runs(function(){
        age = store.age( key );
        // item is more or less 500 milliseconds old
        var test = ( age >= 500 && age <= 520 );
        expect( test ).toEqual( true );
      });
    });
  });

});