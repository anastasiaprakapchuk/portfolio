//ждем пока загрузится страница
window.onload=()=>{
  let allSite=document.querySelector('.main');
  allSite.style.display='none';
}

//инициализация слайдера для секций сайта
const pageSlider = new Swiper('#page', {
    //мои классы
    wrapperClass:'page-wrapper',
    slideClass:'page-slide',

    //вертикальный слайдер
    direction: 'vertical',

    //количество слайдов для показа
    slidesPerView: 'auto',

    //параллакс
    parallax: true,

    //управление клавиатурой
    keyboard:{
        unabled:true,
        onlyInViewport:true,
        pageUpDown:true,
    },

    //управление мышью
    mousewheel:{
        sensitivity:1
    },

    watchOverflow:true,
    speed:800,
    observer:true,
    observeParents:true,
    observeSlideChildren:true,
  
    //scrollbar
    scrollbar: {
      el: '.page_scroll',
      dragClass: 'page_drag-scroll',
      draggable: true,
    },

    //отключаем автоинициализацию
    init:false,

    //события
    on: {
      init: function(){
        menuSlider();
      },
      slideChange: function(){
        menuSliderRemove();
        menuLinks[pageSlider.realIndex].classList.add('_active');
        showVisibleSkills();
      },
    }
  });


//инициализация слайдера для портфолио работ
const pageSliderPortfolio = new Swiper('.container_portfolio', {
  speed:800,
  slidesPerView: 1,
  spaceBetween: 30,
  slidesPerGroup: 1,
  //loop: true,
  //loopFillGroupWithBlank: true,
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 550px
    550: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    // when window width is >= 750px
    750: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  },
  
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    //dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
 
});

  //работа меню сайта
  let menuLinks = document.querySelectorAll('.menu_link');

  function menuSlider(){
    if(menuLinks.length>0){
       menuLinks[pageSlider.realIndex].classList.add('_active');
       for(let i=0; i<menuLinks.length;i++){
         const menuLink=menuLinks[i];
         menuLink.addEventListener('click', function(EO){
           EO.preventDefault();
           menuSliderRemove();
           menuLink.classList.add('_active');
           pageSlider.slideTo(i,800);
           if(window.innerWidth<=750){
            let barsMenu=document.querySelector('.menu ul');
            let bars=document.querySelector('.bars');
            let backArrow=document.querySelector('.backArrow');               
            barsMenu.style.transform='translateX(100%)'; 
            backArrow.style.display='';
            bars.style.display='block';
           }
         });
       }
    }
  }

  function menuSliderRemove(){
     let menuLinkActive=document.querySelector('.menu_link._active');
     if(menuLinkActive){
       menuLinkActive.classList.remove('_active');
     }
  }

  pageSlider.init();


  function showVisibleSkills() {
    let el=document.querySelector('.container_skills');
    let massivSkills  = document.querySelectorAll('.item_skill_view_actually');
    let massivSkillPercents  = document.querySelectorAll('.item_skill_percent');
    if (pageSlider.realIndex===1) {
        for(let i=0;i<massivSkills.length;i++) {
          let dataWidth=massivSkills[i].getAttribute('data-width');
          massivSkills[i].style.transitionDuration='1s';
          massivSkills[i].style.width=dataWidth;

          massivSkillPercents[i].style.transitionDuration='3s';
          massivSkillPercents[i].style.opacity='1';
        }    
    }else {
        for(let i=0;i<massivSkills.length;i++) {        
          massivSkills[i].style.transitionDuration='1s';
          massivSkills[i].style.width='0%';

          massivSkillPercents[i].style.transitionDuration='3s';
          massivSkillPercents[i].style.opacity='0';
        }  
    }
  }
  
  let my_works=document.querySelectorAll('.item_portfolio');
  for(let i=0; i<my_works.length; i++){
      my_works[i].addEventListener('mouseenter',function(EO){
        EO.currentTarget.style.backgroundImage='url('+EO.currentTarget.getAttribute('data-hover-image')+')';
      });
      my_works[i].addEventListener('mouseleave',function(EO){
        EO.currentTarget.style.backgroundImage='none';
      });
  }

  //Работа с баром (мобильная версия)
  let bars=document.querySelector('.bars');
  bars.addEventListener('click',clickBars);

  //обработчик для bars (для мобильной версии)
  function clickBars(){
    let barsMenu=document.querySelector('.menu ul');
    barsMenu.style.transform='translateX(0%)';
    bars.style.display='none';

    let backArrow=document.querySelector('.backArrow');
    backArrow.style.display='block';

    backArrow.addEventListener('click',clickBackArrowBars);

    function clickBackArrowBars(){
        barsMenu.style.transform='translateX(100%)';
        bars.style.display='block';
        backArrow.style.display='none'; 
    }

    window.onresize=()=>{
        if(window.innerWidth>750){
            bars.style.display='';
            backArrow.style.display='';
            barsMenu.style.transform='translateX(0%)'; 
        }
        if(window.innerWidth<=750){               
            barsMenu.style.transform='translateX(100%)'; 
            backArrow.style.display='';
            bars.style.display='block';
        }
    }
  }


  //Работа с кнопкой 'send message' (мобильная версия)
  let formMessage=document.querySelector('.form');
  let contacts=document.querySelector('.my_contacts');
  let buttonSendMessage=document.querySelector('.my_contacts button');
  buttonSendMessage.addEventListener('click',clickButtonSendMessage);

  function clickButtonSendMessage(){
    formMessage.style.visibility='visible';
    contacts.style.display='none';

    let buttonCross=document.querySelector('.form .cross');
    buttonCross.addEventListener('click',clickButtonCross);

    function clickButtonCross(){
      formMessage.style.visibility='hidden';
      contacts.style.display='block';
    }
  }
