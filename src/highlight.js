Prism.languages['oal'] = {
    'string': {
        pattern: /"[^"]*"/,
        greedy: true
    },
    'comment': {
        pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: true
    },
    'annotation': {
        pattern: /#[^\r\n]*[\r\n]*|`[^`]*`/,
        greedy: true,
        alias: 'comment'
    },
    'builtin': /\b(num|str|uri|bool|int)\b/,
    'content-meta': {
        pattern: /\b(media|headers|status)\b/,
        alias: 'builtin'
    },
    'operator': /(::|->|[!?&~|=:])/,
    'named-operator': {
        pattern: /\b(as|on|rec)\b/,
        alias: 'operator'
    },
    'constant': /\b(get|put|post|patch|delete|options|head)\b/,
    'keyword': /\b(let|res|use)\b/,
    'literal-url': {
        pattern: /\/[0-9a-zA-Z%~_.-]*/,
        alias: 'url'
    },
    'property': /'[0-9a-zA-Z$@_-]+/,
    'ref-variable': {
        pattern: /@[0-9a-zA-Z$_-]+/,
        alias: 'variable'
    },
    'variable': /[a-zA-Z_][0-9a-zA-Z$_-]*/,
    'literal-status-range': {
        pattern: /[1-5]XX/,
        alias: 'number'
    },
    'number': /[0-9]+/,
    'punctuation': /[{}()\[\]<>;.,]/
};