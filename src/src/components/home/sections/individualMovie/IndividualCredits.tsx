import { Cast } from "../../../../interfaces/Details";
interface Props {
  person?: Cast;
}
const IndividualCredits = ({ person }: Props) => {
  return (
    <div className="flex flex-col ">
      <span className="text-base font-semibold text-white">{person?.job}</span>
      <span className="text-sm font-medium text-white/90">{person?.name}</span>
    </div>
  );
};

export default IndividualCredits;
