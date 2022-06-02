/// if it doesnt update clear browser cached images :D
document.addEventListener('DOMContentLoaded', () => {
    if (!(window.location.href.indexOf("profile") > -1)) {

    
    document.querySelector('#createbtn').addEventListener('click', function(){
        this.style.display = 'none';
        document.querySelector('#posts').style.display = 'none';
        document.querySelector('#postform').style.display = 'block';
        
        
    });
    document.querySelector('#backbtn').addEventListener('click', function(){
        document.querySelector('#postform').style.display = 'none';
        document.querySelector('#posts').style.display = 'block';
        document.querySelector('#createbtn').style.display = 'block';
    });
    }

    try{
        document.querySelector('#followbtn').addEventListener('click', function(){
            console.log('hi')
            if (this.innerHTML === 'Follow'){
                this.innerHTML = 'Following';
            }
        })
    }

    catch(TypeError){
        console.log('working as intended')
    }

});