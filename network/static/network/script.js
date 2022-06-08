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
      ///gets id from button clicked
      if (document.querySelector(`#${clicked_id}`).innerHTML == 'Edit'){
          let buttonid = clicked_id;
          let button = document.querySelector(`#${clicked_id}`);
          button.innerHTML = 'Cancel'
          
          clicked_id = clicked_id.replace('button-','');
          let id = parseInt(clicked_id)
          
          ///selects original title
          let originalTitle = document.querySelector(`#title-${id}`);
          let originalBody = document.querySelector(`#body-${id}`);
          let divToChange = originalTitle.parentNode
          let old = divToChange.innerHTML;
          /// creates element to replace original title
  
          let newTitle = document.createElement('TEXTAREA');
          newTitle.setAttribute('id', `title-text-new-${id}`);
          let poster = originalTitle.innerHTML.split(':')[0];
          originalTitle.innerHTML = originalTitle.innerHTML.replace(/.*:/,'').replace(' ','');
          newTitle.innerHTML = originalTitle.innerHTML;
          console.log(poster);
          let newBody = document.createElement('TEXTAREA');
          newBody.setAttribute('id', `body-text-new-${id}`);
          newBody.innerHTML = originalBody.innerHTML;
          
          divToChange.replaceChild(newTitle, originalTitle);
          divToChange.replaceChild(newBody, originalBody);
          divToChange.querySelector('.submitbutton').classList.remove("d-none")
          divToChange.querySelector('.submitbutton').addEventListener('click', ()=>{
              
          let newtitle = document.getElementById(`title-text-new-${id}`).value
          let newbody = document.getElementById(`body-text-new-${id}`).value
          fetch(`/post/${id}`, {
              method: 'PUT',
              body: JSON.stringify({
                  'title': newtitle,
                  'body' : newbody
              })
              })
         
          divToChange.innerHTML = old;
          document.querySelector(`#${buttonid}`).innerHTML = 'Edit';
          console.log(`${poster}: ${newtitle}`);
          document.querySelector(`#title-${id}`).innerHTML = `${poster}: ${newtitle}`;
          document.querySelector(`#body-${id}`).innerHTML = `${newbody}`;
          })
  
          button.addEventListener('click', ()=>{
              if (button.innerHTML === 'Cancel'){
              divToChange.innerHTML = old;
              document.querySelector(`#${buttonid}`).innerHTML = 'Edit';
              }
          })
          
      }
    }

    function like(post_id) {
        
        fetch(`/like/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                'unlike': true
            })
            })
    
        let likecount = document.querySelector(`#like-${post_id}`).innerHTML.replace(' Likes','')
        console.log(likecount)
        if (document.querySelector(`#like-${post_id}`).classList.contains("bi-heart-fill")){
            let newcount = parseInt(likecount) -1;
            document.querySelector(`#like-${post_id}`).innerHTML = ` ${newcount} Likes`;
            document.querySelector(`#like-${post_id}`).classList.remove("bi-heart-fill");
            document.querySelector(`#like-${post_id}`).classList.add("bi-heart")


        }
        else{
            let newcount = parseInt(likecount) +1;
            document.querySelector(`#like-${post_id}`).innerHTML = ` ${newcount} Likes`;
            document.querySelector(`#like-${post_id}`).classList.remove("bi-heart");
            document.querySelector(`#like-${post_id}`).classList.add("bi-heart-fill")
        }
    }


