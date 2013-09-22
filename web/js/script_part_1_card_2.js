var moofc = moofc || {};
moofc.card = {
    options: {
        loadMoreContent: 'Please wait...',
        searchField: '#fc-search',
        searchButton: '#fc-search-btn',
        onSearch: null,
        onComplete: null
    },
    init: function(args) {
        this.options.onSearch = this._onSearch;
        this.options.onComplete = this._onComplete;
        $.extend(this.options, args);
        this.options.onSearch.call(this);
        return this;
    },
    show: function(card) {
        var id = card.attr('id');
        $('#' + id).remove();
        $(document.body).append(card);
        if (card) {
            card.css({
                top: $(document).scrollTop() + (($(window).height() / 2) - (card.height() / 2)) + 'px',
                position: 'absolute',
                margin: '0px 0px 0px -' + (card.outerWidth(true) / 2) + 'px'
            });
            card.draggable({cursor: 'move'});
            card.find('.close').click(function(e) {
                card.fadeOut(function() {
                    card.remove();
                });
            });
            if (typeof twttr !== 'undefined') {
                twttr.widgets.load();
            }
            card.show();
        }
        return this;
    },
    _onComplete: function(data, form) {
        var card = $(data);
        if (card.length > 0) {
            this.show(card);
        } else {
            moofc.error(data);
        }
    },
    _onSearch: function() {
        var me = this;
        $(this.options.searchButton).click(function(e) {
            e.preventDefault();
            var form = $(this).parent();
            moofc.waitingMessage.init({
                extraClasses: 'fc-waiting-top',
                content: me.options.loadMoreContent
            }).show();
            $.ajax({
                url: form.attr('action'),
                type: 'html',
                method: 'get',
                data: {query: $(me.options.searchField).val()},
                success: function(html) {
                    me.options.onComplete.call(me, html, form);
                },
                complete: function() {
                    moofc.waitingMessage.hide();
                }
            });
        });
    }
};