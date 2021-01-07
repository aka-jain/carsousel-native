let carsouelContainer = document.getElementById('carousel');
let carosuelFragment = document.createDocumentFragment();
// tracking index of centered element
let currentHighlightedCounter = 0;

// mock data
let carouselData = [{
    id: 1,
    img: "https://images.immediate.co.uk/production/volatile/sites/21/2020/08/What-to-wear-mountain-biking1-e267e72-scaled.jpg?quality=45&resize=768,574",
    name: "Bike type 1",
    price: "10,000",
    category: "bike"
  }, {
    id: 1,
    img: "https://bragpacker.com/wp-content/uploads/2017/06/shutterstock_259117139_lowerez.jpg",
    name: "Bagpack",
    price: "12,000",
    category: "wear"
  },
  {
    id: 1,
    img: "https://bloximages.newyork1.vip.townnews.com/virginislandsdailynews.com/content/tncms/assets/v3/editorial/0/33/033b5c3d-05c1-506d-9677-c1346e359e36/582273ef596f7.image.jpg?resize=400%2C267",
    name: "Cords",
    price: "294",
    category: "wear"
  }, {
    id: 1,
    img: "https://5.imimg.com/data5/PS/CA/CC/IOS-20996170/product-jpeg-500x500.png",
    name: "Sipper",
    price: "783",
    category: "sippers"
  },
  {
    id: 1,
    img: "https://www.trekkingwhiz.com/wp-content/uploads/2018/10/Salomon-Quest-4D-II-GTX-Hiking-Boots.jpg",
    name: "Shoes",
    price: "45,392",
    category: "wear"
  },
  {
    id: 1,
    img: "https://i.pinimg.com/originals/e1/fd/99/e1fd99f05fcbc76a1c329ee362a808cb.jpg",
    name: "Mountain Bike type 2",
    price: "14,000",
    category: "bike"

  },
  {
    id: 1,
    img: "https://i0.wp.com/www.holidaypost.in/wp-content/uploads/2016/06/DSC_0434sdf.jpg",
    name: "High shoes type 2",
    price: "10,233",
    category: "wear"

  },
  {
    id: 1,
    img: null,
    name: null,
    price: null
  }
]

// Data to render before and after filter
let dateRender = function(data) {
  data.forEach((ele, index) => {
    let div = document.createElement('div');
    let divInner = document.createElement('div');
    divInner.style.backgroundImage = `url(${ele.img})`;
    if (ele.img) {
      divInner.classList.add("card-img");

      divInner.innerHTML = `<div class='overlay'>${ele.name} <span>INR ${ele.price}</span></div>`
    }
    div.appendChild(divInner)
    div.classList.add("carousel-card");
    if (currentHighlightedCounter === index) {
      div.classList.add("highlight");
    }
    carosuelFragment.appendChild(div);
  })
  carsouelContainer.appendChild(carosuelFragment);
}

// initial rendering of data
dateRender(carouselData);

// click handling
let carsouelCardList = document.getElementsByClassName('carousel-card');
let carsouelCardWidth = Math.min(carsouelCardList[0].offsetWidth, carsouelCardList[1].offsetWidth)
let rightBtn = document.getElementById('right-btn');
let leftBtn = document.getElementById('left-btn');

let inMotion = false;

// Right Button click
rightBtn.onclick = function(e) {
  if (currentHighlightedCounter < carsouelCardList.length - 2 && !inMotion) {
    leftBtn.classList.remove("disabled")
    inMotion = true;
    setTimeout(() => {
      inMotion = false;
    }, 500)
    carsouelContainer.scrollTo({
      top: 0,
      left: carsouelContainer.scrollLeft + carsouelCardWidth,
      behavior: 'smooth'
    });
    currentHighlightedCounter++;
    Array.prototype.forEach.call(carsouelCardList, (ele, index) => {
      if (index < currentHighlightedCounter) {
        ele.classList.remove("highlight")
      }
      if (index === currentHighlightedCounter) {
        ele.classList.add("highlight")
      }
    })
  }
  if (currentHighlightedCounter === carsouelCardList.length - 2) {
    rightBtn.classList.add("disabled")
  }
}

// Left button click 
leftBtn.onclick = function(e) {
  if (currentHighlightedCounter > 0 && !inMotion) {
    rightBtn.classList.remove("disabled")
    inMotion = true;
    setTimeout(() => {
      inMotion = false;
    }, 500)
    carsouelContainer.scrollTo({
      top: 0,
      left: carsouelContainer.scrollLeft - carsouelCardWidth,
      behavior: 'smooth'
    })
    currentHighlightedCounter--;
    Array.prototype.forEach.call(carsouelCardList, (ele, index) => {
      if (index >= currentHighlightedCounter) {
        ele.classList.remove("highlight")
      }
      if (index === currentHighlightedCounter) {
        ele.classList.add("highlight")
      }
    })
  }
  if (currentHighlightedCounter === 0) {
    leftBtn.classList.add("disabled")
  }
}

// Apply filters and rerender data
let setFilter = function(type) {
  if (type === "all") {
    carouselDataFiltered = carouselData
  } else {
    carouselDataFiltered = carouselData.filter((ele) => {
      if (ele.category === type) {
        return true
      }
      return false
    })
  }

  rightBtn.classList.remove("disabled");
  leftBtn.classList.add("disabled")

  Array.prototype.forEach.call(document.getElementsByClassName("tag"), (ele) => {
    ele.classList.remove("active");
    if (ele.getAttribute("data-type") === type) {
      ele.classList.add("active")
    }
  })
  carsouelContainer.innerHTML = "";
  dateRender(carouselDataFiltered);
}
