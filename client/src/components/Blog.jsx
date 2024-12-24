import React from "react";
import { CiPlay1 } from "react-icons/ci";
import { RxArrowTopRight } from "react-icons/rx";

const commonButtonClasses =
  "inline-flex items-center justify-center text-white transition-all duration-200 border-2 border-white pointer-events-auto h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-lg hover:bg-white/20";
const commonTextClasses = "text-base font-semibold text-white";
const commonSubTextClasses = "mt-1 text-sm font-normal text-gray-300";

function Blog() {
  return (
    <section className="py-16 bg-gray-100" style={{ background: 'radial-gradient(circle,#A2CA71,beige)'}}>      
    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
      <div className="max-w-2xl mx-auto text-center">
        <h2 data-aos='fade-right' className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Over 1000+ people trust us
        </h2>
        <p data-aos='fade-left' className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
          We gives you the best services that makes gives a good benefit to you.
        </p>
      </div>

      <div data-aos='fade-up' className="grid max-w-md grid-cols-1 gap-5 mx-auto mt-12 sm:mt-16 lg:mt-20 lg:max-w-5xl lg:grid-cols-3 sm:gap-6 lg:gap-8 xl:gap-10">
        {[
          {
            imgSrc: "https://img.freepik.com/free-photo/young-beautiful-girl-posing-black-leather-jacket-park_1153-8104.jpg",
            name: "Palak",
            title: "Founder of GearUp",
          },
          {
            imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFwcHklMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
            name: "Shanaya",
            title: "Co-Founder of Womenia",
          },
          {
            imgSrc: "https://c8.alamy.com/comp/R2B9AF/portrait-of-young-handsome-man-in-white-shirt-outdoor-nice-appearance-with-stylish-hair-and-beard-leaning-with-a-side-on-a-wall-R2B9AF.jpg",
            name: "Sid",
            title: "Founder of CH Beauty",
          },
        ].map((testimonial, index) => (
          <div
            key={index}
            className="relative overflow-hidden group rounded-2xl"
          >
            <img
              className="object-cover w-full transition-all duration-200 group-hover:scale-110 group-hover:-rotate-2"
              src={testimonial.imgSrc}
              alt=""
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 w-full px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className={commonTextClasses}>{testimonial.name}</p>
                  <p className={commonSubTextClasses}>{testimonial.title}</p>
                </div>
                <button type="button" className={commonButtonClasses}>
                  <CiPlay1 className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="#"
          title=""
          className="inline-flex items-center text-lg font-semibold text-blue-800 transition-all duration-200 group hover:text-blue-900 hover:underline">
          See all reviews by our clients
          <RxArrowTopRight className="h-4 w-4 font-semibold text-blue-800 transition-all duration-200 group hover:text-blue-700 hover:underline" />
        </a>
      </div>
    </div>
    </section>
  );
}

export default Blog;