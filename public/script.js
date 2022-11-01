const container = document.querySelector('#mainBody')
const newmovieslide = document.querySelector('#newmovieslide')
const form = document.querySelector('#searchBar')
let cycle = 0;

// carousel slides staart
const slides = document.querySelectorAll('.myslides')
const nextBtn = document.querySelector('.next')
const prevBtn = document.querySelector('.prev')
let slideIndex=0;
var i=0;
for( i=0; i<slides.length ;i++){
    slides[i].style.display = 'none';
     }
slides[slideIndex].style.display = 'block';
function plusSlides(){
    for( i=0; i<slides.length ;i++){
        slides[i].style.display = 'none';
         }
    if(slideIndex==slides.length-1){slideIndex=-1}
    slides[slideIndex+=1].style.display = 'block'
}
function decSlides(){
    for( i=0; i<slides.length ;i++){
        slides[i].style.display = 'none';
         }
    
    if(slideIndex==0){slideIndex=slides.length}
    slides[slideIndex+=-1].style.display = 'block'
}
nextBtn.addEventListener('click',plusSlides)
prevBtn.addEventListener('click',decSlides)
setInterval(plusSlides,5000)


// carousel slides end

// remote data entry start
const removeTrash=()=>{

    const elements = document.querySelector('#mainBody').querySelectorAll('.movieContent')
    for(element of elements){
        element.remove()
    }
}
    


const getdata= (data,container)=>{
    if(cycle>2){
        removeTrash()
        
    } 
    for(item of data){
        const movieImg = document.createElement('img')
        const movieTitle = document.createElement('p')
        const content = document.createElement('a')
        movieImg.classList.add('movieImage')
        movieTitle.classList.add('movieTitle')
        content.classList.add('movieContent')
        if(item.show.image){   
            movieImg.src = item.show.image.medium
            movieTitle.append(item.show.name)
            content.href = item.show.url
            content.append(movieImg)
            content.append(movieTitle)
            
            container.append(content)
        }
    }
    cycle+=1;
    const testImg = document.querySelector('.movieImage')
    if(testImg.src===''){
        console.log('no data found')
    }

    
}
// searchTerm='action'
async function urlProcess(container,searchTerm='action'){
    // let searchTerm = document.querySelector('input').value
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${searchTerm}`)
    const data = await res.json()
    if(data){
        setTimeout(getdata(data,container),200)
    }
    
    
}

urlProcess(container)
urlProcess( newmovieslide1,'kids')
urlProcess(newmovieslide2,'adventure')

form.addEventListener('submit',async function(e){

    e.preventDefault()
    let searchTerm = document.querySelector('input').value
    Title = document.querySelector('.title')
    Title.textContent = `Search results for ~> ${searchTerm}`
    Title.classList.add('searchResult')
    urlProcess(container,searchTerm)
})
// remote data entry start





