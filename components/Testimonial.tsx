import React from 'react';

function Testimonial() {
  return (
    <div className="rounded-xl w-[70vw] 2xl:w-[45vw] min-h-[200px] border flex items-center px-l py-s gap-l">
      <div className="rounded-full overflow-hidden w-[9rem] aspect-square bg-hoverColors-hover my-m">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt="profile picture"
        />
      </div>
      <div className='text-basicColors-light flex-1'>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium
          est numquam vitae itaque nobis consequatur doloribus adipisci
          similique, veritatis sed voluptates illum vero pariatur ratione, animi
          tempore accusantium debitis totam molestiae natus.
        </p>
        <p className='text-right'>- John Doe</p>
      </div>
    </div>
  );
}

export default Testimonial;
