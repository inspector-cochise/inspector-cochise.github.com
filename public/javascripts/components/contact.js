/**
 * @author alice
 */
var contact = function(){

    /**
     * The identifier for the form
     */
    var formId = null;
    
    /**
     * The identifier for the submit button
     */
    var buttonId = null;
    
    /**
     * The identifier for the form result message
     */
    var messageId = null;
    
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
     * Initializes the contact form.
     */
    function initialize(){
        $("[required]").prev().append(' <span class="mandatory">*</span>');
        $(buttonId).button();
        var options = {
            url: 'Contact/mail',
            type: 'POST',
            success: function(data){
                if (data.success == 'true') {
                    $(messageId).html(data.message).removeClass("error").addClass("success");
                }
                else {
                    $(messageId).html(data.message).removeClass("success").addClass("error");
                }
            },
            clearForm: true,
            dataType: 'json',
            beforeSubmit: validateContactForm
        };
        
        // pass options to ajaxForm
        $(formId).ajaxForm(options);
    }
    
    /**
     * Validates the contact form submission.
     *
     * @param {Object} formData
     * @param {Object} jqForm
     * @param {Object} options
     */
    function validateContactForm(formData, jqForm, options){
        var validator = $(formId).validate({
          rules: {
            name: "required",
            email: {
              required: true,
              email: true
            },
            content: "required"
          },
          messages: {
            name: i18n('view.contact.name.required'),
            email: {
              required: i18n('view.contact.email.required'),
              email: i18n('view.contact.email.email')
            },
            content: i18n('view.contact.message.required')
          }
        });
        if (validator.form()) {
            return true;
        }
        else {
            $(messageId).html(i18n('view.contact.form.invalid')).addClass("error");
            return false;
        }
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
            return 'de_akquinet_product_contact';
        },
        
        /**
         * Configure method. This method is called when the
         * component is registered on the hub.
         * @param theHub the hub
         * @param configuration the configuration
         */
        configure: function(theHub, configuration){
            hub = theHub;
            formId = configuration.formId;
            buttonId = configuration.buttonId;
            messageId = configuration.messageId;
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
