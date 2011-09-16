/**
 * @author alice
 */
var subcontent = function(){

    /**
     * My own component object
     */
    var component = null;
    
    /**
     * The identifier for the details sections
     */
    var sectionId = null;

    /**
     * The identifier for the submenu items
     */
    var menuId = null;
    
    function show(feature){
        var menuItem = "#" + feature.attr("id") + "-link";
        $(sectionId + ".open").removeClass("open");
        feature.addClass("open");
        $(menuId + ".active").removeClass("active");
        $(menuItem).addClass("active");
    }
    
    function initialize(){
        var hash = document.location.hash.toString(), 
            anchorId = hash.substring(1, hash.length), 
            anchor = null;
        
        $(menuId).click(function(){
            var toOpen = $(this).attr("id").split("-")[0];
            show($("#" + toOpen));
        });
        
        if (anchorId) {
            $(sectionId).each(function(){
                if ($(this).is("#" + anchorId)) {
                    anchor = $(this);
                    return false;
                }
            });
        }
        
        // If the anchor is a menu item, open it
        // Otherwise, open the first menu item
        if (anchor) {
            show(anchor);
        }
        
        // Regardless of whether or not the anchor is a 
        // menu item, scroll to it
        if (anchorId) {
            anchor = document.getElementById(anchorId);
            if (anchor) {
                anchor.scrollIntoView();
            }
        }
    }
    
    /**
     * Called when a /container/load event is received.
     * @param {Object} event
     */
    function callback(event){
        initialize();
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
            return 'de_akquinet_product_details';
        },
        
        /**
         * Configure method. This method is called when the
         * component is registered on the hub.
         * @param theHub the hub
         * @param configuration the configuration
         */
        configure: function(theHub, configuration){
            hub = theHub;
            sectionId = configuration.sectionId;
            menuId = configuration.menuId;
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
    
}
