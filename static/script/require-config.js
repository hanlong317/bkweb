var require =
{
	paths:
    {
        jquery : 'jquery',
        utils : 'utils',
		selectorHelp : 'selector-help',
        selectorHelpConfig : 'selector-help-config',
		components : 'component',
    },
    shim:
    {
        browser:
        {
            deps: ['jquery']
        },
        components:
        {
            deps: ['jquery']
        },
		selectorHelp:
        {
            deps: ['jquery', 'selectorHelpConfig']
        }
    }
};
