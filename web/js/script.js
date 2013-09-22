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
var moofc = moofc || {};
moofc.homepage = {
    options: {
        events: null,
        onClick: null,
        onHoverIn: null,
        onHoverOut: null,
        onLoadMore: null,
        loadMoreMax: 30,
        loadMoreContent: 'Loading more...',
        loadMoreCompeteMessage: 'All cards are loaded!',
        width: '175px',
        height: '175px'
    },
    init: function(args) {
        this.options.events = this.events;
        this.options.onClick = this._onClick;
        this.options.onHoverIn = this._onHoverIn;
        this.options.onHoverOut = this._onHoverOut;
        this.options.onLoadMore = this._onLoadMore;
        $.extend(this.options, args);
        this.options.events.call(this);
        this.options.onLoadMore.call(this);
        return this;
    },
    events: function() {
        var me = this, container = $('#fc-cards');
        container.on('click', '.fc-cardwrap', function(e) {
            return me.options.onClick.call(me, this, e);
        });
        container.on('mouseenter', '.fc-cardwrap', function(e) {
            return me.options.onHoverIn.call(me, this, e);
        });
        container.on('mouseleave', '.fc-cardwrap', function(e) {
            return me.options.onHoverOut.call(me, this, e);
        });
        return this;
    },
    _onClick: function(el, e) {
        var wrap = $(el);
        var card = wrap.find('.fc-card:first');
        var cover = this._coverTempate(card.attr('id'), wrap);
        if (!wrap.hasClass('open')) {
            wrap.addClass('open');
            wrap.animate({
                position: 'aboslute',
                width: card.outerWidth(true),
                height: card.outerHeight(true)
            });
            cover.fadeOut();
        } else {
            wrap.removeClass('open');
            wrap.animate({
                position: 'static',
                width: this.options.width,
                height: this.options.height
            });
            cover.animate({
                width: this.options.width,
                height: this.options.height
            });
        }
    },
    _onHoverIn: function(el, e) {
        var wrap = $(el);
        if (!wrap.hasClass('open')) {
            var card = wrap.find('.fc-card:first');
            this._coverTempate(card.attr('id'), wrap).show();
        }
    },
    _onHoverOut: function(el, e) {
        var wrap = $(el);
        var card = wrap.find('.fc-card:first');
        this._coverTempate(card.attr('id'), wrap).hide();
    },
    _onLoadMore: function() {
        var page = 1, me = this, button = $('#fc-loadmore');
        button.click(function() {
            page += 1;
            moofc.waitingMessage.init({
                extraClasses: 'fc-waiting-top',
                content: me.options.loadMoreContent
            }).show();
            $.ajax({
                url: FC_BASEURL + "/api/cards.html?page=" + page + "&limit=" + me.options.loadMoreMax,
                success: function(html) {
                    $('#fc-cards').append(html);
                    $("html, body").animate({scrollTop: $(document).height()}, 1000);
                },
                complete: function() {
                    moofc.waitingMessage.hide();
                },
                error: function(xhr, status, error) {
                    button.attr('disabled', 'disabled');
                    button.text(me.options.loadMoreCompeteMessage);
                    setTimeout(function() {
                        button.fadeOut('slow');
                    }, 1000);
                }
            });
        });
    },
    _coverTempate: function(id, wrap) {
        var coverid = id + 'cover';
        var cover = wrap.find('#' + coverid);
        if (cover.length === 0) {
            cover = $('<div class="fc-cardcover" id="' + coverid + '"></div>').appendTo(wrap);
        }
        cover.css({
            width: wrap.width(),
            height: wrap.height()
        });
        return cover;
    }
};