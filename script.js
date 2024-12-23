document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    const searchText =  searchInput.value

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    console.log(url)

    fetch(url)
    .then(res => res.json())
    .then(data => displayFood(data.meals))
})

const displayFood = (foods) => {
    const displayShow = document.getElementById('search-display')
    foods.forEach(food => {
     const div = document.createElement('div')
      div.innerHTML = `
          <div onclick = "loadMealsDetails(${food.idMeal})">
             <img class = "h-[250px] w-full" src="${food.strMealThumb}" alt="">
               <div>
                 <h3 class="font-2xl">${food.strMeal}</h3>
                 <p>${food.strInstructions.slice(0, 150)}</p>
             </div>
           </div>
    `
    displayShow.appendChild(div)
  })

  const searchInput = document.getElementById('search-input');
   searchInput.value = ''

}

const loadMealsDetails = (id) => {
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => res.json())
    .then(data => displaySingleFood(data.meals[0]))
   
}

const displaySingleFood = (food) => {
    const displaySingleFood = document.getElementById('display-single-food')
     const div = document.createElement('div')
      div.innerHTML = `
             <div>
               <img src="${food.strMealThumb}" alt="">
                 <div>
                   <h3 class="font-2xl">${food.strMeal}</h3>
                   <p>${food.strInstructions}</p>
               </div>
             </div>
         `
      displaySingleFood.appendChild(div)
}