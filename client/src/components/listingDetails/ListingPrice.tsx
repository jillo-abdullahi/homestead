/**
 * component to display the price of the listing
 * @param {number} price - price of the listing
 * @returns
 */
interface ListingPriceProps {
  price: number;
}
const ListingPrice: React.FC<ListingPriceProps> = ({ price }) => (
  <div className="space-y-1">
    <div className="text-gray-500 text-sm">Price:</div>
    <div className="text-2xl font-bold text-gray-800">
      ${price?.toLocaleString()}
    </div>
  </div>
);

export default ListingPrice;
