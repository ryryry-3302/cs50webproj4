document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#createbtn').addEventListener('click', function(){
        this.style.display = 'none';
        document.querySelector('#postform').style.display = 'block'; 
    });
    document.querySelector('#backbtn').addEventListener('click', function(){
        document.querySelector('#postform').style.display = 'none';
        document.querySelector('#createbtn').style.display = 'block';
    });
});