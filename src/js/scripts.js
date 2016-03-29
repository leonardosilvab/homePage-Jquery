$(document).ready(function(){
    var $formCategoria = $('#form-categoria');
    var groups = {'artista':$('#artista-group'), 'album':$('#album-group')};
    var helpBlocks = {'artista':$('#artista-help'), 'album':$('#album-help')};
    var $formInputs = $formCategoria.find('input');
    var $listaVisualCategorias = $('#lista-categorias');


    function mostrarErros(erros) {
        for (var propriedade in erros) {
          var msgDeErro = erros[propriedade];
          groups[propriedade].addClass('has-error');
          helpBlocks[propriedade].text(msgDeErro);
        }
      }

    function limparErros() {
        for (var p in groups) {
          var $g = groups[p];
          $g.removeClass('has-error');
          helpBlocks[p].empty();
        }
      }

    function  mostrarCategorias(categoria){
        var linha = '<li class="text-left">';
        linha += '<b>Artista: </b>';
        linha+=categoria.artista;
        linha+=" ";
        linha+='<b>Album:</b> ';
        linha+=categoria.album;
        linha+=" ";
        linha += '<button title="Remover" class="btn btn-danger btn-sm">';
        linha += '<i class="glyphicon glyphicon-remove-circle"></i></<button>';
        linha += '</li>';
        var $linhaNoDom=$(linha);
        $linhaNoDom.find('.btn-danger').click(function () {
          console.log(categoria.id);
          $linhaNoDom.remove();
        });
        $listaVisualCategorias.append($linhaNoDom);
    }

    $formCategoria.submit(function (evento) {
        evento.preventDefault();
        limparErros();

        var categoria = {};
        $formInputs.each(function (i, input) {
          var $input = $(input);
          categoria[$input.attr('name')] = $input.val();
        });

        var erros = {};

        var flagErro = false;
        for (var p in categoria) {
          if (categoria[p] === '') {
            flagErro = true;
            erros[p] = 'Campo obrigatório';
          }
        }
        if (flagErro) {
          mostrarErros(erros);
        } else {
          mostrarCategorias(categoria);
        }


      });


});