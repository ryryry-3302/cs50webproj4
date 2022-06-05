/// if it doesnt update clear browser cached images :D
document.addEventListener('DOMContentLoaded', () => {
    function getIntPart(followers) {
        followers = followers.replace('Followers: ', '');
        return parseInt(followers);
      }
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
            let followers = document.querySelector('#followers').innerHTML
            console.log(followers)
            followers = getIntPart(followers);
            console.log(followers)
            if (this.innerHTML === 'Follow'){
                this.innerHTML = 'Following';
                document.querySelector('#followers').innerHTML = `Followers: ${followers+1}`
                fetch('/follow', {
                    method: 'POST',
                    body: JSON.stringify({
                        prof_id : parseInt(document.querySelector('#prof_id').innerHTML),
                        follow : true,
                    })
                })
            }

            else if (this.innerHTML === 'Following'){
                this.innerHTML = 'Follow';
                document.querySelector('#followers').innerHTML = `Followers: ${followers-1}`
                fetch('/follow', {
                    method: 'POST',
                    body: JSON.stringify({
                        prof_id : parseInt(document.querySelector('#prof_id').innerHTML),
                        follow :false,
                    })
                })
            }
        })
    }

    catch(TypeError){
        console.log('working as intended')
    }
    
    

});

function edit(clicked_id)
  {
    
    console.log(clicked_id);
  }