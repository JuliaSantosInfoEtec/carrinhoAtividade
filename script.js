

//Oi professora, não sei se fiz do jeito que pediu, então coloquei minhas respostas aqui e no README também para não haver problemas :D




//esse "const produtos" está declarando uma constante que irá se identificar como "produtos" 
//e está armazenando uma array ([]) que possui dois objetos ({}), dentro deles há propriedades
const produtos = [
    {
        id: "1",
        nome: "Informática para Internet: Interfaces Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de Javascript",
        imagem: "./assets/1.png",

    },
    {
        id: "2",
        nome: "Gestão de conteúdo Web II",
        prof: "Prof. Kelly",
        preco_de: 80,
        preco_por: 50,
        descricao: "O melhor curso de Javascript",
        imagem: "./assets/3.png",
    }
];


// Esta função está sendo usada para renderizar (ou seja, ser responsável por exibir a página da web)
 //uma listas na página, pois ela usa a estrutura de repetição "for" para percorrer a array
  //chamada "produtos" e renderizar um elemento curso para cada produto.
function renderizaProdutos() {
  
    //let é uma variável que pode ser reatribuída, seu valor pode ser alterado após a declaração inicial.
    // com isso, let é uma variavel identificada como "html" e a inicia uma string vazia.
    let html = "";

    //o for está iterando(percorre repetidas vezes) sobre o array de produtos.
    for (let i = 0; i < produtos.length; i++) {
        //está chamando a função "criaProduto para gerar o HTML para um único produto
        html = html + criaProduto(produtos[i], i);
    }
    //e com isso, essa função vai retornar o html que foi gerado
    return html;
}

//A função criaProduto retorna uma string que contém código HTML formatado para exibir as informações do produto na página da web.
//Essa função chamada "criaProduto" vai retornar uma string contendo o cógigo 
//html e será printado as informções do produto na página aberta.
//e com os dados passados, recebeu dois parâmetros: "produto" e "index"
function criaProduto (produto, index) {

   // return foi usado para especificar o valor que a função deve retornar quando é chamada. 
    return `
    <div class="curso"> 
    <img class='inicio' title="t" src="${produto.imagem}" />
    <div class="curso-info">
    <h4>${produto.nome}</h4>
    <p>${produto.prof}</p>
    <p>${produto.descricao}</p>
    </div>
    <div class="curso-preco">
    <span class="preco-de">R$${produto.preco_de}</span>
    <span class="preco-por">R$${produto.preco_por}</span>
    <button class="btncar btn-add" data-index="${index}"></button>
    </div>
    </div>
     `;
}

//seleciona um elemento do HTML com um identificador chamado "container" na página, e usando o 
//querySelector, armazena uma referência a esse elemento no "container", dando
//o acesso e a manipulação do conteúdo desse elemento.
const container = document.querySelector("#container")

//Insere o HTML gerado pela função "renderizaProdutos()" dentro do elemento com o identificador chamado "container". 
//e aí a lista de produtos que foi gerada pela função renderizaProdutos() vai ser exibida na 
//página dentro do "container".
container.innerHTML= renderizaProdutos();

//criou uma constante chamada carrinhoItens e a inicia como um objeto vazio {}
const carrinhoItens = {};

//esta função é usada para renderizar (exibir) uma lista de itens na página. 
function renderizaCarrinho() {

    //let é uma variável que pode ser reatribuída, seu valor pode ser alterado após a declaração inicial.
    // com isso, let é uma variavel identificada como "html" e tem uma string vazia.
    let html = '';

    //for in permite iterar sobre as propriedades enumeradas de um objeto de acordo com a ordem em que foram inseridos.
    //ou seja, ele esta iterando no objeto carrinhoItens
    for (let produtoId in carrinhoItens) {
        html = html + criaItemCarrinho (carrinhoItens[produtoId]);
    }

    // seleciona o elemento HTML ".carrinho_itens" 
     // e substitui o conteúdo desse elemento pelo valor de html, que 
    //agora contém todo o HTML gerado para os itens do carrinho.
    document.querySelector('.carrinho_itens').innerHTML = html;

}

// Essa função recebe um objeto "produto"
//A função retorna uma string que contém código HTML formatado para representar esse item no carrinho. 
function criaItemCarrinho(produto) {
    return `
    <div class="carrinho_compra">
    <h4>${produto.nome}</h4>
    <p>Preço unidade: ${produto.preco_por}
    Quantidade: ${produto.quantidade}</p>
    <p>Valor: R$${produto.preco_por*produto.quantidade} </p>
    <button data-produto-id="${produto.id}" class="btn-remove">
    </button>
    </div>
    `;}

    //A função criaCarrinhoTotal calcula o valor total do carrinho de 
    //compras e cria uma representação em HTML desse valor total.
function criaCarrinhoTotal (){
    // variável com o valor inicial  igual a zero.
    let total = 0;

    //itera sobre os carrinhoItens, e o produtoId é a
    //chave que representa cada item no carrinho.
    for (let produtoId in carrinhoItens) {
        //cálculo do valor total
        total = total + carrinhoItens[produtoId].preco_por * carrinhoItens[produtoId].quantidade;
    }
    //ele vai atualizar o conteúdo de um elemento com a classe ".carrinho_total" para mostrar o valor total
    document.querySelector('.carrinho_total').innerHTML = `
    <h4> Total:<strong> R$${total} </strong></h4>
    <a href="#" target="_blank">
    <ion-icon name="card-outline"></ion-icon>
    <strong> Comprar Agora</strong>
    </a>
    `;}

    //Essa função vai adicionar um produto ao carrinho
    function adicionaItemNoCarrinho(produto) {

        if (!carrinhoItens[produto.id]) {
            carrinhoItens[produto.id] = produto;
            carrinhoItens[produto.id].quantidade = 0;
        }carrinhoItens[produto.id].quantidade++;
        renderizaCarrinho();
        criaCarrinhoTotal();
        }
    
        // document.body tem uma referência direta ao elemento <body> da página
       // o 'click' indica que o cóigo vai entender os cliques indo para o documento HTML devido o elemento "document.body" 
        document.body.addEventListener('click', function (event) {

            //Tem elemento HTML que foi clicado, e vai armazenar em uma variável elemento.
            const elemento = event.target;

            if(elemento.classList.contains('btn-add')) {
                //esta pegando o "data-index" do elemento clicado e 
                //o converte em 10 usando "parseInt". O resultado fica no index.
                const index = parseInt(elemento.getAttribute('data-index'), 10);

                //Utiliza o "index" para acessar um objeto de produto no array produtos. 
                //O produto correspondente fica na variável produto.
            const produto = produtos[index];

            //se o elemento clicado ter "btn-add", essa função é acionada com o produto. 
            //E com isso o produto é adicionado.
            adicionaItemNoCarrinho(produto);
                    }

                    // Vai verificar se o elemento tem "btn-remove", se tiver, será executado
            if (elemento.classList.contains('btn-remove')) {
                //pega o valor do atributo "data-produto-id" do elemento clicado e coloca no produtoId.
                const produtoId = elemento.getAttribute('data-produto-id');

                //se for menor que um, vai executar
                if (carrinhoItens[produtoId].quantidade <= 1) {
                //devido a declaração "delete", se for menor que 1 será removido
                delete carrinhoItens[produtoId];
                }
                // ou se for maior, é executado
                else {
                    --carrinhoItens[produtoId].quantidade;
                }

                //vão atualizar as exibições.
                renderizaCarrinho();
                criaCarrinhoTotal();
            }
        });