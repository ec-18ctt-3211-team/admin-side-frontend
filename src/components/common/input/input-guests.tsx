import { Icon, Outline } from 'utils/icon.utils';

interface Props {
  totalAdults: number;
  setTotalAdults: (adults: number) => void;
  totalKids: number;
  setTotalKids: (kids: number) => void;
}

export default function InputGuests(props: Props): JSX.Element {
  const { totalAdults, setTotalAdults, totalKids, setTotalKids } = props;
  return (
    <div className="flex w-full justify-around">
      <div className="flex w-2/5 justify-around">
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => totalAdults > 0 && setTotalAdults(totalAdults - 1)}
        >
          <Icon icon={Outline.minus} />
        </div>
        <div>{totalAdults} Adults</div>
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => setTotalAdults(totalAdults + 1)}
        >
          <Icon icon={Outline.add} />
        </div>
      </div>
      <div className="flex w-2/5 justify-around">
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => totalKids > 0 && setTotalKids(totalKids - 1)}
        >
          <Icon icon={Outline.minus} />
        </div>
        <div>{totalKids} Kids</div>
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => setTotalKids(totalKids + 1)}
        >
          <Icon icon={Outline.add} />
        </div>
      </div>
    </div>
  );
}
