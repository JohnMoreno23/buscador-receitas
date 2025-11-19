/* 
Lógica
[x] Capturar o evento de input quando o botão for clicado
[] Ir até a API e trazer as receitas
[] Colocar as receitas na tela
[] Saber quando o usuário clicou na receita
[] Buscar info da receita individual na API
[] Colocar na tela a receita individual

*/

// const input = document.querySelector(".searchInput");
const form = document.querySelector(".searchForm");

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o reload da página
    // console.log(event); // Verifica o evento no console
    const inputValue = event.target[0].value // Pega o valor do input

    searchRecipes()
});

// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

async function searchRecipes(ingredient) { // para acessar a API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`); // Chama a API com o ingrediente
    const data = await response.json(); // Converte a resposta em JSON
    
    console.log(data); // Verifica os dados no console
    //console.log(response); // Verifica os dados no console
}

/* Lista de status
200 - sucesso
300 - redirecionamento
400 - erro do cliente - erro do front end
500 - erro do servidor
*/