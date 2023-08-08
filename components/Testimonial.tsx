import React from 'react';

function Testimonial() {
  return (
    <div className="rounded-xl w-[70vw] 2xl:w-[45vw] min-h-[200px] border flex items-center px-l py-s gap-l ui-background">
      <div className="rounded-full overflow-hidden w-[9rem] aspect-square bg-hoverColors-hover my-m">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt="profile picture"
        />
      </div>
      <div className="text-basicColors-light flex-1">
        <p>
          I used to be a rich kid computer freak. Then I founded a company and
          screwed over my partner while he was sick and now I’m a billionaire. I
          have no clue what EMPLEO is though.
        </p>
        <p className="text-right"> - Billy</p>
      </div>
    </div>
  );
}

export default Testimonial;
