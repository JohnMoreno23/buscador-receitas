/* 
Lógica
[x] Capturar o evento de input quando o botão for clicado
[x] Ir até a API e trazer as receitas
[x] Colocar as receitas na tela
[x] Saber quando o usuário clicou na receita
[x] Buscar info da receita individual na API
[x] Colocar na tela a receita individual

TRY / CATCH

*/

// const input = document.querySelector(".searchInput");
const form = document.querySelector(".searchForm");
const recipeList = document.querySelector(".recipeList");
const recipeDetails = document.querySelector(".recipeDetails");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o reload da página
  // console.log(event); // Verifica o evento no console
  const inputValue = event.target[0].value; // Pega o valor do input

  searchRecipes(inputValue); // Chama a função de busca de receitas
});

// www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast

async function searchRecipes(ingredient) {
  // para acessar a API

  recipeList.innerHTML = "<p>Carregando...</p>"; // Mostra uma mensagem de carregamento
  try {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  ); // Chama a API com o ingrediente
  const data = await response.json(); // Converte a resposta em JSON

  showRecipes(data.meals); // Chama a função para mostrar as receitas na tela
  } catch (error) {
        recipeList.innerHTML = "<p>Nenhuma receita encontrada.</p>";
  }

  //console.log(data); // Verifica os dados no console
  //console.log(response); // Verifica os dados no console
}

function showRecipes(recipes) {
  // Pega o container de receitas
  recipeList.innerHTML = recipes
    .map(
      (recipe) => `
        <div class="recipeCard " onclick="getRecipeDetails(${recipe.idMeal})">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
        </div>


        `
    )
    .join(""); // Junta tudo em uma string só
}

async function getRecipeDetails(recipeId) {
  // Função para buscar detalhes da receita individual

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
  ); // Chama a API com o ID da receita
  const data = await response.json(); // Converte a resposta em JSON
  const recipe = data.meals[0];

  let ingredients = '';

  console.log(recipe); // Verifica os dados no console

  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients += `<li>${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}</li>`

    } else {
        break; 
    }
  }

  recipeDetails.innerHTML = `
    <h2>${recipe.strMeal}</h2>
    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal} class="recipeImg">
    <h3>Ingredients:</h3>
    <ul>
      ${ingredients}
    </ul>
    <h3>Instructions:</h3>
    <p>${recipe.strInstructions}</p>
    <p>Tags: ${recipe.strTags}</p>
    <p>Video do preparo [EN]: <a href="${recipe.strYoutube}" target="_blank">Assista aqui</a></p>
  `;

}

/* Lista de status
200 - sucesso
300 - redirecionamento
400 - erro do cliente - erro do front end
500 - erro do servidor
*/
