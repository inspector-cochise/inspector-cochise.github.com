/**
 * @author alice
 */
var slideshow = function(){

    /**
     * The identifier for the slides container
     */
    var slidesId = null;
    
    /**
     * My own component object
     */
    var component = null;
    
    /**
     * Called when a /container/load event is received
     * @param {Object} event
     */
    function callback(event){
        initialize();
    }
    
    /**
     * Initialize the slideshow.
     */
    function initialize(){
        $(slidesId).slides({
            pagination: false,
            generatePagination: false,
            play: 3000
        });
    }
    
    return {
    
        //*********************//
        // Component Interface //
        //*********************//
        
        /**
         * Method returning the component's <b>unique</b>
         * name. Using a fully qualified name is encouraged.
         * @return the component unique name
         */
        getComponentName: function(){
            return 'de_akquinet_product_slideshow';
        },
        
        /**
         * Configure method. This method is called when the
         * component is registered on the hub.
         * @param theHub the hub
         * @param configuration the configuration
         */
        configure: function(theHub, configuration){
            hub = theHub;
            slidesId = configuration.slidesId;
        },
        
        /**
         * The Start function
         * This method is called when the hub starts or just
         * after configure if the hub is already started.
         */
        start: function(){
            component = this;
            
            // Then, we subscribe to the /container/load topic
            hub.subscribe(this, "/container/load", callback);
            
        },
        
        /**
         * The Stop method is called when the hub stops or
         * just after the component removal if the hub is
         * not stopped. No events can be sent in this method.
         */
        stop: function(){
        
        }
    }
    
};
