/**
 * @author alice
 */
var pjax = function(){

    /**
     * The identifier for the content container
     */
    var containerId = null;
    
    /**
     * The identifier for the nav menu buttons
     */
    var menuButtonId = null;
    
    /**
     * My own component object
     */
    var component = null;
    
    /**
     * Initializes PJAX.
     */
    function initialize(){
        $('a[data-pjax]').pjax(containerId);
        $(containerId).bind("end.pjax", updatePage);
    }
    
    function updatePage(){
        var pathname = document.location.pathname,
            snippetId = pathname.substr(1, pathname.length);
      
        // Update the menu
        $(menuButtonId).parent().removeClass("active");
        $("#" + snippetId + "-link").parent().attr("class", "active");
        
        // Animate the content
        $(containerId).effect("slide", {
            direction: "right"
        }, "slow");
      
        // Publish load event for the other JS tasks
        hub.publish(component, "/container/load", {
          containerId: containerId
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
            return 'de_akquinet_product_pjax';
        },
        
        /**
         * Configure method. This method is called when the
         * component is registered on the hub.
         * @param theHub the hub
         * @param configuration the configuration
         */
        configure: function(theHub, configuration){
            hub = theHub;
            containerId = configuration.containerId;
            menuButtonId = configuration.menuButtonId;
        },
        
        /**
         * The Start function
         * This method is called when the hub starts or just
         * after configure if the hub is already started.
         */
        start: function(){
            component = this;
            
            // Initialize PJAX
            initialize();
            
        },
        
        /**
         * The Stop method is called when the hub stops or
         * just after the component removal if the hub is
         * not stopped. No events can be sent in this method.
         */
        stop: function(){
        
        },
        
        update: function(){
            updatePage();
        }
    }
    
}
