const Tokenization = require('./tokenization.js');
const Context = require('./context.js');
const Parser = require('./parser.js');
const Interpreter = require('./interpreter.js');
const Symbol_ = require('./symbol.js');
const BuiltIn = require('./builtin.js');
const Number_ = require('./number.js');


var symbol_table = new Symbol_();


function create_default_symbol_table(){

  const Boolean_ = require('./boolean.js');

  symbol_table.set('null', Boolean_.null);
  symbol_table.set('true', Boolean_.true);
  symbol_table.set('false', Boolean_.false);
  symbol_table.set('pi', new Number_(Math.PI));
  symbol_table.set('print', new BuiltIn('print'));
  symbol_table.set('alert', new BuiltIn('print2'));
  symbol_table.set('len', new BuiltIn('length'));
  symbol_table.set('sqrt', new BuiltIn('square'));
  symbol_table.set('input', new BuiltIn('input'));

  symbol_table.set('isnumber', new BuiltIn('is_number'));
  symbol_table.set('istext', new BuiltIn('is_string'));
  symbol_table.set('islist', new BuiltIn('is_list'));
  symbol_table.set('add', new BuiltIn('push_back'));
  symbol_table.set('remove', new BuiltIn('pop'));
  symbol_table.set('join', new BuiltIn('concat'));
  symbol_table.set('insert', new BuiltIn('insert'));
  symbol_table.set('replace', new BuiltIn('replace'));
  symbol_table.set('random', new BuiltIn('random'));
  symbol_table.set('minus', new BuiltIn('lower'));
  symbol_table.set('mayus', new BuiltIn('upper'));
  symbol_table.set('substring', new BuiltIn('substring'));
  symbol_table.set('find', new BuiltIn('find'));
  symbol_table.set('number', new BuiltIn('to_number'));
  symbol_table.set('text', new BuiltIn('to_string'));
  symbol_table.set('abs', new BuiltIn('abs'));
  symbol_table.set('ln', new BuiltIn('ln'));
  symbol_table.set('log', new BuiltIn('log'));
  symbol_table.set('sin', new BuiltIn('sin'));
  symbol_table.set('cos', new BuiltIn('cos'));
  symbol_table.set('tan', new BuiltIn('tan'));
  symbol_table.set('trunc', new BuiltIn('trunc'));
  symbol_table.set('round', new BuiltIn('round'));
  symbol_table.set('max', new BuiltIn('max'));
  symbol_table.set('min', new BuiltIn('min'));
  symbol_table.set('floor', new BuiltIn('floor'));
  symbol_table.set('ceil', new BuiltIn('ceil'));
  symbol_table.set('date', new BuiltIn('date'));

}
create_default_symbol_table();



//console.log("test:", new BuiltIn('print'))

function empty(tokens){
    for (var i = 0; i < tokens.length; i++) {
        if(tokens[i] != "NEWLINE" && tokens[i] != "EOF"){
            return false;
        }
    }
    return true;
}

function run(fn, txt){



    const context = new Context('<web>');
    context.symbol_table = symbol_table;

    const t = new Tokenization(fn, txt, context).create_tokens();

    //console.log("t:",t);





    if (t.error != null) {

        //return {
        //    'error':t.error.as_string(),
        //}
        var div = document.createElement("div");
        div.className = 'executePrint';

        div.innerHTML = `
          <div class='resrow'  style="color: #d3d4d3;">${t.error.as_string()}</div>
        `;

        document.getElementById("response").appendChild(div);

        return true;

    }


    if (t.tokens.length == 1 && t.tokens[0].type == "EOF") {
      // empty
      return true;
    }



    var parser = new Parser(t.tokens, context);
    var ast = parser.parse();

    if (ast.error) {
        //return {
        //'error':ast.error
        //}
        var div = document.createElement("div");
        div.className = 'executePrint';

        div.innerHTML = `
          <div class='resrow'  style="color: #d3d4d3;">${ast.error.as_string()}</div>
        `;

        document.getElementById("response").appendChild(div);

        return true;
    }


    //console.log("node:", ast.node);

    //symbol_table.reset();
    symbol_table = new Symbol_();
    create_default_symbol_table();

    context.symbol_table = symbol_table;


    var inter = new Interpreter();
    try{
        var res = inter.run(ast.node, context);
    }catch(err){



        var div = document.createElement("div");
        div.className = 'executePrint';

        div.innerHTML = `
          <div class='resrow'  style="color: #ef6161;">
            Error de sintaxis
          </div>
        `;

        document.getElementById("response").appendChild(div);

        return true;

    }

    //console.log("res:", res);


    if (res) {

        if (res.error != null && res.error != "empty") {
            //document.getElementById("response").innerHTML = r.error.as_string();

            var div = document.createElement("div");
            div.className = 'executePrint error';

            div.innerHTML = `
              <div class='resrow'  style="color: #d3d4d3;">${res.error.as_string()}</div>
            `;

            document.getElementById("response").appendChild(div);
        }

    }

    // finish
    return true;
}

//async function Precodigo(fn, txt){
//  var r = run(fn, txt);
//}
/*
function Precodigo(fn, txt){

  var r = run(fn, txt);

}
*/


/*

function torun(){

    var v = document.getElementById("torun").value;

    var r = run("web", v);

    //console.log("r:",r);

    //console.log("res: ", r)


    if (r) {

        if (r.error != null && r.error != "empty") {

            document.getElementById("results").innerHTML = r.error.as_string();
        }

        else{

            document.getElementById("results").innerHTML = r.value.elements[0].value;



        }
    }
}

document.getElementById("buttonrun").addEventListener("click", torun);
*/


exports.run = run;
