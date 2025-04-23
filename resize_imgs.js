const images = document.querySelectorAll('img');
const videos = document.querySelectorAll('video');

for(let i = 0; i < images.length; i++) {
    images[i].addEventListener('click', function() {
        this.classList.toggle('bigger_image');
    });

}
for(let i = 0; i < videos.length; i++) {
    videos[i].addEventListener("play",function() {
        console.log(this);
        this.classList.toggle('bigger_image');
     });
     videos[i].addEventListener("pause",function() {
        console.log(this);
        this.classList.toggle('bigger_image');
     });
}