class Identifiers{
    constructor(){
        this.TK_INT = 'INT';
        this.TK_FLOAT = 'FLOAT';
        this.TK_BOOLEAN = 'BOOLEAN';
        this.TK_STRING = 'STRING';
        this.TK_PLUS = 'PLUS';
        this.TK_MINUS = 'MINUS';
        this.TK_MUL = 'MUL';
        this.TK_DIV = 'DIV';
        this.TK_DIV_INTEGER = 'DIVINT';
        this.TK_MOD = 'MOD';
        this.TK_POW = 'POW';
        this.TK_LPAREN = 'LPAREN';
        this.TK_RPAREN = 'RPAREN';
        this.TK_LSQBRA = 'LSQBRA';
        this.TK_RSQBRA = 'RSQBRA';
        this.TK_IDENTIFIER = 'IDENTIFIER';
        this.TK_IDENTIFIER_DEFINED = 'IDENTIFIER_DEFINED';
        this.TK_EQUALS = 'EQUALS';
        this.TK_KEYWORD = 'KEYWORD';
        this.TK_IS_EQ = 'IS_EQUAL';
        this.TK_IS_NEQ = 'IS_NOT_EQUAL';
        this.TK_IS_LT = 'IS_LT';
        this.TK_IS_GT = 'IS_GT';
        this.TK_IS_LTE = 'IS_LTE';
        this.TK_IS_GTE = 'IS_GTE';
        this.TK_COMMA = 'COMMA';
        this.TK_ARROW = 'ARROW';
        this.TK_NEWLINE = 'NEWLINE';
        this.TK_EOF = 'EOF';
    }

    reserved(){
        return [
            'null',
            'true',
            'false',
            'pi',
            "and",
            "or",
            "not",
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
            "print",
            "alert",
            "insert",
            "number",
            "text",
            "minus",
            "mayus",
            "sqrt",
            "join",
            "max",
            "min",
            "abs",
            "ln",
            "log",
            "sin",
            "cos",
            "tan",
            "isnumber",
            "istext",
            "islist",
            "add",
            "remove",
            "extend",
            "replace",
            "len",
            "random",
            "substring",
            "find",
            "trunc",
            "round",
            "ceil",
            "floor",
            "date"

        ];
    }

    nums(){
        return '0123456789.';
    }
    letters(){
        var en = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var es = 'ñáéíóúÑÁÉÍÓÚ';
        var pt = 'áâãàçéêèíìóôõòúù';
        var fr = 'îôûçëïü';
        return en+es+pt+fr;
    }

    spanish_keywords(){
        return [
            'if', 'and', 'or', 'not',
            'else', 'then', 'for', 'to',
            'con', 'step', 'do', 'while',
            'function', 'return',
            'continue', 'break', 'endfunction',
            'endfor', 'endwhile','endif',
        ];
    }

}




module.exports = Identifiers;
