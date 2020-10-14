var _selectorKeySplit = ',';
//select type
var _selectorType =
{
	'Emp':
	{
		ctx : window['emctx'],
		url : '/#/em/select!selectEmployeeSingle.do',
		isMultiple : false,
		size :
		{
			width : 420,
			height : 630
		}
	},
  'Factory':
	{
		url : '/#/selector/selectorFactory',
		isMultiple : false,
		size :
		{
			width : 420,
			height : 606
		}
	},
  'StaticEmp':
	{
		url : '/#/selector/selectorStaticEmp',
		isMultiple : false,
		size :
		{
			width : 420,
			height : 606
		}
	},
  'Dept':
	{
		url : '/#/selector/selectorDept',
		isMultiple : false,
		size :
		{
			width : 420,
			height : 606
		}
	},
	'Section':
	{
		url : '/#/selector/selectorSection',
		isMultiple : false,
		size :
		{
			width : 760,
			height : 640
		}
	},
	'MSection':
	{
		ctx : window['ctx'],
		url : '/selector/selectorSections',
		isMultiple : true,
		size :
		{
			width : 720,
			height : 630
		}
	},
	'Sme':
	{
		url : '/#/selector/selectorSme',
		isMultiple : true,
		size :
		{
			width : 720,
			height : 630
		}
	},
	'MSme':
	{
		url : '/#/selector/selectorSmes',
		isMultiple : true,
		size :
		{
			width : 1020,
			height : 630
		}
	},
	'MEmp':
	{
		ctx : window['emctx'],
		url : '/html/selector/selector-emp-much.html',
		isMultiple : true,
		size :
		{
			width : 760,
			height : 636
		}
	},
	'Groups':
	{
		url : '/html/selector/selector-groups.html',
		isMultiple : false,
		size :
		{
			width : 350,
			height : 606
		}
	},
	'MGroups':
	{
		url : '/html/selector/selector-groups-much.html',
		isMultiple : true,
		size :
		{
			width : 702,
			height : 630
		}
	},
	'Organization':
	{
		url : '/html/selector/selector-organization.html',
		isMultiple : true,
		size :
		{
			width : 350,
			height : 630
		}
	},
	'MOrganization':
	{
		url : '/html/selector/selector-organization-much.html',
		isMultiple : true,
		size :
		{
			width : 702,
			height : 630
		}
	},
	'All':
	{
		url : '/html/selector/selector-all.html',
		isMultiple : true,
		size :
		{
			width : 688,
			height : 640
		}
	}
};

//select function
var _selectorFun =
{
	clear : function(args)
	{
		if(!args)
		{
			return;
		}
		$.each(args, function(i, item)
		{
			var $this = $(item);
			$this.is(':input') ? $this.val('') : $this.html('');
		});
	},

	public : function(args, actionType, items)
	{
		alert(args + '/' + actionType + '/' + items);
	}
};


/**
 * ctx: 上下文根; 一般由"${ctx }"标签获得
 * actionType：标志位; 可以是任意值，通过选人CallBack方法传递回来。
 * 		   如果一个页面使用了多个选人框, 可以通过这个值来区分。
 * isMultiple：true/false; true：多选。
 * markIsDeleted: Y:只显示"离职"的; N:只显示"在岗"的; ''：显示全部;
 *
 *
 * 包含2个CallBack方法
 * function callBackGetOldItems(action) 获取已经选择的人员
 * function callBackSelectedOK(employees, action) 确认选人后的回调
 *
 * 数据结构为 {label,value}
 *
 * callBackSelectedOK(employee,actionType)
 * employee带出属性有:value(empuid),label(displayname),phone,empid,email,divisionCode
 */
