console.log("welcome to my news app");
let pre = document.getElementById("pre");
let next = document.getElementById("next");
let content = document.getElementById("news");
let articlesPerPage = 20; // Define the number of articles per page
let totalpages;
let query = window.location.search.split("?")[1].split("&")[0].split("=")[1];
let page=parseInt(window.location.search.split("?")[1].split("&")[1].split("=")[1]);
console.log(query, page);

const fetchnews = async (query, pageno) => {
  let a = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=26142e7ebdda43f89b674e2db3c88eee&pageSize=20&page=${pageno}`);
  let r = await a.json();
  console.log(r);
  document.getElementById("queryText").innerHTML=query;
  document.getElementById("queryResult").innerHTML=r.totalResults;

  totalpages = Math.ceil(r.totalResults / articlesPerPage);

//   // Calculate previous and next page numbers
//   let prevPage = page - 1 < 1 ? 1 : page - 1;
//   let nextPage = page + 1 > totalpages ? totalpages : page + 1;

  pre.setAttribute('href', `/?q=${query}&pageno=${page-1}`);
  next.setAttribute('href', `/?q=${query}&pageno=${page+1}`);

  let str = "";
  for (let item of r.articles) {
    let date=new Date(item.publishedAt).toLocaleDateString();
    str += `
      <div class="card" style="width: 18rem">
        <img src="${item.urlToImage}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
          <span class="fw-bold"> Published Date:${date}<span>
          <p class="card-text">
            ${item.description}
          </p>
          <a target="_blank "href="${item.url}" class="btn btn-primary">READ MORE ...</a>
        </div>
      </div> `;
  }
  content.innerHTML = str;
};

fetchnews(query, page);
