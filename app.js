let posts = JSON.parse(localStorage.getItem("posts")) || [];

// UPLOAD
if (document.getElementById("uploadForm")) {
  document.getElementById("uploadForm").addEventListener("submit", function(e){
    e.preventDefault();

    let file = document.getElementById("image").files[0];
    let caption = document.getElementById("caption").value;
    let category = document.getElementById("category").value;

    let reader = new FileReader();
    reader.onload = function(){
      posts.push({
        img: reader.result,
        caption: caption,
        category: category,
        points: 10,
        likes: 0
      });
      localStorage.setItem("posts", JSON.stringify(posts));
      alert("Action uploaded!");
      window.location = "feed.html";
    };
    reader.readAsDataURL(file);
  });
}

// FEED
if (document.getElementById("feed")) {
  let feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach((p,i)=>{
    let card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}">
      <h3>${p.caption}</h3>
      <p>${p.category}</p>
      <p>⭐ ${p.points}</p>
      <button onclick="likePost(${i})">❤️ ${p.likes}</button>
    `;
    feed.appendChild(card);
  });
}

// LIKE
function likePost(i){
  posts[i].likes++;
  posts[i].points++;
  localStorage.setItem("posts", JSON.stringify(posts));
  location.reload();
}

// LEADERBOARD
if (document.getElementById("leaderboard")) {
  let board = document.getElementById("leaderboard");
  board.innerHTML = "";

  let sorted = [...posts].sort((a,b)=>b.points-a.points);

  sorted.forEach((p,i)=>{
    board.innerHTML += `<div class="card">#${i+1} ${p.caption} - ⭐ ${p.points}</div>`;
  });
}
