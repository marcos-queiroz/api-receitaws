$(document).ready(function(){
    console.log("MAIN JS carregado...");

    // captura o valor ao digitar no input
    $("#cnpj").on("keyup", function(){
        // remove os caracteres (mascara)
        var cnpj = $(this).val().replace(/[^\d]+/g,'');

        // verifica o tamanho do valor informado
        if(cnpj.length == 14){
            getReceita(cnpj, function(data){
                if(data.status == "ERROR"){
                    $("#feedback_cnpj").html(data.message);
                    $("#cnpj").addClass("is-invalid");
                }else{
                    $("#feedback_cnpj").html("");
                    $("#cnpj").removeClass("is-invalid").addClass("is-valid");

                    $("#nome").val(data.nome);
                    $("#fantasia").val(data.fantasia);
                    $("#logradouro").val(data.logradouro);
                    $("#complemento").val(data.complemento);
                    $("#bairro").val(data.bairro);
                    $("#numero").val(data.numero);
                    $("#cep").val(data.cep);
                    $("#municipio").val(data.municipio);
                    $("#uf").val(data.uf);
                    $("#email").val(data.email);
                    $("#telefone").val(data.telefone);
                }
            });            
        }else{
            console.log("CNPJ incorreto");
        }
    });
});

// função para consumir a API receitaWS
function getReceita(cnpj, callback){
    $.ajax({
        url: "https://www.receitaws.com.br/v1/cnpj/"+ cnpj,
        method:'GET',
        dataType: 'jsonp',
    }).done(function(data) {
        callback(data);
    });
}
