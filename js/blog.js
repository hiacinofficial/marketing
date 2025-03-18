
// Tạo một mảng đối tượng blog với 6 phần tử
var mangBlog = [
    {
      tieuDe: "HIACIN EDEN SEDGE HANDBAG",
      noiDung: `- Small Hiacin Bloom Tote – Exquisite Craftsmanship, Natural Elegance
The Small Hiacin Bloom Tote is a perfect fusion of rustic charm and masterful craftsmanship. Entirely handcrafted from natural water hyacinth fibers, this tote not only exudes elegance but also embraces sustainability. The warm beige hue enhances its natural beauty, while the intricate weaving showcases the artistry of skilled artisans. The highlight of the design lies in its finely woven strap, which is both refined and sturdy, offering comfort and durability in every use. It is unique crescent-shaped silhouette further adds to its distinctive charm, making it a standout accessory.
 
      <br><br>- Key Features:
100% Natural Materials: Made from carefully selected water hyacinth fibers, ensuring an eco-friendly and biodegradable product.
Timeless Elegance: A minimalist yet sophisticated design that pairs effortlessly with various outfits, from casual daywear to refined evening ensembles.
Spacious Interior: Despite its compact size, the tote offers ample space to accommodate daily essentials such as a smartphone (up to 6.7 inches), wallet, lipstick, mini perfume, or a small notebook.
Exquisitely Woven Strap: Crafted with precision from durable water hyacinth strands, providing both comfort and longevity.
Natural Beige Aesthetic: Maintains the raw, organic color of water hyacinth, adding to its understated elegance and charm.

      `,
      hinhAnh:["./img/SP/0011.png"] 
    },
    {
      tieuDe: "HIACIN EDEN SEDGE HANDBAG ",
      noiDung: `The Eden Hiacin Woven Bag is not just a fashion accessory, but a handcrafted work of art, where time and meticulousness are woven into every detail. Made from carefully selected natural sedge fibers, it offers a rustic, nature-inspired beauty. The distinctive feature lies in the traditional weaving technique, creating delicate and unique patterns, like time's imprints etched into each fiber. The meticulously woven sedge bow, soft and graceful, whispers of the wearer's elegance and refinement.
      Unique Highlights:
Traditional Sedge Weaving Technique: Each weave tells a story, a culmination of the artisan's experience and dedication, creating a unique, one-of-a-kind product.
Rustic, Nature-Inspired Beauty: Natural sedge fibers evoke a warm, friendly feeling, as if nature is always by your side.
Handcrafted Sedge Bow: More than just a decorative accent, the bow symbolizes femininity and gentleness, crafted by skilled hands.
Enduring Durability: The sedge bag is not only beautiful but also durable; over time, the sedge fibers become softer and shinier, a testament to memorable moments.
Versatility in Style: Whether you pursue classic, vintage, or modern, minimalist styles, this sedge bag can be the perfect highlight, expressing your unique personality.


      `,
      hinhAnh: ["./img/SP/0015.png"]
    },
    {
      tieuDe: "HIACIN CHERRY WOVEN CHARM",
      noiDung: ` Hiacin Cherry Woven Bag is a perfect combination of the rustic beauty of natural materials and the sweet charm of plump red cherries. Crafted from natural brown sedge fibers, the bag offers a warm, close-to-nature feel while showcasing the sophistication of each weave. The design's highlight is the meticulously woven cherries, creating a fresh and radiant look, a reminder of life's sweet moments.
    Unique Highlights:
    Harmonious Combination: The blend of rustic brown sedge and plump red cherries creates a harmonious, unique, and eye-catching overall look.
    Exquisite Handcrafted Details: The meticulously woven cherries showcase the artisans' skill and dedication, adding artistic value to the product.
    Fresh and Radiant Beauty: The plump red cherries bring a sense of joy and radiance, helping you stand out from the crowd.
    Versatile Style: Whether you pursue a feminine, sweet, or personal, dynamic style, this cherry woven bag can be the perfect highlight for your outfit.
    <br>
    Commitment to Environmental Friendliness:
    This bag is made from 100% natural materials, without the use of harmful chemicals, safe for users and the environment. Throughout the production process, we ensure no toxic substances are used, preserving the integrity of the product and nature. At the end of its life cycle, the woven bag will decompose naturally, returning organic matter to the soil, contributing to a greener and more sustainable ecosystem.
    Care Instructions:
    Avoid Water: Limit direct contact with water. If wet, air dry naturally.
    Gentle Cleaning: Wipe gently with a soft cloth, avoid harsh detergents.
    Store in a Dry, Ventilated Place: Keep in a dry place, away from sunlight and moisture.
    Maintain Bag Shape: Stuff with soft paper when not in use to maintain its shape.

    

      `,
      hinhAnh: ["./img/SP/0020.png"]
    },
    {
      tieuDe: "Hyacinth Bottle Tote",
      noiDung: `The Hiacin Water Hyacinth Bottle Tote is a perfect blend of natural rustic beauty and everyday convenience. Crafted from natural water hyacinth with an open-weave design, this tote offers a simple, elegant look while showcasing the sophistication of each weave. This unique design allows you to easily carry your water bottle with you, while also contributing to environmental protection.
     Unique Highlights:
      Natural, Eco-Friendly Material: Natural water hyacinth brings a rustic, close-to-nature beauty, while demonstrating a commitment to a green lifestyle.
      Unique Open-Weave Design: The open-weave style not only creates aesthetic appeal but also allows the water bottle to ventilate, preventing mold.
      Convenient and Lightweight: The bag is perfectly sized, easy to carry with you to work, school, or outdoor activities.
      Suitable for Various Water Bottle Types: The flexible design fits various water bottle sizes.
      Sturdy Carrying Handle: The meticulously woven handle ensures durability and comfort during use.
      Dimensions: 15 x 8 cm.
      Eco-Friendly Commitment
      This tote is crafted from 100% natural materials with no harmful chemical treatments, making it safe for both users and the environment. Throughout the production process, we ensure that no toxic substances are used, preserving the integrity of both the product and nature.
      At the end of its life cycle, the water hyacinth tote decomposes naturally, contributing organic matter to the soil and fostering a greener, more sustainable ecosystem.
      .<br><br>
      `,
      hinhAnh: ["./img/SP/0021.png"]
    },
  ];

//   hàm hiển thị modal của các bài viết (blogs)
function showModal(index) {
    document.getElementById('detailsModal').innerHTML= `
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <div class="text-end">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <h5 class="modal-title my-2 text-center" id="detailsModalLabel">${mangBlog[index].tieuDe}</h5>
                <!-- Chi tiết bài viết sẽ được thêm ở đây -->
                <div id="modalContent">
                    <div class="row">
                    <div class="col-5">
                        <img class="d-block w-100" src=${mangBlog[index].hinhAnh[0]}>
                        <img class="d-block w-100" src=${(mangBlog[index].hinhAnh[1]||'')}>
                    </div>
                    <div class=" noiDung col-7 mt-2 fs-2">
                        ${mangBlog[index].noiDung}
                    </div>
                    </div>
                </div>
                <div class="text-end">
                    <button type="button" class="btn btn-secondary " data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `;
    $('#detailsModal').modal('show');
}



 
  