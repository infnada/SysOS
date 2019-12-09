/**
 * TODO:
 * full typescript rewrite
 * remove jquery-ui dependency
 * remove jquery dependency
 */

declare global {
  interface Array<T> {
    push8(aByte: T): void;
    push16(aWord: T): void;
    push32(aLongWord: T): void;
    push16le(aWord: T): void;
    push32le(aLongWord: T): void;
  }
}
export function WmksLib($) {

  (function($) {

    $.ui = $.ui || {};

    var version = $.ui.version = "1.12.1";


    /*!
 * jQuery UI Widget 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Widget
//>>group: Core
//>>description: Provides a factory for creating stateful widgets with a common API.
//>>docs: http://api.jqueryui.com/jQuery.widget/
//>>demos: http://jqueryui.com/widget/



    var widgetUuid = 0;
    var widgetSlice = Array.prototype.slice;

    $.cleanData = ( function( orig ) {
      return function( elems ) {
        var events, elem, i;
        for ( i = 0; ( elem = elems[ i ] ) != null; i++ ) {
          try {

            // Only trigger remove when necessary to save time
            events = $._data( elem, "events" );
            if ( events && events.remove ) {
              $( elem ).triggerHandler( "remove" );
            }

            // Http://bugs.jquery.com/ticket/8235
          } catch ( e ) {}
        }
        orig( elems );
      };
    } )( $.cleanData );

    $.widget = function( name, base, prototype ) {
      var existingConstructor, constructor, basePrototype;

      // ProxiedPrototype allows the provided prototype to remain unmodified
      // so that it can be used as a mixin for multiple widgets (#8876)
      var proxiedPrototype = {};

      var namespace = name.split( "." )[ 0 ];
      name = name.split( "." )[ 1 ];
      var fullName = namespace + "-" + name;

      if ( !prototype ) {
        prototype = base;
        base = $.Widget;
      }

      if ( $.isArray( prototype ) ) {
        prototype = $.extend.apply( null, [ {} ].concat( prototype ) );
      }

      // Create selector for plugin
      $.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
        return !!$.data( elem, fullName );
      };

      $[ namespace ] = $[ namespace ] || {};
      existingConstructor = $[ namespace ][ name ];
      constructor = $[ namespace ][ name ] = function( options, element ) {

        // Allow instantiation without "new" keyword
        if ( !this._createWidget ) {
          return new constructor( options, element );
        }

        // Allow instantiation without initializing for simple inheritance
        // must use "new" keyword (the code above always passes args)
        if ( arguments.length ) {
          this._createWidget( options, element );
        }
      };

      // Extend with the existing constructor to carry over any static properties
      $.extend( constructor, existingConstructor, {
        version: prototype.version,

        // Copy the object used to create the prototype in case we need to
        // redefine the widget later
        _proto: $.extend( {}, prototype ),

        // Track widgets that inherit from this widget in case this widget is
        // redefined after a widget inherits from it
        _childConstructors: []
      } );

      basePrototype = new base();

      // We need to make the options hash a property directly on the new instance
      // otherwise we'll modify the options hash on the prototype that we're
      // inheriting from
      basePrototype.options = $.widget.extend( {}, basePrototype.options );
      $.each( prototype, function( prop, value ) {
        if ( !$.isFunction( value ) ) {
          proxiedPrototype[ prop ] = value;
          return;
        }
        proxiedPrototype[ prop ] = ( function() {
          function _super() {
            return base.prototype[ prop ].apply( this, arguments );
          }

          function _superApply( args ) {
            return base.prototype[ prop ].apply( this, args );
          }

          return function() {
            var __super = this._super;
            var __superApply = this._superApply;
            var returnValue;

            this._super = _super;
            this._superApply = _superApply;

            returnValue = value.apply( this, arguments );

            this._super = __super;
            this._superApply = __superApply;

            return returnValue;
          };
        } )();
      } );
      constructor.prototype = $.widget.extend( basePrototype, {

        // TODO: remove support for widgetEventPrefix
        // always use the name + a colon as the prefix, e.g., draggable:start
        // don't prefix for widgets that aren't DOM-based
        widgetEventPrefix: existingConstructor ? ( basePrototype.widgetEventPrefix || name ) : name
      }, proxiedPrototype, {
        constructor: constructor,
        namespace: namespace,
        widgetName: name,
        widgetFullName: fullName
      } );

      // If this widget is being redefined then we need to find all widgets that
      // are inheriting from it and redefine all of them so that they inherit from
      // the new version of this widget. We're essentially trying to replace one
      // level in the prototype chain.
      if ( existingConstructor ) {
        $.each( existingConstructor._childConstructors, function( i, child ) {
          var childPrototype = child.prototype;

          // Redefine the child widget using the same prototype that was
          // originally used, but inherit from the new version of the base
          $.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor,
            child._proto );
        } );

        // Remove the list of existing child constructors from the old constructor
        // so the old child constructors can be garbage collected
        delete existingConstructor._childConstructors;
      } else {
        base._childConstructors.push( constructor );
      }

      $.widget.bridge( name, constructor );

      return constructor;
    };

    $.widget.extend = function( target ) {
      var input = widgetSlice.call( arguments, 1 );
      var inputIndex = 0;
      var inputLength = input.length;
      var key;
      var value;

      for ( ; inputIndex < inputLength; inputIndex++ ) {
        for ( key in input[ inputIndex ] ) {
          value = input[ inputIndex ][ key ];
          if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {

            // Clone objects
            if ( $.isPlainObject( value ) ) {
              target[ key ] = $.isPlainObject( target[ key ] ) ?
                $.widget.extend( {}, target[ key ], value ) :

                // Don't extend strings, arrays, etc. with objects
                $.widget.extend( {}, value );

              // Copy everything else by reference
            } else {
              target[ key ] = value;
            }
          }
        }
      }
      return target;
    };

    $.widget.bridge = function( name, object ) {
      var fullName = object.prototype.widgetFullName || name;
      $.fn[ name ] = function( options ) {
        var isMethodCall = typeof options === "string";
        var args = widgetSlice.call( arguments, 1 );
        var returnValue = this;

        if ( isMethodCall ) {

          // If this is an empty collection, we need to have the instance method
          // return undefined instead of the jQuery instance
          if ( !this.length && options === "instance" ) {
            returnValue = undefined;
          } else {
            this.each( function() {
              var methodValue;
              var instance = $.data( this, fullName );

              if ( options === "instance" ) {
                returnValue = instance;
                return false;
              }

              if ( !instance ) {
                return $.error( "cannot call methods on " + name +
                  " prior to initialization; " +
                  "attempted to call method '" + options + "'" );
              }

              if ( !$.isFunction( instance[ options ] ) || options.charAt( 0 ) === "_" ) {
                return $.error( "no such method '" + options + "' for " + name +
                  " widget instance" );
              }

              methodValue = instance[ options ].apply( instance, args );

              if ( methodValue !== instance && methodValue !== undefined ) {
                returnValue = methodValue && methodValue.jquery ?
                  returnValue.pushStack( methodValue.get() ) :
                  methodValue;
                return false;
              }
            } );
          }
        } else {

          // Allow multiple hashes to be passed on init
          if ( args.length ) {
            options = $.widget.extend.apply( null, [ options ].concat( args ) );
          }

          this.each( function() {
            var instance = $.data( this, fullName );
            if ( instance ) {
              instance.option( options || {} );
              if ( instance._init ) {
                instance._init();
              }
            } else {
              $.data( this, fullName, new object( options, this ) );
            }
          } );
        }

        return returnValue;
      };
    };

    $.Widget = function( /* options, element */ ) {};
    $.Widget._childConstructors = [];

    $.Widget.prototype = {
      widgetName: "widget",
      widgetEventPrefix: "",
      defaultElement: "<div>",

      options: {
        classes: {},
        disabled: false,

        // Callbacks
        create: null
      },

      _createWidget: function( options, element ) {
        element = $( element || this.defaultElement || this )[ 0 ];
        this.element = $( element );
        this.uuid = widgetUuid++;
        this.eventNamespace = "." + this.widgetName + this.uuid;

        this.bindings = $();
        this.hoverable = $();
        this.focusable = $();
        this.classesElementLookup = {};

        if ( element !== this ) {
          $.data( element, this.widgetFullName, this );
          this._on( true, this.element, {
            remove: function( event ) {
              if ( event.target === element ) {
                this.destroy();
              }
            }
          } );
          this.document = $( element.style ?

            // Element within the document
            element.ownerDocument :

            // Element is window or document
            element.document || element );
          this.window = $( this.document[ 0 ].defaultView || this.document[ 0 ].parentWindow );
        }

        this.options = $.widget.extend( {},
          this.options,
          this._getCreateOptions(),
          options );

        this._create();

        if ( this.options.disabled ) {
          this._setOptionDisabled( this.options.disabled );
        }

        this._trigger( "create", null, this._getCreateEventData() );
        this._init();
      },

      _getCreateOptions: function() {
        return {};
      },

      _getCreateEventData: $.noop,

      _create: $.noop,

      _init: $.noop,

      destroy: function() {
        var that = this;

        this._destroy();
        $.each( this.classesElementLookup, function( key, value ) {
          that._removeClass( value, key );
        } );

        // We can probably remove the unbind calls in 2.0
        // all event bindings should go through this._on()
        this.element
          .off( this.eventNamespace )
          .removeData( this.widgetFullName );
        this.widget()
          .off( this.eventNamespace )
          .removeAttr( "aria-disabled" );

        // Clean up events and states
        this.bindings.off( this.eventNamespace );
      },

      _destroy: $.noop,

      widget: function() {
        return this.element;
      },

      option: function( key, value ) {
        var options = key;
        var parts;
        var curOption;
        var i;

        if ( arguments.length === 0 ) {

          // Don't return a reference to the internal hash
          return $.widget.extend( {}, this.options );
        }

        if ( typeof key === "string" ) {

          // Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
          options = {};
          parts = key.split( "." );
          key = parts.shift();
          if ( parts.length ) {
            curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
            for ( i = 0; i < parts.length - 1; i++ ) {
              curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
              curOption = curOption[ parts[ i ] ];
            }
            key = parts.pop();
            if ( arguments.length === 1 ) {
              return curOption[ key ] === undefined ? null : curOption[ key ];
            }
            curOption[ key ] = value;
          } else {
            if ( arguments.length === 1 ) {
              return this.options[ key ] === undefined ? null : this.options[ key ];
            }
            options[ key ] = value;
          }
        }

        this._setOptions( options );

        return this;
      },

      _setOptions: function( options ) {
        var key;

        for ( key in options ) {
          this._setOption( key, options[ key ] );
        }

        return this;
      },

      _setOption: function( key, value ) {
        if ( key === "classes" ) {
          this._setOptionClasses( value );
        }

        this.options[ key ] = value;

        if ( key === "disabled" ) {
          this._setOptionDisabled( value );
        }

        return this;
      },

      _setOptionClasses: function( value ) {
        var classKey, elements, currentElements;

        for ( classKey in value ) {
          currentElements = this.classesElementLookup[ classKey ];
          if ( value[ classKey ] === this.options.classes[ classKey ] ||
            !currentElements ||
            !currentElements.length ) {
            continue;
          }

          // We are doing this to create a new jQuery object because the _removeClass() call
          // on the next line is going to destroy the reference to the current elements being
          // tracked. We need to save a copy of this collection so that we can add the new classes
          // below.
          elements = $( currentElements.get() );
          this._removeClass( currentElements, classKey );

          // We don't use _addClass() here, because that uses this.options.classes
          // for generating the string of classes. We want to use the value passed in from
          // _setOption(), this is the new value of the classes option which was passed to
          // _setOption(). We pass this value directly to _classes().
          elements.addClass( this._classes( {
            element: elements,
            keys: classKey,
            classes: value,
            add: true
          } ) );
        }
      },

      _setOptionDisabled: function( value ) {
        this._toggleClass( this.widget(), this.widgetFullName + "-disabled", null, !!value );

        // If the widget is becoming disabled, then nothing is interactive
        if ( value ) {
          this._removeClass( this.hoverable, null, "ui-state-hover" );
          this._removeClass( this.focusable, null, "ui-state-focus" );
        }
      },

      enable: function() {
        return this._setOptions( { disabled: false } );
      },

      disable: function() {
        return this._setOptions( { disabled: true } );
      },

      _classes: function( options ) {
        var full = [];
        var that = this;

        options = $.extend( {
          element: this.element,
          classes: this.options.classes || {}
        }, options );

        function processClassString( classes, checkOption? ) {
          var current, i;
          for ( i = 0; i < classes.length; i++ ) {
            current = that.classesElementLookup[ classes[ i ] ] || $();
            if ( options.add ) {
              current = $( $.unique( current.get().concat( options.element.get() ) ) );
            } else {
              current = $( current.not( options.element ).get() );
            }
            that.classesElementLookup[ classes[ i ] ] = current;
            full.push( classes[ i ] );
            if ( checkOption && options.classes[ classes[ i ] ] ) {
              full.push( options.classes[ classes[ i ] ] );
            }
          }
        }

        this._on( options.element, {
          "remove": "_untrackClassesElement"
        } );

        if ( options.keys ) {
          processClassString( options.keys.match( /\S+/g ) || [], true );
        }
        if ( options.extra ) {
          processClassString( options.extra.match( /\S+/g ) || [] );
        }

        return full.join( " " );
      },

      _untrackClassesElement: function( event ) {
        var that = this;
        $.each( that.classesElementLookup, function( key, value ) {
          if ( $.inArray( event.target, value ) !== -1 ) {
            that.classesElementLookup[ key ] = $( value.not( event.target ).get() );
          }
        } );
      },

      _removeClass: function( element, keys, extra ) {
        return this._toggleClass( element, keys, extra, false );
      },

      _addClass: function( element, keys, extra ) {
        return this._toggleClass( element, keys, extra, true );
      },

      _toggleClass: function( element, keys, extra, add ) {
        add = ( typeof add === "boolean" ) ? add : extra;
        var shift = ( typeof element === "string" || element === null ),
          options = {
            extra: shift ? keys : extra,
            keys: shift ? element : keys,
            element: shift ? this.element : element,
            add: add
          };
        options.element.toggleClass( this._classes( options ), add );
        return this;
      },

      _on: function( suppressDisabledCheck, element, handlers ) {
        var delegateElement;
        var instance = this;

        // No suppressDisabledCheck flag, shuffle arguments
        if ( typeof suppressDisabledCheck !== "boolean" ) {
          handlers = element;
          element = suppressDisabledCheck;
          suppressDisabledCheck = false;
        }

        // No element argument, shuffle and use this.element
        if ( !handlers ) {
          handlers = element;
          element = this.element;
          delegateElement = this.widget();
        } else {
          element = delegateElement = $( element );
          this.bindings = this.bindings.add( element );
        }

        $.each( handlers, function( event, handler ) {
          function handlerProxy() {

            // Allow widgets to customize the disabled handling
            // - disabled as an array instead of boolean
            // - disabled class as method for disabling individual parts
            if ( !suppressDisabledCheck &&
              ( instance.options.disabled === true ||
                $( this ).hasClass( "ui-state-disabled" ) ) ) {
              return;
            }
            return ( typeof handler === "string" ? instance[ handler ] : handler )
              .apply( instance, arguments );
          }

          // Copy the guid so direct unbinding works
          if ( typeof handler !== "string" ) {
            handlerProxy.guid = handler.guid =
              handler.guid || handlerProxy.guid || $.guid++;
          }

          var match = event.match( /^([\w:-]*)\s*(.*)$/ );
          var eventName = match[ 1 ] + instance.eventNamespace;
          var selector = match[ 2 ];

          if ( selector ) {
            delegateElement.on( eventName, selector, handlerProxy );
          } else {
            element.on( eventName, handlerProxy );
          }
        } );
      },

      _off: function( element, eventName ) {
        eventName = ( eventName || "" ).split( " " ).join( this.eventNamespace + " " ) +
          this.eventNamespace;
        element.off( eventName ).off( eventName );

        // Clear the stack to avoid memory leaks (#10056)
        this.bindings = $( this.bindings.not( element ).get() );
        this.focusable = $( this.focusable.not( element ).get() );
        this.hoverable = $( this.hoverable.not( element ).get() );
      },

      _delay: function( handler, delay ) {
        function handlerProxy() {
          return ( typeof handler === "string" ? instance[ handler ] : handler )
            .apply( instance, arguments );
        }
        var instance = this;
        return setTimeout( handlerProxy, delay || 0 );
      },

      _hoverable: function( element ) {
        this.hoverable = this.hoverable.add( element );
        this._on( element, {
          mouseenter: function( event ) {
            this._addClass( $( event.currentTarget ), null, "ui-state-hover" );
          },
          mouseleave: function( event ) {
            this._removeClass( $( event.currentTarget ), null, "ui-state-hover" );
          }
        } );
      },

      _focusable: function( element ) {
        this.focusable = this.focusable.add( element );
        this._on( element, {
          focusin: function( event ) {
            this._addClass( $( event.currentTarget ), null, "ui-state-focus" );
          },
          focusout: function( event ) {
            this._removeClass( $( event.currentTarget ), null, "ui-state-focus" );
          }
        } );
      },

      _trigger: function( type, event, data ) {
        var prop, orig;
        var callback = this.options[ type ];

        data = data || {};
        event = $.Event( event );
        event.type = ( type === this.widgetEventPrefix ?
          type :
          this.widgetEventPrefix + type ).toLowerCase();

        // The original event may come from any element
        // so we need to reset the target on the new event
        event.target = this.element[ 0 ];

        // Copy original event properties over to the new event
        orig = event.originalEvent;
        if ( orig ) {
          for ( prop in orig ) {
            if ( !( prop in event ) ) {
              event[ prop ] = orig[ prop ];
            }
          }
        }

        this.element.trigger( event, data );
        return !( $.isFunction( callback ) &&
          callback.apply( this.element[ 0 ], [ event ].concat( data ) ) === false ||
          event.isDefaultPrevented() );
      }
    };

    $.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
      $.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
        if ( typeof options === "string" ) {
          options = { effect: options };
        }

        var hasOptions;
        var effectName = !options ?
          method :
          options === true || typeof options === "number" ?
            defaultEffect :
            options.effect || defaultEffect;

        options = options || {};
        if ( typeof options === "number" ) {
          options = { duration: options };
        }

        hasOptions = !$.isEmptyObject( options );
        options.complete = callback;

        if ( options.delay ) {
          element.delay( options.delay );
        }

        if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
          element[ method ]( options );
        } else if ( effectName !== method && element[ effectName ] ) {
          element[ effectName ]( options.duration, options.easing, callback );
        } else {
          element.queue( function( next ) {
            $( this )[ method ]();
            if ( callback ) {
              callback.call( element[ 0 ] );
            }
            next();
          } );
        }
      };
    } );

    var widget = $.widget;

    /*!
     * jQuery UI Position 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     *
     * http://api.jqueryui.com/position/
     */


    ( function() {
      var cachedScrollbarWidth,
        max = Math.max,
        abs = Math.abs,
        rhorizontal = /left|center|right/,
        rvertical = /top|center|bottom/,
        roffset = /[\+\-]\d+(\.[\d]+)?%?/,
        rposition = /^\w+/,
        rpercent = /%$/,
        _position = $.fn.position;

      function getOffsets( offsets, width, height ) {
        return [
          parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
          parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
        ];
      }

      function parseCss( element, property ) {
        return parseInt( $.css( element, property ), 10 ) || 0;
      }

      function getDimensions( elem ) {
        var raw = elem[ 0 ];
        if ( raw.nodeType === 9 ) {
          return {
            width: elem.width(),
            height: elem.height(),
            offset: { top: 0, left: 0 }
          };
        }
        if ( $.isWindow( raw ) ) {
          return {
            width: elem.width(),
            height: elem.height(),
            offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
          };
        }
        if ( raw.preventDefault ) {
          return {
            width: 0,
            height: 0,
            offset: { top: raw.pageY, left: raw.pageX }
          };
        }
        return {
          width: elem.outerWidth(),
          height: elem.outerHeight(),
          offset: elem.offset()
        };
      }

      $.position = {
        scrollbarWidth: function() {
          if ( cachedScrollbarWidth !== undefined ) {
            return cachedScrollbarWidth;
          }
          var w1, w2,
            div = $( "<div " +
              "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" +
              "<div style='height:100px;width:auto;'></div></div>" ),
            innerDiv = div.children()[ 0 ];

          $( "body" ).append( div );
          w1 = innerDiv.offsetWidth;
          div.css( "overflow", "scroll" );

          w2 = innerDiv.offsetWidth;

          if ( w1 === w2 ) {
            w2 = div[ 0 ].clientWidth;
          }

          div.remove();

          return ( cachedScrollbarWidth = w1 - w2 );
        },
        getScrollInfo: function( within ) {
          var overflowX = within.isWindow || within.isDocument ? "" :
            within.element.css( "overflow-x" ),
            overflowY = within.isWindow || within.isDocument ? "" :
              within.element.css( "overflow-y" ),
            hasOverflowX = overflowX === "scroll" ||
              ( overflowX === "auto" && within.width < within.element[ 0 ].scrollWidth ),
            hasOverflowY = overflowY === "scroll" ||
              ( overflowY === "auto" && within.height < within.element[ 0 ].scrollHeight );
          return {
            width: hasOverflowY ? $.position.scrollbarWidth() : 0,
            height: hasOverflowX ? $.position.scrollbarWidth() : 0
          };
        },
        getWithinInfo: function( element ) {
          var withinElement = $( element || window ),
            isWindow = $.isWindow( withinElement[ 0 ] ),
            isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9,
            hasOffset = !isWindow && !isDocument;
          return {
            element: withinElement,
            isWindow: isWindow,
            isDocument: isDocument,
            offset: hasOffset ? $( element ).offset() : { left: 0, top: 0 },
            scrollLeft: withinElement.scrollLeft(),
            scrollTop: withinElement.scrollTop(),
            width: withinElement.outerWidth(),
            height: withinElement.outerHeight()
          };
        }
      };

      $.fn.position = function( options ) {
        if ( !options || !options.of ) {
          return _position.apply( this, arguments );
        }

        // Make a copy, we don't want to modify arguments
        options = $.extend( {}, options );

        var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
          target = $( options.of ),
          within = $.position.getWithinInfo( options.within ),
          scrollInfo = $.position.getScrollInfo( within ),
          collision = ( options.collision || "flip" ).split( " " ),
          offsets: any = {};

        dimensions = getDimensions( target );
        if ( target[ 0 ].preventDefault ) {

          // Force left top to allow flipping
          options.at = "left top";
        }
        targetWidth = dimensions.width;
        targetHeight = dimensions.height;
        targetOffset = dimensions.offset;

        // Clone to reuse original targetOffset later
        basePosition = $.extend( {}, targetOffset );

        // Force my and at to have valid horizontal and vertical positions
        // if a value is missing or invalid, it will be converted to center
        $.each( [ "my", "at" ], function() {
          var pos = ( options[ this ] || "" ).split( " " ),
            horizontalOffset,
            verticalOffset;

          if ( pos.length === 1 ) {
            pos = rhorizontal.test( pos[ 0 ] ) ?
              pos.concat( [ "center" ] ) :
              rvertical.test( pos[ 0 ] ) ?
                [ "center" ].concat( pos ) :
                [ "center", "center" ];
          }
          pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
          pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

          // Calculate offsets
          horizontalOffset = roffset.exec( pos[ 0 ] );
          verticalOffset = roffset.exec( pos[ 1 ] );
          offsets[ this ] = [
            horizontalOffset ? horizontalOffset[ 0 ] : 0,
            verticalOffset ? verticalOffset[ 0 ] : 0
          ];

          // Reduce to just the positions without the offsets
          options[ this ] = [
            rposition.exec( pos[ 0 ] )[ 0 ],
            rposition.exec( pos[ 1 ] )[ 0 ]
          ];
        } );

        // Normalize collision option
        if ( collision.length === 1 ) {
          collision[ 1 ] = collision[ 0 ];
        }

        if ( options.at[ 0 ] === "right" ) {
          basePosition.left += targetWidth;
        } else if ( options.at[ 0 ] === "center" ) {
          basePosition.left += targetWidth / 2;
        }

        if ( options.at[ 1 ] === "bottom" ) {
          basePosition.top += targetHeight;
        } else if ( options.at[ 1 ] === "center" ) {
          basePosition.top += targetHeight / 2;
        }

        atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
        basePosition.left += atOffset[ 0 ];
        basePosition.top += atOffset[ 1 ];

        return this.each( function() {
          var collisionPosition, using,
            elem = $( this ),
            elemWidth = elem.outerWidth(),
            elemHeight = elem.outerHeight(),
            marginLeft = parseCss( this, "marginLeft" ),
            marginTop = parseCss( this, "marginTop" ),
            collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) +
              scrollInfo.width,
            collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) +
              scrollInfo.height,
            position = $.extend( {}, basePosition ),
            myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

          if ( options.my[ 0 ] === "right" ) {
            position.left -= elemWidth;
          } else if ( options.my[ 0 ] === "center" ) {
            position.left -= elemWidth / 2;
          }

          if ( options.my[ 1 ] === "bottom" ) {
            position.top -= elemHeight;
          } else if ( options.my[ 1 ] === "center" ) {
            position.top -= elemHeight / 2;
          }

          position.left += myOffset[ 0 ];
          position.top += myOffset[ 1 ];

          collisionPosition = {
            marginLeft: marginLeft,
            marginTop: marginTop
          };

          $.each( [ "left", "top" ], function( i, dir ) {
            if ( $.ui.position[ collision[ i ] ] ) {
              $.ui.position[ collision[ i ] ][ dir ]( position, {
                targetWidth: targetWidth,
                targetHeight: targetHeight,
                elemWidth: elemWidth,
                elemHeight: elemHeight,
                collisionPosition: collisionPosition,
                collisionWidth: collisionWidth,
                collisionHeight: collisionHeight,
                offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
                my: options.my,
                at: options.at,
                within: within,
                elem: elem
              } );
            }
          } );

          if ( options.using ) {

            // Adds feedback as second argument to using callback, if present
            using = function( props ) {
              var left = targetOffset.left - position.left,
                right = left + targetWidth - elemWidth,
                top = targetOffset.top - position.top,
                bottom = top + targetHeight - elemHeight,
                feedback: any = {
                  target: {
                    element: target,
                    left: targetOffset.left,
                    top: targetOffset.top,
                    width: targetWidth,
                    height: targetHeight
                  },
                  element: {
                    element: elem,
                    left: position.left,
                    top: position.top,
                    width: elemWidth,
                    height: elemHeight
                  },
                  horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
                  vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
                };
              if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
                feedback.horizontal = "center";
              }
              if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
                feedback.vertical = "middle";
              }
              if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
                feedback.important = "horizontal";
              } else {
                feedback.important = "vertical";
              }
              options.using.call( this, props, feedback );
            };
          }

          elem.offset( $.extend( position, { using: using } ) );
        } );
      };

      $.ui.position = {
        fit: {
          left: function( position, data ) {
            var within = data.within,
              withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
              outerWidth = within.width,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = withinOffset - collisionPosLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
              newOverRight;

            // Element is wider than within
            if ( data.collisionWidth > outerWidth ) {

              // Element is initially over the left side of within
              if ( overLeft > 0 && overRight <= 0 ) {
                newOverRight = position.left + overLeft + data.collisionWidth - outerWidth -
                  withinOffset;
                position.left += overLeft - newOverRight;

                // Element is initially over right side of within
              } else if ( overRight > 0 && overLeft <= 0 ) {
                position.left = withinOffset;

                // Element is initially over both left and right sides of within
              } else {
                if ( overLeft > overRight ) {
                  position.left = withinOffset + outerWidth - data.collisionWidth;
                } else {
                  position.left = withinOffset;
                }
              }

              // Too far left -> align with left edge
            } else if ( overLeft > 0 ) {
              position.left += overLeft;

              // Too far right -> align with right edge
            } else if ( overRight > 0 ) {
              position.left -= overRight;

              // Adjust based on position and margin
            } else {
              position.left = max( position.left - collisionPosLeft, position.left );
            }
          },
          top: function( position, data ) {
            var within = data.within,
              withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
              outerHeight = data.within.height,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = withinOffset - collisionPosTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
              newOverBottom;

            // Element is taller than within
            if ( data.collisionHeight > outerHeight ) {

              // Element is initially over the top of within
              if ( overTop > 0 && overBottom <= 0 ) {
                newOverBottom = position.top + overTop + data.collisionHeight - outerHeight -
                  withinOffset;
                position.top += overTop - newOverBottom;

                // Element is initially over bottom of within
              } else if ( overBottom > 0 && overTop <= 0 ) {
                position.top = withinOffset;

                // Element is initially over both top and bottom of within
              } else {
                if ( overTop > overBottom ) {
                  position.top = withinOffset + outerHeight - data.collisionHeight;
                } else {
                  position.top = withinOffset;
                }
              }

              // Too far up -> align with top
            } else if ( overTop > 0 ) {
              position.top += overTop;

              // Too far down -> align with bottom edge
            } else if ( overBottom > 0 ) {
              position.top -= overBottom;

              // Adjust based on position and margin
            } else {
              position.top = max( position.top - collisionPosTop, position.top );
            }
          }
        },
        flip: {
          left: function( position, data ) {
            var within = data.within,
              withinOffset = within.offset.left + within.scrollLeft,
              outerWidth = within.width,
              offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
              collisionPosLeft = position.left - data.collisionPosition.marginLeft,
              overLeft = collisionPosLeft - offsetLeft,
              overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
              myOffset = data.my[ 0 ] === "left" ?
                -data.elemWidth :
                data.my[ 0 ] === "right" ?
                  data.elemWidth :
                  0,
              atOffset = data.at[ 0 ] === "left" ?
                data.targetWidth :
                data.at[ 0 ] === "right" ?
                  -data.targetWidth :
                  0,
              offset = -2 * data.offset[ 0 ],
              newOverRight,
              newOverLeft;

            if ( overLeft < 0 ) {
              newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth -
                outerWidth - withinOffset;
              if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
                position.left += myOffset + atOffset + offset;
              }
            } else if ( overRight > 0 ) {
              newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset +
                atOffset + offset - offsetLeft;
              if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
                position.left += myOffset + atOffset + offset;
              }
            }
          },
          top: function( position, data ) {
            var within = data.within,
              withinOffset = within.offset.top + within.scrollTop,
              outerHeight = within.height,
              offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
              collisionPosTop = position.top - data.collisionPosition.marginTop,
              overTop = collisionPosTop - offsetTop,
              overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
              top = data.my[ 1 ] === "top",
              myOffset = top ?
                -data.elemHeight :
                data.my[ 1 ] === "bottom" ?
                  data.elemHeight :
                  0,
              atOffset = data.at[ 1 ] === "top" ?
                data.targetHeight :
                data.at[ 1 ] === "bottom" ?
                  -data.targetHeight :
                  0,
              offset = -2 * data.offset[ 1 ],
              newOverTop,
              newOverBottom;
            if ( overTop < 0 ) {
              newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight -
                outerHeight - withinOffset;
              if ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) {
                position.top += myOffset + atOffset + offset;
              }
            } else if ( overBottom > 0 ) {
              newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset +
                offset - offsetTop;
              if ( newOverTop > 0 || abs( newOverTop ) < overBottom ) {
                position.top += myOffset + atOffset + offset;
              }
            }
          }
        },
        flipfit: {
          left: function() {
            $.ui.position.flip.left.apply( this, arguments );
            $.ui.position.fit.left.apply( this, arguments );
          },
          top: function() {
            $.ui.position.flip.top.apply( this, arguments );
            $.ui.position.fit.top.apply( this, arguments );
          }
        }
      };

    } )();

    var position = $.ui.position;

    /*!
     * jQuery UI :data 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var data = $.extend( $.expr[ ":" ], {
      data: $.expr.createPseudo ?
        $.expr.createPseudo( function( dataName ) {
          return function( elem ) {
            return !!$.data( elem, dataName );
          };
        } ) :

        // Support: jQuery <1.8
        function( elem, i, match ) {
          return !!$.data( elem, match[ 3 ] );
        }
    } );

    /*!
     * jQuery UI Disable Selection 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var disableSelection = $.fn.extend( {
      disableSelection: ( function() {
        var eventType = "onselectstart" in document.createElement( "div" ) ?
          "selectstart" :
          "mousedown";

        return function() {
          return this.on( eventType + ".ui-disableSelection", function( event ) {
            event.preventDefault();
          } );
        };
      } )(),

      enableSelection: function() {
        return this.off( ".ui-disableSelection" );
      }
    } );


    /*!
     * jQuery UI Focusable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.ui.focusable = function( element, hasTabindex ) {
      var map, mapName, img, focusableIfVisible, fieldset,
        nodeName = element.nodeName.toLowerCase();

      if ( "area" === nodeName ) {
        map = element.parentNode;
        mapName = map.name;
        if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
          return false;
        }
        img = $( "img[usemap='#" + mapName + "']" );
        return img.length > 0 && img.is( ":visible" );
      }

      if ( /^(input|select|textarea|button|object)$/.test( nodeName ) ) {
        focusableIfVisible = !element.disabled;

        if ( focusableIfVisible ) {

          // Form controls within a disabled fieldset are disabled.
          // However, controls within the fieldset's legend do not get disabled.
          // Since controls generally aren't placed inside legends, we skip
          // this portion of the check.
          fieldset = $( element ).closest( "fieldset" )[ 0 ];
          if ( fieldset ) {
            focusableIfVisible = !fieldset.disabled;
          }
        }
      } else if ( "a" === nodeName ) {
        focusableIfVisible = element.href || hasTabindex;
      } else {
        focusableIfVisible = hasTabindex;
      }

      return focusableIfVisible && $( element ).is( ":visible" ) && visible( $( element ) );
    };

    function visible( element ) {
      var visibility = element.css( "visibility" );
      while ( visibility === "inherit" ) {
        element = element.parent();
        visibility = element.css( "visibility" );
      }
      return visibility !== "hidden";
    }

    $.extend( $.expr[ ":" ], {
      focusable: function( element ) {
        return $.ui.focusable( element, $.attr( element, "tabindex" ) != null );
      }
    } );

    var focusable = $.ui.focusable;

    var form = $.fn.form = function() {
      return typeof this[ 0 ].form === "string" ? this.closest( "form" ) : $( this[ 0 ].form );
    };


    /*!
     * jQuery UI Form Reset Mixin 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var formResetMixin = $.ui.formResetMixin = {
      _formResetHandler: function() {
        var form = $( this );

        // Wait for the form reset to actually happen before refreshing
        setTimeout( function() {
          var instances = form.data( "ui-form-reset-instances" );
          $.each( instances, function() {
            this.refresh();
          } );
        } );
      },

      _bindFormResetHandler: function() {
        this.form = this.element.form();
        if ( !this.form.length ) {
          return;
        }

        var instances = this.form.data( "ui-form-reset-instances" ) || [];
        if ( !instances.length ) {

          // We don't use _on() here because we use a single event handler per form
          this.form.on( "reset.ui-form-reset", this._formResetHandler );
        }
        instances.push( this );
        this.form.data( "ui-form-reset-instances", instances );
      },

      _unbindFormResetHandler: function() {
        if ( !this.form.length ) {
          return;
        }

        var instances = this.form.data( "ui-form-reset-instances" );
        instances.splice( $.inArray( this, instances ), 1 );
        if ( instances.length ) {
          this.form.data( "ui-form-reset-instances", instances );
        } else {
          this.form
            .removeData( "ui-form-reset-instances" )
            .off( "reset.ui-form-reset" );
        }
      }
    };

    /*!
     * jQuery UI Keycode 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var keycode = $.ui.keyCode = {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    };

    var escapeSelector = $.ui.escapeSelector = ( function() {
      var selectorEscape = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
      return function( selector ) {
        return selector.replace( selectorEscape, "\\$1" );
      };
    } )();


    /*!
     * jQuery UI Labels 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var labels = $.fn.labels = function() {
      var ancestor, selector, id, labels, ancestors;

      // Check control.labels first
      if ( this[ 0 ].labels && this[ 0 ].labels.length ) {
        return this.pushStack( this[ 0 ].labels );
      }

      // Support: IE <= 11, FF <= 37, Android <= 2.3 only
      // Above browsers do not support control.labels. Everything below is to support them
      // as well as document fragments. control.labels does not work on document fragments
      labels = this.eq( 0 ).parents( "label" );

      // Look for the label based on the id
      id = this.attr( "id" );
      if ( id ) {

        // We don't search against the document in case the element
        // is disconnected from the DOM
        ancestor = this.eq( 0 ).parents().last();

        // Get a full set of top level ancestors
        ancestors = ancestor.add( ancestor.length ? ancestor.siblings() : this.siblings() );

        // Create a selector for the label based on the id
        selector = "label[for='" + $.ui.escapeSelector( id ) + "']";

        labels = labels.add( ancestors.find( selector ).addBack( selector ) );

      }

      // Return whatever we have found for labels
      return this.pushStack( labels );
    };

    /*!
     * jQuery UI Scroll Parent 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var scrollParent = $.fn.scrollParent = function( includeHidden ) {
      var position = this.css( "position" ),
        excludeStaticParent = position === "absolute",
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
        scrollParent = this.parents().filter( function() {
          var parent = $( this );
          if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
            return false;
          }
          return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) +
            parent.css( "overflow-x" ) );
        } ).eq( 0 );

      return position === "fixed" || !scrollParent.length ?
        $( this[ 0 ].ownerDocument || document ) :
        scrollParent;
    };

    /*!
     * jQuery UI Tabbable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var tabbable = $.extend( $.expr[ ":" ], {
      tabbable: function( element ) {
        var tabIndex = $.attr( element, "tabindex" ),
          hasTabindex = tabIndex != null;
        return ( !hasTabindex || tabIndex >= 0 ) && $.ui.focusable( element, hasTabindex );
      }
    } );

    /*!
     * jQuery UI Unique ID 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var uniqueId = $.fn.extend( {
      uniqueId: ( function() {
        var uuid = 0;

        return function() {
          return this.each( function() {
            if ( !this.id ) {
              this.id = "ui-id-" + ( ++uuid );
            }
          } );
        };
      } )(),

      removeUniqueId: function() {
        return this.each( function() {
          if ( /^ui-id-\d+$/.test( this.id ) ) {
            $( this ).removeAttr( "id" );
          }
        } );
      }
    } );

    var ie = $.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

    /*!
     * jQuery UI Mouse 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var mouseHandled = false;
    $( document ).on( "mouseup", function() {
      mouseHandled = false;
    } );

    var widgetsMouse = $.widget( "ui.mouse", {
      version: "1.12.1",
      options: {
        cancel: "input, textarea, button, select, option",
        distance: 1,
        delay: 0
      },
      _mouseInit: function() {
        var that = this;

        this.element
          .on( "mousedown." + this.widgetName, function( event ) {
            return that._mouseDown( event );
          } )
          .on( "click." + this.widgetName, function( event ) {
            if ( true === $.data( event.target, that.widgetName + ".preventClickEvent" ) ) {
              $.removeData( event.target, that.widgetName + ".preventClickEvent" );
              event.stopImmediatePropagation();
              return false;
            }
          } );

        this.started = false;
      },

      // TODO: make sure destroying one instance of mouse doesn't mess with
      // other instances of mouse
      _mouseDestroy: function() {
        this.element.off( "." + this.widgetName );
        if ( this._mouseMoveDelegate ) {
          this.document
            .off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
            .off( "mouseup." + this.widgetName, this._mouseUpDelegate );
        }
      },

      _mouseDown: function( event ) {

        // don't let more than one widget handle mouseStart
        if ( mouseHandled ) {
          return;
        }

        this._mouseMoved = false;

        // We may have missed mouseup (out of window)
        ( this._mouseStarted && this._mouseUp( event ) );

        this._mouseDownEvent = event;

        var that = this,
          btnIsLeft = ( event.which === 1 ),

          // event.target.nodeName works around a bug in IE 8 with
          // disabled inputs (#7620)
          elIsCancel = ( typeof this.options.cancel === "string" && event.target.nodeName ?
            $( event.target ).closest( this.options.cancel ).length : false );
        if ( !btnIsLeft || elIsCancel || !this._mouseCapture( event ) ) {
          return true;
        }

        this.mouseDelayMet = !this.options.delay;
        if ( !this.mouseDelayMet ) {
          this._mouseDelayTimer = setTimeout( function() {
            that.mouseDelayMet = true;
          }, this.options.delay );
        }

        if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
          this._mouseStarted = ( this._mouseStart( event ) !== false );
          if ( !this._mouseStarted ) {
            event.preventDefault();
            return true;
          }
        }

        // Click event may never have fired (Gecko & Opera)
        if ( true === $.data( event.target, this.widgetName + ".preventClickEvent" ) ) {
          $.removeData( event.target, this.widgetName + ".preventClickEvent" );
        }

        // These delegates are required to keep context
        this._mouseMoveDelegate = function( event ) {
          return that._mouseMove( event );
        };
        this._mouseUpDelegate = function( event ) {
          return that._mouseUp( event );
        };

        this.document
          .on( "mousemove." + this.widgetName, this._mouseMoveDelegate )
          .on( "mouseup." + this.widgetName, this._mouseUpDelegate );

        event.preventDefault();

        mouseHandled = true;
        return true;
      },

      _mouseMove: function( event ) {

        // Only check for mouseups outside the document if you've moved inside the document
        // at least once. This prevents the firing of mouseup in the case of IE<9, which will
        // fire a mousemove event if content is placed under the cursor. See #7778
        // Support: IE <9
        if ( this._mouseMoved ) {

          // IE mouseup check - mouseup happened when mouse was out of window
          // @ts-ignore
          if ( $.ui.ie && ( !document.documentMode || document.documentMode < 9 ) &&
            !event.button ) {
            return this._mouseUp( event );

            // Iframe mouseup check - mouseup occurred in another document
          } else if ( !event.which ) {

            // Support: Safari <=8 - 9
            // Safari sets which to 0 if you press any of the following keys
            // during a drag (#14461)
            if ( event.originalEvent.altKey || event.originalEvent.ctrlKey ||
              event.originalEvent.metaKey || event.originalEvent.shiftKey ) {
              this.ignoreMissingWhich = true;
            } else if ( !this.ignoreMissingWhich ) {
              return this._mouseUp( event );
            }
          }
        }

        if ( event.which || event.button ) {
          this._mouseMoved = true;
        }

        if ( this._mouseStarted ) {
          this._mouseDrag( event );
          return event.preventDefault();
        }

        if ( this._mouseDistanceMet( event ) && this._mouseDelayMet( event ) ) {
          this._mouseStarted =
            ( this._mouseStart( this._mouseDownEvent, event ) !== false );
          ( this._mouseStarted ? this._mouseDrag( event ) : this._mouseUp( event ) );
        }

        return !this._mouseStarted;
      },

      _mouseUp: function( event ) {
        this.document
          .off( "mousemove." + this.widgetName, this._mouseMoveDelegate )
          .off( "mouseup." + this.widgetName, this._mouseUpDelegate );

        if ( this._mouseStarted ) {
          this._mouseStarted = false;

          if ( event.target === this._mouseDownEvent.target ) {
            $.data( event.target, this.widgetName + ".preventClickEvent", true );
          }

          this._mouseStop( event );
        }

        if ( this._mouseDelayTimer ) {
          clearTimeout( this._mouseDelayTimer );
          delete this._mouseDelayTimer;
        }

        this.ignoreMissingWhich = false;
        mouseHandled = false;
        event.preventDefault();
      },

      _mouseDistanceMet: function( event ) {
        return ( Math.max(
            Math.abs( this._mouseDownEvent.pageX - event.pageX ),
            Math.abs( this._mouseDownEvent.pageY - event.pageY )
          ) >= this.options.distance
        );
      },

      _mouseDelayMet: function( /* event */ ) {
        return this.mouseDelayMet;
      },

      // These are placeholder methods, to be overriden by extending plugin
      _mouseStart: function( /* event */ ) {},
      _mouseDrag: function( /* event */ ) {},
      _mouseStop: function( /* event */ ) {},
      _mouseCapture: function( /* event */ ) { return true; }
    } );

    var plugin = $.ui.plugin = {
      add: function( module, option, set ) {
        var i,
          proto = $.ui[ module ].prototype;
        for ( i in set ) {
          proto.plugins[ i ] = proto.plugins[ i ] || [];
          proto.plugins[ i ].push( [ option, set[ i ] ] );
        }
      },
      call: function( instance, name, args, allowDisconnected ) {
        var i,
          set = instance.plugins[ name ];

        if ( !set ) {
          return;
        }

        if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode ||
          instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
          return;
        }

        for ( i = 0; i < set.length; i++ ) {
          if ( instance.options[ set[ i ][ 0 ] ] ) {
            set[ i ][ 1 ].apply( instance.element, args );
          }
        }
      }
    };

    var safeActiveElement = $.ui.safeActiveElement = function( document ) {
      var activeElement;

      // Support: IE 9 only
      // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
      try {
        activeElement = document.activeElement;
      } catch ( error ) {
        activeElement = document.body;
      }

      // Support: IE 9 - 11 only
      // IE may return null instead of an element
      // Interestingly, this only seems to occur when NOT in an iframe
      if ( !activeElement ) {
        activeElement = document.body;
      }

      // Support: IE 11 only
      // IE11 returns a seemingly empty object in some cases when accessing
      // document.activeElement from an <iframe>
      if ( !activeElement.nodeName ) {
        activeElement = document.body;
      }

      return activeElement;
    };

    var safeBlur = $.ui.safeBlur = function( element ) {

      // Support: IE9 - 10 only
      // If the <body> is blurred, IE will switch windows, see #9420
      if ( element && element.nodeName.toLowerCase() !== "body" ) {
        $( element ).trigger( "blur" );
      }
    };

    /*!
     * jQuery UI Draggable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.widget( "ui.draggable", $.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "drag",
      options: {
        addClasses: true,
        appendTo: "parent",
        axis: false,
        connectToSortable: false,
        containment: false,
        cursor: "auto",
        cursorAt: false,
        grid: false,
        handle: false,
        helper: "original",
        iframeFix: false,
        opacity: false,
        refreshPositions: false,
        revert: false,
        revertDuration: 500,
        scope: "default",
        scroll: true,
        scrollSensitivity: 20,
        scrollSpeed: 20,
        snap: false,
        snapMode: "both",
        snapTolerance: 20,
        stack: false,
        zIndex: false,

        // Callbacks
        drag: null,
        start: null,
        stop: null
      },
      _create: function() {

        if ( this.options.helper === "original" ) {
          this._setPositionRelative();
        }
        if ( this.options.addClasses ) {
          this._addClass( "ui-draggable" );
        }
        this._setHandleClassName();

        this._mouseInit();
      },

      _setOption: function( key, value ) {
        this._super( key, value );
        if ( key === "handle" ) {
          this._removeHandleClassName();
          this._setHandleClassName();
        }
      },

      _destroy: function() {
        if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
          this.destroyOnClear = true;
          return;
        }
        this._removeHandleClassName();
        this._mouseDestroy();
      },

      _mouseCapture: function( event ) {
        var o = this.options;

        // Among others, prevent a drag on a resizable-handle
        if ( this.helper || o.disabled ||
          $( event.target ).closest( ".ui-resizable-handle" ).length > 0 ) {
          return false;
        }

        //Quit if we're not on a valid handle
        this.handle = this._getHandle( event );
        if ( !this.handle ) {
          return false;
        }

        this._blurActiveElement( event );

        this._blockFrames( o.iframeFix === true ? "iframe" : o.iframeFix );

        return true;

      },

      _blockFrames: function( selector ) {
        this.iframeBlocks = this.document.find( selector ).map( function() {
          var iframe = $( this );

          return $( "<div>" )
            .css( "position", "absolute" )
            .appendTo( iframe.parent() )
            .outerWidth( iframe.outerWidth() )
            .outerHeight( iframe.outerHeight() )
            .offset( iframe.offset() )[ 0 ];
        } );
      },

      _unblockFrames: function() {
        if ( this.iframeBlocks ) {
          this.iframeBlocks.remove();
          delete this.iframeBlocks;
        }
      },

      _blurActiveElement: function( event ) {
        var activeElement = $.ui.safeActiveElement( this.document[ 0 ] ),
          target = $( event.target );

        // Don't blur if the event occurred on an element that is within
        // the currently focused element
        // See #10527, #12472
        if ( target.closest( activeElement ).length ) {
          return;
        }

        // Blur any element that currently has focus, see #4261
        $.ui.safeBlur( activeElement );
      },

      _mouseStart: function( event ) {

        var o = this.options;

        //Create and append the visible helper
        this.helper = this._createHelper( event );

        this._addClass( this.helper, "ui-draggable-dragging" );

        //Cache the helper size
        this._cacheHelperProportions();

        //If ddmanager is used for droppables, set the global draggable
        if ( $.ui.ddmanager ) {
          $.ui.ddmanager.current = this;
        }

        /*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

        //Cache the margins of the original element
        this._cacheMargins();

        //Store the helper's css position
        this.cssPosition = this.helper.css( "position" );
        this.scrollParent = this.helper.scrollParent( true );
        this.offsetParent = this.helper.offsetParent();
        this.hasFixedAncestor = this.helper.parents().filter( function() {
          return $( this ).css( "position" ) === "fixed";
        } ).length > 0;

        //The element's absolute position on the page minus margins
        this.positionAbs = this.element.offset();
        this._refreshOffsets( event );

        //Generate the original position
        this.originalPosition = this.position = this._generatePosition( event, false );
        this.originalPageX = event.pageX;
        this.originalPageY = event.pageY;

        //Adjust the mouse offset relative to the helper if "cursorAt" is supplied
        ( o.cursorAt && this._adjustOffsetFromHelper( o.cursorAt ) );

        //Set a containment if given in the options
        this._setContainment();

        //Trigger event + callbacks
        if ( this._trigger( "start", event ) === false ) {
          this._clear();
          return false;
        }

        //Recache the helper size
        this._cacheHelperProportions();

        //Prepare the droppable offsets
        if ( $.ui.ddmanager && !o.dropBehaviour ) {
          $.ui.ddmanager.prepareOffsets( this, event );
        }

        // Execute the drag once - this causes the helper not to be visible before getting its
        // correct position
        this._mouseDrag( event, true );

        // If the ddmanager is used for droppables, inform the manager that dragging has started
        // (see #5003)
        if ( $.ui.ddmanager ) {
          $.ui.ddmanager.dragStart( this, event );
        }

        return true;
      },

      _refreshOffsets: function( event ) {
        this.offset = {
          top: this.positionAbs.top - this.margins.top,
          left: this.positionAbs.left - this.margins.left,
          scroll: false,
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        };

        this.offset.click = {
          left: event.pageX - this.offset.left,
          top: event.pageY - this.offset.top
        };
      },

      _mouseDrag: function( event, noPropagation ) {

        // reset any necessary cached properties (see #5009)
        if ( this.hasFixedAncestor ) {
          this.offset.parent = this._getParentOffset();
        }

        //Compute the helpers position
        this.position = this._generatePosition( event, true );
        this.positionAbs = this._convertPositionTo( "absolute" );

        //Call plugins and callbacks and use the resulting position if something is returned
        if ( !noPropagation ) {
          var ui = this._uiHash();
          if ( this._trigger( "drag", event, ui ) === false ) {
            this._mouseUp( new $.Event( "mouseup", event ) );
            return false;
          }
          this.position = ui.position;
        }

        this.helper[ 0 ].style.left = this.position.left + "px";
        this.helper[ 0 ].style.top = this.position.top + "px";

        if ( $.ui.ddmanager ) {
          $.ui.ddmanager.drag( this, event );
        }

        return false;
      },

      _mouseStop: function( event ) {

        //If we are using droppables, inform the manager about the drop
        var that = this,
          dropped = false;
        if ( $.ui.ddmanager && !this.options.dropBehaviour ) {
          dropped = $.ui.ddmanager.drop( this, event );
        }

        //if a drop comes from outside (a sortable)
        if ( this.dropped ) {
          dropped = this.dropped;
          this.dropped = false;
        }

        if ( ( this.options.revert === "invalid" && !dropped ) ||
          ( this.options.revert === "valid" && dropped ) ||
          this.options.revert === true || ( $.isFunction( this.options.revert ) &&
            this.options.revert.call( this.element, dropped ) )
        ) {
          $( this.helper ).animate(
            this.originalPosition,
            parseInt( this.options.revertDuration, 10 ),
            function() {
              if ( that._trigger( "stop", event ) !== false ) {
                that._clear();
              }
            }
          );
        } else {
          if ( this._trigger( "stop", event ) !== false ) {
            this._clear();
          }
        }

        return false;
      },

      _mouseUp: function( event ) {
        this._unblockFrames();

        // If the ddmanager is used for droppables, inform the manager that dragging has stopped
        // (see #5003)
        if ( $.ui.ddmanager ) {
          $.ui.ddmanager.dragStop( this, event );
        }

        // Only need to focus if the event occurred on the draggable itself, see #10527
        if ( this.handleElement.is( event.target ) ) {

          // The interaction is over; whether or not the click resulted in a drag,
          // focus the element
          this.element.trigger( "focus" );
        }

        return $.ui.mouse.prototype._mouseUp.call( this, event );
      },

      cancel: function() {

        if ( this.helper.is( ".ui-draggable-dragging" ) ) {
          this._mouseUp( new $.Event( "mouseup", { target: this.element[ 0 ] } ) );
        } else {
          this._clear();
        }

        return this;

      },

      _getHandle: function( event ) {
        return this.options.handle ?
          !!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
          true;
      },

      _setHandleClassName: function() {
        this.handleElement = this.options.handle ?
          this.element.find( this.options.handle ) : this.element;
        this._addClass( this.handleElement, "ui-draggable-handle" );
      },

      _removeHandleClassName: function() {
        this._removeClass( this.handleElement, "ui-draggable-handle" );
      },

      _createHelper: function( event ) {

        var o = this.options,
          helperIsFunction = $.isFunction( o.helper ),
          helper = helperIsFunction ?
            $( o.helper.apply( this.element[ 0 ], [ event ] ) ) :
            ( o.helper === "clone" ?
              this.element.clone().removeAttr( "id" ) :
              this.element );

        if ( !helper.parents( "body" ).length ) {
          helper.appendTo( ( o.appendTo === "parent" ?
            this.element[ 0 ].parentNode :
            o.appendTo ) );
        }

        // Http://bugs.jqueryui.com/ticket/9446
        // a helper function can return the original element
        // which wouldn't have been set to relative in _create
        if ( helperIsFunction && helper[ 0 ] === this.element[ 0 ] ) {
          this._setPositionRelative();
        }

        if ( helper[ 0 ] !== this.element[ 0 ] &&
          !( /(fixed|absolute)/ ).test( helper.css( "position" ) ) ) {
          helper.css( "position", "absolute" );
        }

        return helper;

      },

      _setPositionRelative: function() {
        if ( !( /^(?:r|a|f)/ ).test( this.element.css( "position" ) ) ) {
          this.element[ 0 ].style.position = "relative";
        }
      },

      _adjustOffsetFromHelper: function( obj ) {
        if ( typeof obj === "string" ) {
          obj = obj.split( " " );
        }
        if ( $.isArray( obj ) ) {
          obj = { left: +obj[ 0 ], top: +obj[ 1 ] || 0 };
        }
        if ( "left" in obj ) {
          this.offset.click.left = obj.left + this.margins.left;
        }
        if ( "right" in obj ) {
          this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
        }
        if ( "top" in obj ) {
          this.offset.click.top = obj.top + this.margins.top;
        }
        if ( "bottom" in obj ) {
          this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
        }
      },

      _isRootNode: function( element ) {
        return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
      },

      _getParentOffset: function() {

        //Get the offsetParent and cache its position
        var po = this.offsetParent.offset(),
          document = this.document[ 0 ];

        // This is a special case where we need to modify a offset calculated on start, since the
        // following happened:
        // 1. The position of the helper is absolute, so it's position is calculated based on the
        // next positioned parent
        // 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
        // the document, which means that the scroll is included in the initial calculation of the
        // offset of the parent, and never recalculated upon drag
        if ( this.cssPosition === "absolute" && this.scrollParent[ 0 ] !== document &&
          $.contains( this.scrollParent[ 0 ], this.offsetParent[ 0 ] ) ) {
          po.left += this.scrollParent.scrollLeft();
          po.top += this.scrollParent.scrollTop();
        }

        if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
          po = { top: 0, left: 0 };
        }

        return {
          top: po.top + ( parseInt( this.offsetParent.css( "borderTopWidth" ), 10 ) || 0 ),
          left: po.left + ( parseInt( this.offsetParent.css( "borderLeftWidth" ), 10 ) || 0 )
        };

      },

      _getRelativeOffset: function() {
        if ( this.cssPosition !== "relative" ) {
          return { top: 0, left: 0 };
        }

        var p = this.element.position(),
          scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

        return {
          top: p.top - ( parseInt( this.helper.css( "top" ), 10 ) || 0 ) +
            ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
          left: p.left - ( parseInt( this.helper.css( "left" ), 10 ) || 0 ) +
            ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
        };

      },

      _cacheMargins: function() {
        this.margins = {
          left: ( parseInt( this.element.css( "marginLeft" ), 10 ) || 0 ),
          top: ( parseInt( this.element.css( "marginTop" ), 10 ) || 0 ),
          right: ( parseInt( this.element.css( "marginRight" ), 10 ) || 0 ),
          bottom: ( parseInt( this.element.css( "marginBottom" ), 10 ) || 0 )
        };
      },

      _cacheHelperProportions: function() {
        this.helperProportions = {
          width: this.helper.outerWidth(),
          height: this.helper.outerHeight()
        };
      },

      _setContainment: function() {

        var isUserScrollable, c, ce,
          o = this.options,
          document = this.document[ 0 ];

        this.relativeContainer = null;

        if ( !o.containment ) {
          this.containment = null;
          return;
        }

        if ( o.containment === "window" ) {
          this.containment = [
            $( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
            $( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
            $( window ).scrollLeft() + $( window ).width() -
            this.helperProportions.width - this.margins.left,
            $( window ).scrollTop() +
            ( $( window ).height() || document.body.parentNode.scrollHeight ) -
            this.helperProportions.height - this.margins.top
          ];
          return;
        }

        if ( o.containment === "document" ) {
          this.containment = [
            0,
            0,
            $( document ).width() - this.helperProportions.width - this.margins.left,
            ( $( document ).height() || document.body.parentNode.scrollHeight ) -
            this.helperProportions.height - this.margins.top
          ];
          return;
        }

        if ( o.containment.constructor === Array ) {
          this.containment = o.containment;
          return;
        }

        if ( o.containment === "parent" ) {
          o.containment = this.helper[ 0 ].parentNode;
        }

        c = $( o.containment );
        ce = c[ 0 ];

        if ( !ce ) {
          return;
        }

        isUserScrollable = /(scroll|auto)/.test( c.css( "overflow" ) );

        this.containment = [
          ( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) +
          ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
          ( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) +
          ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
          ( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
          ( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) -
          ( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) -
          this.helperProportions.width -
          this.margins.left -
          this.margins.right,
          ( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
          ( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) -
          ( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) -
          this.helperProportions.height -
          this.margins.top -
          this.margins.bottom
        ];
        this.relativeContainer = c;
      },

      _convertPositionTo: function( d, pos ) {

        if ( !pos ) {
          pos = this.position;
        }

        var mod = d === "absolute" ? 1 : -1,
          scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

        return {
          top: (

            // The absolute mouse position
            pos.top	+

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.top * mod +

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.top * mod -
            ( ( this.cssPosition === "fixed" ?
              -this.offset.scroll.top :
              ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod )
          ),
          left: (

            // The absolute mouse position
            pos.left +

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.left * mod +

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.left * mod	-
            ( ( this.cssPosition === "fixed" ?
              -this.offset.scroll.left :
              ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod )
          )
        };

      },

      _generatePosition: function( event, constrainPosition ) {

        var containment, co, top, left,
          o = this.options,
          scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
          pageX = event.pageX,
          pageY = event.pageY;

        // Cache the scroll
        if ( !scrollIsRootNode || !this.offset.scroll ) {
          this.offset.scroll = {
            top: this.scrollParent.scrollTop(),
            left: this.scrollParent.scrollLeft()
          };
        }

        /*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

        // If we are not dragging yet, we won't check for options
        if ( constrainPosition ) {
          if ( this.containment ) {
            if ( this.relativeContainer ) {
              co = this.relativeContainer.offset();
              containment = [
                this.containment[ 0 ] + co.left,
                this.containment[ 1 ] + co.top,
                this.containment[ 2 ] + co.left,
                this.containment[ 3 ] + co.top
              ];
            } else {
              containment = this.containment;
            }

            if ( event.pageX - this.offset.click.left < containment[ 0 ] ) {
              pageX = containment[ 0 ] + this.offset.click.left;
            }
            if ( event.pageY - this.offset.click.top < containment[ 1 ] ) {
              pageY = containment[ 1 ] + this.offset.click.top;
            }
            if ( event.pageX - this.offset.click.left > containment[ 2 ] ) {
              pageX = containment[ 2 ] + this.offset.click.left;
            }
            if ( event.pageY - this.offset.click.top > containment[ 3 ] ) {
              pageY = containment[ 3 ] + this.offset.click.top;
            }
          }

          if ( o.grid ) {

            //Check for grid elements set to 0 to prevent divide by 0 error causing invalid
            // argument errors in IE (see ticket #6950)
            top = o.grid[ 1 ] ? this.originalPageY + Math.round( ( pageY -
              this.originalPageY ) / o.grid[ 1 ] ) * o.grid[ 1 ] : this.originalPageY;
            pageY = containment ? ( ( top - this.offset.click.top >= containment[ 1 ] ||
              top - this.offset.click.top > containment[ 3 ] ) ?
              top :
              ( ( top - this.offset.click.top >= containment[ 1 ] ) ?
                top - o.grid[ 1 ] : top + o.grid[ 1 ] ) ) : top;

            left = o.grid[ 0 ] ? this.originalPageX +
              Math.round( ( pageX - this.originalPageX ) / o.grid[ 0 ] ) * o.grid[ 0 ] :
              this.originalPageX;
            pageX = containment ? ( ( left - this.offset.click.left >= containment[ 0 ] ||
              left - this.offset.click.left > containment[ 2 ] ) ?
              left :
              ( ( left - this.offset.click.left >= containment[ 0 ] ) ?
                left - o.grid[ 0 ] : left + o.grid[ 0 ] ) ) : left;
          }

          if ( o.axis === "y" ) {
            pageX = this.originalPageX;
          }

          if ( o.axis === "x" ) {
            pageY = this.originalPageY;
          }
        }

        return {
          top: (

            // The absolute mouse position
            pageY -

            // Click offset (relative to the element)
            this.offset.click.top -

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.top -

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.top +
            ( this.cssPosition === "fixed" ?
              -this.offset.scroll.top :
              ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
          ),
          left: (

            // The absolute mouse position
            pageX -

            // Click offset (relative to the element)
            this.offset.click.left -

            // Only for relative positioned nodes: Relative offset from element to offset parent
            this.offset.relative.left -

            // The offsetParent's offset without borders (offset + border)
            this.offset.parent.left +
            ( this.cssPosition === "fixed" ?
              -this.offset.scroll.left :
              ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
          )
        };

      },

      _clear: function() {
        this._removeClass( this.helper, "ui-draggable-dragging" );
        if ( this.helper[ 0 ] !== this.element[ 0 ] && !this.cancelHelperRemoval ) {
          this.helper.remove();
        }
        this.helper = null;
        this.cancelHelperRemoval = false;
        if ( this.destroyOnClear ) {
          this.destroy();
        }
      },

      // From now on bulk stuff - mainly helpers

      _trigger: function( type, event, ui ) {
        ui = ui || this._uiHash();
        $.ui.plugin.call( this, type, [ event, ui, this ], true );

        // Absolute position and offset (see #6884 ) have to be recalculated after plugins
        if ( /^(drag|start|stop)/.test( type ) ) {
          this.positionAbs = this._convertPositionTo( "absolute" );
          ui.offset = this.positionAbs;
        }
        return $.Widget.prototype._trigger.call( this, type, event, ui );
      },

      plugins: {},

      _uiHash: function() {
        return {
          helper: this.helper,
          position: this.position,
          originalPosition: this.originalPosition,
          offset: this.positionAbs
        };
      }

    } );

    $.ui.plugin.add( "draggable", "connectToSortable", {
      start: function( event, ui, draggable ) {
        var uiSortable = $.extend( {}, ui, {
          item: draggable.element
        } );

        draggable.sortables = [];
        $( draggable.options.connectToSortable ).each( function() {
          var sortable = $( this ).sortable( "instance" );

          if ( sortable && !sortable.options.disabled ) {
            draggable.sortables.push( sortable );

            // RefreshPositions is called at drag start to refresh the containerCache
            // which is used in drag. This ensures it's initialized and synchronized
            // with any changes that might have happened on the page since initialization.
            sortable.refreshPositions();
            sortable._trigger( "activate", event, uiSortable );
          }
        } );
      },
      stop: function( event, ui, draggable ) {
        var uiSortable = $.extend( {}, ui, {
          item: draggable.element
        } );

        draggable.cancelHelperRemoval = false;

        $.each( draggable.sortables, function() {
          var sortable = this;

          if ( sortable.isOver ) {
            sortable.isOver = 0;

            // Allow this sortable to handle removing the helper
            draggable.cancelHelperRemoval = true;
            sortable.cancelHelperRemoval = false;

            // Use _storedCSS To restore properties in the sortable,
            // as this also handles revert (#9675) since the draggable
            // may have modified them in unexpected ways (#8809)
            sortable._storedCSS = {
              position: sortable.placeholder.css( "position" ),
              top: sortable.placeholder.css( "top" ),
              left: sortable.placeholder.css( "left" )
            };

            sortable._mouseStop( event );

            // Once drag has ended, the sortable should return to using
            // its original helper, not the shared helper from draggable
            sortable.options.helper = sortable.options._helper;
          } else {

            // Prevent this Sortable from removing the helper.
            // However, don't set the draggable to remove the helper
            // either as another connected Sortable may yet handle the removal.
            sortable.cancelHelperRemoval = true;

            sortable._trigger( "deactivate", event, uiSortable );
          }
        } );
      },
      drag: function( event, ui, draggable ) {
        $.each( draggable.sortables, function() {
          var innermostIntersecting = false,
            sortable = this;

          // Copy over variables that sortable's _intersectsWith uses
          sortable.positionAbs = draggable.positionAbs;
          sortable.helperProportions = draggable.helperProportions;
          sortable.offset.click = draggable.offset.click;

          if ( sortable._intersectsWith( sortable.containerCache ) ) {
            innermostIntersecting = true;

            $.each( draggable.sortables, function() {

              // Copy over variables that sortable's _intersectsWith uses
              this.positionAbs = draggable.positionAbs;
              this.helperProportions = draggable.helperProportions;
              this.offset.click = draggable.offset.click;

              if ( this !== sortable &&
                this._intersectsWith( this.containerCache ) &&
                $.contains( sortable.element[ 0 ], this.element[ 0 ] ) ) {
                innermostIntersecting = false;
              }

              return innermostIntersecting;
            } );
          }

          if ( innermostIntersecting ) {

            // If it intersects, we use a little isOver variable and set it once,
            // so that the move-in stuff gets fired only once.
            if ( !sortable.isOver ) {
              sortable.isOver = 1;

              // Store draggable's parent in case we need to reappend to it later.
              draggable._parent = ui.helper.parent();

              sortable.currentItem = ui.helper
                .appendTo( sortable.element )
                .data( "ui-sortable-item", true );

              // Store helper option to later restore it
              sortable.options._helper = sortable.options.helper;

              sortable.options.helper = function() {
                return ui.helper[ 0 ];
              };

              // Fire the start events of the sortable with our passed browser event,
              // and our own helper (so it doesn't create a new one)
              event.target = sortable.currentItem[ 0 ];
              sortable._mouseCapture( event, true );
              sortable._mouseStart( event, true, true );

              // Because the browser event is way off the new appended portlet,
              // modify necessary variables to reflect the changes
              sortable.offset.click.top = draggable.offset.click.top;
              sortable.offset.click.left = draggable.offset.click.left;
              sortable.offset.parent.left -= draggable.offset.parent.left -
                sortable.offset.parent.left;
              sortable.offset.parent.top -= draggable.offset.parent.top -
                sortable.offset.parent.top;

              draggable._trigger( "toSortable", event );

              // Inform draggable that the helper is in a valid drop zone,
              // used solely in the revert option to handle "valid/invalid".
              draggable.dropped = sortable.element;

              // Need to refreshPositions of all sortables in the case that
              // adding to one sortable changes the location of the other sortables (#9675)
              $.each( draggable.sortables, function() {
                this.refreshPositions();
              } );

              // Hack so receive/update callbacks work (mostly)
              draggable.currentItem = draggable.element;
              sortable.fromOutside = draggable;
            }

            if ( sortable.currentItem ) {
              sortable._mouseDrag( event );

              // Copy the sortable's position because the draggable's can potentially reflect
              // a relative position, while sortable is always absolute, which the dragged
              // element has now become. (#8809)
              ui.position = sortable.position;
            }
          } else {

            // If it doesn't intersect with the sortable, and it intersected before,
            // we fake the drag stop of the sortable, but make sure it doesn't remove
            // the helper by using cancelHelperRemoval.
            if ( sortable.isOver ) {

              sortable.isOver = 0;
              sortable.cancelHelperRemoval = true;

              // Calling sortable's mouseStop would trigger a revert,
              // so revert must be temporarily false until after mouseStop is called.
              sortable.options._revert = sortable.options.revert;
              sortable.options.revert = false;

              sortable._trigger( "out", event, sortable._uiHash( sortable ) );
              sortable._mouseStop( event, true );

              // Restore sortable behaviors that were modfied
              // when the draggable entered the sortable area (#9481)
              sortable.options.revert = sortable.options._revert;
              sortable.options.helper = sortable.options._helper;

              if ( sortable.placeholder ) {
                sortable.placeholder.remove();
              }

              // Restore and recalculate the draggable's offset considering the sortable
              // may have modified them in unexpected ways. (#8809, #10669)
              ui.helper.appendTo( draggable._parent );
              draggable._refreshOffsets( event );
              ui.position = draggable._generatePosition( event, true );

              draggable._trigger( "fromSortable", event );

              // Inform draggable that the helper is no longer in a valid drop zone
              draggable.dropped = false;

              // Need to refreshPositions of all sortables just in case removing
              // from one sortable changes the location of other sortables (#9675)
              $.each( draggable.sortables, function() {
                this.refreshPositions();
              } );
            }
          }
        } );
      }
    } );

    $.ui.plugin.add( "draggable", "cursor", {
      start: function( event, ui, instance ) {
        var t = $( "body" ),
          o = instance.options;

        if ( t.css( "cursor" ) ) {
          o._cursor = t.css( "cursor" );
        }
        t.css( "cursor", o.cursor );
      },
      stop: function( event, ui, instance ) {
        var o = instance.options;
        if ( o._cursor ) {
          $( "body" ).css( "cursor", o._cursor );
        }
      }
    } );

    $.ui.plugin.add( "draggable", "opacity", {
      start: function( event, ui, instance ) {
        var t = $( ui.helper ),
          o = instance.options;
        if ( t.css( "opacity" ) ) {
          o._opacity = t.css( "opacity" );
        }
        t.css( "opacity", o.opacity );
      },
      stop: function( event, ui, instance ) {
        var o = instance.options;
        if ( o._opacity ) {
          $( ui.helper ).css( "opacity", o._opacity );
        }
      }
    } );

    $.ui.plugin.add( "draggable", "scroll", {
      start: function( event, ui, i ) {
        if ( !i.scrollParentNotHidden ) {
          i.scrollParentNotHidden = i.helper.scrollParent( false );
        }

        if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] &&
          i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
          i.overflowOffset = i.scrollParentNotHidden.offset();
        }
      },
      drag: function( event, ui, i  ) {

        var o = i.options,
          scrolled = false,
          scrollParent = i.scrollParentNotHidden[ 0 ],
          document = i.document[ 0 ];

        if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
          if ( !o.axis || o.axis !== "x" ) {
            if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY <
              o.scrollSensitivity ) {
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
            } else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
              // @ts-ignore
              scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
            }
          }

          if ( !o.axis || o.axis !== "y" ) {
            if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX <
              o.scrollSensitivity ) {
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
            } else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
              // @ts-ignore
              scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
            }
          }

        } else {

          if ( !o.axis || o.axis !== "x" ) {
            if ( event.pageY - $( document ).scrollTop() < o.scrollSensitivity ) {
              scrolled = $( document ).scrollTop( $( document ).scrollTop() - o.scrollSpeed );
            } else if ( $( window ).height() - ( event.pageY - $( document ).scrollTop() ) <
              o.scrollSensitivity ) {
              scrolled = $( document ).scrollTop( $( document ).scrollTop() + o.scrollSpeed );
            }
          }

          if ( !o.axis || o.axis !== "y" ) {
            if ( event.pageX - $( document ).scrollLeft() < o.scrollSensitivity ) {
              scrolled = $( document ).scrollLeft(
                $( document ).scrollLeft() - o.scrollSpeed
              );
            } else if ( $( window ).width() - ( event.pageX - $( document ).scrollLeft() ) <
              o.scrollSensitivity ) {
              scrolled = $( document ).scrollLeft(
                $( document ).scrollLeft() + o.scrollSpeed
              );
            }
          }

        }

        if ( scrolled !== false && $.ui.ddmanager && !o.dropBehaviour ) {
          $.ui.ddmanager.prepareOffsets( i, event );
        }

      }
    } );

    $.ui.plugin.add( "draggable", "snap", {
      start: function( event, ui, i ) {

        var o = i.options;

        i.snapElements = [];

        $( o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap )
          .each( function() {
            var $t = $( this ),
              $o = $t.offset();
            if ( this !== i.element[ 0 ] ) {
              i.snapElements.push( {
                item: this,
                width: $t.outerWidth(), height: $t.outerHeight(),
                top: $o.top, left: $o.left
              } );
            }
          } );

      },
      drag: function( event, ui, inst ) {

        var ts, bs, ls, rs, l, r, t, b, i, first,
          o = inst.options,
          d = o.snapTolerance,
          x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
          y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

        for ( i = inst.snapElements.length - 1; i >= 0; i-- ) {

          l = inst.snapElements[ i ].left - inst.margins.left;
          r = l + inst.snapElements[ i ].width;
          t = inst.snapElements[ i ].top - inst.margins.top;
          b = t + inst.snapElements[ i ].height;

          if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d ||
            !$.contains( inst.snapElements[ i ].item.ownerDocument,
              inst.snapElements[ i ].item ) ) {
            if ( inst.snapElements[ i ].snapping ) {
              ( inst.options.snap.release &&
                inst.options.snap.release.call(
                  inst.element,
                  event,
                  $.extend( inst._uiHash(), { snapItem: inst.snapElements[ i ].item } )
                ) );
            }
            inst.snapElements[ i ].snapping = false;
            continue;
          }

          if ( o.snapMode !== "inner" ) {
            ts = Math.abs( t - y2 ) <= d;
            bs = Math.abs( b - y1 ) <= d;
            ls = Math.abs( l - x2 ) <= d;
            rs = Math.abs( r - x1 ) <= d;
            if ( ts ) {
              ui.position.top = inst._convertPositionTo( "relative", {
                top: t - inst.helperProportions.height,
                left: 0
              } ).top;
            }
            if ( bs ) {
              ui.position.top = inst._convertPositionTo( "relative", {
                top: b,
                left: 0
              } ).top;
            }
            if ( ls ) {
              ui.position.left = inst._convertPositionTo( "relative", {
                top: 0,
                left: l - inst.helperProportions.width
              } ).left;
            }
            if ( rs ) {
              ui.position.left = inst._convertPositionTo( "relative", {
                top: 0,
                left: r
              } ).left;
            }
          }

          first = ( ts || bs || ls || rs );

          if ( o.snapMode !== "outer" ) {
            ts = Math.abs( t - y1 ) <= d;
            bs = Math.abs( b - y2 ) <= d;
            ls = Math.abs( l - x1 ) <= d;
            rs = Math.abs( r - x2 ) <= d;
            if ( ts ) {
              ui.position.top = inst._convertPositionTo( "relative", {
                top: t,
                left: 0
              } ).top;
            }
            if ( bs ) {
              ui.position.top = inst._convertPositionTo( "relative", {
                top: b - inst.helperProportions.height,
                left: 0
              } ).top;
            }
            if ( ls ) {
              ui.position.left = inst._convertPositionTo( "relative", {
                top: 0,
                left: l
              } ).left;
            }
            if ( rs ) {
              ui.position.left = inst._convertPositionTo( "relative", {
                top: 0,
                left: r - inst.helperProportions.width
              } ).left;
            }
          }

          if ( !inst.snapElements[ i ].snapping && ( ts || bs || ls || rs || first ) ) {
            ( inst.options.snap.snap &&
              inst.options.snap.snap.call(
                inst.element,
                event,
                $.extend( inst._uiHash(), {
                  snapItem: inst.snapElements[ i ].item
                } ) ) );
          }
          inst.snapElements[ i ].snapping = ( ts || bs || ls || rs || first );

        }

      }
    } );

    $.ui.plugin.add( "draggable", "stack", {
      start: function( event, ui, instance ) {
        var min,
          o = instance.options,
          group = $.makeArray( $( o.stack ) ).sort( function( a, b ) {
            return ( parseInt( $( a ).css( "zIndex" ), 10 ) || 0 ) -
              ( parseInt( $( b ).css( "zIndex" ), 10 ) || 0 );
          } );

        if ( !group.length ) { return; }

        min = parseInt( $( group[ 0 ] ).css( "zIndex" ), 10 ) || 0;
        $( group ).each( function( i ) {
          $( this ).css( "zIndex", min + i );
        } );
        this.css( "zIndex", ( min + group.length ) );
      }
    } );

    $.ui.plugin.add( "draggable", "zIndex", {
      start: function( event, ui, instance ) {
        var t = $( ui.helper ),
          o = instance.options;

        if ( t.css( "zIndex" ) ) {
          o._zIndex = t.css( "zIndex" );
        }
        t.css( "zIndex", o.zIndex );
      },
      stop: function( event, ui, instance ) {
        var o = instance.options;

        if ( o._zIndex ) {
          $( ui.helper ).css( "zIndex", o._zIndex );
        }
      }
    } );

    var widgetsDraggable = $.ui.draggable;


    /*!
     * jQuery UI Resizable 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.widget( "ui.resizable", $.ui.mouse, {
      version: "1.12.1",
      widgetEventPrefix: "resize",
      options: {
        alsoResize: false,
        animate: false,
        animateDuration: "slow",
        animateEasing: "swing",
        aspectRatio: false,
        autoHide: false,
        classes: {
          "ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
        },
        containment: false,
        ghost: false,
        grid: false,
        handles: "e,s,se",
        helper: false,
        maxHeight: null,
        maxWidth: null,
        minHeight: 10,
        minWidth: 10,

        // See #7960
        zIndex: 90,

        // Callbacks
        resize: null,
        start: null,
        stop: null
      },

      _num: function( value ) {
        return parseFloat( value ) || 0;
      },

      _isNumber: function( value ) {
        return !isNaN( parseFloat( value ) );
      },

      _hasScroll: function( el, a ) {

        if ( $( el ).css( "overflow" ) === "hidden" ) {
          return false;
        }

        var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
          has = false;

        if ( el[ scroll ] > 0 ) {
          return true;
        }

        // TODO: determine which cases actually cause this to happen
        // if the element doesn't have the scroll set, see if it's possible to
        // set the scroll
        el[ scroll ] = 1;
        has = ( el[ scroll ] > 0 );
        el[ scroll ] = 0;
        return has;
      },

      _create: function() {

        var margins,
          o = this.options,
          that = this;
        this._addClass( "ui-resizable" );

        $.extend( this, {
          _aspectRatio: !!( o.aspectRatio ),
          aspectRatio: o.aspectRatio,
          originalElement: this.element,
          _proportionallyResizeElements: [],
          _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
        } );

        // Wrap the element if it cannot hold child nodes
        if ( this.element[ 0 ].nodeName.match( /^(canvas|textarea|input|select|button|img)$/i ) ) {

          this.element.wrap(
            $( "<div class='ui-wrapper' style='overflow: hidden;'></div>" ).css( {
              position: this.element.css( "position" ),
              width: this.element.outerWidth(),
              height: this.element.outerHeight(),
              top: this.element.css( "top" ),
              left: this.element.css( "left" )
            } )
          );

          this.element = this.element.parent().data(
            "ui-resizable", this.element.resizable( "instance" )
          );

          this.elementIsWrapper = true;

          margins = {
            marginTop: this.originalElement.css( "marginTop" ),
            marginRight: this.originalElement.css( "marginRight" ),
            marginBottom: this.originalElement.css( "marginBottom" ),
            marginLeft: this.originalElement.css( "marginLeft" )
          };

          this.element.css( margins );
          this.originalElement.css( "margin", 0 );

          // support: Safari
          // Prevent Safari textarea resize
          this.originalResizeStyle = this.originalElement.css( "resize" );
          this.originalElement.css( "resize", "none" );

          this._proportionallyResizeElements.push( this.originalElement.css( {
            position: "static",
            zoom: 1,
            display: "block"
          } ) );

          // Support: IE9
          // avoid IE jump (hard set the margin)
          this.originalElement.css( margins );

          this._proportionallyResize();
        }

        this._setupHandles();

        if ( o.autoHide ) {
          $( this.element )
            .on( "mouseenter", function() {
              if ( o.disabled ) {
                return;
              }
              that._removeClass( "ui-resizable-autohide" );
              that._handles.show();
            } )
            .on( "mouseleave", function() {
              if ( o.disabled ) {
                return;
              }
              if ( !that.resizing ) {
                that._addClass( "ui-resizable-autohide" );
                that._handles.hide();
              }
            } );
        }

        this._mouseInit();
      },

      _destroy: function() {

        this._mouseDestroy();

        var wrapper,
          _destroy = function( exp ) {
            $( exp )
              .removeData( "resizable" )
              .removeData( "ui-resizable" )
              .off( ".resizable" )
              .find( ".ui-resizable-handle" )
              .remove();
          };

        // TODO: Unwrap at same DOM position
        if ( this.elementIsWrapper ) {
          _destroy( this.element );
          wrapper = this.element;
          this.originalElement.css( {
            position: wrapper.css( "position" ),
            width: wrapper.outerWidth(),
            height: wrapper.outerHeight(),
            top: wrapper.css( "top" ),
            left: wrapper.css( "left" )
          } ).insertAfter( wrapper );
          wrapper.remove();
        }

        this.originalElement.css( "resize", this.originalResizeStyle );
        _destroy( this.originalElement );

        return this;
      },

      _setOption: function( key, value ) {
        this._super( key, value );

        switch ( key ) {
          case "handles":
            this._removeHandles();
            this._setupHandles();
            break;
          default:
            break;
        }
      },

      _setupHandles: function() {
        var o = this.options, handle, i, n, hname, axis, that = this;
        this.handles = o.handles ||
          ( !$( ".ui-resizable-handle", this.element ).length ?
            "e,s,se" : {
              n: ".ui-resizable-n",
              e: ".ui-resizable-e",
              s: ".ui-resizable-s",
              w: ".ui-resizable-w",
              se: ".ui-resizable-se",
              sw: ".ui-resizable-sw",
              ne: ".ui-resizable-ne",
              nw: ".ui-resizable-nw"
            } );

        this._handles = $();
        if ( this.handles.constructor === String ) {

          if ( this.handles === "all" ) {
            this.handles = "n,e,s,w,se,sw,ne,nw";
          }

          n = this.handles.split( "," );
          this.handles = {};

          for ( i = 0; i < n.length; i++ ) {

            handle = $.trim( n[ i ] );
            hname = "ui-resizable-" + handle;
            axis = $( "<div>" );
            this._addClass( axis, "ui-resizable-handle " + hname );

            axis.css( { zIndex: o.zIndex } );

            this.handles[ handle ] = ".ui-resizable-" + handle;
            this.element.append( axis );
          }

        }

        this._renderAxis = function( target ) {

          var i, axis, padPos, padWrapper;

          target = target || this.element;

          for ( i in this.handles ) {

            if ( this.handles[ i ].constructor === String ) {
              this.handles[ i ] = this.element.children( this.handles[ i ] ).first().show();
            } else if ( this.handles[ i ].jquery || this.handles[ i ].nodeType ) {
              this.handles[ i ] = $( this.handles[ i ] );
              this._on( this.handles[ i ], { "mousedown": that._mouseDown } );
            }

            if ( this.elementIsWrapper &&
              this.originalElement[ 0 ]
                .nodeName
                .match( /^(textarea|input|select|button)$/i ) ) {
              axis = $( this.handles[ i ], this.element );

              padWrapper = /sw|ne|nw|se|n|s/.test( i ) ?
                axis.outerHeight() :
                axis.outerWidth();

              padPos = [ "padding",
                /ne|nw|n/.test( i ) ? "Top" :
                  /se|sw|s/.test( i ) ? "Bottom" :
                    /^e$/.test( i ) ? "Right" : "Left" ].join( "" );

              target.css( padPos, padWrapper );

              this._proportionallyResize();
            }

            this._handles = this._handles.add( this.handles[ i ] );
          }
        };

        // TODO: make renderAxis a prototype function
        this._renderAxis( this.element );

        this._handles = this._handles.add( this.element.find( ".ui-resizable-handle" ) );
        this._handles.disableSelection();

        this._handles.on( "mouseover", function() {
          if ( !that.resizing ) {
            if ( this.className ) {
              axis = this.className.match( /ui-resizable-(se|sw|ne|nw|n|e|s|w)/i );
            }
            that.axis = axis && axis[ 1 ] ? axis[ 1 ] : "se";
          }
        } );

        if ( o.autoHide ) {
          this._handles.hide();
          this._addClass( "ui-resizable-autohide" );
        }
      },

      _removeHandles: function() {
        this._handles.remove();
      },

      _mouseCapture: function( event ) {
        var i, handle,
          capture = false;

        for ( i in this.handles ) {
          handle = $( this.handles[ i ] )[ 0 ];
          if ( handle === event.target || $.contains( handle, event.target ) ) {
            capture = true;
          }
        }

        return !this.options.disabled && capture;
      },

      _mouseStart: function( event ) {

        var curleft, curtop, cursor,
          o = this.options,
          el = this.element;

        this.resizing = true;

        this._renderProxy();

        curleft = this._num( this.helper.css( "left" ) );
        curtop = this._num( this.helper.css( "top" ) );

        if ( o.containment ) {
          curleft += $( o.containment ).scrollLeft() || 0;
          curtop += $( o.containment ).scrollTop() || 0;
        }

        this.offset = this.helper.offset();
        this.position = { left: curleft, top: curtop };

        this.size = this._helper ? {
          width: this.helper.width(),
          height: this.helper.height()
        } : {
          width: el.width(),
          height: el.height()
        };

        this.originalSize = this._helper ? {
          width: el.outerWidth(),
          height: el.outerHeight()
        } : {
          width: el.width(),
          height: el.height()
        };

        this.sizeDiff = {
          width: el.outerWidth() - el.width(),
          height: el.outerHeight() - el.height()
        };

        this.originalPosition = { left: curleft, top: curtop };
        this.originalMousePosition = { left: event.pageX, top: event.pageY };

        this.aspectRatio = ( typeof o.aspectRatio === "number" ) ?
          o.aspectRatio :
          ( ( this.originalSize.width / this.originalSize.height ) || 1 );

        cursor = $( ".ui-resizable-" + this.axis ).css( "cursor" );
        $( "body" ).css( "cursor", cursor === "auto" ? this.axis + "-resize" : cursor );

        this._addClass( "ui-resizable-resizing" );
        this._propagate( "start", event );
        return true;
      },

      _mouseDrag: function( event ) {

        var data, props,
          smp = this.originalMousePosition,
          a = this.axis,
          dx = ( event.pageX - smp.left ) || 0,
          dy = ( event.pageY - smp.top ) || 0,
          trigger = this._change[ a ];

        this._updatePrevProperties();

        if ( !trigger ) {
          return false;
        }

        data = trigger.apply( this, [ event, dx, dy ] );

        this._updateVirtualBoundaries( event.shiftKey );
        if ( this._aspectRatio || event.shiftKey ) {
          data = this._updateRatio( data, event );
        }

        data = this._respectSize( data, event );

        this._updateCache( data );

        this._propagate( "resize", event );

        props = this._applyChanges();

        if ( !this._helper && this._proportionallyResizeElements.length ) {
          this._proportionallyResize();
        }

        if ( !$.isEmptyObject( props ) ) {
          this._updatePrevProperties();
          this._trigger( "resize", event, this.ui() );
          this._applyChanges();
        }

        return false;
      },

      _mouseStop: function( event ) {

        this.resizing = false;
        var pr, ista, soffseth, soffsetw, s, left, top,
          o = this.options, that = this;

        if ( this._helper ) {

          pr = this._proportionallyResizeElements;
          ista = pr.length && ( /textarea/i ).test( pr[ 0 ].nodeName );
          soffseth = ista && this._hasScroll( pr[ 0 ], "left" ) ? 0 : that.sizeDiff.height;
          soffsetw = ista ? 0 : that.sizeDiff.width;

          s = {
            width: ( that.helper.width()  - soffsetw ),
            height: ( that.helper.height() - soffseth )
          };
          left = ( parseFloat( that.element.css( "left" ) ) +
            ( that.position.left - that.originalPosition.left ) ) || null;
          top = ( parseFloat( that.element.css( "top" ) ) +
            ( that.position.top - that.originalPosition.top ) ) || null;

          if ( !o.animate ) {
            this.element.css( $.extend( s, { top: top, left: left } ) );
          }

          that.helper.height( that.size.height );
          that.helper.width( that.size.width );

          if ( this._helper && !o.animate ) {
            this._proportionallyResize();
          }
        }

        $( "body" ).css( "cursor", "auto" );

        this._removeClass( "ui-resizable-resizing" );

        this._propagate( "stop", event );

        if ( this._helper ) {
          this.helper.remove();
        }

        return false;

      },

      _updatePrevProperties: function() {
        this.prevPosition = {
          top: this.position.top,
          left: this.position.left
        };
        this.prevSize = {
          width: this.size.width,
          height: this.size.height
        };
      },

      _applyChanges: function() {
        var props: any = {};

        if ( this.position.top !== this.prevPosition.top ) {
          props.top = this.position.top + "px";
        }
        if ( this.position.left !== this.prevPosition.left ) {
          props.left = this.position.left + "px";
        }
        if ( this.size.width !== this.prevSize.width ) {
          props.width = this.size.width + "px";
        }
        if ( this.size.height !== this.prevSize.height ) {
          props.height = this.size.height + "px";
        }

        this.helper.css( props );

        return props;
      },

      _updateVirtualBoundaries: function( forceAspectRatio ) {
        var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
          o = this.options;

        b = {
          minWidth: this._isNumber( o.minWidth ) ? o.minWidth : 0,
          maxWidth: this._isNumber( o.maxWidth ) ? o.maxWidth : Infinity,
          minHeight: this._isNumber( o.minHeight ) ? o.minHeight : 0,
          maxHeight: this._isNumber( o.maxHeight ) ? o.maxHeight : Infinity
        };

        if ( this._aspectRatio || forceAspectRatio ) {
          pMinWidth = b.minHeight * this.aspectRatio;
          pMinHeight = b.minWidth / this.aspectRatio;
          pMaxWidth = b.maxHeight * this.aspectRatio;
          pMaxHeight = b.maxWidth / this.aspectRatio;

          if ( pMinWidth > b.minWidth ) {
            b.minWidth = pMinWidth;
          }
          if ( pMinHeight > b.minHeight ) {
            b.minHeight = pMinHeight;
          }
          if ( pMaxWidth < b.maxWidth ) {
            b.maxWidth = pMaxWidth;
          }
          if ( pMaxHeight < b.maxHeight ) {
            b.maxHeight = pMaxHeight;
          }
        }
        this._vBoundaries = b;
      },

      _updateCache: function( data ) {
        this.offset = this.helper.offset();
        if ( this._isNumber( data.left ) ) {
          this.position.left = data.left;
        }
        if ( this._isNumber( data.top ) ) {
          this.position.top = data.top;
        }
        if ( this._isNumber( data.height ) ) {
          this.size.height = data.height;
        }
        if ( this._isNumber( data.width ) ) {
          this.size.width = data.width;
        }
      },

      _updateRatio: function( data ) {

        var cpos = this.position,
          csize = this.size,
          a = this.axis;

        if ( this._isNumber( data.height ) ) {
          data.width = ( data.height * this.aspectRatio );
        } else if ( this._isNumber( data.width ) ) {
          data.height = ( data.width / this.aspectRatio );
        }

        if ( a === "sw" ) {
          data.left = cpos.left + ( csize.width - data.width );
          data.top = null;
        }
        if ( a === "nw" ) {
          data.top = cpos.top + ( csize.height - data.height );
          data.left = cpos.left + ( csize.width - data.width );
        }

        return data;
      },

      _respectSize: function( data ) {

        var o = this._vBoundaries,
          a = this.axis,
          ismaxw = this._isNumber( data.width ) && o.maxWidth && ( o.maxWidth < data.width ),
          ismaxh = this._isNumber( data.height ) && o.maxHeight && ( o.maxHeight < data.height ),
          isminw = this._isNumber( data.width ) && o.minWidth && ( o.minWidth > data.width ),
          isminh = this._isNumber( data.height ) && o.minHeight && ( o.minHeight > data.height ),
          dw = this.originalPosition.left + this.originalSize.width,
          dh = this.originalPosition.top + this.originalSize.height,
          cw = /sw|nw|w/.test( a ), ch = /nw|ne|n/.test( a );
        if ( isminw ) {
          data.width = o.minWidth;
        }
        if ( isminh ) {
          data.height = o.minHeight;
        }
        if ( ismaxw ) {
          data.width = o.maxWidth;
        }
        if ( ismaxh ) {
          data.height = o.maxHeight;
        }

        if ( isminw && cw ) {
          data.left = dw - o.minWidth;
        }
        if ( ismaxw && cw ) {
          data.left = dw - o.maxWidth;
        }
        if ( isminh && ch ) {
          data.top = dh - o.minHeight;
        }
        if ( ismaxh && ch ) {
          data.top = dh - o.maxHeight;
        }

        // Fixing jump error on top/left - bug #2330
        if ( !data.width && !data.height && !data.left && data.top ) {
          data.top = null;
        } else if ( !data.width && !data.height && !data.top && data.left ) {
          data.left = null;
        }

        return data;
      },

      _getPaddingPlusBorderDimensions: function( element ) {
        var i = 0,
          widths = [],
          borders = [
            element.css( "borderTopWidth" ),
            element.css( "borderRightWidth" ),
            element.css( "borderBottomWidth" ),
            element.css( "borderLeftWidth" )
          ],
          paddings = [
            element.css( "paddingTop" ),
            element.css( "paddingRight" ),
            element.css( "paddingBottom" ),
            element.css( "paddingLeft" )
          ];

        for ( ; i < 4; i++ ) {
          widths[ i ] = ( parseFloat( borders[ i ] ) || 0 );
          widths[ i ] += ( parseFloat( paddings[ i ] ) || 0 );
        }

        return {
          height: widths[ 0 ] + widths[ 2 ],
          width: widths[ 1 ] + widths[ 3 ]
        };
      },

      _proportionallyResize: function() {

        if ( !this._proportionallyResizeElements.length ) {
          return;
        }

        var prel,
          i = 0,
          element = this.helper || this.element;

        for ( ; i < this._proportionallyResizeElements.length; i++ ) {

          prel = this._proportionallyResizeElements[ i ];

          // TODO: Seems like a bug to cache this.outerDimensions
          // considering that we are in a loop.
          if ( !this.outerDimensions ) {
            this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
          }

          prel.css( {
            height: ( element.height() - this.outerDimensions.height ) || 0,
            width: ( element.width() - this.outerDimensions.width ) || 0
          } );

        }

      },

      _renderProxy: function() {

        var el = this.element, o = this.options;
        this.elementOffset = el.offset();

        if ( this._helper ) {

          this.helper = this.helper || $( "<div style='overflow:hidden;'></div>" );

          this._addClass( this.helper, this._helper );
          this.helper.css( {
            width: this.element.outerWidth(),
            height: this.element.outerHeight(),
            position: "absolute",
            left: this.elementOffset.left + "px",
            top: this.elementOffset.top + "px",
            zIndex: ++o.zIndex //TODO: Don't modify option
          } );

          this.helper
            .appendTo( "body" )
            .disableSelection();

        } else {
          this.helper = this.element;
        }

      },

      _change: {
        e: function( event, dx ) {
          return { width: this.originalSize.width + dx };
        },
        w: function( event, dx ) {
          var cs = this.originalSize, sp = this.originalPosition;
          return { left: sp.left + dx, width: cs.width - dx };
        },
        n: function( event, dx, dy ) {
          var cs = this.originalSize, sp = this.originalPosition;
          return { top: sp.top + dy, height: cs.height - dy };
        },
        s: function( event, dx, dy ) {
          return { height: this.originalSize.height + dy };
        },
        se: function( event, dx, dy ) {
          return $.extend( this._change.s.apply( this, arguments ),
            this._change.e.apply( this, [ event, dx, dy ] ) );
        },
        sw: function( event, dx, dy ) {
          return $.extend( this._change.s.apply( this, arguments ),
            this._change.w.apply( this, [ event, dx, dy ] ) );
        },
        ne: function( event, dx, dy ) {
          return $.extend( this._change.n.apply( this, arguments ),
            this._change.e.apply( this, [ event, dx, dy ] ) );
        },
        nw: function( event, dx, dy ) {
          return $.extend( this._change.n.apply( this, arguments ),
            this._change.w.apply( this, [ event, dx, dy ] ) );
        }
      },

      _propagate: function( n, event ) {
        $.ui.plugin.call( this, n, [ event, this.ui() ] );
        ( n !== "resize" && this._trigger( n, event, this.ui() ) );
      },

      plugins: {},

      ui: function() {
        return {
          originalElement: this.originalElement,
          element: this.element,
          helper: this.helper,
          position: this.position,
          size: this.size,
          originalSize: this.originalSize,
          originalPosition: this.originalPosition
        };
      }

    } );

    /*
     * Resizable Extensions
     */

    $.ui.plugin.add( "resizable", "animate", {

      stop: function( event ) {
        var that = $( this ).resizable( "instance" ),
          o = that.options,
          pr = that._proportionallyResizeElements,
          ista = pr.length && ( /textarea/i ).test( pr[ 0 ].nodeName ),
          soffseth = ista && that._hasScroll( pr[ 0 ], "left" ) ? 0 : that.sizeDiff.height,
          soffsetw = ista ? 0 : that.sizeDiff.width,
          style = {
            width: ( that.size.width - soffsetw ),
            height: ( that.size.height - soffseth )
          },
          left = ( parseFloat( that.element.css( "left" ) ) +
            ( that.position.left - that.originalPosition.left ) ) || null,
          top = ( parseFloat( that.element.css( "top" ) ) +
            ( that.position.top - that.originalPosition.top ) ) || null;

        that.element.animate(
          $.extend( style, top && left ? { top: top, left: left } : {} ), {
            duration: o.animateDuration,
            easing: o.animateEasing,
            step: function() {

              var data = {
                width: parseFloat( that.element.css( "width" ) ),
                height: parseFloat( that.element.css( "height" ) ),
                top: parseFloat( that.element.css( "top" ) ),
                left: parseFloat( that.element.css( "left" ) )
              };

              if ( pr && pr.length ) {
                $( pr[ 0 ] ).css( { width: data.width, height: data.height } );
              }

              // Propagating resize, and updating values for each animation step
              that._updateCache( data );
              that._propagate( "resize", event );

            }
          }
        );
      }

    } );

    $.ui.plugin.add( "resizable", "containment", {

      start: function() {
        var element, p, co, ch, cw, width, height,
          that = $( this ).resizable( "instance" ),
          o = that.options,
          el = that.element,
          oc = o.containment,
          ce = ( oc instanceof $ ) ?
            oc.get( 0 ) :
            ( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;

        if ( !ce ) {
          return;
        }

        that.containerElement = $( ce );

        if ( /document/.test( oc ) || oc === document ) {
          that.containerOffset = {
            left: 0,
            top: 0
          };
          that.containerPosition = {
            left: 0,
            top: 0
          };

          that.parentData = {
            element: $( document ),
            left: 0,
            top: 0,
            width: $( document ).width(),
            // @ts-ignore
            height: $( document ).height() || document.body.parentNode.scrollHeight
          };
        } else {
          element = $( ce );
          p = [];
          $( [ "Top", "Right", "Left", "Bottom" ] ).each( function( i, name ) {
            p[ i ] = that._num( element.css( "padding" + name ) );
          } );

          that.containerOffset = element.offset();
          that.containerPosition = element.position();
          that.containerSize = {
            height: ( element.innerHeight() - p[ 3 ] ),
            width: ( element.innerWidth() - p[ 1 ] )
          };

          co = that.containerOffset;
          ch = that.containerSize.height;
          cw = that.containerSize.width;
          width = ( that._hasScroll ( ce, "left" ) ? ce.scrollWidth : cw );
          height = ( that._hasScroll ( ce ) ? ce.scrollHeight : ch ) ;

          that.parentData = {
            element: ce,
            left: co.left,
            top: co.top,
            width: width,
            height: height
          };
        }
      },

      resize: function( event ) {
        var woset, hoset, isParent, isOffsetRelative,
          that = $( this ).resizable( "instance" ),
          o = that.options,
          co = that.containerOffset,
          cp = that.position,
          pRatio = that._aspectRatio || event.shiftKey,
          cop = {
            top: 0,
            left: 0
          },
          ce = that.containerElement,
          continueResize = true;

        if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
          cop = co;
        }

        if ( cp.left < ( that._helper ? co.left : 0 ) ) {
          that.size.width = that.size.width +
            ( that._helper ?
              ( that.position.left - co.left ) :
              ( that.position.left - cop.left ) );

          if ( pRatio ) {
            that.size.height = that.size.width / that.aspectRatio;
            continueResize = false;
          }
          that.position.left = o.helper ? co.left : 0;
        }

        if ( cp.top < ( that._helper ? co.top : 0 ) ) {
          that.size.height = that.size.height +
            ( that._helper ?
              ( that.position.top - co.top ) :
              that.position.top );

          if ( pRatio ) {
            that.size.width = that.size.height * that.aspectRatio;
            continueResize = false;
          }
          that.position.top = that._helper ? co.top : 0;
        }

        isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
        isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );

        if ( isParent && isOffsetRelative ) {
          that.offset.left = that.parentData.left + that.position.left;
          that.offset.top = that.parentData.top + that.position.top;
        } else {
          that.offset.left = that.element.offset().left;
          that.offset.top = that.element.offset().top;
        }

        woset = Math.abs( that.sizeDiff.width +
          ( that._helper ?
            that.offset.left - cop.left :
            ( that.offset.left - co.left ) ) );

        hoset = Math.abs( that.sizeDiff.height +
          ( that._helper ?
            that.offset.top - cop.top :
            ( that.offset.top - co.top ) ) );

        if ( woset + that.size.width >= that.parentData.width ) {
          that.size.width = that.parentData.width - woset;
          if ( pRatio ) {
            that.size.height = that.size.width / that.aspectRatio;
            continueResize = false;
          }
        }

        if ( hoset + that.size.height >= that.parentData.height ) {
          that.size.height = that.parentData.height - hoset;
          if ( pRatio ) {
            that.size.width = that.size.height * that.aspectRatio;
            continueResize = false;
          }
        }

        if ( !continueResize ) {
          that.position.left = that.prevPosition.left;
          that.position.top = that.prevPosition.top;
          that.size.width = that.prevSize.width;
          that.size.height = that.prevSize.height;
        }
      },

      stop: function() {
        var that = $( this ).resizable( "instance" ),
          o = that.options,
          co = that.containerOffset,
          cop = that.containerPosition,
          ce = that.containerElement,
          helper = $( that.helper ),
          ho = helper.offset(),
          w = helper.outerWidth() - that.sizeDiff.width,
          h = helper.outerHeight() - that.sizeDiff.height;

        if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
          $( this ).css( {
            left: ho.left - cop.left - co.left,
            width: w,
            height: h
          } );
        }

        if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
          $( this ).css( {
            left: ho.left - cop.left - co.left,
            width: w,
            height: h
          } );
        }
      }
    } );

    $.ui.plugin.add( "resizable", "alsoResize", {

      start: function() {
        var that = $( this ).resizable( "instance" ),
          o = that.options;

        $( o.alsoResize ).each( function() {
          var el = $( this );
          el.data( "ui-resizable-alsoresize", {
            width: parseFloat( el.width() ), height: parseFloat( el.height() ),
            left: parseFloat( el.css( "left" ) ), top: parseFloat( el.css( "top" ) )
          } );
        } );
      },

      resize: function( event, ui ) {
        var that = $( this ).resizable( "instance" ),
          o = that.options,
          os = that.originalSize,
          op = that.originalPosition,
          delta = {
            height: ( that.size.height - os.height ) || 0,
            width: ( that.size.width - os.width ) || 0,
            top: ( that.position.top - op.top ) || 0,
            left: ( that.position.left - op.left ) || 0
          };

        $( o.alsoResize ).each( function() {
          var el = $( this ), start = $( this ).data( "ui-resizable-alsoresize" ), style = {},
            css = el.parents( ui.originalElement[ 0 ] ).length ?
              [ "width", "height" ] :
              [ "width", "height", "top", "left" ];

          $.each( css, function( i, prop ) {
            var sum = ( start[ prop ] || 0 ) + ( delta[ prop ] || 0 );
            if ( sum && sum >= 0 ) {
              style[ prop ] = sum || null;
            }
          } );

          el.css( style );
        } );
      },

      stop: function() {
        $( this ).removeData( "ui-resizable-alsoresize" );
      }
    } );

    $.ui.plugin.add( "resizable", "ghost", {

      start: function() {

        var that = $( this ).resizable( "instance" ), cs = that.size;

        that.ghost = that.originalElement.clone();
        that.ghost.css( {
          opacity: 0.25,
          display: "block",
          position: "relative",
          height: cs.height,
          width: cs.width,
          margin: 0,
          left: 0,
          top: 0
        } );

        that._addClass( that.ghost, "ui-resizable-ghost" );

        // DEPRECATED
        // TODO: remove after 1.12
        if ( $.uiBackCompat !== false && typeof that.options.ghost === "string" ) {

          // Ghost option
          that.ghost.addClass( this.options.ghost );
        }

        that.ghost.appendTo( that.helper );

      },

      resize: function() {
        var that = $( this ).resizable( "instance" );
        if ( that.ghost ) {
          that.ghost.css( {
            position: "relative",
            height: that.size.height,
            width: that.size.width
          } );
        }
      },

      stop: function() {
        var that = $( this ).resizable( "instance" );
        if ( that.ghost && that.helper ) {
          that.helper.get( 0 ).removeChild( that.ghost.get( 0 ) );
        }
      }

    } );

    $.ui.plugin.add( "resizable", "grid", {

      resize: function() {
        var outerDimensions,
          that = $( this ).resizable( "instance" ),
          o = that.options,
          cs = that.size,
          os = that.originalSize,
          op = that.originalPosition,
          a = that.axis,
          grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
          gridX = ( grid[ 0 ] || 1 ),
          gridY = ( grid[ 1 ] || 1 ),
          ox = Math.round( ( cs.width - os.width ) / gridX ) * gridX,
          oy = Math.round( ( cs.height - os.height ) / gridY ) * gridY,
          newWidth = os.width + ox,
          newHeight = os.height + oy,
          isMaxWidth = o.maxWidth && ( o.maxWidth < newWidth ),
          isMaxHeight = o.maxHeight && ( o.maxHeight < newHeight ),
          isMinWidth = o.minWidth && ( o.minWidth > newWidth ),
          isMinHeight = o.minHeight && ( o.minHeight > newHeight );

        o.grid = grid;

        if ( isMinWidth ) {
          newWidth += gridX;
        }
        if ( isMinHeight ) {
          newHeight += gridY;
        }
        if ( isMaxWidth ) {
          newWidth -= gridX;
        }
        if ( isMaxHeight ) {
          newHeight -= gridY;
        }

        if ( /^(se|s|e)$/.test( a ) ) {
          that.size.width = newWidth;
          that.size.height = newHeight;
        } else if ( /^(ne)$/.test( a ) ) {
          that.size.width = newWidth;
          that.size.height = newHeight;
          that.position.top = op.top - oy;
        } else if ( /^(sw)$/.test( a ) ) {
          that.size.width = newWidth;
          that.size.height = newHeight;
          that.position.left = op.left - ox;
        } else {
          if ( newHeight - gridY <= 0 || newWidth - gridX <= 0 ) {
            outerDimensions = that._getPaddingPlusBorderDimensions( this );
          }

          if ( newHeight - gridY > 0 ) {
            that.size.height = newHeight;
            that.position.top = op.top - oy;
          } else {
            newHeight = gridY - outerDimensions.height;
            that.size.height = newHeight;
            that.position.top = op.top + os.height - newHeight;
          }
          if ( newWidth - gridX > 0 ) {
            that.size.width = newWidth;
            that.position.left = op.left - ox;
          } else {
            newWidth = gridX - outerDimensions.width;
            that.size.width = newWidth;
            that.position.left = op.left + os.width - newWidth;
          }
        }
      }

    } );

    var widgetsResizable = $.ui.resizable;

    /*!
     * jQuery UI Controlgroup 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    var controlgroupCornerRegex = /ui-corner-([a-z]){2,6}/g;

    var widgetsControlgroup = $.widget( "ui.controlgroup", {
      version: "1.12.1",
      defaultElement: "<div>",
      options: {
        direction: "horizontal",
        disabled: null,
        onlyVisible: true,
        items: {
          "button": "input[type=button], input[type=submit], input[type=reset], button, a",
          "controlgroupLabel": ".ui-controlgroup-label",
          "checkboxradio": "input[type='checkbox'], input[type='radio']",
          "selectmenu": "select",
          "spinner": ".ui-spinner-input"
        }
      },

      _create: function() {
        this._enhance();
      },

      // To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
      _enhance: function() {
        this.element.attr( "role", "toolbar" );
        this.refresh();
      },

      _destroy: function() {
        this._callChildMethod( "destroy" );
        this.childWidgets.removeData( "ui-controlgroup-data" );
        this.element.removeAttr( "role" );
        if ( this.options.items.controlgroupLabel ) {
          this.element
            .find( this.options.items.controlgroupLabel )
            .find( ".ui-controlgroup-label-contents" )
            .contents().unwrap();
        }
      },

      _initWidgets: function() {
        var that = this,
          childWidgets = [];

        // First we iterate over each of the items options
        $.each( this.options.items, function( widget, selector ) {
          var labels;
          var options = {};

          // Make sure the widget has a selector set
          if ( !selector ) {
            return;
          }

          if ( widget === "controlgroupLabel" ) {
            labels = that.element.find( selector );
            labels.each( function() {
              var element = $( this );

              if ( element.children( ".ui-controlgroup-label-contents" ).length ) {
                return;
              }
              element.contents()
                .wrapAll( "<span class='ui-controlgroup-label-contents'></span>" );
            } );
            that._addClass( labels, null, "ui-widget ui-widget-content ui-state-default" );
            childWidgets = childWidgets.concat( labels.get() );
            return;
          }

          // Make sure the widget actually exists
          if ( !$.fn[ widget ] ) {
            return;
          }

          // We assume everything is in the middle to start because we can't determine
          // first / last elements until all enhancments are done.
          if ( that[ "_" + widget + "Options" ] ) {
            options = that[ "_" + widget + "Options" ]( "middle" );
          } else {
            options = { classes: {} };
          }

          // Find instances of this widget inside controlgroup and init them
          that.element
            .find( selector )
            .each( function() {
              var element = $( this );
              var instance = element[ widget ]( "instance" );

              // We need to clone the default options for this type of widget to avoid
              // polluting the variable options which has a wider scope than a single widget.
              var instanceOptions = $.widget.extend( {}, options );

              // If the button is the child of a spinner ignore it
              // TODO: Find a more generic solution
              if ( widget === "button" && element.parent( ".ui-spinner" ).length ) {
                return;
              }

              // Create the widget if it doesn't exist
              if ( !instance ) {
                instance = element[ widget ]()[ widget ]( "instance" );
              }
              if ( instance ) {
                instanceOptions.classes =
                  that._resolveClassesValues( instanceOptions.classes, instance );
              }
              element[ widget ]( instanceOptions );

              // Store an instance of the controlgroup to be able to reference
              // from the outermost element for changing options and refresh
              var widgetElement = element[ widget ]( "widget" );
              $.data( widgetElement[ 0 ], "ui-controlgroup-data",
                instance ? instance : element[ widget ]( "instance" ) );

              childWidgets.push( widgetElement[ 0 ] );
            } );
        } );

        this.childWidgets = $( $.unique( childWidgets ) );
        this._addClass( this.childWidgets, "ui-controlgroup-item" );
      },

      _callChildMethod: function( method ) {
        this.childWidgets.each( function() {
          var element = $( this ),
            data = element.data( "ui-controlgroup-data" );
          if ( data && data[ method ] ) {
            data[ method ]();
          }
        } );
      },

      _updateCornerClass: function( element, position ) {
        var remove = "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all";
        var add = this._buildSimpleOptions( position, "label" ).classes.label;

        this._removeClass( element, null, remove );
        this._addClass( element, null, add );
      },

      _buildSimpleOptions: function( position, key ) {
        var direction = this.options.direction === "vertical";
        var result = {
          classes: {}
        };
        result.classes[ key ] = {
          "middle": "",
          "first": "ui-corner-" + ( direction ? "top" : "left" ),
          "last": "ui-corner-" + ( direction ? "bottom" : "right" ),
          "only": "ui-corner-all"
        }[ position ];

        return result;
      },

      _spinnerOptions: function( position ) {
        var options = this._buildSimpleOptions( position, "ui-spinner" );

        options.classes[ "ui-spinner-up" ] = "";
        options.classes[ "ui-spinner-down" ] = "";

        return options;
      },

      _buttonOptions: function( position ) {
        return this._buildSimpleOptions( position, "ui-button" );
      },

      _checkboxradioOptions: function( position ) {
        return this._buildSimpleOptions( position, "ui-checkboxradio-label" );
      },

      _selectmenuOptions: function( position ) {
        var direction = this.options.direction === "vertical";
        return {
          width: direction ? "auto" : false,
          classes: {
            middle: {
              "ui-selectmenu-button-open": "",
              "ui-selectmenu-button-closed": ""
            },
            first: {
              "ui-selectmenu-button-open": "ui-corner-" + ( direction ? "top" : "tl" ),
              "ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "top" : "left" )
            },
            last: {
              "ui-selectmenu-button-open": direction ? "" : "ui-corner-tr",
              "ui-selectmenu-button-closed": "ui-corner-" + ( direction ? "bottom" : "right" )
            },
            only: {
              "ui-selectmenu-button-open": "ui-corner-top",
              "ui-selectmenu-button-closed": "ui-corner-all"
            }

          }[ position ]
        };
      },

      _resolveClassesValues: function( classes, instance ) {
        var result = {};
        $.each( classes, function( key ) {
          var current = instance.options.classes[ key ] || "";
          current = $.trim( current.replace( controlgroupCornerRegex, "" ) );
          result[ key ] = ( current + " " + classes[ key ] ).replace( /\s+/g, " " );
        } );
        return result;
      },

      _setOption: function( key, value ) {
        if ( key === "direction" ) {
          this._removeClass( "ui-controlgroup-" + this.options.direction );
        }

        this._super( key, value );
        if ( key === "disabled" ) {
          this._callChildMethod( value ? "disable" : "enable" );
          return;
        }

        this.refresh();
      },

      refresh: function() {
        var children,
          that = this;

        this._addClass( "ui-controlgroup ui-controlgroup-" + this.options.direction );

        if ( this.options.direction === "horizontal" ) {
          this._addClass( null, "ui-helper-clearfix" );
        }
        this._initWidgets();

        children = this.childWidgets;

        // We filter here because we need to track all childWidgets not just the visible ones
        if ( this.options.onlyVisible ) {
          children = children.filter( ":visible" );
        }

        if ( children.length ) {

          // We do this last because we need to make sure all enhancment is done
          // before determining first and last
          $.each( [ "first", "last" ], function( index, value ) {
            var instance = children[ value ]().data( "ui-controlgroup-data" );

            if ( instance && that[ "_" + instance.widgetName + "Options" ] ) {
              var options = that[ "_" + instance.widgetName + "Options" ](
                children.length === 1 ? "only" : value
              );
              options.classes = that._resolveClassesValues( options.classes, instance );
              instance.element[ instance.widgetName ]( options );
            } else {
              that._updateCornerClass( children[ value ](), value );
            }
          } );

          // Finally call the refresh method on each of the child widgets.
          this._callChildMethod( "refresh" );
        }
      }
    } );

    /*!
     * jQuery UI Checkboxradio 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.widget( "ui.checkboxradio", [ $.ui.formResetMixin, {
      version: "1.12.1",
      options: {
        disabled: null,
        label: null,
        icon: true,
        classes: {
          "ui-checkboxradio-label": "ui-corner-all",
          "ui-checkboxradio-icon": "ui-corner-all"
        }
      },

      _getCreateOptions: function() {
        var disabled, labels;
        var that = this;
        var options = this._super() || {};

        // We read the type here, because it makes more sense to throw a element type error first,
        // rather then the error for lack of a label. Often if its the wrong type, it
        // won't have a label (e.g. calling on a div, btn, etc)
        this._readType();

        labels = this.element.labels();

        // If there are multiple labels, use the last one
        this.label = $( labels[ labels.length - 1 ] );
        if ( !this.label.length ) {
          $.error( "No label found for checkboxradio widget" );
        }

        this.originalLabel = "";

        // We need to get the label text but this may also need to make sure it does not contain the
        // input itself.
        this.label.contents().not( this.element[ 0 ] ).each( function() {

          // The label contents could be text, html, or a mix. We concat each element to get a
          // string representation of the label, without the input as part of it.
          that.originalLabel += this.nodeType === 3 ? $( this ).text() : this.outerHTML;
        } );

        // Set the label option if we found label text
        if ( this.originalLabel ) {
          options.label = this.originalLabel;
        }

        disabled = this.element[ 0 ].disabled;
        if ( disabled != null ) {
          options.disabled = disabled;
        }
        return options;
      },

      _create: function() {
        var checked = this.element[ 0 ].checked;

        this._bindFormResetHandler();

        if ( this.options.disabled == null ) {
          this.options.disabled = this.element[ 0 ].disabled;
        }

        this._setOption( "disabled", this.options.disabled );
        this._addClass( "ui-checkboxradio", "ui-helper-hidden-accessible" );
        this._addClass( this.label, "ui-checkboxradio-label", "ui-button ui-widget" );

        if ( this.type === "radio" ) {
          this._addClass( this.label, "ui-checkboxradio-radio-label" );
        }

        if ( this.options.label && this.options.label !== this.originalLabel ) {
          this._updateLabel();
        } else if ( this.originalLabel ) {
          this.options.label = this.originalLabel;
        }

        this._enhance();

        if ( checked ) {
          this._addClass( this.label, "ui-checkboxradio-checked", "ui-state-active" );
          if ( this.icon ) {
            this._addClass( this.icon, null, "ui-state-hover" );
          }
        }

        this._on( {
          change: "_toggleClasses",
          focus: function() {
            this._addClass( this.label, null, "ui-state-focus ui-visual-focus" );
          },
          blur: function() {
            this._removeClass( this.label, null, "ui-state-focus ui-visual-focus" );
          }
        } );
      },

      _readType: function() {
        var nodeName = this.element[ 0 ].nodeName.toLowerCase();
        this.type = this.element[ 0 ].type;
        if ( nodeName !== "input" || !/radio|checkbox/.test( this.type ) ) {
          $.error( "Can't create checkboxradio on element.nodeName=" + nodeName +
            " and element.type=" + this.type );
        }
      },

      // Support jQuery Mobile enhanced option
      _enhance: function() {
        this._updateIcon( this.element[ 0 ].checked );
      },

      widget: function() {
        return this.label;
      },

      _getRadioGroup: function() {
        var group;
        var name = this.element[ 0 ].name;
        var nameSelector = "input[name='" + $.ui.escapeSelector( name ) + "']";

        if ( !name ) {
          return $( [] );
        }

        if ( this.form.length ) {
          group = $( this.form[ 0 ].elements ).filter( nameSelector );
        } else {

          // Not inside a form, check all inputs that also are not inside a form
          group = $( nameSelector ).filter( function() {
            return $( this ).form().length === 0;
          } );
        }

        return group.not( this.element );
      },

      _toggleClasses: function() {
        var checked = this.element[ 0 ].checked;
        this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );

        if ( this.options.icon && this.type === "checkbox" ) {
          this._toggleClass( this.icon, null, "ui-icon-check ui-state-checked", checked )
            ._toggleClass( this.icon, null, "ui-icon-blank", !checked );
        }

        if ( this.type === "radio" ) {
          this._getRadioGroup()
            .each( function() {
              var instance = $( this ).checkboxradio( "instance" );

              if ( instance ) {
                instance._removeClass( instance.label,
                  "ui-checkboxradio-checked", "ui-state-active" );
              }
            } );
        }
      },

      _destroy: function() {
        this._unbindFormResetHandler();

        if ( this.icon ) {
          this.icon.remove();
          this.iconSpace.remove();
        }
      },

      _setOption: function( key, value ) {

        // We don't allow the value to be set to nothing
        if ( key === "label" && !value ) {
          return;
        }

        this._super( key, value );

        if ( key === "disabled" ) {
          this._toggleClass( this.label, null, "ui-state-disabled", value );
          this.element[ 0 ].disabled = value;

          // Don't refresh when setting disabled
          return;
        }
        this.refresh();
      },

      _updateIcon: function( checked ) {
        var toAdd = "ui-icon ui-icon-background ";

        if ( this.options.icon ) {
          if ( !this.icon ) {
            this.icon = $( "<span>" );
            this.iconSpace = $( "<span> </span>" );
            this._addClass( this.iconSpace, "ui-checkboxradio-icon-space" );
          }

          if ( this.type === "checkbox" ) {
            toAdd += checked ? "ui-icon-check ui-state-checked" : "ui-icon-blank";
            this._removeClass( this.icon, null, checked ? "ui-icon-blank" : "ui-icon-check" );
          } else {
            toAdd += "ui-icon-blank";
          }
          this._addClass( this.icon, "ui-checkboxradio-icon", toAdd );
          if ( !checked ) {
            this._removeClass( this.icon, null, "ui-icon-check ui-state-checked" );
          }
          this.icon.prependTo( this.label ).after( this.iconSpace );
        } else if ( this.icon !== undefined ) {
          this.icon.remove();
          this.iconSpace.remove();
          delete this.icon;
        }
      },

      _updateLabel: function() {

        // Remove the contents of the label ( minus the icon, icon space, and input )
        var contents = this.label.contents().not( this.element[ 0 ] );
        if ( this.icon ) {
          contents = contents.not( this.icon[ 0 ] );
        }
        if ( this.iconSpace ) {
          contents = contents.not( this.iconSpace[ 0 ] );
        }
        contents.remove();

        this.label.append( this.options.label );
      },

      refresh: function() {
        var checked = this.element[ 0 ].checked,
          isDisabled = this.element[ 0 ].disabled;

        this._updateIcon( checked );
        this._toggleClass( this.label, "ui-checkboxradio-checked", "ui-state-active", checked );
        if ( this.options.label !== null ) {
          this._updateLabel();
        }

        if ( isDisabled !== this.options.disabled ) {
          this._setOptions( { "disabled": isDisabled } );
        }
      }

    } ] );

    var widgetsCheckboxradio = $.ui.checkboxradio;


    /*!
     * jQuery UI Button 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.widget( "ui.button", {
      version: "1.12.1",
      defaultElement: "<button>",
      options: {
        classes: {
          "ui-button": "ui-corner-all"
        },
        disabled: null,
        icon: null,
        iconPosition: "beginning",
        label: null,
        showLabel: true
      },

      _getCreateOptions: function() {
        var disabled,

          // This is to support cases like in jQuery Mobile where the base widget does have
          // an implementation of _getCreateOptions
          options = this._super() || {};

        this.isInput = this.element.is( "input" );

        disabled = this.element[ 0 ].disabled;
        if ( disabled != null ) {
          options.disabled = disabled;
        }

        this.originalLabel = this.isInput ? this.element.val() : this.element.html();
        if ( this.originalLabel ) {
          options.label = this.originalLabel;
        }

        return options;
      },

      _create: function() {
        if ( !this.option.showLabel && !this.options.icon ) {
          this.options.showLabel = true;
        }

        // We have to check the option again here even though we did in _getCreateOptions,
        // because null may have been passed on init which would override what was set in
        // _getCreateOptions
        if ( this.options.disabled == null ) {
          this.options.disabled = this.element[ 0 ].disabled || false;
        }

        this.hasTitle = !!this.element.attr( "title" );

        // Check to see if the label needs to be set or if its already correct
        if ( this.options.label && this.options.label !== this.originalLabel ) {
          if ( this.isInput ) {
            this.element.val( this.options.label );
          } else {
            this.element.html( this.options.label );
          }
        }
        this._addClass( "ui-button", "ui-widget" );
        this._setOption( "disabled", this.options.disabled );
        this._enhance();

        if ( this.element.is( "a" ) ) {
          this._on( {
            "keyup": function( event ) {
              if ( event.keyCode === $.ui.keyCode.SPACE ) {
                event.preventDefault();

                // Support: PhantomJS <= 1.9, IE 8 Only
                // If a native click is available use it so we actually cause navigation
                // otherwise just trigger a click event
                if ( this.element[ 0 ].click ) {
                  this.element[ 0 ].click();
                } else {
                  this.element.trigger( "click" );
                }
              }
            }
          } );
        }
      },

      _enhance: function() {
        if ( !this.element.is( "button" ) ) {
          this.element.attr( "role", "button" );
        }

        if ( this.options.icon ) {
          this._updateIcon( "icon", this.options.icon );
          this._updateTooltip();
        }
      },

      _updateTooltip: function() {
        this.title = this.element.attr( "title" );

        if ( !this.options.showLabel && !this.title ) {
          this.element.attr( "title", this.options.label );
        }
      },

      _updateIcon: function( option, value ) {
        var icon = option !== "iconPosition",
          position = icon ? this.options.iconPosition : value,
          displayBlock = position === "top" || position === "bottom";

        // Create icon
        if ( !this.icon ) {
          this.icon = $( "<span>" );

          this._addClass( this.icon, "ui-button-icon", "ui-icon" );

          if ( !this.options.showLabel ) {
            this._addClass( "ui-button-icon-only" );
          }
        } else if ( icon ) {

          // If we are updating the icon remove the old icon class
          this._removeClass( this.icon, null, this.options.icon );
        }

        // If we are updating the icon add the new icon class
        if ( icon ) {
          this._addClass( this.icon, null, value );
        }

        this._attachIcon( position );

        // If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
        // the iconSpace if there is one.
        if ( displayBlock ) {
          this._addClass( this.icon, null, "ui-widget-icon-block" );
          if ( this.iconSpace ) {
            this.iconSpace.remove();
          }
        } else {

          // Position is beginning or end so remove the ui-widget-icon-block class and add the
          // space if it does not exist
          if ( !this.iconSpace ) {
            this.iconSpace = $( "<span> </span>" );
            this._addClass( this.iconSpace, "ui-button-icon-space" );
          }
          this._removeClass( this.icon, null, "ui-wiget-icon-block" );
          this._attachIconSpace( position );
        }
      },

      _destroy: function() {
        this.element.removeAttr( "role" );

        if ( this.icon ) {
          this.icon.remove();
        }
        if ( this.iconSpace ) {
          this.iconSpace.remove();
        }
        if ( !this.hasTitle ) {
          this.element.removeAttr( "title" );
        }
      },

      _attachIconSpace: function( iconPosition ) {
        this.icon[ /^(?:end|bottom)/.test( iconPosition ) ? "before" : "after" ]( this.iconSpace );
      },

      _attachIcon: function( iconPosition ) {
        this.element[ /^(?:end|bottom)/.test( iconPosition ) ? "append" : "prepend" ]( this.icon );
      },

      _setOptions: function( options ) {
        var newShowLabel = options.showLabel === undefined ?
          this.options.showLabel :
          options.showLabel,
          newIcon = options.icon === undefined ? this.options.icon : options.icon;

        if ( !newShowLabel && !newIcon ) {
          options.showLabel = true;
        }
        this._super( options );
      },

      _setOption: function( key, value ) {
        if ( key === "icon" ) {
          if ( value ) {
            this._updateIcon( key, value );
          } else if ( this.icon ) {
            this.icon.remove();
            if ( this.iconSpace ) {
              this.iconSpace.remove();
            }
          }
        }

        if ( key === "iconPosition" ) {
          this._updateIcon( key, value );
        }

        // Make sure we can't end up with a button that has neither text nor icon
        if ( key === "showLabel" ) {
          this._toggleClass( "ui-button-icon-only", null, !value );
          this._updateTooltip();
        }

        if ( key === "label" ) {
          if ( this.isInput ) {
            this.element.val( value );
          } else {

            // If there is an icon, append it, else nothing then append the value
            // this avoids removal of the icon when setting label text
            this.element.html( value );
            if ( this.icon ) {
              this._attachIcon( this.options.iconPosition );
              this._attachIconSpace( this.options.iconPosition );
            }
          }
        }

        this._super( key, value );

        if ( key === "disabled" ) {
          this._toggleClass( null, "ui-state-disabled", value );
          this.element[ 0 ].disabled = value;
          if ( value ) {
            this.element.blur();
          }
        }
      },

      refresh: function() {

        // Make sure to only check disabled if its an element that supports this otherwise
        // check for the disabled class to determine state
        var isDisabled = this.element.is( "input, button" ) ?
          this.element[ 0 ].disabled : this.element.hasClass( "ui-button-disabled" );

        if ( isDisabled !== this.options.disabled ) {
          this._setOptions( { disabled: isDisabled } );
        }

        this._updateTooltip();
      }
    } );

    if ( $.uiBackCompat !== false ) {

      // Text and Icons options
      $.widget( "ui.button", $.ui.button, {
        options: {
          text: true,
          icons: {
            primary: null,
            secondary: null
          }
        },

        _create: function() {
          if ( this.options.showLabel && !this.options.text ) {
            this.options.showLabel = this.options.text;
          }
          if ( !this.options.showLabel && this.options.text ) {
            this.options.text = this.options.showLabel;
          }
          if ( !this.options.icon && ( this.options.icons.primary ||
            this.options.icons.secondary ) ) {
            if ( this.options.icons.primary ) {
              this.options.icon = this.options.icons.primary;
            } else {
              this.options.icon = this.options.icons.secondary;
              this.options.iconPosition = "end";
            }
          } else if ( this.options.icon ) {
            this.options.icons.primary = this.options.icon;
          }
          this._super();
        },

        _setOption: function( key, value ) {
          if ( key === "text" ) {
            this._super( "showLabel", value );
            return;
          }
          if ( key === "showLabel" ) {
            this.options.text = value;
          }
          if ( key === "icon" ) {
            this.options.icons.primary = value;
          }
          if ( key === "icons" ) {
            if ( value.primary ) {
              this._super( "icon", value.primary );
              this._super( "iconPosition", "beginning" );
            } else if ( value.secondary ) {
              this._super( "icon", value.secondary );
              this._super( "iconPosition", "end" );
            }
          }
          this._superApply( arguments );
        }
      } );

      $.fn.button = ( function( orig ) {
        return function() {
          if ( !this.length || ( this.length && this[ 0 ].tagName !== "INPUT" ) ||
            ( this.length && this[ 0 ].tagName === "INPUT" && (
              this.attr( "type" ) !== "checkbox" && this.attr( "type" ) !== "radio"
            ) ) ) {
            return orig.apply( this, arguments );
          }
          if ( !$.ui.checkboxradio ) {
            $.error( "Checkboxradio widget missing" );
          }
          if ( arguments.length === 0 ) {
            return this.checkboxradio( {
              "icon": false
            } );
          }
          return this.checkboxradio.apply( this, arguments );
        };
      } )( $.fn.button );

      $.fn.buttonset = function() {
        if ( !$.ui.controlgroup ) {
          $.error( "Controlgroup widget missing" );
        }
        if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" && arguments[ 2 ] ) {
          return this.controlgroup.apply( this,
            [ arguments[ 0 ], "items.button", arguments[ 2 ] ] );
        }
        if ( arguments[ 0 ] === "option" && arguments[ 1 ] === "items" ) {
          return this.controlgroup.apply( this, [ arguments[ 0 ], "items.button" ] );
        }
        if ( typeof arguments[ 0 ] === "object" && arguments[ 0 ].items ) {
          arguments[ 0 ].items = {
            button: arguments[ 0 ].items
          };
        }
        return this.controlgroup.apply( this, arguments );
      };
    }

    var widgetsButton = $.ui.button;


    /*!
     * jQuery UI Dialog 1.12.1
     * http://jqueryui.com
     *
     * Copyright jQuery Foundation and other contributors
     * Released under the MIT license.
     * http://jquery.org/license
     */

    $.widget( "ui.dialog", {
      version: "1.12.1",
      options: {
        appendTo: "body",
        autoOpen: true,
        buttons: [],
        classes: {
          "ui-dialog": "ui-corner-all",
          "ui-dialog-titlebar": "ui-corner-all"
        },
        closeOnEscape: true,
        closeText: "Close",
        draggable: true,
        hide: null,
        height: "auto",
        maxHeight: null,
        maxWidth: null,
        minHeight: 150,
        minWidth: 150,
        modal: false,
        position: {
          my: "center",
          at: "center",
          of: window,
          collision: "fit",

          // Ensure the titlebar is always visible
          using: function( pos ) {
            var topOffset = $( this ).css( pos ).offset().top;
            if ( topOffset < 0 ) {
              $( this ).css( "top", pos.top - topOffset );
            }
          }
        },
        resizable: true,
        show: null,
        title: null,
        width: 300,

        // Callbacks
        beforeClose: null,
        close: null,
        drag: null,
        dragStart: null,
        dragStop: null,
        focus: null,
        open: null,
        resize: null,
        resizeStart: null,
        resizeStop: null
      },

      sizeRelatedOptions: {
        buttons: true,
        height: true,
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true,
        width: true
      },

      resizableRelatedOptions: {
        maxHeight: true,
        maxWidth: true,
        minHeight: true,
        minWidth: true
      },

      _create: function() {
        this.originalCss = {
          display: this.element[ 0 ].style.display,
          width: this.element[ 0 ].style.width,
          minHeight: this.element[ 0 ].style.minHeight,
          maxHeight: this.element[ 0 ].style.maxHeight,
          height: this.element[ 0 ].style.height
        };
        this.originalPosition = {
          parent: this.element.parent(),
          index: this.element.parent().children().index( this.element )
        };
        this.originalTitle = this.element.attr( "title" );
        if ( this.options.title == null && this.originalTitle != null ) {
          this.options.title = this.originalTitle;
        }

        // Dialogs can't be disabled
        if ( this.options.disabled ) {
          this.options.disabled = false;
        }

        this._createWrapper();

        this.element
          .show()
          .removeAttr( "title" )
          .appendTo( this.uiDialog );

        this._addClass( "ui-dialog-content", "ui-widget-content" );

        this._createTitlebar();
        this._createButtonPane();

        if ( this.options.draggable && $.fn.draggable ) {
          this._makeDraggable();
        }
        if ( this.options.resizable && $.fn.resizable ) {
          this._makeResizable();
        }

        this._isOpen = false;

        this._trackFocus();
      },

      _init: function() {
        if ( this.options.autoOpen ) {
          this.open();
        }
      },

      _appendTo: function() {
        var element = this.options.appendTo;
        if ( element && ( element.jquery || element.nodeType ) ) {
          return $( element );
        }
        return this.document.find( element || "body" ).eq( 0 );
      },

      _destroy: function() {
        var next,
          originalPosition = this.originalPosition;

        this._untrackInstance();
        this._destroyOverlay();

        this.element
          .removeUniqueId()
          .css( this.originalCss )

          // Without detaching first, the following becomes really slow
          .detach();

        this.uiDialog.remove();

        if ( this.originalTitle ) {
          this.element.attr( "title", this.originalTitle );
        }

        next = originalPosition.parent.children().eq( originalPosition.index );

        // Don't try to place the dialog next to itself (#8613)
        if ( next.length && next[ 0 ] !== this.element[ 0 ] ) {
          next.before( this.element );
        } else {
          originalPosition.parent.append( this.element );
        }
      },

      widget: function() {
        return this.uiDialog;
      },

      disable: $.noop,
      enable: $.noop,

      close: function( event ) {
        var that = this;

        if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
          return;
        }

        this._isOpen = false;
        this._focusedElement = null;
        this._destroyOverlay();
        this._untrackInstance();

        if ( !this.opener.filter( ":focusable" ).trigger( "focus" ).length ) {

          // Hiding a focused element doesn't trigger blur in WebKit
          // so in case we have nothing to focus on, explicitly blur the active element
          // https://bugs.webkit.org/show_bug.cgi?id=47182
          $.ui.safeBlur( $.ui.safeActiveElement( this.document[ 0 ] ) );
        }

        this._hide( this.uiDialog, this.options.hide, function() {
          that._trigger( "close", event );
        } );
      },

      isOpen: function() {
        return this._isOpen;
      },

      moveToTop: function() {
        this._moveToTop();
      },

      _moveToTop: function( event, silent ) {
        var moved = false,
          zIndices = this.uiDialog.siblings( ".ui-front:visible" ).map( function() {
            return +$( this ).css( "z-index" );
          } ).get(),
          zIndexMax = Math.max.apply( null, zIndices );

        if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
          this.uiDialog.css( "z-index", zIndexMax + 1 );
          moved = true;
        }

        if ( moved && !silent ) {
          this._trigger( "focus", event );
        }
        return moved;
      },

      open: function() {
        var that = this;
        if ( this._isOpen ) {
          if ( this._moveToTop() ) {
            this._focusTabbable();
          }
          return;
        }

        this._isOpen = true;
        this.opener = $( $.ui.safeActiveElement( this.document[ 0 ] ) );

        this._size();
        this._position();
        this._createOverlay();
        this._moveToTop( null, true );

        // Ensure the overlay is moved to the top with the dialog, but only when
        // opening. The overlay shouldn't move after the dialog is open so that
        // modeless dialogs opened after the modal dialog stack properly.
        if ( this.overlay ) {
          this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
        }

        this._show( this.uiDialog, this.options.show, function() {
          that._focusTabbable();
          that._trigger( "focus" );
        } );

        // Track the dialog immediately upon openening in case a focus event
        // somehow occurs outside of the dialog before an element inside the
        // dialog is focused (#10152)
        this._makeFocusTarget();

        this._trigger( "open" );
      },

      _focusTabbable: function() {

        // Set focus to the first match:
        // 1. An element that was focused previously
        // 2. First element inside the dialog matching [autofocus]
        // 3. Tabbable element inside the content element
        // 4. Tabbable element inside the buttonpane
        // 5. The close button
        // 6. The dialog itself
        var hasFocus = this._focusedElement;
        if ( !hasFocus ) {
          hasFocus = this.element.find( "[autofocus]" );
        }
        if ( !hasFocus.length ) {
          hasFocus = this.element.find( ":tabbable" );
        }
        if ( !hasFocus.length ) {
          hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
        }
        if ( !hasFocus.length ) {
          hasFocus = this.uiDialogTitlebarClose.filter( ":tabbable" );
        }
        if ( !hasFocus.length ) {
          hasFocus = this.uiDialog;
        }
        hasFocus.eq( 0 ).trigger( "focus" );
      },

      _keepFocus: function( event ) {
        function checkFocus() {
          var activeElement = $.ui.safeActiveElement( this.document[ 0 ] ),
            isActive = this.uiDialog[ 0 ] === activeElement ||
              $.contains( this.uiDialog[ 0 ], activeElement );
          if ( !isActive ) {
            this._focusTabbable();
          }
        }
        event.preventDefault();
        checkFocus.call( this );

        // support: IE
        // IE <= 8 doesn't prevent moving focus even with event.preventDefault()
        // so we check again later
        this._delay( checkFocus );
      },

      _createWrapper: function() {
        this.uiDialog = $( "<div>" )
          .hide()
          .attr( {

            // Setting tabIndex makes the div focusable
            tabIndex: -1,
            role: "dialog"
          } )
          .appendTo( this._appendTo() );

        this._addClass( this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front" );
        this._on( this.uiDialog, {
          keydown: function( event ) {
            if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
              event.keyCode === $.ui.keyCode.ESCAPE ) {
              event.preventDefault();
              this.close( event );
              return;
            }

            // Prevent tabbing out of dialogs
            if ( event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented() ) {
              return;
            }
            var tabbables = this.uiDialog.find( ":tabbable" ),
              first = tabbables.filter( ":first" ),
              last = tabbables.filter( ":last" );

            if ( ( event.target === last[ 0 ] || event.target === this.uiDialog[ 0 ] ) &&
              !event.shiftKey ) {
              this._delay( function() {
                first.trigger( "focus" );
              } );
              event.preventDefault();
            } else if ( ( event.target === first[ 0 ] ||
              event.target === this.uiDialog[ 0 ] ) && event.shiftKey ) {
              this._delay( function() {
                last.trigger( "focus" );
              } );
              event.preventDefault();
            }
          },
          mousedown: function( event ) {
            if ( this._moveToTop( event ) ) {
              this._focusTabbable();
            }
          }
        } );

        // We assume that any existing aria-describedby attribute means
        // that the dialog content is marked up properly
        // otherwise we brute force the content as the description
        if ( !this.element.find( "[aria-describedby]" ).length ) {
          this.uiDialog.attr( {
            "aria-describedby": this.element.uniqueId().attr( "id" )
          } );
        }
      },

      _createTitlebar: function() {
        var uiDialogTitle;

        this.uiDialogTitlebar = $( "<div>" );
        this._addClass( this.uiDialogTitlebar,
          "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix" );
        this._on( this.uiDialogTitlebar, {
          mousedown: function( event ) {

            // Don't prevent click on close button (#8838)
            // Focusing a dialog that is partially scrolled out of view
            // causes the browser to scroll it into view, preventing the click event
            if ( !$( event.target ).closest( ".ui-dialog-titlebar-close" ) ) {

              // Dialog isn't getting focus when dragging (#8063)
              this.uiDialog.trigger( "focus" );
            }
          }
        } );

        // Support: IE
        // Use type="button" to prevent enter keypresses in textboxes from closing the
        // dialog in IE (#9312)
        this.uiDialogTitlebarClose = $( "<button type='button'></button>" )
          .button( {
            label: $( "<a>" ).text( this.options.closeText ).html(),
            icon: "ui-icon-closethick",
            showLabel: false
          } )
          .appendTo( this.uiDialogTitlebar );

        this._addClass( this.uiDialogTitlebarClose, "ui-dialog-titlebar-close" );
        this._on( this.uiDialogTitlebarClose, {
          click: function( event ) {
            event.preventDefault();
            this.close( event );
          }
        } );

        uiDialogTitle = $( "<span>" ).uniqueId().prependTo( this.uiDialogTitlebar );
        this._addClass( uiDialogTitle, "ui-dialog-title" );
        this._title( uiDialogTitle );

        this.uiDialogTitlebar.prependTo( this.uiDialog );

        this.uiDialog.attr( {
          "aria-labelledby": uiDialogTitle.attr( "id" )
        } );
      },

      _title: function( title ) {
        if ( this.options.title ) {
          title.text( this.options.title );
        } else {
          title.html( "&#160;" );
        }
      },

      _createButtonPane: function() {
        this.uiDialogButtonPane = $( "<div>" );
        this._addClass( this.uiDialogButtonPane, "ui-dialog-buttonpane",
          "ui-widget-content ui-helper-clearfix" );

        this.uiButtonSet = $( "<div>" )
          .appendTo( this.uiDialogButtonPane );
        this._addClass( this.uiButtonSet, "ui-dialog-buttonset" );

        this._createButtons();
      },

      _createButtons: function() {
        var that = this,
          buttons = this.options.buttons;

        // If we already have a button pane, remove it
        this.uiDialogButtonPane.remove();
        this.uiButtonSet.empty();

        if ( $.isEmptyObject( buttons ) || ( $.isArray( buttons ) && !buttons.length ) ) {
          this._removeClass( this.uiDialog, "ui-dialog-buttons" );
          return;
        }

        $.each( buttons, function( name, props ) {
          var click, buttonOptions;
          props = $.isFunction( props ) ?
            { click: props, text: name } :
            props;

          // Default to a non-submitting button
          props = $.extend( { type: "button" }, props );

          // Change the context for the click callback to be the main element
          click = props.click;
          buttonOptions = {
            icon: props.icon,
            iconPosition: props.iconPosition,
            showLabel: props.showLabel,

            // Deprecated options
            icons: props.icons,
            text: props.text
          };

          delete props.click;
          delete props.icon;
          delete props.iconPosition;
          delete props.showLabel;

          // Deprecated options
          delete props.icons;
          if ( typeof props.text === "boolean" ) {
            delete props.text;
          }

          $( "<button></button>", props )
            .button( buttonOptions )
            .appendTo( that.uiButtonSet )
            .on( "click", function() {
              click.apply( that.element[ 0 ], arguments );
            } );
        } );
        this._addClass( this.uiDialog, "ui-dialog-buttons" );
        this.uiDialogButtonPane.appendTo( this.uiDialog );
      },

      _makeDraggable: function() {
        var that = this,
          options = this.options;

        function filteredUi( ui ) {
          return {
            position: ui.position,
            offset: ui.offset
          };
        }

        this.uiDialog.draggable( {
          cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
          handle: ".ui-dialog-titlebar",
          containment: "document",
          start: function( event, ui ) {
            that._addClass( $( this ), "ui-dialog-dragging" );
            that._blockFrames();
            that._trigger( "dragStart", event, filteredUi( ui ) );
          },
          drag: function( event, ui ) {
            that._trigger( "drag", event, filteredUi( ui ) );
          },
          stop: function( event, ui ) {
            var left = ui.offset.left - that.document.scrollLeft(),
              top = ui.offset.top - that.document.scrollTop();

            options.position = {
              my: "left top",
              at: "left" + ( left >= 0 ? "+" : "" ) + left + " " +
                "top" + ( top >= 0 ? "+" : "" ) + top,
              of: that.window
            };
            that._removeClass( $( this ), "ui-dialog-dragging" );
            that._unblockFrames();
            that._trigger( "dragStop", event, filteredUi( ui ) );
          }
        } );
      },

      _makeResizable: function() {
        var that = this,
          options = this.options,
          handles = options.resizable,

          // .ui-resizable has position: relative defined in the stylesheet
          // but dialogs have to use absolute or fixed positioning
          position = this.uiDialog.css( "position" ),
          resizeHandles = typeof handles === "string" ?
            handles :
            "n,e,s,w,se,sw,ne,nw";

        function filteredUi( ui ) {
          return {
            originalPosition: ui.originalPosition,
            originalSize: ui.originalSize,
            position: ui.position,
            size: ui.size
          };
        }

        this.uiDialog.resizable( {
          cancel: ".ui-dialog-content",
          containment: "document",
          alsoResize: this.element,
          maxWidth: options.maxWidth,
          maxHeight: options.maxHeight,
          minWidth: options.minWidth,
          minHeight: this._minHeight(),
          handles: resizeHandles,
          start: function( event, ui ) {
            that._addClass( $( this ), "ui-dialog-resizing" );
            that._blockFrames();
            that._trigger( "resizeStart", event, filteredUi( ui ) );
          },
          resize: function( event, ui ) {
            that._trigger( "resize", event, filteredUi( ui ) );
          },
          stop: function( event, ui ) {
            var offset = that.uiDialog.offset(),
              left = offset.left - that.document.scrollLeft(),
              top = offset.top - that.document.scrollTop();

            options.height = that.uiDialog.height();
            options.width = that.uiDialog.width();
            options.position = {
              my: "left top",
              at: "left" + ( left >= 0 ? "+" : "" ) + left + " " +
                "top" + ( top >= 0 ? "+" : "" ) + top,
              of: that.window
            };
            that._removeClass( $( this ), "ui-dialog-resizing" );
            that._unblockFrames();
            that._trigger( "resizeStop", event, filteredUi( ui ) );
          }
        } )
          .css( "position", position );
      },

      _trackFocus: function() {
        this._on( this.widget(), {
          focusin: function( event ) {
            this._makeFocusTarget();
            this._focusedElement = $( event.target );
          }
        } );
      },

      _makeFocusTarget: function() {
        this._untrackInstance();
        this._trackingInstances().unshift( this );
      },

      _untrackInstance: function() {
        var instances = this._trackingInstances(),
          exists = $.inArray( this, instances );
        if ( exists !== -1 ) {
          instances.splice( exists, 1 );
        }
      },

      _trackingInstances: function() {
        var instances = this.document.data( "ui-dialog-instances" );
        if ( !instances ) {
          instances = [];
          this.document.data( "ui-dialog-instances", instances );
        }
        return instances;
      },

      _minHeight: function() {
        var options = this.options;

        return options.height === "auto" ?
          options.minHeight :
          Math.min( options.minHeight, options.height );
      },

      _position: function() {

        // Need to show the dialog to get the actual offset in the position plugin
        var isVisible = this.uiDialog.is( ":visible" );
        if ( !isVisible ) {
          this.uiDialog.show();
        }
        this.uiDialog.position( this.options.position );
        if ( !isVisible ) {
          this.uiDialog.hide();
        }
      },

      _setOptions: function( options ) {
        var that = this,
          resize = false,
          resizableOptions = {};

        $.each( options, function( key, value ) {
          that._setOption( key, value );

          if ( key in that.sizeRelatedOptions ) {
            resize = true;
          }
          if ( key in that.resizableRelatedOptions ) {
            resizableOptions[ key ] = value;
          }
        } );

        if ( resize ) {
          this._size();
          this._position();
        }
        if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
          this.uiDialog.resizable( "option", resizableOptions );
        }
      },

      _setOption: function( key, value ) {
        var isDraggable, isResizable,
          uiDialog = this.uiDialog;

        if ( key === "disabled" ) {
          return;
        }

        this._super( key, value );

        if ( key === "appendTo" ) {
          this.uiDialog.appendTo( this._appendTo() );
        }

        if ( key === "buttons" ) {
          this._createButtons();
        }

        if ( key === "closeText" ) {
          this.uiDialogTitlebarClose.button( {

            // Ensure that we always pass a string
            label: $( "<a>" ).text( "" + this.options.closeText ).html()
          } );
        }

        if ( key === "draggable" ) {
          isDraggable = uiDialog.is( ":data(ui-draggable)" );
          if ( isDraggable && !value ) {
            uiDialog.draggable( "destroy" );
          }

          if ( !isDraggable && value ) {
            this._makeDraggable();
          }
        }

        if ( key === "position" ) {
          this._position();
        }

        if ( key === "resizable" ) {

          // currently resizable, becoming non-resizable
          isResizable = uiDialog.is( ":data(ui-resizable)" );
          if ( isResizable && !value ) {
            uiDialog.resizable( "destroy" );
          }

          // Currently resizable, changing handles
          if ( isResizable && typeof value === "string" ) {
            uiDialog.resizable( "option", "handles", value );
          }

          // Currently non-resizable, becoming resizable
          if ( !isResizable && value !== false ) {
            this._makeResizable();
          }
        }

        if ( key === "title" ) {
          this._title( this.uiDialogTitlebar.find( ".ui-dialog-title" ) );
        }
      },

      _size: function() {

        // If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
        // divs will both have width and height set, so we need to reset them
        var nonContentHeight, minContentHeight, maxContentHeight,
          options = this.options;

        // Reset content sizing
        this.element.show().css( {
          width: "auto",
          minHeight: 0,
          maxHeight: "none",
          height: 0
        } );

        if ( options.minWidth > options.width ) {
          options.width = options.minWidth;
        }

        // Reset wrapper sizing
        // determine the height of all the non-content elements
        nonContentHeight = this.uiDialog.css( {
          height: "auto",
          width: options.width
        } )
          .outerHeight();
        minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
        maxContentHeight = typeof options.maxHeight === "number" ?
          Math.max( 0, options.maxHeight - nonContentHeight ) :
          "none";

        if ( options.height === "auto" ) {
          this.element.css( {
            minHeight: minContentHeight,
            maxHeight: maxContentHeight,
            height: "auto"
          } );
        } else {
          this.element.height( Math.max( 0, options.height - nonContentHeight ) );
        }

        if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
          this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
        }
      },

      _blockFrames: function() {
        this.iframeBlocks = this.document.find( "iframe" ).map( function() {
          var iframe = $( this );

          return $( "<div>" )
            .css( {
              position: "absolute",
              width: iframe.outerWidth(),
              height: iframe.outerHeight()
            } )
            .appendTo( iframe.parent() )
            .offset( iframe.offset() )[ 0 ];
        } );
      },

      _unblockFrames: function() {
        if ( this.iframeBlocks ) {
          this.iframeBlocks.remove();
          delete this.iframeBlocks;
        }
      },

      _allowInteraction: function( event ) {
        if ( $( event.target ).closest( ".ui-dialog" ).length ) {
          return true;
        }

        // TODO: Remove hack when datepicker implements
        // the .ui-front logic (#8989)
        return !!$( event.target ).closest( ".ui-datepicker" ).length;
      },

      _createOverlay: function() {
        if ( !this.options.modal ) {
          return;
        }

        // We use a delay in case the overlay is created from an
        // event that we're going to be cancelling (#2804)
        var isOpening = true;
        this._delay( function() {
          isOpening = false;
        } );

        if ( !this.document.data( "ui-dialog-overlays" ) ) {

          // Prevent use of anchors and inputs
          // Using _on() for an event handler shared across many instances is
          // safe because the dialogs stack and must be closed in reverse order
          this._on( this.document, {
            focusin: function( event ) {
              if ( isOpening ) {
                return;
              }

              if ( !this._allowInteraction( event ) ) {
                event.preventDefault();
                this._trackingInstances()[ 0 ]._focusTabbable();
              }
            }
          } );
        }

        this.overlay = $( "<div>" )
          .appendTo( this._appendTo() );

        this._addClass( this.overlay, null, "ui-widget-overlay ui-front" );
        this._on( this.overlay, {
          mousedown: "_keepFocus"
        } );
        this.document.data( "ui-dialog-overlays",
          ( this.document.data( "ui-dialog-overlays" ) || 0 ) + 1 );
      },

      _destroyOverlay: function() {
        if ( !this.options.modal ) {
          return;
        }

        if ( this.overlay ) {
          var overlays = this.document.data( "ui-dialog-overlays" ) - 1;

          if ( !overlays ) {
            this._off( this.document, "focusin" );
            this.document.removeData( "ui-dialog-overlays" );
          } else {
            this.document.data( "ui-dialog-overlays", overlays );
          }

          this.overlay.remove();
          this.overlay = null;
        }
      }
    } );

    if ( $.uiBackCompat !== false ) {

      // Backcompat for dialogClass option
      $.widget( "ui.dialog", $.ui.dialog, {
        options: {
          dialogClass: ""
        },
        _createWrapper: function() {
          this._super();
          this.uiDialog.addClass( this.options.dialogClass );
        },
        _setOption: function( key, value ) {
          if ( key === "dialogClass" ) {
            this.uiDialog
              .removeClass( this.options.dialogClass )
              .addClass( value );
          }
          this._superApply( arguments );
        }
      } );
    }

    var widgetsDialog = $.ui.dialog;

  })($);


  /**
   * WMKS
   */

  function stringFromArray(data) {
    let length = data.length;
    let tmp = new Array(Math.ceil(length / 8));
    let i;
    let j;

    for (i = 0, j = 0; i < length; i += 8, j++) {
      tmp[j] = String.fromCharCode(data[i],
        data[i + 1],
        data[i + 2],
        data[i + 3],
        data[i + 4],
        data[i + 5],
        data[i + 6],
        data[i + 7]);
    }

    return tmp.join('').substr(0, length);
  }

  function arrayFromString (str, useUint8Array?) {
    let length = str.length;
    let array = useUint8Array ? new Uint8Array(length) : new Array(length);
    let i;

    for (i = 0; i+7 < length; i += 8) {
      array[i] = str.charCodeAt(i);
      array[i + 1] = str.charCodeAt(i + 1);
      array[i + 2] = str.charCodeAt(i + 2);
      array[i + 3] = str.charCodeAt(i + 3);
      array[i + 4] = str.charCodeAt(i + 4);
      array[i + 5] = str.charCodeAt(i + 5);
      array[i + 6] = str.charCodeAt(i + 6);
      array[i + 7] = str.charCodeAt(i + 7);
    }

    for (; i < length; i++) {
      array[i] = str.charCodeAt(i);
    }

    return array;
  }

  let Base64 = {
    decodeToArray: function (data, useUint8Array) {
      return arrayFromString(window.atob(data), useUint8Array);
    },

    decodeToString: function (data) {
      return window.atob(data);
    },

    encodeFromArray: function (data) {
      return window.btoa(stringFromArray(data));
    },

    encodeFromString: function (data) {
      return window.btoa(data);
    }
  };

  /**
   * Convenience functions for building an array of bytes
   * (for sending messages to servers or handling image formats).
   */
  Array.prototype.push8 = function (aByte) {
    this.push(aByte & 0xFF);
  };

  Array.prototype.push16 = function (aWord) {
    this.push((aWord >> 8) & 0xFF,
      (aWord     ) & 0xFF);
  };

  Array.prototype.push32 = function (aLongWord) {
    this.push((aLongWord >> 24) & 0xFF,
      (aLongWord >> 16) & 0xFF,
      (aLongWord >>  8) & 0xFF,
      (aLongWord      ) & 0xFF);
  };

  Array.prototype.push16le = function(aWord) {
    this.push((aWord     ) & 0xff,
      (aWord >> 8) & 0xff);
  };

  Array.prototype.push32le = function(aLongWord) {
    this.push((aLongWord     ) & 0xff,
      (aLongWord >> 8) & 0xff,
      (aLongWord >> 16) & 0xff,
      (aLongWord >> 24) & 0xff);
  };

  /**
   * This class abstracts Image caching solution in an optimal way. It takes
   * care of returning the image in a clean, and memory leak proof manner.
   * It exposes 2 functions  to get and release images. The get function
   * returns an Image object either from an unused cache or by creating a new one.
   * The return function, depending on the max allowed cache size decides to
   * either add the image to the cache or get rid of it completely.
   */
  function ImageManagerWMKS(imageCacheSize) {
    "use strict";
    const _cacheSize = imageCacheSize;  // Max number of images cached.
    const _cacheArray = [];             // Cache to hold images.

    // Pushes the current image to the cache if it is not full,
    // and then deletes the image.
    const _getImageFromCache = function() {
      if (_cacheArray.length > 0) {
        return _cacheArray.shift();
      } else {
        return new Image();
      }
    };

    //  This private function takes an array containing a single image and
    //  deletes the image. The reason for using an array containing the image
    //  instead of 'delete image' call is to comply with javascript strict mode.
    const _deleteImage = function(imgArray) {
      delete imgArray[0];
      imgArray[0] = null;
      imgArray = null;
    };

    // Private function that resets event handlers if any. Sets src to an
    // empty image. Pushes the current image to the cache if it is not full,
    // else deletes the image.
    const _cacheImageOrDelete = function(image) {

      // Reset onload and onerror event handlers if any.
      image.onload = image.onerror = null;

      let e = [71, 73, 70, 56, 57, 97, 1, 0, 1, 0, 0, 255, 0, 44, 0, 0, 0, 0, 1, 0, 1, 0, 0, 2, 0, 59];
      e.push32($.now());
      image.src = "data:image/gif;base64," + Base64.encodeFromArray(e);

      if (_cacheArray.length <= _cacheSize) {
        _cacheArray.push(image);
      } else {
        // Image deleting in strict mode causes error. Hence the roundabout way.
        _deleteImage([image]);
      }
    };

    // Public function that invokes a private function _getImageFromCache()
    //  to get an image.
    this.getImage = function () {
      return _getImageFromCache()
    };

    // Public function that invokes a private function _cacheImageOrDelete()
    // to add the image to a cache when the cache is not full or delete the
    // image.
    this.releaseImage = function (image) {
      if (!image) {
        return;
      }
      _cacheImageOrDelete(image);
    }
  }

  /**
   * WebMKS MP4 decoder prototype.
   */
  function MP4Decoder() {
    this._mediaSource = null;
    this._sourceBuffer = null;
    this._tempQueue = [];
    this._mediaPlayer = null;
    this._isError = false;
    this._isErrorDoneCalled = false;
    this._sendRequest = 0;
    this._doneRequest = 0;
    this._decodeDoneCb = null;
    this._decodeErrorCb = null;
    MP4Decoder.instanceNumber++;
    this._name = "MP4Decoder" + MP4Decoder.instanceNumber;
  }

  MP4Decoder.instanceNumber = 0;
  MP4Decoder.byteStreamFormat = 'video/mp4; codecs="avc1.640030"';
  MP4Decoder.prototype.toString = function() {
    return this._name;
  };

  /**
   *  Generate a Media Source object and associate it with video DOM element.
   */
  MP4Decoder.prototype.init = function (mediaPlayer, urlObject , mediaSourceObject , DoneCb, ErrorCb) {
    const self = this;
    // @ts-ignore
    const URL = urlObject  || window.URL || window.webkitURL;
    // @ts-ignore
    const MediaSource = mediaSourceObject  || window.MediaSource || window.WebKitMediaSource;

    this.reset();

    this._decodeDoneCb = DoneCb;
    this._decodeErrorCb = ErrorCb;
    this._mediaPlayer = mediaPlayer;
    this._mediaSource = new MediaSource();

    // Attach a media source object to HTMLMediaElement.
    this._mediaPlayer.src = URL.createObjectURL(this._mediaSource);

    this._mediaSource.addEventListener('sourceopen', function(e) {
      return self._onMediaSourceOpen(e);
    }, false);
    this._mediaSource.addEventListener('webkitsourceopen', function(e) {
      return self._onMediaSourceOpen(e);
    }, false);
  };

  /**
   * After media source is open, create a source buffer with MP4 decoder and
   * attach it to media source object. If there is any MP4 data in the buffer,
   * add it to source buffer so that media source can play it.
   */
  MP4Decoder.prototype._onMediaSourceOpen = function (e) {
    const self = this;

    WMKS.LOGGER.log(this + " media source status is changed to open.");
    if (this._mediaSource.readyState !== "open") {
      WMKS.LOGGER.log(this + " media source is not open yet.");
      return;
    }
    this._sourceBuffer = this._mediaSource.addSourceBuffer(MP4Decoder.byteStreamFormat);
    this._sourceBuffer.addEventListener("updateend", function () {
      if (self._tempQueue.length === 0) return;
      if (self._tempQueue[0].method === "add" && self._decodeDoneCb) {
        self._doneRequest++;
        WMKS.LOGGER.debug(self + " request track: send " + self._sendRequest + " done " + self._doneRequest);
        self._decodeDoneCb();
      }
      self._tempQueue.shift();
      self._flushPayloads();
    });

    /*
    * Listen to update event. It will fire after current buffer data is
    * handled by media source object.
    */
    this._sourceBuffer.addEventListener("error", function (a) {
      WMKS.LOGGER.error(self + " error code is " + a)
    });

    // If we receive any MP4 during MediaSource initialization process, decode it now.
    this._flushPayloads();
  };

  /**
   * Append all the data in our temp buffer to sourceBuffer object.
   */
  MP4Decoder.prototype._flushPayloads = function () {
    let bufferStart = 0;
    let bufferEnd = 0;
    let bufferTime = 0;

    if (!this._sourceBuffer) {
      WMKS.LOGGER.log(this + "source buffer is not ready yet.");
      return;
    }

    if (this._tempQueue.length === 0) return;
    if (this._mediaSource.readyState === "open" && !this._sourceBuffer.updating) {
      try {
        if (this._tempQueue[0].method === "add") {
          this._sourceBuffer.appendBuffer(this._tempQueue[0].payload);
        } else if (this._tempQueue[0].method === "remove") {
          bufferStart = this._sourceBuffer.buffered.start(0);
          bufferEnd = this._sourceBuffer.buffered.end(0);
          bufferTime = this._mediaPlayer.currentTime - .5;
          WMKS.LOGGER.log(this + " status:  start " + bufferStart + " end " + bufferEnd + " with current time " + this._mediaPlayer.currentTime);

          if (bufferTime > bufferStart){
            WMKS.LOGGER.log(this + " start to remove from " + bufferStart + " to " + bufferTime);
            this._sourceBuffer.remove(bufferStart, bufferTime);
          } else {
            throw WMKS.LOGGER.log(this + " it is too close to clear buffer.");
          }
          this._tempQueue.shift();
        }
      } catch (error) {
        if (error.name === "QuotaExceededError") {
          const self = this;
          WMKS.LOGGER.log(this + " browser is full.");

          setTimeout(function () {
            self._tempQueue.unshift({
              method: "remove"
            });
            self._flushPayloads()
          }, 0);

        } else {
          WMKS.LOGGER.error(this + " encounters a unrecoverable error. " + error);
          this._isError = true;

          if (this._decodeDoneCb) this._decodeDoneCb();
          if (this._decodeErrorCb && !this._isErrorDoneCalled) {
            this._isErrorDoneCalled = !0;
            this._decodeErrorCb();
          }
        }
      }
    }
  };

  /**
   * Reset all the resources used by MP4 Decoder object.
   */
  MP4Decoder.prototype.reset = function () {
    WMKS.LOGGER.log(this + " is reset.");
    if (this._mediaSource) {
      if (this._sourceBuffer) {
        this._mediaSource.removeSourceBuffer(this._sourceBuffer);
        this._sourceBuffer = null;
      }

      /*
       * Only end the stream if media source is open. Otherwise
       * Chrome browser will throw exception.
       */
      if (this._mediaSource.readyState === "open") this._mediaSource.endOfStream();

      this._mediaSource = null;
    }

    if (this._mediaPlayer) {
      this._mediaPlayer.src = "";
      this._mediaPlayer = null;
    }

    this._sendRequest = 0;
    this._doneRequest = 0;
    this._decodeDoneCb = null;
    this._decodeErrorCb = null;
    this._isError = !1;
    this._isErrorDoneCalled = !1;
    this._tempQueue = [];
  };

  /**
   * Append MP4 data to media source object. If media source is not ready, put
   * it into temporary buffer.
   */
  MP4Decoder.prototype.appendData = function (a) {
    if (this._isError) {
      WMKS.LOGGER.log(this + " is in error state.");
      if (this._decodeDoneCb) this._decodeDoneCb();
      return;
    }

    this._sendRequest++;
    this._tempQueue.push({
      method: "add",
      payload: a
    });

    this._flushPayloads();

    if (this._mediaPlayer && this._mediaPlayer.paused) {
      this._mediaPlayer.play();
    }
  };

  /**
   * Calling addUint8Utf8 with an WMKS.VNCDecoder instance will restore
   * the legacy uint8utf8 support.
   *
   * Most functions are only monkey patched if the protocol is uint8utf8,
   * leaving the normal functionality unchanged. This is a temporary fix
   * until uint8utf8 support can be updated to convert to ArrayBuffers
   * instead of the older string based receiveQueue.
   */
  function addUint8Utf8(vncDecoder) {
    "use strict";

    WMKS.LOGGER.debug("adding uint8utf8 support");
    const self = vncDecoder;

    if (!self.hasOwnProperty('_legacyReceiveQueue')) {
      self._legacyReceiveQueue = '';
      self._legacyReceiveQueueIndex = '';
    }

    self.useLegacy = false;

    let legacyFunctions: any = {};

    /*
    *
    * RX/TX queue management
    *
    */
    legacyFunctions._receiveQueueBytesUnread = function () {
      return this._legacyReceiveQueue.length - this._legacyReceiveQueueIndex;
    };

    legacyFunctions._receiveQueueConsumeBytes = function (nr) {
      this._legacyReceiveQueueIndex += nr;
    };

    legacyFunctions._receiveQueueReset = function () {
      this._legacyReceiveQueue = '';
      this._legacyReceiveQueueIndex = 0;
    };

    legacyFunctions._readString = function (stringLength) {
      let string = this._legacyReceiveQueue.slice(this._legacyReceiveQueueIndex, this._legacyReceiveQueueIndex + stringLength);
      this._legacyReceiveQueueIndex += stringLength;
      return string;
    };

    // Pops the first 'stringLength' bytes from the front of the read buffer
    // and parses the string for unicode. If it finds unicode, it converts them
    // to unicode and returns the unicode string.
    legacyFunctions._readStringUTF8 = function (stringLength) {
      let c;
      let c1;
      let c2;
      let c3;
      let valArray = [];
      let i = this._legacyReceiveQueueIndex;

      while (i < this._legacyReceiveQueueIndex + stringLength) {
        c = this._legacyReceiveQueue.charCodeAt(i);
        if (c < 128) {
          // Handle non-unicode string here.
          valArray.push(c);
          i++;
        } else if (c < 224) {
          c1 = this._legacyReceiveQueue.charCodeAt(i+1) & 63;
          valArray.push(((c & 31) << 6) | c1);
          i += 2;
        } else if (c < 240) {
          c1 = this._legacyReceiveQueue.charCodeAt(i+1) & 63;
          c2 = this._legacyReceiveQueue.charCodeAt(i+2) & 63;
          valArray.push(((c & 15) << 12) | (c1 << 6) | c2);
          i += 3;
        } else {
          c1 = this._legacyReceiveQueue.charCodeAt(i+1) & 63;
          c2 = this._legacyReceiveQueue.charCodeAt(i+2) & 63;
          c3 = this._legacyReceiveQueue.charCodeAt(i+3) & 63;
          valArray.push(((c & 7) << 18) | (c1 << 12) | (c2 << 6) | c3);
          i += 4;
        }
      }

      this._legacyReceiveQueueIndex += stringLength;

      return String.fromCharCode.apply(String, valArray);
    };

    // Pops the first byte from the front of the receive buffer.
    legacyFunctions._readByte = function () {
      let aByte = this._legacyReceiveQueue.charCodeAt(this._legacyReceiveQueueIndex);
      this._legacyReceiveQueueIndex += 1;
      return aByte;
    };

    // Pops the first 'length' bytes from the front of the receive buffer.
    legacyFunctions._readBytes = function (length) {
      let result;
      let i;

      result = new Array(length);

      for (i = 0; i < length; i++) {
        result[i] = this._legacyReceiveQueue.charCodeAt(i + this._legacyReceiveQueueIndex);
      }

      this._legacyReceiveQueueIndex += length;
      return result;
    };

    // Sends a string to the server, using the appropriate encoding.
    legacyFunctions._sendString = function (stringValue) {
      if (!this._websocket) {
        return;
      }

      this._websocket.send(stringValue);
    };

    // Sends the array 'bytes' of data bytes to the server.
    legacyFunctions._sendBytes = function (bytes) {
      this._sendString(stringFromArray(bytes));
    };

    // Sends the server a list of supported image encodings.
    // This is a temporary override to disabled encTightDiffComp
    //  until it can be better tested and potentially updated.
    legacyFunctions._sendClientEncodingsMsg = function () {
      let i;
      let encodings = [/* this.encTightDiffComp, */
        this.encTightPNG,
        this.encDesktopSize,
        this.encVMWDefineCursor,
        this.encVMWCursorState,
        this.encVMWCursorPosition,
        this.encVMWTypematicInfo,
        this.encVMWLEDState,
        this.encVMWServerPush2,
        this.encVMWServerCaps,
        this.encTightJpegQuality10,
        this.encVMWFrameStamp,
        this.encUpdateCache];


      if (this.options.mediaPlayer) {
        encodings.unshift(this.encH264MP4);
      }

      if (this._canvas[1]) {
        encodings = [this.encOffscreenCopyRect].concat(encodings);
      }

      /*
       * Blits seem to work well on most browsers now.
       */
      encodings = [this.encCopyRect].concat(encodings);

      var message = [];
      message.push8(this.msgClientEncodings);
      message.push8(0);
      message.push16(encodings.length);
      for (i = 0; i < encodings.length; i += 1) {
        message.push32(encodings[i]);
      }
      this._sendBytes(message);
    };

    legacyFunctions._readTightData = function (rect) {
      /*
       * Skip the preamble and read the actual JPEG data.
       */
      let type = (rect.subEncoding === this.subEncPNG) ? 'image/png' : 'image/jpeg';
      let data = this._readString(this.nextBytes);
      // @ts-ignore
      let URL  = window.URL || window.webkitURL;
      let self = this;

      if (this._useImageBitmaps) {
        data = arrayFromString(data, !0);
        createImageBitmap(new Blob([data], {
          type: type
        })).then(function (image) {
          rect.image = image;
          self.onDecodeComplete();
        })
      } else {

        /*
         * Construct an Image and keep a reference to it in the
         * rectangle object. Since Images are loaded asynchronously
         * we can't draw it until the image has finished loading so
         * we don't call onDecodeComplete() until this has happened.
         */
        rect.image = this._imageManager.getImage();
        rect.image.width = rect.width;
        rect.image.height = rect.height;
        rect.image.destX = rect.x;
        rect.image.destY = rect.y;

        if (URL) {
          // Ensure data is in Uint8Array format
          data = arrayFromString(data, true);

          rect.image.onload = this.onDecodeObjectURLComplete;
          rect.image.src = URL.createObjectURL(new Blob([data], {type: type}));
        } else {
          data = Base64.encodeFromString(data);

          rect.image.onload = this.onDecodeComplete;
          rect.image.src = 'data:' + type + ';base64,' + data;
        }
      }

      this._nextRect();
    };

    // We have built and deployed two sorts of VNC servers, those that
    // expect an RFB 003.008 and VNC authentication handshake, and
    // those which jump straight into the VNC protocol at the
    // serverInitialized message.  Previously we had to switch the
    // client between these two modes, but it is possible to build a
    // single client which can talk to both types of server simply by
    //  examining the size of the first message we receive.
    //
    // Note that this is a very robust detection method - the server is
    // required in each case to send a message of a specific size on
    // connection establishment.  We are lucky that the two messages
    // are of different sizes.
    legacyFunctions._peekFirstMessage = function () {
      this.usedVNCHandshake = (this._receiveQueueBytesUnread() === 12);
      if (this.usedVNCHandshake) {
        this._setReadCB(12, this._handleProtocolVersionMsg);
      } else {
        this._setReadCB(24, this._handleServerInitializedMsg);
      }
    };

    function replaceFunctions(vncDecoder) {
      WMKS.LOGGER.trace('uint8utf8: replacing functions');
      vncDecoder._originalFunctions = vncDecoder._originalFunctions || {};

      for (let functionName in legacyFunctions) {
        if (legacyFunctions.hasOwnProperty(functionName)){
          if (!vncDecoder._originalFunctions[functionName]) {
            //Save reference to original
            vncDecoder._originalFunctions[functionName] = vncDecoder[functionName];
          }
          vncDecoder[functionName] = legacyFunctions[functionName];
        }
      }
    }

    function restoreFunctions(vncDecoder) {
      WMKS.LOGGER.trace('restoreFunctions');
      if (!vncDecoder._originalFunctions) {
        return;
      }  //never replaced

      for (var functionName in vncDecoder._originalFunctions) {
        if(vncDecoder._originalFunctions.hasOwnProperty(functionName)){
          vncDecoder[functionName] = vncDecoder._originalFunctions[functionName];
        }
      }
    }

    self.wsOpen = function (evt) {

      self._state = self.VNC_ACTIVE_STATE;
      if (this.protocol !== 'uint8utf8' && this.protocol !== 'binary' && this.protocol !== 'vmware-vvc') {
        return self.fail('no agreement on protocol');
      }

      if (this.protocol === 'vmware-vvc') {
        self._setupVVC();
        WMKS.LOGGER.log('WebSocket is using VMware Virtual Channels');
        this.protocol = 'binary';
      }

      if (this.protocol === 'binary') {
        this.binaryType = 'arraybuffer';
        WMKS.LOGGER.log('WebSocket HAS binary support');
      }

      self.useLegacy = (this.protocol === 'uint8utf8');

      if (self.useLegacy) {
        replaceFunctions(self);
      } else{
        restoreFunctions(self);
      }

      // Note: this is after _setupVVC() in case the UI wants to add vvc listeners.
      self.options.onConnecting(self.vvc, self.vvcSession);

      WMKS.LOGGER.log('WebSocket created protocol: ' + this.protocol);
    };

    let wsMessageOriginal = self.wsMessage;
    self.wsMessage = function (evt) {
      if (!self.useLegacy) { return wsMessageOriginal.apply(this, arguments); }

      if (self._legacyReceiveQueueIndex > self._legacyReceiveQueue.length) {
        return self.fail('overflow receiveQueue');
      } else if (self._legacyReceiveQueueIndex === self._legacyReceiveQueue.length) {
        self._legacyReceiveQueue = '';
        self._legacyReceiveQueueIndex = 0;
      }

      if (typeof evt.data !== 'string') {
        let data = new Uint8Array(evt.data);
        self._legacyReceiveQueue = self._legacyReceiveQueue.concat(stringFromArray(data));
      } else {
        self._legacyReceiveQueue = self._legacyReceiveQueue.concat(evt.data);
      }
      self._processMessages();
    };

    if (self.protocolList.indexOf('uint8utf8') === -1) {
      self.protocolList.push('uint8utf8');
    }
    legacyFunctions._receiveQueueReset.call(self);
  }

  /* Some code adapted from:
   * https://github.com/brandonaaron/jquery-mousewheel
   */

  /* ***** BEGIN LICENSE BLOCK *****
   * Copyright (c) 2013, Brandon Aaron (http://brandon.aaron.sh)
   *
   * Permission is hereby granted, free of charge, to any person obtaining
   * a copy of this software and associated documentation files (the
   * "Software"), to deal in the Software without restriction, including
   * without limitation the rights to use, copy, modify, merge, publish,
   * distribute, sublicense, and/or sell copies of the Software, and to
   * permit persons to whom the Software is furnished to do so, subject to
   * the following conditions:
   *
   * The above copyright notice and this permission notice shall be
   * included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
   * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
   * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
   * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
   * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
   * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   *
   * ***** END LICENSE BLOCK ***** */

  /*
  *
  *    Event registration for mouse wheel support.
  *
  * jQuery doesn't provide events for mouse wheel movement. This script
  * registers some events we can hook into to detect mouse wheel events
  * in a somewhat cross-browser way.
  *
  * The only information we really need in WebMKS is the direction it scrolled,
  * and not the deltas. This is good, because there is no standard at all
  * for mouse wheel events across browsers when it comes to variables and
  * values, and it's nearly impossible to normalize.
  */
  (function () {

    // @ts-ignore
    let WHEEL_EVENTS = ( 'onwheel' in document || document.documentMode >= 9 ) ?
      ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'];
    let toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'];

    if ( $.event.fixHooks ) {
      for ( var i = toFix.length; i; ) {
        $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
      }
    }

    // Handles a mouse wheel event. The resulting event will have wheelDeltaX
    // and wheelDeltaY values.
    function onMouseWheelEvent(event) {
      let deltaX = 0;
      let deltaY = 0;
      let dispatch = $.event.dispatch || $.event.handle;

      // Old school scrollwheel delta
      if ( 'detail'      in event ) { deltaY = event.detail * -1;      }
      if ( 'wheelDelta'  in event ) { deltaY = event.wheelDelta;       }
      if ( 'wheelDeltaY' in event ) { deltaY = event.wheelDeltaY;      }
      if ( 'wheelDeltaX' in event ) { deltaX = event.wheelDeltaX * -1; }

      // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
      if ( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
        deltaX = deltaY * -1;
        deltaY = 0;
      }

      // New school wheel delta (wheel event)
      if ( 'deltaY' in event ) { deltaY = event.deltaY * -1; }
      if ( 'deltaX' in event ) { deltaX = event.deltaX;      }

      // No change actually happened, no reason to go any further
      if ( deltaY === 0 && deltaX === 0 ) { return; }

      event = $.event.fix(event);
      event.type = 'mousewheel';
      delete event.wheelDelta;
      event.wheelDeltaX = deltaX;
      event.wheelDeltaY = deltaY;

      return dispatch.call(this, event);
    }

    // Provides a "mousewheel" event in jQuery that can be binded to a callback.
    // This handles the different browser events for wheel movements.
    $.event.special.mousewheel = {
      setup: function() {
        if (this.addEventListener) {
          let i;

          for (i = 0; i < WHEEL_EVENTS.length; i++) {
            this.addEventListener(WHEEL_EVENTS[i], onMouseWheelEvent, false);
          }
        } else {
          this.onmousewheel = onMouseWheelEvent;
        }
      },

      tearDown: function() {
        if (this.removeEventListener) {
          var i;

          for (i = 0; i < WHEEL_EVENTS.length; i++) {
            this.removeEventListener(WHEEL_EVENTS[i], onMouseWheelEvent, false);
          }
        } else {
          this.onmousewheel = onMouseWheelEvent;
        }
      }
    };

  })();

  /**
   * This file initializes the WMKS root namespace and some of the generic
   *    functionality is defined accordingly.
   *
   *    This contains the following:
   *    1. Global constants (WMKS.CONST)
   *       Specific constants go a level deeper. (Ex: WMKS.CONST.TOUCH, etc.)
   *    2. Generic utility / helper functions.
   *       a. WMKS.LOGGER:   Logging with different log levels.
   *       b. AB.BROWSER:    Detects various browser types and features.
   *       c. WMKS.UTIL:     Utility helper functions.
   */
  const WMKS: any = {};

  /**
   * The logging namespace that defines a log utility. It has:
   *    1. Five logging levels
   *    2. Generic log function that accepts a log level (defaults to LOG_LEVEL).
   *    3. Log level specific logging.
   *    4. Log only when requested log level is above or equal to LOG_LEVEL value.
   *    5. Dynamically set logging levels.
   */
  WMKS.LOGGER = new function() {
    'use strict';

    this.LEVEL = {
      TRACE: 0,
      DEBUG: 1,
      INFO:  2,
      WARN:  3,
      ERROR: 4
    };

    // The default log level is set to INFO.
    let _logLevel = this.LEVEL.INFO;
    let _logLevelDesc = [' [Trace] ', ' [Debug] ', ' [Info ] ', ' [Warn ] ', ' [Error] '];

    // Logging functions for different log levels.
    this.trace = function(args) { this.log(args, this.LEVEL.TRACE); };
    this.debug = function(args) { this.log(args, this.LEVEL.DEBUG); };
    this.info =  function(args) { this.log(args, this.LEVEL.INFO);  };
    this.warn =  function(args) { this.log(args, this.LEVEL.WARN);  };
    this.error = function(args) { this.log(args, this.LEVEL.ERROR); };

    /*
     *---------------------------------------------------------------------------
     *
     * log
     *
     *    The common log function that uses the default logging level.
     *    Use this when you want to see this log at all logging levels.
     *
     *    IE does not like if (!console), so check for undefined explicitly.
     *    Bug: 917027
     *
     *---------------------------------------------------------------------------
     */

    this.log =
      (typeof console === 'undefined' || typeof console.log === 'undefined')?
        $.noop :
        function(logData, level) {
          level = (level === undefined) ? this.LEVEL.INFO : level;
          if (level >= _logLevel && logData) {
            // ISO format has ms precision, but lacks IE9 support.
            // Hence use UTC format for IE9.
            console.log((WMKS.BROWSER.isIE()?
              new Date().toUTCString() : new Date().toISOString())
              + _logLevelDesc[level] + logData);
          }
        };

    /*
     *---------------------------------------------------------------------------
     *
     * setLogLevel
     *
     *    This public function is used to set the logging level. If the input is
     *    invalid, then the default logging level is used.
     *
     *---------------------------------------------------------------------------
     */

    this.setLogLevel = function(newLevel) {
      if (typeof newLevel === 'number' && newLevel >= 0 && newLevel < _logLevelDesc.length) {
        _logLevel = newLevel;
      } else {
        this.log('Invalid input logLevel: ' + newLevel);
      }
    };
  };

  /**
   * This namespace object contains helper function to identify browser
   *    specific details such as isTouchDevice, isIOS, isAndroid, etc.
   *
   *    Browser version detection is available through the object "version" like
   *    so:
   *    * WMKS.BROWSER.version.full (String)
   *      - Full version string of the browser.
   *        e.g For Chrome 35.6.1234 this would be "35.6.1234"
   *    * WMKS.BROWSER.version.major (Integer)
   *      - Major version of the browser.
   *        e.g For Chrome 35.6.1234 this would be 35
   *    * WMKS.BROWSER.version.minor (Integer)
   *      - Minor version of the browser.
   *        e.g For Chrome 35.6.1234 this would be 6
   *    * WMKS.BROWSER.version.float (Float)
   *      - Major and minor version of the browser as a float.
   *        e.g For Chrome 35.6.1234 this would be 35.6
   */
  WMKS.BROWSER = new function() {
    let ua = navigator.userAgent.toLowerCase();
    let vs = navigator.appVersion.toString();
    let trueFunc = function() { return true; };
    let falseFunc = function() { return false; };

    // In the wake of $.browser being deprecated, use the following:
    this.isIE = (ua.indexOf('msie') !== -1 || ua.indexOf('trident') !== -1 || ua.indexOf('edge') !== -1)?
      trueFunc : falseFunc;

    this.isOpera = (ua.indexOf('opera/') !== -1)? trueFunc : falseFunc;
    this.isWebkit = this.isChrome = this.isSafari = this.isBB = falseFunc;

    // Check for webkit engine.
    if (!this.isIE() && ua.indexOf('applewebkit') !== -1) {
      this.isWebkit = trueFunc;
      // Webkit engine is used by chrome, safari and blackberry browsers.
      if (ua.indexOf('chrome') !== -1) {
        this.isChrome = trueFunc;
      } else if (ua.indexOf('bb') !== -1) {
        // Detect if its a BlackBerry browser or higher on OS BB10+
        this.isBB = trueFunc;
      } else if (ua.indexOf('safari') !== -1) {
        this.isSafari = trueFunc;
      }
    }

    // See: https://developer.mozilla.org/en/Gecko_user_agent_string_reference
    // Also, Webkit/IE11 say they're 'like Gecko', so we get a false positive here.
    this.isGecko = (!this.isWebkit() && !this.isIE() && ua.indexOf('gecko') !== -1)
      ? trueFunc : falseFunc;

    this.isFirefox = (ua.indexOf('firefox') !== -1 || ua.indexOf('iceweasel') !== -1)?
      trueFunc : falseFunc;

    // Flag indicating low bandwidth, not screen size.
    this.isLowBandwidth = (ua.indexOf('mobile') !== -1)? trueFunc : falseFunc;

    // Detect specific mobile devices. These are *not* guaranteed to also set
    // isLowBandwidth. Some however do when presenting over WiFi, etc.
    this.isIOS = ((ua.indexOf('iphone') !== -1) || (ua.indexOf('ipod') !== -1) ||
      (ua.indexOf('ipad') !== -1))? trueFunc : falseFunc;

    /* typically also sets isLinux */
    this.isAndroid = (ua.indexOf('android') !== -1)? trueFunc : falseFunc;

    // Detect IE mobile versions.
    this.isIEMobile = (ua.indexOf('IEMobile') !== -1)? trueFunc : falseFunc;

    // Flag indicating that touch feature exists. (Ex: includes Win8 touch laptops)
    this.hasTouchInput = ('ontouchstart' in window
      || navigator.maxTouchPoints
      || navigator.msMaxTouchPoints)? trueFunc : falseFunc;

    // TODO: Include windows/BB phone as touchDevice.
    this.isTouchDevice = (this.isIOS() || this.isAndroid() || this.isBB())?
      trueFunc : falseFunc;

    // PC OS detection.
    this.isChromeOS = (ua.indexOf('cros') !== -1)? trueFunc : falseFunc;
    this.isWindows = (ua.indexOf('windows') !== -1)? trueFunc : falseFunc;
    this.isLinux = (ua.indexOf('linux') !== -1)? trueFunc : falseFunc;
    this.isMacOS = (ua.indexOf('macos') !== -1 || ua.indexOf('macintosh') > -1)?
      trueFunc : falseFunc;

    let getValue = function(regex, index) {
      var match = ua.match(regex);
      return (match && match.length > index && match[index]) || '';
    };
    this.version = { full : "" };
    if(this.isSafari()) {
      this.version.full = getValue(/Version[ \/]([0-9.]+)/i, 1);
    } else if(this.isChrome()) {
      this.version.full = getValue(/Chrome\/([0-9.]+)/i, 1);
    } else if(this.isFirefox()) {
      this.version.full = getValue(/(?:Firefox|Iceweasel)[ \/]([0-9.]+)/i, 1);
    } else if(this.isOpera()) {
      this.version.full = getValue(/Version[ \/]([0-9.]+)/i, 1) || getValue(/(?:opera|opr)[\s\/]([0-9.]+)/i, 1);
    } else if(this.isIE()) {
      this.version.full = getValue(/(?:\b(MS)?IE\s+|\bTrident\/7\.0;.*\s+rv:|\bEdge\/)([0-9.]+)/i, 2);
    }
    let versionParts = this.version.full.split('.');

    this.version.major = parseInt(versionParts.length > 0 ? versionParts[0] : 0, 10);
    this.version.minor = parseInt(versionParts.length > 1 ? versionParts[1] : 0, 10);
    this.version.float = parseFloat(this.version.full);

    /*
     *---------------------------------------------------------------------------
     *
     * isCanvasSupported
     *
     *    Tests if the browser supports the use of <canvas> elements properly
     *    with the ability to retrieve its draw context.
     *
     *---------------------------------------------------------------------------
     */

    this.isCanvasSupported = function() {
      try {
        var canvas = document.createElement('canvas');
        var result = !!canvas.getContext; // convert to Boolean, invert again.
        canvas = null; // was never added to DOM, don't need to remove
        return result;
      } catch(e) {
        return false;
      }
    };

  };

  /**
   * Constant values under CONST namespace that's used across WMKS.
   * @type {{FORCE_RAW_KEY_CODE: {"13": boolean, "8": boolean, "9": boolean}, CLICK: {middle: number, left: number, right: number}}}
   */
  WMKS.CONST = {
    // Touch events can use the following keycodes to mimic mouse events.
    CLICK: {
      left:       0x1,
      middle:     0x2,
      right:      0x4
    },

    FORCE_RAW_KEY_CODE: {
      8:          true,    // backspace
      9:          true,    // tab
      13:         true     // newline
    }
  };

  /**
   * This namespace object contains common helper function.
   */
  WMKS.UTIL = {
    /**
     * This function creates a canvas element and adds the absolute
     * position css to it if the input flag is set.
     */
    createCanvas: function(addAbsolutePosition) {
      let css: any = {};
      if (addAbsolutePosition) {
        css.position = 'absolute';
      }
      return $('<canvas/>').css(css);
    },

    /**
     * This function creates a video element and adds the absolute
     * position css to it if the input flag is set.
     */
    createVideo: function(addAbsolutePosition) {
      let css: any = {};
      if (addAbsolutePosition) {
        css.position = 'absolute';
      }
      return $('<video/>').css(css);
    },

    /**
     * Gets the length of the line that starts at (0, 0) and ends at
     * (dx, dy) and returns the floating point number.
     */
    getLineLength: function(dx, dy) {
      return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    },

    /**
     * Indicates if high-resolution mode is available for this browser. Checks
     * for a higher devicePixelRatio on the browser.
     */
    isHighResolutionSupported: function() {
      return window.devicePixelRatio && window.devicePixelRatio > 1;
    },

    /**
     * Utility function to inform if the browser is in full-screen mode.
     */
    isFullscreenNow: function() {
      // @ts-ignore
      return document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement ? true : false;
    },

    /**
     * Utility function that indicates if fullscreen feature is enabled on
     * this browser.
     *
     * Fullscreen mode is disabled on Safari as it does not support keyboard
     * input in fullscreen for "security reasons". See bug 1296505.
     */
    isFullscreenEnabled: function() {
      // @ts-ignore
      return !WMKS.BROWSER.isSafari() && (document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitFullscreenEnabled) ? true : false;
    },

    /**
     * This function toggles the fullscreen mode for this browser if it is
     * supported. If not, it just ignores the request.
     */
    toggleFullScreen: function(showFullscreen, element?) {
      let currentState = WMKS.UTIL.isFullscreenNow();
      let ele = element || document.documentElement;

      if (!WMKS.UTIL.isFullscreenEnabled()) {
        WMKS.LOGGER.warn('This browser does not support fullScreen mode.');
        return;
      }
      if (currentState === showFullscreen) {
        // already in the desired state.
        return;
      }

      // If currently in Fullscreen mode, turn it off.

      if (currentState) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
          // @ts-ignore
        } else if (document.mozCancelFullScreen) {
          // @ts-ignore
          document.mozCancelFullScreen();
          // @ts-ignore
        } else if (document.webkitCancelFullScreen) {
          // @ts-ignore
          document.webkitCancelFullScreen();
          // @ts-ignore
        } else if(document.msExitFullscreen) {
          // @ts-ignore
          document.msExitFullscreen();
        }
      } else {
        // Flip to full-screen now.
        if (ele.requestFullscreen) {
          ele.requestFullscreen();
        } else if (ele.mozRequestFullScreen) {
          ele.mozRequestFullScreen();
        } else if (ele.webkitRequestFullscreen) {
          // @ts-ignore
          ele.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (ele.msRequestFullscreen) {
          ele.msRequestFullscreen();
        }
      }
    }

  };

  /**
   * Given a buffer of bytes and its size, initialize a BitBuf
   * object for reading from or writing to that buffer.
   */
  WMKS.BitBuf = function(buffer, size) {
    "use strict";
    this._buf = buffer;
    this._size = size;
    this._readCount = 0;
    this._overflow = false;
    this._thisByte = 0;
    this._thisByteBits = 0;

    return this;
  };

  /**
   * Helper for readBits() which reads a number of bits from the
   * current active byte and returns them to the caller.
   */
  WMKS.BitBuf.prototype.readBits0 = function (val, nr) {
    "use strict";
    let mask;

    if (this._bits < nr) {
      this._overflow = true;
      return -1;
    }

    mask = ~(0xff >> nr);        /* ones in the lower 'nr' bits */
    val <<= nr;                  /* move output value up to make space */
    val |= (this._thisByte & mask) >> (8-nr);
    this._thisByte <<= nr;
    this._thisByte &= 0xff;
    this._thisByteBits -= nr;

    return val;
  };

  /**
   * Read and return the specified number of bits from the BitBuf.
   */
  WMKS.BitBuf.prototype.readBits = function (nr) {
    "use strict";
    let origNr = nr;
    let val = 0;

    if (this._overflow) {
      return 0;
    }

    while (nr > this._thisByteBits) {
      nr -= this._thisByteBits;
      val = this.readBits0(val, this._thisByteBits);

      if (this._readCount < this._size) {
        this._thisByte = this._buf[this._readCount++];
        this._thisByteBits = 8;
      } else {
        this._thisByte = 0;
        this._thisByteBits = 0;
        if (nr > 0) {
          this._overflow = true;
          return 0;
        }
      }
    }

    val = this.readBits0(val, nr);
    return val;
  };

  /**
   * Read an elias-gamma-encoded integer from the buffer.  The
   * result will be greater than or equal to one, and is
   * constrained to fit in a 32-bit integer.
   */
  WMKS.BitBuf.prototype.readEliasGamma = function() {
    "use strict";
    let l = 0;
    let value;
    let bit;
    let origidx = this._readCount;
    let origbit = this._thisByteBits;

    while (!this._overflow &&
    (bit = this.readBits(1)) == 0) {
      l++;
    }

    value = 1 << l;

    if (l) {
      value |= this.readBits(l);
    }

    return value;
  };

  /**
   * Contains a helper function to instantiate WebSocket object.
   */

  /** Create an alternate class that consumes WebSocket and provides a
   *  non-native code constructor we can use to stub out in Jasmine (a
   *  testing framework).
   */
  WMKS.WebSocket = function(url, protocol) {
    // @ts-ignore
    return new window.WebSocket(url, protocol);
  };

  /**
   * WebMKS VNC decoder prototype.
   */
  WMKS.VNCDecoder = function (opts) {
    this.options = $.extend({}, this.options, opts);
    $.extend(this, {
      useVMWRequestResolution: !1,
      useVMWRequestMultiMon: !1,
      useVMWKeyEvent: !1, // VMware VScanCode key inputs are handled.
      allowVMWKeyEvent2UnicodeAndRaw: !1, // unicode + JS keyCodes are handled by server.
      useVMWAck: !1,
      useVMWAudioAck: !1,
      useVMWSessionClose: !1, // Session close msg are sent and handled by server.
      serverSupportsMKSVChanClipboard: !1,
      vvc: null,
      vvcSession: null,
      _websocket: null,
      _encrypted: !1,
      _receivedFirstUpdate: !1,
      _serverInitialized: !1,
      _canvas: [],
      _currentCursorURI: "default",
      _cursorVisible: !0,
      _imageCache: [],

      _copyRectBlit: null,
      _copyRectOffscreenBlit: null,

      _state: this.DISCONNECTED,

      _FBWidth: 0,
      _FBHeight: 0,
      _FBName: "",
      _FBBytesPerPixel: 0,
      _FBDepth: 3,

      /*
       * Mouse state.
       * The current button state(s) are sent with each pointer event.
       */
      _mouseButtonMask: 0,
      _mouseX: 0,
      _mouseY: 0,
      onDecodeComplete: {},

      /*
       * Frame buffer update state.
       */
      rects: 0,
      rectsRead: 0,
      rectsDecoded: 0,

      /*
       * Width/height requested through self.onRequestResolution()
       */
      requestedWidth: 0,
      requestedHeight: 0,

      decodeToCacheEntry: -1,
      updateCache: [],
      updateCacheEntries: 0,

      /*
       * Rate-limit resolution requests to the server.  These are slow
       * & we get a better experience if we don't send too many of
       * them.
       */
      resolutionTimeout: {},
      resolutionTimer: null,
      resolutionRequestActive: !1,

      /*
       * We maintain an incrementing ID for each update request.
       * This assists in tracking updates/acks with the host.
       */
      updateReqId: 0,

      /*
       * Typematic details for faking keyboard auto-repeat in
       * the client.
       */
      typematicState: 1, // on
      typematicPeriod: 33333, // microseconds
      typematicDelay: 500000, // microseconds

      /*
       * Bitmask of Remote keyboard LED state
       *
       * Bit 0 - Scroll Lock
       * Bit 1 - Num Lock
       * Bit 2 - Caps Lock
       */
      _keyboardLEDs: 0,

      /*
       * Timestamp frame's timestamp value --
       * This is stored as the low and high 32 bits as
       * Javascript integers can only give 53 bits of precision.
       */
      _frameTimestampLo: 0,
      _frameTimestampHi: 0,

      rect: [],
      _msgTimer: null,
      _mouseTimer: null,
      _mouseActive: !1,
      msgTimeout: {},
      mouseTimeout: {},

      _retryConnectionTimer: null,

      _url: "",
      _receiveQueue: [],
      _receiveQueueIndex: 0,
      _receiveQueueLength: 0
    });

    this.setRenderCanvas(this.options.canvas);

    /*
    * Did we get a backbuffer canvas?
    */
    if (this.options.backCanvas) {
      this._canvas = this._canvas.concat([this.options.backCanvas]);
      this._canvas[1].ctx = this.options.backCanvas.getContext('2d');
    }

    if (this.options.blitTempCanvas) {
      this._canvas = this._canvas.concat([this.options.blitTempCanvas]);
      this._canvas[2].ctx = this.options.blitTempCanvas.getContext('2d');
    }

    if (this.options.mediaPlayer) {
      this._mp4Decoder = new MP4Decoder();
    }

    if (typeof createImageBitmap != "undefined") {
      this._useImageBitmaps = !0;
      this._imageManager = null;
    } else {
      this._imageManager = new ImageManagerWMKS(256);
    }

    // Pushes the current image to the cache if it is not full,
    // and then deletes the image. Reset destX, destY before image recycle.
    this._releaseImage = function (image) {
      if (this._imageManager) this._imageManager.releaseImage(image);
    };

    return this;
  };

  $.extend(WMKS.VNCDecoder.prototype, {
    options: {
      canvas: null,
      backCanvas: null,
      blitTempCanvas: null,
      VCDProxyHandshakeVmxPath: null,
      useUnicodeKeyboardInput: !1,
      enableVorbisAudioClips: !1,
      enableOpusAudioClips: !1,
      enableAacAudioClips: !1,
      enableVVC: !0,
      enableUint8Utf8: !1,
      enableVMWSessionClose: !1,
      retryConnectionInterval: -1,
      sendRelativeMouseEvent: !1,
      onConnecting: function () {
      },
      onConnected: function () {
      },
      onBeforeDisconnected: function () {
      },
      onDisconnected: function () {
      },
      onAuthenticationFailed: function () {
      },
      onError: function (a) {
      },
      onProtocolError: function () {
      },
      onNewDesktopSize: function (a, b) {
      },
      onKeyboardLEDsChanged: function (a) {
      },
      onCursorStateChanged: function (a) {
      },
      onHeartbeat: function (a) {
      },
      onUpdateCopyPasteUI: function (a, b) {
      },
      onCopy: function (a) {
      },
      onSetReconnectToken: function (a) {
      },
      onAudio: function (a) {
      },
      onAudioMixer: function (a) {
      },
      onEncodingChanged: function (a) {
      },
      cacheSizeKB: 102400,
      cacheSizeEntries: 1024
    },

    DISCONNECTED: 0,
    VNC_ACTIVE_STATE: 1,
    FBU_DECODING_STATE: 2,
    FBU_RESTING_STATE: 3,

    /*
    * Server->Client message IDs.
    */
    msgFramebufferUpdate: 0,
    msgSetColorMapEntries: 1,
    msgRingBell: 2,
    msgServerCutText: 3,
    msgVMWSrvMessage: 127,

    /*
    * VMWSrvMessage sub-IDs we handle.
    */
    msgVMWSrvMessage_ServerCaps: 0,
    msgVMWSrvMessage_Audio: 3,
    msgVMWSrvMessage_Heartbeat: 4,
    msgVMWSrvMessage_SetReconnectToken: 6,
    msgVMWSrvMessage_SessionClose: 7,
    msgVMWSrvMessage_AudioMixer: 8,

    /*
    * Client->Server message IDs: VNCClientMessageID
    */
    msgClientEncodings: 2,
    msgFBUpdateRequest: 3,
    msgKeyEvent: 4,
    msgPointerEvent: 5,
    msgVMWClientMessage: 127,

    /*
    * VMware Client extension sub-IDs: VNCVMWClientMessageID
    */
    msgVMWKeyEvent: 0,
    msgVMWPointerEvent2: 2,
    msgVMWKeyEvent2: 6,
    msgVMWAudioAck: 7,
    msgVMWSessionClose: 12,

    /*
    * Encodings for rectangles within FBUpdates.
    */
    encRaw: 0,
    encCopyRect: 1,
    encTightPNG: -260,
    encDesktopSize: -223,
    encH264RectEnc: 1464686100,
    encTightDiffComp: 1464686102,
    encH264MP4: 1464686104,
    encVMWDefineCursor: 1464686180,
    encVMWCursorState: 1464686181,
    encVMWCursorPosition: 1464686182,
    encVMWTypematicInfo: 1464686183,
    encVMWLEDState: 1464686184,
    encVMWServerPush2: 1464686203,
    encVMWServerCaps: 1464686202,
    encVMWFrameStamp: 1464686204,
    encOffscreenCopyRect: 1464686206,
    encUpdateCache: 1464686207,
    encTopologyChangeEnc: 1464686208,
    encH264MultimonEnc: 1464686209,
    encTightJpegQuality10: -23,

    diffCompCopyFromPrev: 1,
    diffCompAppend: 2,
    diffCompAppendRemaining: 3,

    updateCacheOpInit: 0,
    updateCacheOpBegin: 1,
    updateCacheOpEnd: 2,
    updateCacheOpReplay: 3,

    updateCacheCapDisableOffscreenSurface: 2,
    updateCacheCapReplay: 4,

    /*
    * Capability bits from VMWServerCaps which we can make use of.
    */
    serverCapKeyEvent: 2,
    serverCapClientCaps: 8,
    serverCapUpdateAck: 32,
    serverCapRequestResolution: 128,
    serverCapKeyEvent2Unicode: 256,
    serverCapKeyEvent2JSKeyCode: 512,
    serverCapAudioAck: 1024,
    serverCapMultiMon: 4096,
    serverCapUpdateCacheInfo: 8192,
    serverCapDisablingCopyUI: 16384,
    serverCapDisablingPasteUI: 32768,
    serverCapSessionClose: 131072,
    serverCapHasMKSVChanClipboard: 262144,

    /*
    * Capability bits from VMClientCaps which we make use of.
    */
    clientCapHeartbeat: 256,
    clientCapVorbisAudioClips: 512,
    clientCapOpusAudioClips: 1024,
    clientCapAacAudioClips: 2048,
    clientCapAudioAck: 4096,
    clientCapSetReconnectToken: 16384,
    clientCapSessionClose: 32768,
    clientCapUseMKSVChanClipboard: 65536,
    clientCapUseAudioMixer: 131072,

    /*
    * Flags in the VNCAudioData packet
    */
    audioflagRequestAck: 1,

    /*
    * Sub-encodings for the tightPNG encoding.
    */
    subEncFill: 128,
    subEncJPEG: 144,
    subEncPNG: 160,
    subEncDiffJpeg: 176,
    subEncMask: 240,

    mouseTimeResolution: 16, // milliseconds
    resolutionDelay: 300 // milliseconds
  });
  // TODO
  WMKS.VNCDecoder.prototype.fail = function (a) {
    return WMKS.LOGGER.log(a), this.disconnect(), null
  };
  WMKS.VNCDecoder.prototype._assumeServerIsVMware = function () {
    if (!this.usedVNCHandshake) return;
    this.useVMWKeyEvent = !0
  };
  WMKS.VNCDecoder.prototype._receiveQueueBytesUnread = function () {
    "use strict";
    return this._receiveQueueLength - this._receiveQueueIndex;
  };
  WMKS.VNCDecoder.prototype._receiveQueueConsumeBytes = function (a) {
    this._receiveQueueIndex += a;
    while (this._receiveQueueIndex > 0 && this._receiveQueue[0].data.byteLength <= this._receiveQueueIndex) this._receiveQueueLength -= this._receiveQueue[0].data.byteLength, this._receiveQueueIndex -= this._receiveQueue[0].data.byteLength, this._receiveQueue.shift()
  };
  WMKS.VNCDecoder.prototype._receiveQueueReset = function () {
    this._receiveQueue = [], this._receiveQueueLength = 0, this._receiveQueueIndex = 0
  };
  WMKS.VNCDecoder.prototype._readBytes = function (a) {
    "use strict";
    if (this._receiveQueueIndex + a <= this._receiveQueue[0].data.byteLength) {
      var b = new Uint8Array(this._receiveQueue[0].data, this._receiveQueueIndex, a);
      return this._receiveQueueConsumeBytes(a), b
    }
    var b = new Uint8Array(a),
      c = 0;
    while (a > 0) {
      var d = Math.min(a, this._receiveQueue[0].data.byteLength - this._receiveQueueIndex),
        e = new Uint8Array(this._receiveQueue[0].data, this._receiveQueueIndex, d);
      b.set(e, c), c += d, a -= d, this._receiveQueueConsumeBytes(d)
    }
    return b
  };
  WMKS.VNCDecoder.prototype._readByte = function () {
    "use strict";
    var a = this._readBytes(1);
    return a[0]
  };
  WMKS.VNCDecoder.prototype._skipBytes = function (a) {
    "use strict";
      this._receiveQueueConsumeBytes(a)
  };
  WMKS.VNCDecoder.prototype._readString = function (b) {
    "use strict";
    var c = this._readBytes(b);
    return stringFromArray(c)
  };
  WMKS.VNCDecoder.prototype._readStringUTF8 = function (a) {
    "use strict";
    var b, c, d, e, f = [],
      g = 0,
      h = this._readBytes(a);
    while (g < a) b = h[g], b < 128 ? (f.push(b), g++) : b < 224 ? (c = h[g + 1] & 63, f.push((b & 31) << 6 | c), g += 2) : b < 240 ? (c = h[g + 1] & 63, d = h[g + 2] & 63, f.push((b & 15) << 12 | c << 6 | d), g += 3) : (c = h[g + 1] & 63, d = h[g + 2] & 63, e = h[g + 3] & 63, f.push((b & 7) << 18 | c << 12 | d << 6 | e), g += 4);
    return String.fromCharCode.apply(String, f)
  };
  WMKS.VNCDecoder.prototype._readInt16 = function () {
    "use strict";
    var a = this._readBytes(2);
    return (a[0] << 8) + a[1]
  };
  WMKS.VNCDecoder.prototype._readInt32 = function () {
    "use strict";
    var a = this._readBytes(4);
    return (a[0] << 24) + (a[1] << 16) + (a[2] << 8) + a[3]
  };
  WMKS.VNCDecoder.prototype._sendString = function (a) {
    "use strict";
      this._sendBytes(arrayFromString(a))
  };
  WMKS.VNCDecoder.prototype._sendBytes = function (a) {
    "use strict";
    if (!this._websocket) return;
    var b = new ArrayBuffer(a.length),
      c = new Uint8Array(b),
      d;
    for (d = 0; d < a.length; d++) c[d] = a[d];
    this._websocket.send(b)
  };
  WMKS.VNCDecoder.prototype._setReadCB = function (a, b, c) {
    this.nextBytes = a, this.nextFn = b, this.nextArg = c
  };
  WMKS.VNCDecoder.prototype._sendMouseEvent = function () {
    if (this.options.sendRelativeMouseEvent) {
      var a = [];
      a.push8(this.msgVMWClientMessage), a.push8(this.msgVMWPointerEvent2), a.push16(19), a.push8(0), a.push32(this._mouseX), a.push32(this._mouseY), a.push32(this._mouseButtonMask), a.push8(0), a.push8(0), this._sendBytes(a), this._mouseActive = !1
    } else {
      var a = [];
      a.push8(this.msgPointerEvent), a.push8(this._mouseButtonMask), a.push16(this._mouseX), a.push16(this._mouseY), this._sendBytes(a), this._mouseActive = !1
    }
  };
  WMKS.VNCDecoder.prototype._sendResolutionRequest = function () {
    var a = [];
    a.push8(this.msgVMWClientMessage), a.push8(5), a.push16(8), a.push16(this.requestedWidth), a.push16(this.requestedHeight), this._sendBytes(a)
  };
  WMKS.VNCDecoder.prototype._sendTopologyRequest = function (a) {
    var b = [],
      c = 0;
    b.push8(this.msgVMWClientMessage), b.push8(10), b.push16(6 + 20 * a.length), b.push16(a.length);
    for (c = 0; c < a.length; c++) b.push32(a[c].left), b.push32(a[c].top), b.push32(a[c].requestedWidth), b.push32(a[c].requestedHeight), b.push32(0);
    this._sendBytes(b)
  };
  WMKS.VNCDecoder.prototype._sendClientEncodingsMsg = function () {
    var a,
      b = [this.encTightDiffComp, this.encTightPNG, this.encDesktopSize, this.encVMWDefineCursor, this.encVMWCursorState, this.encVMWCursorPosition, this.encVMWTypematicInfo, this.encVMWLEDState, this.encVMWServerPush2, this.encVMWServerCaps, this.encTightJpegQuality10, this.encVMWFrameStamp, this.encUpdateCache];
    this.options.mediaPlayer && b.unshift(this.encH264MP4), this.options.enableRawH264 && b.unshift(this.encH264RectEnc), this.options.enableTopologyChange && b.unshift(this.encToppologyChangeEnc), this.options.enableH264Multimon && b.unshift(this.encH264MultimonEnc), this._canvas[1] && (b = [this.encOffscreenCopyRect].concat(b)), b = [this.encCopyRect].concat(b);
    var c = [];
    c.push8(this.msgClientEncodings), c.push8(0), c.push16(b.length);
    for (a = 0; a < b.length; a += 1) c.push32(b[a]);
    this._sendBytes(c)
  };
  WMKS.VNCDecoder.prototype._sendFBUpdateRequestMsg = function (a) {
    var b = [];
    b.push8(this.msgFBUpdateRequest), b.push8(a), b.push16(0), b.push16(0), b.push16(this._FBWidth), b.push16(this._FBHeight), this._sendBytes(b)
  };
  WMKS.VNCDecoder.prototype._sendAck = function (a) {
    var b = this.updateReqId || 1,
      c;
    if (this.useVMWAck) {
      var d = (a + 2) * 10,
        e = [];
      e.push8(this.msgVMWClientMessage), e.push8(4), e.push16(8), e.push8(b), e.push8(0), e.push16(d), this._sendBytes(e)
    } else this._sendFBUpdateRequestMsg(b)
  };
  WMKS.VNCDecoder.prototype._sendAudioAck = function (a, b) {
    var c = [];
    c.push8(this.msgVMWClientMessage), c.push8(this.msgVMWAudioAck), c.push16(12), c.push32(a), c.push32(b), this._sendBytes(c)
  };
  WMKS.VNCDecoder.prototype._changeCursor = function (a, b, d, e, f, g) {
    var h = [],
      i = f * g * 4,
      j = Math.ceil(f * g / 8),
      k = i + 40 + j * 2,
      l, m;
    h.push16le(0), h.push16le(2), h.push16le(1), h.push8(f), h.push8(g), h.push8(0), h.push8(0), h.push16le(d), h.push16le(e), h.push32le(k), h.push32le(h.length + 4), h.push32le(40), h.push32le(f), h.push32le(g * 2), h.push16le(1), h.push16le(32), h.push32le(0), h.push32le(i + 2 * j), h.push32le(0), h.push32le(0), h.push32le(0), h.push32le(0);
    for (m = g - 1; m >= 0; m -= 1)
      for (l = 0; l < f; l += 1) {
        var n = m * Math.ceil(f / 8) + Math.floor(l / 8),
          o = 0;
        b.length > 0 && (o = b[n] << l % 8 & 128 ? 255 : 0), n = (f * m + l) * 4, h.push8(a[n]), h.push8(a[n + 1]), h.push8(a[n + 2]), b.length > 0 ? h.push8(o) : h.push8(a[n + 3])
      }
    for (m = 0; m < g; m += 1)
      for (l = 0; l < Math.ceil(f / 8); l += 1) h.push8(0);
    for (m = 0; m < g; m += 1)
      for (l = 0; l < Math.ceil(f / 8); l += 1) h.push8(0);
    var p = "data:image/x-icon;base64," + Base64.encodeFromArray(h);
    this._currentCursorURI = "url(" + p + ") " + d + " " + e + ", default", this._updateCanvasCursor()
  };
  WMKS.VNCDecoder.prototype._readOffscreenCopyRect = function (a) {
    a.srcBuffer = this._readByte(), a.dstBuffer = this._readByte(), a.srcX = this._readInt16(), a.srcY = this._readInt16(), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readUpdateCacheData = function (a) {
    "use strict";
      a.data = this._readBytes(a.dataLength),
      this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readUpdateCacheInitData = function (a) {
    "use strict";
      this._skipBytes(4),
      this._skipBytes(4),
      a.updateCacheEntries = this._readInt16(),
      this._skipBytes(4),
      this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readUpdateCacheRect = function (a) {
    "use strict";
      a.opcode = this._readByte(),
      a.slot = this._readInt16(),
      a.dataLength = this._readInt16(),
      a.opcode != this.updateCacheOpInit ? this._setReadCB(a.dataLength, this._readUpdateCacheData, a) : this._setReadCB(a.dataLength, this._readUpdateCacheInitData, a)
  };
  WMKS.VNCDecoder.prototype._readVMWDefineCursorData = function (a) {
    var b, c, d = [],
      e = [],
      f = [],
      g, h, i, j;
    if (a.cursorType === 0) {
      a.masklength > 0 && (d = this._readBytes(a.masklength)), a.pixelslength > 0 && (e = this._readBytes(a.pixelslength));
      for (b = 0; b < a.height; b++)
        for (c = 0; c < a.width; c++) {
          h = c + b * a.width, i = b * Math.ceil(a.width / 8) + Math.floor(c / 8), g = 1 << 7 - c % 8;
          if (d[h * 4] === 255 && d[h * 4 + 1] === 255 && d[h * 4 + 2] === 255 && d[h * 4 + 3] === 255)
            for (var k = 0; k < 4; k++) e[h * 4 + k] !== 0 && (e[h * 4 + k] = 0, f[i] |= g);
          else f[i] |= g
        }
    } else a.cursorType === 1 && a.pixelslength > 0 && (e = this._readBytes(a.pixelslength), a.pixelslength == 4 && e[3] == 0 && (e[3] = 1));
    this._changeCursor(e, f, a.x, a.y, a.width, a.height), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readVMWDefineCursor = function (a) {
    a.cursorType = this._readByte(), this._skipBytes(1), a.pixelslength = 4 * a.width * a.height, a.cursorType === 0 ? a.masklength = a.pixelslength : a.masklength = 0, this._setReadCB(a.pixelslength + a.masklength, this._readVMWDefineCursorData, a)
  };
  WMKS.VNCDecoder.prototype._updateCanvasCursor = function () {
    var a, b;
    this._cursorVisible ? WMKS.BROWSER.isIE() ? a = "default" : a = this._currentCursorURI : WMKS.BROWSER.isFirefox() && WMKS.BROWSER.isMacOS() ? a = "none, !important" : a = "none", b = this._mediaPlayer || this._canvas[0], b.style.cursor !== a && (b.style.cursor = a)
  };
  WMKS.VNCDecoder.prototype._readVMWCursorState = function (a) {
    var b = this._readInt16();
    this._cursorVisible = !!(b & 1), this._updateCanvasCursor(), this.options.onCursorStateChanged(this._cursorVisible), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readVMWCursorPosition = function (a) {
    WMKS.VNCDecoder.cursorPosition = a, this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readTypematicInfo = function (a) {
    this.typematicState = this._readInt16(), this.typematicPeriod = this._readInt32(), this.typematicDelay = this._readInt32(), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readLEDState = function (a) {
    this._keyboardLEDs = this._readInt32(), this.options.onKeyboardLEDsChanged(this._keyboardLEDs), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readFrameStamp = function (a) {
    this._frameTimestampLo = this._readInt32(), this._frameTimestampHi = this._readInt32(), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._fillRectWithColor = function (a, b, c, d, e, f) {
    var g;
    g = "rgb(" + f[0] + "," + f[1] + "," + f[2] + ")", a.fillStyle = g, a.fillRect(b, c, d, e)
  };
  WMKS.VNCDecoder.prototype._blitImageString = function (a, b, c, d, e, f) {
    var g, h, i;
    g = a.createImageData(d, e), i = g.data;
    for (h = 0; h < d * e * 4; h += 4) i[h] = f.charCodeAt(h + 2), i[h + 1] = f.charCodeAt(h + 1), i[h + 2] = f.charCodeAt(h + 0), i[h + 3] = 255;
    a.putImageData(g, b, c)
  };
  WMKS.VNCDecoder.prototype._copyRectGetPut = function (srcIndex, srcX, srcY, width, height, dstIndex, dstX, dstY) {
    let img;
    img = this._canvas[srcIndex].ctx.getImageData(srcX, srcY, width, height);

    this._canvas[dstIndex].ctx.putImageData(img, dstX, dstY);
    img = undefined;
  };
  WMKS.VNCDecoder.prototype._copyRectDrawImage = function (a, b, c, d, e, f, g, h) {
    this._canvas[f].ctx.drawImage(this._canvas[a], b, c, d, e, g, h, d, e)
  };
  WMKS.VNCDecoder.prototype._copyRectDrawImageTemp = function (a, b, c, d, e, f, g, h) {
    this._copyRectDrawImage(a, b, c, d, e, 2, b, c), this._copyRectDrawImage(2, b, c, d, e, f, g, h)
  };
  WMKS.VNCDecoder.prototype._lighten = function (a, b, c, d, e) {
    "use strict";
      this._canvas[0].ctx.globalCompositeOperation = "lighten",
      this._canvas[0].ctx.fillStyle = e,
      this._canvas[0].ctx.fillRect(a, b, c, d),
      this._canvas[0].ctx.globalCompositeOperation = "source-over"
  };
  WMKS.VNCDecoder.prototype._decodeDiffComp = function (a, b) {
    "use strict";
    var c = 0,
      d = 0,
      e = new Uint8Array(1024),
      f;
    while (d < a.length && c <= e.length) switch (a[d++]) {
      case this.diffCompCopyFromPrev:
        var g = a[d++];
        e.set(b.subarray(c, c + g), c), c += g;
        break;
      case this.diffCompAppend:
        var g = a[d++];
        e.set(a.subarray(d, d + g), c), d += g, c += g;
        break;
      case this.diffCompAppendRemaining:
        return f = new Uint8Array(c + a.length - d), f.set(e.subarray(0, c), 0), d < a.length && f.set(a.subarray(d), c), f
    }
    return e.subarray(0, c)
  };
  WMKS.VNCDecoder.prototype._readTightData = function (a) {
    var b = this._readBytes(this.nextBytes),
      // @ts-ignore
      d = window.URL || window.webkitURL,
      e = this,
      f;
    a.subEncoding === this.subEncDiffJpeg && (b = this._decodeDiffComp(b, this._lastJpegData)), a.subEncoding !== this.subEncPNG ? (this._lastJpegData = b, f = "image/jpeg") : f = "image/png", this._useImageBitmaps ? createImageBitmap(new Blob([b], {
      type: f
    }))
      .then(function (b) {
        a.image = b, e.onDecodeComplete()
      }) : (a.image = this._imageManager.getImage(), a.image.width = a.width, a.image.height = a.height, d && !(WMKS.BROWSER.isChrome() && WMKS.BROWSER.version.major >= 50) ? (a.image.onload = this.onDecodeObjectURLComplete, a.image.src = d.createObjectURL(new Blob([b], {
      type: f
    }))) : (b = Base64.encodeFromArray(b), a.image.onload = this.onDecodeComplete, a.image.src = "data:" + f + ";base64," + b)), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readTightPNG = function (a) {
    a.subEncoding = this._readByte(), a.subEncoding &= this.subEncMask, this._mediaPlayer && this.options.onEncodingChanged("TightPNG");
    if (a.subEncoding === this.subEncFill) a.color = [], a.color[0] = this._readByte(), a.color[1] = this._readByte(), a.color[2] = this._readByte(), a.color[3] = 255, this.rectsDecoded++, this._nextRect();
    else {
      var b = 1,
        c = this._readByte();
      c & 128 && (b = 2, c &= -129, c += this._readByte() << 7, c & 16384 &&
      (b = 3, c &= -16385, c += this._readByte() << 14)), this._setReadCB(c, this._readTightData, a)
    }
  };
  WMKS.VNCDecoder.prototype._readH264MP4Rect = function (a) {
    var b = this._readInt16(),
      c = this._readInt16(),
      d = this._readInt32();
    b === 1 && (WMKS.LOGGER.log("MP4 encoding is selected and stream is reset."), this.options.onEncodingChanged("MP4"), this._mp4Decoder.init(this._mediaPlayer, undefined, undefined, this.onDecodeComplete, this.onDecodeMP4Error)), this._setReadCB(d, this._readH264MP4Data, a)
  };
  WMKS.VNCDecoder.prototype._readH264MP4Data = function (a) {
    this._mp4Decoder.appendData(this._readBytes(this.nextBytes)), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readH264Rect = function (a) {
    var b = this._readInt16(),
      c = this._readInt16(),
      d = this._readInt32();
    b === 1 && (WMKS.LOGGER.log("Raw H264 encoding is selected and stream is reset."), this.options.onEncodingChanged("RawH264")), this._setReadCB(d, this._readH264Data, a)
  };
  WMKS.VNCDecoder.prototype._readH264Data = function (a) {
    this._readBytes(this.nextBytes), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readCopyRect = function (a) {
    a.srcX = this._readInt16(), a.srcY = this._readInt16(), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readRaw = function (a) {
    a.imageString = this._readString(this.nextBytes), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readDesktopSize = function (a) {
    this._FBWidth = a.width, this._FBHeight = a.height, this.options.onNewDesktopSize(this._FBWidth, this._FBHeight), this._nextRect()
  };
  WMKS.VNCDecoder.prototype._readRect = function () {
    var a = this.rectsRead;
    this.rect[a] = {}, this.rect[a].x = this._readInt16(), this.rect[a].y = this._readInt16(), this.rect[a].width = this._readInt16(), this.rect[a].height = this._readInt16(), this.rect[a].encoding = this._readInt32(), this.rect[a].encoding !== this.encTightPNG && this.rect[a].encoding !== this.encH264MP4 && this.rectsDecoded++;
    switch (this.rect[a].encoding) {
      case this.encRaw:
        this._setReadCB(this.rect[a].width * this.rect[a].height * this._FBBytesPerPixel, this._readRaw, this.rect[a]);
        break;
      case this.encCopyRect:
        this._setReadCB(4, this._readCopyRect, this.rect[a]);
        break;
      case this.encOffscreenCopyRect:
        this._setReadCB(6, this._readOffscreenCopyRect, this.rect[a]);
        break;
      case this.encUpdateCache:
        this._setReadCB(5, this._readUpdateCacheRect, this.rect[a]);
        break;
      case this.encH264RectEnc:
        this._setReadCB(8, this._readH264Rect, this.rect[a]);
        break;
      case this.encTightPNG:
        this._setReadCB(4, this._readTightPNG, this.rect[a]);
        break;
      case this.encH264MP4:
        this._setReadCB(8, this._readH264MP4Rect);
        break;
      case this.encDesktopSize:
        this._readDesktopSize(this.rect[a]);
        break;
      case this.encVMWDefineCursor:
        this._setReadCB(2, this._readVMWDefineCursor, this.rect[a]);
        break;
      case this.encVMWCursorState:
        this._assumeServerIsVMware(), this._setReadCB(2, this._readVMWCursorState, this.rect[a]);
        break;
      case this.encVMWCursorPosition:
        this._readVMWCursorPosition(this.rect[a]);
        break;
      case this.encVMWTypematicInfo:
        this._setReadCB(10, this._readTypematicInfo, this.rect[a]);
        break;
      case this.encVMWLEDState:
        this._setReadCB(4, this._readLEDState, this.rect[a]);
        break;
      case this.encVMWFrameStamp:
        this._setReadCB(8, this._readFrameStamp, this.rect[a]);
        break;
      default:
        return this.fail("Disconnected: unsupported encoding " + this.rect[a].encoding)
    }
  };
  WMKS.VNCDecoder.prototype._evictUpdateCacheEntry = function (a) {
    "use strict";
    this.updateCache[a].image !== null && this._releaseImage(this.updateCache[a].image),
      this.updateCache[a] = {},
      this.updateCache[a].image = null
  };
  WMKS.VNCDecoder.prototype._executeUpdateCacheInit = function (a) {
    "use strict";
    var b;
    for (b = 0; b < this.updateCacheEntries; b++) this._evictUpdateCacheEntry(b);
    this.updateCache = [], this.updateCacheEntries = a.updateCacheEntries;
    if (this.updateCacheEntries > this.options.cacheSizeEntries) return this.fail("Disconnected: requested cache too large");
    for (b = 0; b < this.updateCacheEntries; b++) this.updateCache[b] = {}, this.updateCache[b].image = null
  };
  WMKS.VNCDecoder.prototype._updateCacheInsideBeginEnd = function () {
    return this.decodeToCacheEntry !== -1
  };
  WMKS.VNCDecoder.prototype._updateCacheInitialized = function () {
    return this.updateCacheSizeEntries !== 0
  };
  WMKS.VNCDecoder.prototype._executeUpdateCacheBegin = function (a) {
    "use strict";
    var b, c, d, e, f;
    if (!this._updateCacheInitialized() || this._updateCacheInsideBeginEnd() || a.slot >= this.updateCacheEntries) return this.fail("Disconnected: requested cache slot too large");
    b = new WMKS.BitBuf(a.data, a.dataLength), c = !b.readBits(1), d = 0, f = 0;
    do {
      d = b.readEliasGamma(), c = !c;
      if (c)
        for (e = 0; e < d && e < this.updateCacheEntries; e++) this._evictUpdateCacheEntry(e + f);
      f += d
    } while (f < this.updateCacheEntries && !b.overflow);
    this.decodeToCacheEntry = a.slot, this._evictUpdateCacheEntry(a.slot), this.updateCache[this.decodeToCacheEntry].imageWidth = a.width, this.updateCache[this.decodeToCacheEntry].imageHeight = a.height
  };
  WMKS.VNCDecoder.prototype._executeUpdateCacheEnd = function (a) {
    "use strict";
    var b = this.updateCache[this.decodeToCacheEntry],
      c, d, e = 0,
      f = 0,
      g = Math.ceil(this._FBWidth / 16),
      h = Math.ceil(this._FBHeight / 16),
      i = 0,
      j = 0,
      k = b.imageWidth / 16,
      l = b.imageHeight / 16,
      m, n;
    if (!this._updateCacheInitialized() || !this._updateCacheInsideBeginEnd() || a.slot != this.decodeToCacheEntry || a.slot >= this.updateCacheEntries) return this.fail("Disconnected: requested cache slot invalid");
    b.mask = a.data, b.maskLength = a.dataLength, n = new WMKS.BitBuf(b.mask, b.maskLength), c = !n.readBits(1), d = 0;
    do d == 0 && (d = n.readEliasGamma(), c = !c), m = Math.min(k - i, g - e), m = Math.min(m, d), c && (this._canvas[0].ctx.drawImage(b.image, i * 16, j * 16, m * 16, 16, e * 16, f * 16, m * 16, 16), i += m, i == k && (i = 0, j++)), e += m, e == g && (e = 0, f++), d -= m; while (f < h && !n._overflow);
    this.decodeToCacheEntry = -1
  };
  WMKS.VNCDecoder.prototype._executeUpdateCacheReplay = function (a) {
    "use strict";
    if (a.slot >= this.updateCacheEntries) return this.fail("Disconnected: requested cache slot invalid");
    var b = 0,
      c = 0,
      d = Math.ceil(this._FBWidth / 16),
      e = Math.ceil(this._FBHeight / 16),
      f, g = this.updateCache[a.slot],
      h = 0,
      i = 0,
      j = g.imageWidth / 16,
      k = g.imageHeight / 16,
      l = new WMKS.BitBuf(a.data, a.dataLength),
      m = new WMKS.BitBuf(g.mask, g.maskLength),
      n = !m.readBits(1),
      o = 0,
      p = !l.readBits(1),
      q = 0;
    if (!this._updateCacheInitialized() || this._updateCacheInsideBeginEnd() || a.slot >= this.updateCacheEntries) return this.fail("");
    do o == 0 && (o = m.readEliasGamma(), n = !n), q == 0 && (q = l.readEliasGamma(), p = !p), f = d - b, f = Math.min(f, o), n && (f = Math.min(f, j - h), f = Math.min(f, q), p && this._canvas[0].ctx.drawImage(g.image, h * 16, i * 16, f * 16, 16, b * 16, c * 16, f * 16, 16), h += f, h == j && (h = 0, i++), q -= f), b += f, b == d && (b = 0, c++), o -= f; while (c < e && !l._overflow && !m._overflow)
  };
  WMKS.VNCDecoder.prototype._handleVCDProxyVmxPathMessage = function () {
    var a = this._readString(17);
    if (a !== "connect info vmx\n") return this.fail("Invalid connection vmx request: " + a);
    this._sendString(this.options.VCDProxyHandshakeVmxPath), this._setReadCB(12, this._peekFirstMessage)
  };
  WMKS.VNCDecoder.prototype._executeUpdateCache = function (a) {
    "use strict";
    switch (a.opcode) {
      case this.updateCacheOpInit:
        this._executeUpdateCacheInit(a);
        break;
      case this.updateCacheOpBegin:
        this._executeUpdateCacheBegin(a);
        break;
      case this.updateCacheOpEnd:
        this._executeUpdateCacheEnd(a);
        break;
      case this.updateCacheOpReplay:
        this._executeUpdateCacheReplay(a);
        break;
      default:
        return this.fail("Disconnected: requested cache opcode invalid")
    }
  };
  WMKS.VNCDecoder.prototype._executeRectSingle = function (a) {
    var b = this._canvas[0].ctx;
    switch (a.encoding) {
      case this.encRaw:
        this._blitImageString(b, a.x, a.y, a.width, a.height, a.imageString), a.imageString = "";
        break;
      case this.encCopyRect:
        this._copyRectBlit(0, a.srcX, a.srcY, a.width, a.height, 0, a.x, a.y);
        break;
      case this.encOffscreenCopyRect:
        this._copyRectOffscreenBlit(a.srcBuffer, a.srcX, a.srcY, a.width, a.height, a.dstBuffer, a.x, a.y);
        break;
      case this.encTightPNG:
        a.subEncoding === this.subEncFill ? this._fillRectWithColor(b, a.x, a.y, a.width, a.height, a.color) : this.decodeToCacheEntry === -1 ? (b.drawImage(a.image, a.x, a.y), this._releaseImage(a.image), a.image = null) : (this.updateCache[this.decodeToCacheEntry].image = a.image, a.image = null);
        break;
      case this.encDesktopSize:
      case this.encVMWDefineCursor:
      case this.encVMWCursorState:
      case this.encVMWCursorPosition:
      case this.encH264MP4:
        break;
      case this.encUpdateCache:
        this._executeUpdateCache(a);
        break;
      default:
    }
  };
  WMKS.VNCDecoder.prototype._executeRects = function () {
    var a;
    if (this._state !== this.FBU_DECODING_STATE) return this.fail("wrong state: " + this._state);
    if (this.rectsDecoded !== this.rects || this.rectsRead !== this.rects) return this.fail("messed up state");
    for (a = 0; a < this.rects; a++) this._executeRectSingle(this.rect[a]), delete this.rect[a];
    var b = (new Date)
      .getTime();
    this._sendAck(b - this.decodeStart), this.rects = 0, this.rectsRead = 0, this.rectsDecoded = 0, this.updateReqId = 0, this._receivedFirstUpdate === !1 && (this.options.onConnected(), this._receivedFirstUpdate = !0);
    var c = this;
    this._state = this.FBU_RESTING_STATE, this._getNextServerMessage(), this._msgTimer = setTimeout(this.msgTimeout, 1)
  };
  WMKS.VNCDecoder.prototype._nextRect = function () {
    this.rectsRead++, this.rectsRead < this.rects ? this._setReadCB(12, this._readRect) : (this._state = this.FBU_DECODING_STATE, this.rectsDecoded === this.rects && this._executeRects())
  };
  WMKS.VNCDecoder.prototype._gobble = function (a) {
    this._skipBytes(this.nextBytes), a()
  };
  WMKS.VNCDecoder.prototype._getNextServerMessage = function () {
    this._setReadCB(1, this._handleServerMsg)
  };
  WMKS.VNCDecoder.prototype._framebufferUpdate = function () {
    this.updateReqId = this._readByte(), this.rects = this._readInt16(), this.rectsRead = 0, this.rectsDecoded = 0, this.decodeStart = (new Date)
      .getTime(), this._setReadCB(12, this._readRect)
  };
  WMKS.VNCDecoder.prototype._handleServerInitializedMsg = function () {
    var a = this;
    this._FBWidth = this._readInt16(), this._FBHeight = this._readInt16();
    var b = this._readByte(),
      c = this._readByte(),
      d = this._readByte(),
      e = this._readByte();
    WMKS.LOGGER.log("Screen: " + this._FBWidth + " x " + this._FBHeight + ", bits-per-pixel: " + b + ", depth: " + c + ", big-endian-flag: " + d + ", true-color-flag: " + e), this._skipBytes(6);
    var f = this._readByte(),
      g = this._readByte(),
      h = this._readByte();
    WMKS.LOGGER.debug("red shift: " + f + ", green shift: " + g + ", blue shift: " + h), this._skipBytes(3);
    var i = this._readInt32();
    this.options.onNewDesktopSize(this._FBWidth, this._FBHeight), this._copyRectBlit = this._copyRectDrawImageTemp, this._copyRectOffscreenBlit = this._copyRectDrawImage;
    if (e) this._FBBytesPerPixel = 4, this._FBDepth = 3;
    else return this.fail("no colormap support");
    var j = function () {
      a._FBName = a._readString(i), a._sendClientEncodingsMsg(), a._sendFBUpdateRequestMsg(0), WMKS.LOGGER.log("Connected " + (a._encrypted ? "(encrypted)" : "(unencrypted)") + " to: " + a._FBName), a._serverInitialized = !0, a._getNextServerMessage()
    };
    this._setReadCB(i, j)
  };
  WMKS.VNCDecoder.prototype._peekFirstMessage = function () {
    this.usedVNCHandshake = this._receiveQueue[0].data.byteLength == 12, this.usedVNCHandshake ? this._setReadCB(12, this._handleProtocolVersionMsg) : this._setReadCB(24, this._handleServerInitializedMsg)
  };
  WMKS.VNCDecoder.prototype._handleSecurityResultMsg = function () {
    var a = this,
      b, c = function () {
        var c = a._readString(b);
        return a.options.onAuthenticationFailed(), a.fail(c)
      },
      d = function () {
        b = a._readInt32(), a._setReadCB(b, c)
      };
    switch (this._readInt32()) {
      case 0:
        this._sendBytes([1]), this._setReadCB(24, this._handleServerInitializedMsg);
        return;
      case 1:
        this._setReadCB(4, d);
        return;
      case 2:
        return this.options.onAuthenticationFailed(), this.fail("Too many auth attempts");
      default:
        return this.fail("Bogus security result")
    }
  };
  WMKS.VNCDecoder.prototype._handleSecurityMsg = function () {
    var a = 0,
      b, c, d = this,
      e = function () {
        var a = this._readString(c);
        return d.options.onAuthenticationFailed(), d.fail(a)
      },
      f = function () {
        c = d._readInt32(), d._setReadCB(c, e)
      },
      g = function () {
        var c = d._readBytes(b);
        WMKS.LOGGER.log("Server security types: " + c);
        for (var e = 0; e < c.length; e += 1) c && c[e] < 3 && (a = c[e]);
        if (a === 0) return d.fail("Unsupported security types: " + c);
        d._sendBytes([a]), WMKS.LOGGER.log("Using authentication scheme: " + a);
        if (a === 1) d._setReadCB(4, d._handleSecurityResultMsg);
        else return d.fail("vnc authentication not implemented")
      };
    b = this._readByte(), b === 0 ? this._setReadCB(4, f) : this._setReadCB(b, g)
  };
  WMKS.VNCDecoder.prototype._handleProtocolVersionMsg = function () {
    var a = this._readString(12);
    if (a !== "RFB 003.008\n") return this.fail("Invalid Version packet: " + a);
    this._sendString("RFB 003.008\n"), this._setReadCB(1, this._handleSecurityMsg)
  };
  WMKS.VNCDecoder.prototype._sendClientCaps = function () {
    if (this._serverInitialized) {
      var a = [],
        b = this.clientCapHeartbeat | this.clientCapAudioAck | this.clientCapSetReconnectToken;
      this.options.enableVorbisAudioClips ? b |= this.clientCapVorbisAudioClips : this.options.enableOpusAudioClips ? b |= this.clientCapOpusAudioClips : this.options.enableAacAudioClips && (b |= this.clientCapAacAudioClips), this.options.enableVMWSessionClose && (b |= this.clientCapSessionClose), this.options.enableVMWAudioMixer && (b |= this.clientCapUseAudioMixer), this.serverSupportsMKSVChanClipboard && this.vvcSession && (b |= this.clientCapUseMKSVChanClipboard), a.push8(this.msgVMWClientMessage), a.push8(3), a.push16(8), a.push32(b), this._sendBytes(a)
    }
  };
  WMKS.VNCDecoder.prototype._sendSessionClose = function (a) {
    if (this._serverInitialized && this.useVMWSessionClose && this.options.enableVMWSessionClose) {
      WMKS.LOGGER.log("Send session close to server.");
      var b = [];
      b.push8(this.msgVMWClientMessage), b.push8(this.msgVMWSessionClose), b.push16(8), b.push32(a), this._sendBytes(b)
    }
  };
  WMKS.VNCDecoder.prototype._sendUpdateCacheInfo = function () {
    "use strict";
    var a = [],
      b = this.updateCacheCapReplay | this.updateCacheCapDisableOffscreenSurface,
      c = this.options.cacheSizeEntries,
      d = this.options.cacheSizeKB;
    WMKS.LOGGER.trace("sendUpdateCacheInfo"), a.push8(this.msgVMWClientMessage), a.push8(11), a.push16(14), a.push32(b), a.push16(c), a.push32(d), this._sendBytes(a)
  };
  WMKS.VNCDecoder.prototype._handleServerCapsMsg = function () {
    var a = this._readInt32();
    this.useVMWKeyEvent = !!(a & this.serverCapKeyEvent), this.allowVMWKeyEvent2UnicodeAndRaw = this.options.useUnicodeKeyboardInput && !!(a & this.serverCapKeyEvent2Unicode) && !!(a & this.serverCapKeyEvent2JSKeyCode), this.useVMWAck = !!(a & this.serverCapUpdateAck), this.useVMWRequestResolution = !!(a & this.serverCapRequestResolution), this.useVMWRequestMultiMon = !!(a & this.serverCapMultiMon), this.useVMWAudioAck = !!(a & this.serverCapAudioAck), this.useVMWSessionClose = !!(a & this.serverCapSessionClose), this.serverSupportsMKSVChanClipboard = !!(a & this.serverCapHasMKSVChanClipboard), this.useVMWRequestResolution && this.requestedWidth > 0 && this.requestedHeight > 0 && this.onRequestResolution(this.requestedWidth, this.requestedHeight), a & this.serverCapClientCaps && this._sendClientCaps(), a & this.serverCapUpdateCacheInfo && this._sendUpdateCacheInfo();
    if (a & this.serverCapDisablingCopyUI || a & this.serverCapDisablingPasteUI) {
      var b = 0,
        c = 0;
      a & this.serverCapDisablingCopyUI && (b = 1), a & this.serverCapDisablingPasteUI && (c = 1), this.options.onUpdateCopyPasteUI(b, c)
    }
    this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleServerHeartbeatMsg = function () {
    var a = this._readInt16();
    this.options.onHeartbeat(a), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleSessionCloseMsg = function () {
    var a = this._readInt32();
    this.options.onBeforeDisconnected(a), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleAudioMixer = function () {
    var a = this._readInt32(),
      b = this._readInt32(),
      c = this._readInt32(),
      d = this._readInt32();
    a < 2 && (b === 0 || b === 1) ? this.options.onAudioMixer({
      channelId: a,
      msgType: b,
      data: c,
      flags: d
    }) : WMKS.LOGGER.warn("Ignoring audio mixer message for an unsupported  channelId = " + a + " msgType = " + b + " data = " + c + " flags = " + d), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleServerSetReconnectTokenMsg = function (a) {
    var b = this._readString(a);
    this.options.onSetReconnectToken(b), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleServerAudioMsg = function () {
    var a = this._readInt32(),
      b = this._readInt32(),
      c = this._readInt32(),
      d = this._readInt32(),
      e = this._readInt32(),
      f = this._readInt32(),
      g = this._readInt32(),
      h = this._readInt32(),
      i = {
        sampleRate: b,
        numChannels: c,
        containerSize: e,
        sampleSize: d,
        length: a,
        audioTimestampLo: f,
        audioTimestampHi: g,
        frameTimestampLo: this._frameTimestampLo,
        frameTimestampHi: this._frameTimestampHi,
        flags: h,
        data: null
      };
    this._setReadCB(a, this._handleServerAudioMsgData, i)
  };
  WMKS.VNCDecoder.prototype._handleServerAudioMsgData = function (a) {
    a.length > 0 ? (a.data = this._readBytes(a.length), this.useVMWAudioAck && (a.flags == 0 || a.flags & this.audioflagRequestAck) && this._sendAudioAck(a.audioTimestampLo, a.audioTimestampHi), this.options.onAudio(a)) : WMKS.LOGGER.info("Audio data length is 0."), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleServerCutText = function (a) {
    var b = this._readStringUTF8(a);
    this.options.onCopy(b), this._getNextServerMessage()
  };
  WMKS.VNCDecoder.prototype._handleServerMsg = function () {
    var a, b, c, d, e, f = this,
      g = this._readByte();
    switch (g) {
      case this.msgFramebufferUpdate:
        this._setReadCB(3, this._framebufferUpdate);
        break;
      case this.msgSetColorMapEntries:
        var h = function () {
          f._skipBytes(3);
          var a = f._readInt16();
          f._setReadCB(6 * a, f._gobble, f._getNextServerMessage)
        };
        this._setReadCB(5, h);
        break;
      case this.msgRingBell:
        this._getNextServerMessage();
        break;
      case this.msgServerCutText:
        var i = function () {
          f._readBytes(3), a = f._readInt32(), a > 0 ? f._setReadCB(a, f._handleServerCutText, a) : f._getNextServerMessage()
        };
        this._setReadCB(8, i);
        break;
      case this.msgVMWSrvMessage:
        var j = function () {
          var a = f._readByte(),
            b = f._readInt16();
          if (a === this.msgVMWSrvMessage_ServerCaps) {
            if (b !== 8) return f.options.onProtocolError(), f.fail("invalid length message for id: " + a + ", len: " + b);
            f._setReadCB(b - 4, f._handleServerCapsMsg)
          } else if (a === this.msgVMWSrvMessage_Heartbeat) {
            if (b !== 6) return f.options.onProtocolError(), f.fail("invalid length message for id: " + a + ", len: " + b);
            f._setReadCB(b - 4, f._handleServerHeartbeatMsg)
          } else if (a === this.msgVMWSrvMessage_SetReconnectToken) f._setReadCB(b - 4, f._handleServerSetReconnectTokenMsg, b - 4);
          else if (a === this.msgVMWSrvMessage_Audio) {
            if (b !== 36) return f.options.onProtocolError(), f.fail("invalid length message for id: " + a + ", len: " + b);
            f._setReadCB(b - 4, f._handleServerAudioMsg)
          } else if (a === this.msgVMWSrvMessage_SessionClose) {
            if (b !== 8) return f.options.onProtocolError(), f.fail("invalid length message for id: " + a + ", len: " + b);
            f._setReadCB(b - 4, f._handleSessionCloseMsg)
          } else if (a === this.msgVMWSrvMessage_AudioMixer) {
            if (b !== 20) return f.options.onProtocolError(), f.fail("invalid length message for id: " + a + ", len: " + b);
            f._setReadCB(b - 4, f._handleAudioMixer)
          } else {
            var c = b - 4;
            c === 0 ? f._getNextServerMessage() : f._setReadCB(c, f._gobble, f._getNextServerMessage)
          }
        };
        this._setReadCB(3, j);
        break;
      default:
        return this.options.onProtocolError(), this.fail("Disconnected: illegal server message type " + g)
    }
  };
  WMKS.VNCDecoder.prototype._processMessages = function () {
    while (this._state === this.VNC_ACTIVE_STATE && this._receiveQueueBytesUnread() >= this.nextBytes) {
      var a = this.nextBytes,
        b = this._receiveQueueBytesUnread();
      this.nextFn(this.nextArg);
      var c = this._receiveQueueBytesUnread();
      if (a < b - c) return this.fail("decode overrun " + a + " vs " + (b - c))
    }
  };
  WMKS.VNCDecoder.prototype.onMouseMove = function (a, b) {
    this._mouseX = a, this._mouseY = b, this._serverInitialized && (this._mouseActive = !0, this._mouseTimer === null && (this._sendMouseEvent(), this._mouseTimer = setTimeout(this.mouseTimeout, this.mouseTimeResolution)))
  };
  WMKS.VNCDecoder.prototype.onMouseButton = function (a, b, c, d) {
    this._mouseX = a, this._mouseY = b, c ? this._mouseButtonMask |= d : this._mouseButtonMask &= ~d, this._serverInitialized && (this._mouseActive = !0, this._sendMouseEvent())
  };
  WMKS.VNCDecoder.prototype.onKeyVScan = function (a, b) {
    if (this._serverInitialized) {
      var c = [];
      c.push8(this.msgVMWClientMessage), c.push8(this.msgVMWKeyEvent), c.push16(8), c.push16(a), c.push8(b), c.push8(0), this._sendBytes(c)
    }
  };
  WMKS.VNCDecoder.prototype.onVMWKeyUnicode = function (a, b, c) {
    if (this._serverInitialized) {
      var d = [];
      d.push8(this.msgVMWClientMessage), d.push8(this.msgVMWKeyEvent2), d.push16(10), d.push32(a), d.push8(b), d.push8(c), this._sendBytes(d)
    }
  };
  WMKS.VNCDecoder.prototype.onMouseWheel = function (a, b, c, d) {
    if (this._serverInitialized) {
      var e = [];
      e.push8(this.msgVMWClientMessage), e.push8(this.msgVMWPointerEvent2), e.push16(19), e.push8(1), e.push32(a), e.push32(b), e.push32(0), e.push8(d), e.push8(c), this._sendBytes(e)
    }
  };
  WMKS.VNCDecoder.prototype.onRequestResolution = function (a, b) {
    this._serverInitialized && this.useVMWRequestResolution && (a !== this.requestedWidth || b !== this.requestedHeight) && (this.resolutionRequestActive = !0, clearTimeout(this.resolutionTimer), this.resolutionTimer = setTimeout(this.resolutionTimeout, this.resolutionDelay), this.requestedWidth = a, this.requestedHeight = b)
  };
  WMKS.VNCDecoder.prototype.onRequestTopology = function (a) {
    this._serverInitialized && this.useVMWRequestMultiMon && (WMKS.LOGGER.log("Calling _sendTopologyRequest with arg:" + a), WMKS.LOGGER.log(a), console.log(a), this._sendTopologyRequest(a))
  };
  WMKS.VNCDecoder.prototype.disconnect = function () {
    "use strict";
    this._state !== this.DISCONNECTED && (this._state = this.DISCONNECTED, this._mp4Decoder && (this._mp4Decoder.reset(), this._mp4Decoder = null), this._receiveQueueReset(), this.rects = 0, this._receivedFirstUpdate = !1, this._websocket && (this._sendSessionClose(23), this._websocket.onopen = null, this._websocket.onclose = null, this._websocket.onmessage = null, this._websocket.onerror = null, this._websocket.close(), delete this._websocket), this._serverInitialized = !1)
  };
  WMKS.VNCDecoder.prototype.connect = function (a) {
    var b = this;
    this.setRenderCanvas(this.options.canvas), this._mediaPlayer = this.options.mediaPlayer, this.onDecodeComplete = function () {
      b.rectsDecoded++, b.rectsDecoded === b.rects && b.rectsRead === b.rects && (b._state = b.FBU_DECODING_STATE, b._executeRects())
    }, this.onDecodeObjectURLComplete = function () {
      URL.revokeObjectURL(this.src), b.onDecodeComplete()
    }, this.onDecodeMP4Error = function () {
      var a = b.options.mediaPlayer;
      WMKS.LOGGER.log("Resetting stream request is sent."), b.options.mediaPlayer = null, b._sendClientEncodingsMsg(), b.options.mediaPlayer = a, b._sendClientEncodingsMsg()
    }, this.msgTimeout = function () {
      b._state = b.VNC_ACTIVE_STATE, b._processMessages()
    }, this.mouseTimeout = function () {
      b._mouseTimer = null, b._mouseActive && (b._sendMouseEvent(), b._mouseTimer = setTimeout(b.mouseTimeout, b.mouseTimeResolution))
    }, this.resolutionTimeout = function () {
      b.resolutionRequestActive && (b._sendResolutionRequest(), b.resolutionRequestActive = !1)
    }, this.options.VCDProxyHandshakeVmxPath ? this._setReadCB(17, this._handleVCDProxyVmxPathMessage) : this._setReadCB(12, this._peekFirstMessage), this._url = a, this._receiveQueueReset(), this.wsOpen = function (a) {
      b._state = b.VNC_ACTIVE_STATE;
      if (this.protocol !== "binary" && this.protocol !== "vmware-vvc") return this.fail("no agreement on protocol");
      this.protocol === "vmware-vvc" && (b._setupVVC(), WMKS.LOGGER.log("WebSocket is using VMware Virtual Channels"), this.protocol = "binary"), this.protocol === "binary" && (this.binaryType = "arraybuffer", WMKS.LOGGER.log("WebSocket HAS binary support")), b.options.onConnecting(b.vvc, b.vvcSession), WMKS.LOGGER.log("WebSocket created protocol: " + this.protocol)
    }, this.wsClose = function (a) {
      b.options.onDisconnected(a.reason, a.code)
    }, this.wsMessage = function (a) {
      if (typeof a.data != "string") b._receiveQueue.push(a), b._receiveQueueLength += a.data.byteLength;
      else return b.fail("non-binary message");
      b._processMessages()
    }, this.wsError = function (a) {
      b.options.onError(a)
    }, this.protocolList = ["binary"], this.options.enableVVC && this.protocolList.push("vmware-vvc"), this._setupConnection = function () {
      b._websocket = WMKS.WebSocket(b._url, b.protocolList), b._websocket.onopen = b.wsOpen, b._websocket.onclose = b.wsClose, b._websocket.onmessage = b.wsMessage, b._websocket.onerror = b.wsError
    }, this._setupVVC = function () {
      b.vvc = new VVC(), b.vvcSession = b.vvc.openSession(b._websocket), b.vvcSession.onerror = function (a) {
        b.vvcSession.close()
      }, b.vvcSession.ontransportclose = function (a) {
        b.wsClose(a)
      }, b.vvcSession.ontransporterror = function (a) {
        b.wsError(a)
      };
      var a = b.vvc.createListener(b.vvcSession, "blast-*");
      a.onpeeropen = function (a, c) {
        c.name === "blast-mks" ? (c.onclose = function (c) {
          a.close(), b._websocket = null, b.disconnect()
        }, c.onerror = function (c) {
          a.close(), b._websocket = null, b.disconnect()
        }, b._websocket = c, c.onmessage = b.wsMessage, a.acceptChannel(c)) : c.name === "blast-audio" && (c.onclose = function (b) {
          a.close()
        }, c.onerror = function (b) {
          a.close()
        }, c.onmessage = b.wsMessage, a.acceptChannel(c))
      }
    }, this._retryConnectionTimeout = function () {
      b._state === b.DISCONNECTED && (WMKS.LOGGER.log("Connection timeout. Retrying now."), b._websocket && (b._websocket.onclose = function () {
      }, b._websocket.close(), b._websocket = null), b._setupConnection()), b._retryConnectionTimer = null
    }, this.options.enableUint8Utf8 && addUint8Utf8(this), this._setupConnection(), this.options.retryConnectionInterval > 0 && (WMKS.LOGGER.log("Check connection status after " + this.options.retryConnectionInterval + "ms."), this._retryConnectionTimer = setTimeout(this._retryConnectionTimeout, this.options.retryConnectionInterval))
  };
  WMKS.VNCDecoder.prototype.setRenderCanvas = function (a) {
    this._canvas[0] = a, this._canvas[0].ctx = a.getContext("2d");
    if (!this._canvas[0].ctx.createImageData) throw "no canvas imagedata support"
  };

  /**
   * WebMKS related keyboard management is handled here.
   * There are 2 types of inputs that can be sent.
   *
   * 1. VMware VScanCodes that are handled by the hypervisor.
   * 2. KeyCodes + unicode based messages for Blast+NGP.
   *
   * The message type to be sent is determined by flags in vncDecoder:
   *     seVMWKeyEvent            // VMware VScanCode key inputs are handled.
   *    useVMWKeyEventUnicode     // unicode key inputs are handled.
   *
   * Input handling is quite different for desktop browsers with physical
   * keyboard vs soft keyboards on touch devices. To deal with these we use
   * separate event handlers for keyboard inputs.
   */

  /**
   * List of keyboard constants.
   */
  WMKS.CONST.KB = {
    /*
    * backspace, tab, enter, shift, ctrl, alt, pause, caps lock, escape,
    * pgup, pgdown, end, home, left, up, right, down, insert, delete,
    * win-left(or meta on mac), win-right, menu-select(or meta-right), f1 - f12,
    * num-lock, scroll-lock
    */
    ControlKeys: [8, 9, 13, 16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 91, 92, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 240],

    /*
    * If you change this, change 'vals' in syncModifiers.
    * shift, ctrl, alt, win-left, win-right
    */
    Modifiers: [16, 17, 18, 91, 92],
    WestEuroLanguage: ["de-DE", "it-IT", "es-ES", "pt-BR", "pt-PT", "fr-FR", "fr-CH", "de-CH"],

    /*
    * List of characters to discard on an onKeyDown on Windows with Firefox
    * 192 = VK_OEM_3
    */
    Diacritics: [192],

    KEY_CODE: {
      Shift: 16,
      Ctrl: 17,
      Alt: 18,
      Meta: 91, // Mac left CMD key.
      Enter: 13,
      CapsLock: 20
    },

    SoftKBRawKeyCodes: [8, 9, 13], // backspace, tab, newline
    keyInputDefaultValue: ' ', // Default value for the input textbox.

    ANSIShiftSymbols: '~!@#$%^&*()_+{}|:"<>?', // ANSI US layout keys that require shift
    ANSINoShiftSymbols: "`-=[]\\;',./1234567890", // ANSI US layout keys that do not require shift

    WindowsKeys: {
      left: 91, // win-left(or meta on Mac, search on ChromeOS)
      right: 92 // win-right
    },

    VScanMap: {}
  };
  WMKS.BROWSER.isMacOS() && (WMKS.CONST.KB.Modifiers = [16, 17, 18, 91, 92, 224]);

  // Map of all ANSI special symbols
  WMKS.CONST.KB.ANSISpecialSymbols = WMKS.CONST.KB.ANSIShiftSymbols + WMKS.CONST.KB.ANSINoShiftSymbols;

  WMKS.KeyboardManager = function(options) {
    'use strict';
    if (!options || !options.vncDecoder) {
      return null;
    }

    this._vncDecoder = options.vncDecoder;
    // Any raw key that needs to be ignored.
    this.ignoredRawKeyCodes = options.ignoredRawKeyCodes;
    this.fixANSIEquivalentKeys = options.fixANSIEquivalentKeys;
    this.mapMetaToCtrlForKeys = options.mapMetaToCtrlForKeys;

    this.keyDownKeyTimer = null;
    this.keyDownIdentifier = null;
    this.pendingKey = null;
    this.activeModifiers = [];
    this.keyToUnicodeMap = {};
    this.keyToRawMap = {};
    // Use different map with mappings for all unicode --> vScanCode.
    this.UnicodeToVScanMap = WMKS.CONST.KB.VScanMap[options.keyboardLayoutId];

    this._windowsKeyManager = {
      // Windows key simulation is enabled or not.
      enabled: options.enableWindowsKey,
      // Windows key is simulated when Ctrl + Windows are pressed.
      windowsOn: false,
      // left Windows key is down or not.
      leftWindowsDown: false,
      // right Windows key is down or not.
      rightWindowsDown: false,
      // modified keyCode map.
      modifiedKeyMap: {
        Pause : 19 // The keyCode of Pause key should be 19
      },
      modifiedKey: null,

      /*
       * reset
       *
       * It's important to do reset when the browser loses focus.
       * Otherwise, some key release events are not captured when
       * the browser loses focuse. In consequence, the states are incorrect.
       */
      reset: function() {
        this.windowsOn = false;
        this.leftWindowsDown = false;
        this.rightWindowsDown = false;
        this.modifiedKey = null;
      },

      /*
       * keyboardHandler
       *
       * Handles Windows keydown and keyup event.
       */
      keyboardHandler: function(e) {
        if (e.keyCode === WMKS.CONST.KB.WindowsKeys.left) {
          // Left Windows key is down or up.
          this.leftWindowsDown = e.type === 'keydown';
          if (!this.leftWindowsDown) {
            // Left Windows key is released.
            this.windowsOn = false;
          }
        } else if (e.keyCode === WMKS.CONST.KB.WindowsKeys.right) {
          // Right Windows key is down or up.
          this.rightWindowsDown = e.type === 'keydown';
          if (!this.rightWindowsDown) {
            // Right Windows key is released.
            this.windowsOn = false;
          }
        }
      },

      /*
       * modifyKey
       *
       * Invoked by _extractKeyCodeFromEvent. Modify some keyCode value
       * when Windows key is held.
       */
      modifyKey: function(keyCode) {
        /*
         * Fix bug 1436247 - Windows+Pause doesn't work
         * The keyCode of Pause key should be 19. However, when Ctrl key is pressed,
         * Pause's keyCode is modified to 3. To fix this issue, at detecting keyCode
         * 3 while Ctrl and Windows are pressed, convert it to 19 directly.
         */
        if (keyCode === 3) {
          // Pause key with Ctrl emits 3.
          if (this.windowsOn) {
            // When Windows key is pressed, restore Pause key to 19.
            keyCode = this.modifiedKeyMap['Pause'];
            this.modifiedKey = 3;
          } else if (this.modifiedKey === 3) {
            // Pause key is released.
            keyCode = this.modifiedKeyMap['Pause'];
            this.modifiedKey = null;
          }
        }

        return keyCode;
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _extractKeyCodeFromEvent
     *
     *    Attempts to extract the keycode from a given key{down,up} event.  The
     *    value extracted may be a unicode value instead of a normal vk keycode.
     *    If this is the case then the 'isUnicode' property will be set to true.
     *    Additionally, in the unicode case, the caller should not expect a
     *    corresponding keyPress event.
     *
     * Results:
     *    If extraction succeeds, returns an object with 'keyCode' and
     *    'isUnicode' properties, null otherwise.
     *
     *---------------------------------------------------------------------------
     */

    this._extractKeyCodeFromEvent = function(e) {
      var keyCode = 0, isUnicode = false;

      if (e.keyCode) {
        keyCode = e.keyCode;
      } else if (e.which) {
        keyCode = e.which;
      } else if (e.keyIdentifier && e.keyIdentifier.substring(0, 2) === 'U+') {
        /*
         * Safari doesn't give us a keycode nor a which value for some
         * keypresses. The only useful piece of a data is a Unicode codepoint
         * string (something of the form U+0000) found in the keyIdentifier
         * property. So fall back to parsing this string and sending the
         * converted integer to the agent as a unicode value.
         * See bugs 959274 and 959279.
         */
        keyCode = parseInt('0x' + e.keyIdentifier.slice(2), 16);
        if (keyCode) {
          isUnicode = true;
        } else {
          WMKS.LOGGER.log('assert: Unicode identifier=' + e.keyIdentifier
            + ' int conversion failed, keyCode=' + keyCode);
          return null;
        }
      } else if (e.keyCode === 0 && WMKS.BROWSER.isFirefox() && e.key) {
        /*
         * On Firefox, for some special key such as ü ö ä, the keyCode of
         * onKeyUp and keyDown is 0, but there is a value in key property.
         * See bug 1166133.
          */
        keyCode = 0;
      }else {
        /*
         * On browser except firefox in Japanese, for the special key left to 1 key, the keyCode of
         * onKeyUp and keyDown is 0, and there is no value in key property.
          */
        if (this.UnicodeToVScanMap === WMKS.CONST.KB.VScanMap["ja-JP_106/109"] && !WMKS.BROWSER.isFirefox() && e.keyCode === 0) {
          keyCode = 165;
        } else {
          WMKS.LOGGER.trace('assert: could not read keycode from event, '
            + 'keyIdentifier=' + e.keyIdentifier);
          return null;
        }
      }

      if (!isUnicode && this._windowsKeyManager.enabled) {
        keyCode = this._windowsKeyManager.modifyKey(keyCode);
      }

      return {
        keyCode: keyCode,
        isUnicode: isUnicode
      };
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyDown
     *
     *    The first step in our input strategy. Capture a raw key. If it is a
     *    control key, send a keydown command immediately. If it is not, memorize
     *    it and return without doing anything. We pick it up in onKeyPress
     *    instead and bind the raw keycode to the Unicode result. Then, in
     *    onKeyUp, resolve the binding and send the keyup for the Unicode key
     *    when the scancode is received.
     *
     * Results:
     *    true if the key is non-raw (let the event through, to allow keypress
     *    to be dispatched.) false otherwise.
     *
     *---------------------------------------------------------------------------
     */

    this.onKeyDown = function(e) {
      var keyCodeRes,
        keyCode = 0,
        isUnicode = false,
        self = this;

      keyCodeRes = this._extractKeyCodeFromEvent(e);
      if (!keyCodeRes) {
        WMKS.LOGGER.log('Extraction of keyCode from keyUp event failed.');
        return false; // don't send a malformed command.
      }
      keyCode = keyCodeRes.keyCode;
      isUnicode = keyCodeRes.isUnicode;

      //WMKS.LOGGER.log("onKeyDown: keyCode=" + keyCode);

      // Sync modifiers because we don't always get correct events.
      this._syncModifiers(e);

      if (keyCode === 0) {
        WMKS.LOGGER.log("onKeyDown: Do not send 0 to server.");
        return true;
      }

      /*
       * Most control characters are 'dangerous' if forwarded to the underlying
       * input mechanism, so send the keys immediately without waiting for
       * keypress.
       */
      if ($.inArray(keyCode, WMKS.CONST.KB.Modifiers) !== -1) {
        // Handled above via syncModifiers
        e.returnValue = false;
        return false;
      }

      if (WMKS.CONST.KB.ControlKeys.indexOf(keyCode) !== -1) {
        e.returnValue = false;
        return this._handleControlKeys(keyCode);
      }


      /*
       * Send the keydown event right now if we were given a unicode codepoint
       * in the keyIdentifier field of the event.  There won't be a
       * corresponding key press event so we can confidently send it right now.
       */
      if (isUnicode) {
        WMKS.LOGGER.log('Send unicode down from keyIdentifier: ' + keyCode);
        self.sendKey(keyCode, false, true);
        e.returnValue = false;
        return false;
      }

      /*
       * Expect a keypress before control is returned to the main JavaScript.
       * The setTimeout(..., 0) is a failsafe that will activate only if the
       * main JavaScript loop is reached. When the failsafe activates, send
       * the raw key and hope it works.
       */
      if (this.keyDownKeyTimer !== null) {
        WMKS.LOGGER.log('assert: nuking an existing keyDownKeyTimer');
        clearTimeout(this.keyDownKeyTimer);
      }

      this.keyDownKeyTimer = setTimeout(function() {
        // WMKS.LOGGER.log('timeout, sending raw keyCode=' + keyCode);
        self.sendKey(keyCode, false, false);
        self.keyDownKeyTimer = null;
        self.pendingKey = null;
      }, 0);
      this.pendingKey = keyCode;

      // Safari has the keyIdentifier on the keydown calls (chrome is on keypress)
      // Save for reference in onKeyPress
      if (e.originalEvent && e.originalEvent.keyIdentifier) {
        this.keyDownIdentifier = e.originalEvent.keyIdentifier;
      }

      /*
       * If Alt or Ctrl or Win (by themselves) are held, inhibit the keypress by
       * returning false.
       * This prevents the browser from handling the keyboard shortcut
       */
      e.returnValue = !(this.activeModifiers.length === 1 &&
        (this.activeModifiers[0] === WMKS.CONST.KB.KEY_CODE.Alt ||
          this.activeModifiers[0] === WMKS.CONST.KB.KEY_CODE.Ctrl ||
          this.activeModifiers[0] === WMKS.CONST.KB.WindowsKeys.left ||
          this.activeModifiers[0] === WMKS.CONST.KB.WindowsKeys.right));
      return e.returnValue;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * _handleControlKeys
     *
     *    This function takes care of the control keys and handling these.
     *
     *---------------------------------------------------------------------------
     */

    this._handleControlKeys = function(keyCode) {
      // var isCapsOn = this._vncDecoder._keyboardLEDs & 4;
      // WMKS.LOGGER.log('Led: ' + led + ', Caps: ' + isCapsOn);

      /*
       * Caps lock is an unusual key and generates a 'down' when the
       * caps lock light is going from off -> on, and then an 'up'
       * when the caps lock light is going from on -> off. The problem
       * is compounded by a lack of information between the guest & VMX
       * as to the state of caps lock light. So the best we can do right
       * now is to always send a 'down' for the Caps Lock key to try and
       * toggle the caps lock state in the guest.
       */
      if (keyCode === WMKS.CONST.KB.KEY_CODE.CapsLock && WMKS.BROWSER.isMacOS()) {
        this.sendKey(keyCode, false, false);
        this.sendKey(keyCode, true, false);
        return;
      }
      this.sendKey(keyCode, false, false);
      return false;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * _syncModifiers
     *
     *    Parse the altKey, shiftKey, metaKey and ctrlKey attributes of an event
     *     to synthesize event keystrokes. The keydown and keyup events are not
     *    reliably sent by all browsers but these attributes are always set,
     *    so key off of these to send keydown and keyup events for those keys.
     *
     *---------------------------------------------------------------------------
     */

    this._syncModifiers = function(e) {
      var thisMod, thisVal, i, idx;
      // This must be in the order of WMKS.CONST.KB.Modifiers
      var vals = [e.shiftKey, e.ctrlKey, e.altKey, e.metaKey, false];
      // var names = ['shift', 'ctrl', 'alt', 'meta']; // used with logging.

      // Do check for AltGr and set ctrl and alt if set
      if (e.altGraphKey === true) {
        vals[1] = vals[2] = true;
      }

      /*
       * On OSX if the meta key (aka CMD) key is pressed along with one of
       * either A, C, V, or X we map the CMD key to CTRL, allowing
       * the Mac user to use CMD-V for CTRL-V etc.
       */
      if (e.metaKey === true && this.mapMetaToCtrlForKeys.indexOf(e.keyCode) !== -1) {
        vals[1] = true;  // turn on CTRL
        vals[3] = false; // turn off CMD
      }

      /*
       * When Windows key simulation is enabled, pressing Ctrl+Win
       * on Windows or Ctrl+CMD on OSX simulates a Windows key.
       */
      if (this._windowsKeyManager.enabled) {
        this._windowsKeyManager.keyboardHandler(e);

        if (e.ctrlKey === true) {
          // Ctrl key is down.
          if (this._windowsKeyManager.leftWindowsDown  ||
            this.activeModifiers.indexOf(WMKS.CONST.KB.WindowsKeys.left) !== -1) {
            // Left Windows key is down.
            vals[1] = false;  // turn off Ctrl
            vals[3] = true;   // turn on left Windows
            // Ctrl + Windows are pressed.
            this._windowsKeyManager.windowsOn = true;
          } else if (this._windowsKeyManager.rightWindowsDown ||
            this.activeModifiers.indexOf(WMKS.CONST.KB.WindowsKeys.right) !== -1) {
            // Right Windows key is down.
            vals[1] = false;  // turn off Ctrl
            vals[4] = true;   // turn on right Windows
            // Ctrl + Windows are pressed.
            this._windowsKeyManager.windowsOn = true;
          }
        }
      }

      for (i = 0; i < WMKS.CONST.KB.Modifiers.length; i++) {
        thisMod = WMKS.CONST.KB.Modifiers[i];
        thisVal = vals[i];

        idx = this.activeModifiers.indexOf(thisMod);
        if (thisVal && idx === -1) {
          //WMKS.LOGGER.log(names[i] + ' down');
          this.activeModifiers.push(thisMod);
          this.sendKey(thisMod, false, false);
        } else if (!thisVal && idx !== -1) {
          //WMKS.LOGGER.log(names[i] + ' up');
          this.activeModifiers.splice(idx, 1);
          this.sendKey(thisMod, true, false);
        }
      }
    };


    /*
     *---------------------------------------------------------------------------
     *
     * cancelModifiers
     *
     *    Clear all modifiers currently in a 'keydown' state. Used as a cleanup
     *    for onBlur or to clear the modifier state upon close of the
     *    extendedKeypad widget.
     *
     *    applyToSoftKB - When set and is a touch device, perform this action.
     *
     *---------------------------------------------------------------------------
     */

    this.cancelModifiers = function(applyToSoftKB) {
      var i;
      /*
       * On blur events invoke cancelModifiers for desktop browsers. This is not
       * desired in case of softKB (touch devices, as we constantly change focus
       * from canvas to the hidden textbox (inputProxy) - PR 1084858.
       */
      if (WMKS.BROWSER.isTouchDevice() && !applyToSoftKB) {
        return;
      }
      for (i = 0; i < this.activeModifiers.length; i++) {
        this.sendKey(this.activeModifiers[i], true, false);
      }
      this.activeModifiers.length = 0;

      if (this._windowsKeyManager.enabled) {
        // Reset Windows key status.
        this._windowsKeyManager.reset();
      }
    };


    /*
     *---------------------------------------------------------------------------
     *
     * updateModifiers
     *
     *    This function update the state of the modifiers based on the input.
     *    If the modifier key is down, we add it to the modifier list else remove
     *    it from the list and send the appropriate key info to the protocol.
     *
     *    NOTE: Currently used by extendedKeypad widget.
     *
     *---------------------------------------------------------------------------
     */

    this.updateModifiers = function(modKey, isUp) {
      this.sendKey(modKey, isUp, false);
      if (isUp) {
        this.activeModifiers.splice(this.activeModifiers.indexOf(modKey), 1);
      } else {
        this.activeModifiers.push(modKey);
      }
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyPress
     *
     *    Desktop style onKeyPress handler. See onKeyDown for how our keyboard
     *    input mechanism works.
     *
     *---------------------------------------------------------------------------
     */

    this.onKeyPress = function(e) {
      var keyCode,
        isRaw = false,
        shiftMismatch = false,
        noShiftMismatch = false,
        keyCodeMismatch = false,
        isSpecialSymbol = false,
        key = ""; // String version of the key pressed

      /*
       * If on a Mac, and ONLY Alt is held, prefer the raw key code.
       * This is because Alt-* on a US Mac keyboard produces many international
       * characters, which I would prefer to ignore for the sake of letting
       * keyboard shortcuts work naturally.
       */
      if (WMKS.BROWSER.isMacOS() && this.activeModifiers.length === 1 &&
        this.activeModifiers[0] === WMKS.CONST.KB.KEY_CODE.Alt) {
        WMKS.LOGGER.log('Preferring raw keycode with Alt held (Mac)');
        return false;
      } else if (e.charCode && e.charCode >= 0x20) {
        /*
         * Low order characters are control codes, which we need to send raw.
         * 0x20 is SPACE, which is the first printable character in Unicode.
         */
        keyCode = e.charCode;
        isRaw = false;
      } else if (e.keyCode) {
        keyCode = e.keyCode;
        isRaw = true;
      } else {
        WMKS.LOGGER.log('assert: could not read keypress event');
        return false;
      }

      if (this.keyDownKeyTimer !== null) {
        clearTimeout(this.keyDownKeyTimer);
        this.keyDownKeyTimer = null;
      }

      //WMKS.LOGGER.log("onKeyPress: keyCode=" + keyCode);

      if (isRaw && WMKS.CONST.KB.ControlKeys.indexOf(keyCode) !== -1) {
        // keypress for a keydown that was sent as a control key. Ignore.
        return false;
      }

      /*
       * Update the modifier state before we send a character which may conflict
       * with a stale modifier state
       */
      this._syncModifiers(e);

      if (this.pendingKey !== null) {
        if (isRaw) {
          this.keyToRawMap[this.pendingKey] = keyCode;
        } else {
          this.keyToUnicodeMap[this.pendingKey] = keyCode;
        }
      }


      if (this.fixANSIEquivalentKeys && e.originalEvent) {
        if (e.originalEvent.key) {
          key = e.originalEvent.key;
        } else if (!WMKS.BROWSER.isWindows() || !WMKS.BROWSER.isChrome()) {
          if (e.originalEvent.keyIdentifier === "" && this.keyDownIdentifier) {
            // Parse Unicode as hex
            key = String.fromCharCode(parseInt(this.keyDownIdentifier.replace("U+", ""), 16));
          } else if(e.originalEvent.keyIdentifier) {
            // Parse Unicode as hex
            key = String.fromCharCode(parseInt(e.originalEvent.keyIdentifier.replace("U+", ""), 16));
          }
        }
        if (key) {
          keyCodeMismatch = (key.charCodeAt(0) !== keyCode);
          shiftMismatch = (WMKS.CONST.KB.ANSIShiftSymbols.indexOf(key) !== -1 &&
            this.activeModifiers.indexOf(WMKS.CONST.KB.KEY_CODE.Shift) === -1);
          noShiftMismatch = (WMKS.CONST.KB.ANSINoShiftSymbols.indexOf(key) !== -1 &&
            this.activeModifiers.indexOf(WMKS.CONST.KB.KEY_CODE.Shift) !== -1);
          isSpecialSymbol = (WMKS.CONST.KB.ANSISpecialSymbols.indexOf(key) !== -1);
        }
      }
      this.keyDownIdentifier = null;


      if (this.fixANSIEquivalentKeys && key && isSpecialSymbol &&
        (keyCodeMismatch || shiftMismatch || noShiftMismatch)) {
        if (noShiftMismatch) {
          // Should not have shift depressed for this key code, turn it off
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, true, false);
        }
        this.handleSoftKb(key.charCodeAt(0), true);
        if (noShiftMismatch) {
          // Turn shift back on after sending keycode.
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, false, false);
        }
      } else {
        this.sendKey(keyCode, false, !isRaw);
      }

      /*
       * Keycodes 50 and 55 are deadkeys when AltGr is pressed. Pressing them a
       * second time produces two keys (either ~ or `). Send an additional up
       * keystroke so that the second keypress has both a down and up event.
       * PR 969092
       */
      if (((this.pendingKey === 50 && keyCode === 126) ||
        (this.pendingKey === 55 && keyCode === 96)) &&
        !isRaw) {
        WMKS.LOGGER.debug("Sending extra up for Unicode " + keyCode
          + " so one isn't missed.");
        this.sendKey(keyCode, true, !isRaw);
      }

      this.pendingKey = null;
      return false;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyUp
     *
     *    Called to handle the keyboard "key up" event and send the appropriate
     *    key stroke to the server.
     *
     *---------------------------------------------------------------------------
     */

    this.onKeyUp = function(e) {
      var keyCode, keyCodeRes, unicode, raw, isUnicode = false;

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      this.keyDownIdentifier = null;

      keyCodeRes = this._extractKeyCodeFromEvent(e);
      if (!keyCodeRes) {
        WMKS.LOGGER.debug('Extraction of keyCode from keyUp event failed.');
        return false; // don't send a malformed command.
      }
      keyCode = keyCodeRes.keyCode;
      isUnicode = keyCodeRes.isUnicode;

      //WMKS.LOGGER.log("onKeyUp: keyCode=" + keyCode);

      /*
       * Sync modifiers for we don't always get correct event.
       */
      this._syncModifiers(e);

      if (keyCode === 0) {
        WMKS.LOGGER.log("onKeyUp: Do not send 0 to server.");
        return true;
      }

      if ($.inArray(keyCode, WMKS.CONST.KB.Modifiers) !== -1) {
        // Handled above via syncModifiers
        return false;
      }

      /*
       * Only process keyup operations at once for certain keys.
       * Inhibit default because these will never result in a keypress event.
       */
      if (isUnicode) {
        WMKS.LOGGER.log('Sending unicode key up from keyIdentifier: ' + keyCode);
        this.sendKey(keyCode, true, true);
      } else if (this.keyToUnicodeMap.hasOwnProperty(keyCode)) {
        unicode = this.keyToUnicodeMap[keyCode];
        this.sendKey(unicode, true, true);
        // the user may change keymaps next time, don't persist this mapping
        delete this.keyToUnicodeMap[keyCode];
      } else if (this.keyToRawMap.hasOwnProperty(keyCode)) {
        raw = this.keyToRawMap[keyCode];
        this.sendKey(raw, true, false);
        delete this.keyToRawMap[keyCode];
      } else {
        this.sendKey(keyCode, true, false);
      }

      return false;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyUpSoftKb
     *
     *    Event handler for soft keyboards. We do not have much going on here.
     *
     *---------------------------------------------------------------------------
     */

    this.onKeyUpSoftKb = function(e) {
      // for all browsers on soft keyboard.
      e.stopPropagation();
      e.preventDefault();
      return false;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyDownSoftKb
     *
     *    Special IOS onkeydown handler which only pays attention to certain keys
     *    and sends them directly. Returns false to prevent the default action,
     *    true otherwise.
     *
     *---------------------------------------------------------------------------
     */
    this.onKeyDownSoftKb = function(e) {
      var keyCode = e.keyCode || e.which;

      if (keyCode && WMKS.CONST.KB.SoftKBRawKeyCodes.indexOf(keyCode) !== -1) {
        // Non-Unicode but apply modifiers.
        this.handleSoftKb(keyCode, false);
        return false;
      }

      /*
       * Return value is true due to the following:
       * 1. For single-use-caps / Caps-Lock to work, we need to return true
       *    for all keys.
       * 2. Certain unicode characters are visible with keypress event
       *    alone. (keyCode value is 0)
       */
      return true;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onKeyPressSoftKb
     *
     *    Returns latin1 & Unicode keycodes.
     *    Works for all basic input that you can do with a soft keyboard.
     *
     *    NOTE: Chrome on Android behaves differently. Hence we rely on
     *    onInputTextSoftKb() to handle the input event.
     *
     *---------------------------------------------------------------------------
     */

    this.onKeyPressSoftKb = function(e) {
      var keyCode = e.keyCode || e.which;
      if (WMKS.BROWSER.isAndroid() && WMKS.BROWSER.isChrome()) {
        // Android on Chrome, special case, ignore it.
        return true;
      }
      // Reset the text field first.
      $(e.target).val(WMKS.CONST.KB.keyInputDefaultValue);

      // Send both keydown and key up events.
      this.handleSoftKb(keyCode, true);

      /* If we use preventDefault() or return false, the single-use-caps does
       * not toggle back to its original state. Hence rely on the fact that
       * text-2-speech contains more than 1 character input */
      return true;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * onInputTextSoftKb
     *
     *    Event handler for input event on the input-proxy. This intercepts
     *    microphone text input as well as keyPress events. We have to make sure
     *    only the microphone inputs are processed.
     *
     *    The following logic is used to differentiate.
     *    1. If input value is the same as defaultValue, no input, ignore it.
     *    2. If input value has only a single char, then its mostly preceded by
     *       onKeyPressSoftKb(), so ignore it.
     *    3. There is more than 1 character, must be from speech-2-text. Process
     *       this one further.
     *
     * NOTE: Android chrome does not emit useful keyCodes, hence we use the value
     *       that's entered into the textbox and decode it to send as a message.
     *       http://code.google.com/p/chromium/issues/detail?id=118639
     *
     *---------------------------------------------------------------------------
     */

    this.onInputTextSoftKb = function(e) {
      // We have received speech-to-text input or something.
      var input = $(e.target),
        val = input.val(),
        defaultInputSize = WMKS.CONST.KB.keyInputDefaultValue.length;

      /*
       * Ignore input event due to bug 1080567. Keypress triggers
       * both keypress event as well as input event. It sends
       * duplicate texts to the remote desktop.
       */
      if (WMKS.BROWSER.isIOS()) {
        // In any case, clean-up this data, so we do not repeat it.
        input.val(WMKS.CONST.KB.keyInputDefaultValue);
        return false;
      }

      // Remove the default value from the input string.
      if (defaultInputSize > 0) {
        val = val.substring(defaultInputSize);
      }
      // WMKS.LOGGER.debug('input val: ' + val);

      /*
       * 1. We have to verify if speech-to-text exists, we allow that.
       * 2. In case of Android, keyPress does not provide valid data, hence
       *    all input is handled here.
       * 3. For all other cases, do not process, its handled in onKeyPress.
       */
      if (val.length > 1) {
        /*
         * There are 2+ chars, hence speech-to-text or special symbols on
         * android keyboard, let it in as is. If its speech-to-text, first
         * char is generally uppercase, hence flip that.
         */
        val = val.charAt(0).toLowerCase() + val.slice(1);
        this.processInputString(val);
      } else if (WMKS.BROWSER.isAndroid() && WMKS.BROWSER.isChrome()) {
        // We could get uppercase and lower-case values, use them as is.
        this.processInputString(val);
      }

      // In any case, clean-up this data, so we do not repeat it.
      input.val(WMKS.CONST.KB.keyInputDefaultValue);
      return true;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * processInputString
     *
     *    This function accepts a string of input characters and processes them.
     *    It decodes each character to its keyCode, and then sends each one of
     *    that in the order it was passed.
     *
     *    Returns the last key that was decoded from the input value.
     *
     *---------------------------------------------------------------------------
     */

    this.processInputString = function(str, processNewline) {
      var i, key;
      for (i = 0; i < str.length; i++) {
        if (processNewline && str.charAt(i) === '\n') {
          // Found a newline, handle this differently by sending the enter key.
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Enter, false, false);
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Enter, true, false);
          continue;
        }
        key = str.charCodeAt(i);
        if (!isNaN(key)) {
          // Send each key in if its a valid keycode.
          this.handleSoftKb(key, true);
        }
      }
      // Return the last keyCode from this input. When a single character is
      // passed, the last is essentially the keycode for that input character.
      return key;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * handleSoftKb
     *
     *    Process keyCode inputs from Soft keyboards. In case of unicode input
     *    we need to to check if the key provided needs to send an additional
     *    shift as well. VScanCodes assume Shift is sent.
     *
     *    Ex: keyCode 65, 97 are both mapped to 0x1e and hence for soft
     *        keyboards, we need to compute the extra shift key.
     *
     *    activeModifiers are used differently by Soft Keyboard compared to the
     *    desktop browser keyboards. The state of the activeModifiers are not
     *    managed by sending the keystrokes, but are explicitly turned on / off
     *    from the touch inputs.
     *
     *    The needsShift is specifically used for sending VScanCodes. This one
     *    sends an extra Shift key. However, if the activeModifier is already
     *    has the shiftKey down, we need to flip it, to revert this. Hence the
     *    needShift and activeModifiers shift work hand in hand.
     *
     *---------------------------------------------------------------------------
     */

    this.handleSoftKb = function(key, isUnicode) {
      var implicitShift, shiftSentAlready;

      /*
       * In case of unicode, determine if the shift key is implicit.
       * Ex: keyCode 97(char 'A') = 65(char 'a') + Shift (implicit)
       * We need this for sending VScanCode, as VScanCodes do not handle unicode
       * and we have to wrap the input key with a shift.
       */
      implicitShift = (isUnicode && WMKS.CONST.KB.UnicodeWithShift[key]);

      if (implicitShift) {
        // Determine if shift was already sent via extendedKeypad.
        shiftSentAlready =
          ($.inArray(WMKS.CONST.KB.KEY_CODE.Shift, this.activeModifiers) !== -1);

        if (!shiftSentAlready && !this._isUnicodeInputSupported()) {
          // Send shift down before sending the keys.
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, false, false);
        }
        // Send the key-down and up.
        this.sendKey(key, false, isUnicode);
        this.sendKey(key, true, isUnicode);

        // Determine if we need to send a shift down / up.
        if (!shiftSentAlready && !this._isUnicodeInputSupported()) {
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, true, false);
        } else if (shiftSentAlready && this._isUnicodeInputSupported()) {
          // WMKS.LOGGER.debug('Send extra shift down to keep the modifier state');
          this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, false, false);
        }
      } else {
        // Send the key-down and up.
        this.sendKey(key, false, isUnicode);
        this.sendKey(key, true, isUnicode);
      }
    };


    /**
     *---------------------------------------------------------------------------
     *
     * isBrowserCapsLockOn
     *
     * Utility function used to detect if CAPs lock is on. Based on the
     * Javascript inputs we attempt to detect if the browser CapsLock is on.
     * We can only detect this on desktop browsers that sends shift key
     * separately. We can for sure say if its CapsLock enabled. But we cannot
     * say if the capsLock is not enabled, as non-unicode does not pass that
     * info.
     *
     *---------------------------------------------------------------------------
     */

    this.isBrowserCapsLockOn = function(keyCode, isUnicode, shiftKeyDown) {
      return !WMKS.BROWSER.isTouchDevice()
        && isUnicode
        && ((WMKS.CONST.KB.UnicodeOnly[keyCode] && shiftKeyDown)
          || (WMKS.CONST.KB.UnicodeWithShift[keyCode] && !shiftKeyDown));
    };


    /*
     *---------------------------------------------------------------------------
     *
     * sendKey
     *
     *    Single point of action for sending keystrokes to the protocol.
     *    Needs to know whether it's a down or up operation, and whether
     *    keyCode is a Unicode character index (keypress) or a raw one (keydown).
     *
     *    Depending on what type key message is sent, the appropriate lookups are
     *    made and sent.
     *
     *    This function is also the final frontier for limiting processing of
     *    key inputs.
     *
     *---------------------------------------------------------------------------
     */

    this.sendKey = function(key, isUp, isUnicode) {
      // Check if VMW key event can be used to send key inputs.
      if (!this._vncDecoder.useVMWKeyEvent) {
        return;
      }

      // Final frontier for banning keystrokes.
      if (!isUnicode && this.ignoredRawKeyCodes.indexOf(key) !== -1) {
        return;
      }

      // WMKS.LOGGER.log((isUnicode? '+U' : '') + key + (isUp? '-up' : '-d'));
      if (this._vncDecoder.allowVMWKeyEvent2UnicodeAndRaw) {
        // Blast uses the unicode mode where we send unicode / raw keyCode.
        this._vncDecoder.onVMWKeyUnicode(key, !isUp, !isUnicode);
      } else {
        // Send VMware VScanCodes.
        this._sendVScanCode(key, isUp, isUnicode);
      }
    };

    /**
     *---------------------------------------------------------------------------
     *
     * _sendVScanCode
     *
     *    This function handles the complexity of sending VScanCodes to the
     *    server. This function looks up 2 different tables to convert unicode
     *    to VScanCodes.
     *       1. Unicode to VScanCode
     *       2. Raw JS KeyCodes to VScanCodes.
     *
     *    TODO: Cleanup keyboardMapper and keyboardUtils once key repeats
     *          and CAPs lock are handled as expected.
     *
     *---------------------------------------------------------------------------
     */

    this._sendVScanCode = function(key, isUp, isUnicode) {
      var vScanCode = null;
      if (isUnicode || key === 13) {
        vScanCode = this.UnicodeToVScanMap[key];
      }
      if (!vScanCode) {
        // Since vScanCode is not valid, reset the flag.
        vScanCode = WMKS.keyboardUtils._jsToVScanTable[key];
        /**
         * Support Ctrl+C/V in WSX and vSphere NGC.
         * Both in WSX and vSphere NGC, send vScanCode to the server.
         * However, _jsToVScanTable lacks mapping for the characters
         * a-z, hence, when pressing Ctrl+C, c is not mapped and sent.
         * In this scenario, map c using the UnicodeToVScanMap and
         * send the code to the server.
         */
        if (!vScanCode) {
          // Mapping to VScanCode using the unicode mapping table.
          vScanCode = this.UnicodeToVScanMap[key];
        }
      }
      if (!!vScanCode) {
        // WMKS.LOGGER.debug('key: ' + key + ' onKeyVScan: ' + vScanCode
        //   + (isUp? '-up' : '-d'));
        // performMapping keyCode to VMware VScanCode and send it.
        this._vncDecoder.onKeyVScan(vScanCode, !isUp);
      } else {
        WMKS.LOGGER.debug('unknown key: ' + key + (isUp? '-up' : '-d'));
      }
    };


    /*
     *---------------------------------------------------------------------------
     *
     * clearState
     *
     *    Single point of action for sending keystrokes to the protocol. Nice for
     *    debugging. Needs to know whether it's a down or up operation, and
     *    whether the keyCode is a unicode character index (keypress) or a
     *    raw one (keydown).
     *
     *---------------------------------------------------------------------------
     */

    this.clearState = function() {
      // Clear any keyboard specific state that's held.

      // Clear modifiers.
      this.activeModifiers.length = 0;

      // clear all modifier keys on start
      this.sendKey(WMKS.CONST.KB.KEY_CODE.Alt, true, false);
      this.sendKey(WMKS.CONST.KB.KEY_CODE.Ctrl, true, false);
      this.sendKey(WMKS.CONST.KB.KEY_CODE.Shift, true, false);
      // Send meta only if its Mac OS.
      if (WMKS.BROWSER.isMacOS()) {
        this.sendKey(WMKS.CONST.KB.KEY_CODE.Meta, true, false);
      }
    };


    /*
     *---------------------------------------------------------------------------
     *
     * enableWindowsKey
     *
     *    Enable/disable the simulation of Windows key.
     *    Press Ctrl+Win on Windows or Ctrl+CMD on Mac to simulate Windows key.
     *
     *---------------------------------------------------------------------------
     */

    this.enableWindowsKey = function(value) {
      this._windowsKeyManager.enabled = value;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * setIgnoredRawKeyCodes
     *
     *    Set ignore raw keyCodes set.
     *
     *---------------------------------------------------------------------------
     */

    this.setIgnoredRawKeyCodes = function(value) {
      this.ignoredRawKeyCodes = value;
    };


    /*
     *---------------------------------------------------------------------------
     *
     * _isUnicodeInputSupported
     *
     *    This is a wrapper function that determines if the unicode input is
     *    handled by the server.
     *
     *    NOTE: true for Blast, false for WSX, NGC, etc.
     *
     *---------------------------------------------------------------------------
     */

    this._isUnicodeInputSupported = function() {
      return this._vncDecoder.allowVMWKeyEvent2UnicodeAndRaw;
    };
  };

  /**
   * WMKS.CONST.KB.UnicodeOnly
   * WMKS.CONST.KB.UnicodeWithShift
   * WMKS.CONST.KB.UnicodeToVScanMap
   *
   * The following are 2 sets of mapping that contain a key-value pair of unicode
   * to VScanCode map. Its split the mapping into two maps to enable detection
   * of whether the unicode is just a VScanCode or a combo of VScanCode with the
   * shift key down. This distinction is necessary in case of soft keyboards.
   *
   * These 2 maps are then merged into 1 final map UnicodeToVScanMap, that will
   * be used in the lookup code to send vScanCodes.
   */
  WMKS.CONST.KB.UnicodeOnly = {

    // Space, enter, backspace
    32 : 0x39,
    13 : 0x1c,
    //8 : 0x0e,

    // Keys a-z
    97  : 0x1e,
    98  : 0x30,
    99  : 0x2e,
    100 : 0x20,
    101 : 0x12,
    102 : 0x21,
    103 : 0x22,
    104 : 0x23,
    105 : 0x17,
    106 : 0x24,
    107 : 0x25,
    108 : 0x26,
    109 : 0x32,
    110 : 0x31,
    111 : 0x18,
    112 : 0x19,
    113 : 0x10,
    114 : 0x13,
    115 : 0x1f,
    116 : 0x14,
    117 : 0x16,
    118 : 0x2f,
    119 : 0x11,
    120 : 0x2d,
    121 : 0x15,
    122 : 0x2c,

    // keyboard number keys (across the top) 1,2,3... -> 0
    49 : 0x02,
    50 : 0x03,
    51 : 0x04,
    52 : 0x05,
    53 : 0x06,
    54 : 0x07,
    55 : 0x08,
    56 : 0x09,
    57 : 0x0a,
    48 : 0x0b,

    // Symbol keys ; = , - . / ` [ \ ] '
    59 : 0x27, // ;
    61 : 0x0d, // =
    44 : 0x33, // ,
    45 : 0x0c, // -
    46 : 0x34, // .
    47 : 0x35, // /
    96 : 0x29, // `
    91 : 0x1a, // [
    92 : 0x2b, // \
    93 : 0x1b, // ]
    39 : 0x28  // '

  };

  WMKS.CONST.KB.UnicodeWithShift = {
    // Keys A-Z
    65 : 0x001e,
    66 : 0x0030,
    67 : 0x002e,
    68 : 0x0020,
    69 : 0x0012,
    70 : 0x0021,
    71 : 0x0022,
    72 : 0x0023,
    73 : 0x0017,
    74 : 0x0024,
    75 : 0x0025,
    76 : 0x0026,
    77 : 0x0032,
    78 : 0x0031,
    79 : 0x0018,
    80 : 0x0019,
    81 : 0x0010,
    82 : 0x0013,
    83 : 0x001f,
    84 : 0x0014,
    85 : 0x0016,
    86 : 0x002f,
    87 : 0x0011,
    88 : 0x002d,
    89 : 0x0015,
    90 : 0x002c,

    // Represents number 1, 2, ... 0 with Shift.
    33 : 0x0002, // !
    64 : 0x0003, // @
    35 : 0x0004, // #
    36 : 0x0005, // $
    37 : 0x0006, // %
    94 : 0x0007, // ^
    38 : 0x0008, // &
    42 : 0x0009, // *
    40 : 0x000a, // (
    41 : 0x000b, // )

    // Symbol keys with shift ----->  ; = , - . / ` [ \ ] '
    58  : 0x0027, // :
    43  : 0x000d, // +
    60  : 0x0033, // <
    95  : 0x000c, // _
    62  : 0x0034, // >
    63  : 0x0035, // ?
    126 : 0x0029, // ~
    123 : 0x001a, // {
    124 : 0x002b, // |
    125 : 0x001b, // }
    34  : 0x0028  // "
  };

  WMKS.CONST.KB.VScanMap["en-US"] = $.extend({}, WMKS.CONST.KB.UnicodeOnly, WMKS.CONST.KB.UnicodeWithShift);

  /**
   *  WebMKS keyboard event decoder and key remapper.
   */
  WMKS.keyboardUtils = {};

  // TODO
  WMKS.keyboardUtils._keyInfoTemplate = {
    jsScanCode: 0,
    vScanCode: 0
  };
  WMKS.keyboardUtils.keyDownUpInfo = function (a) {
    var b = a || window.event,
      c = this._keyInfoTemplate;
    if (b.type === "keydown" || b.type === "keyup") c.jsScanCode = b.keyCode, c.vScanCode = this._jsToVScanTable[c.jsScanCode], WMKS.BROWSER.isIE() && WMKS.BROWSER.version.major <= 10 && c.jsScanCode == 13 && (c.vScanCode = 28);
    return c
  };
  WMKS.keyboardUtils.keyPressInfo = function (a) {
    var b = a || window.event,
      c = 0;
    if (b.type === "keypress") {
      c = b.which;
      if (c == 8 || c == 9 || c == 27) c = 0
    }
    return c
  };
  WMKS.keyboardUtils._jsToVScanTable = {
    9: 15,
    27: 1,
    8: 14,
    16: 42,
    17: 29,
    18: 56,
    20: 58,
    240: 58,
    144: 69,
    37: 331,
    38: 328,
    39: 333,
    40: 336,
    45: 338,
    46: 339,
    36: 327,
    35: 335,
    33: 329,
    34: 337,
    112: 59,
    113: 60,
    114: 61,
    115: 62,
    116: 63,
    117: 64,
    118: 65,
    119: 66,
    120: 67,
    121: 68,
    122: 87,
    123: 88,
    224: 56,
    91: 347,
    92: 348,
    93: 0,
    42: 84,
    19: 256
  };
  WMKS.keyboardUtils._jsToVScanTables = {
    "de-DE": {
      220: 41,
      221: 13,
      192: 41,
      187: 13,
      96: 13
    },
    "es-ES": {
      94: 26,
      96: 26,
      180: 40,
      168: 40,
      192: 26,
      219: 26,
      222: 40,
      186: 26,
      242: 26
    },
    "it-IT": {
      5: 18,
      30: 26,
      29: 27,
      64: 39,
      35: 40,
      91: 26,
      93: 27,
      171: 27,
      109: 39,
      186: 39,
      123: 26,
      125: 27,
      8364: 18
    }
  };
  WMKS.keyboardUtils._charToKeycode = {
    "de-DE": {
      "ü": 252,
      "Ü": 252,
      "ö": 246,
      "Ö": 246,
      "ä": 228,
      "Ä": 228
    },
    "es-ES": {
      "[": 192,
      "]": 43,
      "{": 222,
      "}": 231,
      0: 186,
      '"': 1034,
      "º": 186,
      "ª": 186,
      "ç": 231,
      "Ç": 231,
      "Ñ": 209,
      "ñ": 209,
      "¡": 261,
      "¿": 161
    },
    "it-IT": {
      "[": 30,
      "{": 30,
      "]": 29,
      "}": 29,
      "@": 1109,
      "%": 1037,
      "à": 1224,
      "°": 1224,
      "è": 232,
      "é": 232,
      "ì": 94,
      "^": 94,
      "ò": 242,
      "ç": 242,
      "ù": 249,
      "§": 249
    },
    "pt-BR": {
      "ç": 231,
      "Ç": 231
    },
    "pt-PT": {
      "ç": 231,
      "Ç": 231,
      "º": 186,
      "ª": 186,
      "°": 43,
      "«": 187,
      "»": 187,
      "À": 333
    },
    "fr-FR": {
      "²": 178
    },
    "fr-CH": {
      "§": 167,
      "°": 176,
      "è": 232,
      "ü": 252,
      "é": 233,
      "ö": 246,
      "à": 1224,
      "ä": 228,
      "[": 232,
      "{": 224,
      '"': 1224
    },
    "de-CH": {
      "§": 167,
      "°": 176,
      "è": 232,
      "ü": 252,
      "é": 233,
      "ö": 246,
      "à": 1224,
      "ä": 228,
      "[": 232,
      "{": 224,
      '"': 1224,
      "Ä": 228,
      "Ö": 246,
      "Ü": 252,
      "À": 1224,
      "È": 232,
      "É": 233
    }
  };
  WMKS.keyboardUtils._remapUncontrolKeys = {
    "de-DE": {
      17: 81,
      13: 77
    },
    "es-ES": {
      27: 219
    },
    "it-IT": {
      13: 186
    },
    "pt-PT": {
      27: 168
    },
    "fr-FR": {
      27: 93
    },
    "fr-CH": {
      27: 232
    },
    "de-CH": {
      27: 232
    }
  };
  WMKS.keyboardUtils._keypressUnusefulKeys = {
    "de-DE": [180, 94, 96],
    "es-ES": [180, 96]
  };
  WMKS.keyboardUtils._SmallKeyboardKey = {
    "de-DE": [47, 42, 61],
    "it-IT": [47, 42, 61],
    "es-ES": [47, 42, 61],
    "ja-JP_106/109": [42, 43],
    "en-US": [42, 43],
    "pt-BR": [42],
    "pt-PT": [42, 47],
    "fr-FR": [43, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
    "fr-CH": [42, 43, 47],
    "de-CH": [42, 43, 47]
  };
  WMKS.keyboardUtils._smallKeyboardPendingKey = {
    "de-DE": {
      47: 55,
      61: 48
    },
    "fr-FR": {
      43: [187, 61],
      46: [190, 59],
      47: [191, 58],
      48: 48,
      49: 49,
      50: 50,
      51: 51,
      52: 52,
      53: 53,
      54: 54,
      55: 55,
      56: 56,
      57: 57
    }
  };
  WMKS.keyboardUtils._WindowsFirefoxAltGr = {
    "pt-PT": [64, 91, 93, 123, 125, 163, 167, 168, 178, 8364],
    "de-DE": [64, 91, 92, 93, 123, 124, 125, 126, 172, 178, 179, 181, 8364],
    "it-IT": [35, 64, 91, 93, 123, 125, 8364],
    "es-ES": [35, 64, 91, 92, 93, 123, 124, 125, 126, 172, 178, 179, 181, 8364],
    "fr-FR": [35, 64, 91, 92, 93, 94, 96, 123, 124, 125, 126, 164, 8364],
    "fr-CH": [35, 64, 91, 92, 93, 123, 124, 125, 126, 162, 166, 172, 167, 176, 219, 8364],
    "de-CH": [35, 64, 91, 92, 93, 123, 124, 125, 126, 162, 166, 172, 167, 176, 8364]
  };
  WMKS.keyboardUtils._remapPending = {
    "fr-CH": {
      224: 65,
      232: 69,
      233: 69,
      228: 65,
      246: 79,
      252: 85,
      192: 65,
      219: 85,
      241: 78,
      209: 78,
      176: 52,
      167: 53
    },
    "fr-FR": {
      224: 65,
      232: 69,
      236: 73,
      242: 79,
      249: 85,
      241: 78
    },
    "de-CH": {
      224: 65,
      232: 69,
      233: 69,
      228: 65,
      246: 79,
      252: 85,
      241: 78,
      209: 78,
      176: 52,
      167: 53,
      196: 65,
      214: 79,
      220: 85,
      200: 69,
      192: 65,
      201: 69,
      219: 85
    },
    "de-DE": {
      193: 65,
      201: 69,
      205: 73,
      211: 79,
      218: 85,
      194: 65,
      202: 69,
      206: 73,
      212: 79,
      219: 85
    },
    "ja-JP_106/109": {
      92: 226
    },
    "es-ES": {
      193: 65,
      201: 69,
      205: 73,
      211: 79,
      218: 85,
      192: 65,
      200: 69,
      204: 73,
      210: 79,
      217: 85,
      241: 78
    }
  };
  WMKS.keyboardUtils._remapFrChAltgrKey = {
    91: 180,
    93: 94,
    59: 91,
    94: 93,
    92: 123,
    0: 125
  };
  WMKS.keyboardMapper = function (a) {
    return a.vncDecoder ? (this._vncDecoder = a.vncDecoder, this._keysDownVScan = [], this._keysDownUnicode = [], this.VSCAN_CAPS_LOCK_KEY = 58, this.VSCAN_CMD_KEY = 347, this._typematicKeyVScan = 0, this._typematicDelayTimer = null, this) : null
  };
  WMKS.keyboardMapper.prototype.doKeyVScan = function (a, b) {
    if (!this._vncDecoder.useVMWKeyEvent) return;
    if (a === this.VSCAN_CAPS_LOCK_KEY && navigator.platform.indexOf("Mac") !== -1) {
      this._vncDecoder.onKeyVScan(a, 1), this._vncDecoder.onKeyVScan(a, 0);
      return
    }
    if (b) this._keysDownVScan.indexOf(a) <= -1 && this._keysDownVScan.push(a), this.beginTypematic(a);
    else {
      this.cancelTypematic(a);
      var c = this._keysDownVScan.indexOf(a);
      c >= 0 && this._keysDownVScan.splice(c, 1)
    }
    this._vncDecoder.onKeyVScan(a, b)
  };
  WMKS.keyboardMapper.prototype.doKeyUnicode = function (a, b) {
    if (!this._vncDecoder.useVMWKeyEvent) return;
    if (b) this._keysDownUnicode.push(a);
    else {
      var c = this._keysDownUnicode.indexOf(a);
      c >= 0 && this._keysDownUnicode.splice(c, 1)
    }
    var d = this._tableUnicodeToVScan[a];
    d && (b ? this.beginTypematic(d & 511) : this.cancelTypematic(d & 511), this._vncDecoder.onKeyVScan(d & 511, b))
  };
  WMKS.keyboardMapper.prototype.doReleaseAll = function () {
    var a;
    for (a = 0; a < this._keysDownUnicode.length; a++) this.doKeyUnicode(this._keysDownUnicode[a], 0);
    this._keysDownUnicode.length > 0 && console.log("Warning: Could not release all Unicode keys.");
    for (a = 0; a < this._keysDownVScan.length; a++) this.cancelTypematic(this._keysDownVScan[a]), this._vncDecoder.onKeyVScan(this._keysDownVScan[a], 0);
    this._keysDownVScan = []
  };
  WMKS.keyboardMapper.prototype.beginTypematic = function (a) {
    if (this._keysDownVScan.indexOf(this.VSCAN_CMD_KEY) >= 0) return;
    this.cancelTypematicDelay(), this.cancelTypematicPeriod(), this._vncDecoder.typematicState === 1 && this.startTypematicDelay(a)
  };
  WMKS.keyboardMapper.prototype.cancelTypematic = function (a) {
    this._typematicKeyVScan === a && (this.cancelTypematicDelay(), this.cancelTypematicPeriod())
  };
  WMKS.keyboardMapper.prototype.cancelTypematicDelay = function () {
    this._typematicDelayTimer !== null && clearTimeout(this._typematicDelayTimer), this._typematicDelayTimer = null
  };
  WMKS.keyboardMapper.prototype.cancelTypematicPeriod = function () {
    this._typematicPeriodTimer !== null && clearInterval(this._typematicPeriodTimer), this._typematicPeriodTimer = null
  };
  WMKS.keyboardMapper.prototype.startTypematicDelay = function (a) {
    var b = this;
    this._typematicKeyVScan = a, this._typematicDelayTimer = setTimeout(function () {
      b._typematicPeriodTimer = setInterval(function () {
        b._vncDecoder.onKeyVScan(b._typematicKeyVScan, 1)
      }, b._vncDecoder.typematicPeriod / 1e3)
    }, this._vncDecoder.typematicDelay / 1e3)
  };
  WMKS.keyboardMapper.prototype._tableUnicodeToVScan = {
    32: 57,
    13: 28,
    97: 30,
    98: 48,
    99: 46,
    100: 32,
    101: 18,
    102: 33,
    103: 34,
    104: 35,
    105: 23,
    106: 36,
    107: 37,
    108: 38,
    109: 50,
    110: 49,
    111: 24,
    112: 25,
    113: 16,
    114: 19,
    115: 31,
    116: 20,
    117: 22,
    118: 47,
    119: 17,
    120: 45,
    121: 21,
    122: 44,
    49: 2,
    50: 3,
    51: 4,
    52: 5,
    53: 6,
    54: 7,
    55: 8,
    56: 9,
    57: 10,
    48: 11,
    59: 39,
    61: 13,
    44: 51,
    45: 12,
    46: 52,
    47: 53,
    96: 41,
    91: 26,
    92: 43,
    93: 27,
    39: 40,
    65: 30,
    66: 48,
    67: 46,
    68: 32,
    69: 18,
    70: 33,
    71: 34,
    72: 35,
    73: 23,
    74: 36,
    75: 37,
    76: 38,
    77: 50,
    78: 49,
    79: 24,
    80: 25,
    81: 16,
    82: 19,
    83: 31,
    84: 20,
    85: 22,
    86: 47,
    87: 17,
    88: 45,
    89: 21,
    90: 44,
    33: 2,
    64: 3,
    35: 4,
    36: 5,
    37: 6,
    94: 7,
    38: 8,
    42: 9,
    40: 10,
    41: 11,
    58: 39,
    43: 13,
    60: 51,
    95: 12,
    62: 52,
    63: 53,
    126: 41,
    123: 26,
    124: 43,
    125: 27,
    34: 40
  };

  /**
   * This class abstracts touch input management and decouples this
   * functionality from the widgetProto.
   *
   * All variables are defined as private variables. Functions that do not
   * need to be exposed should be private too.
   */

  /**
   * Enums and constants for touchHandlers. These comprise of constants for
   * various gestures and types of gestures, etc.
   */
  WMKS.CONST.TOUCH = {
    FEATURE: {                             // List of optional touch features.
      SoftKeyboard:     0,
      ExtendedKeypad:   1,
      Trackpad:         2
    },
    // Tolerances for touch control
    tapMoveCorrectionDistancePx: 10,
    additionalTouchIgnoreGapMs: 1200,
    touchMoveSampleMinCount:   2,
    minKeyboardToggleTime:     50,         // Minimum time between keyboard toggles.
    leftDragDelayMs:           300,
    OP: {                                  // Touch event/gesture types.
      none:                   'none',
      scroll:                 'scroll',
      drag:                   'drag',
      move:                   'move',
      tap_twice:              'double-click',
      tap_1finger:            'click',
      tap_3finger:            'tap-3f'
    },
    SCROLL: {
      minDeltaDistancePx:     20          // Min distance to scroll before sending a scroll message.
    },
    DOUBLE_TAP: {                          // Constants for tolerance between double taps.
      tapGapInTime:           250,        // Allowed ms delay b/w the 2 taps.
      tapGapBonusTime:        200,        // Allowed extra ms delay based on tapGapBonus4TimeRatio value wrt tap proximity.
      tapGapBonus4TimeRatio:  0.4,        // Allowed ratio of tap proximity b/w taps vs tapGapInTime to activate tapGapBonusTime.
      tapGapInDistance:       40          // Allowed px distance b/w the 2 taps.
    }
  };

  WMKS.TouchHandler = function(options) {
    'use strict';
    if (!options || !options.canvas ||
      !options.widgetProto || !options.keyboardManager) {
      WMKS.LOGGER.warn('Invalid params set for TouchHandler.');
      return null;
    }

    var _widget = options.widgetProto,
      _keyboardManager = options.keyboardManager,
      _KEYBOARD = {
        visible: false,             // Internal flag to identify keyboard state.
        lastToggleTime: 0           // Last keyboard toggle timestamp used to detect spurious requests.
      },
      _repositionElements = [],     // Elements needing reposition upon rotation.
      _canvas = options.canvas,     // Canvas where all the action happens.
      _onToggle = options.onToggle; // Toggle callback function.

    // Timers
    let _dragTimer = null;
    let _TAP_STATE = {               // Touch state machine.
        currentTouchFingers: -1,   // Indicates number of touch fingers
        firstTouch: null,
        currentTouch: null,
        touchArray: [],
        tapStartTime: null,        // Used to detect double tap
        touchMoveCount: 0,
        skipScrollCount: 0,
        scrollCount: 0,
        zoomCount: 0,
        opType: WMKS.CONST.TOUCH.OP.none
      };

    // List of jQuery objects that are used frequently.
    let _ELEMENTS = {
      inputProxy        : null,
      cursorIcon        : null,
      clickFeedback     : null,
      dragFeedback      : null,
      pulseFeedback     : null,
      scrollFeedback    : null,
      keypad            : null,
      trackpad          : null
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _verifyQuickTouches
     *
     *    We noticed that the touch events get fired extremely quickly when there
     *    is touchstart, touchstart, touchmove, and the browser itself does not
     *    detect the second touchstart before the touchmove, instead it shows 1
     *    touchstartand the first touchmove indicates 1 finger with a move of
     *    over 50px. We decode the touchmoved location to the second touchstart
     *    location.
     *
     *    Ex: Following log indicates this scenario:
     *    3:41:54.566Z [Debug] touchstart#: 1 (e.targetTouches.length)
     *    3:41:54.568Z [Debug] touchstart#: 1 (e.targetTouches.length)
     *    3:41:54.584Z [Debug] single tap drag dist: 147.8715658942, scale: 0.90927...
     *    3:41:54.586Z [Info ] touchmove count: 1 touch#: 1 (e.targetTouches.length)
     *    3:41:54.600Z [Debug] onGestureEnd: 0.9092.. <-- gestureEnd happens only
     *                         if there were 2 touchstarts in the first place.
     *
     *---------------------------------------------------------------------------
     */

    this._verifyQuickTouches = function(e, dist, touchMoveCount) {
      // Only make use of this state if the opType is not defined, there
      // is a change in scale, this is the first touchmove and the distance b/w
      // firsttouch and the touchmove's event location is really huge.
      if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.none
        && dist > 50 && touchMoveCount === 1) {
        WMKS.LOGGER.debug('Special case - touchmove#: ' + touchMoveCount
          + ', targetTouches#: ' + e.targetTouches.length
          + ', dist: ' + dist + ', scale: ' + e.scale);
        return true;
      }
      return false;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _initDragEventAndSendFeedback
     *
     *    This is the initialization event that happens when we detect a gesture
     *    as a drag. It does the following:
     *    1. Sends a mouse down where the touch initially happened.
     *    2. Shows drag ready feedback.
     *
     *---------------------------------------------------------------------------
     */

    this._initDragEventAndSendFeedback = function(firstTouch) {
      if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.drag) {
        // Send the left mousedown at the touch location & send drag feedback
        var pos = this._applyZoomCorrectionToTouchXY(firstTouch);
        _widget.sendMouseButtonMessage(pos, true, WMKS.CONST.CLICK.left);
        // Show drag icon above implying the drag is ready to use.
        this._showFeedback(_ELEMENTS.dragFeedback, firstTouch);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _initTwoFingerTouch
     *
     *    This is the initialization event that happens when we detect a gesture
     *    as a drag. It does the following:
     *    1. Sends a mouse down where the touch initially happened.
     *    2. Shows drag ready feedback.
     *
     *---------------------------------------------------------------------------
     */

    this._initTwoFingerTouch = function(firstTouch, secondTouch) {
      /* WMKS.LOGGER.debug('Touch1: ' + firstTouch.screenX + ','
         + firstTouch.screenY + ' touch 2: ' + secondTouch.screenX + ','
         + secondTouch.screenY + ' opType: ' + _TAP_STATE.opType); */
      if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.none) {
        _TAP_STATE.currentTouchFingers = 2;
        /*
         * Now, 2 finger tap just happened. This could be one of the following:
         *    1. Scroll - (To detect use angle b/w lines upon touchmove).
         *    2. Zoom/pinch - Handled by the default handler (detect as above).
         *    3. right-click (When its neither of the above).
         *
         * Store the original 2 finger location and the leftmost location.
         * NB: Use location of the leftmost finger to position right click.
         * TODO: lefty mode
         */
        _TAP_STATE.touchArray.push(firstTouch);
        _TAP_STATE.touchArray.push(secondTouch);
        _TAP_STATE.firstTouch = WMKS.UTIL.TOUCH.copyTouch(
          WMKS.UTIL.TOUCH.leftmostOf(firstTouch, secondTouch));
        _TAP_STATE.currentTouch = WMKS.UTIL.TOUCH.copyTouch(_TAP_STATE.firstTouch);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _sendScrollEventMessage
     *
     *    This function handles the computation of the vertical scroll distance.
     *    If the distance is more than the threshold, then sends the appropriate
     *    message to the server.
     *
     *---------------------------------------------------------------------------
     */

    this._sendScrollEventMessage = function(touch) {
      var dx = 0, dy = 0, deltaX, deltaY, wheelDeltas, firstPos;
      if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.scroll) {
        deltaX = touch.clientX - _TAP_STATE.currentTouch.clientX;
        deltaY = touch.clientY - _TAP_STATE.currentTouch.clientY;

        wheelDeltas = this._calculateMouseWheelDeltas(deltaX, deltaY);
        dx = wheelDeltas.wheelDeltaX;
        dy = wheelDeltas.wheelDeltaY;

        // Only send if at least one of the deltas has a value.
        if (dx !== 0 || dy !== 0) {
          firstPos = this._applyZoomCorrectionToTouchXY(_TAP_STATE.touchArray[0]);
          _widget.sendScrollMessage(firstPos, dx, dy);

          // Update clientX, clientY values as we only need them.
          if (dx !== 0) {
            _TAP_STATE.currentTouch.clientX = touch.clientX;
          }

          if (dy !== 0) {
            _TAP_STATE.currentTouch.clientY = touch.clientY;
          }
        }
      }
      // TODO: Improve scroll by using residual scroll data when delta < minDeltaDistancePx.
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _calculateMouseWheelDeltas
     *
     *    This function calculates the wheelDeltaX and wheelDeltaY values
     *    according to the scroll delta distance.
     *
     *---------------------------------------------------------------------------
     */

    this._calculateMouseWheelDeltas = function(deltaX, deltaY) {
      var dx = 0,
        dy = 0,
        absDeltaX = Math.abs(deltaX),
        absDeltaY = Math.abs(deltaY),
        scrollX = absDeltaX > WMKS.CONST.TOUCH.SCROLL.minDeltaDistancePx,
        scrollY = absDeltaY > WMKS.CONST.TOUCH.SCROLL.minDeltaDistancePx,
        angle;

      /*
       * We don't want to send movements for every pixel we move.
       * So instead, we pick a threshold, and only scroll that amount.
       * This won't be perfect for all applications.
       */
      if (scrollX && scrollY) {
        /*
         * If the scroll angle is smaller than 45 degree,
         * do horizontal scroll; otherwise, do vertical scroll.
         */
        if (absDeltaY < absDeltaX) {
          // Horizontal scroll only.
          scrollY = false;
        } else {
          // Vertical scroll only.
          scrollX = false;
        }
      }

      if (scrollX) {
        dx = deltaX > 0 ? 1 : -1;
      }

      if (scrollY) {
        dy = deltaY > 0 ? -1 : 1;
      }

      if (_widget.options.reverseScrollY) {
        dy = dy * -1;
      }

      return {wheelDeltaX : dx, wheelDeltaY : dy};
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _updatePreScrollState
     *
     *    This function verifies if there was a residual scroll event, and if so.
     *    sends that after computing the directing of the scroll.
     *
     *---------------------------------------------------------------------------
     */

    this._updatePreScrollState = function(touch) {
      var deltaY = touch.clientY - _TAP_STATE.currentTouch.clientY;
      _TAP_STATE.scrollCount++;
      if (deltaY < 0) {
        _TAP_STATE.skipScrollCount--;
      } else {
        _TAP_STATE.skipScrollCount++;
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _sendResidualScrollEventMessage
     *
     *    This function verifies if there was a residual scroll event, and if so.
     *    sends that after computing the directing of the scroll.
     *
     *---------------------------------------------------------------------------
     */

    this._sendResidualScrollEventMessage = function() {
      // Detech if there is a leftover scroll event to be sent.
      if (_TAP_STATE.skipScrollCount !== 0 && _TAP_STATE.currentTouch) {
        var pos, sendScroll;

        // Server pays attention only to the sign of the scroll direction.
        sendScroll = (_TAP_STATE.skipScrollCount < 0) ? -1 : 1;

        WMKS.LOGGER.debug('Sending a residual scroll message.');
        WMKS.LOGGER.debug('Cur touch: ' + _TAP_STATE.currentTouch.pageX
          + ' , ' + _TAP_STATE.currentTouch.pageY);

        _TAP_STATE.skipScrollCount = 0;
        pos = this._applyZoomCorrectionToTouchXY(_TAP_STATE.currentTouch);
        // TODO KEERTHI: Fix this for horizontal scrolling as well.
        // dx for horizontal, dy for vertical.
        _widget.sendScrollMessage(pos, sendScroll, 0);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _isDoubleTap
     *
     *    Function to check if the tap is part of a double tap. The logic to
     *    determine is:
     *    1. There is always another tap earlier to this one.
     *    2. The time and proximity b/w 2 taps happen within the threshold values
     *    set in the constants: C.DOUBLE_TAP
     *    3. Based on heuristics we found that some double taps took longer than
     *    the threshold value but more accurate. Hence extend the time b/w double
     *    taps if the proximity of these 2 taps are under the
     *    tapGapBonus4TimeRatio(0.4) of the acceptable limit (tapGapInDistance).
     *    4. Make sure the double tap is always different from the two finger
     *    tap and the thresholds are within acceptable limits.
     *---------------------------------------------------------------------------
     */

    this._isDoubleTap = function(event, now) {
      var dist, duration;
      // Check if this is the second tap and there is a time delay from the first.
      if (_TAP_STATE.currentTouch === null || _TAP_STATE.tapStartTime === null
        || _TAP_STATE.opType !== WMKS.CONST.TOUCH.OP.none) {
        return false;
      }
      // Compute time difference and click position distance b/w taps.
      dist = WMKS.UTIL.TOUCH.touchDistance(_TAP_STATE.currentTouch, event.targetTouches[0]);
      duration = (now - _TAP_STATE.tapStartTime);
      // WMKS.LOGGER.debug('is tap_two (ms): ' + duration + ' & offset (px): ' + dist);

      // Check if the second tap occurred within the same vicinity as the first.
      if (dist < WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapInDistance) {
        // If duration b/w taps is within acceptable limit
        if (duration < WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapInTime) {
          // WMKS.LOGGER.debug('double tap correction activated.');
          return true;
        }
        // If the taps were extremely accurate < 40% tap gap, add the extra bonus tap gap time
        if ((dist / WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapInDistance) < WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapBonus4TimeRatio
          && duration < (WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapInTime + WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapBonusTime)) {
          // WMKS.LOGGER.trace('Duration eligible for bonus with tapGapBonus4TimeRatio: '
          //      + (dist / WMKS.CONST.TOUCH.DOUBLE_TAP.tapGapInDistance));
          // WMKS.LOGGER.debug('double tap bonus correction activated.');
          return true;
        }
      }
      return false;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onTouchStart
     *
     *    Called when a touch operation begins.
     *    A state machine is initiated which knows the number of fingers used for
     *    this touch operation in the case where it uses one finger.
     *
     *    For every touchstart, we perform the following logic:
     *    1. If the touch fingers = 1:
     *       a) Check if this touchstart is part of a double-click. If so, set
     *       the state machine info accordingly.
     *       b) If not, then update the state machine accordingly.
     *       c) for both case above, initialize a drag timer function with a
     *           delay threshold and upon triggering, initialize and set
     *           operation as a drag.
     *    2. If touch fingers = 2:
     *       a) Detect if we had earlier detected a 1 finger touchstart. In this
     *          case if the second touch happens quite late (After a set
     *          threshold) then we just ignore it. If not, then transform into
     *          a 2 finger touchstart.
     *          NOTE: This clears out the old 1 finger touchstart state.
     *       b) Initialize the 2 finger touch start as this could be a zoom /
     *          scroll/ right-click.
     *    3. The 3 finger touch start is detected, and if no operation is
     *       previously detected, then flag that state and toggle the keyboard.
     *
     *---------------------------------------------------------------------------
     */

    this._onTouchStart = function(e) {
      var pos, timeGap, self = this, now = $.now();

      // WMKS.LOGGER.debug('Start#: ' + e.targetTouches.length);
      // Unless two fingers are involved (native scrolling) prevent default
      if (e.targetTouches.length === 1) {
        /*
         * If it involves one finger, it may be:
         * - left click (touchstart and touchend without changing position)
         * - left drag (touchstart, activation timeout, touchmove, touchend)
         * - right click with staggered fingers (touchstart, touchstart, touchend)
         * - pan and scan (default behavior)
         * Allow the default behavior, but record the touch just in case it
         * becomes a click or drag.
         *
         * Also, check for a double click. See isDoubleTap() for details.
         */

        if (this._isDoubleTap(e, now)) {
          _TAP_STATE.firstTouch =
            WMKS.UTIL.TOUCH.copyTouch(_TAP_STATE.currentTouch);
          _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.tap_twice;
        } else {
          _TAP_STATE.firstTouch =
            WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]);
          _TAP_STATE.currentTouch =
            WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]);
        }

        _TAP_STATE.currentTouchFingers = 1;
        _TAP_STATE.tapStartTime = now;

        // ontouchmove destroys this timer. The finger must stay put.
        if (_dragTimer !== null) {
          clearTimeout(_dragTimer);
        }

        _dragTimer = setTimeout(function() {
          _dragTimer = null;

          // Update opType and init the drag event.
          _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.drag;
          self._initDragEventAndSendFeedback(_TAP_STATE.firstTouch);
        }, WMKS.CONST.TOUCH.leftDragDelayMs);

        // Must return true, else pinch to zoom and pan and scan will not work
        return true;
      } else if (e.targetTouches.length === 2) {
        // If touchstart happen a while after one another, wrap up the original op.
        if (_TAP_STATE.currentTouchFingers === 1) {
          // Now the second tap happens after a while. Check if its valid
          timeGap = now - _TAP_STATE.tapStartTime;
          if (timeGap > WMKS.CONST.TOUCH.additionalTouchIgnoreGapMs) {
            if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.drag) {
              // Drag was in progress and we see a new touch.
              // Hence end this and start a new one.
              pos = this._applyZoomCorrectionToTouchXY(e.targetTouches[0]);
              _widget.sendMouseButtonMessage(pos, true, WMKS.CONST.CLICK.left);
              this._resetTouchState();
            }
          }
        }

        // Setup for 2 finger gestures.
        this._initTwoFingerTouch(WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]),
          WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[1]));
        // Always allow default behavior, this allows the user to pinch to zoom
        return true;
      } else if (e.targetTouches.length === 3) {
        // Three fingers, toggle keyboard only if no gesture is detected.
        if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.none) {
          _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.tap_3finger;
          this.toggleKeyboard();
          // Set touch fingers value, so touchend knows to clear state.
          _TAP_STATE.currentTouchFingers = 3;
        }
        return false;
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onTouchMove
     *
     *    This function handler is invoked when touchmove is detected. Here we do
     *    the following:
     *    1. Keep a track of how many touchmove events happen.
     *    2. Clear out if any dragTimer as we see a touchmove.
     *    3. If we have already detected an opType, then we just apply the
     *       touchmove to that operation. Even if touch fingers changes midflight,
     *       ignore them, as the use has already started using the operation
     *       and hence should continue with that.
     *    4. If no operation is detected and the touch fingers changes midflight,
     *       then it could be the following:
     *       a) Downgrade (2 --> 1 finger): If there is no scale value(distance
     *          b/w touches didn't change), then its a right-click.
     *       b) Upgrade (1 --> 2 finger): This is technically the same as a
     *          2-finger touchstart at this point. NOTE: If there is a downgrade,
     *          there wont be an upgrade.( It never goes from 2 --> 1 and then
     *          1 --> 2 later).
     *       c) If neither of the above, then its something we don't handle, must
     *          be a zoom/pinch. Hence let the default behavior kick in.
     *    5. When the touch fingers is 1, then it could be one of the following:
     *       a) Wobbly fingers that we need to ignore move distance < threshold (10px).
     *       b) Quick fingers, that's described in the function that detects it.
     *          This can happen with a very specific set of data, and if so, detect
     *          this as an initialization to 2 finger touchstart event.
     *       c) If neither of the above, then panning is assumed, and leave this
     *          to the browser to handle.
     *    6. If the touch fingers = 2, then attempt to detect a scroll / zoom.
     *       This is done based on computing the angle b/w the lines created from
     *       the touch fingers starting point to their touchmoved destination.
     *       Based on the angle, we determine if its a scroll or not. Sample
     *       multiple times before making the decision.
     *
     *    During the computation, we use various touch state entities to manage
     *    the overall state and assists in detecting the opType.
     *
     *---------------------------------------------------------------------------
     */

    this._onTouchMove = function(e) {
      var dist, pos;

      // Reset the drag timer if there is one.
      if (_dragTimer !== null) {
        clearTimeout(_dragTimer);
        _dragTimer = null;
      }

      // Increment touchMove counter to keep track of move event count.
      _TAP_STATE.touchMoveCount++;

      /* if (_TAP_STATE.touchMoveCount < 10) {
         WMKS.LOGGER.debug('move#: ' + _TAP_STATE.touchMoveCount
            + ' touch#: ' + e.targetTouches.length);
      } */

      /*
       * 1. Current touchFingers can be -1, allow default browser behavior.
       * 2. If the opType is defined, allow those gestures to complete.
       * 3. Now see if we can determine any gestures.
       */
      if (_TAP_STATE.currentTouchFingers === -1) {
        return true;
      } else if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.scroll) {
        // Scroll is detected, stick to it irrespective of the change in touch
        // fingers, etc.
        // WMKS.LOGGER.trace('continue scroll.. fingers change midflight.');
        this._sendScrollEventMessage(e.targetTouches[0]);
        return false;
      } else if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.drag) {
        // Drag is now moved. Send mousemove.
        _TAP_STATE.currentTouch = WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]);
        this.moveCursor(e.targetTouches[0].pageX, e.targetTouches[0].pageY);
        pos = this._applyZoomCorrectionToTouchXY(e.targetTouches[0]);

        _widget.sendMouseMoveMessage(pos);
        // Inhibit the default so pan does not occur
        return false;
      } else if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.tap_3finger) {
        /*
         * keyboard is already toggled but we retain the state as is here
         * to avoid touch fingers changing midflight causing a state change
         * to something else.
         */
        return false;
      } else if (_TAP_STATE.currentTouchFingers !== e.targetTouches.length) {
        // WMKS.LOGGER.debug('# of fingers changed midflight ('
        //   + _TAP_STATE.currentTouchFingers + '->' + e.targetTouches.length
        //   + '), scale: ' + e.scale + ', type: ' + _TAP_STATE.opType);
        if (_TAP_STATE.currentTouchFingers === 2 && e.targetTouches.length === 1) {
          if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.none && e.scale === 1) {
            // Touch ended early, is not a pinch/zoom(scale = 1).
            // Flag as a right click & clear state.
            WMKS.LOGGER.debug('touch: 2 -> 1 & !scroll, hence right-click.');
            this._sendTwoTouchEvent(_TAP_STATE.firstTouch,
              _TAP_STATE.firstTouch,
              WMKS.CONST.CLICK.right, e);
            this._resetTouchState();
            return false;
          }
        } else if (_TAP_STATE.currentTouchFingers === 1 && e.targetTouches.length === 2) {
          // No touchstart before this, so handle it as a 2 finger init here.
          WMKS.LOGGER.debug('touch: 1 -> 2, init 2fingertap if no opType: ' + _TAP_STATE.opType);
          this._initTwoFingerTouch(WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]),
            WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[1]));
          // Since we do not know if this is a zoom/scroll/right-click, return true for now.
          return true;
        } else {
          WMKS.LOGGER.debug('touch: 2 -> 1: infer as PINCH/ZOOM.');
          this._resetTouchState();
          return true;
        }
      } else if (_TAP_STATE.currentTouchFingers === 1) {
        // e.targetTouches.length = 1 based on above condition check.
        dist = WMKS.UTIL.TOUCH.touchDistance(e.targetTouches[0], _TAP_STATE.currentTouch);
        // If we have quick fingers convert into 2 finger touch gesture.
        if(this._verifyQuickTouches(e, dist, _TAP_STATE.touchMoveCount)) {
          // Initialize setup for 2 finger gestures.
          this._initTwoFingerTouch(WMKS.UTIL.TOUCH.copyTouch(_TAP_STATE.firstTouch),
            WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]));

          // This occurred in touchmove, so not a right click, hence a scroll.
          _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.scroll;
          return false;
        }
        else if (dist < WMKS.CONST.TOUCH.tapMoveCorrectionDistancePx){
          // If move is within a threshold, its may be a click by wobbly fingers.
          // Left click should not becomes a pan if within the threshold.
          return true;
        } else {
          /**
           * TODO: It would be nice to avoid the trackpad completely by
           * replacing trackpad functionality with a trackpad/relative mode.
           * This differs from the original/absolute touch mode by is relative
           * nature of the cursor location and the touch location. The
           * relative mode acts as a huge trackpad.
           */
          this._resetTouchState();
          return true;
        }
      } else if (_TAP_STATE.currentTouchFingers === 2) {
        // Determine type of operation if its not set, or the state is not cleaned up.
        if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.none) {
          if (_TAP_STATE.touchArray.length === 0 || _TAP_STATE.touchArray.length !== 2) {
            // If the the original touches were not captured, classify this as zoom/pinch.
            this._resetTouchState();
            return true;
          }

          // Initially scale = 1 is common, ignore event as this does not add any value.
          if (e.scale === 1 && _TAP_STATE.touchMoveCount < 5) {
            // No move detected so far, hence skip this touchmove, return true.
            return true;
          }

          /*
           * Compute the angle b/w the 2 lines. Each line is computed off of 2
           * touch points (_TAP_STATE.touchArray & e.TargetTouches). The angle
           * for each line (in radians) ranges from -Phi to +Phi (3.1416).
           * The difference in angle can tell us if the 2 finger swipes
           * are closer (scroll) to each other or farther away(zoom/pinch).
           */
          var angle = WMKS.UTIL.TOUCH.touchAngleBwLines(
            _TAP_STATE.touchArray[0], e.targetTouches[0],
            _TAP_STATE.touchArray[1], e.targetTouches[1]);
          angle = Math.abs(angle);
          // WMKS.LOGGER.debug(_TAP_STATE.touchMoveCount + ', scale:'
          //    + e.scale + ', angle: ' + angle);
          if (angle === 0) {
            // One of the touch fingers did not move, missing angle, do nothing.
            return true;
          } else if (angle < 1 || angle > 5.2) {
            // This is a scroll. Coz the smaller angle is under 1 radian.

            // Update scrollCount & scrollSkipCount before we finalize as a scroll.
            this._updatePreScrollState(e.targetTouches[0]);

            // If the minimum sampling count isn't met, sample again to be accurate.
            if (_TAP_STATE.scrollCount >= WMKS.CONST.TOUCH.touchMoveSampleMinCount) {
              // Now we are sure this is a scroll with 2 data samples.
              this._showFeedback(_ELEMENTS.scrollFeedback, _TAP_STATE.firstTouch,
                { 'position': 'left', 'offsetLeft': -50, 'offsetTop': -25 });
              _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.scroll;
              _TAP_STATE.currentTouch = WMKS.UTIL.TOUCH.copyTouch(e.targetTouches[0]);
              // WMKS.LOGGER.debug('This is a scroll.');
              return false;
            }
          } else {
            // The smaller angle b/w the 2 lines are > about 1 radian, hence a pinch/zoom.
            _TAP_STATE.zoomCount++;

            // If the minimum sampling count isn't met, sample again to be accurate.
            if (_TAP_STATE.zoomCount >= WMKS.CONST.TOUCH.touchMoveSampleMinCount) {
              // Now we are sure this is a zoom/pinch.
              // WMKS.LOGGER.debug('This is a zoom / pinch');
              this._resetTouchState();
              return true;
            }
          }
          return true;
        }
      }
      // For cases we don't deal with let default handle kick in.
      return true;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onTouchEnd
     *
     *    Called when a touch operation ends. The following happens here:
     *    1. If the touch state does not exist we do nothing & allow the default
     *       handling to kick in.
     *    2. If an opType has been detected, we terminate its state and
     *       send appropriate termination signals if any.
     *    3. If no opType is detected, then it could be a a single finger
     *       left click or a 2 finger right click. In each case, send the
     *       appropriate signal and in case of left click, store the time when
     *       the click was initiated, so that double click could be detected.
     *
     *---------------------------------------------------------------------------
     */

    this._onTouchEnd = function(e) {
      var pos, touches;

      // Reset the drag timer if there is one.
      if (_dragTimer !== null) {
        clearTimeout(_dragTimer);
        _dragTimer = null;
      }
      if (_TAP_STATE.currentTouchFingers === -1) {
        return true;
      } else if (e.targetTouches.length === 0) {

        // Check if it is almost a scroll but user stopped scrolling after we detected.
        if (_TAP_STATE.skipScrollCount !== 0) {
          // WMKS.LOGGER.debug('Flag as scroll as there is a residual scroll data.');
          // Sometimes its already a scroll, won't hurt.
          _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.scroll;
        }

        // Check against the known opTypes and at the last the unknown ones.
        switch(_TAP_STATE.opType) {
          case WMKS.CONST.TOUCH.OP.scroll:
            // WMKS.LOGGER.debug('scroll complete, send residual scroll & clear state.');
            this._sendResidualScrollEventMessage(e);
            this._resetTouchState();
            return false;
          case WMKS.CONST.TOUCH.OP.tap_twice:
            // WMKS.LOGGER.debug('Send tap twice with feedback: ' + _TAP_STATE.opType);
            this._sendTwoTouchEvent(_TAP_STATE.firstTouch, _TAP_STATE.currentTouch,
              WMKS.CONST.CLICK.left, e);
            this._resetTouchState();
            return false;
          case WMKS.CONST.TOUCH.OP.tap_3finger:
            // WMKS.LOGGER.debug('kb already handled, clear state.');
            this._resetTouchState();
            return false;
          case WMKS.CONST.TOUCH.OP.drag:
            // NOTE: Caret position is getting updated via the wts event.
            // for drag, send the mouse up at the end position
            touches = e.changedTouches;

            // There should only be one touch for dragging
            if (touches.length === 1) {
              pos = this._applyZoomCorrectionToTouchXY(touches[0]);
              _widget.sendMouseButtonMessage(pos, false, WMKS.CONST.CLICK.left);
            } else {
              WMKS.LOGGER.warn('Unexpected touch# ' + touches.length
                + ' changed in a drag operation!');
            }
            this._resetTouchState();
            return false;
          default:
            if (_TAP_STATE.currentTouchFingers === 1) {
              // End a single tap - left click, send mousedown, mouseup together.
              this._sendTwoTouchEvent(_TAP_STATE.firstTouch,
                _TAP_STATE.currentTouch,
                WMKS.CONST.CLICK.left, e);
              this._resetTouchState(true);
              return false;
            } else if (_TAP_STATE.currentTouchFingers === 2) {
              // End a 2-finger tap, and if no opType is set this is a right-click.
              // Send mousedown, mouseup together.
              this._sendTwoTouchEvent(_TAP_STATE.firstTouch,
                _TAP_STATE.firstTouch,
                WMKS.CONST.CLICK.right, e);
              this._resetTouchState();
              return false;
            }
        }

        // Reset touch state as we are done with the gesture/tap, return false.
        this._resetTouchState();
        return false;
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _resetTouchState
     *
     *    Resets the touch state machine.
     *
     *---------------------------------------------------------------------------
     */

    this._resetTouchState = function(keepLastTouchState) {
      if (!keepLastTouchState) {
        _TAP_STATE.tapStartTime = null;
        _TAP_STATE.currentTouch = null;
      }
      _TAP_STATE.currentTouchFingers = -1;
      _TAP_STATE.opType = WMKS.CONST.TOUCH.OP.none;
      _TAP_STATE.firstTouch = null;
      _TAP_STATE.touchArray.length = 0;

      // Also reset the tap state clearing prev data.
      _TAP_STATE.touchMoveCount = 0;
      _TAP_STATE.skipScrollCount = 0;
      _TAP_STATE.scrollCount = 0;
      _TAP_STATE.zoomCount = 0;
    };

    /*
     *---------------------------------------------------------------------------
     * _sendTwoTouchEvent
     *
     *    This function sends the mousedown on first event and a mouseup on the
     *    second. This could be a brand new click or part of a two finger tap
     *---------------------------------------------------------------------------
     */

    this._sendTwoTouchEvent = function(firstTouch, secondTouch, button) {
      // Send modifier keys as well if any to support inputs like 'ctrl click'
      var pos = this._applyZoomCorrectionToTouchXY(firstTouch);
      _widget.sendMouseButtonMessage(pos, true, button);

      /*
      WMKS.LOGGER.warn('Zoom: ' +
         ' screenXY: ' + firstTouch.screenX + ',' + firstTouch.screenY +
         ' clientXY: ' + firstTouch.clientX + ',' + firstTouch.clientY +
         ' pageXY: '   + firstTouch.pageX   + ',' + firstTouch.pageY);
      */
      if (_TAP_STATE.opType === WMKS.CONST.TOUCH.OP.tap_twice) {
        _widget.sendMouseButtonMessage(pos, false, button);

        // Send the double click feedback with a throbbing effect (use showTwice).
        this._showFeedback(_ELEMENTS.clickFeedback, firstTouch, {showTwice: true});
      } else {
        pos = this._applyZoomCorrectionToTouchXY(secondTouch);
        _widget.sendMouseButtonMessage(pos, false, button);
        this._showFeedback(_ELEMENTS.clickFeedback, firstTouch);
      }
      return true;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * addToRepositionQueue
     *
     *    This function adds the element to the reposition queue and upon
     *    rotation, the private function _repositionFloatingElementsOnRotation()
     *    ensures these elements are positioned within the canvas region.
     *
     *---------------------------------------------------------------------------
     */

    this.addToRepositionQueue = function(element) {
      if (element) {
        _repositionElements.push(element);
      }
    };

    /*
     *---------------------------------------------------------------------------
     * widgetRepositionOnRotation
     *
     *    Widgets need to be repositioned on orientation change. This change is one
     *    of two forms and needs correction only when they are shown.
     *    1. Landscape -> portrait: Widget may be to the right of the visible area.
     *    2. Portrait -> Landscape: Widget may be to the bottom of the visible area.
     *
     *    The logic used to reposition the widget, is if the widget is beyond the
     *    visible area, ensure that the widget is pulled back within the screen.
     *    The widget is pulled back enough so the right/bottom is at least 5px away.
     *
     *    TODO:
     *    1. Yet to handle when keyboard is popped out (use window.pageYOffset)
     *    2. Also watch out for a case when the screen is zoomed in. This is tricky
     *       as the zoom out kicks in during landscape to portrait mode.
     *    3. window.pageXOffset is not reliable due coz upon rotation the white patch
     *       on the right appears and causes some additional window.pageXOffset
     *       value. Best bet is to store this value before rotation and apply after
     *       orientation change kicks in.
     *
     *    Returns true if the widget was repositioned, false if nothing changed.
     *---------------------------------------------------------------------------
     */

    this.widgetRepositionOnRotation = function(widget) {
      var w, h, size, screenW, screenH, hasPositionChanged = false;

      if (!WMKS.BROWSER.isTouchDevice()) {
        WMKS.LOGGER.warn('Widget reposition ignored, this is not a touch device.');
        return false;
      }

      if (!widget || widget.is(':hidden')) {
        return false;
      }

      w = widget.width();
      h = widget.height();
      // Get the current screen size.
      screenW = window.innerWidth;
      screenH = window.innerHeight;

      if (WMKS.UTIL.TOUCH.isPortraitOrientation()) {
        if ((widget.offset().left + w) > screenW) {
          widget.offset({ left: String(screenW - w - 5) });
          hasPositionChanged = true;
        }
      } else {
        if ((widget.offset().top + h) > screenH) {
          widget.offset({ top: String(screenH - h - 5) });
          hasPositionChanged = true;
        }
      }

      return hasPositionChanged;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _repositionFloatingElementsOnRotation
     *
     *    Called after the default orientation changes are applied. These are
     *    specific for the feedback icons, input textbox, the cursor icon and
     *    any element that was requested by addToRepositionQueue().
     *
     *    Cursor icon is visible and so is the input textbox and they need to be
     *    moved inside the canvas to avoid the viewport from growing larger than
     *    the canvas size.
     *
     *    TODO: If cursor position changed due to orientation changes, send the
     *    new location. This is only a few pixels away, so not worrying about it
     *    for now.
     *
     *---------------------------------------------------------------------------
     */

    this._repositionFloatingElementsOnRotation = function(e) {
      var self = this,
        canvasOffset = _canvas.offset();
      // Move them inside the canvas region if they are outside.
      this.widgetRepositionOnRotation(_ELEMENTS.inputProxy);
      this.widgetRepositionOnRotation(_ELEMENTS.cursorIcon);

      // Position these hidden elements within the canvas.
      // NOTE: Problem is on iOS-6.1.2, but not on iOS-6.0.2, see bug: 996595#15
      // WMKS.LOGGER.trace(JSON.stringify(canvasOffset));
      _ELEMENTS.clickFeedback.offset(canvasOffset);
      _ELEMENTS.dragFeedback.offset(canvasOffset);
      _ELEMENTS.pulseFeedback.offset(canvasOffset);
      _ELEMENTS.scrollFeedback.offset(canvasOffset);

      // Now handle the list of elements added via addToRepositionQueue()
      $.each(_repositionElements, function(i, element) {
        // Just to be safe, we try this out here.
        try {
          // WMKS.LOGGER.info('reposition req: ' + element.attr('id')
          //    + element.attr('class'));
          self.widgetRepositionOnRotation(element);
        } catch (err) {
          WMKS.LOGGER.warn('Custom element reposition failed: ' + err);
        }
      });
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onOrientationChange
     *
     *    Called when the device's orientation changes.
     *
     *
     *---------------------------------------------------------------------------
     */

    this._onOrientationChange = function(e) {
      var self = this;

      if (this._isInputInFocus()) {
        // Listen to resize event.
        $(window).one('resize', function(e) {
          /*
           * Trigger orientationchange event to adjust the screen size.
           * When the keyboard is opened, resize happens after orientationchange.
           */
          setTimeout(function() {
            $(window).trigger('orientationchange');
            // Reposition widgets and icons.
            self._repositionFloatingElementsOnRotation();
          }, 500);
        });
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _applyZoomCorrectionToTouchXY
     *
     *    Compute the position of a touch event relative to the canvas and apply
     *    the zoom value correction to get the right location on the canvas.
     *
     *---------------------------------------------------------------------------
     */

    this._applyZoomCorrectionToTouchXY = function(touch) {
      if (touch === null) {
        WMKS.LOGGER.warn('Unexpected: touch is null.');
        return null;
      }
      // Compute the x,y based on scroll / browser zoom values as well.
      return _widget.getEventPosition(touch);
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _showFeedback
     *
     *    This function displays the feedback object passed to it for a brief
     *    moment. The feedback indicator is not positioned directly over the
     *    click location, but centered around it. The feedback jQuery object
     *    is cached to avoid repeated lookups.
     *
     *    The animation mimics the View Client: show indicator at the location
     *    and hide after some time. jQuery animations suffered from 2 animation
     *    queue overload and gets corrupted easily. Hence we rely on CSS3
     *    animations which are also crisp as its executed in the browser space.
     *
     *    No matter what you do, the caret container is also made visible and is
     *    moved to the location of the click, where it stays.
     *
     *    feedback  - the jQuery object to animate
     *    touch     - touch object from which to derive coords
     *    inputArgs - input args that change position, offsetLeft, offsetTop.
     *---------------------------------------------------------------------------
     */

    this._showFeedback = function(feedback,touch, inputArgs) {
      var multiplier, padLeft, padTop, args = inputArgs || {};
      if (!touch || !feedback) {
        WMKS.LOGGER.trace('No touch value / feedback object, skip feedback.');
        return;
      }
      // Calculate if there is any input padding offsets to be applied.
      padLeft = args.offsetLeft || 0;
      padTop = args.offsetTop || 0;
      // Get multiplier width & height to position feedback element accordingly.
      multiplier = WMKS.UTIL.TOUCH.getRelativePositionMultiplier(args.position);
      feedback.css({
        'left': touch.pageX + padLeft + feedback.outerWidth() * multiplier.width,
        'top': touch.pageY + padTop + feedback.outerHeight() * multiplier.height
      });

      //  Just move the icon to the right place.
      this.moveCursor(touch.pageX, touch.pageY);
      /*
       * Since the same feedback indicator is used for both double tap and single tap,
       * we have to remove all animation classes there were applied.
       * This may change once we have unique elements for each of the feedback indicators.
       */
      feedback.removeClass('animate-feedback-indicator animate-double-feedback-indicator');
      if (args.showTwice) {
        setTimeout(function() {
          feedback.addClass('animate-double-feedback-indicator');
        }, 0);
      } else {
        setTimeout(function() {
          feedback.addClass('animate-feedback-indicator');
        }, 0);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * moveCursor
     *
     *    Repositions the fake caret to match the given touch's location. Since
     *    the 'tip' of the caret represents the click location, no centering is
     *    desired.
     *
     *---------------------------------------------------------------------------
     */

    this.moveCursor = function(pageX, pageY) {
      if (_ELEMENTS.cursorIcon) {
        _ELEMENTS.cursorIcon.css({'left': pageX, 'top': pageY});
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * setCursorVisibility
     *
     *    Hide or show the fake caret.
     *
     *---------------------------------------------------------------------------
     */

    this.setCursorVisibility = function(visible) {
      if (_ELEMENTS.cursorIcon) {
        if (visible) {
          _ELEMENTS.cursorIcon.show();
        } else {
          _ELEMENTS.cursorIcon.hide();
        }
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _sendKeyInput
     *
     *    Sends a key plus the manual modifiers entered on the extended keyboard.
     *    Simulates the keydowns and keyups which would happen if this were entered
     *    on a physical keyboard.
     *
     *---------------------------------------------------------------------------
     */

    this._sendKeyInput = function(key) {
      _widget.sendKeyInput(key);
    };

    /*
     *---------------------------------------------------------------------------
     *
     * onCaretPositionChanged
     *
     *    Handler for when the caret position changes.
     *
     *    We use this to dynamically position our invisible input proxy
     *    such that focus events for it don't cause us to move away from
     *    the screen offset from where we are typing.
     *
     *---------------------------------------------------------------------------
     */

    this.onCaretPositionChanged = function(pos) {
      var offsetX, offsetY;

      if (_ELEMENTS.inputProxy) {
        offsetX = pos.x;
        offsetY = pos.y;

        // Ensure the position is bound in the visible area.
        if (offsetX < window.pageXOffset) {
          offsetX = window.pageXOffset;
        }
        if (offsetY < window.pageYOffset) {
          offsetY = window.pageYOffset;
        }

        _ELEMENTS.inputProxy.offset({left: offsetX, top: offsetY});
        // WMKS.LOGGER.warn('left: ' + _ELEMENTS.inputProxy.offset().left
        //   + ', top: ' + _ELEMENTS.inputProxy.offset().left);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _keyboardDisplay
     *
     *    The event triggered when user wants to explicitly show or hide the
     *    keyboard.
     *    show - true shows keyboard, false flips it.
     *
     *---------------------------------------------------------------------------
     */

    this._keyboardDisplay = function(show) {
      // WMKS.LOGGER.debug('kb show: ' + (show? 'true' : 'false'));

      if (show) {
        _canvas.focus();
        _ELEMENTS.inputProxy.focus().select();
      } else {
        if (WMKS.BROWSER.isAndroid()) {
          // If its set to readonly & disabled keyboard focus goes away.
          _ELEMENTS.inputProxy.attr('readonly', true)
            .attr('disabled', true);
          // Reset the readonly and disabled property values after some time.
          setTimeout(function() {
            _ELEMENTS.inputProxy.attr('readonly', false)
              .attr('disabled', false);
            _canvas.focus();
          }, 100);
        }
        /*
         * The only method that seems to work on iOS to close the keyboard.
         *
         * http://uihacker.blogspot.com/2011/10/javascript-hide-ios-soft-keyboard.html
         */
        // @ts-ignore
        document.activeElement.blur();
        _KEYBOARD.visible = false;
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _isInputInFocus
     *
     *    Returns the state if the input-proxy is in focus. When it does, the
     *    keyboard should be showing as well.
     *
     *---------------------------------------------------------------------------
     */

    this._isInputInFocus = function() {
      return (document.activeElement.id === 'input-proxy');
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onInputFocus
     *
     *    Event handler for focus event on the input-proxy. Sync the keyboard
     *    highlight state here.
     *
     *---------------------------------------------------------------------------
     */

    this._onInputFocus = function(e) {
      this._sendUpdatedKeyboardState(true);
      // Hide this while we're typing otherwise we'll see a blinking caret.
      e.stopPropagation();
      return true;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _onInputBlur
     *
     *    Event handler for blur event on the input-proxy. Sync the keyboard
     *    highlight state here. Also save the timestamp for the blur event.
     *
     *---------------------------------------------------------------------------
     */

    this._onInputBlur = function(e) {
      this._sendUpdatedKeyboardState(false);
      e.stopPropagation();
      return true;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * _sendUpdatedKeyboardState
     *
     *    Helper function to set the keyboard launcher button highlight state
     *    based on the keyboard visibility.
     *
     *---------------------------------------------------------------------------
     */

    this._sendUpdatedKeyboardState = function(kbState) {
      _KEYBOARD.visible = kbState;
      _KEYBOARD.lastToggleTime = $.now();
      // Trigger keyboard toggle callback function.
      if ($.isFunction(_onToggle)) {
        _onToggle.call(this, ['KEYBOARD', _KEYBOARD.visible]);
      }
    };

    /****************************************************************************
     * Public Functions
     ***************************************************************************/

    /*
     *---------------------------------------------------------------------------
     *
     * toggleKeyboard
     *
     *    Called when the user wants to toggle on-screen keyboard visibility.
     *    show - flag to explicitly request keyboard show or hide.
     *    (When not toggling)
     *
     *---------------------------------------------------------------------------
     */

    this.toggleKeyboard = function(options) {
      if (!WMKS.BROWSER.isTouchDevice()) {
        WMKS.LOGGER.warn('Mobile keyboard not supported, this is not a touch device.');
        return;
      }

      if (!_ELEMENTS.inputProxy) {
        // Mobile keyboard toggler is not initialized. Ignore this request.
        return;
      }
      if (!!options && options.show === _KEYBOARD.visible) {
        // WMKS.LOGGER.debug('Keyboard is in the desired state.');
        return;
      }

      // Check in case the keyboard toggler request is not handled properly.
      if ($.now() - _KEYBOARD.lastToggleTime < WMKS.CONST.TOUCH.minKeyboardToggleTime) {
        /*
         * Seems like a spurious keyboard event as its occurring soon after the
         * previous toggle request. This can happen when the keyboard launcher
         * event handler is not implemented properly.
         *
         * Expected: The callback handler should prevent the default handler
         *           and return false.
         */
        WMKS.LOGGER.warn('Ignore kb toggle - Got request soon after focus/blur.');
        return;
      }

      // Show / hide keyboard based on new kBVisible value.
      this._keyboardDisplay(!_KEYBOARD.visible);
    };

    /*
     *---------------------------------------------------------------------------
     *
     * toggleTrackpad
     *
     *    Called when the user wants to toggle trackpad visibility.
     *
     *---------------------------------------------------------------------------
     */

    this.toggleTrackpad = function(options) {
      if (!WMKS.BROWSER.isTouchDevice()) {
        WMKS.LOGGER.warn('Trackpad not supported. Not a touch device.');
        return;
      }

      if (_ELEMENTS.trackpad) {
        // Set toggle callback function.
        options = $.extend({}, options, {
          toggleCallback: _onToggle
        });
        // Show / hide trackpad.
        _ELEMENTS.trackpad.toggle(options);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * toggleExtendedKeypad
     *
     *    Called when the user wants to toggle ExtendedKeypad visibility.
     *
     *---------------------------------------------------------------------------
     */

    this.toggleExtendedKeypad = function(options) {
      if (!WMKS.BROWSER.isTouchDevice()) {
        WMKS.LOGGER.warn('Extended keypad not supported. Not a touch device.');
        return;
      }

      if (_ELEMENTS.keypad) {
        // Set toggle callback function.
        options = $.extend({}, options, {
          toggleCallback: _onToggle
        });
        // Show / hide keypad.
        _ELEMENTS.keypad.toggle(options);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * installTouchHandlers
     *
     *    Install event handlers for touch devices.
     *
     *---------------------------------------------------------------------------
     */

    this.installTouchHandlers = function() {
      var self = this,
        container = _canvas.parent();

      if (!WMKS.BROWSER.isTouchDevice()) {
        WMKS.LOGGER.log('Not a touch device, and hence skip touch handler');
        return;
      }

      // Set css values to disable unwanted default browser behavior.
      _canvas.css({
        '-webkit-user-select':     'none',  /* disable cut-copy-paste */
        '-webkit-touch-callout':   'none'   /* disable callout, image save panel */
      });

      _canvas
        .bind('touchmove.wmks', function(e) {
          return self._onTouchMove(e.originalEvent);
        })
        .bind('touchstart.wmks', function(e) {
          return self._onTouchStart(e.originalEvent);
        })
        .bind('touchend.wmks', function(e) {
          return self._onTouchEnd(e.originalEvent);
        })
        .bind('orientationchange.wmks', function(event) {
          return self._onOrientationChange(event);
        })
        .bind('orientationchange.wmks.elements', function(e) {
          // Handler for repositioning cursor, feedback icons, input textbox
          // and elements added externally.
          self._repositionFloatingElementsOnRotation(e);
        });

      // Create touch feedbacks.
      _ELEMENTS.cursorIcon = $('<div/>')
        .addClass('feedback-container cursor-icon')
        .appendTo(container);
      _ELEMENTS.clickFeedback = $('<div/>')
        .addClass('feedback-container tap-icon')
        .appendTo(container);
      _ELEMENTS.dragFeedback = $('<div/>')
        .addClass('feedback-container drag-icon')
        .appendTo(container);
      _ELEMENTS.pulseFeedback = $('<div/>')
        .addClass('feedback-container pulse-icon')
        .appendTo(container);
      _ELEMENTS.scrollFeedback = $('<div/>')
        .addClass('feedback-container scroll-icon')
        .appendTo(container);

      /*
       * Double tapping or tapping on the feedback icons will inevitably involve
       * the user tapping the feedback container while it's showing. In such
       * cases capture and process touch events from these as well.
       */
      container
        .find('.feedback-container')
        .bind('touchmove.wmks', function(e) {
          return self._onTouchMove(e.originalEvent);
        })
        .bind('touchstart.wmks', function(e) {
          return self._onTouchStart(e.originalEvent);
        })
        .bind('touchend.wmks', function(e) {
          return self._onTouchEnd(e.originalEvent);
        });
    };

    /*
     *---------------------------------------------------------------------------
     *
     * disconnectEvents
     *
     *    Remove touch event handlers.
     *
     *---------------------------------------------------------------------------
     */

    this.disconnectEvents = function() {
      if (!_canvas) {
        return;
      }
      _canvas
        .unbind('orientationchange.wmks.icons')
        .unbind('orientationchange.wmks')
        .unbind('touchmove.wmks')
        .unbind('touchstart.wmks')
        .unbind('touchend.wmks');

      _canvas.find('.feedback-container')
        .unbind('touchmove.wmks')
        .unbind('touchstart.wmks')
        .unbind('touchend.wmks');
    };

    /*
     *---------------------------------------------------------------------------
     *
     * initializeMobileFeature
     *
     *    This function initializes the touch feature that's requested.
     *
     *---------------------------------------------------------------------------
     */

    this.initializeMobileFeature = function(type) {
      if (!WMKS.BROWSER.isTouchDevice()) {
        // Not a touch device, and hence will not initialize keyboard.
        return;
      }

      switch (type) {
        case WMKS.CONST.TOUCH.FEATURE.Trackpad:
          _ELEMENTS.trackpad = new WMKS.trackpadManager(_widget, _canvas);
          _ELEMENTS.trackpad.initialize();
          break;

        case WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad:
          _ELEMENTS.keypad = new WMKS.extendedKeypad({
            widget : _widget,
            parentElement: _canvas.parent(),
            keyboardManager: _keyboardManager
          });
          _ELEMENTS.keypad.initialize();
          break;

        case WMKS.CONST.TOUCH.FEATURE.SoftKeyboard:
          _ELEMENTS.inputProxy = this.initSoftKeyboard();
          break;
        default:
          WMKS.LOGGER.error('Invalid mobile feature type: ' + type);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * initSoftKeyboard
     *
     *    This function installs an input element and installs event handlers
     *    that will be used for reading device keyboard inputs and translating
     *    into the corresponding server messages.
     *
     *    NOTE: Chrome on android returns in-valid keyCodes for keyDown/keyPress.
     *
     *---------------------------------------------------------------------------
     */

    this.initSoftKeyboard = function() {
      var self = this,
        kbHandler = _keyboardManager;

      /*
       * Add a textbox that which on gaining focus launches the keyboard.
       * Listen for key events on the textbox. Append the textbox to the canvas
       * parent so that to make listening for input events easier.
       *
       * Adding this to the canvas parent is better than to the document.body
       * as we can eliminate the need to detect the parent's offset from
       * the screen while positioning the inputbox.
       *
       * To make the textbox functional and still hidden from the user by using
       * transparent background, really small size (1x1 px) textbox without
       * borders. To hide the caret, we use 0px font-size and disable any of
       * the default selectable behavior for copy-paste, etc.
       */
      var inputDiv = $('<input type="text"/>')
        .val(WMKS.CONST.KB.keyInputDefaultValue)
        .attr({
          'id':                   'input-proxy',
          'autocorrect':          'off',    /* disable auto correct */
          'autocapitalize':       'off' })  /* disable capitalizing 1st char in a word */
        .css({
          'font-size':            '1px',    /* make the caret really small */
          'width':                '1px',    /* Non-zero facilitates keyboard launch */
          'height':               '1px',
          'background-color':     'transparent',    /* removes textbox background */
          'color':                'transparent',    /* removes caret color */
          'box-shadow':           0,        /* remove box shadow */
          'outline':              'none',   /* remove orange outline - android chrome */
          'border':               0,        /* remove border */
          'padding':              0,        /* remove padding */
          'left':                 -1,       /* start outside the visible region */
          'top':                  -1,
          'overflow':             'hidden',
          'position':             'absolute' })
        .bind('blur',     function(e) { return self._onInputBlur(e); })
        .bind('focus',    function(e) { return self._onInputFocus(e); })
        .bind('input',    function(e) { return kbHandler.onInputTextSoftKb(e); })
        .bind('keydown',  function(e) { return kbHandler.onKeyDownSoftKb(e); })
        .bind('keyup',    function(e) { return kbHandler.onKeyUpSoftKb(e); })
        .bind('keypress', function(e) { return kbHandler.onKeyPressSoftKb(e); })
        .appendTo('body');

      if (WMKS.BROWSER.isIOS()) {
        // css to disable user select feature on iOS. Breaks android kb launch.
        inputDiv.css({
          '-webkit-touch-callout': 'none'    /* disable callout, image save panel */
        });
      }
      return inputDiv;
    };

    /*
     *---------------------------------------------------------------------------
     *
     * removeMobileFeature
     *
     *    Based on the feature type, see if its initialized, if so, destroy and
     *    remove its references.
     *
     *---------------------------------------------------------------------------
     */

    this.removeMobileFeature = function(type) {
      switch (type) {
        case WMKS.CONST.TOUCH.FEATURE.Trackpad:
          if (_ELEMENTS.trackpad) {
            _ELEMENTS.trackpad.destroy();
            _ELEMENTS.trackpad = null;
          }
          break;

        case WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad:
          if (_ELEMENTS.keypad) {
            _ELEMENTS.keypad.destroy();
            _ELEMENTS.keypad = null;
          }
          break;

        case WMKS.CONST.TOUCH.FEATURE.SoftKeyboard:
          if (_ELEMENTS.inputProxy) {
            if (_KEYBOARD.visible) {
              // Input is in focus, and keyboard is up.
              this.toggleKeyboard(false);
            }
            _ELEMENTS.inputProxy.remove();
            _ELEMENTS.inputProxy = null;
          }
          break;
        default:
          WMKS.LOGGER.error('Invalid mobile feature type: ' + type);
      }
    };

    /*
     *---------------------------------------------------------------------------
     *
     * destroy
     *
     *    Destroys the TouchHandler.
     *
     *    This will disconnect all (if active) and remove
     *    the widget from the associated element.
     *
     *    Consumers should call this before removing the element from the DOM.
     *
     *---------------------------------------------------------------------------
     */

    this.destroy = function() {
      this.disconnectEvents();
      this.removeMobileFeature(WMKS.CONST.TOUCH.FEATURE.SoftKeyboard);
      this.removeMobileFeature(WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad);
      this.removeMobileFeature(WMKS.CONST.TOUCH.FEATURE.Trackpad);

      // Cleanup private variables.
      _widget = null;
      _canvas = null;
      _keyboardManager = null;
      _TAP_STATE = null;
      _ELEMENTS = null;
      _repositionElements.length = 0;
      _repositionElements = null;
    };

  };

  /**
   * These util functions are very specific to this touch library and hence are
   * created separately under this file. Anything that's more generic goes
   * into WMKS.UTIL itself.
   */
  WMKS.UTIL.TOUCH = {

    // Returns true if the device is in landscape orientation.
    isLandscapeOrientation: function() {
      return (window.orientation === 90 || window.orientation === -90);
    },

    // Returns true if the device is in landscape orientation.
    isPortraitOrientation: function() {
      return (window.orientation === 0 || window.orientation === 180);
    },

    // This helper function provides the width and height multipliers for an
    // element which multiplied to its width and height and added to the
    // current location offset, will give the desired location as defined by
    // the position string.
    getRelativePositionMultiplier: function(position) {
      let wMultiply = -0.5, hMultiply = -0.5;
      if (!!position) {
        // Check for left or right positioning.
        if (position.indexOf('left') !== -1) {
          wMultiply = -1;
        } else if (position.indexOf('right') !== -1) {
          wMultiply = 1;
        }
        // Check for top or bottom positioning.
        if (position.indexOf('top') !== -1) {
          hMultiply = -1;
        } else if (position.indexOf('bottom') !== -1) {
          hMultiply = 1;
        }
      }
      // Return json response containing width and height multipliers.
      return {'width': wMultiply, 'height': hMultiply};
    },

    // Convenience function to compare two touches and see if they correspond
    // to precisely the same point.
    touchEqual: function(thisTouch, thatTouch) {
      return (thisTouch.screenX === thatTouch.screenX &&
        thisTouch.screenY === thatTouch.screenY);
    },

    // Convenience function to get the pixel distance between two touches,
    // in screen pixels.
    touchDistance: function(thisTouch, thatTouch) {
      return WMKS.UTIL.getLineLength((thatTouch.screenX - thisTouch.screenX),
        (thatTouch.screenY - thisTouch.screenY));
    },

    // Convenience function to compute the angle created b/w 2 lines. Each of
    // the two lines are defined by two touch points.
    touchAngleBwLines: function(l1p1, l1p2, l2p1, l2p2) {
      let a1 = Math.atan2(l1p1.screenY - l1p2.screenY, l1p1.screenX - l1p2.screenX);
      let a2 = Math.atan2(l2p1.screenY - l2p2.screenY, l2p1.screenX - l2p2.screenX);
      return a1 - a2;
    },

    // Since touches are Objects, they need to be deep-copied. Note that we
    // only copy the elements that we use for our own purposes, there are
    // probably more.
    copyTouch: function(aTouch) {
      return {
        'screenX': aTouch.screenX,
        'screenY': aTouch.screenY,
        'clientX': aTouch.clientX,
        'clientY': aTouch.clientY,
        'pageX'  : aTouch.pageX,
        'pageY'  : aTouch.pageY
      };
    },

    // Returns the touch event that contains the leftmost screen coords.
    leftmostOf: function(thisTouch, thatTouch) {
      return (thisTouch.screenX < thatTouch.screenX)? thisTouch : thatTouch;
    }
  };

  // TODO
  WMKS.widgetProto = {};
  WMKS.widgetProto.options = {
    fitToParent: !1,
    fitGuest: !1,
    useNativePixels: !1,
    allowMobileKeyboardInput: !0,
    useUnicodeKeyboardInput: !1,
    useVNCHandshake: !0,
    VCDProxyHandshakeVmxPath: null,
    reverseScrollY: !1,
    allowMobileExtendedKeypad: !0,
    allowMobileTrackpad: !0,
    enableVorbisAudioClips: !1,
    enableOpusAudioClips: !1,
    enableAacAudioClips: !1,
    enableVMWAudioMixer: !1,
    enableVVC: !0,
    enableMP4: !1,
    enableRawH264: !1,
    enableTopologyChange: !1,
    enableH264Multimon: !1,
    enableUint8Utf8: !1,
    retryConnectionInterval: -1,
    ignoredRawKeyCodes: [],
    fixANSIEquivalentKeys: !1,
    mapMetaToCtrlForKeys: [],
    enableWindowsKey: !1,
    keyboardLayoutId: "en-US",
    sendRelativeMouseEvent: !1
  };
  WMKS.widgetProto._updatePixelRatio = function () {
    this.options.useNativePixels ? this._pixelRatio = window.devicePixelRatio || 1 : this._pixelRatio = 1
  };
  WMKS.widgetProto._updateMobileFeature = function (a, b) {
    a ? this._touchHandler.initializeMobileFeature(b) : this._touchHandler.removeMobileFeature(b)
  };
  WMKS.widgetProto._setOption = function (a, b) {
    $.Widget.prototype._setOption.apply(this, arguments);
    switch (a) {
      case "fitToParent":
        this.rescaleOrResize(!1);
        break;
      case "fitGuest":
        this.rescaleOrResize(!0);
        break;
      case "useNativePixels":
        if (b && !WMKS.UTIL.isHighResolutionSupported()) {
          WMKS.LOGGER.warn("Browser/device does not support this feature.");
          return
        }
        this._updatePixelRatio(), this.options.fitGuest ? this.updateFitGuestSize(!0) : this.rescaleOrResize(!1);
        break;
      case "allowMobileKeyboardInput":
        this._updateMobileFeature(b, WMKS.CONST.TOUCH.FEATURE.SoftKeyboard);
        break;
      case "allowMobileTrackpad":
        this._updateMobileFeature(b, WMKS.CONST.TOUCH.FEATURE.Trackpad);
        break;
      case "allowMobileExtendedKeypad":
        this._updateMobileFeature(b, WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad);
        break;
      case "reverseScrollY":
        this.options.reverseScrollY = b;
        break;
      case "fixANSIEquivalentKeys":
        this._keyboardManager.fixANSIEquivalentKeys = b;
        break;
      case "VCDProxyHandshakeVmxPath":
        this.setVCDProxyHandshakeVmxPath(b);
        break;
      case "mapMetaToCtrlForKeys":
        this._keyboardManager.mapMetaToCtrlForKeys = b;
      case "enableWindowsKey":
        this._keyboardManager.enableWindowsKey(b);
        break;
      case "keyboardLayoutId":
        this._keyboardManager.keyboardLayoutId = b, this._keyboardManager.UnicodeToVScanMap = WMKS.CONST.KB.VScanMap[b];
        break;
      case "ignoredRawKeyCodes":
        this._keyboardManager.setIgnoredRawKeyCodes(b);
        break;
      case "sendRelativeMouseEvent":
        this._vncDecoder.options.sendRelativeMouseEvent = b
    }
  };
  WMKS.widgetProto.getCanvasPosition = function (a, b) {
    var c, d, e, f;
    if (isNaN(a) || isNaN(b)) return {
      x: 0,
      y: 0
    };
    c = this._canvas.offset(), d = this._pixelRatio / this._scale;
    var g = Math.ceil((a - c.left) * d),
      h = Math.ceil((b - c.top) * d);
    return this.options.useNativePixels ? (e = Math.ceil(this._canvas.width() * d) - 1, f = Math.ceil(this._canvas.height() * d) - 1) : (e = Math.ceil(this._canvas.width()) - 1, f = Math.ceil(this._canvas.height()) - 1), g = Math.min(g, e), h = Math.min(h, f), g = Math.max(g, 0), h = Math.max(h, 0), {
      x: g,
      y: h
    }
  };
  WMKS.widgetProto.getRelativeMouseCanvasPosition = function (a) {
    var b, c, d, e = a.x,
      f = a.y;
    if (isNaN(e) || isNaN(f)) return {
      x: 0,
      y: 0
    };
    b = this._canvas.offset(), c = this._canvas.parent()
      .offset(), d = this._scale / this._pixelRatio;
    var g = Math.ceil(e * d + b.left),
      h = Math.ceil(f * d + b.top);
    return {
      x: g,
      y: h
    }
  };
  WMKS.widgetProto.getEventPosition = function (a) {
    var b, c;
    if (a.pageX || a.pageY) b = a.pageX, c = a.pageY;
    else if (a.clientX || a.clientY) b = a.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, c = a.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    return this.getCanvasPosition(b, c)
  };
  WMKS.widgetProto._isCanvasMouseEvent = function (a) {
    var b = a || window.event,
      c = b.target || b.srcElement;
    return this._mouseDownBMask !== 0 ? !0 : c === this._canvas[0] || this._video && c === this._video[0] || c === $("#relativePadSurface")
  };
  WMKS.widgetProto._onMouseButton = function (a, b) {
    if (this._vncDecoder && this._isCanvasMouseEvent(a)) {
      var c = a || window.event,
        d = this.getEventPosition(c),
        e;
      return c.which ? WMKS.BROWSER.isMacOS() && WMKS.BROWSER.isGecko() && c.ctrlKey && c.button === 2 ? (WMKS.LOGGER.trace("FF on OSX: Rewrite Ctrl+Right-click as Ctrl+Left-click."), e = 1) : e = 1 << c.button : e = (c.button & 1) << 0 | (c.button & 2) << 1 | (c.button & 4) >> 1, this.sendMouseButtonMessage(d, b, e)
    }
  };
  WMKS.widgetProto.sendMouseButtonMessage = function (a, b, c) {
    return this._vncDecoder && (b ? this._mouseDownBMask |= c : this._mouseDownBMask &= ~c, (this._mousePosGuest.x !== a.x || this._mousePosGuest.y !== a.y) && this.sendMouseMoveMessage(a), this._vncDecoder.onMouseButton(a.x, a.y, b, c)), !0
  };
  WMKS.widgetProto._onMouseWheel = function (a) {
    if (this._vncDecoder && this._isCanvasMouseEvent(a)) {
      var b = a || window.event,
        c = this.getEventPosition(b),
        d = Math.max(Math.min(a.wheelDeltaX, 1), -1),
        e = Math.max(Math.min(a.wheelDeltaY, 1), -1);
      return this.options.reverseScrollY && (e *= -1), this.sendScrollMessage(c, d, e), a.stopPropagation(), a.preventDefault(), !1
    }
  };
  WMKS.widgetProto.sendScrollMessage = function (a, b, c) {
    this._vncDecoder && this._vncDecoder.onMouseWheel(a.x, a.y, b, c)
  };
  WMKS.widgetProto._onMouseMove = function (a) {
    if (this._vncDecoder && this._isCanvasMouseEvent(a)) {
      var b = a || window.event,
        c = this.getEventPosition(b);
      this.sendMouseMoveMessage(c)
    }
    return !0
  };
  WMKS.widgetProto.sendMouseMoveMessage = function (a) {
    this._vncDecoder && (this._vncDecoder.onMouseMove(a.x, a.y), this._mousePosGuest = a, this._touchHandler && this._touchHandler.onCaretPositionChanged(a))
  };
  WMKS.widgetProto._onBlur = function (a) {
    return this.connected && (this._keyboardManager.cancelModifiers(), this._vncDecoder.onMouseButton(this._mousePosGuest.x, this._mousePosGuest.y, 0, this._mouseDownBMask), this._mouseDownBMask = 0), !0
  };
  WMKS.widgetProto._onPaste = function (a) {
    var b = a.originalEvent,
      c = this;
    if (b && b.clipboardData) {
      var d = b.clipboardData.items;
      if (d)
        for (var e = 0; e < d.length; e++) d[e].kind === "string" && d[e].type === "text/plain" && d[e].getAsString(function (a) {
          c._keyboardManager.processInputString(a)
        })
    }
    return !0
  };
  WMKS.widgetProto.disconnectEvents = function () {
    this.element.unbind("contextmenu.wmks")
      .unbind("keydown.wmks")
      .unbind("keypress.wmks")
      .unbind("keyup.wmks")
      .unbind("mousedown.wmks")
      .unbind("mousewheel.wmks"), this.element.unbind("mousemove.wmks")
      .unbind("mouseup.wmks")
      .unbind("blur.wmks"), $(window)
      .unbind("blur.wmks"), this._touchHandler && this._touchHandler.disconnectEvents()
  };
  WMKS.widgetProto.connectEvents = function () {
    var a = this;
    this.element.bind("blur.wmks", function (b) {
      return a._onBlur(b)
    }), this.element.bind("contextmenu.wmks", function (a) {
      return !1
    })
      .bind("keydown.wmks", function (b) {
        return a.updateUserActivity(), a._keyboardManager.onKeyDown(b)
      })
      .bind("keypress.wmks", function (b) {
        return a._keyboardManager.onKeyPress(b)
      })
      .bind("keyup.wmks", function (b) {
        return a.updateUserActivity(), a._keyboardManager.onKeyUp(b)
      }), $(window)
      .bind("blur.wmks", function (b) {
        return a._onBlur(b)
      })
      .bind("mousemove.wmks", function (b) {
        a.updateUserActivity();
        if (a.options.sendRelativeMouseEvent) return;
        return a._onMouseMove(b)
      })
      .bind("mousewheel.wmks", function (b) {
        a.updateUserActivity();
        if (a.options.sendRelativeMouseEvent) return;
        return a._onMouseWheel(b)
      })
      .bind("mouseup.wmks", function (b) {
        a.updateUserActivity();
        if (a.options.sendRelativeMouseEvent) return;
        return a._onMouseButton(b, 0)
      })
      .bind("mousedown.wmks", function (b) {
        a.updateUserActivity();
        if (a.options.sendRelativeMouseEvent) return;
        return a._onMouseButton(b, 1)
      }), this._touchHandler && this._touchHandler.installTouchHandlers(), this._relativeMouseHandler && this._relativeMouseHandler.installMouseHandlers()
  };
  WMKS.widgetProto.maxFitWidth = function () {
    return this.element[0].scrollWidth * this._pixelRatio
  };
  WMKS.widgetProto.maxFitHeight = function () {
    return this.element[0].scrollHeight * this._pixelRatio
  };
  WMKS.widgetProto.hideKeyboard = function (a?) {
    a = a || {}, a.show = !1, this.toggleKeyboard(a)
  };
  WMKS.widgetProto.showKeyboard = function (a?) {
    a = a || {}, a.show = !0, this.toggleKeyboard(a)
  };
  WMKS.widgetProto.toggleKeyboard = function (a) {
    this.options.allowMobileKeyboardInput && this._touchHandler && this._touchHandler.toggleKeyboard(a)
  };
  WMKS.widgetProto.toggleTrackpad = function (a) {
    this.options.allowMobileTrackpad && this._touchHandler && this._touchHandler.toggleTrackpad(a)
  };
  WMKS.widgetProto.toggleRelativePad = function (a) {
    this._relativeMouseHandler && this._relativeMouseHandler.toggleRelativePad(a)
  };
  WMKS.widgetProto.toggleExtendedKeypad = function (a) {
    this.options.allowMobileExtendedKeypad && this._touchHandler && this._touchHandler.toggleExtendedKeypad(a)
  };
  WMKS.widgetProto.sendInputString = function (a) {
    this._keyboardManager.processInputString(a, !0)
  };
  WMKS.widgetProto.sendKeyCodes = function (a) {
    var b, c = [];
    for (b = 0; b < a.length; b++) {
      var d = a[b];
      d > 0 ? (this._keyboardManager.sendKey(d, !1, !1), (d !== 20 || WMKS.BROWSER.isMacOS()) && c.push(d)) : d < 0 && this._keyboardManager.sendKey(0 - d, !0, !0)
    }
    for (b = c.length - 1; b >= 0; b--) this._keyboardManager.sendKey(c[b], !0, !1)
  };
  WMKS.widgetProto.rescale = function () {
    this.rescaleOrResize(!0)
  };
  WMKS.widgetProto.updateFitGuestSize = function (a) {
    var b = this.element.width() * this._pixelRatio,
      c = this.element.height() * this._pixelRatio;
    if (!this.options.fitGuest || a && this._guestWidth === b && this._guestWidth === c) return;
    this._vncDecoder.onRequestResolution(b, c)
  };
  WMKS.widgetProto.updateTopology = function (a) {
    var b;
    if (!this.options.fitGuest) return;
    for (b = 0; b < a.length; b++) a[b].left = a[b].left * this._pixelRatio, a[b].top = a[b].top * this._pixelRatio, a[b].requestedWidth = a[b].requestedWidth * this._pixelRatio, a[b].requestedHeight = a[b].requestedHeight * this._pixelRatio;
    this._vncDecoder.onRequestTopology(a)
  };
  WMKS.widgetProto.rescaleOrResize = function (a) {
    var b = 1,
      c = 0,
      d = 0,
      e = this.element.width(),
      f = this.element.height();
    this._canvas.css({
      width: this._guestWidth / this._pixelRatio,
      height: this._guestHeight / this._pixelRatio
    });
    var g = this._canvas.width(),
      h = this._canvas.height();
    if (this.transform === null || !!this.options.fitToParent || !!this.options.fitGuest)
      if (this.transform !== null && this.options.fitToParent) {
        var i = e / g,
          j = f / h;
        c = (e - g) / 2, d = (f - h) / 2, b = Math.max(.1, Math.min(i, j))
      } else this.options.fitGuest && a ? this.updateFitGuestSize(!0) : this.transform === null && WMKS.LOGGER.warn("No scaling support");
    if (this.transform !== null) {
      b !== this._scale && (this._scale = b, this._canvas.css(this.transform, "scale(" + this._scale + ")"));
      if (c !== this._x || d !== this._y) this._x = c, this._y = d, this._canvas.css({
        top: d,
        left: c
      })
    }
  };
  WMKS.widgetProto.setVCDProxyHandshakeVmxPath = function (a) {
    this.options.VCDProxyHandshakeVmxPath = a, this._vncDecoder && this._vncDecoder.options && (this._vncDecoder.options.VCDProxyHandshakeVmxPath = a)
  };
  WMKS.widgetProto.disconnect = function () {
    this._vncDecoder.disconnect(), this.disconnectEvents(), this._keyboardManager.cancelModifiers()
  };
  WMKS.widgetProto.connect = function (a) {
    this.disconnect(), this._vncDecoder.connect(a), this.connectEvents()
  };
  WMKS.widgetProto.destroy = function () {
    this.disconnect(), this.element.removeClass("wmks"), this._touchHandler.destroy(), this._touchHandler = null, this._relativeMouseHandler.destroy(), this._relativeMouseHandler = null, this._canvas.remove(), this._video && this._video.remove(), this._backCanvas && this._backCanvas.remove(), this._blitTempCanvas && this._blitTempCanvas.remove(), $.Widget.prototype.destroy.call(this)
  };
  WMKS.widgetProto.requestElementReposition = function (a, b) {
    if (this._touchHandler) {
      if (b) {
        this._touchHandler.addToRepositionQueue(a);
        return
      }
      this._touchHandler.widgetRepositionOnRotation(a)
    }
  };
  WMKS.widgetProto.updateUserActivity = function () {
    this._trigger("useractivity", 0, $.now())
  };
  WMKS.widgetProto._create = function () {
    var a = this;
    this._mouseDownBMask = 0, this._mousePosGuest = {
      x: 0,
      y: 0
    }, this._scale = 1, this._pixelRatio = 1, this.connected = !1, this.isCanvasActive = !1, this._canvas = WMKS.UTIL.createCanvas(!0)
      .prop({
        id: "mainCanvas",
        tabindex: 1
      }), this._backCanvas = WMKS.UTIL.createCanvas(!0), this._blitTempCanvas = WMKS.UTIL.createCanvas(!0), this.element.addClass("wmks")
      .append(this._canvas), this.options.enableMP4 && (this._video = WMKS.UTIL.createVideo(!0), this.element.append(this._video));
    var b = function (b) {
      return typeof a._canvas[0].style[b] != "undefined" ? b : null
    };
    this.transform = b("transform") || b("WebkitTransform") || b("MozTransform") || b("msTransform") || b("OTransform"), this._vncDecoder = new WMKS.VNCDecoder({
      useVNCHandshake: this.options.useVNCHandshake,
      VCDProxyHandshakeVmxPath: this.options.VCDProxyHandshakeVmxPath,
      useUnicodeKeyboardInput: this.options.useUnicodeKeyboardInput,
      enableVorbisAudioClips: this.options.enableVorbisAudioClips,
      enableOpusAudioClips: this.options.enableOpusAudioClips,
      enableAacAudioClips: this.options.enableAacAudioClips,
      enableVVC: this.options.enableVVC,
      enableUint8Utf8: this.options.enableUint8Utf8,
      enableVMWSessionClose: this.options.enableVMWSessionClose,
      enableVMWAudioMixer: this.options.enableVMWAudioMixer,
      retryConnectionInterval: this.options.retryConnectionInterval,
      sendRelativeMouseEvent: this.options.sendRelativeMouseEvent,
      canvas: this._canvas[0],
      backCanvas: this._backCanvas[0],
      blitTempCanvas: this._blitTempCanvas[0],
      mediaPlayer: this.options.enableMP4 ? this._video[0] : null,
      enableRawH264: this.options.enableRawH264,
      enableTopologyChange: this.options.enableTopologyChange,
      enableH264Multimon: this.options.enableH264Multimon,
      onConnecting: function (b, c) {
        a._trigger("connecting", 0, {
          vvc: b,
          vvcSession: c
        })
      },
      onConnected: function () {
        a.connected = !0, a._trigger("connected"), a._keyboardManager.clearState(), a.rescaleOrResize(!0)
      },
      onBeforeDisconnected: function (b) {
        a._trigger("beforedisconnected", 0, b)
      },
      onDisconnected: function (b, c) {
        a.connected = !1, a._trigger("disconnected", 0, {
          reason: b,
          code: c
        })
      },
      onAuthenticationFailed: function () {
        a._trigger("authenticationFailed")
      },
      onError: function (b) {
        a._trigger("error", 0, b)
      },
      onProtocolError: function () {
        a._trigger("protocolError")
      },
      onNewDesktopSize: function (b, c) {
        a._guestWidth = b, a._guestHeight = c;
        var d: any = {
            width: b,
            height: c
          },
          e = {
            width: b / a._pixelRatio,
            height: c / a._pixelRatio
          };
        a._canvas.attr(d)
          .css(e), d.y = c, a._backCanvas.attr(d)
          .css(e), a._blitTempCanvas.attr(d)
          .css(e), a._video && a._video.attr(d)
          .css(e), a._trigger("resolutionchanged", null, d), a.rescaleOrResize(!1)
      },
      onEncodingChanged: function (b) {
        b === "TightPNG" && !a.isCanvasActive ? (WMKS.LOGGER.info("Activate canvas element since we use TightPNG encoding."), a.isCanvasActive = !0, a._video && a._video.hide(), a._canvas.show()) : b === "MP4" && a.isCanvasActive ? (WMKS.LOGGER.info("Activate video element since we use MP4 encoding."), a._video ? (a.isCanvasActive = !1, a._canvas.hide(), a._video.show()) : WMKS.LOGGER.error("Video element doesn't exist.")) : b === "RawH264" && a.isCanvasActive && WMKS.LOGGER.info("Activate video element since we use raw H264 encoding.")
      },
      onKeyboardLEDsChanged: function (b) {
        a._trigger("keyboardLEDsChanged", 0, b)
      },
      onCursorStateChanged: function (b) {
        a._touchHandler && a._touchHandler.setCursorVisibility(b)
      },
      onHeartbeat: function (b) {
        a._trigger("heartbeat", 0, b)
      },
      onUpdateCopyPasteUI: function (b, c) {
        var d = {
          noCopyUI: b,
          noPasteUI: c
        };
        a._trigger("updateCopyPasteUI", 0, d)
      },
      onCopy: function (b) {
        return typeof b != "string" ? (WMKS.LOGGER.debug("data format is not string, ignore."), !1) : (a._trigger("copy", 0, b), !0)
      },
      onSetReconnectToken: function (b) {
        a._trigger("reconnecttoken", 0, b)
      },
      onAudio: function (b) {
        a._trigger("audio", 0, [b])
      },
      onAudioMixer: function (b) {
        a._trigger("audiomixer", 0, b)
      }
    }), this._keyboardManager = new WMKS.KeyboardManager({
      vncDecoder: this._vncDecoder,
      ignoredRawKeyCodes: this.options.ignoredRawKeyCodes,
      fixANSIEquivalentKeys: this.options.fixANSIEquivalentKeys,
      mapMetaToCtrlForKeys: this.options.mapMetaToCtrlForKeys,
      enableWindowsKey: this.options.enableWindowsKey,
      keyboardLayoutId: this.options.keyboardLayoutId
    }), this._touchHandler = new WMKS.TouchHandler({
      widgetProto: this,
      canvas: this._canvas,
      keyboardManager: this._keyboardManager,
      onToggle: function (b) {
        a._trigger("toggle", 0, b)
      }
    }), this._relativeMouseHandler = new WMKS.RelativeMouseHandler({
      widgetProto: this,
      canvas: this._canvas,
      keyboardManager: this._keyboardManager,
      onToggle: function (b) {
        a._trigger("toggle", 0, b), a._setOption("sendRelativeMouseEvent", b[1]), a._relativeMouseHandler.setCursorVisibility(b[1])
      }
    }), this._updatePixelRatio(), this.updateFitGuestSize(), this._relativeMouseHandler.initializeRelativeMouseFeature(), this._updateMobileFeature(this.options.allowMobileKeyboardInput, WMKS.CONST.TOUCH.FEATURE.SoftKeyboard), this._updateMobileFeature(this.options.allowMobileTrackpad, WMKS.CONST.TOUCH.FEATURE.Trackpad), this._updateMobileFeature(this.options.allowMobileExtendedKeypad, WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad)
  };

  /**
   * The base controller of popup dialog.
   */
  (function() {
      'use strict';

      WMKS.dialogManager = function() {
        this.dialog = null;
        this.visible = false;
        this.lastToggleTime = 0;
        this.options = {
          name: 'DIALOG_MGR',     // Should be inherited.
          toggleCallback: function(name, toggleState) {},
          /*
           * The minimum wait time before toggle can repeat. This is useful to
           * ensure we do not toggle twice due to our usage of the close event.
           */
          minToggleTime: 50
        };
      };

      // Set value of the specified option.
      WMKS.dialogManager.prototype.setOption = function(key, value) {
        this.options[key] = value;

        return this;
      };

      // Set values of a set of options.
      WMKS.dialogManager.prototype.setOptions = function(options) {
        var key;

        for (key in options) {
          this.setOption(key, options[key]);
        }

        return this;
      };

      // Create the dialog and initialize it.
      WMKS.dialogManager.prototype.initialize = function(options) {
        this.options = $.extend({},
          this.options,
          options);

        this.dialog = this.create();
        this.init();
      };

      // Remove the dialog functionality completely.
      WMKS.dialogManager.prototype.destroy = function() {
        if (!!this.dialog) {
          this.disconnect();
          this.remove();
        }
      };

      // Construct the dialog.
      WMKS.dialogManager.prototype.create = function() {
        // For subclass to override.
        return null;
      };

      // Initialize the dialog, e.g. register event handlers.
      WMKS.dialogManager.prototype.init = function() {
        // For subclass to override.
      };

      // Cleanup data and events.
      WMKS.dialogManager.prototype.disconnect = function() {
        // For subclass to override.
      };

      // Destroy the dialog.
      WMKS.dialogManager.prototype.remove = function() {
        var dialog = this.dialog;

        if (!!dialog) {
          // Destroy the dialog and remove it from DOM.
          dialog
            .dialog('destroy')
            .remove();
        }
      };

      // Show / hide the dialog. If the options comes with a launcher element
      // then upon open / close, send an event to the launcher element.
      WMKS.dialogManager.prototype.toggle = function(options) {
        var dialog = this.dialog,
          show = !this.visible,
          isOpen;

        if (!dialog) {
          return;
        }

        if (!!options) {
          this.setOptions(options);
        }

        isOpen = dialog.dialog('isOpen');
        if (show === isOpen) {
          return;
        }

        if ($.now() - this.lastToggleTime < this.options.minToggleTime) {
          // WMKS.LOGGER.debug('Ignore toggle time.');
          return;
        }

        if (isOpen) {
          // Hide dialog.
          this.close();
        } else {
          // Show dialog.
          this.open();
        }
      };


      // Helper function to maintain the state of the widget and last toggle
      // time. If the toggleCallback option is set, we invoke a callback for the
      // state change (dialog state: open / close)
      WMKS.dialogManager.prototype.sendUpdatedState = function(state) {
        this.visible = state;
        this.lastToggleTime = $.now();

        // Triggers the callback event to toggle the selection.
        if ($.isFunction(this.options.toggleCallback)) {
          this.options.toggleCallback.call(this, [this.options.name, state]);
        }
      };


      // Show the dialog. Send update state.
      WMKS.dialogManager.prototype.open = function() {
        if (!!this.dialog) {
          this.visible = !this.visible;
          this.dialog.dialog('open');
          this.sendUpdatedState(true);
        }
      };


      // Hide the dialog. Send update state.
      WMKS.dialogManager.prototype.close = function() {
        if (!!this.dialog) {
          this.visible = !this.visible;
          this.dialog.dialog('close');
          this.sendUpdatedState(false);
        }
      };

    }());

  /**
   * The controller of extended keypad widget. This widget provides special
   * keys that are generally not found on soft keyboards on touch devices.
   *
   * Some of these keys include: Ctrl, Shift, Alt, Arrow keys, Page navigation
   * Win, function keys, etc.
   */
  (function() {
    'use strict';

    // Constructor of this class.
    WMKS.extendedKeypad = function(params) {
      if (!params || !params.widget || !params.keyboardManager) {
        return null;
      }

      // Call constructor so dialogManager's params are included here.
      WMKS.dialogManager.call(this);

      this._widget = params.widget;
      this._kbManager = params.keyboardManager;
      this._parentElement = params.parentElement;

      // Store down modifier keys.
      this.manualModifiers = [];

      $.extend(this.options,
        {
          name: 'EXTENDED_KEYPAD'
        });
      WMKS.LOGGER.warn('Key pad : ' + this.options.name);
    };

    // Inherit from dialogManager.
    WMKS.extendedKeypad.prototype = new WMKS.dialogManager();

    // This function creates the control pane dialog with the modifier
    // and extended keys.
    WMKS.extendedKeypad.prototype.create = function() {
      let self = this,
        ctrlPaneHolder = $('<div id="ctrlPanePopup"></div>');
      // Load the control pane popup with control icons and their key events.
      ctrlPaneHolder.append(this.getControlPaneHtml());

      // Initialize the popup for opening later.
      /*
       * Adding the show or hide effect makes the dialog not draggable on iOS 5.1
       * device. This could be a bug in Mobile Safari itself? For now we get rid
       * of the effects. TODO: Do a check of the iOS type and add the effects
       * back based on the version.
       */
      ctrlPaneHolder.dialog({
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        position: {my: 'center', at: 'center', of: this._parentElement},
        zIndex: 1000,
        dialogClass: 'ctrl-pane-wrapper',
        close: function(e) {
          /*
           * Clear all modifiers and the UI state so keys don't
           * stay 'down' when the ctrl pane is dismissed. PR: 983693
           * NOTE: Need to pass param as true to apply for softKB case.
           */
          self._kbManager.cancelModifiers(true);
          ctrlPaneHolder.find('.ab-modifier-key.ab-modifier-key-down')
            .removeClass('ab-modifier-key-down');

          // Hide the keypad.
          self.toggleFunctionKeys(false);
          self.sendUpdatedState(false);
          return true;
        },
        dragStop: function(e) {
          self.positionFunctionKeys();
        }
      });

      return ctrlPaneHolder;
    };

    // This function initializes the control pane dialog with the necessary
    // event listeners.
    WMKS.extendedKeypad.prototype.init = function() {
      let self = this,
        ctrlPaneHolder = this.dialog,
        keyInputHandler = function(e) {
          var key = parseInt($(this).attr('abkeycode'), 10);
          self._kbManager.handleSoftKb(key, false);
          return false;
        };


      // Initialize modifier key functionality.
      ctrlPaneHolder.find('.ab-modifier-key').on('touchstart', function(e) {
        // compute if key is pressed now.
        let isDown = $(this).hasClass('ab-modifier-key-down');
        let key = parseInt($(this).attr('abkeycode'), 10);
        if (isNaN(key)) {
          WMKS.LOGGER.debug('Got NaN as modifier key. Skipping it.');
          return false;
        }

        // Toggle highlight class for modifiers keys.
        $(this).toggleClass('ab-modifier-key-down');

        // Currently in down state, send isUp = true.
        self._kbManager.updateModifiers(key, isDown);
        return false;
      });

      // Toggle function keys also toggles the key highlighting.
      ctrlPaneHolder.find('#fnMasterKey').off('touchstart').on('touchstart', function(e) {
        self.toggleFunctionKeys();
        return false;
      });

      // Initialize extended key functionality.
      ctrlPaneHolder.find('.ab-extended-key').off('touchstart')
        .on('touchstart', keyInputHandler);

      // Provide a flip effect to the ctrl pane to show more keys.
      ctrlPaneHolder.find('.ab-flip').off('touchstart').on('touchstart', function() {
        $(this).parents('.flip-container').toggleClass('perform-flip');
        // Hide the keypad if its open.
        self.toggleFunctionKeys(false);
        return false;
      });

      // Add an id to the holder widget
      ctrlPaneHolder.parent().prop('id', 'ctrlPaneWidget');

      // Attach the function key pad to the canvas parent.
      ctrlPaneHolder.parent().parent().append(this.getFunctionKeyHtml());

      // Set up the function key events
      $('#fnKeyPad').find('.ab-extended-key').off('touchstart')
        .on('touchstart', keyInputHandler);

      // Handle orientation changes for ctrl pane & fnKeys.
      ctrlPaneHolder.parent().off('orientationchange.ctrlpane')
        .on('orientationchange.ctrlpane', function() {
          self._widget.requestElementReposition($(this));
          self.positionFunctionKeys();
        });
    };

    // Cleanup data and events for control pane dialog.
    WMKS.dialogManager.prototype.disconnect = function() {
      let ctrlPaneHolder = this.dialog;

      // Turn off all events.
      ctrlPaneHolder.find('#fnMasterKey').off('touchstart');
      ctrlPaneHolder.find('.ab-extended-key').off('touchstart');
      ctrlPaneHolder.find('.ab-flip').off('touchstart');

      ctrlPaneHolder.parent().off('orientationchange.ctrlpane');

      $('#fnKeyPad').find('.ab-extended-key').off('touchstart');

    };

    // Function to get the extended control keys layout.
    WMKS.extendedKeypad.prototype.getControlPaneHtml = function() {
      return '<div class="ctrl-pane flip-container">\
           <div class="flipper">\
              <div class="back">\
                 <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="36"><div>'
        + 'Home' + '</div></div>\
                  <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="38">\
                     <img class="touch-sprite up-arrow"/></div>\
                  <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="35"><div>'
        + 'End' + '</div></div>\
                  <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="27"><div>'
        + 'Esc' + '</div></div>\
                  <div class="ctrl-key-bottom-row ab-extended-key baseKey" abkeycode="37">\
                     <img class="touch-sprite left-arrow"/></div>\
                  <div class="ctrl-key-bottom-row ab-extended-key baseKey" abkeycode="40">\
                     <img class="touch-sprite down-arrow"/></div>\
                  <div class="ctrl-key-bottom-row ab-extended-key baseKey" abkeycode="39">\
                     <img class="touch-sprite right-arrow"/></div>\
                  <div class="ctrl-key-bottom-row ab-flip baseKey">\
                     <img class="touch-sprite more-keys"/></div>\
               </div>\
               <div class="front">\
                  <div class="ctrl-key-top-row ab-modifier-key baseKey" abkeycode="16"><div>'
        + 'Shift' + '</div></div>\
                  <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="46"><div>'
        + 'Del' + '</div></div>\
                  <div class="ctrl-key-top-row ab-extended-key baseKey" abkeycode="33"><div>'
        + 'PgUp' + '</div></div>\
                  <div id="fnMasterKey" class="ctrl-key-top-row baseKey">\
                     <div style="letter-spacing: -1px">'
        + 'F1-12' + '</div></div>\
                  <div class="ctrl-key-bottom-row ab-modifier-key baseKey" abkeycode="17"><div>'
        + 'Ctrl' + '</div></div>\
                  <div class="ctrl-key-bottom-row ab-modifier-key baseKey" abkeycode="18"><div>'
        + 'Alt' + '</div></div>\
                  <div class="ctrl-key-bottom-row ab-extended-key baseKey" abkeycode="34"><div>'
        + 'PgDn' + '</div></div>\
                  <div class="ctrl-key-bottom-row ab-flip baseKey">\
                     <img class="touch-sprite more-keys"/></div>\
               </div>\
            </div>\
         </div>';
    };

    // Function to get the extended functional keys layout.
    WMKS.extendedKeypad.prototype.getFunctionKeyHtml = function() {
      return'<div class="fnKey-pane-wrapper hide" id="fnKeyPad">\
            <div class="ctrl-pane">\
               <div class="key-group up-position">\
                 <div class="border-key-top-left">\
                    <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="112"><div>F1</div></div>\
                 </div>\
                 <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="113"><div>F2</div></div>\
                 <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="114"><div>F3</div></div>\
                 <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="115"><div>F4</div></div>\
                 <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="116"><div>F5</div></div>\
                 <div class="border-key-top-right">\
                    <div class="fn-key-top-row ab-extended-key baseKey" abkeycode="117"><div>F6</div></div>\
                 </div>\
                 <div class="border-key-bottom-left">\
                    <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="118"><div>F7</div></div>\
                 </div>\
                 <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="119"><div>F8</div></div>\
                 <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="120"><div>F9</div></div>\
                 <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="121"><div>F10</div></div>\
                 <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="122"><div>F11</div></div>\
                 <div class="border-key-bottom-right">\
                    <div class="fn-key-bottom-row ab-extended-key baseKey" abkeycode="123"><div>F12</div></div>\
                 </div>\
              </div>\
           </div>\
           <div class="fnKey-inner-border-helper" id="fnKeyInnerBorder"></div>\
        </div>';
    };

    // Must be called after onDocumentReady. We go through all the objects in
    // the DOM with the keyboard icon classes, and bind them to listeners which
    // process them.Must be called after onDocumentReady. We go through all the objects in
    // the DOM with the keyboard icon classes, and bind them to listeners which
    // process them.Must be called after onDocumentReady. We go through all the objects in
    // the DOM with the keyboard icon classes, and bind them to listeners which
    // process them.
    WMKS.extendedKeypad.prototype.toggleCtrlPane = function() {
      let ctrlPane = this.dialog;
      // Toggle ctrlPage widget.
      if (ctrlPane.dialog('isOpen')) {
        ctrlPane.dialog('close');
      } else {
        ctrlPane.dialog('open');
      }
    };

    // Toggle the function key pad between show / hide. Upon show, position the
    // function keys to align with the ctrlPane. It also manages the
    // highlighting state for the function key master.
    // show - true indicates display function keys, false indicates otherwise.
    WMKS.extendedKeypad.prototype.toggleFunctionKeys = function(show) {
      let fnKeyPad = $('#fnKeyPad');
      let showFunctionKeys = (show || (typeof show === 'undefined' && !fnKeyPad.is(':visible')));

      // Toggle the function key pad.
      fnKeyPad.toggle(showFunctionKeys);

      // Show / Hide the masterKey highlighting
      $('#fnMasterKey').toggleClass('ab-modifier-key-down', showFunctionKeys);

      // Position only if it should be shown.
      this.positionFunctionKeys();
    };

    // Position the function keys div relative to the ctrl pane. This function
    // is invoked upon orientation change or when the widget is shows.
    WMKS.extendedKeypad.prototype.positionFunctionKeys = function() {
      let fnKeys = $('#fnKeyPad');
      let crtlPaneWidget = $('#ctrlPaneWidget');
      // Place the function key if it's now visible
      if (fnKeys.is(':visible')) {
        /*
         * Align the bottom left corner of the function key pad
         * with the top left corner of the control pane widget.
         * If not enough room, flip to the other side.
         */
        fnKeys.position({
          my:        'right bottom',
          at:        'right top',
          of:        crtlPaneWidget,
          collision: 'flip'
        });

        // Adjust the inner border div size so it won't overlap with the outer border
        $('#fnKeyInnerBorder').height(fnKeys.height()-2).width(fnKeys.width()-2);

        // Check if the function key has been flipped. If so, use the down-style
        let fnKeyBottom = fnKeys.offset().top + fnKeys.height();
        let isAbove = (fnKeyBottom <= crtlPaneWidget.offset().top + crtlPaneWidget.height());
        this.adjustFunctionKeyStyle(isAbove);

        // Move the function key above the ctrl key pane when shown below, and under if shown above
        let targetZOrder;
        if (isAbove) {
          targetZOrder =  parseInt(crtlPaneWidget.css('z-index'), 10) - 1;
          // Use different color for the inner border depending on the position
          $('#fnKeyInnerBorder').css('border-color', '#d5d5d5');
        } else {
          targetZOrder =  parseInt($('#ctrlPaneWidget').css('z-index'), 10) + 1;
          $('#fnKeyInnerBorder').css('border-color', '#aaa');
        }

        fnKeys.css('z-index', targetZOrder.toString());
      }
      return true;
    };

    // Helper function to adjust the functional key pad CSS based on the position
    WMKS.extendedKeypad.prototype.adjustFunctionKeyStyle = function (isAbove) {
      let fnKeys = $('#fnKeyPad');
      let keyGroup = fnKeys.find('.key-group');
      if (isAbove) {
        // Check if the "down" classes are being used. If so switch to "up" classes.
        if (keyGroup.hasClass('down-position')) {
          keyGroup.removeClass('down-position');
          keyGroup.addClass('up-position');

          fnKeys.removeClass('fnKey-pane-wrapper-down');
          fnKeys.addClass('fnKey-pane-wrapper');
        }
      } else {
        // Check if the "up" classes are being used. If so switch to "down" classes.
        if (keyGroup.hasClass('up-position')) {
          keyGroup.removeClass('up-position');
          keyGroup.addClass('down-position');

          fnKeys.removeClass('fnKey-pane-wrapper');
          fnKeys.addClass('fnKey-pane-wrapper-down');
        }
      }
    };

  }());

  /**
   * The controller of trackpad widget.
   */
  (function() {
    'use strict';

    // Trackpad related constants.
    WMKS.CONST.TRACKPAD = {
      STATE: {
        idle:         0,
        tap:          1,
        tap_2finger:  2,
        drag:         3,
        scroll:       4
      }
    };

    WMKS.trackpadManager = function(widget, canvas) {

      // Call constructor so dialogManager's params are included here.
      WMKS.dialogManager.call(this);

      this._widget = widget;
      this._canvas = canvas;

      // Initialize cursor state.
      this._cursorPosGuest = {x : 0, y : 0};
      // Timer
      this._dragTimer = null;
      // Dragging is started by long tap or not.
      this._dragStartedByLongTap = false;
      // Trackpad state machine.
      this.state = WMKS.CONST.TRACKPAD.STATE.idle;
      this.history = [];
      // Override default options with options here.
      $.extend(this.options,
        {
          name: 'TRACKPAD',
          speedControlMinMovePx: 5,
          // Speed control for trackpad and two finger scroll
          accelerator:           10,
          minSpeed:              1,
          maxSpeed:              10
        });
      WMKS.LOGGER.warn('trackpad : ' + this.options.name);
    };

    WMKS.trackpadManager.prototype =  new WMKS.dialogManager();

    //Function to get the trackpad html layout.
    WMKS.trackpadManager.prototype.getTrackpadHtml = function() {
      return '<div id="trackpad" class="trackpad-container">\
                   <div class="left-border"></div>\
                   <div id="trackpadSurface" class="touch-area"></div>\
                   <div class="right-border"></div>\
                   <div class="bottom-border">\
                      <div class="button-container">\
                         <div id="trackpadLeft" class="button-left"></div>\
                         <div id="trackpadRight" class="button-right"></div>\
                      </div>\
                   </div>\
               </div>';
    };


    // This function initializes the trackpad dialog, toggle highlighting on close
    // handler.
    WMKS.trackpadManager.prototype.create = function() {
      let dialog;
      let self = this;

      if (!this._widget ||
        !this._canvas) {
        WMKS.LOGGER.debug('Trackpad dialog creation has been aborted. Widget or Canvas is not ready.');
        return null;
      }

      dialog = $(this.getTrackpadHtml());
      dialog.dialog({
        autoOpen: false,
        closeOnEscape: true,
        resizable: false,
        position: {my: 'center', at: 'center', of: this._canvas},
        zIndex: 1000,
        draggable: true,
        dialogClass: 'trackpad-wrapper',
        close: function(e) {
          self.sendUpdatedState(false);
        },
        create: function(e) {
          self.layout($(this).parent());
        }
      });

      return dialog;
    };

    // This function initializes the event handlers for the trackpad.
    WMKS.trackpadManager.prototype.init = function() {
      let dialog = this.dialog;
      let self = this;
      let trackpad;
      let left;
      let right;

      if (!dialog) {
        WMKS.LOGGER.debug('Trackpad init aborted. Dialog is not created successfully.');
        return;
      }

      // Request reposition of trackpad dialog upon orientation changes.
      this._widget.requestElementReposition(dialog.parent(), true);

      // Initialize event handlers for the trackpad.
      trackpad = dialog
        .find('#trackpadSurface')
        .on('touchstart', function(e) {
          return self.trackpadTouchStart(e.originalEvent);
        })
        .on('touchmove', function(e) {
          return self.trackpadTouchMove(e.originalEvent);
        })
        .on('touchend', function(e) {
          return self.trackpadTouchEnd(e.originalEvent);
        });

      left = dialog
        .find('#trackpadLeft')
        .on('touchstart', function(e) {
          return self.trackpadClickStart(e, WMKS.CONST.CLICK.left);
        })
        .on('touchend', function(e) {
          return self.trackpadClickEnd(e, WMKS.CONST.CLICK.left);
        });

      right = dialog
        .find('#trackpadRight')
        .on('touchstart', function(e) {
          return self.trackpadClickStart(e, WMKS.CONST.CLICK.right);
        })
        .on('touchend', function(e) {
          return self.trackpadClickEnd(e, WMKS.CONST.CLICK.right);
        });
    };

    // This function unbinds the event handlers for the trackpad.
    WMKS.trackpadManager.prototype.disconnect = function() {
      let dialog = this.dialog;
      let trackpad;
      let left;
      let right;

      if (!dialog) {
        return;
      }

      // Unregister event handlers for the trackpad.
      trackpad = dialog
        .find('#trackpadSurface')
        .off('touchmove')
        .off('touchstart')
        .off('touchend');

      left = dialog
        .find('#trackpadLeft')
        .off('touchstart')
        .off('touchend');

      right = dialog
        .find('#trackpadRight')
        .off('touchstart')
        .off('touchend');
    };

    // Reposition the dialog in order to center it to the canvas.
    WMKS.trackpadManager.prototype.layout = function(dialog) {
      let canvas = this._canvas;
      let dialogParent;
      let canvasParent;

      if (!dialog ||
        !canvas) {
        return;
      }

      dialogParent = dialog.parent();
      canvasParent = canvas.parent();

      if (dialogParent !== canvasParent) {
        // Append the dialog to the parent of the canvas,
        // so that it's able to center the dialog to the canvas.
        canvasParent.append(dialog);
      }
    };

    // Fires when either one of the virtual trackpad's buttons are clicked. Sends
    // a mousedown operation and adds the button highlight.
    WMKS.trackpadManager.prototype.trackpadClickStart = function(e, buttonClick) {
      if (buttonClick !== WMKS.CONST.CLICK.left &&
        buttonClick !== WMKS.CONST.CLICK.right) {
        WMKS.LOGGER.debug('assert: unknown button ' + buttonClick);
        return false;
      }

      // Highlight click button.
      $(e.target).addClass('button-highlight');

      // Sends a mousedown message.
      this._widget.sendMouseButtonMessage(this.getMousePosition(), true, buttonClick);
      return false;
    };

    // Fires when either one of the virtual trackpad's buttons are released.
    // Sends a mouseup operation and removes the highlight on the button.
    WMKS.trackpadManager.prototype.trackpadClickEnd = function(e, buttonClick) {
      if (buttonClick !== WMKS.CONST.CLICK.left &&
        buttonClick !== WMKS.CONST.CLICK.right) {
        WMKS.LOGGER.debug('assert: unknown button ' + buttonClick);
        return false;
      }

      // Remove highlight.
      $(e.target).removeClass('button-highlight');

      // Sends a mouseup message.
      this._widget.sendMouseButtonMessage(this.getMousePosition(), false, buttonClick);
      return false;
    };

    // Based on a current point and point history, gets the amount of distance
    // the mouse should move based on this data.
    WMKS.trackpadManager.prototype.computeMovingDistance = function(x, y) {
      let dx, dy, dist, speed;

      dx = this.getTrackpadSpeed(x,
        this.history[0].x,
        this.history[1].x,
        this.history[2].x);
      dy = this.getTrackpadSpeed(y,
        this.history[0].y,
        this.history[1].y,
        this.history[2].y);

      dist = WMKS.UTIL.getLineLength(dx, dy);

      speed = dist * this.options.accelerator;
      if (speed > this.options.maxSpeed) {
        speed = this.options.maxSpeed;
      } else if (speed < this.options.minSpeed) {
        speed = this.options.minSpeed;
      }

      return [dx * speed, dy * speed];
    };

    // Performs a linear least squares operation to get the slope of the line
    // that best fits all four points. This slope is the current speed of the
    // trackpad, assuming equal time between samples.
    WMKS.trackpadManager.prototype.getTrackpadSpeed = function(x0, x1, x2, x3) {
      return x0 * 0.3 + x1 * 0.1 - x2 * 0.1 - x3 * 0.3;
    };

    // Fires when a finger lands on the trackpad's touch area. Depending on the
    // number of touch fingers, assign the initial tap state. Subsequently
    // ontouchmove event we promote tap --> drag, tap_2finger --> scroll.
    // If the state was tap / tap_2finger, then its the default click event.
    WMKS.trackpadManager.prototype.trackpadTouchStart = function(e) {
      let self = this;

      if (e.targetTouches.length > 2) {
        // Dis-allow a third finger touchstart to reset scroll state.
        if (this.state === WMKS.CONST.TRACKPAD.STATE.scroll) {
          WMKS.LOGGER.debug('Ignore new touchstart, currently scrolling, touch#: '
            + e.targetTouches.length);
        } else {
          WMKS.LOGGER.debug('Aborting touch, too many fingers #: ' + e.targetTouches.length);
          this.resetTrackpadState();
        }
      } else if (e.targetTouches.length === 2) {
        // Could be a scroll. Store first finger location.
        this.state = WMKS.CONST.TRACKPAD.STATE.tap_2finger;
      } else {
        this.state = WMKS.CONST.TRACKPAD.STATE.tap;

        // ontouchmove destroys this timer. The finger must stay put.
        if (this._dragTimer !== null) {
          clearTimeout(this._dragTimer);
          this._dragTimer = null;
        }

        this._dragTimer = setTimeout(function() {
          self._dragTimer = null;

          // Send the left mousedown at the location.
          self._widget.sendMouseButtonMessage(self.getMousePosition(), true, WMKS.CONST.CLICK.left);
          self._dragStartedByLongTap = true;
        }, WMKS.CONST.TOUCH.leftDragDelayMs);
      }
      return false;
    };

    // Fires when a finger moves within the trackpad's touch area. If the touch
    // action is currently marked as a tap, promotes it into a drag or
    // if it was a tap_2finger, promote to a scroll. If it is already one or
    // the other, stick to that type.
    //
    // However, if the touch moves outside the area while dragging, then set the
    // state back to the tap and clear up history in case user comes back into
    // the hot region.
    WMKS.trackpadManager.prototype.trackpadTouchMove = function(e) {
      let pX;
      let pY;
      let newLocation;
      let self = $(e.target);
      let widget = this._widget;

      // Reset the drag timer if there is one.
      if (this._dragTimer !== null) {
        clearTimeout(this._dragTimer);
        this._dragTimer = null;
      }

      if (this.state === WMKS.CONST.TRACKPAD.STATE.idle) {
        return false;
      }

      pX = e.targetTouches[0].pageX;
      pY = e.targetTouches[0].pageY;
      // Verify if the touchmove is outside business (hot) region of trackpad.
      if (pY < self.offset().top || pY > (self.offset().top + self.height()) ||
        pX < self.offset().left || pX > (self.offset().left + self.width())) {
        // Reset to tap start state, as the user went outside the business region.
        if (this.state === WMKS.CONST.TRACKPAD.STATE.drag) {
          // Send mouse up event if drag is started by long tap.
          if (this._dragStartedByLongTap) {
            widget.sendMouseButtonMessage(this.getMousePosition(), false, WMKS.CONST.CLICK.left);
          }
          this.state = WMKS.CONST.TRACKPAD.STATE.tap;
          this.history.length = 0;
        }
        return false;
      }

      if (this.state === WMKS.CONST.TRACKPAD.STATE.drag) {
        newLocation = this.computeNewCursorLocation(pX, pY);

        // Perform the actual move update by sending the corresponding message.
        if (!!widget._touchHandler) {
          widget._touchHandler.moveCursor(newLocation.x, newLocation.y);
        }
        widget.sendMouseMoveMessage(newLocation);
        // WMKS.LOGGER.debug('new loc: ' + newLocation.x + ',' + newLocation.y);

        // Make room for a new history entry
        this.history.shift();

        // Push a new history entry
        this.history.push({x: pX, y: pY });
      } else if (this.state === WMKS.CONST.TRACKPAD.STATE.scroll) {
        // Sends the mouse scroll message.
        this.sendScrollMessageFromTrackpad(e.targetTouches[0]);
      }

      // Detect if this is a drag or a scroll. If so, add a history entry.
      if (this.state === WMKS.CONST.TRACKPAD.STATE.tap) {
        this.state = WMKS.CONST.TRACKPAD.STATE.drag;
        // Make up history based on the current point if there isn't any yet.
        this.history.push({x: pX, y: pY}, {x: pX, y: pY}, {x: pX, y: pY});
      } else if (this.state === WMKS.CONST.TRACKPAD.STATE.tap_2finger
        && e.targetTouches.length === 2) {
        this.state = WMKS.CONST.TRACKPAD.STATE.scroll;
        // Create a history entry based on the current point if there isn't any yet.
        this.history[0] = {x: pX, y: pY};
      }
      return false;
    };

    // This function takes the new location and computes the destination mouse
    // cursor location. The computation is based on the acceleration to be used,
    // making sure the new location is within the screen area.
    WMKS.trackpadManager.prototype.computeNewCursorLocation = function(pX, pY) {
      let dist;
      let point = this.getMousePosition();

      // First compute the distance from the last location.
      dist = WMKS.UTIL.getLineLength(
        (pX - this.history[2].x), (pY - this.history[2].y));
      if (isNaN(dist) || dist === 0) {
        // There is no change, return the old location.
        return point;
      } else if (dist < this.options.speedControlMinMovePx) {
        // The cursor has only moved a few pixels, apply the delta directly.
        point.x += (pX - this.history[2].x);
        point.y += (pY - this.history[2].y);
      } else {
        // From now on, though, use device pixels (later, compensate for hi-DPI)
        dist = this.computeMovingDistance(pX, pY);
        point.x += Math.floor(dist[0]);
        point.y += Math.floor(dist[1]);
      }

      return this._widget.getCanvasPosition(point.x, point.y);
    };

    // Fires when a finger lifts off the trackpad's touch area. If the touch
    // action is currently marked as a tap, sends off the mousedown and mouseup
    // operations. Otherwise, simply resets the touch state machine.
    WMKS.trackpadManager.prototype.trackpadTouchEnd = function(e) {
      let pos;

      // Reset the drag timer if there is one.
      if (this._dragTimer !== null) {
        clearTimeout(this._dragTimer);
        this._dragTimer = null;
      }

      if (e.targetTouches.length !== 0 ||
        this.state === WMKS.CONST.TRACKPAD.STATE.idle) {
        return false;
      }

      pos = this.getMousePosition();
      if (this.state === WMKS.CONST.TRACKPAD.STATE.tap) {
        // Send mousedown & mouseup together
        this._widget.sendMouseButtonMessage(pos, true, WMKS.CONST.CLICK.left);
        this._widget.sendMouseButtonMessage(pos, false, WMKS.CONST.CLICK.left);
      } else if (this.state === WMKS.CONST.TRACKPAD.STATE.tap_2finger) {
        // Send right-click's mousedown & mouseup together.
        this._widget.sendMouseButtonMessage(pos, true, WMKS.CONST.CLICK.right);
        this._widget.sendMouseButtonMessage(pos, false, WMKS.CONST.CLICK.right);
      } else if (this.state === WMKS.CONST.TRACKPAD.STATE.drag && this._dragStartedByLongTap) {
        this._widget.sendMouseButtonMessage(pos, false, WMKS.CONST.CLICK.left);
      }

      this.resetTrackpadState();
      return false;
    };

    //Resets the virtual trackpad's state machine.
    WMKS.trackpadManager.prototype.resetTrackpadState = function() {
      this.state = WMKS.CONST.TRACKPAD.STATE.idle;
      this.history.length = 0;
      this._dragStartedByLongTap = false
    };

    //This function is similar to the sendScrollEventMessage() used for scrolling
    // outside the trackpad. The state machine is managed differently and hence
    // the separate function.
    //
    // Check if the scroll distance is above the minimum threshold, if so, send
    // the scroll. And upon sending it, update the history with the last scroll
    // sent location.
    WMKS.trackpadManager.prototype.sendScrollMessageFromTrackpad = function(curLocation) {
      // This is a two finger scroll, are we going up or down?
      let dx = 0,
        dy = 0,
        deltaX,
        deltaY,
        wheelDeltas,
        firstPos;

      deltaX = curLocation.pageX - this.history[0].x;
      deltaY = curLocation.pageY - this.history[0].y;

      if (!!this._widget._touchHandler) {
        wheelDeltas = this._widget._touchHandler._calculateMouseWheelDeltas(deltaX, deltaY);
        dx = wheelDeltas.wheelDeltaX;
        dy = wheelDeltas.wheelDeltaY;
      }

      // Only send if at least one of the deltas has a value.
      if (dx !== 0 || dy !== 0) {
        this._widget.sendScrollMessage(this.getMousePosition(), dx, dy);

        if (dx !== 0) {
          this.history[0].x = curLocation.pageX;
        }

        if (dy !== 0) {
          this.history[0].y = curLocation.pageY;
        }
      }
    };

    // Get the current position of the mouse cursor.
    WMKS.trackpadManager.prototype.getMousePosition = function() {
      let pos = this._widget._mousePosGuest;

      if (pos.x === 0 && pos.y === 0) {
        // If mouse position is not specified, the current cursor position is used.
        if (this._cursorPosGuest.x !== pos.x || this._cursorPosGuest.y !== pos.y) {
          // Send mousemove message and update state.
          pos = this._cursorPosGuest;
          this._widget.sendMouseMoveMessage(pos);
        }
      } else {
        // Mark current cursor position.
        this._cursorPosGuest = pos;
      }

      return pos;
    };

  }());

  /**
   * A useful class for reading and writing binary data to and from a Uint8Array
   */
  WMKS.Packet = function (buffer, length, byteOrder) {
    /**
     * The length of the packet.
     * @type {Number}
     */
    this.length = length;

    /**
     * The internal buffer.
     * @private
     * @type {Uint8Array}
     */
    this._buffer = buffer;

    /**
     * The current read position of the buffer.
     * @private
     * @type {Number}
     */
    this._readPosition = 0;

    /**
     * The byte order of words in the buffer.
     * @private
     * @type {Number}
     */
    this._byteOrder = byteOrder || WMKS.Packet.BYTE_ORDER.NETWORK_ORDER;

    if (this._byteOrder == WMKS.Packet.BYTE_ORDER.LITTLE_ENDIAN) {
      this.setInt16 = this.setInt16le;
      this.setInt32 = this.setInt32le;
      this.setUint16 = this.setUint16le;
      this.setUint32 = this.setUint32le;
      this.getInt16 = this.getInt16le;
      this.getInt32 = this.getInt32le;
      this.getUint16 = this.getUint16le;
      this.getUint32 = this.getUint32le;
    } else if (this._byteOrder == WMKS.Packet.BYTE_ORDER.BIG_ENDIAN) {
      this.setInt16 = this.setInt16be;
      this.setInt32 = this.setInt32be;
      this.setUint16 = this.setUint16be;
      this.setUint32 = this.setUint32be;
      this.getInt16 = this.getInt16be;
      this.getInt32 = this.getInt32be;
      this.getUint16 = this.getUint16be;
      this.getUint32 = this.getUint32be;
    }
  };

  WMKS.Packet.BYTE_ORDER = {
    LITTLE_ENDIAN: 1,
    BIG_ENDIAN: 2,
    NETWORK_ORDER: 2
  };

  WMKS.Packet.createNewPacket = function (size, byteOrder) {
    size = size || 512;
    return new WMKS.Packet(new Uint8Array(size), 0, byteOrder);
  };

  WMKS.Packet.createFromBuffer = function (buffer, byteOrder) {
    if (buffer instanceof ArrayBuffer) {
      buffer = new Uint8Array(buffer);
    } else if (!(buffer instanceof Uint8Array)) {
      return null;
    }

    return new WMKS.Packet(buffer, buffer.length, byteOrder);
  };

  WMKS.Packet.createNewPacketBE = function (size) {
    return WMKS.Packet.createNewPacket(size, WMKS.Packet.BYTE_ORDER.BIG_ENDIAN);
  };

  WMKS.Packet.createNewPacketLE = function (size) {
    return WMKS.Packet.createNewPacket(size, WMKS.Packet.BYTE_ORDER.LITTLE_ENDIAN);
  };

  WMKS.Packet.createFromBufferBE = function (buffer) {
    return WMKS.Packet.createFromBuffer(buffer, WMKS.Packet.BYTE_ORDER.BIG_ENDIAN);

  };

  WMKS.Packet.createFromBufferLE = function (buffer) {
    return WMKS.Packet.createFromBuffer(buffer, WMKS.Packet.BYTE_ORDER.LITTLE_ENDIAN);
  };

  WMKS.Packet.prototype.reset = function () {
    this.length = 0;
    this._readPosition = 0;
  };

  WMKS.Packet.prototype.getData = function () {
    return this._buffer.subarray(0, this.length);
  };

  WMKS.Packet.prototype.bytesRemaining = function () {
    return this.length - this._readPosition;
  };

  WMKS.Packet.prototype.getDataAsArrayBuffer = function () {
    return this._buffer.buffer.slice(this._buffer.byteOffset, this._buffer.byteOffset + this.length);
  };

  WMKS.Packet.prototype.writeUint8 = function (value) {
    this._ensureWriteableBytes(1);
    this.setUint8(this.length, value);
    this.length += 1;
  };

  WMKS.Packet.prototype.writeUint16 = function (value) {
    this._ensureWriteableBytes(2);
    this.setUint16(this.length, value);
    this.length += 2;
  };

  WMKS.Packet.prototype.writeUint32 = function (value) {
    this._ensureWriteableBytes(4);
    this.setUint32(this.length, value);
    this.length += 4;
  };

  WMKS.Packet.prototype.writeInt8 = function (value) {
    this._ensureWriteableBytes(1);
    this.setInt8(this.length, value);
    this.length += 1;
  };

  WMKS.Packet.prototype.writeInt16 = function (value) {
    this._ensureWriteableBytes(2);
    this.setInt16(this.length, value);
    this.length += 2;
  };

  WMKS.Packet.prototype.writeInt32 = function (value) {
    this._ensureWriteableBytes(4);
    this.setInt32(this.length, value);
    this.length += 4;
  };

  WMKS.Packet.prototype.writeStringASCII = function (value) {
    var i;
    this._ensureWriteableBytes(value.length);

    for (i = 0; i < value.length; ++i) {
      this.setUint8(this.length++, value.charCodeAt(i));
    }
  };

  WMKS.Packet.prototype.writeArray = function (value) {
    if (value && value.length) {
      this._ensureWriteableBytes(value.length);
      this._buffer.set(value, this.length);
      this.length += value.length;
    }
  };

  WMKS.Packet.prototype.readUint8 = function () {
    let value;

    if (this._checkReadableBytes(1)) {
      value = this.getUint8(this._readPosition);
      this._readPosition += 1;
    }

    return value;
  };

  WMKS.Packet.prototype.readUint16 = function () {
    let value;

    if (this._checkReadableBytes(2)) {
      value = this.getUint16(this._readPosition);
      this._readPosition += 2;
    }

    return value;
  };

  WMKS.Packet.prototype.readUint32 = function () {
    let value;

    if (this._checkReadableBytes(4)) {
      value = this.getUint32(this._readPosition);
      this._readPosition += 4;
    }

    return value;
  };

  WMKS.Packet.prototype.readInt8 = function () {
    let value;

    if (this._checkReadableBytes(1)) {
      value = this.getInt8(this._readPosition);
      this._readPosition += 1;
    }

    return value;
  };

  WMKS.Packet.prototype.readInt16 = function () {
    let value;

    if (this._checkReadableBytes(2)) {
      value = this.getInt16(this._readPosition);
      this._readPosition += 2;
    }

    return value;
  };

  WMKS.Packet.prototype.readInt32 = function () {
    let value;

    if (this._checkReadableBytes(4)) {
      value = this.getInt32(this._readPosition);
      this._readPosition += 4;
    }

    return value;
  };

  WMKS.Packet.prototype.readArray = function (length) {
    let value;

    if (this._checkReadableBytes(length)) {
      if (length === 0) {
        value = null;
      } else {
        value = this.getArray(this._readPosition, length);
        this._readPosition += length;
      }
    }

    return value;
  };

  WMKS.Packet.prototype.readStringASCII = function (length) {
    let value = this.readArray(length);

    if (value) {
      value = String.fromCharCode.apply(String, value);
    }

    return value;
  };

  WMKS.Packet.prototype.setUint8 = function (position, value) {
    this._buffer[position] = value & 0xff;
  };

  WMKS.Packet.prototype.setUint16be = function (position, value) {
    this._buffer[position + 1] = value & 0xff;
    this._buffer[position + 0] = (value >> 8) & 0xff;
  };

  WMKS.Packet.prototype.setUint32be = function (position, value) {
    this._buffer[position + 3] = value & 0xff;
    this._buffer[position + 2] = (value >> 8) & 0xff;
    this._buffer[position + 1] = (value >> 16) & 0xff;
    this._buffer[position + 0] = (value >> 24) & 0xff;
  };

  WMKS.Packet.prototype.setUint16le = function (position, value) {
    this._buffer[position + 0] = value & 0xff;
    this._buffer[position + 1] = (value >> 8) & 0xff;
  };

  WMKS.Packet.prototype.setUint32le = function (position, value) {
    this._buffer[position + 0] = value & 0xff;
    this._buffer[position + 1] = (value >> 8) & 0xff;
    this._buffer[position + 2] = (value >> 16) & 0xff;
    this._buffer[position + 3] = (value >> 24) & 0xff;
  };

  WMKS.Packet.prototype.setInt8 = function (position, value) {
    return this.setUint8(position, value);
  };

  WMKS.Packet.prototype.setInt16be = function (position, value) {
    return this.setUint16be(position, value);
  };

  WMKS.Packet.prototype.setInt32be = function (position, value) {
    return this.setUint32be(position, value);
  };

  WMKS.Packet.prototype.setInt16le = function (position, value) {
    return this.setUint16le(position, value);
  };

  WMKS.Packet.prototype.setInt32le = function (position, value) {
    return this.setUint32le(position, value);
  };

  WMKS.Packet.prototype.getArray = function (start, length) {
    return this._buffer.subarray(start, start + length);
  };

  WMKS.Packet.prototype.getInt8 = function (position) {
    let value = this._buffer[position];

    if (value & 0x80) {
      value = value - 0xff - 1;
    }

    return value;
  };

  WMKS.Packet.prototype.getInt16be = function (position) {
    let value;
    value  = this._buffer[position + 1];
    value |= this._buffer[position + 0] << 8;

    if (value & 0x8000) {
      value = value - 0xffff - 1;
    }

    return value;
  };

  WMKS.Packet.prototype.getInt32be = function (position) {
    var value;
    value  = this._buffer[position + 3];
    value |= this._buffer[position + 2] << 8;
    value |= this._buffer[position + 1] << 16;
    value |= this._buffer[position + 0] << 24;
    return value;
  };

  WMKS.Packet.prototype.getInt16le = function (position) {
    let value;
    value  = this._buffer[position + 0];
    value |= this._buffer[position + 1] << 8;

    if (value & 0x8000) {
      value = value - 0xffff - 1;
    }

    return value;
  };

  WMKS.Packet.prototype.getInt32le = function (position) {
    let value;
    value  = this._buffer[position + 0];
    value |= this._buffer[position + 1] << 8;
    value |= this._buffer[position + 2] << 16;
    value |= this._buffer[position + 3] << 24;
    return value;
  };

  WMKS.Packet.prototype.getUint8 = function (position) {
    let value = this._buffer[position];
    return value;
  };

  WMKS.Packet.prototype.getUint16be = function (position) {
    let value;
    value  = this._buffer[position + 1];
    value |= this._buffer[position + 0] << 8;
    return value;
  };

  WMKS.Packet.prototype.getUint32be = function (position) {
    let value;
    value  = this._buffer[position + 3];
    value |= this._buffer[position + 2] << 8;
    value |= this._buffer[position + 1] << 16;
    value |= this._buffer[position + 0] << 24;

    if (value < 0) {
      value = 0xffffffff + value + 1;
    }

    return value;
  };

  WMKS.Packet.prototype.getUint16le = function (position) {
    let value;
    value  = this._buffer[position + 0];
    value |= this._buffer[position + 1] << 8;
    return value;
  };

  WMKS.Packet.prototype.getUint32le = function (position) {
    let value;
    value  = this._buffer[position + 0];
    value |= this._buffer[position + 1] << 8;
    value |= this._buffer[position + 2] << 16;
    value |= this._buffer[position + 3] << 24;

    if (value < 0) {
      value = 0xffffffff + value + 1;
    }

    return value;
  };

  WMKS.Packet.prototype._resizeBuffer = function (size) {
    if (size > 0) {
      var buffer = new Uint8Array(size);
      buffer.set(this._buffer);
      this._buffer = buffer;
    }
  };

  WMKS.Packet.prototype._ensureWriteableBytes = function (length) {
    if (length > 0) {
      var reqLength = this.length + length;
      var newLength = this._buffer.length;

      while (newLength < reqLength) {
        newLength = Math.floor(newLength * 1.5);
      }

      if (newLength > this._buffer.length) {
        this._resizeBuffer(newLength);
      }
    }
  };

  WMKS.Packet.prototype._checkReadableBytes = function (length) {
    return this._readPosition + length <= this.length;
  };

  /**
   * Creates a new VVC instance.
   */
  let VVC: any = () => {
    this._sessions = [];
    this._listeners = [];
    this._lastError = null;

    return this;
  };

  VVC.ENABLE_PROBE_CHANNEL = 1;
  VVC.MAJOR_VER = 3;
  VVC.MINOR_VER = 0;
  VVC.SUPPORTED_VER = [
    {
      MAJOR: 2,
      MINOR: 0,
      FLAGS: 0
    },
    {
      MAJOR: 1,
      MINOR: 0,
      FLAGS: 0
    }
  ];
  VVC.CAPS_V10_1 = 0;
  VVC.CAPS_V10_2 = 0;
  VVC.ALL_SESSIONS = -1;
  VVC.RTT_HISTORY_SIZE = 30;
  VVC.MIN_CHANNEL_NAME_LEN = 1;
  VVC.MAX_CHANNEL_NAME_LEN = 255;
  VVC.MAX_INITIAL_DATA_LEN = 4096;
  VVC.STATUS = {
    SUCCESS: 0,
    ERROR: 1,
    OUT_OF_MEMORY: 2,
    INVALID_ARGS: 3,
    INVALID_STATE: 4,
    CLOSED: 5,
    PROTOCOL_ERROR: 6,
    TRANSPORT_ERROR: 7,
    OPEN_REJECTED: 8,
    OPEN_TIMEOUT: 9
  };

  VVC.prototype.openSession = function (socket) {
    let session;

    session = new VVCSession(this);
    session.attachToWebSocket(socket);
    this._sessions.push(session);

    return session;
  };

  VVC.prototype.closeSession = function (session) {
    let index;

    if (!(session instanceof VVCSession)) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.closeSession',
        'Invalid session, not instanceof VVCSession');
      return false;
    }

    if (session.state === VVC.SESSION_STATE.CLOSING) {
      return true;
    }

    index = this._sessions.indexOf(session);

    if (index === -1) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.closeSession',
        'Invalid session, '
        + 'session is not registered with this vvc instance');
      return false;
    }

    session.onSessionClose();
    this._sessions = this._sessions.splice(index, 1);
    return true;
  };

  VVC.prototype.createListener = function (session, name) {
    let listener;
    let sessionListeners;
    let i;

    if (!(session instanceof VVCSession)) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.createListener',
        'Invalid session: not an instanceof VVCSession');
      return null;
    }

    if (name.length < VVC.MIN_CHANNEL_NAME_LEN ||
      name.length > VVC.MAX_CHANNEL_NAME_LEN) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.createListener',
        'Invalid name "' + name + '",'
        + ' length must be between ' + VVC.MIN_CHANNEL_NAME_LEN
        + ' and ' + VVC.MAX_CHANNEL_NAME_LEN
        + ' characters.');
      return null;
    }

    sessionListeners = this._findSessionListeners(session);

    for (i = 0; i < sessionListeners.length; ++i) {
      if (sessionListeners[i].name === name) {
        this.setLastError(VVC.STATUS.INVALID_ARGS,
          'VVC.createListener',
          'Invalid name "' + name + '",'
          + ' a listener on this session'
          + ' with this name already exists.');
        return null;
      }
    }

    listener = new VVCListener(this, session, name);
    this._listeners.push(listener);
    return listener;
  };

  VVC.prototype.closeListener = function (listener) {
    let index = this._listeners.indexOf(listener);

    if (!(listener instanceof VVCListener)) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.closeListener',
        'Invalid listener, not instanceof VVCListener');
      return false;
    }

    if (listener.state === VVC.LISTENER_STATE.CLOSING) {
      return true;
    }

    if (index === -1) {
      this.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVC.closeListener',
        'Invalid listener, '
        + 'listener is not registered with this vvc instance');
      return false;
    }

    if (listener.onclose) {
      listener.onclose();
    }

    this._listeners = this._listeners.splice(index, 1);
    return true;
  };

  VVC.prototype._findListenerByName = function (name) {
    let listener;
    let i;

    for (i = 0; i < this._listeners.length; ++i) {
      listener = this._listeners[i];

      if (listener.name === name) {
        return listener;
      }
    }

    return null;
  };

  VVC.prototype._findSessionListeners = function (session) {
    let listener;
    let i;
    let sessionListeners = [];

    for (i = 0; i < this._listeners.length; ++i) {
      listener = this._listeners[i];

      if (listener.session === VVC.ALL_SESSIONS || listener.session === session) {
        sessionListeners.push(listener);
      }
    }

    return sessionListeners;
  };

  /**
   * Creates a new VVC Error object.
   */
  let VVCError = function(status, where, msg) {
    this.status = status;
    this.where = where;
    this.msg = msg;

    return this;
  };

  VVC.prototype.getLastError = function () {
    return this._lastError
  };

  VVC.prototype.setLastError = function (status, where, msg) {
    this._lastError = VVCError(status, where, msg);

    if (status !== VVC.STATUS.SUCCESS) {
      console.error(where + ': ' + msg);
    }
  };

  /**
   * Represents a VVC channel which exposes a websocket-like API.
   */
  let VVCChannel: any = function (session, id, name, priority, flags, timeout) {
    this.id = id;
    this.name = name;
    this.priority = priority || 0;
    this.flags = flags || 0;
    this.timeout = timeout || 0;
    this.protocol = "binary";
    this.state = VVC.CHANNEL_STATE.INIT;
    this.onopen = this.onopen || null;
    this.onclose = this.onclose || null;
    this.onerror = this.onerror || null;
    this.onmessage = this.onmessage || null;
    this._session = session;
    this._vvcInstance = session.vvcInstance;

    return this;
  };

  VVC.CHANNEL_STATE = {
    INIT: 0,
    OPEN_FAILED: 1,
    OPEN: 2,
    CLOSING: 3,
    PEER_CLOSING: 4,
    PEER_CLOSED: 5,
    CLOSED: 6
  };

  VVCChannel.prototype.send = function (data) {
    return this._session.send(this, data)
  };

  VVCChannel.prototype.close = function () {
    return this._session.closeChannel(this)
  };

  /**
   * The control channel created and owned by a VVCSession.
   */
  let VVCControlChannel: any  = function (channel) {
    VVCChannel.call(this, channel, VVC.CONTROL_CHANNEL_ID, VVC.CONTROL_CHANNEL_NAME, 0, 0, 0);

    this.state = VVC.CHANNEL_STATE.OPEN;

    this.versionMajor = 0;
    this.versionMinor = 0;

    this._rttSendTimeMS = 0;
  };

  VVCChannel.prototype = Object.create(VVCChannel.prototype);

  VVC.CTRL_HEADER_SIZE = 4;
  VVC.CONTROL_CHANNEL_ID = 0;
  VVC.CONTROL_CHANNEL_NAME = "vvcctrl";
  VVC.CTRL_OP = {
    RECV_ACK: 1,
    INIT: 2,
    INIT_ACK: 3,
    OPEN_CHAN: 4,
    OPEN_CHAN_ACK: 5,
    OPEN_CHAN_CANCEL: 6,
    CLOSE_CHAN: 7,
    CLOSE_CHAN_ACK: 8,
    RTT: 9,
    RTT_ACK: 10
  };
  VVC.CTRL_FLAG = {
    ODAT: 128
  };
  VVC.INIT_EXT_FLAG = {
    EDAT: 32768
  };
  VVC.INIT_EXT_TYPE = {
    VERSION: 1,
    PROBE: 2
  };
  VVC.INIT_EXT_PROBE_FLAG = {
    SUPPORTED: 1
  };
  VVC.OPEN_CHAN_STATUS = {
    SUCCESS: 0,
    REJECT: 1,
    TIMEOUT: 2
  };
  VVC.CLOSE_CHAN_REASON = {
    NORMAL: 0,
    ERROR: 1
  };
  VVC.CLOSE_CHAN_STATUS = {
    SUCCESS: 0,
    ERROR: 1
  };
  VVC.CTRL_OP.SIZE = [];
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.RECV_ACK] = 0;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.INIT] = 12;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.INIT_ACK] = 12;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.OPEN_CHAN] = 20;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.OPEN_CHAN_ACK] = 12;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.OPEN_CHAN_CANCEL] = 0;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.CLOSE_CHAN] = 8;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.CLOSE_CHAN_ACK] = 8;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.RTT] = 0;
  VVC.CTRL_OP.SIZE[VVC.CTRL_OP.RTT_ACK] = 0;
  VVC.CTRL_OP.NAME = [];
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.RECV_ACK] = "VVC.CTRL_OP.RECV_ACK";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.INIT] = "VVC.CTRL_OP.INIT";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.INIT_ACK] = "VVC.CTRL_OP.INIT_ACK";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.OPEN_CHAN] = "VVC.CTRL_OP.OPEN_CHAN";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.OPEN_CHAN_ACK] = "VVC.CTRL_OP.OPEN_CHAN_ACK";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.OPEN_CHAN_CANCEL] = "VVC.CTRL_OP.OPEN_CHAN_CANCEL";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.CLOSE_CHAN] = "VVC.CTRL_OP.CLOSE_CHAN";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.CLOSE_CHAN_ACK] = "VVC.CTRL_OP.CLOSE_CHAN_ACK";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.RTT] = "VVC.CTRL_OP.RTT";
  VVC.CTRL_OP.NAME[VVC.CTRL_OP.RTT_ACK] = "VVC.CTRL_OP.RTT_ACK";

  VVCControlChannel.prototype.sendInit = function (code) {
    let b;
    let c;
    let packet;

    if (code === undefined) {
      code = VVC.CTRL_OP.INIT;
    }

    if (code !== VVC.CTRL_OP.INIT && code !== VVC.CTRL_OP.INIT_ACK) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCControlChannel.sendInit',
        'Invalid code, '
        + ' expected INIT or INIT_ACK');
      return false;
    }

    packet = this._createControlPacket(code);
    packet.writeUint16(VVC.MAJOR_VER);
    packet.writeUint16(VVC.MINOR_VER);
    packet.writeUint32(VVC.CAPS_V10_1);
    packet.writeUint32(VVC.CAPS_V10_2);

    if (VVC.MAJOR_VER >= 2) {
      b = 16 * VVC.SUPPORTED_VER.length;
      if (VVC.ENABLE_PROBE_CHANNEL) {
        b += 8;
        packet.writeUint32(b);
      }

      for (c = 0; c < VVC.SUPPORTED_VER.length; ++c) {
        packet.writeUint16(VVC.INIT_EXT_TYPE.VERSION);
        packet.writeUint16(VVC.INIT_EXT_FLAG.EDAT);
        packet.writeUint32(8);
        packet.writeUint16(VVC.SUPPORTED_VER[c].MAJOR);
        packet.writeUint16(VVC.SUPPORTED_VER[c].MINOR);
        packet.writeUint32(VVC.SUPPORTED_VER[c].FLAGS);
      }
      if (VVC.ENABLE_PROBE_CHANNEL) {
        packet.writeUint16(VVC.INIT_EXT_TYPE.PROBE);
        packet.writeUint16(0);
        packet.writeUint32(VVC.INIT_EXT_PROBE_FLAG.SUPPORTED);
      }
    }

    return this._sendControlPacket(packet)
  };

  VVCControlChannel.prototype.sendRtt = function () {
    this._rttSendTimeMS = Date.now();
    return this._sendControlPacket(this._createControlPacket(VVC.CTRL_OP.RTT))
  };

  VVCControlChannel.prototype.sendRecvAck = function (bytes) {
    let packet;

    while (bytes > 0xffff) {
      packet = this._createControlPacket(VVC.CTRL_OP.RECV_ACK, 0, 0xffff - 1);
      this._sendControlPacket(packet);
      bytes -= 0xffff;
    }

    if (bytes > 0) {
      packet = this._createControlPacket(VVC.CTRL_OP.RECV_ACK, 0, bytes - 1);
      this._sendControlPacket(packet);
    }

    return true;
  };

  VVCControlChannel.prototype.sendOpenChannel = function (channel, initialData) {
    let packet;
    let initialDataLen = 0;

    if (!(channel instanceof VVCChannel)) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCControlChannel.sendOpenChannel',
        'Invalid channel, '
        + ' expected instanceof VVCChannel');
      return false;
    }

    initialDataLen = 0;

    if (!!initialData) {
      initialDataLen = initialData.length;
    }

    packet = this._createControlPacket(VVC.CTRL_OP.OPEN_CHAN);
    packet.writeUint32(channel.id);
    packet.writeUint32(channel.priority);
    packet.writeUint32(channel.flags);
    packet.writeUint32(channel.timeout);
    packet.writeUint16(0);  // Reserved
    packet.writeUint8(0);   // Reserved2
    packet.writeUint8(channel.name.length);
    packet.writeUint32(initialDataLen);
    packet.writeStringASCII(channel.name);

    if (initialDataLen) {
      packet.writeArray(initialData);
    }

    return this._sendControlPacket(packet);
  };

  VVCControlChannel.prototype.sendOpenChannelAck = function (channel, status, initialData) {
    let packet = this._createControlPacket(VVC.CTRL_OP.OPEN_CHAN_ACK);
    packet.writeUint32(channel.id);
    packet.writeUint32(status);

    if (!!initialData) {
      packet.writeUint32(initialData.length);
      packet.writeArray(initialData);
    } else {
      packet.writeUint32(0);
    }

    return this._sendControlPacket(packet);
  };

  VVCControlChannel.prototype.sendCloseChannel = function (channel, reason) {
    let packet = this._createControlPacket(VVC.CTRL_OP.CLOSE_CHAN);
    packet.writeUint32(channel.id);
    packet.writeUint32(reason);
    return this._sendControlPacket(packet);
  };

  VVCControlChannel.prototype.sendCloseChannelAck = function (channel, status) {
    let packet = this._createControlPacket(VVC.CTRL_OP.CLOSE_CHAN_ACK);
    packet.writeUint32(channel.id);
    packet.writeUint32(status);
    return this._sendControlPacket(packet);
  };

  VVCControlChannel.prototype.onmessage = function (evt) {
    let packet = WMKS.Packet.createFromBuffer(evt.data);
    let opcode = packet.readUint8();
    let flags  = packet.readUint8();
    let param  = packet.readUint16();

    switch (opcode) {
      case VVC.CTRL_OP.INIT:
      case VVC.CTRL_OP.INIT_ACK:
        this._onInit(packet, opcode);
        break;
      case VVC.CTRL_OP.RTT:
        this._onRtt(packet);
        break;
      case VVC.CTRL_OP.RTT_ACK:
        this._onRttAck(packet);
        break;
      case VVC.CTRL_OP.OPEN_CHAN:
        this._onOpenChannel(packet);
        break;
      case VVC.CTRL_OP.OPEN_CHAN_ACK:
        this._onOpenChannelAck(packet);
        break;
      case VVC.CTRL_OP.CLOSE_CHAN:
        this._onCloseChannel(packet);
        break;
      case VVC.CTRL_OP.CLOSE_CHAN_ACK:
        this._onCloseChannelAck(packet);
        break;
      case VVC.CTRL_OP.RECV_ACK:
        this._onRecvAck(packet, param);
        break;
      default:
        this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
          'VVCControlChannel.onmessage',
          'Unknown control opcode: ' + opcode);
        return false;
    }

    return true;
  };

  VVCControlChannel.prototype._onRtt = function (packet) {
    let ack;

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.RTT, packet)) {
      return false;
    }

    ack = this._createControlPacket(VVC.CTRL_OP.RTT_ACK);
    return this._sendControlPacket(ack);
  };

  VVCControlChannel.prototype._onRttAck = function (packet) {
    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.RTT_ACK, packet)) {
      return false;
    }

    this._session.addRttTime(Date.now() - this._rttSendTimeMS);
    return true;
  };

  VVCControlChannel.prototype._onRecvAck = function (packet, bytesReceived) {
    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.RECV_ACK, packet)) {
      return false;
    }

    return true;
  };

  VVCControlChannel.prototype._isVersionSupported = function (major, minor) {
    if (VVC.MAJOR_VER == major && VVC.MINOR_VER == minor) return !0;
    for (let c = 0; c < VVC.SUPPORTED_VER.length; ++c)
      if (VVC.SUPPORTED_VER[c].MAJOR == major && VVC.SUPPORTED_VER[c].MINOR == minor) return true;
    return false;
  };

  VVCControlChannel.prototype._onInit = function (packet, opcode) {
    let major;
    let minor;
    let caps1;
    let caps2;
    let h = [];

    if (!this._checkErrorMinimumSize(opcode, packet)) return false;
    if (!this._checkErrorSessionState(opcode, VVC.SESSION_STATE.INIT)) return false;

    major = packet.readUint16();
    minor = packet.readUint16();
    caps1 = packet.readUint32();
    caps2 = packet.readUint32();

    if (major >= 2) {

      if (!this._checkErrorRemainingSize(opcode, packet, 4)) return false;

      let i = packet.readUint32();
      if (!this._checkErrorRemainingSize(opcode, packet, i)) return false;

      while (packet.bytesRemaining() >= 8) {
        var j, k, l, m, n, o, p, q, r;
        j = packet.readUint16();
        k = packet.readUint16();
        l = packet.readUint32();
        k & VVC.INIT_EXT_FLAG.EDAT ? m = l : m = 0;

        if (!this._checkErrorRemainingSize(opcode, packet, m)) return false;

        q = packet.bytesRemaining();

        switch (j) {
          case VVC.INIT_EXT_TYPE.VERSION:
            if (!this._checkErrorRemainingSize(opcode, packet, 8)) return false;

            n = packet.readUint16();
            o = packet.readUint16();
            p = packet.readUint32();
            h.push({
              major: n,
              minor: o
            });
            break;
          case VVC.INIT_EXT_TYPE.PROBE:
            l & VVC.INIT_EXT_PROBE_FLAG.SUPPORTED && this._session.createProbeChannel();
        }
        r = q - packet.bytesRemaining();
        if (r < m) packet.readArray(m - r);
      }
    }

    this.versionMajor = 0;
    this.versionMinor = 0;

    if (this._isVersionSupported(major, minor)) {
      this.versionMajor = major;
      this.versionMinor = minor;
    } else {
      for (var s = 0; s < h.length; s++) {
        n = h[s].major;
        o = h[s].minor;

        if (this._isVersionSupported(n, o) && n >= this.versionMajor && o >= this.versionMinor) {
          this.versionMajor = n;
          this.versionMinor = o;
        }
      }
    }

    if (this.versionMajor == 0 && this.versionMinor == 0) {
      this._vvcInstance.setLastError(VVC.STATUS.PROTOCOL_ERROR, "VVCControlChannel._onInit", "Failed to negotiate compatible protocol  version.");
      return false;
    }

    if (opcode === VVC.CTRL_OP.INIT) {
      this.sendInit(VVC.CTRL_OP.INIT_ACK);
    }

    this._session.onConnect();
    return true;
  };

  VVCControlChannel.prototype._onOpenChannel = function (packet) {
    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.OPEN_CHAN, packet)) {
      return false;
    }

    let name;
    let initialData;
    let channel;
    let id             = packet.readUint32();
    let priority       = packet.readUint32();
    let flags          = packet.readUint32();
    let timeout        = packet.readUint32();
    let reserved       = packet.readUint16();
    let reserved2      = packet.readUint8();
    let nameLen        = packet.readUint8();
    let initialDataLen = packet.readUint32();

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.OPEN_CHAN, packet,
      nameLen + initialDataLen)) {
      return false;
    }

    name = packet.readStringASCII(nameLen);
    initialData = packet.readArray(initialDataLen);

    channel = this._session.createChannel(id, name, priority, flags, timeout);
    channel.initialData = initialData;
    this._session.onPeerOpen(channel);
    return true;
  };

  VVCControlChannel.prototype._onOpenChannelAck = function (packet) {
    let id;
    let status;
    let initialDataLen;
    let initialData;

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.OPEN_CHAN_ACK, packet)) {
      return false;
    }

    id = packet.readUint32();
    status = packet.readUint32();
    initialDataLen = packet.readUint32();

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.OPEN_CHAN_ACK, packet, initialDataLen)) {
      return false;
    }

    initialData = packet.readArray(initialDataLen);

    if (!this._checkErrorValidChannel(VVC.CTRL_OP.OPEN_CHAN_ACK, id, VVC.CHANNEL_STATE.INIT)) {
      return false;
    }

    this._session.onChannelOpen(this._session.getChannel(id), status, initialData);
    return true;
  };

  VVCControlChannel.prototype._onCloseChannel = function (packet) {
    let id;
    let reason;

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.CLOSE_CHAN, packet)) {
      return false;
    }

    id = packet.readUint32();
    reason = packet.readUint32();

    if (!this._checkErrorValidChannel(VVC.CTRL_OP.CLOSE_CHAN, id)) {
      return false;
    }

    this._session.onChannelClose(this._session.getChannel(id), reason);
    return true;
  };

  VVCControlChannel.prototype._onCloseChannelAck = function (packet) {
    let id;
    let status;

    if (!this._checkErrorMinimumSize(VVC.CTRL_OP.CLOSE_CHAN_ACK, packet)) {
      return false;
    }

    id = packet.readUint32();
    status = packet.readUint32();

    if (!this._checkErrorValidChannel(VVC.CTRL_OP.CLOSE_CHAN_ACK, id, VVC.CHANNEL_STATE.CLOSING)) {
      return false;
    }

    this._session.onChannelClose(this._session.getChannel(id), status);
    return true;
  };

  VVCControlChannel.prototype._checkErrorMinimumSize = function (opcode, packet, extraSize) {
    let packetSize = packet.length - 4;
    let expectSize = VVC.CTRL_OP.SIZE[opcode];
    extraSize = extraSize || 0;

    if (packetSize < expectSize + extraSize) {
      let name = VVC.CTRL_OP.NAME[opcode];

      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCControlChannel._checkErrorMinimumSize',
        'Received invalid ' + name + ' message, '
        + 'message too small, received '
        + packetSize + ' bytes, expected '
        + expectSize + ' + ' + extraSize);
      return false;
    }

    return true;
  };

  VVCControlChannel.prototype._checkErrorRemainingSize = function (opcode, packet, c) {
    let bytesRemaining = packet.bytesRemaining();

    if (bytesRemaining < c) {
      let name = VVC.CTRL_OP.NAME[opcode];
      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        "VVCControlChannel._checkErrorRemainingSize",
        "Received invalid " + name + " message, " + "message too small, expected " + (c - bytesRemaining) + " more bytes.");
      return false;
    }
    return true
  };

  VVCControlChannel.prototype._checkErrorSessionState = function (opcode, state) {
    let opname = VVC.CTRL_OP.NAME[opcode];

    if (this._session.state !== state) {
      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCControlChannel._checkErrorSessionState',
        'Received invalid ' + opname + ' message, '
        + 'invaild session state, '
        + 'found ' + this._session.state
        + ' expected ' + state);
      return false;
    }

    return true;
  };

  VVCControlChannel.prototype._checkErrorValidChannel = function (opcode, id, state) {
    let opname  = VVC.CTRL_OP.NAME[opcode];
    let channel = this._session.getChannel(id);

    if (id === VVC.CONTROL_CHANNEL_ID) {
      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCControlChannel._checkErrorValidChannel',
        'Received invalid ' + opname + ' message, '
        + 'unexpected use of control channel id');
      return false;
    }

    if (!channel) {
      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCControlChannel._checkErrorValidChannel',
        'Received invalid ' + opname + ' message, '
        + 'unknown channel ' + id);
      return false;
    }

    if (state !== undefined && channel.state !== state) {
      this._session.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCControlChannel._checkErrorValidChannel',
        'Received invalid ' + opname + ' message, '
        + 'unexpected channel state, '
        + 'found ' + channel.state + ' '
        + ' expected ' + state);
      return false;
    }

    return true;
  };

  VVCControlChannel.prototype._createControlPacket = function (code, flags, param) {
    let packet = WMKS.Packet.createNewPacket();

    param = param || 0;
    flags = flags || 0;

    packet.control = {
      code:  code,
      flags: flags,
      param: param
    };

    packet.writeUint8(code);
    packet.writeUint8(flags);
    packet.writeUint16(param);

    return packet;
  };

  VVCControlChannel.prototype._sendControlPacket = function (packet) {
    if (packet.length > VVC.CTRL_HEADER_SIZE) {
      packet.control.flags |= VVC.CTRL_FLAG.ODAT;
      packet.control.param = packet.length - VVC.CTRL_HEADER_SIZE;
    }

    packet.setUint8(1, packet.control.flags);
    packet.setUint16(2, packet.control.param);

    return this.send(packet.getData());
  };

  /**
   * A VVC listener provides callbacks to notifiy the user about events
   * on one or more VVC sessions.
   */
  let VVCListener: any = function (vvcInstance, session, name) {
    this.name = name;
    this.session = session;
    this.state = VVC.LISTENER_STATE.ACTIVE;
    this.onconnect = null;
    this.onpeeropen = null;
    this.onclose = null;
    this._vvcInstance = vvcInstance;

    return this;
  };

  VVC.LISTENER_STATE = {
    INIT: 0,
    ACTIVE: 1,
    CLOSING: 2
  };

  VVCListener.prototype.close = function () {
    return this._vvcInstance.closeListener(this)
  };

  VVCListener.prototype.matchName = function (name) {
    let wildcard = this.name.indexOf('*');

    if (wildcard !== -1) {
      return this.name.substr(0, wildcard) === name.substring(0, wildcard);
    }

    return this.name === name;
  };

  let VVCProveChannel: any = function (channel) {
    VVCChannel.call(this, channel, VVC.PROBE_CHANNEL_ID, VVC.PROBE_CHANNEL_NAME, 0, 0, 0);
    this.state = VVC.CHANNEL_STATE.OPEN;
  };
  VVCProveChannel.prototype = Object.create(VVCChannel.prototype);

  VVC.PROBE_CHANNEL_ID = 1;
  VVC.PROBE_CHANNEL_NAME = "vvcprobe";

  /**
   * A VVC session represents a physical connection to a remote server
   */
  let VVCSession: any = function (vvcInstance, options?) {
    let server = false;

    if (options) {
      if ('server' in options) {
        server = options.server;
      }
    }

    this.state = VVC.SESSION_STATE.INIT;

    this.onerror = null;

    this.ontransportclose = null;

    this.ontransporterror = null;

    this._vvcInstance     = vvcInstance;

    this._server          = server;

    this._channels        = [];

    this._channelIdCtrl   = this._server ? 1 : 2;

    this._bytesRead       = 0;

    this._bytesRequested  = VVC.CHUNK_COMMON_HEADER_SIZE;

    this._rttHistory      = [];

    this._rttHistoryIndex = 0;

    this._chunk = {};
    this._chunk.channel = 0;
    this._chunk.flags   = 0;
    this._chunk.length  = 0;
    this._chunk.ext = {};
    this._chunk.ext.code   = 0;
    this._chunk.ext.flags  = 0;
    this._chunk.ext.param  = 0;
    this._chunk.ext.length = 0;

    this._buffers = {};
    this._buffers.ext = null;
    this._buffers.data = [];
    this._buffers.send = WMKS.Packet.createNewPacket(32);
    this._buffers.header = WMKS.Packet.createNewPacket(VVC.CHUNK_COMMON_HEADER_SIZE +
      VVC.CHUNK_LARGE_HEADER_SIZE +
      VVC.CHUNK_EXTENSION_HEADER_SIZE);

    this._receiveState = VVC.SESSION_RECEIVE_STATE.COMMON_HEADER;
    this._setReceiveState(VVC.SESSION_RECEIVE_STATE.COMMON_HEADER);

    return this;
  };

  VVC.CHUNK_COMMON_HEADER_SIZE = 4;
  VVC.CHUNK_LARGE_HEADER_SIZE = 4;
  VVC.CHUNK_EXTENSION_HEADER_SIZE = 4;
  VVC.CHUNK_MAX_LEN = 65536;
  VVC.CHUNK_LARGE_MAX_LEN = 4294966272;
  VVC.SESSION_STATE = {
    INIT: 0,
    ESTABLISHED: 1,
    ERROR: 2,
    CLOSING: 3
  };
  VVC.SESSION_RECEIVE_STATE = {
    COMMON_HEADER: 0,
    LARGE_HEADER: 1,
    EXTENSION_HEADER: 2,
    EXTENSION_DATA: 3,
    DATA: 4
  };
  VVC.CHUNK_FLAG = {
    PAD: 16,
    EXT: 32,
    LC: 64,
    FIN: 128
  };
  VVC.CHUNK_EXT_FLAG = {
    ELST: 64,
    EDAT: 128
  };
  VVC.CHUNK_EXT_CODE = {
    LARGE_CHANNEL_ID: 1
  };

  VVCSession.prototype.close = function () {
    return this._vvcInstance.closeSession(this)
  };

  VVCSession.prototype.openChannel = function (name, priority, flags, timeout, initialData) {
    let channel;

    priority    = priority || 0;
    flags       = flags || 0;
    timeout     = timeout || 0;
    initialData = initialData || null;

    if (!this._checkErrorNameLength('openChannel', name)) {
      return null;
    }

    if (!this._checkErrorSessionState('openChannel',
      VVC.SESSION_STATE.ESTABLISHED)) {
      return null;
    }

    if (!this._checkErrorInitialData('openChannel', initialData)) {
      return null;
    }

    channel = this.createChannel(this._nextChannelId(),
      name,
      priority,
      flags,
      timeout);

    this.controlChannel.sendOpenChannel(channel, initialData);
    return channel;
  };

  VVCSession.prototype.acceptChannel = function (channel, flags, initialData) {
    flags       = flags || 0;
    initialData = initialData || null;

    if (!this._checkErrorSessionState('acceptChannel',
      VVC.SESSION_STATE.ESTABLISHED)) {
      return null;
    }

    if (!this._checkErrorInitialData('acceptChannel', initialData)) {
      return null;
    }

    if (!this._checkErrorIsChannel('acceptChannel', channel)) {
      return null;
    }

    this.controlChannel.sendOpenChannelAck(channel,
      VVC.OPEN_CHAN_STATUS.SUCCESS,
      initialData);

    this.onChannelOpen(channel,
      VVC.OPEN_CHAN_STATUS.SUCCESS,
      channel.initialData);

    delete channel.initialData;
    return channel;
  };

  VVCSession.prototype.rejectChannel = function (channel, initialData) {
    initialData = initialData || null;

    if (!this._checkErrorSessionState('rejectChannel',
      VVC.SESSION_STATE.ESTABLISHED)) {
      return false;
    }

    if (!this._checkErrorInitialData('rejectChannel', initialData)) {
      return false;
    }

    if (!this._checkErrorIsChannel('rejectChannel', channel)) {
      return false;
    }

    this.controlChannel.sendOpenChannelAck(channel,
      VVC.OPEN_CHAN_STATUS.REJECT,
      initialData);

    channel.state = VVC.CHANNEL_STATE.CLOSED;
    this._releaseChannel(channel);
    return true;
  };

  VVCSession.prototype.closeChannel = function (channel) {
    if (!this._checkErrorSessionState('closeChannel',
      VVC.SESSION_STATE.ESTABLISHED)) {
      return false;
    }

    if (!this._checkErrorIsChannel('closeChannel', channel)) {
      return false;
    }

    if (!this._checkErrorChannelState('closeChannel', channel,
      VVC.CHANNEL_STATE.OPEN)) {
      return false;
    }

    channel.state = VVC.CHANNEL_STATE.CLOSING;
    this.controlChannel.sendCloseChannel(channel, VVC.CLOSE_CHAN_REASON.NORMAL);
    return true;
  };

  VVCSession.prototype.addRttTime = function (rttMS) {
    this._rttHistory[this._rttHistoryIndex] = rttMS;
    this._rttHistoryIndex++;

    if (this._rttHistoryIndex >= VVC.RTT_HISTORY_SIZE) {
      this._rttHistoryIndex = 0;
    }
  };

  VVCSession.prototype.attachToWebSocket = function (socket) {
    let self = this;

    if (!(socket instanceof WebSocket)) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.attachToWebSocket',
        'Invalied socket,'
        + ' must be instanceof WebSocket');
      return false;
    }

    this.socket = socket;

    socket.onopen = function(evt) {
      this.binaryType = 'arraybuffer';
      self._onTransportOpen();
    };

    socket.onclose = function(evt) {
      self._onTransportClose(evt);
    };

    socket.onerror = function(evt) {
      self._onTransportError(evt);
    };

    socket.onmessage = function(evt) {
      if (!(evt.data instanceof ArrayBuffer)) {
        throw 'Expected ArrayBuffer from websocket';
      }

      self._onTransportRecv(new Uint8Array(evt.data));
    };

    // If socket is already open lets fake call onopen to start our session
    if (socket.readyState) {
      // @ts-ignore
      socket.onopen({});
    }

    return true;
  };

  VVCSession.prototype._nextChannelId = function () {
    var id = this._channelIdCtrl;
    this._channelIdCtrl += 2;
    return id;
  };

  VVCSession.prototype.createChannel = function (id, name, priority, flags, timeout) {
    let channel;

    priority = priority || 0;
    timeout  = timeout || 0;
    flags    = flags || 0;

    channel = new VVCChannel(this, id, name, priority, flags, timeout);
    this._channels[id] = channel;
    this._buffers.data[id] = [];
    return channel;
  };

  VVCSession.prototype._releaseChannel = function (channel) {
    if (channel.state === VVC.CHANNEL_STATE.OPEN) {
      this._vvcInstance.setLastError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCSession._releaseChannel',
        'Releasing an open channel!');
    }

    delete this._channels[channel.id];
    delete this._buffers.data[channel.id];
  };

  VVCSession.prototype.getChannel = function (id) {
    if (!!this._channels[id]) {
      return this._channels[id];
    }

    return null;
  };

  VVCSession.prototype.onSessionError = function (status, where, message) {
    this.state = VVC.SESSION_STATE.ERROR;
    this._vvcInstance.setLastError(status, where, message);

    if (this.onerror) {
      this.onerror(status);
    }
  };

  VVCSession.prototype.onSessionClose = function () {
    let channel;
    let closeChanReason;
    let i;

    if (this.state === VVC.SESSION_STATE.ERROR) {
      closeChanReason = VVC.CLOSE_CHAN_REASON.ERROR;
    } else {
      closeChanReason = VVC.CLOSE_CHAN_REASON.NORMAL;
    }

    this.state = VVC.SESSION_STATE.CLOSING;
    try {
      this.socket.close()
    } catch (e) {
      this._onTransportException(e)
    }

    for (i = 0; i < this._channels.length; ++i) {
      channel = this._channels[i];

      if (channel) {
        if (channel.state === VVC.CHANNEL_STATE.INIT) {
          this.onChannelOpen(channel, VVC.STATUS.ERROR);
        } else if (channel.state === VVC.CHANNEL_STATE.OPEN
          || channel.state === VVC.CHANNEL_STATE.CLOSING) {
          channel.state = VVC.CHANNEL_STATE.CLOSING;
          this.onChannelClose(channel, closeChanReason);
        }
      }
    }
  };

  VVCSession.prototype.onConnect = function () {
    let i;
    let listener;
    let listeners;

    listeners = this._vvcInstance._findSessionListeners(this);
    this.state = VVC.SESSION_STATE.ESTABLISHED;

    for (i = 0; i < listeners.length; ++i) {
      listener = listeners[i];

      if (listener.onconnect) {
        listener.onconnect(this);
      }
    }
  };

  VVCSession.prototype.onPeerOpen = function (channel) {
    let i;
    let listener;
    let listeners;

    listeners = this._vvcInstance._findSessionListeners(this);

    for (i = 0; i < listeners.length; ++i) {
      listener = listeners[i];

      if (listener.matchName(channel.name)) {
        if (listener.onpeeropen) {
          listener.onpeeropen(this, channel);
        }
      }
    }
  };

  VVCSession.prototype.onChannelOpen = function (channel, status, initialData) {
    if (status === VVC.OPEN_CHAN_STATUS.SUCCESS) {
      channel.state = VVC.CHANNEL_STATE.OPEN;
      if (channel.onopen) {
        channel.onopen(this._createEvent('open', { data: initialData }));
      }
    } else {
      channel.state = VVC.CHANNEL_STATE.OPEN_FAILED;
      this._releaseChannel(channel);
      this.onChannelError(channel);
    }
  };

  VVCSession.prototype.onChannelError = function (channel) {
    if (channel.onerror) {
      channel.onerror(this._createEvent('error'));
    }
  };

  VVCSession.prototype.onChannelMessage = function (channel, data) {
    if (!channel) {
      this.onSessionError(VVC.STATUS.PROTOCOL_ERROR,
        'VVCSession.onChannelMessage',
        'Unknown channel in chunk');
      return;
    }

    if (channel.onmessage) {
      channel.onmessage(this._createEvent('message', { data: data }));
    }
  };

  VVCSession.prototype.onChannelClose = function (channel, reason) {
    let code;

    if (reason === VVC.CLOSE_CHAN_REASON.NORMAL) {
      code = 1000; // WebSocket 'normal close'

      if (channel.state === VVC.CHANNEL_STATE.CLOSING) {
        channel.state = VVC.CHANNEL_STATE.PEER_CLOSED;
      } else {
        channel.state = VVC.CHANNEL_STATE.PEER_CLOSING;
        this.controlChannel.sendCloseChannelAck(channel, VVC.CLOSE_CHAN_STATUS.SUCCESS);
      }
    } else {
      code = 1002; // WebSocket 'protocol error'
    }

    if (channel.onclose) {
      channel.onclose(this._createEvent('close', {
        wasClean: (reason === VVC.CLOSE_CHAN_REASON.NORMAL),
        reason: reason,
        code: code
      }));
    }

    channel.state = VVC.CHANNEL_STATE.CLOSED;
    this._releaseChannel(channel);
  };

  VVCSession.prototype.createProbeChannel = function () {
    this.probeChannel = new VVCProveChannel(this);
    this._channels[this.probeChannel.id] = this.probeChannel;
    this._buffers.data[this.probeChannel.id] = [];
  };

  VVCSession.prototype._createControlChannel = function () {
    this.controlChannel = new VVCControlChannel(this);
    this._channels[this.controlChannel.id] = this.controlChannel;
    this._buffers.data[this.controlChannel.id] = [];
  };

  VVCSession.prototype._onTransportOpen = function () {
    this._createControlChannel();

    // It is the clients responsibility to send the first control init message
    if (!this._server) {
      this.controlChannel.sendInit(VVC.CTRL_OP.INIT);
    }
  };

  VVCSession.prototype._onTransportClose = function (evt) {
    if (this.state === VVC.SESSION_STATE.ESTABLISHED) {
      this.onSessionError(VVC.TRANSPORT_ERROR,
        'VVCSession._onTransportClose',
        'The WebSocket closed whilst the session was open.');
    }

    if (this.ontransportclose) {
      this.ontransportclose(evt);
    }
  };

  VVCSession.prototype._onTransportError = function (evt) {
    this.onSessionError(VVC.TRANSPORT_ERROR,
      'VVCSession._onTransportError',
      'An error occurred in the WebSocket.');

    if (this.ontransporterror) {
      this.ontransporterror(evt);
    }
  };

  VVCSession.prototype._onTransportException = function (evt) {
    this.onSessionError(VVC.TRANSPORT_ERROR,
      'VVCSession._onTransportException',
      'An exception occurred in the WebSocket.' + evt.message);

    if (this.ontransporterror) {
      this.ontransporterror(this._createEvent('error'));
    }
  };

  VVCSession.prototype._combineBuffers = function (buffers) {
    let array;
    let buffer;
    let i;
    let size;

    if (buffers.length === 0) {
      return null;
    }

    size = 0;

    for (i = 0; i < buffers.length; ++i) {
      size += buffers[i].length;
    }

    buffer = new ArrayBuffer(size);
    array  = new Uint8Array(buffer);
    size   = 0;

    for (i = 0; i < buffers.length; ++i) {
      array.set(buffers[i], size);
      size += buffers[i].length;
    }

    return buffer;
  };

  VVCSession.prototype._setReceiveState = function (state) {
    this._receiveState = state;

    switch(state) {
      case VVC.SESSION_RECEIVE_STATE.COMMON_HEADER:
        this._bytesRequested = VVC.CHUNK_COMMON_HEADER_SIZE;
        this._bytesRead = 0;
        this._buffers.header.reset();
        break;
      case VVC.SESSION_RECEIVE_STATE.LARGE_HEADER:
        this._bytesRequested += VVC.CHUNK_LARGE_HEADER_SIZE;
        break;
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_HEADER:
        this._bytesRequested += VVC.CHUNK_EXTENSION_HEADER_SIZE;
        break;
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_DATA:
        this._bytesRequested += this._chunk.ext.length;
        break;
      case VVC.SESSION_RECEIVE_STATE.DATA:
        this._bytesRequested += this._chunk.length;
        break;
    }
  };

  VVCSession.prototype._onTransportRecv = function (data) {
    let buffer;
    let bytesNeeded;
    let bytesRead;
    let dataRead;

    bytesNeeded = this._bytesRequested - this._bytesRead;
    bytesRead   = Math.min(data.length, bytesNeeded);
    dataRead    = data.subarray(0, bytesRead);
    buffer      = null;

    switch(this._receiveState) {
      case VVC.SESSION_RECEIVE_STATE.COMMON_HEADER:
      case VVC.SESSION_RECEIVE_STATE.LARGE_HEADER:
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_HEADER:
        buffer = this._buffers.header;
        break;
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_DATA:
        buffer = this._buffers.ext;
        break;
      case VVC.SESSION_RECEIVE_STATE.DATA:
        this._buffers.data[this._chunk.channel].push(dataRead);

        if (this._chunk.channel !== VVC.CONTROL_CHANNEL_ID && bytesRead) {
          this.controlChannel.sendRecvAck(bytesRead);
        }
        break;
    }

    if (buffer) {
      buffer.writeArray(dataRead);
    }

    this._bytesRead += bytesRead;

    if (data.length < bytesNeeded) {
      return;
    }

    switch (this._receiveState) {
      case VVC.SESSION_RECEIVE_STATE.COMMON_HEADER:
        this._chunk.channel = buffer.readUint8();
        this._chunk.flags   = buffer.readUint8();
        this._chunk.length  = buffer.readUint16() + 1;

        if (this._chunk.flags & VVC.CHUNK_FLAG.LC) {
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.LARGE_HEADER);
        } else if (this._chunk.flags & VVC.CHUNK_FLAG.EXT) {
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.EXTENSION_HEADER);
        } else {
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.DATA);
        }
        break;
      case VVC.SESSION_RECEIVE_STATE.LARGE_HEADER:
        this._chunk.length = buffer.readUint32() + 1;

        if (this._chunk.flags & VVC.CHUNK_FLAG.EXT) {
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.EXTENSION_HEADER);
        } else {
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.DATA);
        }
        break;
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_HEADER:
        this._chunk.ext.code  = buffer.readUint8();
        this._chunk.ext.flags = buffer.readUint8();
        this._chunk.ext.param = buffer.readUint16();

        if (this._chunk.ext.flags & VVC.CHUNK_EXT_FLAG.EDAT) {
          this._chunk.ext.length = this._chunk.ext.param + 1;
          this._buffers.ext = new WMKS.Packet.createNewPacket(this._chunk.ext.length);
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.EXTENSION_DATA);
        } else {
          this._chunk.ext.length = 0;
          this._setReceiveState(VVC.SESSION_RECEIVE_STATE.DATA);
        }
        break;
      case VVC.SESSION_RECEIVE_STATE.EXTENSION_DATA:
        this._buffers.ext = null;
        this._setReceiveState(VVC.SESSION_RECEIVE_STATE.DATA);
        break;
      case VVC.SESSION_RECEIVE_STATE.DATA:
        if (this._chunk.flags & VVC.CHUNK_FLAG.FIN) {
          buffer = this._combineBuffers(this._buffers.data[this._chunk.channel]);
          this.onChannelMessage(this._channels[this._chunk.channel], buffer);
          this._buffers.data[this._chunk.channel] = [];
        }

        this._setReceiveState(VVC.SESSION_RECEIVE_STATE.COMMON_HEADER);
        break;
    }

    if (data.length > bytesRead) {
      this._onTransportRecv(data.subarray(bytesRead));
    }
  };

  VVCSession.prototype.send = function (channel, data) {
    let header;
    let flags;
    let length;

    if (!this._checkErrorIsChannel('send', channel)) {
      return false;
    }

    if (!this._checkErrorChannelState('send', channel,
      VVC.CHANNEL_STATE.OPEN)) {
      return false;
    }

    if (!(data instanceof Uint8Array) && !(data instanceof ArrayBuffer)) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.send',
        'Invalid data, must be Uint8Array'
        + ' or ArrayBuffer');
      return false;
    }

    header = this._buffers.send;
    header.reset();
    header.writeUint8(channel.id);

    length = data.byteLength;
    flags  = VVC.CHUNK_FLAG.FIN;

    if (length > VVC.CHUNK_MAX_LEN) {
      header.writeUint8(VVC.CHUNK_FLAG.LC | flags);
      header.writeUint16(0);
      header.writeUint32(length - 1);
    } else {
      header.writeUint8(flags);
      header.writeUint16(length - 1);
    }

    try {
      this.socket.send(header.getData());
      this.socket.send(data);
    } catch (e) {
      this._onTransportException(e)
    }

    return true;
  };

  VVCSession.prototype._createEvent = function (name, properties) {
    let evt = document.createEvent('Event');
    evt.initEvent(name, false, false);

    for (let key in properties) {
      evt[key] = properties[key];
    }

    return evt;
  };

  VVCSession.prototype._checkErrorIsChannel = function (func, object) {
    if (!(object instanceof VVCChannel)) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.' + func,
        'Invalid channel,'
        + ' must be instanceof VVCChannel');
      return false;
    }

    return true;
  };

  VVCSession.prototype._checkErrorSessionState = function (func, state) {
    if (this.state !== state) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_STATE,
        'VVCSession.' + func,
        'Invalid state ' + this.state
        + ' expected ' + state);
      return false;
    }

    return true;
  };

  VVCSession.prototype._checkErrorChannelState = function (func, channel, state) {
    if (channel.state !== state) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_STATE,
        'VVCSession.' + func,
        'Invalid state ' + channel.state
        + ' expected ' + state);
      return false;
    }

    return true;
  };

  VVCSession.prototype._checkErrorNameLength = function (func, name) {
    if (name.length < VVC.MIN_CHANNEL_NAME_LEN ||
      name.length > VVC.MAX_CHANNEL_NAME_LEN) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.' + func,
        'Invalid name ' + name
        + ' length must be between '
        + VVC.MIN_CHANNEL_NAME_LEN + ' and '
        + VVC.MAX_CHANNEL_NAME_LEN + ' bytes');
      return false;
    }

    return true;
  };

  VVCSession.prototype._checkErrorInitialData = function (func, initialData) {
    if (initialData && !(initialData instanceof Uint8Array)) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.' + func,
        'Invalid initial data,'
        + ' must be instanceof Uint8Array');
      return false;
    }

    if (initialData && initialData.length > VVC.MAX_INITIAL_DATA_LEN) {
      this._vvcInstance.setLastError(VVC.STATUS.INVALID_ARGS,
        'VVCSession.' + func,
        'Invalid initial data,'
        + ' must be smaller than '
        + VVC.MAX_INITIAL_DATA_LEN + ' bytes');
      return false;
    }

    return true;
  };

  // TODO
  WMKS.RelativeMouseHandler = function (a) {
    "use strict";
    if (!a || !a.canvas || !a.widgetProto) return WMKS.LOGGER.warn("Invalid params set for RelativeMouseHandler."), null;
    var b = a.widgetProto,
      c = a.canvas,
      d = a.onToggle,
      e = {
        inputProxy: null,
        cursorIcon: null,
        clickFeedback: null,
        dragFeedback: null,
        pulseFeedback: null,
        scrollFeedback: null,
        keypad: null,
        relativePad: null
      };
    this.toggleRelativePad = function (a) {
      e.relativePad && (a = $.extend({}, a, {
        toggleCallback: d
      }), e.relativePad.toggle(a))
    }, this.installMouseHandlers = function () {
      var a = this,
        b = c.parent();
      c.css({
        "-webkit-user-select": "none",
        "-webkit-touch-callout": "none"
      }), e.cursorIcon = $("<div/>")
        .addClass("feedback-container cursor-icon")
        .appendTo(b), e.clickFeedback = $("<div/>")
        .addClass("feedback-container tap-icon")
        .appendTo(b), e.dragFeedback = $("<div/>")
        .addClass("feedback-container drag-icon")
        .appendTo(b), e.pulseFeedback = $("<div/>")
        .addClass("feedback-container pulse-icon")
        .appendTo(b), e.scrollFeedback = $("<div/>")
        .addClass("feedback-container scroll-icon")
        .appendTo(b)
    }, this.initializeRelativeMouseFeature = function () {
      e.relativePad = new WMKS.relativePadManager(b, c), e.relativePad.initialize()
    }, this.moveCursor = function (a, b) {
      e.cursorIcon && e.cursorIcon.css({
        left: a,
        top: b
      })
    }, this.setCursorVisibility = function (a) {
      e.cursorIcon && (a ? e.cursorIcon.show() : e.cursorIcon.hide())
    }, this.destroy = function () {
      b = null, c = null, e = null
    }
  };
  (function () {
    "use strict";
    WMKS.CONST.RELATIVEPAD = {
      STATE: {
        idle: 0,
        click: 1,
        move: 3,
        scroll: 4
      }
    };

    WMKS.relativePadManager = function (a, b) {
      WMKS.dialogManager.call(this), this._widget = a, this._canvas = b, this.state = WMKS.CONST.RELATIVEPAD.STATE.idle, this.history = [], $.extend(this.options, {
        name: "RELATIVEPAD",
        speedControlMinMovePx: 5,
        accelerator: 10,
        minSpeed: 1,
        maxSpeed: 10
      }), WMKS.LOGGER.warn("relativepad : " + this.options.name)
    };
    WMKS.relativePadManager.prototype = new WMKS.dialogManager;
    WMKS.relativePadManager.prototype.getTrackpadHtml = function () {
      var a = '<div id="relativePad" class="relativepad-container">                   <div class="left-border"></div>                   <div id="relativePadSurface" style="height:200px; border:1px solid black;"></div>                   <div class="right-border"></div>                   <div class="bottom-border">                      <div class="button-container">                         <div id="relativepadLeft" class="button-left"></div>                         <div id="relativepadRight" class="button-right"></div>                      </div>                   </div>               </div>';
      return a
    };
    WMKS.relativePadManager.prototype.create = function () {
      var a, b = this;
      return !this._widget || !this._canvas ? (WMKS.LOGGER.debug("Trackpad dialog creation has been aborted. Widget or Canvas is not ready."), null) : (a = $(this.getTrackpadHtml()), a.dialog({
        autoOpen: !1,
        closeOnEscape: !0,
        resizable: !1,
        position: {
          my: "center",
          at: "center",
          of: this._canvas
        },
        zIndex: 1e3,
        draggable: !0,
        dialogClass: "relativepad-wrapper",
        close: function (a) {
          b.sendUpdatedState(!1)
        },
        create: function (a) {
          b.layout($(this)
            .parent())
        }
      }), a)
    };
    WMKS.relativePadManager.prototype.init = function () {
      var a = this.dialog,
        b = this,
        c, d, e;
      if (!a) {
        WMKS.LOGGER.debug("Relativepad init aborted. Dialog is not created successfully.");
        return
      }
      this._widget.requestElementReposition(a.parent(), !0), c = a.find("#relativePadSurface")
        .on("mousemove", function (a) {
          return b.relativepadMouseMove(a.originalEvent)
        })
        .on("mouseup", function (a) {
          return b.relativepadMouseClick(a, 0)
        })
        .on("mousedown", function (a) {
          return b.relativepadMouseClick(a, 1)
        })
        .on("contextmenu", function () {
          return !1
        })
    };
    WMKS.relativePadManager.prototype.disconnect = function () {
      var a = this.dialog,
        b;
      if (!a) return;
      b = a.find("#relativepadSurface")
        .off("mousemove")
        .off("mouseup")
        .off("mousedown")
    };
    WMKS.relativePadManager.prototype.layout = function (a) {
      var b = this._canvas,
        c, d;
      if (!a || !b) return;
      c = a.parent(), d = b.parent(), c !== d && d.append(a)
    };
    WMKS.relativePadManager.prototype.relativepadMouseMove = function (a) {
      var b, c, d, e, f = $(a.target),
        g = this._widget;
      return this.state === WMKS.CONST.RELATIVEPAD.STATE.idle ? !1 : (b = a.pageX, c = a.pageY, c < f.offset()
        .top || c > f.offset()
        .top + f.height() || b < f.offset()
        .left || b > f.offset()
        .left + f.width() ? (this.state === WMKS.CONST.RELATIVEPAD.STATE.move && (this.state = WMKS.CONST.RELATIVEPAD.STATE.idle, this.history.length = 0), !1) : (this.state === WMKS.CONST.RELATIVEPAD.STATE.move && (d = this.computeNewCursorLocation(b, c), WMKS.VNCDecoder.cursorPosition && (e = this._widget.getRelativeMouseCanvasPosition(WMKS.VNCDecoder.cursorPosition), g._relativeMouseHandler.moveCursor(e.x, e.y)), g.sendMouseMoveMessage(d), this.history.shift(), this.history.push({
        x: b,
        y: c
      })), this.state === WMKS.CONST.RELATIVEPAD.STATE.click && (this.state = WMKS.CONST.RELATIVEPAD.STATE.move, this.history.push({
        x: b,
        y: c
      }, {
        x: b,
        y: c
      }, {
        x: b,
        y: c
      })), !1))
    };
    WMKS.relativePadManager.prototype.computeNewCursorLocation = function (a, b) {
      var c, d = {
        x: 0,
        y: 0
      };
      return c = WMKS.UTIL.getLineLength(a - this.history[2].x, b - this.history[2].y), isNaN(c) || c === 0 ? d : (c < this.options.speedControlMinMovePx ? (d.x = a - this.history[2].x, d.y = b - this.history[2].y) : (c = this.computeMovingDistance(a, b), d.x = Math.floor(c[0]), d.y = Math.floor(c[1])), d)
    };
    WMKS.relativePadManager.prototype.computeMovingDistance = function (a, b) {
      let c, d, e, f;
      return c = this.getTrackpadSpeed(a, this.history[0].x, this.history[1].x, this.history[2].x), d = this.getTrackpadSpeed(b, this.history[0].y, this.history[1].y, this.history[2].y), e = WMKS.UTIL.getLineLength(c, d), f = e * this.options.accelerator, f > this.options.maxSpeed ? f = this.options.maxSpeed : f < this.options.minSpeed && (f = this.options.minSpeed), [c * f, d * f]
    };
    WMKS.relativePadManager.prototype.getTrackpadSpeed = function (a, b, c, d) {
      return a * .3 + b * .1 - c * .1 - d * .3
    };
    WMKS.relativePadManager.prototype.relativepadMouseClick = function (a, b) {
      if (this.state == WMKS.CONST.RELATIVEPAD.STATE.idle) {
        this.state = WMKS.CONST.RELATIVEPAD.STATE.click;
        return false;
      }

      this.state = WMKS.CONST.RELATIVEPAD.STATE.click;
      let c = a || window.event;
      let d = {
        x: 0,
        y: 0
      };
      let e;

      return c.which ? c.which == 1 ? e = 1 : c.which == 2 ? e = 4 : c.which == 3 && (e = 2) : c.button == 0 ? e = 1 : c.button == 1 ? e = 4 : c.button == 2 && (e = 2), this._widget.sendMouseButtonMessage(d, b, e), this.resetRelativepadState(), !1
    };
    WMKS.relativePadManager.prototype.resetRelativepadState = function () {
      this.history.length = 0
    };
  }());

  $.widget("wmks.wmks", WMKS.widgetProto);

  (function () {

    /**
     * This file expanded the original WMKS.CONST, all constants used in
     *    the new SDK all defined here.
     *
     *    This contains the following:
     *    1. Position: provides the possible option value when create wmks about
     *       how to position the remote screen to make it within the container.
     *
     *    2. ConnectionState: the value of 3 possible connection states when try
     *       to connect the remote VM.
     *
     *	  3. Events: all the events name the new SDK could trigger are listed here.
     *
     *	  4. ErrorType: possible error types in the lifecycle of wmks.
     *
     *	  5. AudioEncodeType: provides the possible audio encode type when create wmks
     *
     *
     *	  6. InputDeviceType: the supported mobile input devices type.
     */
    $.extend(WMKS.CONST, {
      Position: {
        CENTER: 0,
        LEFT_TOP: 1
      },
      ConnectionState: {
        CONNECTING: "connecting",
        CONNECTED: "connected",
        DISCONNECTED: "disconnected"
      },
      Events: {
        CONNECTION_STATE_CHANGE: "connectionstatechange",
        REMOTE_SCREEN_SIZE_CHANGE: "screensizechange",
        FULL_SCREEN_CHANGE: "fullscreenchange",
        ERROR: "error",
        KEYBOARD_LEDS_CHANGE: "keyboardledschanged",
        HEARTBEAT: "heartbeat",
        AUDIO: "audio",
        COPY: "copy",
        TOGGLE: "toggle"
      },
      ErrorType: {
        AUTHENTICATION_FAILED: "authenticationfailed",
        WEBSOCKET_ERROR: "websocketerror",
        PROTOCOL_ERROR: "protocolerror"
      },
      AudioEncodeType: {
        VORBIS: "vorbis",
        OPUS: "opus",
        AAC: "aac"
      },
      InputDeviceType: {
        KEYBOARD: 0,
        EXTENDED_KEYBOARD: 1,
        TRACKPAD: 2
      }
    });

    /**
     * map unicode to vscancode
     */
    WMKS.CONST.KB.VScanMap['ja-JP_106/109'] = {
      32:57,
      49:2, //1
      33:2, //!
      50:3, //2
      34:3, //"
      51:4, //3
      35:4, //#
      52:5, //4
      36:5, //$
      53:6, //5
      37:6, //%
      54:7, //6
      38:7, //&
      55:8, //7
      39:8, //'
      56:9, //8
      40:9, //(
      57:10, //9
      41:10, //)
      48:11, //0
      45:12, //-
      61:12, //=
      94:13, //^
      126:13, //~
      157:125, //
      113:16, //q
      81:16, //Q
      119:17, //w
      87:17, //W
      101:18, //e
      69:18, //E
      114:19, //r
      82:19, //R
      116:20, //t
      84:20, //T
      121:21, //y
      89:21, //Y
      117:22, //u
      85:22, //U
      105:23, //i
      73:23, //I
      111:24, //o
      79:24, //O
      112:25, //p
      80:25, //P
      64:26, //@
      96:26, //`
      91:27, //[
      123:27, //{
      93:43, //]
      125:43, //}
      97:30, //a
      65:30, //A
      115:31, //s
      83:31, //S
      100:32, //d
      68:32, //D
      102:33, //f
      70:33, //F
      103:34, //g
      71:34, //G
      104:35, //h
      72:35, //H
      106:36, //j
      74:36, //J
      107:37, //k
      75:37, //K
      108:38, //l
      76:38, //L
      59:39, //;
      43:39, //+
      58:40, //:
      42:40, //*
      122:44, //z
      90:44, //Z
      120:45, //x
      88:45, //X
      99:46, //c
      67:46, //C
      118:47, //v
      86:47, //V
      98:48, //b
      66:48, //B
      110:49, //n
      78:49, //N
      109:50, //m
      77:50, //M
      44:51, //,
      60:51, //<
      46:52, //.
      62:52, //>
      47:53, ///
      63:53, //?
      95:115, //_
      92:125, //
      13:28, //ENTER
      165:125, //
      124:125
    };
    WMKS.CONST.KB.VScanMap['de-DE'] = {
      32:57,
      176:41,
      192:41,
      94:41,
      180:13,
      49:2, //1
      33:2, //!
      50:3, //2
      34:3, //"
      51:4, //3
      167:4, //§
      52:5, //4
      36:5, //$
      53:6, //5
      37:6, //%
      54:7, //6
      38:7, //&
      55:8, //7
      47:8, ///
      56:9, //8
      40:9, //(
      57:10, //9
      41:10, //)
      48:11, //0
      61:11, //=
      223:12, //ß
      63:12, //?
      187:13, //´
      113:16, //q
      81:16, //Q
      119:17, //w
      87:17, //W
      101:18, //e
      69:18, //E
      114:19, //r
      82:19, //R
      116:20, //t
      84:20, //T
      122:21, //z
      90:21, //Z
      117:22, //u
      85:22, //<u
      105:23, //i
      73:23, //I
      111:24, //o
      79:24, //O
      112:25, //p
      80:25, //P
      252:26, //ü
      220:26, //Ü
      43:27, //+
      42:27, //*
      35:43, //#
      39:43, //'
      97:30, //a
      65:30, //A
      115:31, //s
      83:31, //S
      100:32, //d
      68:32, //D
      102:33, //f
      70:33, //F
      103:34, //g
      71:34, //G
      104:35, //h
      72:35, //H
      106:36, //j
      74:36, //J
      107:37, //k
      75:37, //K
      108:38, //l
      76:38, //L
      246:39, //ö
      214:39, //Ö
      228:40, //ä
      196:40, //Ä
      121:44, // y
      89:44, //Y
      120:45, //x
      88:45, //X
      99:46, //c
      67:46, //C
      118:47, //v
      86:47, //V
      98:48, //b
      66:48, //B
      110:49, //n
      78:49, //N
      109:50, //m
      77:50, //M
      44:51, //,
      59:51, //;
      46:52, //.
      58:52, //:
      45:53, //-
      95:53, //_
      60:86, //<
      62:86, //>
      13:28, //ENTER
      123:8, //{
      91:9, //[
      93:10, //]
      125:11, //}
      92:12, //\
      126:27, //~
      64:16, //@
      8364:18, //
      178:3, //2
      179:4, //3
      181:50, //
      124:86 //|
    };
    WMKS.CONST.KB.VScanMap["it-IT"] = {
      32: 57,
      92: 41,
      124: 41,
      94: 13,
      180: 13,
      49: 2,
      33: 2,
      50: 3,
      34: 3,
      51: 4,
      163: 4,
      52: 5,
      36: 5,
      53: 6,
      37: 6,
      54: 7,
      38: 7,
      55: 8,
      47: 8,
      56: 9,
      40: 9,
      57: 10,
      41: 10,
      48: 11,
      61: 11,
      39: 12,
      63: 12,
      236: 13,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      69: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      121: 21,
      89: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      232: 26,
      233: 26,
      43: 27,
      42: 27,
      249: 43,
      167: 43,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      242: 39,
      231: 39,
      224: 40,
      1224: 40,
      176: 40,
      122: 44,
      90: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 51,
      46: 52,
      58: 52,
      45: 53,
      95: 53,
      60: 86,
      62: 86,
      5: 18,
      1037: 40,
      30: 26,
      29: 27,
      171: 27,
      1109: 39,
      186: 39,
      64: 39,
      8364: 18,
      35: 40,
      91: 26,
      93: 27,
      123: 26,
      125: 27,
      13: 28
    };
    WMKS.CONST.KB.VScanMap["es-ES"] = {
      32: 57,
      161: 13,
      191: 13,
      186: 41,
      170: 41,
      49: 2,
      124: 2,
      33: 2,
      50: 3,
      64: 3,
      34: 3,
      51: 4,
      1035: 4,
      183: 4,
      52: 5,
      36: 5,
      53: 6,
      8364: 6,
      37: 6,
      54: 7,
      172: 7,
      38: 7,
      55: 8,
      47: 8,
      56: 9,
      40: 9,
      57: 10,
      41: 10,
      48: 11,
      61: 11,
      39: 12,
      63: 12,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      5: 18,
      69: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      121: 21,
      89: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      219: 26,
      221: 26,
      43: 27,
      42: 27,
      29: 27,
      93: 27,
      171: 27,
      231: 43,
      199: 43,
      125: 43,
      28: 43,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      209: 39,
      241: 39,
      222: 40,
      122: 44,
      90: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 51,
      46: 52,
      58: 52,
      45: 53,
      95: 53,
      60: 86,
      62: 86,
      13: 28,
      226: 30,
      225: 30,
      224: 30,
      227: 30,
      228: 30,
      234: 18,
      233: 18,
      232: 18,
      235: 18,
      238: 23,
      237: 23,
      236: 23,
      239: 23,
      244: 24,
      243: 24,
      242: 24,
      245: 24,
      246: 24,
      251: 22,
      250: 22,
      249: 22,
      252: 22,
      255: 21,
      1034: 40,
      1048: 41,
      91: 26,
      92: 41,
      35: 4,
      126: 5,
      192: 26,
      123: 40
    };
    WMKS.CONST.KB.VScanMap["pt-BR"] = {
      32: 57,
      176: 115,
      186: 43,
      170: 27,
      49: 2,
      33: 2,
      50: 3,
      64: 3,
      34: 41,
      51: 4,
      1035: 4,
      183: 4,
      52: 5,
      36: 5,
      53: 6,
      37: 6,
      54: 7,
      172: 7,
      38: 8,
      55: 8,
      56: 9,
      40: 10,
      57: 10,
      41: 11,
      48: 11,
      61: 13,
      39: 41,
      63: 115,
      47: 115,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      5: 18,
      69: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      121: 21,
      89: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      219: 26,
      43: 13,
      42: 9,
      29: 27,
      93: 43,
      171: 27,
      231: 39,
      199: 39,
      125: 43,
      28: 43,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      209: 39,
      241: 39,
      222: 40,
      122: 44,
      90: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 53,
      46: 52,
      58: 53,
      45: 12,
      95: 12,
      60: 51,
      62: 52,
      13: 28,
      226: 30,
      225: 30,
      224: 30,
      227: 30,
      228: 30,
      234: 18,
      233: 18,
      232: 18,
      235: 18,
      238: 23,
      237: 23,
      236: 23,
      239: 23,
      244: 24,
      243: 24,
      242: 24,
      245: 24,
      246: 24,
      251: 22,
      250: 22,
      249: 22,
      252: 22,
      255: 21,
      1034: 40,
      1048: 41,
      91: 27,
      92: 86,
      124: 86,
      35: 4,
      126: 40,
      192: 26,
      123: 27,
      185: 2,
      8220: 3,
      178: 3,
      182: 4,
      179: 4,
      163: 5,
      162: 6,
      167: 13
    };
    WMKS.CONST.KB.VScanMap["pt-PT"] = {
      32: 57,
      167: 41,
      177: 41,
      49: 2,
      33: 2,
      50: 3,
      64: 3,
      34: 3,
      51: 4,
      35: 4,
      163: 4,
      52: 5,
      36: 5,
      53: 6,
      8364: 6,
      37: 6,
      54: 7,
      38: 7,
      55: 8,
      47: 8,
      56: 9,
      40: 9,
      93: 10,
      57: 10,
      41: 10,
      48: 11,
      125: 11,
      61: 11,
      39: 12,
      63: 12,
      43: 26,
      42: 26,
      168: 26,
      171: 13,
      187: 13,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      69: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      121: 21,
      89: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      186: 40,
      170: 40,
      221: 27,
      192: 27,
      333: 30,
      180: 27,
      96: 27,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      231: 39,
      199: 39,
      222: 43,
      126: 43,
      94: 43,
      176: 43,
      92: 41,
      124: 41,
      60: 86,
      62: 86,
      122: 44,
      90: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 51,
      46: 52,
      58: 52,
      45: 53,
      95: 53,
      13: 28,
      226: 30,
      194: 30,
      225: 30,
      224: 30,
      227: 30,
      228: 30,
      234: 18,
      202: 18,
      233: 18,
      232: 18,
      200: 18,
      235: 18,
      238: 23,
      206: 23,
      237: 23,
      236: 23,
      204: 23,
      239: 23,
      244: 24,
      212: 24,
      243: 24,
      242: 24,
      210: 24,
      245: 24,
      246: 24,
      251: 22,
      219: 22,
      250: 22,
      249: 22,
      217: 22,
      252: 22,
      241: 49,
      5: 6,
      29: 10,
      91: 9,
      123: 88
    };
    WMKS.CONST.KB.VScanMap["fr-FR"] = {
      32: 57,
      97: 16,
      65: 16,
      226: 16,
      227: 16,
      228: 16,
      122: 17,
      90: 17,
      101: 18,
      69: 18,
      234: 18,
      235: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      121: 21,
      89: 21,
      255: 21,
      117: 22,
      85: 22,
      251: 22,
      252: 22,
      105: 23,
      73: 23,
      238: 23,
      239: 23,
      111: 24,
      79: 24,
      244: 24,
      245: 24,
      246: 24,
      112: 25,
      80: 25,
      113: 30,
      81: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      109: 39,
      77: 39,
      49: 2,
      38: 2,
      50: 3,
      233: 3,
      201: 3,
      51: 4,
      34: 4,
      52: 5,
      39: 5,
      53: 6,
      40: 6,
      54: 7,
      45: 7,
      55: 8,
      232: 8,
      56: 9,
      95: 9,
      295: 7,
      57: 10,
      231: 10,
      48: 11,
      224: 11,
      60: 86,
      62: 86,
      119: 44,
      87: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      44: 50,
      63: 50,
      59: 51,
      46: 51,
      47: 52,
      58: 52,
      36: 27,
      29: 27,
      163: 27,
      221: 26,
      168: 26,
      219: 26,
      160: 26,
      249: 40,
      37: 40,
      42: 43,
      181: 43,
      178: 41,
      41: 12,
      176: 12,
      61: 13,
      43: 13,
      33: 53,
      167: 53,
      35: 4,
      64: 11,
      91: 6,
      93: 12,
      169: 12,
      31: 13,
      173: 13,
      123: 5,
      125: 13,
      8364: 18,
      5: 18,
      124: 7,
      164: 27,
      126: 3,
      92: 9,
      94: 10,
      28: 10,
      96: 8,
      13: 28
    };
    WMKS.CONST.KB.VScanMap["fr-CH"] = {
      32: 57,
      49: 2,
      43: 2,
      166: 2,
      50: 3,
      34: 3,
      64: 3,
      51: 4,
      42: 4,
      35: 4,
      52: 5,
      231: 5,
      53: 6,
      37: 6,
      54: 7,
      38: 7,
      172: 7,
      55: 8,
      47: 8,
      124: 8,
      56: 9,
      40: 9,
      162: 9,
      57: 10,
      41: 10,
      48: 11,
      61: 11,
      39: 12,
      63: 12,
      222: 12,
      31: 12,
      219: 12,
      180: 12,
      187: 13,
      160: 13,
      126: 13,
      94: 13,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      69: 18,
      8364: 18,
      5: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      122: 21,
      90: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      60: 86,
      62: 86,
      96: 86,
      92: 86,
      121: 44,
      89: 44,
      255: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 51,
      46: 52,
      58: 52,
      45: 53,
      95: 53,
      226: 30,
      194: 30,
      196: 30,
      193: 30,
      225: 30,
      227: 30,
      195: 30,
      234: 18,
      202: 18,
      201: 18,
      203: 18,
      200: 18,
      235: 18,
      238: 23,
      206: 23,
      205: 23,
      207: 23,
      237: 23,
      236: 23,
      204: 23,
      239: 23,
      244: 24,
      212: 24,
      211: 24,
      214: 24,
      243: 24,
      242: 24,
      210: 24,
      245: 24,
      213: 24,
      251: 22,
      218: 22,
      220: 22,
      250: 22,
      249: 22,
      217: 22,
      233: 39,
      232: 26,
      91: 26,
      224: 40,
      123: 40,
      1224: 40,
      246: 39,
      252: 26,
      228: 40,
      221: 27,
      161: 27,
      192: 27,
      168: 27,
      29: 27,
      33: 27,
      93: 27,
      36: 43,
      125: 43,
      28: 43,
      164: 43,
      163: 43,
      167: 41,
      176: 41,
      13: 28
    };
    WMKS.CONST.KB.VScanMap["de-CH"] = {
      32: 57,
      49: 2,
      43: 2,
      166: 2,
      50: 3,
      34: 3,
      64: 3,
      51: 4,
      42: 4,
      35: 4,
      52: 5,
      231: 5,
      53: 6,
      37: 6,
      54: 7,
      38: 7,
      172: 7,
      55: 8,
      47: 8,
      124: 8,
      56: 9,
      40: 9,
      162: 9,
      57: 10,
      41: 10,
      48: 11,
      61: 11,
      39: 12,
      63: 12,
      222: 12,
      31: 12,
      219: 12,
      180: 12,
      187: 13,
      160: 13,
      126: 13,
      94: 13,
      113: 16,
      81: 16,
      119: 17,
      87: 17,
      101: 18,
      69: 18,
      8364: 18,
      5: 18,
      114: 19,
      82: 19,
      116: 20,
      84: 20,
      122: 21,
      90: 21,
      117: 22,
      85: 22,
      105: 23,
      73: 23,
      111: 24,
      79: 24,
      112: 25,
      80: 25,
      97: 30,
      65: 30,
      115: 31,
      83: 31,
      100: 32,
      68: 32,
      102: 33,
      70: 33,
      103: 34,
      71: 34,
      104: 35,
      72: 35,
      106: 36,
      74: 36,
      107: 37,
      75: 37,
      108: 38,
      76: 38,
      60: 86,
      62: 86,
      96: 86,
      92: 86,
      121: 44,
      89: 44,
      255: 44,
      120: 45,
      88: 45,
      99: 46,
      67: 46,
      118: 47,
      86: 47,
      98: 48,
      66: 48,
      110: 49,
      78: 49,
      109: 50,
      77: 50,
      44: 51,
      59: 51,
      46: 52,
      58: 52,
      45: 53,
      95: 53,
      226: 30,
      194: 30,
      196: 40,
      193: 30,
      225: 30,
      227: 30,
      195: 30,
      234: 18,
      202: 18,
      201: 39,
      203: 18,
      200: 26,
      235: 18,
      238: 23,
      206: 23,
      205: 23,
      207: 23,
      237: 23,
      236: 23,
      204: 23,
      239: 23,
      244: 24,
      212: 24,
      211: 24,
      214: 39,
      243: 24,
      242: 24,
      210: 24,
      245: 24,
      213: 24,
      251: 22,
      218: 22,
      220: 26,
      250: 22,
      249: 22,
      217: 22,
      233: 39,
      232: 26,
      91: 26,
      224: 40,
      123: 40,
      1224: 40,
      246: 39,
      252: 26,
      228: 40,
      221: 27,
      161: 27,
      192: 27,
      168: 27,
      29: 27,
      33: 27,
      93: 27,
      36: 43,
      125: 43,
      28: 43,
      164: 43,
      163: 43,
      167: 41,
      176: 41,
      1167: 41,
      1176: 41,
      13: 28
    };
    $.widget("wmks.nwmks", $.wmks.wmks, {

      //the default value of the options
      options: {
        rescale: true,
        position: WMKS.CONST.Position.CENTER,
        changeResolution: true,
        audioEncodeType: null,
        useNativePixels: false,
        useUnicodeKeyboardInput: false,
        useVNCHandshake: true,
        sendProperMouseWheelDeltas: false,
        reverseScrollY: false,
        retryConnectionInterval: -1,
        ignoredRawKeyCodes: [],
        fixANSIEquivalentKeys: false
      },

      /************************************************************************
       * jQuery instantiation
       ************************************************************************/

      /**
       * jQuery-UI initialisation function, called by $.widget()
       *
       * First mapping some of the options to the original wmks options,
       * then still use the super class's _create() method for instantiation.
       */

      _create: function () {

        if (this.options.changeResolution) {
          this.options.fitGuest = true;
        }
        if (this.options.audioEncodeType) {
          let constType = WMKS.CONST.AudioEncodeType;
          switch (this.options.audioEncodeType) {
            case constType.AAC:
              this.options.enableAacAudioClips = true;
              break;
            case constType.OPUS:
              this.options.enableOpusAudioClips = true;
              break;
            case constType.VORBIS:
              this.options.enableVorbisAudioClips = true;
              break;
          }
        }
        this.element.unbind();
        WMKS.widgetProto._create.apply(this);

      },

      /**
       * jQuery-UI initialisation function, called by $.widget
       * Here initialize the attribute transformOrigin in cross browser environment.
       */
      _init: function () {
        let self = this;
        let checkProperty = function (prop) {
          return typeof self._canvas[0].style[prop] !== 'undefined' ? prop : null;
        };

        this.transformOrigin = (checkProperty('transformOrigin') ||
          checkProperty('WebkitTransformOrigin') ||
          checkProperty('MozTransformOrigin') ||
          checkProperty('msTransformOrigin') ||
          checkProperty('OTransformOrigin'));
      },

      /**
       * Override the superClass widgetProto's rescaleOrResize method.
       *
       * The behavior depends on the option changeResolution, rescale, position:
       * 1) check changeResolution and parameter tryChangeResolution: if both true,
       * then send the change resolution request to the connected VM, the request
       * resolution(width & height) is the same as the container's allocated size.
       *
       * 2) check rescale option: if true, rescale the remote screen to fit the
       * container's allocated size.
       *
       * 3) check position option: If the remote screen's size is not same with
       * the container's allocated size, then put the remote screen in the center
       * or left top of the container based on its value.
       */
      rescaleOrResize: function (tryChangeResolution) {
        let newScale = 1.0;
        let x = 0;
        let y = 0;
        let origin = "center center";
        let parentWidth = this.element.width();
        let parentHeight = this.element.height();

        this._canvas.css({
          width: this._guestWidth / this._pixelRatio,
          height: this._guestHeight / this._pixelRatio
        });

        let width = this._canvas.width();
        let height = this._canvas.height();

        if (tryChangeResolution && this.options.changeResolution) {
          this.updateFitGuestSize(true);
        }

        if (this.transform !== null) {

          if(this.options.rescale)
          {
            let horizScale = parentWidth / width;
            let vertScale = parentHeight / height;
            newScale = Math.max(0.1, Math.min(horizScale, vertScale));
          }
          if(this.options.position !== null)
          {
            switch (this.options.position) {
              case WMKS.CONST.Position.CENTER:
                x = (parentWidth - width) / 2;
                y = (parentHeight - height) / 2;
                break;
              case WMKS.CONST.Position.LEFT_TOP:
                origin = "left top";
                break;
            }
          }

          if (newScale !== this._scale) {
            this._scale = newScale;
            this._canvas.css(this.transform, "scale(" + this._scale + ")");
            this._canvas.css(this.transformOrigin, origin);
          }

          if (x !== this._x || y !== this._y) {
            this._x = x;
            this._y = y;
            this._canvas.css({top: y, left: x});
          }
        } else {
          WMKS.LOGGER.warn("No scaling support");
        }
      },

      /**
       * Changes a WMKS option.
       */
      _setOption: function (key, value) {

        // mixin the option to this.options
        $.Widget.prototype._setOption.apply(this, arguments);

        switch (key) {
          case 'rescale':
          case 'position':
          case 'changeResolution':
            this.rescaleOrResize(true);
            break;

          case 'useNativePixels':
            // Return if useNativePixels is true and browser indicates no-support.
            if (value && !WMKS.UTIL.isHighResolutionSupported()) {
              WMKS.LOGGER.warn('Browser/device does not support this feature.');
              return;
            }
            this._updatePixelRatio();
            this.rescaleOrResize(true);
            break;
          case 'fixANSIEquivalentKeys':
            this._keyboardManager.fixANSIEquivalentKeys = value;
            break;
          case "keyboardLayoutId":
            this._keyboardManager.keyboardLayoutId = value;
            this._keyboardManager.UnicodeToVScanMap = WMKS.CONST.KB.VScanMap[value];
            break;
          case "sendRelativeMouseEvent":
            this._vncDecoder.options.sendRelativeMouseEvent = value;
        }
      },

      /**
       * This function could work if the option changeResolution is true and
       * the server sends back a CAPS message indicating that it can handle
       * resolution change requests.
       *
       * It will send the request about desired resolution (both width and height)
       * to the connect VM.
       */
      setRemoteScreenSize: function (width, height) {
        let newW = width * this._pixelRatio;
        let newH = height * this._pixelRatio;

        if (!this.options.changeResolution || (this._guestWidth === newW && this._guestHeight === newH)) {
          return;
        }
        // New resolution based on pixelRatio in case of changeResolution.
        this._vncDecoder.onRequestResolution(newW, newH);
      }
    });


    /**
     * The CoreWMKS class defined all the Public API(22) provided by the wmks:
     */
    WMKS.CoreWMKS = function (wmks) {
      this.wmks = wmks;
      //different version jquery has different way to get the data
      this.wmksData = wmks.data("nwmks") || wmks.data("wmks-nwmks") ;
      this.oldCssText = "";
      this.connectionState = WMKS.CONST.ConnectionState.DISCONNECTED;
      this.eventHandlers = {};

      let Event_Prefix = this.wmksData.widgetEventPrefix;
      let self = this;

      let triggerEvents = function (eventName, event, data) {
        let handlerArray = self.eventHandlers[eventName];
        if (handlerArray && handlerArray.length > 0) {
          let len = handlerArray.length;
          for (let i = 0; i < len; i++) {
            handlerArray[i].apply(wmks, [event, data]);
          }
        }
      };

      /* ----------------------- CONNECTION_STATE_CHANGE event ---------------------- */
      let connectEventsNameStr = [Event_Prefix + "connecting", Event_Prefix + "connected", Event_Prefix + "disconnected"].join(" ");

      wmks.bind(connectEventsNameStr, function (event, data) {
        data = data || {};
        let eventName = event.type;
        self.connectionState = eventName.substring(Event_Prefix.length, eventName.length);

        data.state = self.connectionState;

        triggerEvents(WMKS.CONST.Events.CONNECTION_STATE_CHANGE, event, data);
      });


      /* ---------------------------- ERROR event ---------------------------------- */

      let errorEventsNameStr = [Event_Prefix + "authenticationfailed", Event_Prefix + "error", Event_Prefix + "protocolerror" ].join(" ");

      wmks.bind(errorEventsNameStr, function (event, data) {
        let errorType;
        let cons = WMKS.CONST.ErrorType;
        let type = event.type.substring(Event_Prefix.length,event.type.length);

        data = data || {};
        switch (type) {
          case "authenticationfailed":
            errorType = cons.AUTHENTICATION_FAILED;
            break;
          case "error":
            errorType = cons.WEBSOCKET_ERROR;
            break;
          case "protocolerror":
            errorType = cons.PROTOCOL_ERROR;
            break;
        }
        if (errorType) {
          data.errorType = errorType;
          triggerEvents(WMKS.CONST.Events.ERROR, event, data);
        }
      });


      /* ---------------------- REMOTE_SCREEN_SIZE_CHANGE event -------------------- */
      wmks.bind(Event_Prefix + "resolutionchanged", function (event, data) {
        triggerEvents(WMKS.CONST.Events.REMOTE_SCREEN_SIZE_CHANGE, event, data);
      });

      /* -------KEYBOARD_LEDS_CHANGE, HEARTBEAT,AUDIO,COPY,TOGGLE ----------------- */
      let eventsNameStr = [Event_Prefix + "keyboardledschanged",
        Event_Prefix + "heartbeat",
        Event_Prefix + "copy",
        Event_Prefix + "audio",
        Event_Prefix + "toggle"].join(" ");
      wmks.bind(eventsNameStr, function (event, data) {
        let type = event.type.substring(Event_Prefix.length,event.type.length);
        if(type == "toggle")
        {
          data = {"type":arguments[1],"visibility":arguments[2]};
        }
        triggerEvents(type, event, data);
      });

      /* ------------------------ FULL_SCREEN_CHANGE event ------------------------ */

      // here the enterFullScreenHandler would be remove in the exitFullScreenHandler
      // cause the resize event maybe would be triggered for more than once,
      // and only the last one is the really fullscreen
      let enterFullScreenHandler = function (e) {

        if (!WMKS.UTIL.isFullscreenNow()) return;
        //make the wmks can occupy the whole screen
        self.wmks[0].style.cssText = "position:fixed; margin:0px; left:0px; top:0px; height:" +
          window.innerHeight + "px;" + "width:" + window.innerWidth + "px;";
        self.wmksData.rescaleOrResize(true);

        // $(window).off("resize.nwmks", enterFullScreenHandler);
        triggerEvents(WMKS.CONST.Events.FULL_SCREEN_CHANGE, e, {isFullScreen: true});
      };

      let exitFullScreenHandler = function (e) {

        $(window).off("resize.wmks", enterFullScreenHandler);

        self.wmks[0].style.cssText = self.oldCssText;
        self.wmksData.rescaleOrResize(true);

        $(window).off("resize.wmks", exitFullScreenHandler);
        triggerEvents(WMKS.CONST.Events.FULL_SCREEN_CHANGE, e, {isFullScreen: false});
      };

      this.fullScreenChangeEventStr = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "MSFullscreenChange"].join(" ");
      this.fullScreenChangeHandler = function(){
        if (!WMKS.UTIL.isFullscreenNow()) {
          $(window).off("resize.wmks", exitFullScreenHandler);
          $(window).on("resize.wmks", exitFullScreenHandler);
        }
      };
      $(document).on(this.fullScreenChangeEventStr, this.fullScreenChangeHandler);

      /************************************************************************
       * Public API
       ************************************************************************/
      // put the public API method enterFullScreen and exitFullScreen
      // here, cause need to trigger the FULL_SCREEN_CHANGE event
      WMKS.CoreWMKS.prototype.enterFullScreen = function () {

        if (WMKS.UTIL.isFullscreenNow() || !WMKS.UTIL.isFullscreenEnabled())
          return;
        this.oldCssText = wmks[0].style.cssText;
        console.log("old css is " + this.oldCssText);

        $(window).off("resize.wmks", enterFullScreenHandler);
        $(window).on("resize.wmks", enterFullScreenHandler);
        WMKS.UTIL.toggleFullScreen(true, wmks[0]);
      };


      WMKS.CoreWMKS.prototype.exitFullScreen = function () {

        if (!WMKS.UTIL.isFullscreenNow())
          return;

        $(window).on("resize.wmks", exitFullScreenHandler);
        WMKS.UTIL.toggleFullScreen(false);
      };
    };

    /************************************************************************
     * Public API
     ************************************************************************/

    // Attach the handler to the certain event for WMKS widget.
    // This can be called by consumers of WMKS to register  the
    // events to interact with the guest.
    WMKS.CoreWMKS.prototype.register = function (eventType, handler) {
      if(!eventType || !handler) return;
      //here maybe need to validate the eventName
      let handlersArray = this.eventHandlers[eventType];
      if (!handlersArray) {
        handlersArray = this.eventHandlers[eventType] = [];
      }
      handlersArray.push(handler);
      return this;
    };

    // Remove a previously-attached event handler for WMKS widget.
    WMKS.CoreWMKS.prototype.unregister = function (eventType, handler) {
      if(!eventType && !handler)
      {
        this.eventHandlers = {};
        return this;
      }

      if(eventType && !handler)
      {
        delete  this.eventHandlers[eventType];
        return this;
      }

      let handlersArray = this.eventHandlers[eventType];
      if (handlersArray && handlersArray.length > 0) {
        let len = handlersArray.length;
        for (let i = 0; i < len; i++) {
          if (handlersArray[i] === handler) {
            handlersArray.splice(i, 1);
            break;
          }
        }
        if(handlersArray.length === 0)
          delete  this.eventHandlers[eventType];
      }
      return this;
    };

    // This method retrieves the current version number of the WMKS SDK.
    WMKS.CoreWMKS.prototype.getVersion = function () {
      return WMKS.version;
    };

    // This method retrieves the current connection state. Could be any value in
    // WMKS.CONST.ConnectionState
    WMKS.CoreWMKS.prototype.getConnectionState = function () {
      return this.connectionState;
    };

    // Connects the WMKS widget to a WebSocket URL.
    //
    // Consumers should call this after they've created the WMKS by invoking the method
    // createWMKS(), and then ready to start displaying a stream from the VM.
    WMKS.CoreWMKS.prototype.connect = function (url) {
      this.wmksData.connect(url);
    };

    // Disconnects the WMKS with the VM.
    //
    // Consumers should call this when they are done with the WMKS
    // component. Destroying the WMKS will also result in a disconnect.
    WMKS.CoreWMKS.prototype.disconnect = function () {
      this.wmksData.disconnect();
    };

    // Destroys the WMKS widget.
    //
    // This will disconnect the WMKS connection (if active) and remove
    // the widget from the associated element.
    WMKS.CoreWMKS.prototype.destroy = function () {
      if (this.wmksData) {
        clearTimeout(this.wmksData._vncDecoder.resolutionTimer);
        this.wmksData.destroy();
      }

      $(document).off(this.fullScreenChangeEventStr, this.fullScreenChangeHandler);
      $(window).off("resize.wmks");
      this.wmksData = null;
      this.wmks = null;
    };

    // This function could work if the option changeResolution is true and
    // the server sends back a CAPS message indicating that it can handle
    // resolution change requests.
    //
    // It will send the request about desired resolution (both width and height)
    // to the connect VM.
    WMKS.CoreWMKS.prototype.setRemoteScreenSize = function (width, height) {
      this.wmksData.setRemoteScreenSize(width, height);
    };

    // This method retrieves the screen width and height in pixels of currently
    // connected VM.
    WMKS.CoreWMKS.prototype.getRemoteScreenSize = function () {
      return {
        width: this.wmksData._guestWidth,
        height: this.wmksData._guestHeight
      }
    };

    // This method can be invoked if the size of WMKS widget container changed.
    // The behavior of updateScreen depends on the option changeResolution,
    // rescale and position:
    // 1) if the option changeResolution is true, it would send the change resolution
    // request to the connected VM, the request resolution(width & height) is the
    // same as the container's allocated size.
    //
    // 2) check rescale option: if true, rescale the remote screen to fit the
    // container's allocated size.
    //
    // 3) check position option: If the remote screen's size is not same with
    // the container's allocated size, then put the remote screen in the center
    // or left top of the container based on its value.
    WMKS.CoreWMKS.prototype.updateScreen = function () {
      this.wmksData.rescaleOrResize(true);
    };

    // Indicates if fullscreen feature is enabled on the browser.
    //
    // Fullscreen mode is disabled on Safari as it does not support keyboard
    // input in fullscreen for "security reasons". See bug 1296505.
    WMKS.CoreWMKS.prototype.canFullScreen = function () {
      return WMKS.UTIL.isFullscreenEnabled();
    };

    // Inform if the browser is in full-screen mode.
    WMKS.CoreWMKS.prototype.isFullScreen = function () {
      return WMKS.UTIL.isFullscreenNow();
    };

    // Sends a unicode string as keyboard input to the server.
    WMKS.CoreWMKS.prototype.sendInputString = function (str) {
      this.wmksData.sendInputString(str);
    };

    // Sends a series of special key codes to the VM.
    //
    // This takes an array of special key codes and sends keydowns for
    // each in the order listed. It then sends keyups for each in
    // reverse order.
    //
    // Keys usually handled via keyPress are also supported: If a keycode
    // is negative, it is interpreted as a Unicode value and sent to
    // keyPress. However, these need to be the final key in a combination,
    // as they will be released immediately after being pressed. Only
    // letters not requiring modifiers of any sorts should be used for
    // the latter case, as the keyboardMapper may break the sequence
    // otherwise. Mixing keyDown and keyPress handlers is semantically
    // incorrect in JavaScript, so this separation is unavoidable.
    //
    // This can be used to send key combinations such as
    // Control-Alt-Delete, as well as Ctrl-V to the guest, e.g.:
    // [17, 18, 46]      Control-Alt-Del
    // [17, 18, 45]      Control-Alt-Ins
    // [17, -118]        Control-v (note the lowercase 'v')
    WMKS.CoreWMKS.prototype.sendKeyCodes = function (keyCodes) {
      this.wmksData.sendKeyCodes(keyCodes);
    };

    // Send key combination Control-Alt-Del .
    WMKS.CoreWMKS.prototype.sendCAD = function () {
      this.wmksData.sendKeyCodes([17, 18, 46]);
    };

    // This method used to show the keyboard on the mobile device
    WMKS.CoreWMKS.prototype.showKeyboard = function () {
      this.wmksData.showKeyboard();
    };

    // This method used to hide the keyboard on the mobile device
    WMKS.CoreWMKS.prototype.hideKeyboard = function () {
      this.wmksData.hideKeyboard();
    };

    // This method used to show/hide the extendedKeypad  on the mobile device
    // depend on the current visibility.
    WMKS.CoreWMKS.prototype.toggleExtendedKeypad = function (options) {
      this.wmksData.toggleExtendedKeypad(options);
    };

    // This method used to show/hide the trackpad  on the mobile device
    // depend on the current visibility.
    WMKS.CoreWMKS.prototype.toggleTrackpad = function (options) {
      this.wmksData.toggleTrackpad(options);
    };

    WMKS.CoreWMKS.prototype.toggleRelativePad = function (options) {
      this.wmksData.toggleRelativePad(options);
    };

    // This method used to enable the input device on the mobile device according to
    // the deviceType(any value in WMKS.CONST.InputDeviceType)
    WMKS.CoreWMKS.prototype.enableInputDevice = function (deviceType) {
      let cons = WMKS.CONST.InputDeviceType;
      let innerType = null;
      switch (deviceType) {
        case cons.KEYBOARD:
          this.wmksData.options.allowMobileKeyboardInput = true;
          innerType = WMKS.CONST.TOUCH.FEATURE.SoftKeyboard;
          break;
        case cons.EXTENDED_KEYBOARD:
          this.wmksData.options.allowMobileExtendedKeypad = true;
          innerType = WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad;
          break;
        case cons.TRACKPAD:
          this.wmksData.options.allowMobileTrackpad = true;
          innerType = WMKS.CONST.TOUCH.FEATURE.Trackpad;
          break;
      }
      if (innerType !== null) {
        this.wmksData._updateMobileFeature(false, innerType);
        this.wmksData._updateMobileFeature(true, innerType);
      }
    };

    // This method used to disable the input device on the mobile device according to
    // the deviceType(any value in WMKS.CONST.InputDeviceType)
    WMKS.CoreWMKS.prototype.disableInputDevice = function (deviceType) {
      let cons = WMKS.CONST.InputDeviceType;
      switch (deviceType) {
        case cons.KEYBOARD:
          this.wmksData.options.allowMobileKeyboardInput = false;
          this.wmksData._updateMobileFeature(false, WMKS.CONST.TOUCH.FEATURE.SoftKeyboard);
          break;
        case cons.EXTENDED_KEYBOARD:
          this.wmksData.options.allowMobileExtendedKeypad = false;
          this.wmksData._updateMobileFeature(false, WMKS.CONST.TOUCH.FEATURE.ExtendedKeypad);
          break;
        case cons.TRACKPAD:
          this.wmksData.options.allowMobileTrackpad = false;
          this.wmksData._updateMobileFeature(false, WMKS.CONST.TOUCH.FEATURE.Trackpad);
          break;
      }
    };

    // Changes a WMKS option.
    //
    // Only these options changed in this way would have effect
    // - rescale
    // - position
    // - changeResolution
    //   - useNativePixels
    // -	reverseScrollY
    //   - fixANSIEquivalentKeys
    //   - sendProperMouseWheelDeltas
    WMKS.CoreWMKS.prototype.setOption = function (key, value) {
      this.wmksData._setOption(key, value);
    };

    // This is a factory method. It should be the first method when you use WMKS SDK.
    // By using this method, it would generate the widget which could display the
    // remote screen, and then return the WMKS core object which could use all the
    // WMKS API to connect to a VM and perform operations.
    WMKS.createWMKS = function (id, options) {
      let wmks = $("#" + id).nwmks(options);

      return new WMKS.CoreWMKS(wmks);
    };

    WMKS.buildNumber = "4504321";
    WMKS.version = "2.1.0"
  })();

  return WMKS;
}
