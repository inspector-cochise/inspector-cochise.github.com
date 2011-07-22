/**
 * @author alice
 */
var highlight = function(){

    /**
     * My own component object
     */
    var component = null;
    
    /**
     * Initializes the SyntaxHighlighter.
     */
    function initialize(){
        $.SyntaxHighlighter.init({
            'stripEmptyStartFinishLines': true,
            'lineNumbers': false,
            'wrapLines': true,
        });
    }
    
    /**
     * Called when a /container/load event is received.
     * @param {Object} event
     */
    function callback(event){
        highlight(event.containerId);
    }
    
    /**
     * Does the actual highlighting of code blocks within
     * the specified container.
     * @param {Object} containerId
     */
    function highlight(containerId){
        $(containerId).syntaxHighlight();
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
            return 'de_akquinet_product_highlight';
        },
        
        /**
         * Configure method. This method is called when the
         * component is registered on the hub.
         * @param theHub the hub
         * @param configuration the configuration
         */
        configure: function(theHub, configuration){
            hub = theHub;
        },
        
        /**
         * The Start function
         * This method is called when the hub starts or just
         * after configure if the hub is already started.
         */
        start: function(){
            component = this;
            
            // Initialize the SyntaxHighlighter
            initialize();
            
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
