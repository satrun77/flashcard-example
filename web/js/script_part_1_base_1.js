var moofc = {
    options: {},
    waitingMessage: {
        waiting: null,
        options: {
            content: 'Please wait...',
            extraClasses: '',
            template: function() {
                return '<div class="well well-sm fc-waiting ' + this.options.extraClasses + '">'
                        + this.options.content
                        + '<div class="progress progress-striped active">'
                        + '<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">'
                        + '</div></div>'
                        + '</div>';
            },
            appendTo: null
        },
        init: function(args) {
            this.setOptions(args);
            return this;
        },
        setOptions: function(args) {
            this.options.appendTo = $(document.body);
            $.extend(this.options, args);
            return this;
        },
        show: function() {
            if (!this.waiting) {
                this._build();
            }
            this.waiting.fadeIn();
            return this;
        },
        hide: function() {
            if (this.waiting) {
                this.waiting.fadeOut();
            }
            return this;
        },
        _build: function() {
            this.waiting = $(this.options.template.call(this));
            this.waiting.appendTo(this.options.appendTo);
            return this;
        }
    },
    error: function(message) {
        return alert(message);
    }
};