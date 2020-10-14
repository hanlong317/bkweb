
require(['components'], function()
{
    var _selector = {};
    var _actionType = '';
    var _isMultiple = true;

    var $key = $('.text.key');
    var $cateList = $('.cate-list a');
    var $letterList = $('.letter-list a');
    var $selectedList = $('.selected-list');
    var $sourceList = $('.source-list');

    //set old item
    if(_isMultiple)
    {
        var _oldItems = opener && opener.callBackGetOldItems && opener.callBackGetOldItems(_actionType);
        var _selectedSmes = $('.selected-list-sme').length;
        if(_selectedSmes == 1){
          $('.selected-list-sme').renderOptions(_oldItems, 'label', 'value');
          var _oldKeyItems = opener && opener.callBackGetOldKeyItems && opener.callBackGetOldKeyItems(_actionType);
          $('.selected-list').renderOptions(_oldKeyItems, 'label', 'value');
          console.log(_oldItems);
          console.log(_oldKeyItems);
        }else {
          $('.selected-list').renderOptions(_oldItems, 'label', 'value');
        }
    }

    var _search = function()
    {
        _selector.search && _selector.search();
    };
    // active search
    $(document).delegate('.button.search, .cate-list a, .letter-list a', 'click', function(e)
    {
        var $this = $(this);
        if($this.is('a'))
        {
            $this.closest('.cate-list, .letter-list').find('a').removeClass('selected');
            $this.addClass('selected');
        }

        _search();

    });

    $(document).delegate('.filter .select', 'change', function()
    {
        _search();
    });

    //reset
    $(document).delegate('.button.reset', 'click', function(e)
    {
        $cateList.removeClass('selected').first().addClass('selected');
        $letterList.removeClass('selected').first().addClass('selected');
        $key.val('');

        _search();
    });

    //close
    $(document).delegate('.button.close', 'click', function()
    {
        window.close();
    });
    $(document).delegate('.confirm-single', 'click', function(){
      var $this = $(this);
      var _items = [];
      var _singleList = $('.selected-single-list').find('option:selected');
      if (_singleList.length == 0) {
        alert("请选择您需要的信息!");
        return;
      }else {
        _singleList.each(function()
        {
            var $this = $(this);
            var _item =
            {
                value : $this.val(),
                label : $this.text()
            };

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
            _actionType = getUrlParam('actionType');
            opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
            window.close();
        });
      }
    });
    $(document).delegate('.confirm-msme', 'click', function(){
      var $this = $(this);
      var _items = [];
      var _itemsSme = [];
      var _itemsKey = [];//回去选择的关键字
      var _smeList = $('.selected-list-sme').find('option');
      var _smeKeyList = $('.selected-list').find('option');
      if (_smeList.length == 0) {
        alert("请选择您需要的信息!");
        return;
      }else {
        _smeList.each(function()
        {
            var $this = $(this);
            var _item =
            {
                value : $this.val(),
                label : $this.text()
            };

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
            _itemsSme.push(_item);
        });
        _smeKeyList.each(function()
        {
            var $this = $(this);
            var _item =
            {
                value : $this.val(),
                label : $this.text()
            };

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
            _itemsKey.push(_item);
        });
        _items.push(_itemsSme);
        _items.push(_itemsKey);
        _actionType = getUrlParam('actionType');
        opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
        console.log(_items);
        window.close();
      }
    });
    $(document).delegate('.selected-single-list', 'dblclick', function(){
      $('.confirm-single').trigger('click');
    });
    //confirm or clear
    $(document).delegate('.confirm, .clear', 'click', function()
    {
        var $this = $(this);
        var _items = [];
        if ($('.source-list').attr('multiple') == 'multiple') {
          _isMultiple = true;
        }else {
          _isMultiple = false;
        }
        //is clear
        if($this.hasClass('clear'))
        {
            _actionType = getUrlParam('actionType');
            opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
            window.close();
            return;
        }

        if(_selector.confirm)
        {
            _selector.confirm(_items);
        }
        else
        {
            (_isMultiple ? $('.selected-list').find('option') : $('.source-list').find('option:selected')).each(function()
            {
                var $this = $(this);
                var _item =
                {
                    value : $this.val(),
                    label : $this.text()
                };

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
        _actionType = getUrlParam('actionType');
        //(typeof callBackSelectedOK === 'function') && callBackSelectedOK(_items,_actionType);
        if(_items.length == 0){
          alert("请选择您需要的信息!");
          return;
        }else {
          opener && opener.callBackSelectedOK && opener.callBackSelectedOK(_items, _actionType);
          window.close();
        }
    });
    function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]); return null; //返回参数值
    }
    // move to right
    $(document).delegate('.operate-list .right', 'click', function()
    {
        var _items = $('.selected-list').find('option');
        $('.source-list').find('option:selected').prop('selected', false).each(function()
        {
            var $this = $(this);
            if(_items.filter('[value="' + $this.val() + '"]').size() === 0)
            {
                $('.selected-list').append($this.clone());
            }
        });
    });

    // move to left
    $(document).delegate('.operate-list .left', 'click', function()
    {
        $('.selected-list').find('option:selected').remove();
    });
    $(document).delegate('.selected-list', 'dblclick', function()
    {
        $('.selected-list').find('option:selected').remove();
    });

    // remove all left
    $(document).delegate('.operate-list .all-left', 'click', function()
    {
        $('.selected-list').empty();
    });

    // source list dblclick
    $(document).delegate('.source-list', 'dblclick', function()
    {
      if ($(this).attr('multiple') == 'multiple') {
        _isMultiple = true;
      }else {
        _isMultiple = false;
      }
        _isMultiple ? $('.operate-list .right').trigger('click') : $('.confirm').trigger('click');
    });

    // enter active search
    $(document).delegate('.text.key', 'keypress', function(e)
    {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
        if(keyCode != 13)
            return;

        _selector.search && _selector.search();
        e.preventDefault();
    });

    (typeof requireReady === 'function') && requireReady(_selector);
}, function(err)
{
    window['console'] && console.log && console.log(err.message);
});
