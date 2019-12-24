requirejs.config({
    baseUrl: "./scripts",
    paths: {
        moment: ["../node_modules/moment/moment"] // This mapping is relative to "baseUrl"
    }
});

requirejs(['moment', 'model', 'services', 'index', 'risorse', 'edifici', 'sale', 'prenotazioni']);


//'../node_modules/underscore/underscore',
// <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
// <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script> 