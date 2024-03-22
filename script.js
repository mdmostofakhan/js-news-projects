const apiKey = "a67204d2c2a048e9b6590d72e76ff86b";

const blogContainer = document.getElementById("blog-container");

const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  }
   catch (error) {
    console.error("Error fetching random", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }
         catch(error){
            console.log("Error fetching news by query", error)
         }
    }
})

   async function fetchNewsQuery(query){
   try{
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles
   }
    catch (error){
        console.error("Error fetching by news", error)
    }
}



function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("card-blog");
    const img = document.createElement("img");
    img.src = article.urlToImage; // Fixing typo here

    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 
     ? article.title.slice(0, 30) + "...." : article.title;
    title.textContent = truncatedTitle;

    const description = document.createElement("p");
    const descriptionPara = article.description.length > 50 ?
    article.description.slice(0, 50) + "....." : article.description;
    description.textContent = descriptionPara;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);

    blogCard.addEventListener("click", () => {
        window.open(article.url, "_blank");
        // if(article.url){
        //     window.open(article.url, "_blank");
        // } else{
        //     console.log("how to the open window")
        // }
    })
    
    blogContainer.appendChild(blogCard);
  });
}

(async () => { // Fixing async IIFE syntax
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  }
   catch (error) {
    console.error("Error fetching random", error);
  }
})();
