// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE


// Edited for lineone.dev by Santiago Debus

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  function wordRegexp(words) {
    return new RegExp("^((" + words.join(")|(") + "))\\b");
  }

  var wordOperators = wordRegexp(["and", "or", "not"]);



var commonKeywords = [
  'if',
  'else',
  'then',
  'for',
  'to',
  'step',
  'do',
  'while',
  'function',
  'return',
  'continue',
  'break',
  'endfunction',
  'endfor',
  'endwhile',
  'endif',
];


  var commonBuiltins = [
    "print()",
    "alert()",
    "insert()",
    "number()",
    "text()",
    "minus()",
    "mayus()",
    "sqrt()",
    "joun()",
    "max()",
    "join()",
    "min()",
    "abs()",
    "ln()",
    "log()",
    "sin()",
    "cos()",
    "tan()",
    "isnumber()",
    "istext()",
    "islist()",
    "add()",
    "remove()",
    "extend()",
    "replace()",
    "len()",
    "random()",
    "substring()",
    "find()",
    "trunc()",
    "round()",
    "ceil()",
    "floor()",
    "date()"
  ];




  CodeMirror.registerHelper("hintWords", "precodigo", commonBuiltins);

  function top(state) {
    return state.scopes[state.scopes.length - 1];
  }

  CodeMirror.defineMode("precodigo", function(conf, parserConf) {
    var ERRORCLASS = "";

    var delimiters = parserConf.delimiters || parserConf.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/;
    //               (Backwards-compatibility with old, cumbersome config system)
    var operators = [
      parserConf.singleOperators,
      parserConf.doubleOperators,
      parserConf.doubleDelimiters,
      parserConf.tripleDelimiters,
      parserConf.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/
    ]

    for (var i = 0; i < operators.length; i++){
      if (!operators[i]){
        operators.splice(i--, 1)
      }

    }

    var hangingIndent = parserConf.hangingIndent || conf.indentUnit;

    var myKeywords = commonKeywords, myBuiltins = commonBuiltins;
    if (parserConf.extra_keywords != undefined)
      myKeywords = myKeywords.concat(parserConf.extra_keywords);

    if (parserConf.extra_builtins != undefined)
      myBuiltins = myBuiltins.concat(parserConf.extra_builtins);



    var identifiers = parserConf.identifiers|| /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
    myKeywords = myKeywords.concat([
      "true",
      "false",
      "null",
      "pi",
      "mod",

    ]);

    myBuiltins = myBuiltins.concat([

    ]);

    var stringPrefixes = new RegExp("^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|\"{3}|['\"]))", "i");

    var keywords = wordRegexp(myKeywords);
    var builtins = wordRegexp(myBuiltins);

    // tokenizers
    function tokenBase(stream, state) {
      var sol = stream.sol() && state.lastToken != "\\"
      if (sol) state.indent = stream.indentation()
      // Handle scope changes

      return tokenBaseInner(stream, state);
    }

    function tokenBaseInner(stream, state, inFormat) {
      if (stream.eatSpace()) return null;

      // Handle Comments
      if (!inFormat && stream.match(/^#.*/)) return "comment";

      // Handle Number Literals
      if (stream.match(/^[0-9\.]/, false)) {
        var floatLiteral = false;
        // Floats
        if (stream.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)) { floatLiteral = true; }
        if (stream.match(/^[\d_]+\.\d*/)) { floatLiteral = true; }
        if (stream.match(/^\.\d+/)) { floatLiteral = true; }
        if (floatLiteral) {
          // Float literals may be "imaginary"
          stream.eat(/J/i);
          return "number";
        }
        // Integers
        var intLiteral = false;
        // Hex
        if (stream.match(/^0x[0-9a-f_]+/i)) intLiteral = true;
        // Binary
        if (stream.match(/^0b[01_]+/i)) intLiteral = true;
        // Octal
        if (stream.match(/^0o[0-7_]+/i)) intLiteral = true;
        // Decimal
        if (stream.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)) {
          // Decimal literals may be "imaginary"
          stream.eat(/J/i);
          // TODO - Can you have imaginary longs?
          intLiteral = true;
        }
        // Zero by itself with no other piece of number.
        if (stream.match(/^0(?![\dx])/i)) intLiteral = true;
        if (intLiteral) {
          // Integer literals may be "long"
          stream.eat(/L/i);
          return "number";
        }

      }

      // Handle Strings
      if (stream.match(stringPrefixes)) {
        var isFmtString = stream.current().toLowerCase().indexOf('f') !== -1;
        if (!isFmtString) {
          state.tokenize = tokenStringFactory(stream.current(), state.tokenize);
          return state.tokenize(stream, state);
        } else {
          state.tokenize = formatStringFactory(stream.current(), state.tokenize);
          return state.tokenize(stream, state);
        }
      }

      for (var i = 0; i < operators.length; i++)
        if (stream.match(operators[i])) return "operator"

      if (stream.match(delimiters)) return "punctuation";

      if (state.lastToken == "." && stream.match(identifiers))
        return "";

      if (stream.match(keywords) || stream.match(wordOperators))
        return "keyword";



      if (stream.match(builtins))
        return "builtin";

      if (stream.match(/^(self|cls)\b/))
        return "variable-2";

      if (stream.match(identifiers)) {
        if (state.lastToken == "function")
          return "def";
        return "variable";
      }



      // Handle non-detected items
      stream.next();
      return inFormat ? null :ERRORCLASS;
    }

    function formatStringFactory(delimiter, tokenOuter) {
      while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
        delimiter = delimiter.substr(1);

      var singleline = delimiter.length == 1;
      var OUTCLASS = "string";

      function tokenNestedExpr(depth) {
        return function(stream, state) {
          var inner = tokenBaseInner(stream, state, true)
          if (inner == "punctuation") {
            if (stream.current() == "{") {
              state.tokenize = tokenNestedExpr(depth + 1)
            } else if (stream.current() == "}") {
              if (depth > 1) state.tokenize = tokenNestedExpr(depth - 1)
              else state.tokenize = tokenString
            }
          }
          return inner
        }
      }

      function tokenString(stream, state) {
        while (!stream.eol()) {
          stream.eatWhile(/[^'"\{\}\\]/);
          if (stream.eat("\\")) {
            stream.next();
            if (singleline && stream.eol())
              return OUTCLASS;
          } else if (stream.match(delimiter)) {
            state.tokenize = tokenOuter;
            return OUTCLASS;
          } else if (stream.match('{{')) {
            // ignore {{ in f-str
            return OUTCLASS;
          } else if (stream.match('{', false)) {
            // switch to nested mode
            state.tokenize = tokenNestedExpr(0)
            if (stream.current()) return OUTCLASS;
            else return state.tokenize(stream, state)
          } else if (stream.match('}}')) {
            return OUTCLASS;
          } else if (stream.match('}')) {
            // single } in f-string is an error
            return ERRORCLASS;
          } else {
            stream.eat(/['"]/);
          }
        }
        if (singleline) {
          if (parserConf.singleLineStringErrors)
            return ERRORCLASS;
          else
            state.tokenize = tokenOuter;
        }
        return OUTCLASS;
      }
      tokenString.isString = true;
      return tokenString;
    }

    function tokenStringFactory(delimiter, tokenOuter) {
      while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
        delimiter = delimiter.substr(1);

      var singleline = delimiter.length == 1;
      var OUTCLASS = "string";

      function tokenString(stream, state) {
        while (!stream.eol()) {
          stream.eatWhile(/[^'"\\]/);
          if (stream.eat("\\")) {
            stream.next();
            if (singleline && stream.eol())
              return OUTCLASS;
          } else if (stream.match(delimiter)) {
            state.tokenize = tokenOuter;
            return OUTCLASS;
          } else {
            stream.eat(/['"]/);
          }
        }
        if (singleline) {
          if (parserConf.singleLineStringErrors)
            return ERRORCLASS;
          else
            state.tokenize = tokenOuter;
        }
        return OUTCLASS;
      }
      tokenString.isString = true;
      return tokenString;
    }

    function pushPrecodigoScope(state) {

      //state.lastToken == "funcion"

      //console.log("count: 111111111")
      while (top(state).type != "py"){
        state.scopes.pop()
      }

      var thistop = top(state).offset + conf.indentUnit;



      if (state.lastToken == "function") {

        thistop -= 2; // indent
      }



      state.scopes.push({
        offset: thistop,
        type: "py",
        align: null}
      )
    }

    function pushBracketScope(stream, state, type) {
      var align = stream.match(/^[\s\[\{\(]*(?:#|$)/, false) ? null : stream.column() + 1
      state.scopes.push({offset: state.indent + hangingIndent,
                         type: type,
                         align: align})
    }

    function dedent(stream, state) {
      var indented = stream.indentation();
      while (state.scopes.length > 1 && top(state).offset > indented) {
        if (top(state).type != "py") return true;
        state.scopes.pop();
      }
      return top(state).offset != indented;
    }

    function tokenLexer(stream, state) {
      if (stream.sol()) {
        state.beginningOfLine = true;
        state.dedent = false;
      }

      var style = state.tokenize(stream, state);
      var current = stream.current();


      if (/\S/.test(current)) state.beginningOfLine = false;

      if ((style == "variable" || style == "builtin")
          && state.lastToken == "meta")
        style = "meta";

      // Handle scope changes.
      if (
        current == "endif"
        || current == "endfor"
        || current == "endwhile"
        || current == "endfunction"
      )
        state.dedent = true;




      if (
        current == "then"
        || current == "do"
        || state.lastToken == "function"
      ){

        //console.log("state:", state)


        pushPrecodigoScope(state);
      }




      if (current.length == 1 && !/string|comment/.test(style)) {
        var delimiter_index = "[(".indexOf(current);
        if (delimiter_index != -1)
          pushBracketScope(stream, state, "])".slice(delimiter_index, delimiter_index+1));

        delimiter_index = "])".indexOf(current);
        if (delimiter_index != -1) {
          if (top(state).type == current) state.indent = state.scopes.pop().offset - hangingIndent
          else return ERRORCLASS;
        }
      }




      if (current == "if"
        && state.lastToken == "else"
        && (conf.indentUnit - state.indent == conf.indentUnit)
      ) {
        state.dedent = true;
      }

      if (state.dedent && stream.eol() && top(state).type == "py" && state.scopes.length > 1){

        if (current == "endfunction") {
          state.scopes.pop();
        }
        state.scopes.pop();



      }

      return style;
    }

    var external = {
      startState: function(basecolumn) {
        return {
          tokenize: tokenBase,
          scopes: [{offset: basecolumn || 0, type: "py", align: null}],
          indent: basecolumn || 0,
          lastToken: null,
          lambda: false,
          dedent: 0
        };
      },

      token: function(stream, state) {
        var addErr = state.errorToken;
        if (addErr) state.errorToken = false;
        var style = tokenLexer(stream, state);

        if (style && style != "comment")
          state.lastToken = (style == "keyword" || style == "punctuation") ? stream.current() : style;

        if (style == "punctuation") style = null;

        //if (stream.eol() && state.lambda)
        //  state.lambda = false;
        return addErr ? style + " " + ERRORCLASS : style;
      },

      indent: function(state, textAfter) {
        if (state.tokenize != tokenBase)
          return state.tokenize.isString ? CodeMirror.Pass : 0;

        var scope = top(state)
        var closing = scope.type == textAfter.charAt(0) ||
            scope.type == "py" && !state.dedent && /^(else|endif|endfor|endwhile|endfunction)/.test(textAfter)
        if (scope.align != null)
          return scope.align - (closing ? 1 : 0)
        else
          return scope.offset - (closing ? hangingIndent : 0)
      },

      electricInput: /^\s*([\}\]\)]|else|endif|endfor|endwhile|endfunction)$/,
      closeBrackets: {triples: "'\""},
      lineComment: "#",
      fold: "brace"
    };
    return external;
  });

  CodeMirror.defineMIME("text/x-precodigo", "precodigo");

  var words = function(str) { return str.split(" "); };

  CodeMirror.defineMIME("text/x-precodigo", {
    name: "precodigo",
    extra_keywords: words("by cdef cimport cpdef ctypedef enum except "+
                          "extern gil include nogil property public "+
                          "readonly struct union DEF IF ELIF ELSE")
  });

});
