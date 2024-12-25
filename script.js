
document.getElementById('error').style.display = 'none'

const loadCatgories = () => {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  .then(res => res.json())
   .then(data => displayCategories(data.categories))

}
loadCatgories()

const displayCategories = (categories) => {
  const categoryDisplay = document.getElementById('categories')
  
  categories.forEach(category => {
    const div = document.createElement('div')
    div.classList.add('border-2', 'px-2', 'rounded',)
     div.innerHTML = `
         <div onclick = "loadMealsDetails(${category.idCategory})">
            <img class = "h-[250px] w-full" src="${category.strCategoryThumb}" alt="">
              <div>
                <h3 class="font-2xl">${category.strCategory}</h3>
                <p>${category.strCategoryDescription.slice(0, 150)}</p>
            </div>
          </div>
   `
   categoryDisplay.appendChild(div)
 })

}



document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input');
    const searchText =  searchInput.value
    
    if(searchInput.value == "") {
      document.getElementById('error').style.display = 'block'
      return
    } else {
       const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
         .then(res => res.json())
          .then(data => displayFood(data.meals))
    }
})


const displayFood = (foods) => {
    if(foods == null) {
       document.getElementById('error').style.display = 'block'
    }
    const displayDiv = document.getElementById('search-display')
    displayDiv.innerHTML = ""
     const displaySingleFood = document.getElementById('display-single-food')
    displaySingleFood.innerHTML = ""
    const categoryDisplay = document.getElementById('categories')
    categoryDisplay.innerHTML = ''
    

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
    document.getElementById('error').style.display = 'none'
    displayDiv.appendChild(div)
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
    displaySingleFood.innerHTML = ""
     const div = document.createElement('div')
      div.innerHTML = `
             <div >
               <img src="${food.strMealThumb}" alt="">
                 <div>
                   <h3 class="font-2xl">${food.strMeal}</h3>
                   <p>${food.strInstructions}</p>
               </div>
             </div>
         `
      displaySingleFood.appendChild(div)
}