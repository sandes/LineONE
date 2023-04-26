const Tracer = require('./tracer.js');


class Error_{
    constructor(pos_start, pos_end, error_name, details){
        this.pos_start = pos_start;
        this.pos_end = pos_end;
        this.error_name = error_name;
        this.details = details;
    }

    as_string(){

        var end =this.pos_end;
        end.idx = this.pos_start.idx;
        end.ln = this.pos_start.ln + 0;
        end.col = this.pos_start.col + 4;


        var result =`${this.error_name} : <strong>${this.details} <\/strong><br>`;
        result += `File ${this.pos_start.fn}: line ${this.pos_start.ln + 1}`;

        const t = new Tracer(this.pos_start.ftxt, this.pos_start, end);
        result += `<br><br> ${t.tracer_error()}`

        return result;
    }
}

class IllegalCharError extends Error_{
    constructor(pos_start, pos_end, details){
        super(
          pos_start,
          pos_end,
          'Character is not valid',
          "<span style='color: #ef6161;'>"+details+"</span>"
        );
    }
}

class RunTimeError extends Error_{
    constructor(pos_start, pos_end, details, context){
        super(
          pos_start,
          pos_end,
          'Runtime error',
          "<span style='color: #ef6161;'>"+details+"</span>"
        );
        this.context = context;
    }
    as_string(){
        var result = this.generate_traceback();
        result = result + `${this.error_name} : <strong>${this.details}<\/strong>`;

        var end = this.pos_end;
        end.idx = this.pos_start.idx;
        end.ln = this.pos_start.ln;
        end.col = this.pos_start.col + 4;

        const t = new Tracer(this.pos_start.ftxt, this.pos_start, end);
        result += `<br><br> <div style='color: #ef6161;'>${t.tracer_error()}<\/div>`


        return result;


    }
    generate_traceback(){
        var result = '';
        var pos = this.pos_start;
        var ctx = this.context;

        while (ctx){

            result = `File ${pos.fn}: <strong> line ${pos.ln + 1} <\/strong>, ${ctx.display_name}<br>` + result;

            pos = ctx.parent_entry_pos;
            ctx = ctx.parent;
        }

        return 'Error tracer:<br>' + result;
    }

}

class InvalidSyntaxError extends Error_{
    constructor(pos_start, pos_end, details){

        super(
          pos_start,
          pos_end,
          'Syntax error',
          "<span style='color: #ef6161;'>"+details+"</span>"
        );
    }

}

module.exports = {
    Error_: Error_,
    IllegalCharError: IllegalCharError,
    RunTimeError: RunTimeError,
    InvalidSyntaxError: InvalidSyntaxError,
};
