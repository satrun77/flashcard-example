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