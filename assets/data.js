const productsData = [
    {
        id: 1,
        name: "Casio digital plata",
        category: ["digital", "offer"],
        price: '50.000',
        cardImg: "./assets/img/products/casio-digital.png",
    },
    {
        id: 2,
        name: "Rolex oro",
        category: ["hombre", "offer"],
        price: '700.000',
        cardImg: "./assets/img/products/hombre-malla-cuero1.png",
    },
    {
        id: 3,
        name: "Michael Kors plata",
        category: "hombre", 
        price: '450.000',
        cardImg: "./assets/img/products/hombre-malla-cuero2.png",
    },
    {
        id: 4,
        name: "Mont Blanc negro",
        category: "hombre",
        price: '500.000',
        cardImg: "./assets/img/products/hombre-malla-cuero3.png",
    },
    {
        id: 5,
        name: "Omega oro",
        category: "hombre",
        price: '670.000',
        cardImg: "./assets/img/products/hombre-malla-cuero4.png",
    },
    {
        id: 6,
        name: "Police plata",
        category: "hombre",
        price: '150.000',
        cardImg: "./assets/img/products/hombre-malla-cuero5.png",
    },
    {
        id: 7,
        name: "Michael Kors oro",
        category: "hombre",
        price: '200.000',
        cardImg: "./assets/img/products/hombre-malla-metallica1.png",
    },
    {
        id: 8,
        name: "Michael Kors plata",
        category: "hombre",
        price: '220.000',
        cardImg: "./assets/img/products/hombre-malla-metallica2.png",
    },
    {
        id: 9,
        name: "Michael Kors plata",
        category: "mujer",
        price: '230.000',
        cardImg: "./assets/img/products/mujer-malla-cuero1.png",
    },
    {
        id: 10,
        name: "Rolex oro",
        category: "mujer",
        price: '900.000',
        cardImg: "./assets/img/products/mujer-malla-cuero2.png",
    },
    {
        id: 11,
        name: "Industrial plata y oro",
        category: "mujer",
        price: '150.000',
        cardImg: "./assets/img/products/mujer-malla-metallica1.png",
    },
    {
        id: 12,
        name: "Gucci oro",
        category: "mujer",
        price: '1200.000',
        cardImg: "./assets/img/products/mujer-malla-metallica2.png",
    },
    {
        id: 13,
        name: "Oro y diamante",
        category: "mujer",
        price: '1600.000',
        cardImg: "./assets/img/products/mujer-malla-metallica3.png",
    },
    {
        id: 14,
        name: "Rado blanco y oro",
        category: "mujer",
        price: '470.000',
        cardImg: "./assets/img/products/mujer-malla-metallica4.png",
    },
    {
        id: 15,
        name: "Apple watch azul",
        category: ["smartwatch", "offer"],
        price: '500.000',
        cardImg: "./assets/img/products/smartwatch1.png",
    },
    {
        id: 16,
        name: "Apple watch negro",
        category: "smartwatch",
        price: '500.000',
        cardImg: "./assets/img/products/smartwatch2.png",
    },
];



const DivideProductsInParts = (size) => {
    const productsList = [];
    for(let i = 0; i < productsData.length; i += size)
      productsList.push(productsData.slice(i, i + size));
    return productsList;
}
  
  
const appState = {
    products: DivideProductsInParts(4),
    currentProductsIndex: 0,
    productsLimit: DivideProductsInParts(4).length,
    activeFilter: null,
}