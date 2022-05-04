const Product = require("./product.model");

let mockData = [
  {
    id: 1,
    title: "PC Gamer",
    price: 200.0,
    thumbnail:
      "https://tienda.redcomputer.es/18178-thickbox_default/pc-gaming-red-vegetta777-rog-special-edition-ryzen-threadripper-3960xrtx-2080ti128gb-ram1tb-ssd-12tb-hdd.jpg",
  },
  {
    id: 2,
    title: "PC Oficina",
    price: 10,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_902439-MLA43881920360_102020-O.webp",
  },
  {
    id: 3,
    title: "Workstation",
    price: 500.0,
    thumbnail:
      "https://www.cadfem.net/media/catalog/product/cache/36baee87586d7a57765cdd066d9f8476/h/p/hp_z8_workstation_cadfem_modul_16197.jpg",
  },
  {
    id: 4,
    title: "PC Standar",
    price: 60.0,
    thumbnail: "https://www.elpatech.co.uk/assets/pc/deepcool.png",
  },
  {
    id: 5,
    title: "PC Gama Media",
    price: 100.0,
    thumbnail:
      "https://www.soscomputacion.com.ar/17385-thickbox_default/gabinete-pc-gamer-sentey-x10-rgb-acrilico-gaming-usb-30-sin-fuente.jpg",
  },
  {
    id: 6,
    title: "Perifericos",
    price: 20.0,
    thumbnail:
      "https://images.fravega.com/f500/fe8602be1936882c4fb90c0a3bb04b69.jpg",
  },
  {
    id: 7,
    title: "Monitor",
    price: 70.0,
    thumbnail:
      "https://s3-sa-east-1.amazonaws.com/saasargentina/TZB3jMAcwA9IjepbunXy/imagen",
  },
  {
    id: 8,
    title: "Microfono",
    price: 30.0,
    thumbnail:
      "https://http2.mlstatic.com/D_NQ_NP_899618-MLA32125037231_092019-O.webp",
  },
].map((e) => new Product({ ...e }));

class ProductsService {
  productDAO = "";

  //Get All products
  findAll() {
    return mockData;
  }

  //Get one product
  find(id) {
    const prd = mockData.find((e) => e.id === id);
    if (prd) {
      return prd;
    }
    throw new Error("Product dosnt exists");
  }

  // Add a product
  add(product) {
    const id = mockData[mockData.length - 1].id + 1;
    const newPrd = new Product({ ...product, id });
    console.log(newPrd);
    mockData.push(newPrd);
    return newPrd;
  }

  // Edit a product
  edit(id, product) {
    const prd = mockData.find((e) => e.id === id);

    if (prd) {
      prd.patchEntity({ id, ...product });
      const data = mockData.filter((e) => e.id !== id);
      data.push(prd);
      mockData = data;
      return prd;
    }
    throw new Error("Product dosnt exists");
  }

  // Delete an product
  delete(id) {
    if (mockData.find((e) => e.id === id)) {
      const data = mockData.filter((e) => e.id !== id);
      mockData = data;
      return true;
    } else {
      throw new Error("Product dosnt exists");
    }
  }
}

module.exports = ProductsService;
