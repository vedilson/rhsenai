// Espera que o DOM seja carregado antes de executar qualquer código
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona o formulário de cadastro de livro pelo ID
    const form = document.getElementById("livroForm");
    
    // Seleciona o elemento da lista de livros para exibir os livros cadastrados
    const listaLivros = document.getElementById("listaLivros");

    // Adiciona um evento ao formulário que será disparado ao enviar (submit)
    form.addEventListener("submit", async (event) => {
        
        // Previne o comportamento padrão do formulário, que recarregaria a página
        event.preventDefault();

        // Captura os valores inseridos nos campos "descricao" e "isbn" do formulário
        const descricao = document.getElementById("descricao").value;
        const isbn = document.getElementById("isbn").value;

        // Tenta enviar uma requisição para o backend para cadastrar o livro
        try {
            // Faz uma requisição HTTP POST para o endpoint de cadastro de livros no backend
            const response = await fetch("http://localhost:8080/livro", {
                method: "POST",  // Define o método HTTP como POST para enviar dados
                headers: {
                    "Content-Type": "application/json",  // Define o tipo de conteúdo como JSON
                },
                // Converte os dados do formulário em uma string JSON e envia no corpo da requisição
                body: JSON.stringify({ descricao, isbn }),
            });

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (response.ok) {
                // Exibe uma mensagem de sucesso para o usuário
                alert("Livro cadastrado com sucesso!");
                
                // Limpa os campos do formulário
                form.reset();
                
                // Atualiza a lista de livros exibida na página
                listarLivros();
            } else {
                // Caso haja um erro, exibe uma mensagem de erro para o usuário
                alert("Erro ao cadastrar o livro");
            }
        } catch (error) {
            // Caso ocorra um erro na requisição, exibe-o no console
            console.error("Erro ao cadastrar o livro:", error);
        }
    });

    // Função assíncrona para listar todos os livros cadastrados no backend
    async function listarLivros() {
        try {
            // Faz uma requisição HTTP GET para obter a lista de livros
            const response = await fetch("http://localhost:8080/api/livros");
            
            // Converte a resposta em um objeto JavaScript (array de livros)
            const livros = await response.json();

            // Limpa o conteúdo atual da lista de livros na página
            listaLivros.innerHTML = "";
            
            // Itera sobre o array de livros retornado pela API
            livros.forEach((livro) => {
                // Cria um novo elemento <li> para cada livro
                const li = document.createElement("li");
                
                // Define o conteúdo do <li> com a descrição e o ISBN do livro
                li.textContent = `Descrição: ${livro.descricao} - ISBN: ${livro.isbn}`;
                
                // Adiciona o <li> à lista de livros na página
                listaLivros.appendChild(li);
            });
        } catch (error) {
            // Caso ocorra um erro na requisição, exibe-o no console
            console.error("Erro ao carregar os livros:", error);
        }
    }

    // Chama a função listarLivros ao carregar a página para exibir os livros já cadastrados
    listarLivros();
});
