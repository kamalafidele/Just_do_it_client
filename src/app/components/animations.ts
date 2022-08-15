import { animate, style, trigger,transition,state } from '@angular/animations';


export let fadeAnimation = trigger('fade',[
    state("fade", style({opacity:0})),
    transition(":enter",[
     style({opacity:0}),
     animate(500)
    ])
 ])

 export let slideAnimation = trigger("slide",[
     transition(":enter",[
         style({transform:"translateX(-30px)"}),
         animate(500)
     ])
 ])

 export let topSlideAnimation = trigger("topSlide",[
    transition(":enter",[
        style({transform:"translateY(-30px)"}),
        animate(500)
    ])
])