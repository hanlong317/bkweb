define(['jquery', 'utils'], function($)
{
    var ns = 'jfc';
    window[ns] = {};

    // datepicker ext
    var datepickerOptions =
    {
        lang : 'en',
        skin : 'joinfun',
        errDealMode : 1,
        isShowClear : true,
        qsEnabled : false,
        dateFmt: 'yyyy-MM-dd',
        position :
        {
            left : 0,
            top : -3
        }
    };
    var laydateOptions =
    {
        format: 'YYYY-MM-DD',
        skin: 'molv'
    };

    function showDatepicker(el)
    {
        if(!el || !window['WdatePicker'])
        {
            return;
        }
        var $formElementGroup = $(el).closest('.form-element-group');
        var _setting = $formElementGroup.attr('data-datepicker-setting');

        try
        {
            (function()
            {
                _setting = _setting && eval('(' + _setting + ')');
            })();
        }
        catch(ex)
        {
            alert('data setting arguments error .');
        }

        _setting = _setting || {};

        $formElementGroup.data('setting', _setting);

        _setting.format ? (datepickerOptions.dateFmt = _setting.format ) : (datepickerOptions.dateFmt = 'yyyy-MM-dd');

        _setting.min ? (datepickerOptions.minDate = $(_setting.min).val()) : (delete datepickerOptions.minDate);

        _setting.max ? (datepickerOptions.maxDate = $(_setting.max).val()) : (delete datepickerOptions.maxDate);

        datepickerOptions.onpicked = function(dp)
        {
            var $formElementGroup = $(dp.el).closest('.form-element-group');
            var _setting =  $formElementGroup.data('setting');

            _setting.max && showDatepicker($(_setting.max)[0]);

            (typeof _setting.onpicked === 'function') && _setting.onpicked(dp);
        }
        datepickerOptions.onpicking = function(dp)
        {
            var $formElementGroup = $(dp.el).closest('.form-element-group');
            var _setting =  $formElementGroup.data('setting');

            (typeof _setting.onpicking === 'function') && _setting.onpicking(dp);
        }

        datepickerOptions.el = el;
        WdatePicker(datepickerOptions);
    }

    function showLaydate(el)
    {
        if(!el || !window['laydate'])
        {
            return;
        }
        var $formElementGroup = $(el).closest('.form-element-group');
        var _setting = $formElementGroup.attr('data-datepicker-setting');
        var $id = $(el).attr('id');
        laydateOptions.elem = '#' + $id;
        try
        {
            (function()
            {
                _setting = _setting && eval('(' + _setting + ')');
            })();
        }
        catch(ex)
        {
            alert('data setting arguments error .');
        }

        _setting = _setting || {};

        $formElementGroup.data('setting', _setting);

        _setting.format ? (laydateOptions.format = _setting.format ) : (laydateOptions.format = 'YYYY-MM-DD');

        _setting.min ? (laydateOptions.min = $(_setting.min).val()) : (delete laydateOptions.min);

        _setting.max ? (laydateOptions.max = $(_setting.max).val()) : (delete laydateOptions.max);

        var $today = $formElementGroup.attr('today-after');
        if($today == 'true'){
            laydateOptions.min = laydate.now();
        }

        laydateOptions.choose = function(date)
        {
            var el = $formElementGroup.find('.text');
            var $setting =  _setting.choose;
            if ($setting == 'true') {
                (typeof setting === 'function') && setting(date,el);
            };
        }
        laydate.skin('molv');
        laydate(laydateOptions);
    }

    // form element group
    $(document).delegate('.form-element-group[data-role="datepicker"] .text', 'click focus', function()
    {
        showDatepicker(this);
    });

    $(document).delegate('.form-element-group[data-role="datepicker"] .addon', 'click', function()
    {
        showDatepicker($(this).prev(':input')[0]);
    });

    //new datepicker
    $(document).delegate('.form-element-group[data-role="laydatepicker"] .text', 'click focus', function()
    {
        showLaydate(this);
    });

    $(document).delegate('.form-element-group[data-role="laydatepicker"] .addon', 'click', function()
    {
       showLaydate($(this).prev(':input')[0]);
    });

    // open max widnow
    $(document).delegate('a[data-open="maxWindow"]', 'click', function()
    {
        var $this = $(this);
        if($this.attr('data-ignore') === 'true')
        {
            return false;
        }

        Utils.openMaximizeWindow($(this).attr('href'));
        return false;
    });

    // accordion
    $(document).delegate('.accordion .hd .hd-text', 'click', function(e, data)
    {
        var $hd = $(this).closest('.hd');
        var $bd = $hd.next('.bd');

        !$bd.is(':animated') &&  $bd.slideToggle(300, function()
        {
            $hd.toggleClass('off');
            $hd.closest('.repeat-item').find('.repeat-remove').show();
            $('.off').closest('.repeat-item').find('.repeat-remove').hide();
            window[ns].accordioning && window[ns].accordioning($hd, $bd);
        });
    });

    // tabs
    $(document).delegate('.tabs .tabs-nav li a', 'click', function()
    {
        var $this = $(this).closest('li').addClass('active');
        var $nav = $this.closest('.tabs-nav');
        var $bd = $nav.next('.tabs-bd');
        var _index = $this.index();

        var $panel = $bd.find('.tab-panel').eq(_index).addClass('active');

        $nav.find('li').not($this).removeClass('active');
        $bd.find('.tab-panel').not($panel).removeClass('active');

         //window[ns].tabChange && window[ns].tabChange(index);
    });

    //loading
    $.extend(
    {
        loading : function(text)
        {
            $('.loading-mask,.loading-text').remove();
            if(!text || text === '')
            {
                return;
            }
            $('body').append('<div class="loading-mask"></div><div class="loading-text" ><em>' + text + '</em></div>');
            var $loadingText = $('.loading-text');

            $loadingText.css(
            {
                'margin-left' : -$loadingText.outerWidth(true)/2
            }).show();
        },
        loadding : function()
        {
            alert('loadding 方法已弃用，请使用 loading 。');
        },
        showGlobalMessage: function(message, type, time)
        {
            time = time || 3000;
            var $globalMessage = $('.global-message');
            if($globalMessage.size() > 0 )
            {
                $globalMessage.remove();
            }
            $globalMessage = $('<div class="global-message"><div class="message-text"><h2>提示信息</h2><ul class="actionMessage">#text#</ul></div></div>'.replace('#text#', message)).appendTo($('.show-message'));
            $globalMessage.addClass(type);
            $globalMessage.slideToggle(500);
            //$globalMessage.fadeIn(5000);

            if(time === -1)
            {
                return;
            }
            setTimeout(function()
            {
                $globalMessage.slideToggle(500);
                //$.hideGlobalMessage();
            }, time);
        },
        hideGlobalMessage: function()
        {
            $('.global-message').fadeOut(2000, function()
            {
                $('.global-message').remove();
            });
        }
    });

    //页面加载后获取提示信息，有则提示
    var $showtext = $('.actionMessage').html();
    if ($showtext != '') {
        $.showGlobalMessage($showtext,"global-message",5000);
    }else{
         return;
    };

    //table high light
    $.fn.tableHighlight = function()
    {
        $('> tbody', this).find('> tr').removeClass('even odd').filter('tr:even').addClass('odd').end().filter('tr:odd').addClass('even').end().filter(' tr').hover(
        function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')});
    };
    $('.table-highlight').tableHighlight();

    // ptip ext
    ;$.fn.tip = function(options)
    {
        var defaults =
        {
            className : 'tip-yellowsimple',
            alignTo: 'target',
            alignX: 'center',
            offsetY: 4
        };
        if(typeof options === 'string')
        {
            defaults.content = options;
            $.extend(defaults, arguments[1]);
        }
        else
        {
            $.extend(defaults, options);
        }
        this.poshytip && this.poshytip(defaults);
    };

    $('a[data-role="tip"]').tip();

    // micro tip
    var _microTipTimer = null;
    $.extend(
    {
        microTip : function(options, target)
        {
            $.microAlert(options, target, 'tip')
        }
    });

    // micro confirm
    $.extend(
    {
        microConfirm : function(options, target)
        {
            $.microAlert(options, target, 'confirm')
        }
    });

    // micro alert
    $.extend(
    {
        microAlert : function(options, target, type)
        {
            if(!target)
            {
                return;
            }

            type = type || 'alert';
            var _microTipTmpl = '<div class="micro-tip"><div class="confirm-text">{0}</div></div>';
            var _microAlertTmpl = '<div class="micro-alert"><div class="confirm-text">{0}</div><div class="confirm-buttons"><a href="javascript:;" class="confirm">{1}</a></div></div>';
            var _microConfirmTmpl = '<div class="micro-confirm"><div class="confirm-text">{0}</div><div class="confirm-buttons"><a href="javascript:;" class="confirm">{1}</a><a href="javascript:;" class="cancel">{2}</a></div></div>';
            var _tmpl = null;

            var _remove = function(){$('.micro-tip,.micro-alert,.micro-confirm').remove();};
            _remove();
            clearTimeout(_microTipTimer);

            var defaults =
            {
                message : '?',
                confirm  : '确定',
                cancel : '取消',
                delay : 1200,
                onConfirm : $.noop,
                onCancel : $.noop
            };

            options = $.extend(defaults, options);
            switch(type)
            {
                case 'confirm' :
                {
                    _tmpl = _microConfirmTmpl.replace('{0}', options.message).replace('{1}', options.confirm).replace('{2}', options.cancel);
                    break;
                }
                case 'alert' :
                {
                    _tmpl = _microAlertTmpl.replace('{0}', options.message).replace('{1}', options.confirm);
                    break;
                }
                case 'tip' :
                {
                    _tmpl = _microTipTmpl.replace('{0}', options.message);

                    _microTipTimer = setTimeout(function()
                    {
                        _remove();
                    }, options.delay)
                    break;
                }
            }

            var $microAlert = $(_tmpl).appendTo($('body'));
            var $target = $(target);

            var _css =
            {
                'top' : $target.offset().top - $microAlert.outerHeight(true) - 8 ,
                'left' : $target.offset().left - $microAlert.outerWidth(true)/2 + $target.outerWidth(true)/2
            };

            $microAlert.css(_css).fadeIn(300);

            $microAlert.find('.confirm').click(function()
            {
                options.onConfirm();
                _remove();
            });
            $microAlert.find('.cancel').click(function()
            {
                options.onCancel();
                _remove();
            });
        }
    });

    // select bind title
    $(document).delegate('select', 'mouseover', function()
    {
        var $this = $(this);
        if($this.data('data-bind-title'))
        {
            return;
        }

        $this.data('data-bind-title', true).find('option').each(function()
        {
            var $option = $(this);
            var _text = $.trim($option.text());
            if(_text.length > 0 && !$option.attr('title'))
            {
                $option.attr('title', _text);
            }
        });
    });

    // fill data
    ;$.fn.fillData = function(data)
    {
        if(!data)
        {
            alert('data is null .');
            return;
        }
        $(':input[name]', this).each(function()
        {
            var $this = $(this);
            var _value = null;
            try
            {
                 _value = eval('data.' + this.name);
            }
            catch(ex){}

            if(_value === null || _value === undefined)
            {
                return;
            }

            var _type = $this.prop('type').toLowerCase();
            switch(_type)
            {
                case 'radio':
                {
                    if($this.val() == _value)
                    {
                        $this.prop('checked', true);
                    }
                    break;
                }
                case 'checkbox':
                {
                    if(!$.isArray(_value))
                    {
                        break;
                    }
                    for(var i in _value)
                    {
                        if($this.val() == _value[i])
                        {
                            $this.prop('checked', true);
                        }
                    }
                    break;
                }
                default :
                {
                    $this.val(_value);
                }
            }
        });
    };

    // render select options
    ;$.fn.renderOptions = function(data)
    {
        var _setting =
        {
            prefix : 'data-',
            exclude : []
        }
        var textField, valueField;
        if(!data || !data.length)
        {
            return;
        }
        if(typeof arguments[1] === 'object')
        {
            _setting = $.extend(_setting, arguments[1]);
        }
        else if(typeof arguments[1] === 'string' && typeof arguments[2] === 'string')
        {
            _setting.textField = arguments[1];
            _setting.valueField = arguments[2];
        }

        $(this).each(function()
        {
            var _options = '';
            for (var i = 0 ; i < data.length; i++)
            {
                var _item = data[i];
                var $option = $('<option></option>');
                $option.html(_item[_setting.textField]);
                $option.val(_item[_setting.valueField]);
                for(var p in _item)
                {
                    if(p !== _setting.textField && p !== _setting.valueField && ($.inArray(p,_setting.exclude) === -1))
                    {
                        p === 'selected' ? $option.attr(p, _item[p]) : $option.attr(_setting.prefix + p, _item[p]);
                    }
                }
                _options += $option[0].outerHTML;
            };
            $(this).append(_options);
        });
    };

    //select custom reload
    ;$.fn.selectMultipleRreload = function()
    {
        $(this).each(function()
        {
            var $this = $(this);
            $this.customSelect('reload');
        });
    };

    // textarea char count
    $('.textarea-char-count .textarea').bind('input propertychange', function()
    {
        var $this = $(this);
        var $textareacount = $this.closest('.textarea-char-count');
        var $normal = $textareacount.find('.count .normal').hide();
        var $overflow = $textareacount.find('.count .overflow').hide();
        var _maxcount = $textareacount.attr('data-char-count');
        var _count = $this.val().length;

        if(!_maxcount)
        {
            return;
        }

        if(_maxcount >= _count)
        {
            $normal.show().find('i').html(_maxcount - _count );
        }
        else
        {
            $overflow.show().find('i').html( Math.abs(_maxcount - _count) );
        }
    }).trigger('input').trigger('propertychange');



    // file upload
    $(document).delegate('.file-upload .upload :file', 'change', function()
    {
        $(this).closest('.upload').find(':input[type="text"]').val(this.value);
    });

    //带删除按钮的文本框
     $(document).delegate('.row .icon-delete', 'click', function(e)
    {
        //$(this).closest('.col-content').find(':input[type="text"]').val('');
        //var _thisText = $(this).closest('.col-content').find(':input[type="text"]');
        var _thisText = $(this).prev(':input[type="text"]');
        var _disabled = _thisText.attr('disabled');
        var _readonly = _thisText.attr('readonly');
        if (!_disabled && !_readonly) {
           _thisText.val('');
           $(this).hide();
        };
    });

    //text delete
    $('.text-delete').after('<a href="javascript:;" class="icon-delete" style="display: inline-block;"></a>')
    .bind('input propertychange',function()
    {
        var $this = $(this);
        var $delete = $this.next('.icon-delete');
        if($this.val().length > 0)
        {
            $delete.css({'display' : 'inline-block'});
        }
        else
        {
            $delete.hide();
        }
    }).trigger('propertychange');

    return null;

});
