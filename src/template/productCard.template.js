export const ProductCardTemplate = (
  id,
  name,
  price,
  currency,
  translateBtn
) => `
<li class="product" id="product_${id}">
    <div class="box">
        <div class="image">
           <div style="width: 200px; height: 100px; background-color: #c6c6c6" ></div>
        </div>

        <h3 class="title">${name}</h3>
        <p class="price">${currency} ${price}</p>
        <button class="cartBtn" id="addCart_${id}">${translateBtn}</button>
    </div>
</li>
`;
