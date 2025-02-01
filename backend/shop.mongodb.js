use("Shopdata");
const products = [
    {
      productName: "Car",
      productDesc:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      productPrice: "44348.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=2947866714701824",
    },
    {
      productName: "Computer",
      productDesc:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      productPrice: "12267.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=7259013804720128",
    },
    {
      productName: "Bike",
      productDesc:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      productPrice: "17933.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=3957235080232960",
    },
    {
      productName: "Chips",
      productDesc:
        "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      productPrice: "39372.00",
      productImg: "https://loremflickr.com/640/480/laptop?lock=219133811621888",
    },
    {
      productName: "Bacon",
      productDesc:
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      productPrice: "26357.00",
      productImg: "https://loremflickr.com/640/480/laptop?lock=802324618412032",
    },
    {
      productName: "Shirt",
      productDesc:
        "The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J",
      productPrice: "19724.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=7521896566358016",
    },
    {
      productName: "Chicken",
      productDesc:
        "The Football Is Good For Training And Recreational Purposes",
      productPrice: "43748.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=7088454275956736",
    },
    {
      productName: "Soap",
      productDesc:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      productPrice: "21279.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=1703092141686784",
    },
    {
      productName: "Tuna",
      productDesc:
        "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
      productPrice: "6218.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=7251079412580352",
    },
    {
      productName: "Pants",
      productDesc:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      productPrice: "28585.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=6687373746241536",
    },
    {
      productName: "Pizza",
      productDesc:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      productPrice: "4481.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=2321819252031488",
    },
    {
      productName: "Shirt",
      productDesc:
        "The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
      productPrice: "30675.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=4866659980410880",
    },
    {
      productName: "Bike",
      productDesc:
        "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
      productPrice: "10285.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=1254262174646272",
    },
    {
      productName: "Shirt",
      productDesc:
        "The Football Is Good For Training And Recreational Purposes",
      productPrice: "21434.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=5339461434998784",
    },
    {
      productName: "Shoes",
      productDesc:
        "The Football Is Good For Training And Recreational Purposes",
      productPrice: "37407.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=5236278847078400",
    },
    {
      productName: "Shirt",
      productDesc:
        "New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016",
      productPrice: "7014.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=5704801176256512",
    },
    {
      productName: "Shirt",
      productDesc:
        "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit",
      productPrice: "48569.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=5273684056997888",
    },
    {
      productName: "Towels",
      productDesc:
        "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
      productPrice: "39313.00",
      productImg: "https://loremflickr.com/640/480/laptop?lock=865657358909440",
    },
    {
      productName: "Table",
      productDesc:
        "The Football Is Good For Training And Recreational Purposes",
      productPrice: "24708.00",
      productImg:
        "https://loremflickr.com/640/480/laptop?lock=4667424601276416",
    },
    {
      productName: "Mouse",
      productDesc:
        "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
      productPrice: "18490.00",
      productImg: "https://loremflickr.com/640/480/laptop?lock=788141048856576",
    },
  ];

db.shopdatas.insertMany(products, (err,result)=>{
    if(err) throw err;
    console.log(insertedCount);
})