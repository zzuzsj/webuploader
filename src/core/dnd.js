/**
 * @fileOverview 错误信息
 */
define( 'webuploader/core/dnd', [ 'webuploader/base',
        'webuploader/core/mediator',
        'webuploader/core/runtime/client'
        ], function( Base, Mediator, RuntimeClent ) {

    var $ = Base.$,
        defaultOpts = {
            accept: [{
                title: 'image',
                extensions: 'gif,jpg,bmp,png'
            }]
        };

    function DragAndDrop( opts ) {
        var container;

        opts = opts || {};

        opts.container = $( opts.container );

        if ( !opts.container.length ) {
            throw new Error( '容器没有找到' );
        }

        opts = this.options = $.extend( {}, defaultOpts, opts );
        RuntimeClent.call( this, opts );
    }

    Base.inherits( RuntimeClent, {
        constructor: DragAndDrop,

        init: function() {
            var me = this,
                args = Base.slice( arguments );

            me.on( 'runtimeInit', function( runtime ){
                this.runtime = runtime;
                this.ruid = runtime.uid;
                me.exec( 'DragAndDrop', 'init', args );
            } );

            me.conncetRuntime();
        },

        destroy: function() {
            if ( this.runtime ) {
                this.exec( 'DragAndDrop', 'destroy' );
                this.disconncetRuntime();
            }
        }
    } );

    Mediator.installTo( DragAndDrop.prototype );

    return DragAndDrop();
});