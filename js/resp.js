const toggleButton = document.getElementsByClassName('m_butt')[0]
const navlist = document.getElementsByClassName('navlst')[0]
const side_nav_list = document.getElementsByClassName('nav_li')
const tsg_logo = document.getElementsByClassName('tsg_logo')[0]

toggleButton.addEventListener('click',() => {
    navlist.classList.toggle('active')
})

window.addEventListener("scroll", function(event){
    var scroll = this.scrollY;
    const navbr = document.getElementsByClassName('navbar')[0]
    // console.log(scroll)
    if(scroll>180){
        tsg_logo.classList.add('active')
        navbr.classList.add('active')
    }
    else{
        navbr.classList.remove('active')
        tsg_logo.classList.remove('active')
    }
    for(let i=0; i<side_nav_list.length; i++)
    {
        if(i==getPos())
            side_nav_list[i].classList.add('active');
        else
            side_nav_list[i].classList.remove('active');
    } 
});


function getPos(){
    const section_elt = document.getElementsByClassName('nav_sec')
    for(let i=section_elt.length-1;i>=0;i--){
        var rect = section_elt[i].getBoundingClientRect();
        if (rect.top<150){
            return i;
        }
    }
    return 0;
}



