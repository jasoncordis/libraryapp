import React from "react";

function CategorySlider(props) {
  const listOfCategories = ["The Great Gatsby", "The Portrait of Dorian Gray"];

  let sliderContainer_ref = React.createRef();
  function handleClick(e) {
    // on clicking backward or forward causes the slider to scroll smoothly
    // forward or backward.
    sliderContainer_ref.current.style.scrollBehavior = "smooth";
    if (e.target.className === "backward") {
      sliderContainer_ref.current.scrollLeft -= 600;
    } else {
      sliderContainer_ref.current.scrollLeft += 600;
    }
  }

  return (
    <div className="category-slider">
      <button className={"backward"} onClick={handleClick}>
        &#10094;
      </button>
      <div ref={sliderContainer_ref} className="display-region">
        {
          // Generates category cards on the slider-container
          listOfCategories.map((category, index) => {
            // Grabs the corresponding image link per category
            return (
              <div className="category" key={index}>
                {category}
              </div>
            );
          })
        }
      </div>
      <button className={"forward"} onClick={handleClick}>
        &#10095;
      </button>
    </div>
  );
}

export default CategorySlider;
