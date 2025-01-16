import FilterList from '@/components/FilterList';

const FilterPanel = ({
  selectedFilterId,
  setSelectedFilterId,
  countByFilters,
  setSearchText,
  searchText
}) => {
  return (
    <div className='flex-1'>
      <div className='w-full p-5'>
        <div className='flex min-h-[35px] items-center gap-x-2 rounded-lg bg-[#f0f0f0] px-[12px] py-[15px]'>
          <i className='fa-solid fa-magnifying-glass text-[16px] text-[#7a7a7a]'></i>
          <input
            type='text'
            placeholder='Search...'
            className='h-full w-full text-[16px] font-medium text-[#7a7a7a] placeholder:text-[#7a7a7a]'
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>
        <FilterList
          selectedFilterId={selectedFilterId}
          setSelectedFilterId={setSelectedFilterId}
          countByFilters={countByFilters}
        ></FilterList>
      </div>
    </div>
  );
};
export default FilterPanel;
