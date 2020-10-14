(function()
{
    var _ = {};
    var _selectorType = window['_selectorType'] || {};

    _.main = function($sender)
    {
        var _selector = $sender.attr('data-selector');
        try
        {
            if(!_selector)
            {
                return;
            }
            (function()
            {
                _selector = eval('(' + _selector + ')');
            })();
        }
        catch(ex)
        {
            alert('data selector arguments error .');
        }

        if(!_selector.type)
        {
            alert('selector type is null .');
            return;
        }

        if(!_selectorType[_selector.type])
        {
            alert('selector type not found .');
            return;
        }

        _selector.keySplit = _selector.keySplit || window['_selectorKeySplit'];
        _selector.sender = $sender;
        _selector.config = _selectorType[_selector.type];
        _selector.args = _selector.args || {};
        _selector.args.isMultiple = _selector.config.isMultiple;
        if(window[_selector.onBefore] &&  window[_selector.onBefore](_selector) === false)
        {
            return;
        }
        _.selector = _selector;
        _.openSelector();
    };

    _.openSelector = function()
    {
        var _url = ( _.selector.config.ctx || window['ctx'] || ''  ) + _.selector.config.url ;
	    _url.indexOf('?') === -1 ? _url += '?' : _url += '&';
        _url += $.param(_.selector.args);
        Utils.openWindow(_url, _.selector.config.size);
    };
    _.getOrigin = function()
    {
        var _items = [];
        var $sender = _.selector.sender;
        if($sender.hasClass('multiple-selector'))
        {
            var $select  = $sender.find('select[multiple]');
            $select.find('option').each(function()
            {
                var $this = $(this);
                var _item = {};
                _item.value = $this.val();
                _item.label = $this.text();

                //ext attrs
                var _attrs = $this[0].attributes;
                for(var i in _attrs)
                {
                    var _attr = _attrs[i];
                    var _match = ( _attr.name && _attr.name.match(/^data-(.*)/));
                    if(!_match || _match.length !== 2)
                    {
                        continue;
                    }
                    _item[_match[1]] = _attr.value;
                }
                _items.push(_item);
            });
        }
        // input single or multiple
        else if($sender.hasClass('form-element-group') && _.selector.args.isMultiple )
        {
            var $label = $sender.find('.el-input').find('input');
            var $value = $sender.find('.hidden');
            if($label.val().length === 0 || $value.val().length === 0)
            {
                return _items;
            }

            var _labels = $label.val().split(';');
            var _values = $value.val().split(',');
            for(var i = 0, l = _labels.length ; i < l; i++)
            {
                _items.push(
                {
                    value : _values[i],
                    label : _labels[i]
                });
            };
        }
        return _items;
    };
    _.getOrigins = function()
    {
        var _items = [];
        var $sender = _.selector.sender;
        var $label = $sender.find('.key-label');
        var $value = $sender.find('.key-value');
        if($label.val().length === 0 || $value.val().length === 0)
        {
            return _items;
        }

        var _labels = $label.val().split(';');
        var _values = $value.val().split(',');
        for(var i = 0, l = _labels.length ; i < l; i++)
        {
            _items.push(
            {
                value : _values[i],
                label : _labels[i]
            });
        };
        console.log(_items.length);
        return _items;
    };
    window['callBackGetOldItems']= _.getOrigin;
    window['callBackGetOldKeyItems']= _.getOrigins;
    // register evant
    $(document).on('click', '.form-element-group[data-selector] .text, .form-element-group[data-selector] .el-icon-search, .form-element-group[data-selector] .el-button', function()
    {
        var $elementGroup = $(this).closest('.form-element-group');
        if($elementGroup.find('.text[data-name="label"]:disabled').size() > 0)
        {
            return;
        }
        _.main($elementGroup);
    });

    $(document).on('click', '.multiple-selector[data-selector] .action .selector', function()
    {
        var $multipleSelector = $(this).closest('.multiple-selector');
        if($multipleSelector.find('.select:disabled').size() > 0)
        {
            return;
        }
        _.main($(this).closest('.multiple-selector'));
    });

    // multiple delete
    $(document).delegate('.multiple-selector[data-selector] .action .delete', 'click', function(e)
    {
        var $options  = $(this).closest('.multiple-selector').find('select[multiple] option:selected');
        $options.remove();
    });
})();
