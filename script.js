function locoScroll(){

  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);
  
  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  
}

function cursorEffect() {
  var page1Content = document.querySelector("#page1-content")
  var cursor = document.querySelector("#cursor");
  
  page1Content.addEventListener("mousemove", function(dets){
    gsap.to(cursor, {
      x: dets.x,
      y:dets.y
    })
  })

  page1Content.addEventListener("mouseenter", function(){
    gsap.to(cursor, {
      scale:1,
      opacity:1
    })
  })
  page1Content.addEventListener("mouseleave", function(){
    gsap.to(cursor, {
      scale: 0,
      opacity: 0
    })
  })
}

function page2Animation() {
  gsap.from(".elem h1", {
    y: 200,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#main", 
      start: "top 100%", 
      end: "top 0%",
      // markers: true,
      scrub: 2,
    },
  });
}
function page3Animation(){
  
  gsap.from("#page3-top", {
    y: 200,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main", 
      start: "top 100%", 
      end: "top 0%",
      // markers: true,
      scrub: 2,
    },
  });
  gsap.from(".box", {
    x: 200,
    stagger: 0.4,
    scrollTrigger: {
      trigger: "#page3",
      scroller: "#main", 
      start: "top 100%", 
      end: "top 0%",
      // markers: true,
      scrub: 2,
    },
  })
}
function sliderAnimation(){
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  });
}

function loaderAni(){
  var tl =gsap.timeline()
 

  tl.from("#loader h3", {
    x : 40,
    opacity: 0,
    duration:1,
    stagger: 0.1
  })
  tl.to("#loader h3", {
    opacity: 0,
    x: -10,
    duration: 1,
    stagger: 0.1,
  })
  tl.to("#loader", {
    opacity: 0,
  })
  tl.from("#page1-content h1 span", {
    y:30,
    opacity: 0,
    stagger: 0.1,
    duration: 0.5,
    delay: -0.5,
  })
  tl.to("#loader", {
    display: "none"
  })

}

function page6Animation(){
  gsap.from("#page6-top", {
    opacity: 0,
    x: 50,
    duration: 1,
    scrollTrigger: {
      trigger: "#page6",
      scroller: "#main",
      start: "top 90%",
      end: "top 50%",
      scrub: 1,
    }
  });

}

function page7Animation(){
  gsap.from(".testimonial", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page7",
      scroller: "#main",
      start: "top 90%",
      end: "top 30%",
      scrub: 1,
      // markers: true
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  locoScroll()
  cursorEffect()
  page2Animation()
  page3Animation()
  sliderAnimation()
  loaderAni()
  page6Animation()
  page7Animation()
});


