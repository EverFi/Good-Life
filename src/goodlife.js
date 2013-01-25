(function(GoodLife){

  /*
  -------------- Private Nitty Gritty ----------------
  */
  var MAX_AGE = 60000;

  var NAMESPACE = "gl.items";

  var _beginsWithPeriod = function (str) {
    return (/^\./).test( str );
  };

  var _endsWithPeriod = function (str) {
    return (/\.$/).test( str );
  };

  var _isKeyForNamespace = function(key) {
    return key.indexOf( NAMESPACE + '.' ) === 0;
  };

  var _birthdate = function(key, items) {
    key = _formattedKey(key);
    return items[ key ].birth;
  };

  var _writeItem = function(key, data) {
    var origKey = key;
    key = _formattedKey( key );
    var markObject;
    var items;
    var markNumber;
    if ( typeof data === 'object' ) {
      data = JSON.stringify( data );
      markObject = true;
    } else if ( typeof data === 'number' ) {
      markNumber = true;
    }
    localStorage.setItem(key, data);
    _birth( key );
    if ( markObject ) {
      items = _loadItems();
      items[ key ].isObject = true;
      _saveItems( items );
    } else if ( markNumber ) {
      items = _loadItems();
      items[ key ].isNumber = true;
      _saveItems( items );
    }
    if ( !items ) { items = _loadItems(); }
    return items[ key ].birth;
  };

  var _fetchItem = function(key) {
    key = _formattedKey( key );
    var tmp = localStorage.getItem( key );
    var items = _loadItems();
    if ( items[ key ].isObject ) {
      tmp = JSON.parse( tmp );
    } else if ( items[ key ].isNumber ) {
      tmp = parseFloat( tmp );
    }
    return tmp;
  };

  var _formattedKey = function( key ) {
    if ( !_beginsWithPeriod( key ) ) {
      key = '.' + key;
    }
    return NAMESPACE + key;
  };

  var _loadItems = function(namespace) {
    var ns = namespace || NAMESPACE;
    var items = localStorage.getItem( ns );
    if ( !items ) {
      localStorage.setItem( NAMESPACE, JSON.stringify({}) );
    }
    return JSON.parse( localStorage.getItem( ns ) );
  };

  var _saveItems = function(newItems) {
    localStorage.setItem( NAMESPACE, JSON.stringify(newItems) );
  };

  var _birth = function(key) {
    var items = _loadItems();
    items[ key ] = {};
    items[ key ].birth = Date.now();
    _saveItems( items );
  };

  var _kill = function(key) {
    var items = _loadItems();
    delete items[ key ];
    this._saveItems( items );
  };

  var _isTooOld = function(key) {
    return GoodLife.store.age( key ) > MAX_AGE;
  };

  var _markAccess = function(key) {
    if ( GoodLife.store.itemExists( key ) ) {
      var items = _loadItems();
      items[ key ].lastAccess = Date.now();
      _saveItems( items );
    }
  };

  var _exists = function(key) {
    key = _formattedKey( key );
    var items = _loadItems();
    if ( localStorage.getItem( key ) && items[ key ] ) {
      return true;
    }
    return false;
  };

  var _remove = function(key) {
    key = _formattedKey( key );
    if ( GoodLife.store.localStorageSupport() ) {
      var items = _loadItems();
      localStorage.removeItem(key);
      delete items[ key ];
      _saveItems( items );
    }
  };

  var _age = function(key) {
    var items = _loadItems();
    if ( _exists( key ) ) {
      var items = _loadItems();
      var fkey = _formattedKey( key );
      if ( items[ fkey ] ) {
        var age = Date.now() - items[ fkey ].birth;
        return age;
      }
    }
  };

  /*
  ------------- Public API ---------------
  */

  GoodLife.store = {

    setNamespace: function(ns) {
      if ( !_endsWithPeriod( ns ) ) {
        NAMESPACE = ns + '.items';
      } else {
        NAMESPACE = ns + 'items';
      }
    },

    originalNamespace: function() {
      NAMESPACE = 'gl.items';
    },

    setCacheMaxAge: function (age) {
      MAX_AGE = age;
    },

    getCacheMaxAge: function() {
      return MAX_AGE;
    },

    itemExists: function(key) {
      return _exists( key );
    },

    age: function(key) {
      return _age(key);
    },

    init: function() {
      localStorage.setItem( NAMESPACE, JSON.stringify({}) );
    },

    localStorageSupport: function() {
      try {
        return 'localStorage' in window && window['localStorage'] !== null;
      } catch (e) {
        return false;
      }
    },

    get: function(key) {
      if ( this.localStorageSupport() ) {
        if ( !_isTooOld( key ) ) {
          return _fetchItem( key );
        }
      }
    },

    save: function(key, data, namespace) {
      if ( this.localStorageSupport() ) {
        _writeItem( key, data );
      }
    },

    remove: function(key) {
      _remove(key);
    },

    clear: function() {
      if ( this.localStorageSupport() ) {
        // for (var key in localStorage) {
        //   if ( _isKeyForNamespace( key ) ) {
        //     // console.log('delete me\n')
        //   }
        // }
        localStorage.clear();
        this.init();
      }
    }
  };

})(window.GoodLife = window.GoodLife || {});
