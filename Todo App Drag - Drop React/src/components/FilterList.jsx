import { filterItems } from '@/constants/constants';

const FilterList = ({
  selectedFilterId,
  setSelectedFilterId,
  countByFilters
}) => {
  return (
    <div className='mt-4 grid w-full grid-cols-2 gap-4'>
      {filterItems.map((filterItem) => (
        <div
          key={filterItem.id}
          onClick={() => setSelectedFilterId(filterItem.id)}
          className={`flex h-[150px] w-full cursor-pointer items-center justify-between rounded-[12px] px-[20px] py-[10px] transition-all duration-200 ${selectedFilterId === filterItem.id ? 'bg-[#0f548c]' : 'bg-[#e6e6e6]'}`}
        >
          <div>
            <div className='mb-3 h-5 w-5'>
              <img
                className='h-full w-full object-cover'
                src={filterItem.icon}
                alt=''
              />
            </div>
            <p
              className={`text-[16px] font-bold ${
                filterItem.id === selectedFilterId ? 'text-white' : 'text-black'
              } `}
            >
              {filterItem.label}
            </p>
          </div>
          <p
            className={`text-[24px] font-semibold leading-[1.33] ${
              filterItem.id === selectedFilterId ? 'text-white' : 'text-black'
            }`}
          >
            {countByFilters[filterItem.id]}
          </p>
        </div>
      ))}
    </div>
  );
};
export default FilterList;
